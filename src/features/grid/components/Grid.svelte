<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { setPattern, setPixel } from '../service';

	import { webSocketManager } from '../../../websocket-manager';
	import type { Color, Coordinate, InsertMode } from '../types';
	import ColorOption from './ColorOption.svelte';
	import {
		checkColorEquality,
		generateWhiteUnit8ClampedArray,
		getHoveredPixelColor,
		lerp
	} from '../utils';
	import Modal from '../../../components/Modal.svelte';
	import Button from '../../../components/Button.svelte';
	import Settings from './Settings.svelte';
	import type { LayoutData } from '../../../routes/$types';
	import { colorsStore } from '../../../stores/colors-store';
	import { browser } from '$app/environment';
	import type { ResponseGridPatternCoordinate } from '../../patterns/types';
	import { challengeStore } from '../../../stores/challenge-store';

	const STORAGE_KEY_TRANSFORM = 'grid_transform';
	const STORAGE_KEY_ZOOM = 'grid_zoom';

	let { gridState }: { gridState: Awaited<Awaited<LayoutData>['gridState']> } = $props();

	const width = gridState?.grid.width ?? 0;
	const height = gridState?.grid.height ?? 0;

	const pixels = gridState?.pixels ?? generateWhiteUnit8ClampedArray(width, height);

	const challenge = challengeStore.get();
	console.log('challenge', challenge);

	// svelte-ignore non_reactive_update
	let canvas: HTMLCanvasElement;
	let rect = $state<DOMRect | null>(null);
	let context: CanvasRenderingContext2D;
	let staticImageData: ImageData;
	let dynamicImageData: ImageData;

	const colorsPalette = colorsStore.get()!;

	let ws: WebSocket;
	const maxZoom = 30;
	const minZoom = 0.4;
	let isDragging = false;
	let dragThreshold: Coordinate | null = null;

	let mainGridSettingsDialog = $state<HTMLDialogElement | undefined>();
	let zoom = $state(
		(() => {
			const DEFAULT_ZOOM = 7;
			const savedZoom = browser
				? Number(localStorage.getItem(STORAGE_KEY_ZOOM)) || DEFAULT_ZOOM
				: DEFAULT_ZOOM;
			return savedZoom;
		})()
	);
	let transform = $state(
		(() => {
			const DEFAULT_TRANSFORM = { x: 0, y: 0 };
			const localStorageTransform = browser
				? localStorage.getItem(STORAGE_KEY_TRANSFORM)
					? JSON.parse(localStorage.getItem(STORAGE_KEY_TRANSFORM)!)
					: DEFAULT_TRANSFORM
				: DEFAULT_TRANSFORM;
			const savedTransform = browser ? localStorageTransform : DEFAULT_TRANSFORM;
			return savedTransform;
		})()
	);
	let selectedColor = $state(colorsPalette['red'] as Color);
	let selectedMode = $state<InsertMode>('pixel');
	let selectedPattern = $state<Record<string, ResponseGridPatternCoordinate[]> | null>(null);
	let saving = $state(false);
	let cursorPosition = $state<{ x: number; y: number } | null>(null);
	let showCursorPosition = $state(false);

	let animationFrameId: number | null = null;
	let pendingMove: MouseEvent | null = null;
	let accumulatedMovement = { x: 0, y: 0 };

	onMount(() => {
		staticImageData = new ImageData(pixels, width, height);
		dynamicImageData = new ImageData(width, height);
		context = canvas.getContext('2d')!;

		context.putImageData(staticImageData, 0, 0);

		ws = webSocketManager();
		ws.onmessage = (e) => {
			const { offset, r, g, b, a } = JSON.parse(e.data);
			setStaticPixel({
				color: [r, g, b, a],
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

		const offset = correctedY * staticImageData.width + correctedX;

		return offset;
	};

	const setStaticPixel = ({ color, offset }: { color: Color; offset: number }) => {
		staticImageData.data[offset * 4] = color[0];
		staticImageData.data[offset * 4 + 1] = color[1];
		staticImageData.data[offset * 4 + 2] = color[2];
		staticImageData.data[offset * 4 + 3] = color[3];

		renderLayers();
	};

	const setDynamicPixel = ({ color, offset }: { color: number[]; offset: number }) => {
		dynamicImageData.data[offset * 4] = color[0];
		dynamicImageData.data[offset * 4 + 1] = color[1];
		dynamicImageData.data[offset * 4 + 2] = color[2];
		dynamicImageData.data[offset * 4 + 3] = color[3];

		renderLayers();
	};

	const clearDynamicLayer = () => {
		dynamicImageData = new ImageData(width, height);
		for (let i = 3; i < dynamicImageData.data.length; i += 4) {
			dynamicImageData.data[i] = 0;
		}
	};

	const renderLayers = () => {
		const compositeArray = new Uint8ClampedArray(staticImageData.data);

		for (let i = 0; i < dynamicImageData.data.length; i += 4) {
			if (dynamicImageData.data[i + 3] > 0) {
				compositeArray[i] = dynamicImageData.data[i];
				compositeArray[i + 1] = dynamicImageData.data[i + 1];
				compositeArray[i + 2] = dynamicImageData.data[i + 2];
				compositeArray[i + 3] = dynamicImageData.data[i + 3];
			}
		}

		context.putImageData(new ImageData(compositeArray, width, height), 0, 0);
	};

	const renderPixelFrame = () => {
		animationFrameId = null;
		if (!pendingMove) return;

		const e = pendingMove;
		pendingMove = null;

		if (saving) return;
		const isButtonPressed = e.buttons === 1;

		if (isButtonPressed && dragThresholdReached(e)) {
			handleDragging(e);
			return;
		}

		const offset = getPixelOffset(e);
		clearDynamicLayer();
		setDynamicPixel({ color: selectedColor, offset });
		renderLayers();

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

		if (isButtonPressed && dragThresholdReached(e)) {
			handleDragging(e);
			return;
		}

		const offset = getPixelOffset(e);
		const centerX = offset % width;
		const centerY = Math.floor(offset / width);

		const newDynamicData = new Uint8ClampedArray(width * height * 4);

		const pattern = Object.values(selectedPattern ?? {})[0]!;

		for (let { x: dx, y: dy, r, g, b, a } of pattern) {
			// TODO - change variable color for patterns
			if (selectedMode === 'letter') {
				[r, g, b, a] = selectedColor;
			}
			const x = centerX + dx;
			const y = centerY + dy;

			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = (y * width + x) * 4;
			newDynamicData[currentOffset] = r;
			newDynamicData[currentOffset + 1] = g;
			newDynamicData[currentOffset + 2] = b;
			newDynamicData[currentOffset + 3] = a;
		}

		dynamicImageData = new ImageData(newDynamicData, width, height);
		renderLayers();

		if (!isButtonPressed) {
			isDragging = false;
		}
	};

	const handleDragging = (e: MouseEvent) => {
		isDragging = true;
		dragThreshold = null;

		if (accumulatedMovement.x !== 0 || accumulatedMovement.y !== 0) {
			const zoomFactor = 1 / zoom;
			transform.x += accumulatedMovement.x * zoomFactor;
			transform.y += accumulatedMovement.y * zoomFactor;
			accumulatedMovement = { x: 0, y: 0 };
		}

		clearDynamicLayer();
		renderLayers();
	};

	const handleLeave = () => {
		cursorPosition = null;

		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		pendingMove = null;
		clearDynamicLayer();
		renderLayers();
	};

	const handleMove = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		cursorPosition = {
			x: offset % width,
			y: Math.floor(offset / width)
		};

		pendingMove = e;

		if (isDragging) {
			accumulatedMovement.x += e.movementX;
			accumulatedMovement.y += e.movementY;
		}

		if (animationFrameId !== null) return;

		animationFrameId = requestAnimationFrame(
			selectedMode === 'pixel' ? renderPixelFrame : renderPatternFrame
		);
	};

	const handleClick = async (e: MouseEvent) => {
		saving = true;
		if (selectedMode === 'pixel') {
			await savePixel(e);
		} else {
			await savePattern(e);
		}
		saving = false;
	};

	const savePixel = async (e: MouseEvent) => {
		if (isDragging) {
			isDragging = false;
			return;
		}
		const offset = getPixelOffset(e);
		const [r, g, b, a] = selectedColor;
		const response = await setPixel({ offset, r, g, b, a });
		if (response) {
			setStaticPixel({ color: selectedColor, offset });
			ws.send(JSON.stringify({ offset, r, g, b, a }));
		} else {
			setDynamicPixel({ color: selectedColor, offset });
		}
	};
	const savePattern = async (e: MouseEvent) => {
		if (isDragging) {
			isDragging = false;
			return;
		}

		const offset = getPixelOffset(e);
		const centerX = offset % width;
		const centerY = Math.floor(offset / width);

		const pattern = Object.values(selectedPattern ?? {})[0]!;
		const originalColors: { offset: number; color: Color }[] = [];
		const pixelsToUpdate: { offset: number; r: number; g: number; b: number; a: number }[] = [];

		for (let i = 0; i < pattern.length; i++) {
			let { x: dx, y: dy, r, g, b, a } = pattern[i];
			// TODO - change variable color for patterns
			if (selectedMode === 'letter') {
				[r, g, b, a] = selectedColor;
			}
			const x = centerX + dx;
			const y = centerY + dy;

			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			const originalColor = getHoveredPixelColor({
				imageData: staticImageData,
				offset: currentOffset
			});
			originalColors.push({ offset: currentOffset, color: originalColor });

			pixelsToUpdate.push({ offset: currentOffset, r, g, b, a });
		}

		const response = await setPattern(pixelsToUpdate);

		if (response) {
			for (const { offset, r, g, b, a } of pixelsToUpdate) {
				setStaticPixel({ color: [r, g, b, a], offset });
				ws.send(JSON.stringify({ offset, r, g, b, a }));
			}
		} else {
			for (const { offset, r, g, b, a } of pixelsToUpdate) {
				setDynamicPixel({ color: [r, g, b, a], offset });
			}
		}
	};

	const dragThresholdReached = (e: MouseEvent) =>
		dragThreshold === null ||
		Math.abs(e.clientX - dragThreshold.x) > 5 ||
		Math.abs(e.clientY - dragThreshold.y) > 5;

	const handleScroll = async (e: WheelEvent) => {
		const dir = Math.sign(e.deltaY);
		zoom -= dir;
		zoom = Math.max(minZoom, Math.min(maxZoom, zoom));
		localStorage.setItem(STORAGE_KEY_ZOOM, zoom.toString());
	};
	const setColor = (color: Color) => {
		selectedColor = color;
	};

	const handleMouseUp = () => {
		localStorage.setItem(STORAGE_KEY_TRANSFORM, JSON.stringify(transform));
	};

	const isGridOffscreen = () => {
		if (!rect) return false;
		const viewportWidth = rect.width;
		const viewportHeight = rect.height;
		const scaledGridWidth = width * zoom;
		const scaledGridHeight = height * zoom;

		// Check if any part of the grid is outside the viewport
		return (
			Math.abs(transform.x) > 0 ||
			Math.abs(transform.y) > 0 ||
			scaledGridWidth > viewportWidth ||
			scaledGridHeight > viewportHeight
		);
	};

	const centerGrid = () => {
		const duration = 500; // Animation duration in ms
		const startX = transform.x;
		const startY = transform.y;
		const startTime = Date.now();

		let animationFrameId: number | null = null;

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const t = Math.min(elapsed / duration, 1);

			transform.x = lerp(startX, t);
			transform.y = lerp(startY, t);

			if (t < 1) {
				animationFrameId = requestAnimationFrame(animate);
			} else {
				cancelAnimationFrame(animationFrameId!);
				localStorage.setItem(STORAGE_KEY_TRANSFORM, JSON.stringify(transform));
			}
		};

		requestAnimationFrame(animate);
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
				style="left: {rect?.left ? rect.left + cursorPosition.x * zoom - 70 : 0}px; top: {rect?.top
					? rect.top + cursorPosition.y * zoom - 26
					: 0}px"
			>
				{cursorPosition.x}, {cursorPosition.y}
			</div>
		{/if}

		<div class="absolute bottom-4 z-10 flex items-center gap-2">
			<div class="flex gap-2 border-2 border-gray-300 bg-white p-2">
				{#each Object.keys(colorsPalette) as (keyof typeof colorsPalette)[] as colorOption}
					<ColorOption
						onclick={() => setColor(colorsPalette[colorOption])}
						selected={checkColorEquality(selectedColor, colorsPalette[colorOption])}
						color={colorsPalette[colorOption]}
					/>
				{/each}
			</div>

			{#if isGridOffscreen()}
				<Button onclick={centerGrid} class="border-2 border-gray-300">center</Button>
			{/if}
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
	<Settings
		bind:showCursorPosition
		bind:selectedMode
		bind:selectedPattern
		{mainGridSettingsDialog}
	/>
</Modal>

<style>
</style>
