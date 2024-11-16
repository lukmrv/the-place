<script lang="ts">
	import { onMount } from 'svelte';
	import type { Color, Coordinates, Pixel } from '../../grid/types';
	import { colorsPalette } from '../../grid/const';
	import { height, PatternRecorder, scaleFactor, width } from '../../grid/pattern-recorder';
	import { generateWhiteUnit8ClampedArray, getHoveredPixelColor } from '../../grid/utils';
	import ColorOption from '../../grid/components/ColorOption.svelte';

	let { dialog }: { dialog?: HTMLDialogElement } = $props();

	const patternRecorder = new PatternRecorder();

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let selectedColor = $state(Object.keys(colorsPalette)[0] as Color);
	let saving = $state<boolean>(false);
	let isRecording = $state(false);

	let pixelBuffer: Pixel | null = null;

	onMount(() => {
		context = canvas.getContext('2d')!;
		imageData = new ImageData(generateWhiteUnit8ClampedArray(width, height), width, height);
	});

	const handleCellClick = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		const color = getHoveredPixelColor({ imageData, offset });
		patternRecorder.addPixel({ offset, color });
	};

	const savePattern = () => {
		const pattern = patternRecorder.savePattern();

		console.log('Recorded Pattern:', pattern);

		dialog?.close();
	};

	const clearPattern = () => {
		imageData.data.fill(255);
		context.putImageData(imageData, 0, 0);
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

		const offset = correctedY * imageData.width + correctedX;

		return offset;
	};

	// mutate imageDataObject
	const insertPixelAt = (color: Color, offset: number) => {
		imageData.data.set(colorsPalette[color], offset * 4);
		context.putImageData(imageData, 0, 0);
	};

	const handleMovePixel = (e: MouseEvent) => {
		if (saving) return;
		const offset = getPixelOffset(e);
		const color = getHoveredPixelColor({ imageData, offset });
		const hoveredPixelChanged = offset !== pixelBuffer?.offset;

		// HANDLE ENTER
		if (!pixelBuffer) {
			insertPixelAt(selectedColor, offset);
			pixelBuffer = {
				offset,
				color
			};
		}

		if (pixelBuffer && hoveredPixelChanged) {
			// restore buffer pixel
			insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
			// set hovered pixel
			insertPixelAt(selectedColor, offset);
			// update buffer
			pixelBuffer = {
				offset,
				color
			};
		}
	};

	const handleLeave = () => {
		if (pixelBuffer) {
			insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
		}
		pixelBuffer = null;
	};

	const setColor = (color: Color) => {
		selectedColor = color;
	};
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
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
			onmouseup={() => {
				pixelBuffer = null;
			}}
			style={`image-rendering: pixelated; transform: scale(${scaleFactor}, ${scaleFactor});`}
			class=" bg-white"
		/>
	</div>

	<div class="flex w-80 flex-wrap justify-center gap-2">
		{#each Object.keys(colorsPalette) as (keyof typeof colorsPalette)[] as colorOption}
			<ColorOption
				size="sm"
				onclick={() => setColor(colorOption)}
				selected={selectedColor === colorOption}
				color={colorsPalette[colorOption]}
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
