import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, cookies }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		throw redirect(303, '/signin?error=no_code');
	}

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code })
		});

		const data = await response.json();

		if (!data.token) {
			throw new Error('No token received');
		}

		// Store token in an HTTP-only cookie
		cookies.set('session', data.token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/dashboard');
	} catch (error) {
		console.error('Authentication error:', error);
		throw redirect(303, '/signin?error=authentication_failed');
	}
};
