import type { RemoteGridDbState } from './types';

export const remoteGridStateAdapter = (remoteGridState: RemoteGridDbState) => {
	const processedImageData: number[] = [];
	remoteGridState.forEach((item) => processedImageData.push(item.r, item.g, item.b, item.a));
	return new Uint8ClampedArray(processedImageData);
};
