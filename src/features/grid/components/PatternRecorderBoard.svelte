<script lang="ts">
	import { onMount } from 'svelte';
	import type { Color, Coordinates, Pixel } from '../types';
	import { colorsPalette } from '../const';
	import { height, PatternRecorder, width } from '../pattern-recorder';

	const patternRecorder = new PatternRecorder();

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let selectedColor = $state(Object.keys(colorsPalette)[0] as Color);
	let transform = $state({ x: 0, y: 0 });
	let saving = $state<boolean>(false);
	let isRecording = $state(false);

	let isDragging = false;
	let pixelBuffer: Pixel | null = null;
	let dragThreshold: Coordinates | null = null;

	onMount(() => {
		context = canvas.getContext('2d')!;
		context.imageSmoothingEnabled = false;
		const whiteArray = Array.from({ length: width * height * 4 }, () => 255);
		imageData = new ImageData(new Uint8ClampedArray(whiteArray), width, height);
	});

	function handleCellClick(e: MouseEvent) {
		if (!isRecording) return;

		const offset = getPixelOffset(e);
		const color = getHoveredPixelColor(offset);
		if (color) {
			patternRecorder.addPixel({ offset, color });
		}
	}

	function startRecording() {
		isRecording = true;
		patternRecorder.startRecording();
	}

	function stopRecording() {
		isRecording = false;
		const pattern = patternRecorder.stopRecording();
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
	const dragThresholdReached = (e: MouseEvent) =>
		dragThreshold === null ||
		Math.abs(e.clientX - dragThreshold.x) > 5 ||
		Math.abs(e.clientY - dragThreshold.y) > 5;

	const handleMovePixel = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		const color = getHoveredPixelColor(offset);
		const isButtonPressed = e.buttons === 1;
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

		// HANDLE DRAG
		if (!isButtonPressed) {
			isDragging = false;
		}
		if (isButtonPressed) {
			if (dragThresholdReached(e)) {
				isDragging = true;
				dragThreshold = null;

				const zoomFactor = 1 / 60;
				transform.x += e.movementX * zoomFactor;
				transform.y += e.movementY * zoomFactor;

				// reset hovered pixel on drag
				if (pixelBuffer) {
					insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
				}
			}
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
<div class="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100">
	<canvas
		{width}
		{height}
		bind:this={canvas}
		onclick={handleCellClick}
		onmousemove={handleMovePixel}
		onmouseleave={handleLeave}
		onmousedown={(e) => {
			dragThreshold = { x: e.clientX, y: e.clientY };
		}}
		onmouseup={() => {
			pixelBuffer = null;
		}}
		style="image-rendering: pixelated; transform: scale(60, 60);"
		class="bg-white"
	/>
</div>
<div class="absolute left-4 top-4 z-10 flex flex-col items-end">
	<!-- Add recording controls -->
	<div class="controls">
		{#if !isRecording}
			<button class="bg-gray-300 p-1 text-xs" onclick={startRecording}
				>Start Recording Pattern</button
			>
		{:else}
			<button class="bg-gray-300 p-1 text-xs" onclick={stopRecording}>Stop Recording Pattern</button
			>
		{/if}
	</div>

	<!-- Add recording indicator -->
	{#if isRecording}
		<div class="recording-indicator">Recording Pattern...</div>
	{/if}
</div>
