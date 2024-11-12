// src/stores/user.js
import { writable } from 'svelte/store';

export interface User {
	id: string;
	email: string;
	name: string;
	// add other user properties as needed
}
