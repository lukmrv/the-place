import type { colorsPalette } from './const';

export type RemoteGridState = {
	offset: number;
	r: number;
	g: number;
	b: number;
	a: number;
}[];

export interface Coordinates {
	x: number;
	y: number;
}

export type Color = keyof typeof colorsPalette;
export type Pixel = { offset: number; color: Color };
