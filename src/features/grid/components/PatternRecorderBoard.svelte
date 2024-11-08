<script lang="ts">
	import { onMount } from 'svelte';
	import type { Color, Coordinates, Pixel } from '../types';
	import { colorsPalette } from '../const';
	import { height, PatternRecorder, width } from '../pattern-recorder';
	import Button from '../../../components/Button.svelte';

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
		const whiteArray = Array.from({ length: width * height * 4 }, () => 255);
		imageData = new ImageData(new Uint8ClampedArray(whiteArray), width, height);
	});

	function handleCellClick(e: MouseEvent) {
		const offset = getPixelOffset(e);
		const color = getHoveredPixelColor(offset);
		patternRecorder.addPixel({ offset, color });
	}

	function savePattern() {
		const pattern = patternRecorder.savePattern();
		console.log('Recorded Pattern:', pattern);
		// You can emit this pattern to parent component or handle it as needed
	}

	const mapPixelDataToColor = ({ r, g, b, a }: { r: number; g: number; b: number; a: number }) => {
		return Object.entries(colorsPalette).find(
			([, color]) => color[0] === r && color[1] === g && color[2] === b
		)?.[0] as keyof typeof colorsPalette;
	};

	const getHoveredPixelColor = (offset: number) => {
		const r = imageData.data?.[offset * 4];
		const g = imageData.data?.[offset * 4 + 1];
		const b = imageData.data?.[offset * 4 + 2];
		const a = imageData.data?.[offset * 4 + 3];

		return mapPixelDataToColor({ r, g, b, a });
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
		if (saving) return;
		const [r, g, b, a] = colorsPalette[color];
		imageData.data[offset * 4] = r;
		imageData.data[offset * 4 + 1] = g;
		imageData.data[offset * 4 + 2] = b;
		imageData.data[offset * 4 + 3] = a;
		context.putImageData(imageData, 0, 0);
	};

	const handleMovePixel = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		const color = getHoveredPixelColor(offset);
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
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div class="flex flex-col">
	<div class="flex h-80 w-80 items-center justify-center overflow-hidden bg-gray-100">
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
			style="image-rendering: pixelated; transform: scale(30, 30);"
			class=" bg-white"
		/>
	</div>
	<button
		class="flex h-10 flex-col items-center justify-center bg-gray-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 ease-in-out"
		onclick={savePattern}
	>
		<svg
			class="mr-2 h-4 w-4"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
			/>
		</svg>
		Save Pattern
	</button>
</div>
