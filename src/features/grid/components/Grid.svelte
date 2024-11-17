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
	let rect: DOMRect;
	// svelte-ignore non_reactive_update
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let staticImageData: ImageData;
	let dynamicImageData: ImageData;

	const colorsPalette = colorsStore.get()!;

	let ws: WebSocket;
	const maxZoom = 30;
	const minZoom = 1.4;
	let isDragging = false;
	let dragThreshold: Coordinates | null = null;

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
	let selectedColor = $state(Object.keys(colorsPalette)[0] as Color);
	let selectedPattern = $state('pixel');
	let saving = $state(false);
	let cursorPosition = $state<{ x: number; y: number } | null>(null);
	let showCursorPosition = $state(false);

	const patterns = patternsStore.get();

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

		const offset = correctedY * staticImageData.width + correctedX;

		return offset;
	};

	const setStaticPixel = ({ color, offset }: { color: Color; offset: number }) => {
		const colorData = colorsPalette[color];
		if (!colorData) {
			console.warn(`Invalid color: ${color}`);
			return;
		}
		staticImageData.data.set(colorData, offset * 4);
		renderLayers();
	};

	const setDynamicPixel = ({ color, offset }: { color: Color; offset: number }) => {
		const colorData = colorsPalette[color];
		if (!colorData) {
			console.warn(`Invalid color: ${color}`);
			return;
		}
		dynamicImageData.data.set(colorData, offset * 4);
		renderLayers();
	};

	const clearDynamicLayer = () => {
		dynamicImageData = new ImageData(width, height);
		for (let i = 3; i < dynamicImageData.data.length; i += 4) {
			dynamicImageData.data[i] = 0;
		}
	};

	const renderLayers = () => {
		const compositeImageData = new ImageData(
			new Uint8ClampedArray(staticImageData.data),
			width,
			height
		);

		for (let i = 0; i < dynamicImageData.data.length; i += 4) {
			if (dynamicImageData.data[i + 3] > 0) {
				compositeImageData.data[i] = dynamicImageData.data[i];
				compositeImageData.data[i + 1] = dynamicImageData.data[i + 1];
				compositeImageData.data[i + 2] = dynamicImageData.data[i + 2];
				compositeImageData.data[i + 3] = dynamicImageData.data[i + 3];
			}
		}

		context.putImageData(compositeImageData, 0, 0);
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

		clearDynamicLayer();

		const pattern = patterns[selectedPattern]!;
		for (const { x: dx, y: dy, color: patternColor } of pattern) {
			const x = centerX + dx;
			const y = centerY + dy;

			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			setDynamicPixel({ color: patternColor as Color, offset: currentOffset });
		}

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
		rect = canvas.getBoundingClientRect();
		// prevent pixel / pattern sticking on frame miss after grid leaving
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

		pendingMove = e;

		if (isDragging) {
			accumulatedMovement.x += e.movementX;
			accumulatedMovement.y += e.movementY;
		}

		if (animationFrameId !== null) return;

		animationFrameId = requestAnimationFrame(
			selectedPattern === 'pixel' ? renderPixelFrame : renderPatternFrame
		);
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

	const savePixel = async (e: MouseEvent) => {
		if (isDragging) {
			isDragging = false;
			return;
		}
		const offset = getPixelOffset(e);
		const [r, g, b, a] = colorsPalette[selectedColor];
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

		const pattern = patterns[selectedPattern]!;
		const originalColors: { offset: number; color: Color }[] = [];
		const pixelsToUpdate: { offset: number; r: number; g: number; b: number; a: number }[] = [];

		for (let i = 0; i < pattern.length; i++) {
			const { x: dx, y: dy, color: patternColor } = pattern[i];
			const x = centerX + dx;
			const y = centerY + dy;

			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			const originalColor = getHoveredPixelColor({
				colorsPalette,
				imageData: staticImageData,
				offset: currentOffset
			});
			originalColors.push({ offset: currentOffset, color: originalColor });

			const [r, g, b, a] = colorsPalette?.[patternColor as Color];
			pixelsToUpdate.push({ offset: currentOffset, r, g, b, a });
		}

		const response = await setPattern({ pattern: pixelsToUpdate });

		if (response) {
			for (const { offset, r, g, b, a } of pixelsToUpdate) {
				setStaticPixel({ color: mapPixelDataToColor({ colorsPalette, r, g, b, a }), offset });
				ws.send(JSON.stringify({ offset, r, g, b, a }));
			}
		} else {
			for (const { offset, r, g, b, a } of pixelsToUpdate) {
				setDynamicPixel({ color: mapPixelDataToColor({ colorsPalette, r, g, b, a }), offset });
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
