import type { PageLoad } from '../../routes/$types';
import type { ResponseChallenge } from './types';

export const getChallenge = async (fetch: PageLoad['fetch']): Promise<ResponseChallenge> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-challenge`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const challenge = await response.json();
		return challenge;
	} catch (error) {
		console.error('Error fetching challenge:', error);
		throw error;
	}
};
