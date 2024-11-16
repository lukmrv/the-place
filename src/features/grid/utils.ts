import type { ColorsPalette } from './types';

export const mapPixelDataToColor = ({
	colorsPalette,
	r,
	g,
	b,
	a
}: {
	colorsPalette: ColorsPalette;
	r: number;
	g: number;
	b: number;
	a: number;
}) => {
	return Object.entries(colorsPalette).find(
		([, color]) => color[0] === r && color[1] === g && color[2] === b
	)?.[0] as keyof typeof colorsPalette;
};

export const getHoveredPixelColor = ({
	colorsPalette,
	imageData,
	offset
}: {
	colorsPalette: ColorsPalette;
	imageData: ImageData;
	offset: number;
}) => {
	const r = imageData.data?.[offset * 4];
	const g = imageData.data?.[offset * 4 + 1];
	const b = imageData.data?.[offset * 4 + 2];
	const a = imageData.data?.[offset * 4 + 3];

	return mapPixelDataToColor({ colorsPalette, r, g, b, a });
};

export const generateWhiteUnit8ClampedArray = (width: number, height: number) => {
	const whiteArray = Array.from({ length: width * height * 4 }, (_, i) => (i % 4 === 3 ? 1 : 255));
	return new Uint8ClampedArray(whiteArray);
};
