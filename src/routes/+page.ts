// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const ssr = true;

import type { PageLoad } from './$types';
import { getGridState } from '../features/grid/service';
import type { Grid, GridState } from '../features/grid/types';

type PageData = {
	gridState: Promise<GridState | undefined>;
};

// this is more of a page data, even thought it's available for all children
export const load: PageLoad = async ({ fetch }: PageLoad['props']): Promise<PageData> => ({
	gridState: getGridState(fetch)
});
