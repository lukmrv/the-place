import { get, writable } from 'svelte/store';
import type { ResponseChallenge } from '../features/challenges/types';

const useChallenge = () => {
	const challengeStore = writable<ResponseChallenge | null>(null);

	const set = (challenge: ResponseChallenge | null) => challengeStore.update(() => challenge);

	return {
		set,
		get: () => get(challengeStore)
	};
};

export const challengeStore = useChallenge();
