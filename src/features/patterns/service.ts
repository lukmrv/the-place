import type { PageLoad } from '../../routes/$types';
import type { PublicPatternData } from './types';

export const getPublicPatterns = async (fetch: PageLoad['fetch']): Promise<PublicPatternData> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-public-patterns`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const patterns = await response.json();
		return patterns;
	} catch (error) {
		console.error('Error fetching public patterns:', error);
		throw error;
	}
};
