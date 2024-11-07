export const width = 100;
export const height = 100;

export const colorsPalette = {
	red: [255, 69, 0, 255],
	orange: [255, 168, 0, 255],
	yellow: [255, 214, 53, 255],
	darkGreen: [0, 163, 104, 255],
	lightGreen: [126, 237, 86, 255],
	darkBlue: [36, 80, 164, 255],
	blue: [54, 144, 234, 255],
	lightBlue: [81, 233, 244, 255],
	darkPurple: [129, 30, 159, 255],
	purple: [180, 74, 192, 255],
	fightTheSunrise: [255, 153, 170, 255],
	brown: [156, 105, 38, 255],
	black: [0, 0, 0, 255],
	darkGray: [137, 141, 144, 255],
	lightGray: [212, 215, 217, 255],
	white: [255, 255, 255, 255]
};

export const crossPattern = [
	{ x: 0, y: 0 },
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 0, y: 1 },
	{ x: 0, y: -1 }
];

export const treePattern = [
	// Trunk
	{ x: 0, y: 0 },
	{ x: 0, y: 1 },
	{ x: 0, y: 2 },
	{ x: 0, y: 3 },

	// Main branches
	{ x: -2, y: -1 },
	{ x: -1, y: -1 },
	{ x: 1, y: -1 },
	{ x: 2, y: -1 },
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },

	// Leaves/foliage
	{ x: -3, y: -2 },
	{ x: -2, y: -2 },
	{ x: -1, y: -2 },
	{ x: 0, y: -2 },
	{ x: 1, y: -2 },
	{ x: 2, y: -2 },
	{ x: 3, y: -2 },

	{ x: -2, y: -3 },
	{ x: -1, y: -3 },
	{ x: 0, y: -3 },
	{ x: 1, y: -3 },
	{ x: 2, y: -3 },

	{ x: -1, y: -4 },
	{ x: 0, y: -4 },
	{ x: 1, y: -4 },

	{ x: 0, y: -5 }
];
