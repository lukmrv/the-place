import { checkColorEquality } from './utils';
import type { GridPixelData } from './types';

// TODO - add erasing. Right now white pixels are transparent and work as an eraser.
// I want to add eraser separately, and placing a white pixel should be highlighted somehow

// 4, 8, 12
export const width = 24;
export const height = 24;
export const scaleFactor = (() => {
	const targetGridSize = 320; // Total grid width/height in pixels

	// Use the larger dimension to ensure grid fits within target size
	const largerDimension = Math.max(width, height);

	// Calculate scale factor to achieve target size
	return Math.floor(targetGridSize / largerDimension);
})();

export class PatternRecorder {
	private pattern: GridPixelData[] = [];
	private originOffset: number | null = null;

	clearPattern() {
		this.pattern = [];
		this.originOffset = null;
	}

	savePattern(): GridPixelData[] {
		const finalPattern = this.pattern;
		return finalPattern;
	}

	addPixel({ offset, color }: { offset: number; color: number[] }) {
		if (this.originOffset === null) {
			this.originOffset = offset;
			this.pattern.push({ offset: 0, r: 0, g: 0, b: 0, a: 0 });
			return;
		}

		const isWhite = checkColorEquality(color, [255, 255, 255, 255]);

		// If pixel is white, remove any existing pixel at this position
		if (isWhite) {
			this.pattern = this.pattern.filter((p) => p.offset !== offset);
			return;
		}

		// Remove any existing pixel at these coordinates before adding the new one
		this.pattern = this.pattern.filter((p) => p.offset !== offset);
		this.pattern.push({ offset, r: color[0], g: color[1], b: color[2], a: color[3] });
	}

	getCurrentPattern(): GridPixelData[] {
		return this.pattern;
	}
}
