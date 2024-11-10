import { remoteGridStateAdapter } from './adapter';
import type { Coordinates, Pattern, Pixel } from './types';

export async function getGridState() {
	const response = await fetch('http://localhost:8080/api/get-grid-state');
	const data = await response.json();
	return remoteGridStateAdapter(data);
}

export const setPixel = async (offset: number, r: number, g: number, b: number, a: number) => {
	try {
		const response = await fetch('http://localhost:8080/api/set-tile', {
			method: 'POST',
			body: JSON.stringify({ offset, r, g, b, a })
		});

		if (!response.ok) {
			throw new Error('Failed to set pixel');
		}

		return response.json();
	} catch (error) {
		console.error('Failed to set pixel', error);
		return null;
	}
};
