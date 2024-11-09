import type { Pattern } from './types';
import type { Color } from './types';

export const duck: Pattern = [
	// row 1
	{ x: 0, y: 0, color: 'black' },
	{ x: -1, y: 0, color: 'black' },
	{ x: -2, y: 0, color: 'black' },
	{ x: -3, y: 0, color: 'black' },
	{ x: -4, y: 0, color: 'black' },
	{ x: 1, y: 0, color: 'black' },
	{ x: 2, y: 0, color: 'black' },
	{ x: 3, y: 0, color: 'black' },
	{ x: 4, y: 0, color: 'black' },
	// row 2
	{ x: 0, y: -1, color: 'yellow' },
	{ x: -1, y: -1, color: 'yellow' },
	{ x: -2, y: -1, color: 'yellow' },
	{ x: -3, y: -1, color: 'yellow' },
	{ x: -4, y: -1, color: 'yellow' },
	{ x: -5, y: -1, color: 'black' },
	{ x: 1, y: -1, color: 'yellow' },
	{ x: 2, y: -1, color: 'yellow' },
	{ x: 3, y: -1, color: 'yellow' },
	{ x: 4, y: -1, color: 'yellow' },
	{ x: 5, y: -1, color: 'black' },
	// row 3
	{ x: 0, y: -2, color: 'yellow' },
	{ x: -1, y: -2, color: 'yellow' },
	{ x: -2, y: -2, color: 'yellow' },
	{ x: -3, y: -2, color: 'yellow' },
	{ x: -4, y: -2, color: 'yellow' },
	{ x: -5, y: -2, color: 'black' },
	{ x: 1, y: -2, color: 'yellow' },
	{ x: 2, y: -2, color: 'yellow' },
	{ x: 3, y: -2, color: 'yellow' },
	{ x: 4, y: -2, color: 'yellow' },
	{ x: 5, y: -2, color: 'black' },
	// row 4
	{ x: 0, y: -3, color: 'yellow' },
	{ x: -1, y: -3, color: 'yellow' },
	{ x: -2, y: -3, color: 'yellow' },
	{ x: -3, y: -3, color: 'yellow' },
	{ x: -4, y: -3, color: 'yellow' },
	{ x: -5, y: -3, color: 'yellow' },
	{ x: -6, y: -3, color: 'black' },
	{ x: 1, y: -3, color: 'yellow' },
	{ x: 2, y: -3, color: 'yellow' },
	{ x: 3, y: -3, color: 'yellow' },
	{ x: 4, y: -3, color: 'yellow' },
	{ x: 5, y: -3, color: 'black' },
	// row 5
	{ x: 0, y: -4, color: 'yellow' },
	{ x: -1, y: -4, color: 'black' },
	{ x: -2, y: -4, color: 'black' },
	{ x: -3, y: -4, color: 'black' },
	{ x: -4, y: -4, color: 'black' },
	{ x: -5, y: -4, color: 'black' },
	{ x: -6, y: -4, color: 'black' },
	{ x: -7, y: -4, color: 'black' },
	{ x: 1, y: -4, color: 'yellow' },
	{ x: 2, y: -4, color: 'yellow' },
	{ x: 3, y: -4, color: 'yellow' },
	{ x: 4, y: -4, color: 'yellow' },
	{ x: 5, y: -4, color: 'black' },
	// row 6
	{ x: 0, y: -5, color: 'yellow' },
	{ x: -1, y: -5, color: 'black' },
	{ x: 1, y: -5, color: 'yellow' },
	{ x: 2, y: -5, color: 'yellow' },
	{ x: 3, y: -5, color: 'yellow' },
	{ x: 4, y: -5, color: 'yellow' },
	{ x: 5, y: -5, color: 'black' },
	// row 7
	{ x: 0, y: -6, color: 'yellow' },
	{ x: -1, y: -6, color: 'black' },
	{ x: 1, y: -6, color: 'yellow' },
	{ x: 2, y: -6, color: 'yellow' },
	{ x: 3, y: -6, color: 'black' },
	{ x: 4, y: -6, color: 'yellow' },
	{ x: 5, y: -6, color: 'black' },
	// row 8
	{ x: 0, y: -7, color: 'yellow' },
	{ x: -1, y: -7, color: 'black' },
	{ x: 1, y: -7, color: 'yellow' },
	{ x: 2, y: -7, color: 'yellow' },
	{ x: 3, y: -7, color: 'yellow' },
	{ x: 4, y: -7, color: 'yellow' },
	{ x: 5, y: -7, color: 'black' },
	// row 9
	{ x: 0, y: -8, color: 'black' },
	{ x: 1, y: -8, color: 'black' },
	{ x: 2, y: -8, color: 'black' },
	{ x: 3, y: -8, color: 'black' },
	{ x: 4, y: -8, color: 'black' },
	// nose
	{ x: 6, y: -6, color: 'black' },
	{ x: 7, y: -6, color: 'black' },
	{ x: 8, y: -6, color: 'black' },
	{ x: 8, y: -5, color: 'black' },
	{ x: 7, y: -4, color: 'black' },
	{ x: 6, y: -4, color: 'black' },
	{ x: 7, y: -5, color: 'orange' },
	{ x: 6, y: -5, color: 'orange' }
];

export const bird: Pattern = [
	{
		x: 0,
		y: 0,
		color: 'red'
	},
	{
		x: 0,
		y: -2,
		color: 'red'
	},
	{
		x: 0,
		y: -1,
		color: 'red'
	},
	{
		x: -4,
		y: -3,
		color: 'black'
	},
	{
		x: -2,
		y: -3,
		color: 'black'
	},
	{
		x: -3,
		y: -3,
		color: 'black'
	},
	{
		x: -1,
		y: -3,
		color: 'black'
	},
	{
		x: 0,
		y: -3,
		color: 'black'
	},
	{
		x: 1,
		y: -3,
		color: 'black'
	},
	{
		x: 3,
		y: -3,
		color: 'black'
	},
	{
		x: 2,
		y: -3,
		color: 'black'
	},
	{
		x: 4,
		y: -3,
		color: 'black'
	},
	{
		x: 1,
		y: -4,
		color: 'black'
	},
	{
		x: 2,
		y: -4,
		color: 'black'
	},
	{
		x: 4,
		y: -4,
		color: 'black'
	},
	{
		x: 3,
		y: -4,
		color: 'black'
	},
	{
		x: 1,
		y: -5,
		color: 'black'
	},
	{
		x: 2,
		y: -5,
		color: 'black'
	},
	{
		x: 3,
		y: -5,
		color: 'black'
	},
	{
		x: 4,
		y: -5,
		color: 'black'
	},
	{
		x: 3,
		y: -6,
		color: 'black'
	},
	{
		x: 1,
		y: -6,
		color: 'black'
	},
	{
		x: 2,
		y: -6,
		color: 'black'
	},
	{
		x: 4,
		y: -6,
		color: 'black'
	},
	{
		x: 3,
		y: -7,
		color: 'black'
	},
	{
		x: 2,
		y: -7,
		color: 'black'
	},
	{
		x: 1,
		y: -7,
		color: 'black'
	},
	{
		x: 4,
		y: -7,
		color: 'black'
	},
	{
		x: 2,
		y: -8,
		color: 'black'
	},
	{
		x: 1,
		y: -8,
		color: 'black'
	},
	{
		x: 3,
		y: -8,
		color: 'black'
	},
	{
		x: 4,
		y: -8,
		color: 'black'
	}
];

