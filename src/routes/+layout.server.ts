import { checkAuthStatus } from '../features/user/service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const userData = await checkAuthStatus();

		console.log('userData', userData);
		return {
			user: userData
		};
	} catch (error) {
		return {
			user: null
		};
	}
};
