import type { Pattern } from '../types';
import { duck } from './duck';
import { pepe_smol } from './pepe_smol';
import { pepe_sad } from './pepe-sad';
import { create_tree } from './tree';
import {
	a,
	b,
	c,
	d,
	e,
	f,
	g,
	h,
	i,
	j,
	k,
	l,
	m,
	n,
	o,
	p,
	q,
	r,
	s,
	t,
	u,
	v,
	w,
	x,
	y,
	z
} from './alphabet';

export const patterns = {
	pixel: null,
	pepe_smol,
	pepe_sad,
	duck,
	tree: create_tree('autumn'), // 805px
	a,
	b,
	c,
	d,
	e,
	f,
	g,
	h,
	i,
	j,
	k,
	l,
	m,
	n,
	o,
	p,
	q,
	r,
	s,
	t,
	u,
	v,
	w,
	x,
	y,
	z
} as const satisfies Record<string, Pattern | null>;
