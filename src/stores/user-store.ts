import { get, writable } from 'svelte/store';
import type { User } from '../features/user/types';

const useUser = () => {
	const userStore = writable<User | null>(null);

	const set = (user: User | null) => userStore.update(() => user);

	return {
		set,
		get: () => get(userStore)
	};
};

export const userStore = useUser();
