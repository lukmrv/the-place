import type { User } from './types';

export const getUser = async (): Promise<User | null> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
			credentials: 'include'
		});
		return await response.json();
	} catch (error) {
		return null;
	}
};
