export type InsertMode = 'pixel' | 'letter' | 'pattern';

export type Coordinate = {
	x: number;
	y: number;
};

export type Grid = {
	id: string;
	name: string;
	width: number;
	height: number;
};

export type GridPixelData = {
	offset: number;
	r: number;
	g: number;
	b: number;
	a: number;
};

export type GridState = {
	grid: Grid;
	pixels: Uint8ClampedArray;
};

export type Color = number[];
export type ColorsPalette = Record<string, Color>;

export type PatternResponse = { message: string };
