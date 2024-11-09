import type { Pattern, Pixel } from './types';

// 4, 8, 16, 24
export const width = 16;
export const height = 16;
export const scaleFactor = (() => {
	const targetGridSize = 320; // Total grid width/height in pixels

	// Use the larger dimension to ensure grid fits within target size
	const largerDimension = Math.max(width, height);

	// Calculate scale factor to achieve target size
	return Math.floor(targetGridSize / largerDimension);
})();

export class PatternRecorder {
	private pattern: Pattern = [];
	private originOffset: number | null = null;

	clearPattern() {
		this.pattern = [];
		this.originOffset = null;
	}

	savePattern(): Pattern {
		const finalPattern = this.pattern;
		this.clearPattern();
		return finalPattern;
	}

	addPixel(pixel: Pixel) {
		const x = pixel.offset % width;
		const y = Math.floor(pixel.offset / width);

		if (this.originOffset === null) {
			this.originOffset = pixel.offset;
			this.pattern.push({ x: 0, y: 0, color: pixel.color });
			return;
		}

		const originX = this.originOffset % width;
		const originY = Math.floor(this.originOffset / width);

		// Calculate offset from origin
		const offsetX = x - originX;
		const offsetY = y - originY;

		// If pixel is white, remove any existing pixel at this position
		if (pixel.color === 'white') {
			this.pattern = this.pattern.filter((p) => p.x !== offsetX || p.y !== offsetY);
			return;
		}

		// Remove any existing pixel at these coordinates before adding the new one
		this.pattern = this.pattern.filter((p) => p.x !== offsetX || p.y !== offsetY);
		this.pattern.push({ x: offsetX, y: offsetY, color: pixel.color });
	}

	getCurrentPattern(): Pattern {
		return this.pattern;
	}
}
