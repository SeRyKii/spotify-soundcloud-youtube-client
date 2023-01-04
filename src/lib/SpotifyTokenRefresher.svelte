<script lang="ts">
	import { spotifyOAuth } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import { PKCE } from '$lib/pkce';
	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		const pkce = new PKCE('http://localhost:5173/home/settings/spotify');
		interval = setInterval(() => {
			console.log('interval');
			if ($spotifyOAuth.expires_at < Math.floor(Date.now() / 1000)) {
				console.log('test');
				pkce
					.token($spotifyOAuth.refresh_token)
					.then((token) => {
						console.log(token);
						spotifyOAuth.set({
							access_token: token.access_token || '',
							refresh_token: token.refreshToken || '',
							expires_at: token.expires_at || 0
						});
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>
