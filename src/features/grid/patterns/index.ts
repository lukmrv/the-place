import type { Pattern } from '../types';
import { duck } from './duck';
import { pepe } from './pepe';
import { create_tree } from './tree';

export const patterns = {
	pixel: null,
	pepe,
	duck,
	tree: create_tree('autumn') // 805px
} as const satisfies Record<string, Pattern | null>;
