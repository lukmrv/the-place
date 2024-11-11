import { checkAuthStatus } from '../features/user/service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const userData = await checkAuthStatus();
		return {
			user: userData
		};
	} catch (error) {
		return {
			user: null
		};
	}
};
