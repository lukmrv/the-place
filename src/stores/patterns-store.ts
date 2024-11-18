import { get, writable } from 'svelte/store';
import type { ResponseGridPatternData } from '../features/patterns/types';

const usePatterns = () => {
	const patternsStore = writable<ResponseGridPatternData>({ pixel: [] });

	const update = (patterns: ResponseGridPatternData) =>
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
