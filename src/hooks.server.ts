import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// Initialize session middleware
const session: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	if (session) {
		try {
			event.locals.user = JSON.parse(session);
		} catch {
			event.cookies.delete('session', { path: '/' });
		}
	}
	return resolve(event);
};

// Protect routes that require authentication
const authorization: Handle = async ({ event, resolve }) => {
	const protectedPaths = ['/dashboard', '/profile'];
	const isProtectedRoute = protectedPaths.some((path) => event.url.pathname.startsWith(path));

	if (isProtectedRoute && !event.locals.user) {
		return new Response('Redirect', {
			status: 303,
			headers: { Location: '/signin' }
		});
	}

	return resolve(event);
};

export const handle = sequence(session, authorization);
