import { checkColorEquality } from './utils';
import type { GridPixelData } from './types';

// TODO - add erasing. Right now white pixels are transparent and work as an eraser.
// I want to add eraser separately, and placing a white pixel should be highlighted somehow

// 4, 8, 12
export const width = 5;
export const height = 5;
export const scaleFactor = (() => {
	const targetGridSize = 320; // Total grid width/height in pixels

	// Use the larger dimension to ensure grid fits within target size
	const largerDimension = Math.max(width, height);

	// Calculate scale factor to achieve target size
	return Math.floor(targetGridSize / largerDimension);
})();

export class PatternRecorder {
	private pattern: Array<{ x: number; y: number; r: number; g: number; b: number; a: number }> = [];
	private firstPixel: { x: number; y: number } | null = null;

	addPixel({ offset, color }: { offset: number; color: number[] }) {
		// Convert offset to x,y coordinates
		const y = Math.floor(offset / width);
		const x = offset % width;

		// If this is the first pixel, store its position as reference
		if (!this.firstPixel) {
			this.firstPixel = { x, y };
		}

		// Calculate relative position to first pixel
		const relativeX = x - this.firstPixel.x;
		const relativeY = y - this.firstPixel.y;

		this.pattern.push({
			x: relativeX,
			y: relativeY,
			r: color[0],
			g: color[1],
			b: color[2],
			a: color[3]
		});
	}

	savePattern() {
		if (this.pattern.length === 0) return null;
		return this.pattern;
	}

	clearPattern() {
		this.pattern = [];
		this.firstPixel = null;
	}
}
