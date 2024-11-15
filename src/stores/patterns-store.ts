import { get, writable } from 'svelte/store';
import type { PublicPatternData } from '../features/patterns/types';

const usePatterns = () => {
	const patternsStore = writable<PublicPatternData>({ pixel: [] });

	const update = (patterns: PublicPatternData) =>
		patternsStore.update((currentPatterns) => ({
			...currentPatterns,
			...patterns
		}));

	return {
		update,
		get: () => get(patternsStore)
	};
};

export const patternsStore = usePatterns();
