import type { Pattern } from '../types';
import { duck } from './duck';
import { pepe_smol } from './pepe_smol';
import { pepe_sad } from './pepe-sad';
import { create_tree } from './tree';

export const patterns = {
	pixel: null,
	pepe_smol,
	pepe_sad,
	duck,
	tree: create_tree('autumn') // 805px
} as const satisfies Record<string, Pattern | null>;
