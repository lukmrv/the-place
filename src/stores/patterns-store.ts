import { get, writable } from 'svelte/store';
import type { ResponseGridPatternData } from '../features/patterns/types';
import * as alphabet from '../features/patterns/alphabet/letters';

const usePatterns = () => {
	const alphabetObject = Object.fromEntries(Object.entries(alphabet));

	const patternsStore = writable<Record<'patterns' | 'alphabet', ResponseGridPatternData>>({
		patterns: {},
		alphabet: alphabetObject
	});

	const update = (patterns: ResponseGridPatternData) =>
		patternsStore.update((currentPatterns) => ({
			...currentPatterns,
			patterns: patterns
		}));

	return {
		update,
		get: () => get(patternsStore)
	};
};

export const patternsStore = usePatterns();
