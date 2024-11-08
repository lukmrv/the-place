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
				isRecording && (pixelBuffer = null);
			}}
			style="image-rendering: pixelated; transform: scale(30, 30);"
			class=" bg-white"
		/>
	</div>
	<div class="flex flex-col items-center justify-center">
		<!-- Add recording controls -->
		<div class="my-8">
			<Button color="fancy" onclick={() => (isRecording ? stopRecording() : startRecording())}
				>{isRecording ? 'Stop Recording' : 'Start Recording'}</Button
			>
		</div>
	</div>
</div>
