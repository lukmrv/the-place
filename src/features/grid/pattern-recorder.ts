import type { Pattern, Pixel } from './types';

export const width = 8;
export const height = 8;

export class PatternRecorder {
	private pattern: Pattern = [];
	private originOffset: number | null = null;

	clearPattern() {
		this.pattern = [];
		this.originOffset = null;
	}

	savePattern(): Pattern {
		console.log('Saving pattern:', this.pattern);
		const finalPattern = [...this.pattern];
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

		// Check if pixel with these coordinates already exists
		const exists = this.pattern.some((p) => p.x === offsetX && p.y === offsetY);
		if (!exists) {
			this.pattern.push({ x: offsetX, y: offsetY, color: pixel.color });
		}
	}

	getCurrentPattern(): Pattern {
		return [...this.pattern];
	}
}
