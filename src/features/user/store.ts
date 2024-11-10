// src/stores/user.js
import { writable } from 'svelte/store';

export interface User {
	id: string;
	email: string;
	name: string;
	// add other user properties as needed
}

function createUserStore() {
	const { subscribe, set, update } = writable<User | null>(null);

	return {
		subscribe,
		set,
		update,
		logout: () => set(null)
	};
}

export const user = createUserStore();
