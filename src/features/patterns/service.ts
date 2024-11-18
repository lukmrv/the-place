import type { PageLoad } from '../../routes/$types';
import type { ResponseGridPatternData } from './types';

export const getGridPatterns = async (
	fetch: PageLoad['fetch']
): Promise<ResponseGridPatternData> => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/get-grid-patterns`, {
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
