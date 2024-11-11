// signin/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const API_URL = import.meta.env.VITE_API_URL;

export const load: PageServerLoad = async ({ cookies }) => {
	// First check if user is already authenticated
	const id = cookies.get('id');
	const rid = cookies.get('rid');

	if (id && rid) {
		// User is already logged in, fetch their info from your API
		try {
			const response = await fetch(`${API_URL}/user/info`, {
				headers: {
					Cookie: `id=${id}; rid=${rid}`
				},
				credentials: 'include'
			});

			if (response.ok) {
				const userData = await response.json();
				return {
					user: userData
				};
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	}

	// If not authenticated, redirect to API's Google auth endpoint
	throw redirect(303, `${API_URL}/auth/google`);
};
