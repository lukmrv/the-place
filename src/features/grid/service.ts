import type { PageLoad } from '../../routes/$types';
import { remoteGridStateAdapter } from './adapter';
import type { Grid } from './types';

export async function getGridState(fetch: PageLoad['fetch']): Promise<Grid | undefined> {
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
		const data = await response.json();

		if (!response.ok) {
			alert(data.message);
			return { error: data.message || 'An error occurred' };
		}

		return { data };
	} catch (error) {
		console.log('Failed to set pixel', error);
		return { error: 'Failed to set pixel' };
	}
};
