import type { PageLoad } from './$types';
import { getUser } from '../features/user/service';
import type { User } from '../features/user/types';
import { getGridPatterns } from '../features/patterns/service';
import { userStore } from '../stores/user-store';
import { patternsStore } from '../stores/patterns-store';
import { getColors } from '../features/grid/service';
import { colorsStore } from '../stores/colors-store';

export const load: PageLoad = async ({ fetch }: PageLoad['props']) => {
	const userData = await getUser(fetch);
	const gridPatterns = await getGridPatterns(fetch);
	const colors = await getColors(fetch);

	userStore.set(userData);
	patternsStore.update(gridPatterns);
	colorsStore.set(colors);
};
