import type { Pattern, Pixel } from './types';

export const width = 8;
export const height = 8;

export class PatternRecorder {
	private recording: boolean = false;
	private pattern: Pattern = [];
	private originOffset: number | null = null;

	startRecording() {
		this.recording = true;
		this.pattern = [];
		this.originOffset = null;

		console.log(this.pattern);
	}

	stopRecording(): Pattern {
		this.recording = false;
		const finalPattern = [...this.pattern];
		this.pattern = [];
		this.originOffset = null;
		return finalPattern;
	}

	addPixel(pixel: Pixel) {
		if (!this.recording) return;

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

	isRecording(): boolean {
		return this.recording;
	}

	getCurrentPattern(): Pattern {
		return [...this.pattern];
	}
}
