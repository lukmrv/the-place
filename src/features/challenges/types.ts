import type { ResponseGridPatternCoordinate } from '../patterns/types';

export type ResponseChallenge = {
	id: string;
	name: string;
	width: number;
	height: number;
	coordinates: ResponseGridPatternCoordinate[];
};
