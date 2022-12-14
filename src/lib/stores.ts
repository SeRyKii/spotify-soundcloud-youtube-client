import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const token: Writable<string> = localStorageStore('token', '');
export const globals: Writable<{
	backendUrl: string;
}> = localStorageStore('globals', {
	backendUrl: 'http://localhost:8000'
});

export const theme: Writable<number> = localStorageStore('theme', 0);
export const customTheme: Writable<string> = localStorageStore('custom_theme', '');

export const spotifyOAuth: Writable<spotifyOAuth> = localStorageStore(
	'spotify',
	{} as spotifyOAuth
);
export const spotifyCodeVerifier: Writable<string> = localStorageStore('spotify_code_verifier', '');
