<script>
	// @ts-nocheck

	import { spotifyInstance, spotifyOAuth, spotifyPlayback, spotifyPlayer } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	// toasts
	import { toastStore } from '@skeletonlabs/skeleton';

	import { WebPlayback } from 'svelte-spotify-web-playback';
	import { PKCE } from './pkce';

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';

		// @ts-ignore
		window.onSpotifyWebPlaybackSDKReady = () => {
			// @ts-ignore
			const player = new Spotify.Player({
				name: 'Svelte Web Player',
				getOAuthToken: (cb) => {
					cb($spotifyOAuth.access_token);
				}
			});

			// Error handling
			player.addListener('initialization_error', ({ message }) => {
				console.error(message);
				toastStore.trigger({
					message: 'Spotify Player: initialization_error',
					autohide: true,
					timeout: 3000
				});
			});

			player.addListener('authentication_error', ({ message }) => {
				console.error(message);
				toastStore.trigger({
					message: 'Spotify Player: authentication_error',
					autohide: true,
					timeout: 3000
				});
			});

			player.addListener('account_error', ({ message }) => {
				console.error(message);
				toastStore.trigger({
					message: 'Spotify Player: account_error',
					autohide: true,
					timeout: 3000
				});
			});

			player.addListener('playback_error', ({ message }) => {
				console.error(message);
				toastStore.trigger({
					message: 'Spotify Player: playback_error',
					autohide: true,
					timeout: 3000
				});
			});

			// Playback status updates
			player.addListener('player_state_changed', (state) => {
				console.log(state);
				spotifyPlayback.set(state);
			});

			// Ready
			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				spotifyInstance.set(device_id);
			});

			// Not Ready
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			// Connect to the player!

			player.connect();
			spotifyInstance.set(player); // dont know if this works
		};

		document.body.appendChild(script);
	});
</script>
