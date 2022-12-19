<script lang="ts">
	import { spotifyCodeVerifier, spotifyOAuth } from '$lib/stores';
	import { PKCE } from '$lib/pkce';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => {
		if ($page.url.href.includes('code')) {
			const pkce = new PKCE('http://localhost:5173/home/settings/spotify');
			pkce
				.getRefreshToken($page.url.searchParams.get('code') || '', $spotifyCodeVerifier)
				.then((token) => {
					spotifyOAuth.set({
						access_token: token.access_token || '',
						refresh_token: token.refresh_token || '',
						expires_in: token.expires_at || 0
					});
					goto('/home/settings');
				});
		} else {
			goto('/home');
		}
	});
	let dots: string = '';
	// 3 dots animation
	onMount(() => {
		setInterval(() => {
			if (dots === '...') {
				dots = '';
			} else {
				dots += '.';
			}
		}, 500);
	});
</script>

<h1>Connecting to Spotify{dots}</h1>
