import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const token: Writable<string> = localStorageStore('token', '');
export const globals: Writable<{
	backendUrl: string;
}> = localStorageStore('globals', {
	backendUrl: 'http://127.0.0.1:8000'
});

export const spotifyOAuth: Writable<spotifyOAuth> = localStorageStore(
	'spotify',
	{} as spotifyOAuth
);
export const spotifySaveToDb: Writable<boolean> = localStorageStore('spotify_save_to_db', false);
export const spotifyCodeVerifier: Writable<string> = localStorageStore('spotify_code_verifier', '');
