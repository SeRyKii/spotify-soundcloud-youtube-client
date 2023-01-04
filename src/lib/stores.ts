import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const token: Writable<string> = localStorageStore('token', '');
export const globals: Writable<{
	backendUrl: string;
}> = localStorageStore('globals', {
	backendUrl: 'http://127.0.0.1:8000'
});
export const playlistListStore = writable<DbPlaylist[]>([]);

export const theme: Writable<number> = localStorageStore('theme', 0);
export const customTheme: Writable<string> = localStorageStore('custom_theme', '');

export const spotifyOAuth: Writable<spotifyOAuth> = localStorageStore(
	'spotify',
	{} as spotifyOAuth
);
export const spotifySaveToDb: Writable<boolean> = localStorageStore('spotify_save_to_db', false);
export const spotifyCodeVerifier: Writable<string> = localStorageStore('spotify_code_verifier', '');
export const spotifyPlayback: Writable<WebPlaybackState> = writable({} as WebPlaybackState);

export const spotifyInstance: Writable<WebPlaybackInstance> = writable({} as WebPlaybackInstance);
export const currentService: Writable<currentPlayer> = writable('spotify' as currentPlayer);
export const spotifyAction: Writable<SpotifyAction> = writable('none' as SpotifyAction);
export const volume: Writable<volume> = localStorageStore('volume', 0.5);
