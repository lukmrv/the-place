// signin/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const API_URL = import.meta.env.VITE_API_URL;

export const load: PageServerLoad = async ({ cookies, url }) => {
	// TODO: change base url to env
	const referer = url.searchParams.get('referer') || 'http://localhost:5173/';

	cookies.set('oauth_redirect', referer, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 10 // 10 minutes expiry
	});

	throw redirect(303, `${API_URL}/auth/google`);
};