export const elo: Pattern = [
	{
		x: 0,
		y: 0,
		color: 'red'
	},
	{
		x: 1,
		y: 0,
		color: 'red'
	},
	{
		x: 2,
		y: 0,
		color: 'red'
	},
	{
		x: 3,
		y: 0,
		color: 'red'
	},
	{
		x: 4,
		y: 0,
		color: 'red'
	},
	{
		x: 5,
		y: 0,
		color: 'red'
	},
	{
		x: 6,
		y: 0,
		color: 'red'
	},
	{
		x: 6,
		y: 1,
		color: 'red'
	},
	{
		x: 6,
		y: 2,
		color: 'red'
	},
	{
		x: 6,
		y: 3,
		color: 'red'
	},
	{
		x: 6,
		y: 4,
		color: 'red'
	},
	{
		x: 6,
		y: 5,
		color: 'red'
	},
	{
		x: 5,
		y: 5,
		color: 'red'
	},
	{
		x: 4,
		y: 5,
		color: 'red'
	},
	{
		x: 3,
		y: 5,
		color: 'red'
	},
	{
		x: 2,
		y: 5,
		color: 'red'
	},
	{
		x: 1,
		y: 5,
		color: 'red'
	},
	{
		x: 0,
		y: 5,
		color: 'red'
	},
	{
		x: 0,
		y: 4,
		color: 'red'
	},
	{
		x: 0,
		y: 3,
		color: 'red'
	},
	{
		x: 0,
		y: 2,
		color: 'red'
	},
	{
		x: 0,
		y: 1,
		color: 'red'
	},
	{
		x: 1,
		y: 1,
		color: 'red'
	},
	{
		x: 2,
		y: 1,
		color: 'red'
	},
	{
		x: 3,
		y: 1,
		color: 'red'
	},
	{
		x: 4,
		y: 1,
		color: 'red'
	},
	{
		x: 5,
		y: 1,
		color: 'red'
	},
	{
		x: 5,
		y: 2,
		color: 'red'
	},
	{
		x: 5,
		y: 3,
		color: 'red'
	},
	{
		x: 5,
		y: 4,
		color: 'red'
	},
	{
		x: 4,
		y: 4,
		color: 'red'
	},
	{
		x: 3,
		y: 4,
		color: 'red'
	},
	{
		x: 1,
		y: 4,
		color: 'red'
	},
	{
		x: 2,
		y: 4,
		color: 'red'
	},
	{
		x: 1,
		y: 3,
		color: 'red'
	},
	{
		x: 1,
		y: 2,
		color: 'red'
	}
];

export const heart: Pattern = [
	{
		x: 0,
		y: 0,
		color: 'red'
	},
	{
		x: -1,
		y: -1,
		color: 'red'
	},
	{
		x: -2,
		y: -2,
		color: 'red'
	},
	{
		x: -3,
		y: -3,
		color: 'red'
	},
	{
		x: -3,
		y: -4,
		color: 'red'
	},
	{
		x: -2,
		y: -5,
		color: 'red'
	},
	{
		x: -1,
		y: -6,
		color: 'red'
	},
	{
		x: 0,
		y: -6,
		color: 'red'
	},
	{
		x: 1,
		y: -5,
		color: 'red'
	},
	{
		x: 2,
		y: -6,
		color: 'red'
	},
	{
		x: 3,
		y: -6,
		color: 'red'
	},
	{
		x: 4,
		y: -5,
		color: 'red'
	},
	{
		x: 5,
		y: -4,
		color: 'red'
	},
	{
		x: 5,
		y: -3,
		color: 'red'
	},
	{
		x: 4,
		y: -2,
		color: 'red'
	},
	{
		x: 3,
		y: -1,
		color: 'red'
	},
	{
		x: 2,
		y: 0,
		color: 'red'
	},
	{
		x: 1,
		y: 1,
		color: 'red'
	}
];

export const dog: Pattern = [
	{
		x: 0,
		y: 0,
		color: 'black'
	},
	{
		x: 0,
		y: -1,
		color: 'black'
	},
	{
		x: 0,
		y: -2,
		color: 'black'
	},
	{
		x: 0,
		y: -3,
		color: 'black'
	},
	{
		x: 0,
		y: -4,
		color: 'black'
	},
	{
		x: 0,
		y: -5,
		color: 'black'
	},
	{
		x: 1,
		y: -6,
		color: 'black'
	},
	{
		x: 1,
		y: -7,
		color: 'black'
	},
	{
		x: 2,
		y: -8,
		color: 'black'
	},
	{
		x: 3,
		y: -9,
		color: 'black'
	},
	{
		x: 4,
		y: -10,
		color: 'black'
	},
	{
		x: 5,
		y: -11,
		color: 'black'
	},
	{
		x: 6,
		y: -11,
		color: 'black'
	},
	{
		x: 7,
		y: -12,
		color: 'black'
	},
	{
		x: 8,
		y: -12,
		color: 'black'
	},
	{
		x: 9,
		y: -12,
		color: 'black'
	},
	{
		x: 10,
		y: -12,
		color: 'black'
	},
	{
		x: 11,
		y: -12,
		color: 'black'
	},
	{
		x: 12,
		y: -12,
		color: 'black'
	},
	{
		x: 13,
		y: -12,
		color: 'black'
	},
	{
		x: 14,
		y: -11,
		color: 'black'
	},
	{
		x: 15,
		y: -11,
		color: 'black'
	},
	{
		x: 16,
		y: -10,
		color: 'black'
	},
	{
		x: 17,
		y: -9,
		color: 'black'
	},
	{
		x: 18,
		y: -8,
		color: 'black'
	},
	{
		x: 19,
		y: -7,
		color: 'black'
	},
	{
		x: 19,
		y: -6,
		color: 'black'
	},
	{
		x: 20,
		y: -5,
		color: 'black'
	},
	{
		x: 20,
		y: -4,
		color: 'black'
	},
	{
		x: 20,
		y: -3,
		color: 'black'
	},
	{
		x: 20,
		y: -2,
		color: 'black'
	},
	{
		x: 20,
		y: -1,
		color: 'black'
	},
	{
		x: 20,
		y: 0,
		color: 'black'
	},
	{
		x: 19,
		y: 1,
		color: 'black'
	},
	{
		x: 18,
		y: 1,
		color: 'black'
	},
	{
		x: 18,
		y: 2,
		color: 'black'
	},
	{
		x: 18,
		y: 3,
		color: 'black'
	},
	{
		x: 18,
		y: 4,
		color: 'black'
	},
	{
		x: 17,
		y: 5,
		color: 'black'
	},
	{
		x: 16,
		y: 6,
		color: 'black'
	},
	{
		x: 15,
		y: 6,
		color: 'black'
	},
	{
		x: 14,
		y: 7,
		color: 'black'
	},
	{
		x: 13,
		y: 7,
		color: 'black'
	},
	{
		x: 12,
		y: 7,
		color: 'black'
	},
	{
		x: 11,
		y: 7,
		color: 'black'
	},
	{
		x: 10,
		y: 7,
		color: 'black'
	},
	{
		x: 9,
		y: 7,
		color: 'black'
	},
	{
		x: 8,
		y: 7,
		color: 'black'
	},
	{
		x: 7,
		y: 7,
		color: 'black'
	},
	{
		x: 6,
		y: 7,
		color: 'black'
	},
	{
		x: 5,
		y: 6,
		color: 'black'
	},
	{
		x: 4,
		y: 6,
		color: 'black'
	},
	{
		x: 3,
		y: 5,
		color: 'black'
	},
	{
		x: 2,
		y: 4,
		color: 'black'
	},
	{
		x: 2,
		y: 3,
		color: 'black'
	},
	{
		x: 2,
		y: 2,
		color: 'black'
	},
	{
		x: 2,
		y: 1,
		color: 'black'
	},
	{
		x: 1,
		y: 1,
		color: 'black'
	},
	{
		x: 3,
		y: 0,
		color: 'black'
	},
	{
		x: 3,
		y: -1,
		color: 'black'
	},
	{
		x: 3,
		y: -3,
		color: 'black'
	},
	{
		x: 3,
		y: -5,
		color: 'black'
	},
	{
		x: 3,
		y: -4,
		color: 'black'
	},
	{
		x: 4,
		y: -6,
		color: 'black'
	},
	{
		x: 5,
		y: -7,
		color: 'black'
	},
	{
		x: 6,
		y: -7,
		color: 'black'
	}
];

