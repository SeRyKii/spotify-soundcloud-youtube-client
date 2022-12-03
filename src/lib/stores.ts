import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const token: Writable<string> = localStorageStore('token', '');
export const globals: Writable<Record<string, string>> = localStorageStore('globals', {
	backendUrl: 'http://localhost:8000'
});
