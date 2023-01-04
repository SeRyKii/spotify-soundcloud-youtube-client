<script>
	// @ts-nocheck

	import { spotifyAction, spotifyInstance, spotifyOAuth, spotifyPlayback } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	// toasts
	import { toastStore } from '@skeletonlabs/skeleton';

	import { WebPlayback } from 'svelte-spotify-web-playback';
	import { PKCE } from './pkce';

	onMount(() => {
		const script = document.createElement('script');
		script.id = 'webSdk';
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

			spotifyAction.subscribe(async (action) => {
				if (action === 'play') {
					await player.resume();
				} else if (action === 'pause') {
					await player.pause();
				} else if (action === 'next') {
					await player.nextTrack();
				} else if (action === 'previous') {
					await player.previousTrack();
				} else if (action.startsWith('seek')) {
					const seek = action.split('seek:')[1];
					await player.seek(seek);
				} else if (action.startsWith('setVolume')) {
					const volume = action.split('setVolume:')[1];
					await player.setVolume(volume);
				} else if (action == 'togglePlay') {
					await player.togglePlay();
				} else if (action == 'disconnect') {
					player.disconnect();
					console.log('Disconnected');
				}
				spotifyAction.set('none');
			});
		};

		document.body.appendChild(script);
	});

	// onDestroy(() => {
	// 	spotifyAction.set('disconnect');
	// 	const script = document.getElementById('webSdk');
	// 	document.removeChild(script);
	// });
</script>
