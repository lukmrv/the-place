import { colorsPalette } from './const';
import type { Color } from './types';

export const mapPixelDataToColor = ({
	r,
	g,
	b,
	a
}: {
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
	imageData,
	offset
}: {
	imageData: ImageData;
	offset: number;
}) => {
	const r = imageData.data?.[offset * 4];
	const g = imageData.data?.[offset * 4 + 1];
	const b = imageData.data?.[offset * 4 + 2];
	const a = imageData.data?.[offset * 4 + 3];

	return mapPixelDataToColor({ r, g, b, a });
};
