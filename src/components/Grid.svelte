<script lang="ts">
	import { onMount } from 'svelte';
	import { getGridState, setPixel } from '../features/grid/service';

	import { colorsPalette, height, width } from '../features/grid/const';
	import ColorOption from './ColorOption.svelte';
	import { webSocketManager } from '../websocket-manager';

	type Pixel = { offset: number | null; color: keyof typeof colorsPalette | null };

	let ws: WebSocket;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let zoom = $state(5);
	let selectedColor = $state(Object.keys(colorsPalette)[0] as keyof typeof colorsPalette);
	let transform = $state({ x: 0, y: 0 });

	let isDragging = false;
	let pixelBuffer: Pixel = { offset: null, color: null };

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
			insertPixel(mapPixelDataToColor({ r, g, b, a }), offset);
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

	const insertPixel = (color: keyof typeof colorsPalette, offset: number) => {
		const [r, g, b, a] = colorsPalette[color];

		imageData.data[offset * 4] = r;
		imageData.data[offset * 4 + 1] = g;
		imageData.data[offset * 4 + 2] = b;
		imageData.data[offset * 4 + 3] = a;

		context.putImageData(imageData, 0, 0);
	};

	const handleClick = async (e: MouseEvent) => {
		if (isDragging) {
			return;
		}

		const offset = getPixelOffset(e);
		insertPixel(selectedColor, offset);
		const [r, g, b, a] = colorsPalette[selectedColor];
		pixelBuffer = {
			offset: offset,
			color: selectedColor
		};

		ws.send(JSON.stringify({ offset, r, g, b, a }));
		await setPixel(offset, r, g, b, a);
	};
	const handleMove = (e: MouseEvent) => {
		if (e.buttons === 1) {
			isDragging = true;

			const zoomFactor = 1 / zoom;
			transform.x += e.movementX * zoomFactor;
			transform.y += e.movementY * zoomFactor;

			if (pixelBuffer.color && pixelBuffer.offset) {
				insertPixel(pixelBuffer.color, pixelBuffer.offset);
			}
			return;
		} else {
			isDragging = false;
		}

		const offset = getPixelOffset(e);
		const hoveredPixelColor = getHoveredPixelColor(offset);
		if (offset !== pixelBuffer.offset) {
			insertPixel(selectedColor, offset);
			if (pixelBuffer.color && pixelBuffer.offset) {
				insertPixel(pixelBuffer.color, pixelBuffer.offset);
			}
			pixelBuffer = {
				offset: offset,
				color: hoveredPixelColor
			};
		}
	};
	const handleLeave = () => {
		if (pixelBuffer.color && pixelBuffer.offset) {
			insertPixel(pixelBuffer.color, pixelBuffer.offset);
			pixelBuffer = {
				offset: null,
				color: null
			};
		}
	};
	const selectColor = (color: keyof typeof colorsPalette) => {
		selectedColor = color;
	};

	const handleScroll = async (e: WheelEvent) => {
		const dir = Math.sign(e.deltaY);
		zoom -= dir;
		zoom = Math.max(5, Math.min(30, zoom));
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
			onclick={() => selectColor(colorOption)}
			selected={selectedColor === colorOption}
			color={colorsPalette[colorOption]}
		/>
	{/each}
</div>
