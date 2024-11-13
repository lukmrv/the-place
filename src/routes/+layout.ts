import type { PageLoad } from './$types';
import { getUser } from '../features/user/service';
import type { User } from '../features/user/types';
import { getGridState } from '../features/grid/service';
import type { Grid } from '../features/grid/types';

type LayoutData = {
	user: Promise<User | undefined>;
	gridState: Promise<Grid | undefined>;
};

export const load: PageLoad = async (): Promise<LayoutData> => ({
	user: getUser(),
	gridState: getGridState()
});
