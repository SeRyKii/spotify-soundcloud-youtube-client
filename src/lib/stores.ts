import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const token: Writable<string> = localStorageStore('token', '');
export const globals: Writable<Record<string, string>> = localStorageStore('globals', {
	backendUrl: 'http://localhost:8000'
});

export const spotifyOAuth: Writable<spotifyOAuth> = localStorageStore(
	'spotify',
	{} as spotifyOAuth
);
export const spotifyCodeVerifier: Writable<string> = localStorageStore('spotify_code_verifier', '');
