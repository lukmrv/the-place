// src/stores/user.js
import { writable } from 'svelte/store';

export interface User {
	email: string;
	name: string;
	image?: string;
	accessToken?: string;
}

export const user = writable<User | null>(null);
