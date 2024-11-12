import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export const signIn = async () => {
	const currentUrl = get(page).url.href;
	goto(`/signin?referer=${encodeURIComponent(currentUrl)}`);
};

export const signOut = async () => {
	goto('/signout');
};
