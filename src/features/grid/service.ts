import { remoteGridStateAdapter } from './adapter';
import type { Coordinates, Grid, Pattern, Pixel } from './types';

export async function getGridState(): Promise<Grid | undefined> {
	const response = await fetch('http://localhost:8080/api/get-grid', {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const grid = await response.json();
	const transformedGridStateData = remoteGridStateAdapter(grid.pixels);

	return { grid: grid.grid, pixels: transformedGridStateData };
}

export const setPixel = async (offset: number, r: number, g: number, b: number, a: number) => {
	try {
		const response = await fetch('http://localhost:8080/api/set-tile', {
			method: 'POST',
			body: JSON.stringify({ offset, r, g, b, a }),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
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
