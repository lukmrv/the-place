import passport from 'passport';
import type { RequestHandler } from './$types';
import type { User } from '../../../../features/auth/auth';

export const GET: RequestHandler = ({ cookies }) => {
	return new Promise((resolve) => {
		passport.authenticate('google', (err: Error | null, user: User | false) => {
			if (err || !user) {
				return resolve(
					new Response(null, {
						status: 302,
						headers: { Location: '/signin?error=auth' }
					})
				);
			}

			cookies.set('session', JSON.stringify(user), {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});

			resolve(
				new Response(null, {
					status: 302,
					headers: { Location: '/' }
				})
			);
		})({ cookies }, {});
	});
};
