<script>
	import {
		spotifyOAuth,
		spotifyCodeVerifier,
		token,
		globals,
		theme,
		customTheme
	} from '$lib/stores';
	import { page } from '$app/stores';
	import { GradientHeading, LightSwitch, Divider } from '@skeletonlabs/skeleton';
	// @ts-ignore
	import { faSpotify, faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import { getUserInfo } from '$lib/api/user';
	import { onMount } from 'svelte';
	import { themes } from '$lib/themes';
	import { PKCE } from '$lib/pkce';
	import { goto } from '$app/navigation';
	const pkce = new PKCE($page.url.href);
	
	let lastTheme = 0;
	let themeNumber = $theme;
	let customCss = '';
	if (themeNumber == -1) {
		updateCssField();
	} else {
		customCss = '';
	}

	$: themeNumber, updateCssField();

	function updateCssField() {
		if (themeNumber == -1) {
			if ($customTheme != '') {
				customCss = $customTheme;
			} else {
				fetch($page.url.origin + Object.values(themes)[lastTheme])
					.then((res) => res.text())
					.then((css) => {
						customCss = css;
					});
				customCss = '';
			}
		} else {
			fetch($page.url.origin + Object.values(themes)[themeNumber])
				.then((res) => res.text())
				.then((css) => {
					customCss = css;
				});
		}
		lastTheme = themeNumber;
		save();
	}

	function save() {
		customTheme.set(customCss);
		theme.set(-1);
	

	// Generate random string
	// @ts-ignore
	function generateRandomString(length) {
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
	<select
		bind:value={themeNumber}
		on:change={() => {
			theme.set(themeNumber);
		}}
		name="theme"
	>
		{#each Object.keys(themes) as theme, i}
			<option value={i} selected={i === themeNumber}>{theme}</option>
		{/each}
		<option value={-1} selected={-1 === themeNumber}>Custom</option>
	</select>
	<textarea name="customCss" bind:value={customCss} cols="50" rows="10" />
	<button class="btn btn-ghost-primary" on:click={save}>Save!</button>
	<h2>Connections</h2>
	<Divider />
	<div class="flex flex-row items-center gap-2 px-2 flex-wrap sm:flex-nowrap justify-center">
		<Fa icon={faSpotify} size="3x" />
		<span class="text-2xl">Spotify</span>

		<div class="w-full flex flex-row justify-end">
			<div class="hidden">
				<label for="saveToDb1" class="flex flex-row items-center gap-2 flex-grow sm:flex-grow-0">
					<input type="checkbox" id="saveToDb1" name="saveToDb1" />
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
