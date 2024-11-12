import type { PageLoad } from './$types';
import { getUser } from '../features/user/service';
import type { User } from '../features/user/types';

export const load: PageLoad = (): { user: ReturnType<typeof getUser> } => {
	return { user: getUser() };
};
