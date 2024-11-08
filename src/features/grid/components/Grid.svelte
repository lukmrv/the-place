<script lang="ts">
	import { onMount } from 'svelte';
	import { getGridState, setPixel, PatternRecorder } from '../service';

	import { webSocketManager } from '../../../websocket-manager';
	import type { Color, Coordinates, Pixel } from '../types';
	import { colorsPalette, height, width } from '../const';
	import ColorOption from './ColorOption.svelte';
	import { create_tree, dog, duck, pacman, heart } from '../patterns';

	const patterns = {
		pixel: null,
		dog,
		heart,
		duck, // 90px
		pacman, // 150px
		tree: create_tree('autumn') // 805px
	};

	let ws: WebSocket;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let zoom = $state(5);
	let selectedColor = $state(Object.keys(colorsPalette)[0] as Color);
	let transform = $state({ x: 0, y: 0 });
	let selectedPattern = $state<keyof typeof patterns>('pixel');
	let saving = $state<boolean>(false);

	let isDragging = false;
	let pixelBuffer: Pixel | null = null;
	let patternBuffer: Pixel[] = [];
	let dragThreshold: Coordinates | null = null;

	const patternRecorder = new PatternRecorder();
	let isRecording = $state(false);

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

	const savePixel = async (e: MouseEvent) => {
		if (isDragging) {
			return;
		}
		const offset = getPixelOffset(e);
		insertPixelAt(selectedColor, offset);
		const [r, g, b, a] = colorsPalette[selectedColor];
		pixelBuffer = {
			offset: offset,
			color: selectedColor
		};

		ws.send(JSON.stringify({ offset, r, g, b, a }));
		await setPixel(offset, r, g, b, a);
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
		for (let i = 0; i < pattern.length; i++) {
			const { x: dx, y: dy, color: patternColor } = pattern[i];
			const x = centerX + dx;
			const y = centerY + dy;

			// Skip if outside canvas bounds
			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			const [r, g, b, a] = colorsPalette[patternColor];

			insertPixelAt(patternColor, currentOffset);
			ws.send(JSON.stringify({ offset: currentOffset, r, g, b, a }));
			await setPixel(currentOffset, r, g, b, a);
		}
	};

	const handleClick = async (e: MouseEvent) => {
		saving = true;
		if (isRecording) {
			handleCellClick(e);
		} else if (selectedPattern === 'pixel') {
			await savePixel(e);
		} else {
			await savePattern(e);
		}
		saving = false;
	};

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

				const zoomFactor = 1 / zoom;
				transform.x += e.movementX * zoomFactor;
				transform.y += e.movementY * zoomFactor;

				// reset hovered pixel on drag
				if (pixelBuffer) {
					insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
				}
			}
		}
	};

	const handleMovePattern = (e: MouseEvent) => {
		const offset = getPixelOffset(e);
		const centerX = offset % width;
		const centerY = Math.floor(offset / width);
		const isButtonPressed = e.buttons === 1;

		// Clear previous pattern preview
		if (patternBuffer.length > 0) {
			for (let i = 0; i < patternBuffer.length; i++) {
				const { offset, color } = patternBuffer[i];
				insertPixelAt(color, offset);
			}
			patternBuffer = [];
		}

		// Draw new pattern preview
		const pattern = patterns[selectedPattern]!;
		for (let i = 0; i < pattern.length; i++) {
			const { x: dx, y: dy, color: patternColor } = pattern[i];
			const x = centerX + dx;
			const y = centerY + dy;

			if (x < 0 || x >= width || y < 0 || y >= height) continue;

			const currentOffset = y * width + x;
			const currentColor = getHoveredPixelColor(currentOffset);
			patternBuffer.push({ offset: currentOffset, color: currentColor });
			insertPixelAt(patternColor, currentOffset);
		}

		// HANDLE DRAG
		if (!isButtonPressed) {
			isDragging = false;
		}
		if (isButtonPressed) {
			if (dragThresholdReached(e)) {
				isDragging = true;
				dragThreshold = null;

				const zoomFactor = 1 / zoom;
				transform.x += e.movementX * zoomFactor;
				transform.y += e.movementY * zoomFactor;

				// Clear pattern preview when dragging
				if (patternBuffer.length > 0) {
					for (let i = 0; i < patternBuffer.length; i++) {
						const { offset, color } = patternBuffer[i];
						insertPixelAt(color, offset);
					}
					patternBuffer = [];
				}
				return;
			}
		}
	};

	const handleMove = (e: MouseEvent) => {
		if (selectedPattern === 'pixel') {
			handleMovePixel(e);
		} else {
			handleMovePattern(e);
		}
	};

	// clear buffer
	const handleLeave = () => {
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
		zoom = Math.max(5, Math.min(30, zoom));
	};
	const setColor = (color: Color) => {
		selectedColor = color;
	};
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div
	class:cursor-wait={saving}
	class="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100"
>
	<div class:pointer-events-none={saving} style={`transform: scale(${zoom}, ${zoom});`}>
		<div
			class="overflow-hidden"
			style={`transform: translate(${transform.x}px, ${transform.y}px);`}
		>
			<canvas
				{width}
				{height}
				bind:this={canvas}
				onclick={(e) => handleClick(e)}
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
				class="bg-white"
			/>
		</div>
	</div>
	<div class="absolute bottom-4 z-10 flex gap-2 border-2 border-gray-300 bg-white p-2">
		{#each Object.keys(colorsPalette) as (keyof typeof colorsPalette)[] as colorOption}
			<ColorOption
				onclick={() => setColor(colorOption)}
				selected={selectedColor === colorOption}
				color={colorsPalette[colorOption]}
			/>
		{/each}
	</div>

	<label class="absolute right-4 top-4 z-10 flex flex-col items-end">
		<span class="text-xs">Select Pattern</span>
		<select bind:value={selectedPattern} class="w-40 border border-gray-300 bg-white p-1 text-xs">
			{#each Object.entries(patterns) as [patternName]}
				<option value={patternName}>
					{patternName}
				</option>
			{/each}
		</select>
	</label>

	<div class="absolute left-4 top-4 z-10 flex flex-col items-end">
		<!-- Add recording controls -->
		<div class="controls">
			{#if !isRecording}
				<button onclick={startRecording}>Start Recording Pattern</button>
			{:else}
				<button onclick={stopRecording}>Stop Recording Pattern</button>
			{/if}
		</div>

		<!-- Add recording indicator -->
		{#if isRecording}
			<div class="recording-indicator">Recording Pattern...</div>
		{/if}
	</div>
</div>

<style>
	.controls {
		margin-bottom: 1rem;
	}

	.recording-indicator {
		color: red;
		margin-bottom: 1rem;
		font-weight: bold;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #45a049;
	}
</style>
