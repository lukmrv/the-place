import type { PageLoad } from './$types';
import { getUser } from '../features/user/service';
import type { User } from '../features/user/types';
import { getGridState } from '../features/grid/service';
import type { Grid } from '../features/grid/types';

type LayoutData = {
	user: Promise<User | undefined>;
};

// global user data
export const load: PageLoad = async ({ fetch }: PageLoad['props']): Promise<LayoutData> => ({
	user: getUser(fetch)
});
