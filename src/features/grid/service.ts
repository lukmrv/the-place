import { remoteGridStateAdapter } from './adapter';

export async function getGridState() {
	const response = await fetch('http://localhost:8080/api/get-grid-state');
	const data = await response.json();
	return remoteGridStateAdapter(data);
}

export const setPixel = async (offset: number, r: number, g: number, b: number, a: number) => {
	const response = await fetch('http://localhost:8080/api/set-tile', {
		method: 'POST',
		body: JSON.stringify({ offset, r, g, b, a })
	});
	return response.json();
};
