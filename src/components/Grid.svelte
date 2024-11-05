<script lang="ts">
	import { onMount } from 'svelte';
	import { getGridState, setPixel } from '../features/grid/service';

	import { colorsPalette, height, width } from '../features/grid/const';
	import ColorOption from './ColorOption.svelte';
	import { webSocketManager } from '../websocket-manager';

	let ws: WebSocket;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let imageData: ImageData;
	let rect: DOMRect;

	let selectedColor = $state(Object.keys(colorsPalette)[0] as keyof typeof colorsPalette);

	type Pixel = { offset: number | null; color: keyof typeof colorsPalette | null };
	let pixelBuffer: Pixel = { offset: null, color: null };

	onMount(() => {
		(async () => {
			const gridState = await getGridState();
			imageData = new ImageData(gridState, width, height);
			context.putImageData(imageData, 0, 0);
		})();

		rect = canvas.getBoundingClientRect();
		context = canvas.getContext('2d')!;

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
		const r = imageData.data[offset * 4];
		const g = imageData.data[offset * 4 + 1];
		const b = imageData.data[offset * 4 + 2];
		const a = imageData.data[offset * 4 + 3];

		return mapPixelDataToColor({ r, g, b, a });
	};

	const getPixelOffset = (event: MouseEvent) => {
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
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<canvas
	{width}
	{height}
	bind:this={canvas}
	onclick={handleClick}
	onmousemove={handleMove}
	onmouseleave={handleLeave}
	style="image-rendering: pixelated; transform: scale(6, 6); outline: 0.5px solid;"
/>
<div class="absolute bottom-4 z-10 flex gap-2 border-2 border-gray-300 bg-white p-2">
	{#each Object.keys(colorsPalette) as (keyof typeof colorsPalette)[] as colorOption}
		<ColorOption
			onclick={() => selectColor(colorOption)}
			selected={selectedColor === colorOption}
			color={colorsPalette[colorOption]}
		/>
	{/each}
</div>
