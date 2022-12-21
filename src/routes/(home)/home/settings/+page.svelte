<script lang="ts">
	import { spotifyOAuth, spotifyCodeVerifier, token, globals, spotifySaveToDb } from '$lib/stores';
	import { GradientHeading, LightSwitch, Divider } from '@skeletonlabs/skeleton';
	import { faSpotify, faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import { getUserInfo } from '$lib/api/user';
	import { onMount } from 'svelte';
	import { PKCE } from '$lib/pkce';
	import { goto } from '$app/navigation';
	const pkce = new PKCE($page.url.href);

	// Generate random string
	function generateRandomString(length: number) {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	function spotifyAuth() {
		let randomString = generateRandomString(64);
		pkce.generateChallenge(randomString).then((challenge) => {
			$spotifyCodeVerifier = randomString;
			goto(
				pkce.getURLWithSearchParams('https://accounts.spotify.com/authorize', {
					response_type: 'code',
					client_id: pkce.client_id,
					scope: 'user-read-private user-read-playback-state user-read-currently-playing',
					code_challenge_method: 'S256',
					code_challenge: challenge,
					redirect_uri: 'http://localhost:5173/home/settings/spotify'
				})
			);
		});
	}

	function disconnectSpotify() {
		spotifyOAuth.set({
			access_token: '',
			refresh_token: '',
			expires_at: 0
		});
	}
</script>

<div class="flex flex-col gap-2 ml-5 w-11/12 sm:w-1/2">
	<GradientHeading tag="h1" from="bg-primary-100" to="bg-accent-700">Settings</GradientHeading>

	<h2 class="text-2xl mt-4">Lightmode</h2>
	<Divider />
	<LightSwitch />

	<h2 class="text-2xl mt-4">Theme</h2>
	<Divider />
	<h2>Connections</h2>
	<Divider />
	<div class="flex flex-row items-center gap-2 px-2 flex-wrap sm:flex-nowrap justify-center">
		<Fa icon={faSpotify} size="3x" />
		<span class="text-2xl">Spotify</span>

		<div class="w-full flex flex-row justify-end">
			<div class="hidden">
				<label for="saveToDb1" class="flex flex-row items-center gap-2 flex-grow sm:flex-grow-0">
					<input type="checkbox" bind:checked={$spotifySaveToDb} id="saveToDb1" name="saveToDb1" />
					<span class="w-32 flex mt-2 select-none">Save to database</span>
				</label>
			</div>
			{#if $spotifyOAuth.access_token != null && $spotifyOAuth.access_token != ''}
				<button class="btn btn-ghost-tertiary w-32" on:click={disconnectSpotify}>Disconnect</button>
			{:else}
				<button class="btn btn-filled-primary w-32" on:click={spotifyAuth}>Connect</button>
			{/if}
		</div>
	</div>
	<div class="flex flex-row items-center gap-2 px-2 flex-wrap sm:flex-nowrap justify-center">
		<Fa icon={faSoundcloud} size="3x" />
		<span class="text-2xl">Soundcloud</span>

		<div class="w-full flex flex-row justify-end">
			<label for="saveToDb2" class="flex flex-row items-center gap-2 flex-grow sm:flex-grow-0">
				<input type="checkbox" name="saveToDb2" />
				<span class="w-32 flex mt-2">Save to database</span>
			</label>
			<button class="btn btn-filled-primary w-32">Connect</button>
		</div>
	</div>
	<div class="flex flex-row items-center gap-2 px-2 flex-wrap sm:flex-nowrap justify-center">
		<Fa icon={faYoutube} size="3x" />
		<span class="text-2xl">Youtube</span>

		<div class="w-full flex flex-row justify-end">
			<label for="saveToDb3" class="flex flex-row items-center gap-2 flex-grow sm:flex-grow-0">
				<input type="checkbox" name="saveToDb3" />
				<span class="w-32 flex mt-2">Save to database</span>
			</label>
			<button class="btn btn-filled-primary w-32">Connect</button>
		</div>
	</div>
</div>
