import { get, writable } from 'svelte/store';
import type { ColorsPalette } from '../features/grid/types';

const useColors = () => {
	const colorsStore = writable<ColorsPalette | null>(null);

	const set = (colors: ColorsPalette | null) => colorsStore.update(() => colors);

	return {
		set,
		get: () => get(colorsStore)
	};
};

export const colorsStore = useColors();