export const pacman: Pattern = [
	// Pacman body - yellow
	{ x: 0, y: 0, color: 'yellow' },
	{ x: -1, y: 0, color: 'yellow' },
	{ x: 1, y: 0, color: 'yellow' },
	{ x: -2, y: -1, color: 'yellow' },
	{ x: -1, y: -1, color: 'yellow' },
	{ x: 0, y: -1, color: 'yellow' },
	{ x: 1, y: -1, color: 'yellow' },
	{ x: -2, y: -2, color: 'yellow' },
	{ x: -1, y: -2, color: 'yellow' },
	{ x: 0, y: -2, color: 'yellow' },
	{ x: -2, y: -3, color: 'yellow' },
	{ x: -1, y: -3, color: 'yellow' },
	{ x: 0, y: -3, color: 'yellow' },
	{ x: -2, y: -4, color: 'yellow' },
	{ x: -1, y: -4, color: 'yellow' },
	{ x: 0, y: -4, color: 'yellow' },
	{ x: 1, y: -4, color: 'yellow' },
	{ x: -1, y: -5, color: 'yellow' },
	{ x: 0, y: -5, color: 'yellow' },
	{ x: 1, y: -5, color: 'yellow' },
	{ x: 0, y: -6, color: 'yellow' },
	{ x: 1, y: -6, color: 'yellow' },

	// Pacman outline - black
	{ x: -2, y: 0, color: 'black' },
	{ x: 2, y: 0, color: 'black' },
	{ x: -3, y: -1, color: 'black' },
	{ x: 2, y: -1, color: 'black' },
	{ x: -3, y: -2, color: 'black' },
	{ x: 1, y: -2, color: 'black' },
	{ x: -3, y: -3, color: 'black' },
	{ x: 1, y: -3, color: 'black' },
	{ x: -3, y: -4, color: 'black' },
	{ x: 2, y: -4, color: 'black' },
	{ x: -2, y: -5, color: 'black' },
	{ x: 2, y: -5, color: 'black' },
	{ x: -1, y: -6, color: 'black' },
	{ x: 2, y: -6, color: 'black' },
	{ x: 0, y: -7, color: 'black' },
	{ x: 1, y: -7, color: 'black' },

	// Pacman eye - black
	{ x: 0, y: -2, color: 'black' },

	// Dots that Pacman eats - white
	{ x: 4, y: -3, color: 'white' },
	{ x: 7, y: -3, color: 'white' },
	{ x: 10, y: -3, color: 'white' },
	{ x: 13, y: -3, color: 'white' },

	// Power pellet - white
	{ x: 16, y: -3, color: 'white' },
	{ x: 17, y: -3, color: 'white' },
	{ x: 16, y: -4, color: 'white' },
	{ x: 17, y: -4, color: 'white' }
];

