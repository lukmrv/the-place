import type { ResponseGridPatternCoordinate } from '../../patterns/types';

const BLACK: Omit<ResponseGridPatternCoordinate, 'x' | 'y'> = { r: 0, g: 0, b: 0, a: 255 };

export const a: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	}
];

export const b: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	}
];

export const c: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	}
];

export const d: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	}
];

export const e: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	}
];

export const f: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	}
];

export const g: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	}
];

export const h: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 3,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	}
];

export const i: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 1,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	}
];

export const j: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	}
];

export const k: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	}
];

export const l: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	}
];

export const m: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 4,
		y: -4,
		...BLACK
	},
	{
		x: 4,
		y: -3,
		...BLACK
	},
	{
		x: 4,
		y: -2,
		...BLACK
	},
	{
		x: 4,
		y: -1,
		...BLACK
	},
	{
		x: 4,
		y: 0,
		...BLACK
	}
];

export const n: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	}
];

export const o: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	}
];

export const p: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	}
];

export const q: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 1,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	}
];

export const r: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	}
];

export const s: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	}
];

export const t: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: -2,
		y: -4,
		...BLACK
	},
	{
		x: -1,
		y: -4,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	}
];

export const u: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: -1,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	}
];

export const v: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: -1,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -2,
		y: -3,
		...BLACK
	},
	{
		x: -2,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	}
];

export const w: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: -1,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: -1,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 1,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -1,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 3,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	}
];

export const x: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -2,
		...BLACK
	},
	{
		x: 3,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 0,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -1,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	}
];

export const y: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 0,
		y: -2,
		...BLACK
	},
	{
		x: -1,
		y: -3,
		...BLACK
	},
	{
		x: -2,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -3,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	}
];

export const z: ResponseGridPatternCoordinate[] = [
	{
		x: 0,
		y: 0,
		...BLACK
	},
	{
		x: 0,
		y: -1,
		...BLACK
	},
	{
		x: 1,
		y: -2,
		...BLACK
	},
	{
		x: 2,
		y: -3,
		...BLACK
	},
	{
		x: 3,
		y: -4,
		...BLACK
	},
	{
		x: 2,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: -4,
		...BLACK
	},
	{
		x: 0,
		y: -4,
		...BLACK
	},
	{
		x: 1,
		y: 0,
		...BLACK
	},
	{
		x: 2,
		y: 0,
		...BLACK
	},
	{
		x: 3,
		y: 0,
		...BLACK
	}
];
