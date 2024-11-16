import { addNotification } from '../../components/notification/notification-store';
import type { PageLoad } from '../../routes/$types';
import { remoteGridStateAdapter } from './adapter';
import { SUCCESS_MESSAGES } from './const';
import type { ColorsPalette, Grid, RemoteGridDbState } from './types';

export const getGridState = async (fetch: PageLoad['fetch']): Promise<Grid | undefined> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-grid`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const grid = await response.json();
	const transformedGridStateData = remoteGridStateAdapter(grid.pixels);

	return { grid: grid.grid, pixels: transformedGridStateData };
};

export const getColors = async (fetch: PageLoad['fetch']): Promise<ColorsPalette | null> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-colors-palette`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const colors = await response.json();

	return colors;
};

export const setPixel = async ({ offset, r, g, b, a }: RemoteGridDbState[number]) => {
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

export const setPattern = async (pattern: { pattern: RemoteGridDbState }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/set-pattern`, {
			method: 'POST',
			body: JSON.stringify(pattern),
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
		console.log('Failed to set pattern', error);
		return { error: 'Failed to set pattern' };
	}
};
