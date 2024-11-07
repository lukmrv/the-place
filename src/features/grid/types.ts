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
export type Pattern = (Coordinates & Pick<Pixel, 'color'>)[];

export type RecordingSize = '4x4' | '6x6' | '10x10';

export interface RecordingDimensions {
	width: number;
	height: number;
}
