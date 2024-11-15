import type { PageLoad } from './$types';
import { getUser } from '../features/user/service';
import type { User } from '../features/user/types';
import { getPublicPatterns } from '../features/patterns/service';
import { userStore } from '../stores/user-store';
import { patternsStore } from '../stores/patterns-store';

export const load: PageLoad = async ({ fetch }: PageLoad['props']) => {
	const userData = await getUser(fetch);
	const publicPatterns = await getPublicPatterns(fetch);

	userStore.set(userData);
	patternsStore.update(publicPatterns);
};
