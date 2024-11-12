import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.delete('id', { path: '/' });
	cookies.delete('rid', { path: '/' });
};
