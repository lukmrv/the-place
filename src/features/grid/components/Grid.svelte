<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { setPattern, setPixel } from '../service';

	import { webSocketManager } from '../../../websocket-manager';
	import type { Color, Coordinates, Pixel } from '../types';
	import ColorOption from './ColorOption.svelte';
	import { getHoveredPixelColor, mapPixelDataToColor } from '../utils';
	import Modal from '../../../components/Modal.svelte';
	import Button from '../../../components/Button.svelte';
	import Settings from './Settings.svelte';
	import type { LayoutData } from '../../../routes/$types';
	import { patternsStore } from '../../../stores/patterns-store';
	import { colorsStore } from '../../../stores/colors-store';
	import { browser } from '$app/environment';

	const STORAGE_KEY_TRANSFORM = 'grid_transform';
	const STORAGE_KEY_ZOOM = 'grid_zoom';

	let { gridState }: { gridState: Awaited<Awaited<LayoutData>['gridState']> } = $props();

	const width = gridState?.grid.width ?? 0;
	const height = gridState?.grid.height ?? 0;
	const pixels = gridState?.pixels ?? new Uint8ClampedArray(0);

	// svelte-ignore non_reactive_update
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	// svelte-ignore non_reactive_update
	let rect: DOMRect;

	const colorsPalette = colorsStore.get()!;

	let ws: WebSocket;
	const maxZoom = 30;
	const minZoom = 1.4;
	let isDragging = false;
	let pixelBuffer: Pixel | null = null;
	let patternBuffer: Pixel[] = [];
	let dragThreshold: Coordinates | null = null;

	let mainGridSettingsDialog = $state<HTMLDialogElement | undefined>();
	let zoom = $state(
		(() => {
			const DEFAULT_ZOOM = 7;
			const savedZoom = browser
				? Number(localStorage.getItem(STORAGE_KEY_ZOOM)) || DEFAULT_ZOOM
				: DEFAULT_ZOOM;
			console.log('savedZoom', savedZoom);
			return savedZoom;
		})()
	);
	let selectedColor = $state(Object.keys(colorsPalette)[0] as Color);
	let transform = $state(
		(() => {
			const DEFAULT_TRANSFORM = { x: 0, y: 0 };
			const localStorageTransform = browser
				? localStorage.getItem(STORAGE_KEY_TRANSFORM)
					? JSON.parse(localStorage.getItem(STORAGE_KEY_TRANSFORM)!)
					: DEFAULT_TRANSFORM
				: DEFAULT_TRANSFORM;
			const savedTransform = browser ? localStorageTransform : DEFAULT_TRANSFORM;
			console.log('savedTransform', savedTransform);
			return savedTransform;
		})()
	);
	let selectedPattern = $state<string>('pixel');
	let saving = $state<boolean>(false);
	let cursorPosition = $state<{ x: number; y: number } | null>(null);
	let showCursorPosition = $state(false);

	const patterns = patternsStore.get();

	let animationFrameId: number | null = null;
	let pendingMove: MouseEvent | null = null;
	let accumulatedMovement = { x: 0, y: 0 };

	onMount(() => {
		imageData = new ImageData(pixels, width, height);
		context = canvas.getContext('2d')!;
		context.imageSmoothingEnabled = false;
		context.putImageData(imageData, 0, 0);

		ws = webSocketManager();
		ws.onmessage = (e) => {
			const { offset, r, g, b, a } = JSON.parse(e.data);
			insertPixelAt({
				imageData,
				color: mapPixelDataToColor({ colorsPalette, r, g, b, a }),
				offset
			});
		};

		return () => ws.close();
	});
	onDestroy(() => {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
		}
	});

	const getPixelOffset = (event: MouseEvent) => {
		rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const pixelX = (event.clientX - rect.left) * scaleX;
		const pixelY = (event.clientY - rect.top) * scaleY;
		const correctedX = Math.max(Math.floor(pixelX), 0);
		const correctedY = Math.max(Math.floor(pixelY), 0);

		const offset = correctedY * imageData.width + correctedX;

		return offset;
	};

	// mutate imageDataObject
	const insertPixelAt = ({
		imageData,
		color,
		offset
	}: {
		imageData: ImageData;
		color: Color;
		offset: number;
	}) => {
		const colorData = colorsPalette[color];
		if (!colorData) {
			console.warn(`Invalid color: ${color}`);
			return;
		}
		imageData.data.set(colorData, offset * 4);
		context.putImageData(imageData, 0, 0);
	};
	const dragThresholdReached = (e: MouseEvent) =>
		dragThreshold === null ||
		Math.abs(e.clientX - dragThreshold.x) > 5 ||
		Math.abs(e.clientY - dragThreshold.y) > 5;

	const savePixel = async (e: MouseEvent) => {
		if (isDragging) {
			return;
		}

		const offset = getPixelOffset(e);
		const hoveredPixelColor = getHoveredPixelColor({ colorsPalette, imageData, offset });

		// "optimistic" pixel placement
		insertPixelAt({ imageData, color: selectedColor, offset });

		const [r, g, b, a] = colorsPalette[selectedColor];
		const response = await setPixel({ offset, r, g, b, a });

		if (!response) {
			// reset pixel placement
			insertPixelAt({ imageData, color: hoveredPixelColor, offset });
		} else {
			ws.send(JSON.stringify({ offset, r, g, b, a }));
			pixelBuffer = null;
		}
	};

	const savePattern = async (e: MouseEvent) => {
		// Don't save pattern if we were just dragging
		if (isDragging) {
			isDragging = false;
			return;
		}

		const offset = getPixelOffset(e);
		const centerX = offset % width;
		const centerY = Math.floor(offset / width);

		// Clear any existing pattern buffer first
		if (patternBuffer.length > 0) {
			for (let i = 0; i < patternBuffer.length; i++) {
				const { offset, color } = patternBuffer[i];
				insertPixelAt({ imageData, color, offset });
			}
			patternBuffer = [];
		}

		const pattern = patterns[selectedPattern]!;
		const originalColors: { offset: number; color: Color }[] = [];
		const pixelsToUpdate: { offset: number; r: number; g: number; b: number; a: number }[] = [];

		// Store original colors and prepare updates
		for (let i = 0; i < pattern.length; i++) {
			const { x: dx, y: dy, color: patternColor } = pattern[i];
			const x = centerX + dx;
			const y = centerY + dy;

			// Skip if outside canvas bounds
			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			const originalColor = getHoveredPixelColor({
				colorsPalette,
				imageData,
				offset: currentOffset
			});
			originalColors.push({ offset: currentOffset, color: originalColor });

			const [r, g, b, a] = colorsPalette?.[patternColor as Color];
			pixelsToUpdate.push({ offset: currentOffset, r, g, b, a });

			// Optimistically place the pixel
			// insertPixelAt(patternColor, currentOffset);
		}

		// Try to save pixels one by one and return early if any fails

		const success = await setPattern({ pattern: pixelsToUpdate });
		if (!success) {
			// Revert all changes if any pixel fails
			originalColors.forEach(({ offset, color }) => {
				insertPixelAt({ imageData, color, offset });
			});
			return;
		} else {
			for (const { offset, r, g, b, a } of pixelsToUpdate) {
				insertPixelAt({
					imageData,
					color: mapPixelDataToColor({ colorsPalette, r, g, b, a }),
					offset
				});
				ws.send(JSON.stringify({ offset, r, g, b, a }));
			}
		}

		// If we got here, all pixels were saved successfully
		pixelsToUpdate.forEach((update) => {
			ws.send(JSON.stringify(update));
		});
	};

	const handleClick = async (e: MouseEvent) => {
		saving = true;
		if (selectedPattern === 'pixel') {
			await savePixel(e);
		} else {
			await savePattern(e);
		}
		saving = false;
	};

	const renderPixelFrame = () => {
		animationFrameId = null;
		if (!pendingMove) return;

		const e = pendingMove;
		pendingMove = null;

		if (saving) return;
		const isButtonPressed = e.buttons === 1;

		// Handle dragging early and skip pixel rendering
		if (isButtonPressed && dragThresholdReached(e)) {
			if (!isDragging && pixelBuffer) {
				// Reset hovered pixel when starting to drag
				insertPixelAt({ imageData, color: pixelBuffer.color, offset: pixelBuffer.offset });
				pixelBuffer = null;
			}

			isDragging = true;
			dragThreshold = null;

			// Use accumulated movement instead of single event movement
			if (accumulatedMovement.x !== 0 || accumulatedMovement.y !== 0) {
				const zoomFactor = 1 / zoom;
				transform.x += accumulatedMovement.x * zoomFactor;
				transform.y += accumulatedMovement.y * zoomFactor;
				// Reset accumulated movement
				accumulatedMovement = { x: 0, y: 0 };
			}
			return;
		}

		const offset = getPixelOffset(e);
		const hoveredPixelChanged = offset !== pixelBuffer?.offset;

		// Skip if pixel hasn't changed
		if (!hoveredPixelChanged && pixelBuffer) return;

		// Create a temporary ImageData to batch our changes
		const tempImageData = context.getImageData(0, 0, width, height);
		const color = getHoveredPixelColor({ colorsPalette, imageData: tempImageData, offset });

		if (!pixelBuffer) {
			insertPixelAt({ imageData: tempImageData, color: selectedColor, offset });
			pixelBuffer = { offset, color };
		} else if (hoveredPixelChanged) {
			// restore buffer pixel
			insertPixelAt({
				imageData: tempImageData,
				color: pixelBuffer.color,
				offset: pixelBuffer.offset
			});
			// set hovered pixel
			insertPixelAt({ imageData: tempImageData, color: selectedColor, offset });
			// update buffer
			pixelBuffer = { offset, color };
		}

		// Update canvas with all changes at once
		context.putImageData(tempImageData, 0, 0);

		if (!isButtonPressed) {
			isDragging = false;
		}
	};

	const renderPatternFrame = () => {
		animationFrameId = null;
		if (!pendingMove) return;

		const e = pendingMove;
		pendingMove = null;

		if (saving) return;
		const isButtonPressed = e.buttons === 1;

		// Handle dragging early and skip pattern rendering
		if (isButtonPressed && dragThresholdReached(e)) {
			if (!isDragging && patternBuffer.length > 0) {
				const tempImageData = context.getImageData(0, 0, width, height);
				for (const { offset, color } of patternBuffer) {
					insertPixelAt({ imageData: tempImageData, color, offset });
				}
				context.putImageData(tempImageData, 0, 0);
				patternBuffer = [];
			}

			isDragging = true;
			dragThreshold = null;

			// Use accumulated movement instead of single event movement
			if (accumulatedMovement.x !== 0 || accumulatedMovement.y !== 0) {
				const zoomFactor = 1 / zoom;
				transform.x += accumulatedMovement.x * zoomFactor;
				transform.y += accumulatedMovement.y * zoomFactor;
				// Reset accumulated movement
				accumulatedMovement = { x: 0, y: 0 };
			}
			return;
		}

		// Reset accumulated movement when not dragging
		accumulatedMovement = { x: 0, y: 0 };

		const offset = getPixelOffset(e);
		const centerX = offset % width;
		const centerY = Math.floor(offset / width);

		// Create a temporary ImageData to batch our changes
		const tempImageData = context.getImageData(0, 0, width, height);

		// Restore previous pattern pixels
		if (patternBuffer.length > 0) {
			for (const { offset, color } of patternBuffer) {
				insertPixelAt({ imageData: tempImageData, color, offset });
			}
		}

		patternBuffer = [];

		// Draw new pattern preview
		const pattern = patterns[selectedPattern]!;
		for (const { x: dx, y: dy, color: patternColor } of pattern) {
			const x = centerX + dx;
			const y = centerY + dy;

			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			const currentColor = getHoveredPixelColor({
				colorsPalette,
				imageData: tempImageData,
				offset: currentOffset
			});
			patternBuffer.push({ offset: currentOffset, color: currentColor });
			insertPixelAt({
				imageData: tempImageData,
				color: patternColor as Color,
				offset: currentOffset
			});
		}

		// Update canvas with all changes at once
		context.putImageData(tempImageData, 0, 0);

		if (!isButtonPressed) {
			isDragging = false;
		}
	};

	const handleMove = (e: MouseEvent) => {
		// Check if cursor is within canvas bounds
		rect = canvas.getBoundingClientRect();
		if (
			e.clientX < rect.left ||
			e.clientX > rect.right ||
			e.clientY < rect.top ||
			e.clientY > rect.bottom
		) {
			handleLeave();
			return;
		}

		const offset = getPixelOffset(e);
		cursorPosition = {
			x: offset % width,
			y: Math.floor(offset / width)
		};

		// Store the latest mouse event
		pendingMove = e;

		// Accumulate movement if dragging
		if (isDragging) {
			accumulatedMovement.x += e.movementX;
			accumulatedMovement.y += e.movementY;
		}

		// If we already have a frame queued, don't queue another
		if (animationFrameId !== null) return;

		// Schedule the next frame with appropriate renderer
		animationFrameId = requestAnimationFrame(
			selectedPattern === 'pixel' ? renderPixelFrame : renderPatternFrame
		);
	};

	const handleLeave = () => {
		cursorPosition = null;

		// Cancel any pending frame render
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		// Clear any pending move
		pendingMove = null;

		// Reset pixel buffer
		if (pixelBuffer?.color && pixelBuffer.offset !== undefined) {
			insertPixelAt({ imageData, color: pixelBuffer.color, offset: pixelBuffer.offset });
			pixelBuffer = null;
		}

		// Reset pattern buffer
		if (patternBuffer.length > 0) {
			for (const { offset, color } of patternBuffer) {
				if (color && offset !== undefined) {
					insertPixelAt({ imageData, color, offset });
				}
			}
			patternBuffer = [];
		}
	};
	// set scale factor
	const handleScroll = async (e: WheelEvent) => {
		const dir = Math.sign(e.deltaY);
		zoom -= dir;
		zoom = Math.max(minZoom, Math.min(maxZoom, zoom));
		localStorage.setItem(STORAGE_KEY_ZOOM, zoom.toString());
	};
	const setColor = (color: Color) => {
		selectedColor = color;
	};

	// Reset accumulated movement when mouse is released
	const handleMouseUp = () => {
		pixelBuffer = null;
		accumulatedMovement = { x: 0, y: 0 };
		localStorage.setItem(STORAGE_KEY_TRANSFORM, JSON.stringify(transform));
	};
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
{#if browser}
	<div
		class:cursor-wait={saving}
		class="flex h-full w-full items-center justify-center overflow-hidden bg-gray-300"
	>
		<div class:pointer-events-none={saving} style={`transform: scale(${zoom}, ${zoom});`}>
			<div class=" bg-white" style={`transform: translate(${transform.x}px, ${transform.y}px);`}>
				<canvas
					{width}
					{height}
					bind:this={canvas}
					onclick={handleClick}
					onmousemove={handleMove}
					onmouseleave={handleLeave}
					onmousedown={(e) => {
						dragThreshold = { x: e.clientX, y: e.clientY };
						accumulatedMovement = { x: 0, y: 0 };
					}}
					onmouseup={handleMouseUp}
					onwheel={handleScroll}
					style="image-rendering: pixelated;"
				/>
			</div>
		</div>

		{#if showCursorPosition && cursorPosition}
			<div
				class="pointer-events-none absolute z-20 w-16 rounded bg-black/25 px-2 py-1 text-center text-xs text-white"
				style="left: {rect?.left + cursorPosition.x * zoom - 70}px; top: {rect?.top +
					cursorPosition.y * zoom -
					26}px"
			>
				{cursorPosition.x}, {cursorPosition.y}
			</div>
		{/if}

		<div class="absolute bottom-4 z-10 flex gap-2 border-2 border-gray-300 bg-white p-2">
			{#each Object.keys(colorsPalette) as (keyof typeof colorsPalette)[] as colorOption}
				<ColorOption
					onclick={() => setColor(colorOption)}
					selected={selectedColor === colorOption}
					color={colorsPalette[colorOption]}
				/>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center overflow-hidden bg-gray-300"></div>
{/if}

<Button class="absolute right-4 top-4" onclick={() => mainGridSettingsDialog?.showModal()}
	>settings</Button
>
<Modal bind:dialog={mainGridSettingsDialog}>
	{#snippet header()}Settings{/snippet}
	<Settings bind:showCursorPosition bind:selectedPattern {mainGridSettingsDialog} />
</Modal>

<style>
</style>
