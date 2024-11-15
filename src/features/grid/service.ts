import { addNotification } from '../../components/notification/notification-store';
import type { PageLoad } from '../../routes/$types';
import { remoteGridStateAdapter } from './adapter';
import type { Grid } from './types';
import { mapPixelDataToColor } from './utils';

const SUCCESS_MESSAGES = [
	'Tactical placement!',
	'Are you sure about that?',
	'Nice pixel!',
	'Keep creating!',
	'Artistic genius!',
	'Good choice!',
	'Impressive!',
	'Pixel perfect!',
	'Great work!'
];

export async function getGridState(fetch: PageLoad['fetch']): Promise<Grid | undefined> {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-grid`, {
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
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/set-tile`, {
			method: 'POST',
			body: JSON.stringify({ offset, r, g, b, a }),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();

		if (!response.ok) {
			addNotification({
				message: data.cooldown_in_ms
					? `${data.message}: ${data.cooldown_in_ms / 1000}s`
					: data.message,
				type: 'info',
				duration: data.cooldown_in_ms
			});

			return null;
		} else {
			const randomMessage = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
			addNotification({
				message: randomMessage,
				type: 'success',
				duration: 2000
			});
		}

		return { data };
	} catch (error) {
		console.log('Failed to set pixel', error);
		return { error: 'Failed to set pixel' };
	}
};
