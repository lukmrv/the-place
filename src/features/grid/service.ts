import { addNotification } from '../../components/notification/notification-store';
import type { PageLoad } from '../../routes/$types';
import { PIXEL_SUCCESS_MESSAGES, PATTERN_SUCCESS_MESSAGES } from './const';
import type { ColorsPalette, GridPixelData } from './types';
import type { GridState } from './types';

export const getGridState = async (fetch: PageLoad['fetch']): Promise<GridState | undefined> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-grid`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const grid = await response.json();

	return { grid: grid.grid, pixels: Uint8ClampedArray.from(grid.pixels) };
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

export const setPixel = async ({ offset, r, g, b, a }: GridPixelData) => {
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
			console.log(data);
			addNotification({
				message: data.error.cooldown_in_ms
					? `${data.error.message}: ${data.error.cooldown_in_ms / 1000}s`
					: data.error.message,
				type: 'info',
				duration: data.error.cooldown_in_ms
			});

			return null;
		} else {
			const randomMessage =
				PIXEL_SUCCESS_MESSAGES[Math.floor(Math.random() * PIXEL_SUCCESS_MESSAGES.length)];
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

export const setPattern = async (pattern: GridPixelData[]) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/set-pattern`, {
			method: 'POST',
			body: JSON.stringify({ pattern }),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		if (!response.ok) {
			addNotification({
				message: data.error.cooldown_in_ms
					? `${data.error.message}: ${data.error.cooldown_in_ms / 1000}s`
					: data.error.message,
				type: 'info',
				duration: data.error.cooldown_in_ms
			});

			return null;
		} else {
			const randomMessage =
				PATTERN_SUCCESS_MESSAGES[Math.floor(Math.random() * PATTERN_SUCCESS_MESSAGES.length)];
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
