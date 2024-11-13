import type { User } from './types';

export const getUser = async (): Promise<User | undefined> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
			credentials: 'include'
		});
		return await response.json();
	} catch (error) {
		return undefined;
	}
};
