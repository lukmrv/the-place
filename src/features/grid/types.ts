export type ColorsPalette = Record<string, [number, number, number, number]>;
export type Color = keyof ColorsPalette;

export interface Coordinates {
	x: number;
	y: number;
}

export type Pixel = { offset: number; color: Color };
export type Pattern = (Coordinates & Pick<Pixel, 'color'>)[];

export type RecordingSize = '4x4' | '6x6' | '10x10';

export interface RecordingDimensions {
	width: number;
	height: number;
}

export type Grid =
	| {
			grid: { id: number; width: number; height: number; cooldown_in_ms: number };
			pixels: Uint8ClampedArray;
	  }
	| undefined;

export type RemoteGridDbState = {
	offset: number;
	r: number;
	g: number;
	b: number;
	a: number;
}[];
