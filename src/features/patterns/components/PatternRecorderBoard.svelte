<script lang="ts">
	import { onMount } from 'svelte';
	import type { Color } from '../../grid/types';
	import { height, PatternRecorder, scaleFactor, width } from '../../grid/pattern-recorder';
	import { generateWhiteUnit8ClampedArray, getHoveredPixelColor } from '../../grid/utils';
	import ColorOption from '../../grid/components/ColorOption.svelte';
	import { colorsStore } from '../../../stores/colors-store';

	let { dialog }: { dialog?: HTMLDialogElement } = $props();

	const patternRecorder = new PatternRecorder();

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let staticImageData: ImageData;
	let dynamicImageData: ImageData;

	let rect: DOMRect;

	const colorsPalette = colorsStore.get()!;

	let selectedColor = $state(colorsPalette['red'] as Color);
	let saving = $state<boolean>(false);

	onMount(() => {
		context = canvas.getContext('2d')!;

		staticImageData = new ImageData(generateWhiteUnit8ClampedArray(width, height), width, height);
		dynamicImageData = new ImageData(width, height);

		context.putImageData(staticImageData, 0, 0);
	});

	const setStaticPixel = ({ color, offset }: { color: Color; offset: number }) => {
		staticImageData.data.set(color, offset * 4);
		renderLayers();
	};

	const setDynamicPixel = ({ color, offset }: { color: number[]; offset: number }) => {
		dynamicImageData.data.set(color, offset * 4);
		renderLayers();
	};

	const handleCellClick = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		patternRecorder.addPixel({ offset, color: selectedColor });
		setStaticPixel({ color: selectedColor, offset });
	};

	const savePattern = () => {
		const pattern = patternRecorder.savePattern();
		console.log('Recorded Pattern:', pattern);
		dialog?.close();
	};

	const clearPattern = () => {
		staticImageData.data.fill(255);
		dynamicImageData.data.fill(0);
		context.putImageData(staticImageData, 0, 0);
		patternRecorder.clearPattern();
	};

	const getPixelOffset = (event: MouseEvent) => {
		rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const pixelX = (event.clientX - rect.left) * scaleX;
		const pixelY = (event.clientY - rect.top) * scaleY;
		const correctedX = Math.max(Math.floor(pixelX), 0);
		const correctedY = Math.max(Math.floor(pixelY), 0);

		return correctedY * width + correctedX;
	};

	const renderLayers = () => {
		const compositeImageData = new ImageData(
			new Uint8ClampedArray(staticImageData.data),
			width,
			height
		);

		for (let i = 0; i < dynamicImageData.data.length; i += 4) {
			if (dynamicImageData.data[i + 3] > 0) {
				compositeImageData.data.set(dynamicImageData.data.slice(i, i + 4), i);
			}
		}

		context.putImageData(compositeImageData, 0, 0);
	};

	const handleMovePixel = (e: MouseEvent) => {
		if (saving) return;
		const offset = getPixelOffset(e);

		// Clear previous hover effect
		dynamicImageData.data.fill(0);

		// Add new hover effect
		setDynamicPixel({ color: selectedColor, offset });
	};

	const handleLeave = () => {
		dynamicImageData.data.fill(0);
		renderLayers();
	};

	const setColor = (color: Color) => {
		selectedColor = color;
	};
</script>

<div class="flex flex-1 flex-col items-center gap-4 bg-gray-100">
	<div class="mt-4 text-lg font-bold text-gray-400">
		{width} x {height}
	</div>

	<div
		class="mx-8 flex items-center justify-center overflow-hidden"
		style={`height: ${height * scaleFactor}px; width: ${width * scaleFactor}px;`}
	>
		<canvas
			{width}
			{height}
			bind:this={canvas}
			onclick={handleCellClick}
			onmousemove={handleMovePixel}
			onmouseleave={handleLeave}
			style={`image-rendering: pixelated; transform: scale(${scaleFactor}, ${scaleFactor});`}
			class="bg-white"
		></canvas>
	</div>

	<div class="flex w-80 flex-wrap justify-center gap-2">
		{#each Object.values(colorsPalette) as RGBA_ARRAY}
			<ColorOption
				size="sm"
				onclick={() => setColor(RGBA_ARRAY)}
				selected={selectedColor === RGBA_ARRAY}
				color={RGBA_ARRAY}
			/>
		{/each}
	</div>

	<div class="flex w-full justify-center">
		<button
			class="flex h-10 w-full items-center justify-center bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 active:bg-gray-800"
			onclick={clearPattern}
		>
			CLEAR
		</button>
		<button
			class="flex h-10 w-full items-center justify-center bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 active:bg-gray-800"
			onclick={savePattern}
		>
			SAVE
		</button>
	</div>
</div>
