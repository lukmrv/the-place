import type { Color } from './types';

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

	return [r, g, b, a];
};

export const generateWhiteUnit8ClampedArray = (width: number, height: number) => {
	const whiteArray = Array.from({ length: width * height * 4 }, (_, i) => 255);
	return new Uint8ClampedArray(whiteArray);
};

export const checkColorEquality = (color1: Color, color2: Color) =>
	color1[0] === color2[0] &&
	color1[1] === color2[1] &&
	color1[2] === color2[2] &&
	color1[3] === color2[3];
