import { get } from 'svelte/store';
import { user } from './stores/user';

async function fetchApi(endpoint: string, options: RequestInit = {}) {
	const currentUser = get(user);

	return fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${currentUser?.accessToken}`
		}
	});
}
