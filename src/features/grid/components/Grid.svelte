<script lang="ts">
	import { onMount } from 'svelte';
	import { getGridState, setPixel } from '../service';

	import { webSocketManager } from '../../../websocket-manager';
	import type { Color, Coordinates, Pixel } from '../types';
	import { colorsPalette } from '../const';
	import ColorOption from './ColorOption.svelte';
	import { getHoveredPixelColor, mapPixelDataToColor } from '../utils';
	import Modal from '../../../components/Modal.svelte';
	import Button from '../../../components/Button.svelte';
	import { patterns } from '../patterns/index';
	import Settings from './Settings.svelte';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let ws: WebSocket;
	const height = 120;
	const width = 120;
	const maxZoom = 30;
	const minZoom = 3;
	let isDragging = false;
	let pixelBuffer: Pixel | null = null;
	let patternBuffer: Pixel[] = [];
	let dragThreshold: Coordinates | null = null;

	let mainGridSettingsDialog = $state<HTMLDialogElement | undefined>();
	let zoom = $state(7);
	let selectedColor = $state(Object.keys(colorsPalette)[0] as Color);
	let transform = $state({ x: 0, y: 0 });
	let selectedPattern = $state<keyof typeof patterns>('pixel');
	let saving = $state<boolean>(false);
	let cursorPosition = $state<{ x: number; y: number } | null>(null);
	let showCursorPosition = $state(false);

	onMount(() => {
		(async () => {
			const gridState = await getGridState();
			imageData = new ImageData(gridState, width, height);
			context.putImageData(imageData, 0, 0);
		})();

		context = canvas.getContext('2d')!;
		context.imageSmoothingEnabled = false;

		ws = webSocketManager();
		ws.onmessage = (e) => {
			const { offset, r, g, b, a } = JSON.parse(e.data);
			insertPixelAt(mapPixelDataToColor({ r, g, b, a }), offset);
		};

		return () => ws.close();
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
	const insertPixelAt = (color: Color, offset: number) => {
		imageData.data.set(colorsPalette[color], offset * 4);
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
		const hoveredPixelColor = getHoveredPixelColor({ imageData, offset });

		// "optimistic" pixel placement
		insertPixelAt(selectedColor, offset);

		const [r, g, b, a] = colorsPalette[selectedColor];
		const response = await setPixel(offset, r, g, b, a);

		if (!response) {
			console.log(hoveredPixelColor);
			// reset pixel placement
			insertPixelAt(hoveredPixelColor, offset);
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
				insertPixelAt(color, offset);
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
			const originalColor = getHoveredPixelColor({ imageData, offset: currentOffset });
			originalColors.push({ offset: currentOffset, color: originalColor });

			const [r, g, b, a] = colorsPalette[patternColor];
			pixelsToUpdate.push({ offset: currentOffset, r, g, b, a });

			// Optimistically place the pixel
			// insertPixelAt(patternColor, currentOffset);
		}

		// Try to save pixels one by one and return early if any fails
		for (const { offset, r, g, b, a } of pixelsToUpdate) {
			const success = await setPixel(offset, r, g, b, a);
			if (!success) {
				// Revert all changes if any pixel fails
				originalColors.forEach(({ offset, color }) => {
					insertPixelAt(color, offset);
					ws.send(JSON.stringify({ offset, r, g, b, a }));
				});
				return;
			} else {
				insertPixelAt(mapPixelDataToColor({ r, g, b, a }), offset);
				ws.send(JSON.stringify({ offset, r, g, b, a }));
			}
		}

		// If we got here, all pixels were saved successfully
		// pixelsToUpdate.forEach((update) => {
		// 	ws.send(JSON.stringify(update));
		// });
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

	const handleMovePixel = (e: MouseEvent) => {
		if (saving) return;
		const isButtonPressed = e.buttons === 1;

		// Handle dragging early and skip pixel rendering
		if (isButtonPressed && dragThresholdReached(e)) {
			if (!isDragging && pixelBuffer) {
				// Reset hovered pixel when starting to drag
				insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
				pixelBuffer = null;
			}

			isDragging = true;
			dragThreshold = null;

			const zoomFactor = 1 / zoom;
			transform.x += e.movementX * zoomFactor;
			transform.y += e.movementY * zoomFactor;
			return;
		}

		const offset = getPixelOffset(e);
		const hoveredPixelChanged = offset !== pixelBuffer?.offset;

		// Skip if pixel hasn't changed
		if (!hoveredPixelChanged && pixelBuffer) return;

		// Create a temporary ImageData to batch our changes
		const tempImageData = context.getImageData(0, 0, width, height);
		const color = getHoveredPixelColor({ imageData: tempImageData, offset });

		// HANDLE ENTER
		if (!pixelBuffer) {
			tempImageData.data.set(colorsPalette[selectedColor], offset * 4);
			pixelBuffer = {
				offset,
				color
			};
		} else if (hoveredPixelChanged) {
			// restore buffer pixel
			tempImageData.data.set(colorsPalette[pixelBuffer.color], pixelBuffer.offset * 4);
			// set hovered pixel
			tempImageData.data.set(colorsPalette[selectedColor], offset * 4);
			// update buffer
			pixelBuffer = {
				offset,
				color
			};
		}

		// Update canvas with all changes at once
		context.putImageData(tempImageData, 0, 0);

		if (!isButtonPressed) {
			isDragging = false;
		}
	};

	const handleMovePattern = (e: MouseEvent) => {
		if (saving) return;
		const isButtonPressed = e.buttons === 1;

		// Handle dragging early and skip pattern rendering
		if (isButtonPressed && dragThresholdReached(e)) {
			if (!isDragging) {
				// Clear pattern preview when starting to drag
				if (patternBuffer.length > 0) {
					const tempImageData = context.getImageData(0, 0, width, height);
					for (const { offset, color } of patternBuffer) {
						tempImageData.data.set(colorsPalette[color], offset * 4);
					}
					context.putImageData(tempImageData, 0, 0);
					patternBuffer = [];
				}
			}

			isDragging = true;
			dragThreshold = null;

			const zoomFactor = 1 / zoom;
			transform.x += e.movementX * zoomFactor;
			transform.y += e.movementY * zoomFactor;
			return;
		}

		const offset = getPixelOffset(e);
		const centerX = offset % width;
		const centerY = Math.floor(offset / width);

		// Create a temporary ImageData to batch our changes
		const tempImageData = context.getImageData(0, 0, width, height);

		// Restore previous pattern pixels
		if (patternBuffer.length > 0) {
			for (const { offset, color } of patternBuffer) {
				tempImageData.data.set(colorsPalette[color], offset * 4);
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
				imageData: tempImageData,
				offset: currentOffset
			});
			patternBuffer.push({ offset: currentOffset, color: currentColor });
			tempImageData.data.set(colorsPalette[patternColor], currentOffset * 4);
		}

		// Update canvas with all changes at once
		context.putImageData(tempImageData, 0, 0);

		if (!isButtonPressed) {
			isDragging = false;
		}
	};

	const handleMove = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		cursorPosition = {
			x: offset % width,
			y: Math.floor(offset / width)
		};

		if (selectedPattern === 'pixel') {
			handleMovePixel(e);
		} else {
			handleMovePattern(e);
		}
	};

	// clear buffer
	const handleLeave = () => {
		cursorPosition = null;
		if (pixelBuffer) {
			insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
		}
		// Restore pattern pixels
		if (patternBuffer.length > 0) {
			for (let i = 0; i < patternBuffer.length; i++) {
				const { offset, color } = patternBuffer[i];
				insertPixelAt(color, offset);
			}
			patternBuffer = [];
		}
		pixelBuffer = null;
	};
	// set scale factor
	const handleScroll = async (e: WheelEvent) => {
		const dir = Math.sign(e.deltaY);
		zoom -= dir;
		zoom = Math.max(minZoom, Math.min(maxZoom, zoom));
	};
	const setColor = (color: Color) => {
		selectedColor = color;
	};
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
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
				}}
				onmouseup={() => {
					pixelBuffer = null;
				}}
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

	<Button class="absolute right-4 top-4" onclick={() => mainGridSettingsDialog?.showModal()}
		>settings</Button
	>
	<Modal bind:dialog={mainGridSettingsDialog}>
		{#snippet header()}Settings{/snippet}
		<Settings bind:showCursorPosition bind:selectedPattern {mainGridSettingsDialog} />
	</Modal>
</div>

<style>
</style>
