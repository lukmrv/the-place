<script lang="ts">
	import { onMount } from 'svelte';
	import { getGridState, setPixel } from '../features/grid/service';

	import { colorsPalette, height, width } from '../features/grid/const';
	import ColorOption from './ColorOption.svelte';
	import { webSocketManager } from '../websocket-manager';
	import type { Color, Coordinates, Pixel } from '../features/grid/types';

	let ws: WebSocket;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let zoom = $state(5);
	let selectedColor = $state(Object.keys(colorsPalette)[0] as keyof typeof colorsPalette);
	let transform = $state({ x: 0, y: 0 });

	let isDragging = false;
	let pixelBuffer: Pixel | null = null;
	let dragThreshold: Coordinates | null = null;

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

	const handleClick = async (e: MouseEvent) => {
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

	const handleMove = (e: MouseEvent) => {
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
	// clear buffer
	const handleLeave = () => {
		if (pixelBuffer) {
			insertPixelAt(pixelBuffer.color, pixelBuffer.offset);
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
<div class="flex h-full w-full items-center justify-center overflow-hidden bg-gray-100">
	<div style={`transform: scale(${zoom}, ${zoom});`}>
		<div
			class="overflow-hidden"
			style={`transform: translate(${transform.x}px, ${transform.y}px);`}
		>
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
				class="bg-white"
			/>
		</div>
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