export const create_tree = (color: 'autumn' | 'summer' | 'alien'): Pattern => {
	const TREE_PATTERN_OUTLINE_COLOR: Color = 'black';
	const TREE_TRUNK_COLOR: Color = 'brown';
	const LEAVES_SHADE_1: Color = (() => {
		if (color === 'autumn') return 'yellow';
		if (color === 'summer') return 'lightGreen';
		if (color === 'alien') return 'fightTheSunrise';
		return 'yellow';
	})();
	const LEAVES_SHADE_2: Color = (() => {
		if (color === 'autumn') return 'orange';
		if (color === 'summer') return 'lightGreen';
		if (color === 'alien') return 'purple';
		return 'lightGreen';
	})();
	const LEAVES_SHADE_3: Color = (() => {
		if (color === 'autumn') return 'red';
		if (color === 'summer') return 'darkGreen';
		if (color === 'alien') return 'darkPurple';
		return 'darkGreen';
	})();

	return [
		// // // // // //
		// outline (black)
		// // // // // //

		// row 1
		{ x: 0, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 3, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 4, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 7, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 8, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 9, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 16, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 20, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 22, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 23, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 24, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 25, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 26, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 27, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 30, y: 0, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 1
		{ x: 7, y: -1, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 26, y: -1, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 2
		{ x: 2, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 8, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 9, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 20, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 23, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 24, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 25, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 29, y: -2, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 3
		{ x: 4, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 23, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 30, y: -3, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 4
		{ x: 9, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 22, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 24, y: -4, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 5
		{ x: 9, y: -5, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -5, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -5, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -5, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -5, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 23, y: -5, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 6
		{ x: 8, y: -6, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -6, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -6, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -6, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 7
		{ x: 9, y: -7, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -7, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -7, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 8
		{ x: 14, y: -8, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -8, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 9
		{ x: 13, y: -9, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -9, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 10
		{ x: 13, y: -10, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -10, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 11
		{ x: 12, y: -11, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -11, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -11, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 12
		{ x: 12, y: -12, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -12, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -12, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -12, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 13
		{ x: 11, y: -13, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -13, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 16, y: -13, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 20, y: -13, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 14
		{ x: 11, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 22, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 23, y: -14, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 15
		{ x: 11, y: -15, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -15, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -15, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 24, y: -15, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 25, y: -15, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 16
		{ x: 10, y: -16, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -16, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -16, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -16, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 26, y: -16, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 17
		{ x: 8, y: -17, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 9, y: -17, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -17, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -17, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 27, y: -17, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 18
		{ x: -1, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 0, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 1, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 2, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 3, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 6, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 7, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 28, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 29, y: -18, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 19
		{ x: -2, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 4, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 30, y: -19, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 20
		{ x: -3, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 7, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 8, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 16, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 30, y: -20, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 21
		{ x: -3, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 6, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 7, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 8, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 16, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 30, y: -21, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 22
		{ x: -4, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 30, y: -22, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 23
		{ x: -4, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 29, y: -23, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 24
		{ x: -4, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 4, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 20, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 28, y: -24, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 25
		{ x: -4, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 4, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 27, y: -25, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 26
		{ x: -3, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 6, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 28, y: -26, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 27
		{ x: -2, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 5, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 6, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 7, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 8, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 9, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 10, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 29, y: -27, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 28
		{ x: -1, y: -28, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -28, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -28, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -28, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 29, y: -28, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 29
		{ x: 0, y: -29, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -29, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -29, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -29, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -29, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 28, y: -29, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 30
		{ x: 1, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 2, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 3, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 16, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 28, y: -30, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 31
		{ x: 3, y: -31, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 12, y: -31, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -31, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 28, y: -31, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 32
		{ x: 3, y: -32, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 11, y: -32, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 27, y: -32, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 33
		{ x: 3, y: -33, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 24, y: -33, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 25, y: -33, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 26, y: -33, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 34
		{ x: 4, y: -34, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: -34, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 22, y: -34, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 23, y: -34, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 35
		{ x: 5, y: -35, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: -35, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 36
		{ x: 6, y: -36, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 7, y: -36, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 8, y: -36, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 9, y: -36, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 21, y: -36, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 37
		{ x: 9, y: -37, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 20, y: -37, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 38
		{ x: 9, y: -38, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -38, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 39
		{ x: 10, y: -39, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 19, y: -39, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 40
		{ x: 11, y: -40, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 18, y: -40, color: TREE_PATTERN_OUTLINE_COLOR },
		// row 41
		{ x: 12, y: -41, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 13, y: -41, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 14, y: -41, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 15, y: -41, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 16, y: -41, color: TREE_PATTERN_OUTLINE_COLOR },
		{ x: 17, y: -41, color: TREE_PATTERN_OUTLINE_COLOR },

		// // // // // //
		// tree trunk
		// // // // // //

		// row 2
		{ x: 15, y: -2, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -2, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -2, color: TREE_TRUNK_COLOR },
		// row 3
		{ x: 15, y: -3, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -3, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -3, color: TREE_TRUNK_COLOR },
		// row 4
		{ x: 15, y: -4, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -4, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -4, color: TREE_TRUNK_COLOR },
		// row 5
		{ x: 15, y: -5, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -5, color: TREE_TRUNK_COLOR },
		// row 6
		{ x: 15, y: -6, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -6, color: TREE_TRUNK_COLOR },
		// row 7
		{ x: 15, y: -7, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -7, color: TREE_TRUNK_COLOR },
		// row 8
		{ x: 15, y: -8, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -8, color: TREE_TRUNK_COLOR },
		// row 9
		{ x: 14, y: -9, color: TREE_TRUNK_COLOR },
		{ x: 15, y: -9, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -9, color: TREE_TRUNK_COLOR },
		// row 10
		{ x: 14, y: -10, color: TREE_TRUNK_COLOR },
		{ x: 15, y: -10, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -10, color: TREE_TRUNK_COLOR },
		// row 11
		{ x: 13, y: -11, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -11, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -11, color: TREE_TRUNK_COLOR },
		// row 12
		{ x: 13, y: -12, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -12, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -12, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -12, color: TREE_TRUNK_COLOR },
		// row 13
		{ x: 12, y: -13, color: TREE_TRUNK_COLOR },
		{ x: 13, y: -13, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -13, color: TREE_TRUNK_COLOR },
		{ x: 18, y: -13, color: TREE_TRUNK_COLOR },
		{ x: 19, y: -13, color: TREE_TRUNK_COLOR },
		// row 14
		{ x: 12, y: -14, color: TREE_TRUNK_COLOR },
		{ x: 13, y: -14, color: TREE_TRUNK_COLOR },
		{ x: 19, y: -14, color: TREE_TRUNK_COLOR },
		{ x: 20, y: -14, color: TREE_TRUNK_COLOR },
		// row 15
		{ x: 12, y: -15, color: TREE_TRUNK_COLOR },
		{ x: 13, y: -15, color: TREE_TRUNK_COLOR },
		// row 16
		{ x: 12, y: -16, color: TREE_TRUNK_COLOR },
		{ x: 13, y: -16, color: TREE_TRUNK_COLOR },
		// row 17
		{ x: 10, y: -17, color: TREE_TRUNK_COLOR },
		{ x: 11, y: -17, color: TREE_TRUNK_COLOR },
		{ x: 12, y: -17, color: TREE_TRUNK_COLOR },
		{ x: 13, y: -17, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -17, color: TREE_TRUNK_COLOR },
		// row 18
		{ x: 8, y: -18, color: TREE_TRUNK_COLOR },
		{ x: 9, y: -18, color: TREE_TRUNK_COLOR },
		{ x: 10, y: -18, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -18, color: TREE_TRUNK_COLOR },
		// row 19
		{ x: 6, y: -19, color: TREE_TRUNK_COLOR },
		{ x: 7, y: -19, color: TREE_TRUNK_COLOR },
		{ x: 8, y: -19, color: TREE_TRUNK_COLOR },
		{ x: 9, y: -19, color: TREE_TRUNK_COLOR },
		{ x: 10, y: -19, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -19, color: TREE_TRUNK_COLOR },
		// row 20
		{ x: 5, y: -20, color: TREE_TRUNK_COLOR },
		{ x: 6, y: -20, color: TREE_TRUNK_COLOR },
		{ x: 9, y: -20, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -20, color: TREE_TRUNK_COLOR },
		{ x: 15, y: -20, color: TREE_TRUNK_COLOR },
		// row 21
		{ x: 9, y: -21, color: TREE_TRUNK_COLOR },
		{ x: 15, y: -21, color: TREE_TRUNK_COLOR },
		// row 22
		{ x: 15, y: -22, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -22, color: TREE_TRUNK_COLOR },
		// row 23
		{ x: 15, y: -23, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -23, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -23, color: TREE_TRUNK_COLOR },
		// row 24
		{ x: 16, y: -24, color: TREE_TRUNK_COLOR },
		{ x: 17, y: -24, color: TREE_TRUNK_COLOR },
		{ x: 18, y: -24, color: TREE_TRUNK_COLOR },
		// row 25
		{ x: 16, y: -25, color: TREE_TRUNK_COLOR },
		{ x: 18, y: -25, color: TREE_TRUNK_COLOR },
		{ x: 19, y: -25, color: TREE_TRUNK_COLOR },
		// row 26
		{ x: 15, y: -26, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -26, color: TREE_TRUNK_COLOR },
		// row 27
		{ x: 13, y: -27, color: TREE_TRUNK_COLOR },
		{ x: 14, y: -27, color: TREE_TRUNK_COLOR },
		{ x: 15, y: -27, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -27, color: TREE_TRUNK_COLOR },
		// row 28
		{ x: 11, y: -28, color: TREE_TRUNK_COLOR },
		{ x: 12, y: -28, color: TREE_TRUNK_COLOR },
		{ x: 13, y: -28, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -28, color: TREE_TRUNK_COLOR },
		// row 29
		{ x: 15, y: -29, color: TREE_TRUNK_COLOR },
		{ x: 16, y: -29, color: TREE_TRUNK_COLOR },
		// row 30
		{ x: 15, y: -30, color: TREE_TRUNK_COLOR },

		// // // // // //
		// leaves - shade 1
		// // // // // //

		// row 1
		{ x: 8, y: -1, color: LEAVES_SHADE_1 },
		{ x: 9, y: -1, color: LEAVES_SHADE_1 },
		{ x: 10, y: -1, color: LEAVES_SHADE_1 },
		{ x: 11, y: -1, color: LEAVES_SHADE_1 },
		{ x: 22, y: -1, color: LEAVES_SHADE_1 },
		{ x: 23, y: -1, color: LEAVES_SHADE_1 },
		{ x: 24, y: -1, color: LEAVES_SHADE_1 },
		{ x: 25, y: -1, color: LEAVES_SHADE_1 },
		// row 2
		{ x: 11, y: -2, color: LEAVES_SHADE_1 },
		{ x: 22, y: -2, color: LEAVES_SHADE_1 },
		// row 3
		{ x: 11, y: -3, color: LEAVES_SHADE_1 },
		{ x: 13, y: -3, color: LEAVES_SHADE_1 },
		{ x: 22, y: -3, color: LEAVES_SHADE_1 },
		// row 4
		{ x: 10, y: -4, color: LEAVES_SHADE_1 },
		{ x: 13, y: -4, color: LEAVES_SHADE_1 },
		{ x: 23, y: -4, color: LEAVES_SHADE_1 },
		// row 5
		{ x: 10, y: -5, color: LEAVES_SHADE_1 },
		// row 6
		{ x: 9, y: -6, color: LEAVES_SHADE_1 },
		// row 21
		{ x: 19, y: -21, color: LEAVES_SHADE_1 },
		// row 22
		{ x: 19, y: -22, color: LEAVES_SHADE_1 },
		{ x: 20, y: -22, color: LEAVES_SHADE_1 },
		{ x: 24, y: -22, color: LEAVES_SHADE_1 },
		// row 23
		{ x: 20, y: -23, color: LEAVES_SHADE_1 },
		{ x: 21, y: -23, color: LEAVES_SHADE_1 },
		{ x: 22, y: -23, color: LEAVES_SHADE_1 },
		{ x: 23, y: -23, color: LEAVES_SHADE_1 },
		{ x: 24, y: -23, color: LEAVES_SHADE_1 },
		{ x: 26, y: -23, color: LEAVES_SHADE_1 },
		{ x: 27, y: -23, color: LEAVES_SHADE_1 },
		{ x: 28, y: -23, color: LEAVES_SHADE_1 },
		// row 24
		{ x: 11, y: -24, color: LEAVES_SHADE_1 },
		{ x: 21, y: -24, color: LEAVES_SHADE_1 },
		{ x: 22, y: -24, color: LEAVES_SHADE_1 },
		{ x: 23, y: -24, color: LEAVES_SHADE_1 },
		{ x: 24, y: -24, color: LEAVES_SHADE_1 },
		{ x: 25, y: -24, color: LEAVES_SHADE_1 },
		{ x: 26, y: -24, color: LEAVES_SHADE_1 },
		{ x: 27, y: -24, color: LEAVES_SHADE_1 },
		// row 25
		{ x: 9, y: -25, color: LEAVES_SHADE_1 },
		{ x: 10, y: -25, color: LEAVES_SHADE_1 },
		// row 26
		{ x: -2, y: -26, color: LEAVES_SHADE_1 },
		{ x: -1, y: -26, color: LEAVES_SHADE_1 },
		{ x: 7, y: -26, color: LEAVES_SHADE_1 },
		{ x: 8, y: -26, color: LEAVES_SHADE_1 },
		{ x: 9, y: -26, color: LEAVES_SHADE_1 },
		// row 27
		{ x: -1, y: -27, color: LEAVES_SHADE_1 },
		{ x: 0, y: -27, color: LEAVES_SHADE_1 },
		{ x: 4, y: -27, color: LEAVES_SHADE_1 },
		// row 28
		{ x: 0, y: -28, color: LEAVES_SHADE_1 },
		{ x: 1, y: -28, color: LEAVES_SHADE_1 },
		{ x: 2, y: -28, color: LEAVES_SHADE_1 },
		{ x: 3, y: -28, color: LEAVES_SHADE_1 },
		{ x: 4, y: -28, color: LEAVES_SHADE_1 },
		// row 29
		{ x: 1, y: -29, color: LEAVES_SHADE_1 },
		{ x: 2, y: -29, color: LEAVES_SHADE_1 },
		{ x: 3, y: -29, color: LEAVES_SHADE_1 },
		// row 30
		{ x: 18, y: -30, color: LEAVES_SHADE_1 },
		{ x: 21, y: -30, color: LEAVES_SHADE_1 },
		{ x: 25, y: -30, color: LEAVES_SHADE_1 },
		{ x: 26, y: -30, color: LEAVES_SHADE_1 },
		{ x: 27, y: -30, color: LEAVES_SHADE_1 },
		// row 31
		{ x: 18, y: -31, color: LEAVES_SHADE_1 },
		{ x: 19, y: -31, color: LEAVES_SHADE_1 },
		{ x: 22, y: -31, color: LEAVES_SHADE_1 },
		{ x: 23, y: -31, color: LEAVES_SHADE_1 },
		{ x: 24, y: -31, color: LEAVES_SHADE_1 },
		{ x: 25, y: -31, color: LEAVES_SHADE_1 },
		{ x: 26, y: -31, color: LEAVES_SHADE_1 },
		{ x: 27, y: -31, color: LEAVES_SHADE_1 },
		// row 32
		{ x: 4, y: -32, color: LEAVES_SHADE_1 },
		{ x: 20, y: -32, color: LEAVES_SHADE_1 },
		{ x: 22, y: -32, color: LEAVES_SHADE_1 },
		{ x: 23, y: -32, color: LEAVES_SHADE_1 },
		{ x: 24, y: -32, color: LEAVES_SHADE_1 },
		{ x: 25, y: -32, color: LEAVES_SHADE_1 },
		// row 33
		{ x: 4, y: -33, color: LEAVES_SHADE_1 },
		{ x: 6, y: -33, color: LEAVES_SHADE_1 },
		{ x: 10, y: -33, color: LEAVES_SHADE_1 },
		{ x: 20, y: -33, color: LEAVES_SHADE_1 },
		{ x: 21, y: -33, color: LEAVES_SHADE_1 },
		{ x: 22, y: -33, color: LEAVES_SHADE_1 },
		{ x: 23, y: -33, color: LEAVES_SHADE_1 },
		// row 34
		{ x: 5, y: -34, color: LEAVES_SHADE_1 },
		{ x: 6, y: -34, color: LEAVES_SHADE_1 },
		{ x: 7, y: -34, color: LEAVES_SHADE_1 },
		{ x: 9, y: -34, color: LEAVES_SHADE_1 },
		// row 35
		{ x: 6, y: -35, color: LEAVES_SHADE_1 },
		{ x: 7, y: -35, color: LEAVES_SHADE_1 },
		{ x: 8, y: -35, color: LEAVES_SHADE_1 },
		{ x: 9, y: -35, color: LEAVES_SHADE_1 },
		// row 36
		{ x: 19, y: -36, color: LEAVES_SHADE_1 },
		// row 37
		{ x: 10, y: -37, color: LEAVES_SHADE_1 },
		{ x: 11, y: -37, color: LEAVES_SHADE_1 },
		{ x: 13, y: -37, color: LEAVES_SHADE_1 },
		{ x: 17, y: -37, color: LEAVES_SHADE_1 },
		{ x: 18, y: -37, color: LEAVES_SHADE_1 },
		{ x: 19, y: -37, color: LEAVES_SHADE_1 },
		// row 38
		{ x: 10, y: -38, color: LEAVES_SHADE_1 },
		{ x: 11, y: -38, color: LEAVES_SHADE_1 },
		{ x: 14, y: -38, color: LEAVES_SHADE_1 },
		{ x: 15, y: -38, color: LEAVES_SHADE_1 },
		{ x: 16, y: -38, color: LEAVES_SHADE_1 },
		{ x: 17, y: -38, color: LEAVES_SHADE_1 },
		{ x: 18, y: -38, color: LEAVES_SHADE_1 },
		// row 39
		{ x: 11, y: -39, color: LEAVES_SHADE_1 },
		{ x: 12, y: -39, color: LEAVES_SHADE_1 },
		{ x: 13, y: -39, color: LEAVES_SHADE_1 },
		{ x: 14, y: -39, color: LEAVES_SHADE_1 },
		{ x: 15, y: -39, color: LEAVES_SHADE_1 },
		{ x: 16, y: -39, color: LEAVES_SHADE_1 },
		{ x: 17, y: -39, color: LEAVES_SHADE_1 },
		{ x: 18, y: -39, color: LEAVES_SHADE_1 },
		// row 40
		{ x: 12, y: -40, color: LEAVES_SHADE_1 },
		{ x: 13, y: -40, color: LEAVES_SHADE_1 },
		{ x: 14, y: -40, color: LEAVES_SHADE_1 },
		{ x: 15, y: -40, color: LEAVES_SHADE_1 },
		{ x: 16, y: -40, color: LEAVES_SHADE_1 },
		{ x: 17, y: -40, color: LEAVES_SHADE_1 },

		// // // // // //
		// leaves - shade 2
		// // // // // //

		// row 1
		{ x: 12, y: -1, color: LEAVES_SHADE_2 },
		{ x: 13, y: -1, color: LEAVES_SHADE_2 },
		{ x: 14, y: -1, color: LEAVES_SHADE_2 },
		{ x: 15, y: -1, color: LEAVES_SHADE_2 },
		{ x: 16, y: -1, color: LEAVES_SHADE_2 },
		{ x: 17, y: -1, color: LEAVES_SHADE_2 },
		{ x: 18, y: -1, color: LEAVES_SHADE_2 },
		{ x: 19, y: -1, color: LEAVES_SHADE_2 },
		{ x: 20, y: -1, color: LEAVES_SHADE_2 },
		{ x: 21, y: -1, color: LEAVES_SHADE_2 },
		// row 2
		{ x: 12, y: -2, color: LEAVES_SHADE_2 },
		// row 13
		{ x: 31, y: -13, color: LEAVES_SHADE_2 },
		// row 14
		{ x: 31, y: -14, color: LEAVES_SHADE_2 },
		// row 15
		{ x: 3, y: -15, color: LEAVES_SHADE_2 },
		// row 16
		{ x: 4, y: -16, color: LEAVES_SHADE_2 },
		// row 18
		{ x: 38, y: -18, color: LEAVES_SHADE_2 },
		// row 19
		{ x: 23, y: -19, color: LEAVES_SHADE_2 },
		{ x: 24, y: -19, color: LEAVES_SHADE_2 },
		{ x: 25, y: -19, color: LEAVES_SHADE_2 },
		{ x: 38, y: -19, color: LEAVES_SHADE_2 },
		// row 20
		{ x: 22, y: -20, color: LEAVES_SHADE_2 },
		{ x: 23, y: -20, color: LEAVES_SHADE_2 },
		{ x: 24, y: -20, color: LEAVES_SHADE_2 },
		{ x: 25, y: -20, color: LEAVES_SHADE_2 },
		// row 21
		{ x: 20, y: -21, color: LEAVES_SHADE_2 },
		{ x: 21, y: -21, color: LEAVES_SHADE_2 },
		{ x: 22, y: -21, color: LEAVES_SHADE_2 },
		{ x: 23, y: -21, color: LEAVES_SHADE_2 },
		{ x: 24, y: -21, color: LEAVES_SHADE_2 },
		{ x: 25, y: -21, color: LEAVES_SHADE_2 },
		{ x: 26, y: -21, color: LEAVES_SHADE_2 },
		{ x: 27, y: -21, color: LEAVES_SHADE_2 },
		// row 22
		{ x: 1, y: -22, color: LEAVES_SHADE_2 },
		{ x: 2, y: -22, color: LEAVES_SHADE_2 },
		{ x: 3, y: -22, color: LEAVES_SHADE_2 },
		{ x: 21, y: -22, color: LEAVES_SHADE_2 },
		{ x: 22, y: -22, color: LEAVES_SHADE_2 },
		{ x: 23, y: -22, color: LEAVES_SHADE_2 },
		{ x: 25, y: -22, color: LEAVES_SHADE_2 },
		{ x: 26, y: -22, color: LEAVES_SHADE_2 },
		{ x: 27, y: -22, color: LEAVES_SHADE_2 },
		{ x: 28, y: -22, color: LEAVES_SHADE_2 },
		// row 23
		{ x: 0, y: -23, color: LEAVES_SHADE_2 },
		{ x: 1, y: -23, color: LEAVES_SHADE_2 },
		{ x: 2, y: -23, color: LEAVES_SHADE_2 },
		{ x: 3, y: -23, color: LEAVES_SHADE_2 },
		{ x: 25, y: -23, color: LEAVES_SHADE_2 },
		// row 24
		{ x: -2, y: -24, color: LEAVES_SHADE_2 },
		{ x: -1, y: -24, color: LEAVES_SHADE_2 },
		{ x: 0, y: -24, color: LEAVES_SHADE_2 },
		{ x: 1, y: -24, color: LEAVES_SHADE_2 },
		{ x: 2, y: -24, color: LEAVES_SHADE_2 },
		{ x: 3, y: -24, color: LEAVES_SHADE_2 },
		{ x: 8, y: -24, color: LEAVES_SHADE_2 },
		{ x: 9, y: -24, color: LEAVES_SHADE_2 },
		{ x: 10, y: -24, color: LEAVES_SHADE_2 },
		// row 25
		{ x: -3, y: -25, color: LEAVES_SHADE_2 },
		{ x: -1, y: -25, color: LEAVES_SHADE_2 },
		{ x: 0, y: -25, color: LEAVES_SHADE_2 },
		{ x: 1, y: -25, color: LEAVES_SHADE_2 },
		{ x: 2, y: -25, color: LEAVES_SHADE_2 },
		{ x: 3, y: -25, color: LEAVES_SHADE_2 },
		{ x: 7, y: -25, color: LEAVES_SHADE_2 },
		{ x: 8, y: -25, color: LEAVES_SHADE_2 },
		{ x: 32, y: -25, color: LEAVES_SHADE_2 },
		// row 26
		{ x: 0, y: -26, color: LEAVES_SHADE_2 },
		{ x: 1, y: -26, color: LEAVES_SHADE_2 },
		{ x: 2, y: -26, color: LEAVES_SHADE_2 },
		{ x: 3, y: -26, color: LEAVES_SHADE_2 },
		{ x: 4, y: -26, color: LEAVES_SHADE_2 },
		{ x: 33, y: -26, color: LEAVES_SHADE_2 },
		// row 27
		{ x: 1, y: -27, color: LEAVES_SHADE_2 },
		{ x: 2, y: -27, color: LEAVES_SHADE_2 },
		{ x: 3, y: -27, color: LEAVES_SHADE_2 },
		{ x: 20, y: -27, color: LEAVES_SHADE_2 },
		// row 28
		{ x: 20, y: -28, color: LEAVES_SHADE_2 },
		{ x: 21, y: -28, color: LEAVES_SHADE_2 },
		{ x: 22, y: -28, color: LEAVES_SHADE_2 },
		{ x: 23, y: -28, color: LEAVES_SHADE_2 },
		{ x: 24, y: -28, color: LEAVES_SHADE_2 },
		{ x: 25, y: -28, color: LEAVES_SHADE_2 },
		// row 29
		{ x: 7, y: -29, color: LEAVES_SHADE_2 },
		{ x: 19, y: -29, color: LEAVES_SHADE_2 },
		{ x: 20, y: -29, color: LEAVES_SHADE_2 },
		{ x: 21, y: -29, color: LEAVES_SHADE_2 },
		{ x: 22, y: -29, color: LEAVES_SHADE_2 },
		{ x: 23, y: -29, color: LEAVES_SHADE_2 },
		{ x: 24, y: -29, color: LEAVES_SHADE_2 },
		{ x: 25, y: -29, color: LEAVES_SHADE_2 },
		{ x: 26, y: -29, color: LEAVES_SHADE_2 },
		// row 30
		{ x: 6, y: -30, color: LEAVES_SHADE_2 },
		{ x: 7, y: -30, color: LEAVES_SHADE_2 },
		{ x: 8, y: -30, color: LEAVES_SHADE_2 },
		{ x: 9, y: -30, color: LEAVES_SHADE_2 },
		{ x: 10, y: -30, color: LEAVES_SHADE_2 },
		{ x: 19, y: -30, color: LEAVES_SHADE_2 },
		{ x: 20, y: -30, color: LEAVES_SHADE_2 },
		{ x: 22, y: -30, color: LEAVES_SHADE_2 },
		{ x: 23, y: -30, color: LEAVES_SHADE_2 },
		{ x: 24, y: -30, color: LEAVES_SHADE_2 },
		{ x: 35, y: -30, color: LEAVES_SHADE_2 },
		// row 31
		{ x: 5, y: -31, color: LEAVES_SHADE_2 },
		{ x: 6, y: -31, color: LEAVES_SHADE_2 },
		{ x: 7, y: -31, color: LEAVES_SHADE_2 },
		{ x: 8, y: -31, color: LEAVES_SHADE_2 },
		{ x: 9, y: -31, color: LEAVES_SHADE_2 },
		{ x: 10, y: -31, color: LEAVES_SHADE_2 },
		{ x: 11, y: -31, color: LEAVES_SHADE_2 },
		{ x: 20, y: -31, color: LEAVES_SHADE_2 },
		{ x: 21, y: -31, color: LEAVES_SHADE_2 },
		{ x: 35, y: -31, color: LEAVES_SHADE_2 },
		// row 32
		{ x: 6, y: -32, color: LEAVES_SHADE_2 },
		{ x: 7, y: -32, color: LEAVES_SHADE_2 },
		{ x: 8, y: -32, color: LEAVES_SHADE_2 },
		{ x: 9, y: -32, color: LEAVES_SHADE_2 },
		{ x: 10, y: -32, color: LEAVES_SHADE_2 },
		{ x: 21, y: -32, color: LEAVES_SHADE_2 },
		{ x: 26, y: -32, color: LEAVES_SHADE_2 },
		// row 33
		{ x: 5, y: -33, color: LEAVES_SHADE_2 },
		{ x: 7, y: -33, color: LEAVES_SHADE_2 },
		{ x: 8, y: -33, color: LEAVES_SHADE_2 },
		{ x: 9, y: -33, color: LEAVES_SHADE_2 },
		// row 34
		{ x: 8, y: -34, color: LEAVES_SHADE_2 },
		{ x: 12, y: -34, color: LEAVES_SHADE_2 },
		{ x: 14, y: -34, color: LEAVES_SHADE_2 },
		{ x: 16, y: -34, color: LEAVES_SHADE_2 },
		{ x: 17, y: -34, color: LEAVES_SHADE_2 },
		{ x: 18, y: -34, color: LEAVES_SHADE_2 },
		{ x: 19, y: -34, color: LEAVES_SHADE_2 },
		// row 35
		{ x: 11, y: -35, color: LEAVES_SHADE_2 },
		{ x: 12, y: -35, color: LEAVES_SHADE_2 },
		{ x: 13, y: -35, color: LEAVES_SHADE_2 },
		{ x: 14, y: -35, color: LEAVES_SHADE_2 },
		{ x: 15, y: -35, color: LEAVES_SHADE_2 },
		{ x: 16, y: -35, color: LEAVES_SHADE_2 },
		{ x: 17, y: -35, color: LEAVES_SHADE_2 },
		{ x: 18, y: -35, color: LEAVES_SHADE_2 },
		{ x: 19, y: -35, color: LEAVES_SHADE_2 },
		{ x: 27, y: -35, color: LEAVES_SHADE_2 },
		{ x: 28, y: -35, color: LEAVES_SHADE_2 },
		// row 36
		{ x: 11, y: -36, color: LEAVES_SHADE_2 },
		{ x: 12, y: -36, color: LEAVES_SHADE_2 },
		{ x: 13, y: -36, color: LEAVES_SHADE_2 },
		{ x: 14, y: -36, color: LEAVES_SHADE_2 },
		{ x: 15, y: -36, color: LEAVES_SHADE_2 },
		{ x: 16, y: -36, color: LEAVES_SHADE_2 },
		{ x: 17, y: -36, color: LEAVES_SHADE_2 },
		{ x: 18, y: -36, color: LEAVES_SHADE_2 },
		// row 37
		{ x: 12, y: -37, color: LEAVES_SHADE_2 },
		{ x: 14, y: -37, color: LEAVES_SHADE_2 },
		{ x: 15, y: -37, color: LEAVES_SHADE_2 },
		{ x: 16, y: -37, color: LEAVES_SHADE_2 },
		// row 38
		{ x: 12, y: -38, color: LEAVES_SHADE_2 },
		{ x: 13, y: -38, color: LEAVES_SHADE_2 },

		// // // // // //
		// leaves - shade 3
		// // // // // //

		// row 0
		{ x: 1, y: 0, color: LEAVES_SHADE_3 },
		{ x: 2, y: 0, color: LEAVES_SHADE_3 },
		{ x: 5, y: 0, color: LEAVES_SHADE_3 },
		{ x: 6, y: 0, color: LEAVES_SHADE_3 },
		{ x: 28, y: 0, color: LEAVES_SHADE_3 },
		{ x: 29, y: 0, color: LEAVES_SHADE_3 },
		// row 1
		{ x: 1, y: -1, color: LEAVES_SHADE_3 },
		{ x: 2, y: -1, color: LEAVES_SHADE_3 },
		{ x: 5, y: -1, color: LEAVES_SHADE_3 },
		{ x: 6, y: -1, color: LEAVES_SHADE_3 },
		{ x: 28, y: -1, color: LEAVES_SHADE_3 },
		{ x: 29, y: -1, color: LEAVES_SHADE_3 },
		// row 13
		{ x: 30, y: -13, color: LEAVES_SHADE_3 },
		// row 15
		{ x: 20, y: -15, color: LEAVES_SHADE_3 },
		{ x: 21, y: -15, color: LEAVES_SHADE_3 },
		{ x: 22, y: -15, color: LEAVES_SHADE_3 },
		{ x: 23, y: -15, color: LEAVES_SHADE_3 },
		// row 16
		{ x: 3, y: -16, color: LEAVES_SHADE_3 },
		{ x: 20, y: -16, color: LEAVES_SHADE_3 },
		{ x: 21, y: -16, color: LEAVES_SHADE_3 },
		{ x: 22, y: -16, color: LEAVES_SHADE_3 },
		{ x: 23, y: -16, color: LEAVES_SHADE_3 },
		{ x: 24, y: -16, color: LEAVES_SHADE_3 },
		{ x: 25, y: -16, color: LEAVES_SHADE_3 },
		// row 17
		{ x: 19, y: -17, color: LEAVES_SHADE_3 },
		{ x: 20, y: -17, color: LEAVES_SHADE_3 },
		{ x: 21, y: -17, color: LEAVES_SHADE_3 },
		{ x: 22, y: -17, color: LEAVES_SHADE_3 },
		{ x: 23, y: -17, color: LEAVES_SHADE_3 },
		{ x: 24, y: -17, color: LEAVES_SHADE_3 },
		{ x: 25, y: -17, color: LEAVES_SHADE_3 },
		{ x: 26, y: -17, color: LEAVES_SHADE_3 },
		// row 18
		{ x: 18, y: -18, color: LEAVES_SHADE_3 },
		{ x: 19, y: -18, color: LEAVES_SHADE_3 },
		{ x: 20, y: -18, color: LEAVES_SHADE_3 },
		{ x: 21, y: -18, color: LEAVES_SHADE_3 },
		{ x: 22, y: -18, color: LEAVES_SHADE_3 },
		{ x: 23, y: -18, color: LEAVES_SHADE_3 },
		{ x: 24, y: -18, color: LEAVES_SHADE_3 },
		{ x: 25, y: -18, color: LEAVES_SHADE_3 },
		{ x: 26, y: -18, color: LEAVES_SHADE_3 },
		{ x: 27, y: -18, color: LEAVES_SHADE_3 },
		{ x: 37, y: -18, color: LEAVES_SHADE_3 },
		// row 19
		{ x: -1, y: -19, color: LEAVES_SHADE_3 },
		{ x: 0, y: -19, color: LEAVES_SHADE_3 },
		{ x: 1, y: -19, color: LEAVES_SHADE_3 },
		{ x: 2, y: -19, color: LEAVES_SHADE_3 },
		{ x: 3, y: -19, color: LEAVES_SHADE_3 },
		{ x: 18, y: -19, color: LEAVES_SHADE_3 },
		{ x: 19, y: -19, color: LEAVES_SHADE_3 },
		{ x: 20, y: -19, color: LEAVES_SHADE_3 },
		{ x: 21, y: -19, color: LEAVES_SHADE_3 },
		{ x: 22, y: -19, color: LEAVES_SHADE_3 },
		{ x: 26, y: -19, color: LEAVES_SHADE_3 },
		{ x: 27, y: -19, color: LEAVES_SHADE_3 },
		{ x: 28, y: -19, color: LEAVES_SHADE_3 },
		{ x: 29, y: -19, color: LEAVES_SHADE_3 },
		// row 20
		{ x: -2, y: -20, color: LEAVES_SHADE_3 },
		{ x: -1, y: -20, color: LEAVES_SHADE_3 },
		{ x: 0, y: -20, color: LEAVES_SHADE_3 },
		{ x: 1, y: -20, color: LEAVES_SHADE_3 },
		{ x: 2, y: -20, color: LEAVES_SHADE_3 },
		{ x: 3, y: -20, color: LEAVES_SHADE_3 },
		{ x: 4, y: -20, color: LEAVES_SHADE_3 },
		{ x: 19, y: -20, color: LEAVES_SHADE_3 },
		{ x: 20, y: -20, color: LEAVES_SHADE_3 },
		{ x: 21, y: -20, color: LEAVES_SHADE_3 },
		{ x: 26, y: -20, color: LEAVES_SHADE_3 },
		{ x: 27, y: -20, color: LEAVES_SHADE_3 },
		{ x: 28, y: -20, color: LEAVES_SHADE_3 },
		{ x: 29, y: -20, color: LEAVES_SHADE_3 },
		// row 21
		{ x: -2, y: -21, color: LEAVES_SHADE_3 },
		{ x: -1, y: -21, color: LEAVES_SHADE_3 },
		{ x: 0, y: -21, color: LEAVES_SHADE_3 },
		{ x: 1, y: -21, color: LEAVES_SHADE_3 },
		{ x: 2, y: -21, color: LEAVES_SHADE_3 },
		{ x: 3, y: -21, color: LEAVES_SHADE_3 },
		{ x: 4, y: -21, color: LEAVES_SHADE_3 },
		{ x: 28, y: -21, color: LEAVES_SHADE_3 },
		{ x: 29, y: -21, color: LEAVES_SHADE_3 },
		// row 22
		{ x: -3, y: -22, color: LEAVES_SHADE_3 },
		{ x: -2, y: -22, color: LEAVES_SHADE_3 },
		{ x: -1, y: -22, color: LEAVES_SHADE_3 },
		{ x: 0, y: -22, color: LEAVES_SHADE_3 },
		{ x: 4, y: -22, color: LEAVES_SHADE_3 },
		{ x: 6, y: -22, color: LEAVES_SHADE_3 },
		{ x: 7, y: -22, color: LEAVES_SHADE_3 },
		{ x: 8, y: -22, color: LEAVES_SHADE_3 },
		{ x: 9, y: -22, color: LEAVES_SHADE_3 },
		{ x: 10, y: -22, color: LEAVES_SHADE_3 },
		{ x: 29, y: -22, color: LEAVES_SHADE_3 },
		// row 23
		{ x: -3, y: -23, color: LEAVES_SHADE_3 },
		{ x: -2, y: -23, color: LEAVES_SHADE_3 },
		{ x: -1, y: -23, color: LEAVES_SHADE_3 },
		{ x: 4, y: -23, color: LEAVES_SHADE_3 },
		{ x: 6, y: -23, color: LEAVES_SHADE_3 },
		{ x: 7, y: -23, color: LEAVES_SHADE_3 },
		{ x: 8, y: -23, color: LEAVES_SHADE_3 },
		{ x: 9, y: -23, color: LEAVES_SHADE_3 },
		{ x: 10, y: -23, color: LEAVES_SHADE_3 },
		{ x: 11, y: -23, color: LEAVES_SHADE_3 },
		// row 24
		{ x: -3, y: -24, color: LEAVES_SHADE_3 },
		{ x: 6, y: -24, color: LEAVES_SHADE_3 },
		{ x: 7, y: -24, color: LEAVES_SHADE_3 },
		// row 25
		{ x: -2, y: -25, color: LEAVES_SHADE_3 },
		{ x: 6, y: -25, color: LEAVES_SHADE_3 },
		{ x: 20, y: -25, color: LEAVES_SHADE_3 },
		{ x: 21, y: -25, color: LEAVES_SHADE_3 },
		{ x: 22, y: -25, color: LEAVES_SHADE_3 },
		{ x: 23, y: -25, color: LEAVES_SHADE_3 },
		{ x: 24, y: -25, color: LEAVES_SHADE_3 },
		{ x: 25, y: -25, color: LEAVES_SHADE_3 },
		{ x: 26, y: -25, color: LEAVES_SHADE_3 },
		// row 26
		{ x: 19, y: -26, color: LEAVES_SHADE_3 },
		{ x: 20, y: -26, color: LEAVES_SHADE_3 },
		{ x: 21, y: -26, color: LEAVES_SHADE_3 },
		{ x: 22, y: -26, color: LEAVES_SHADE_3 },
		{ x: 23, y: -26, color: LEAVES_SHADE_3 },
		{ x: 24, y: -26, color: LEAVES_SHADE_3 },
		{ x: 25, y: -26, color: LEAVES_SHADE_3 },
		{ x: 26, y: -26, color: LEAVES_SHADE_3 },
		{ x: 27, y: -26, color: LEAVES_SHADE_3 },
		{ x: 32, y: -26, color: LEAVES_SHADE_3 },
		// row 27
		{ x: 18, y: -27, color: LEAVES_SHADE_3 },
		{ x: 19, y: -27, color: LEAVES_SHADE_3 },
		{ x: 21, y: -27, color: LEAVES_SHADE_3 },
		{ x: 22, y: -27, color: LEAVES_SHADE_3 },
		{ x: 23, y: -27, color: LEAVES_SHADE_3 },
		{ x: 24, y: -27, color: LEAVES_SHADE_3 },
		{ x: 25, y: -27, color: LEAVES_SHADE_3 },
		{ x: 26, y: -27, color: LEAVES_SHADE_3 },
		{ x: 27, y: -27, color: LEAVES_SHADE_3 },
		{ x: 28, y: -27, color: LEAVES_SHADE_3 },
		// row 28
		{ x: 5, y: -28, color: LEAVES_SHADE_3 },
		{ x: 6, y: -28, color: LEAVES_SHADE_3 },
		{ x: 7, y: -28, color: LEAVES_SHADE_3 },
		{ x: 8, y: -28, color: LEAVES_SHADE_3 },
		{ x: 9, y: -28, color: LEAVES_SHADE_3 },
		{ x: 10, y: -28, color: LEAVES_SHADE_3 },
		{ x: 18, y: -28, color: LEAVES_SHADE_3 },
		{ x: 19, y: -28, color: LEAVES_SHADE_3 },
		{ x: 26, y: -28, color: LEAVES_SHADE_3 },
		{ x: 27, y: -28, color: LEAVES_SHADE_3 },
		{ x: 28, y: -28, color: LEAVES_SHADE_3 },
		// row 29
		{ x: 4, y: -29, color: LEAVES_SHADE_3 },
		{ x: 5, y: -29, color: LEAVES_SHADE_3 },
		{ x: 6, y: -29, color: LEAVES_SHADE_3 },
		{ x: 8, y: -29, color: LEAVES_SHADE_3 },
		{ x: 9, y: -29, color: LEAVES_SHADE_3 },
		{ x: 10, y: -29, color: LEAVES_SHADE_3 },
		{ x: 11, y: -29, color: LEAVES_SHADE_3 },
		{ x: 18, y: -29, color: LEAVES_SHADE_3 },
		{ x: 27, y: -29, color: LEAVES_SHADE_3 },
		// row 30
		{ x: 4, y: -30, color: LEAVES_SHADE_3 },
		{ x: 5, y: -30, color: LEAVES_SHADE_3 },
		{ x: 11, y: -30, color: LEAVES_SHADE_3 },
		{ x: 34, y: -30, color: LEAVES_SHADE_3 },
		// row 31
		{ x: 4, y: -31, color: LEAVES_SHADE_3 },
		{ x: 13, y: -31, color: LEAVES_SHADE_3 },
		{ x: 14, y: -31, color: LEAVES_SHADE_3 },
		{ x: 15, y: -31, color: LEAVES_SHADE_3 },
		{ x: 16, y: -31, color: LEAVES_SHADE_3 },
		// row 32
		{ x: 5, y: -32, color: LEAVES_SHADE_3 },
		{ x: 12, y: -32, color: LEAVES_SHADE_3 },
		{ x: 13, y: -32, color: LEAVES_SHADE_3 },
		{ x: 14, y: -32, color: LEAVES_SHADE_3 },
		{ x: 15, y: -32, color: LEAVES_SHADE_3 },
		{ x: 16, y: -32, color: LEAVES_SHADE_3 },
		{ x: 17, y: -32, color: LEAVES_SHADE_3 },
		{ x: 18, y: -32, color: LEAVES_SHADE_3 },
		{ x: 19, y: -32, color: LEAVES_SHADE_3 },
		// row 33
		{ x: 11, y: -33, color: LEAVES_SHADE_3 },
		{ x: 12, y: -33, color: LEAVES_SHADE_3 },
		{ x: 13, y: -33, color: LEAVES_SHADE_3 },
		{ x: 14, y: -33, color: LEAVES_SHADE_3 },
		{ x: 15, y: -33, color: LEAVES_SHADE_3 },
		{ x: 16, y: -33, color: LEAVES_SHADE_3 },
		{ x: 17, y: -33, color: LEAVES_SHADE_3 },
		{ x: 18, y: -33, color: LEAVES_SHADE_3 },
		{ x: 19, y: -33, color: LEAVES_SHADE_3 },
		// row 34
		{ x: 10, y: -34, color: LEAVES_SHADE_3 },
		{ x: 11, y: -34, color: LEAVES_SHADE_3 },
		{ x: 13, y: -34, color: LEAVES_SHADE_3 },
		{ x: 15, y: -34, color: LEAVES_SHADE_3 },
		{ x: 20, y: -34, color: LEAVES_SHADE_3 },
		// row 35
		{ x: 10, y: -35, color: LEAVES_SHADE_3 },
		{ x: 20, y: -35, color: LEAVES_SHADE_3 },
		// row 36
		{ x: 10, y: -36, color: LEAVES_SHADE_3 },
		{ x: 20, y: -36, color: LEAVES_SHADE_3 },
		{ x: 27, y: -36, color: LEAVES_SHADE_3 }
	];
};
