<script lang="ts">
	import { Divider, LightSwitch, menu } from '@skeletonlabs/skeleton';
	import { faHome, faPlus, faHeart, faBars, faMusic } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { writable } from 'svelte/store';
	import { AppShell, AppBar, Drawer, Avatar } from '@skeletonlabs/skeleton';
	import {
		token,
		globals,
		spotifyOAuth,
		spotifySaveToDb,
		currentService,
		playlistListStore
	} from '$lib/stores';
	// @ts-ignore
	import DeviceDetector from 'svelte-device-detector';
	import { getUserInfo } from '$lib/api/user';
	import { playlistList } from '$lib/api/playlist';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import SpotifyTokenRefresher from '$lib/SpotifyTokenRefresher.svelte';
	import SpotifyPlayer from '$lib/SpotifyPlayer.svelte';
	import Spotify from '$lib/players/Spotify.svelte';
	import Changer from '$lib/players/Changer.svelte';
	import { page } from '$app/stores';
	import { getInitials } from '$lib/utils';

	onMount(() => {
		if (!$token || $token.length === 0) {
			goto('/login');
		}
	});

	const drawer = writable(false);

	function logout() {
		$token = '';
		goto('/login');
	}
	let user = getUserInfo($token, $globals.backendUrl);

	user.catch((err) => {
		console.log(err);
		$token = '';
	});

	onMount(() => {
		if (!$token || $token.length === 0) {
			goto('/login');
		}
	});

	let playlist = playlistList($token, $globals.backendUrl).then((res) => {
		playlistListStore.set(res);
		return;
	});
	let unsubscriber: any;
	const update = (value: currentPlayer) => {
		let url = $page.url.href;
		if (url.includes('settings')) return;
		if (value == 'local') {
			url = url.replace('/spotify', '');
			url = url.replace('/youtube', '');
			url = url.replace('/soundcloud', '');
		} else if (value == 'spotify') {
			url = url.replace('/youtube', '');
			url = url.replace('/soundcloud', '');
			url = url.replace('/home', '/home/spotify');
		} else if (value == 'youtube') {
			url = url.replace('/spotify', '');
			url = url.replace('/soucndloud', '');
			url = url.replace('/home', '/home/youtube');
		} else if (value == 'soundcloud') {
			url = url.replace('/spotify', '');
			url = url.replace('/youtube', '');
			url = url.replace('/home', '/home/soundcloud');
		}
		//goto(url);
	};

	$: $page.url.href, update($currentService);
</script>

{#if $spotifyOAuth.access_token != '' || $spotifyOAuth.refresh_token != ''}
	<SpotifyTokenRefresher />
	<SpotifyPlayer />
{/if}
<AppShell>
	<div class="mb-1" slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<h1>My App</h1>
			</svelte:fragment>
			<h1>TEST</h1>
			<svelte:fragment slot="trail">
				<Changer />
				<span class="relative">
					<button use:menu={{ menu: 'account' }} class="flex flex-row gap-2 items-center">
						{#await user}
							<!-- use placeholder class -->
							<div class="placeholder-circle w-8 h-8 animate-pulse" />
							<div class="placeholder w-32 h-4 animate-pulse" />
						{:then user}
							<Avatar
								src={user.avatar}
								width="w-8"
								initials={getInitials(user.username)}
								rounded="rounded-full"
							/>
							<span>{user.username}</span>
							<!-- This shouldnt work -->
							<div class="hidden">
								{() => {
									if ($spotifySaveToDb === true) {
										spotifyOAuth.set({
											access_token: user.oauth_spotify,
											refresh_token: user.oauth_spotify_refresh,
											expires_at: parseInt(user.oauth_spotify_expires_at)
										});
									} else {
										return;
									}
								}}
							</div>
						{/await}
					</button>
					<!-- menu -->
					<div data-menu="account">
						<div class="bg-surface-100 dark:bg-surface-900 rounded-md shadow-md">
							<div class="flex flex-col gap-2 p-2">
								<a href="/home/profile" class="btn btn-ghost-primary w-full">Profile</a>
								<a href="/home/settings" class="btn btn-ghost-primary w-full">Settings</a>
								<button on:click={logout} class="btn btn-ghost-primary w-full">Logout</button>
							</div>
						</div>
					</div>
				</span>
			</svelte:fragment>
		</AppBar>
	</div>

	<div class="w-fit sm:w-64" slot="sidebarLeft">
		<div class="hidden sm:block">
			<!-- Home -->
			<div>
				<a
					href="/home"
					class="btn btn-ghost-primary w-full justify-start text-xl dark:bg-surface-900 bg-surface-100"
				>
					<span><Fa icon={faHome} translateY="0.05" size="xs" /></span>
					<span>Home</span>
				</a>
			</div>
			<div class="flex flex-row mt-1 gap-1">
				<!-- Add Playlist -->
				<a
					href="/home/playlist/add"
					class="btn btn-ghost-primary text-xl dark:bg-surface-900 bg-surface-100 flex-1 items-center justify-center w-14 sm:w-1/2"
				>
					<span><Fa icon={faPlus} size="" /></span>
				</a>
				<!-- Favorite playlist -->
				<a
					href="/favorite-playlist"
					class="btn btn-ghost-primary text-xl dark:bg-surface-900 bg-surface-100 flex-1 justify-center w-14 sm:1/2"
				>
					<span><Fa icon={faHeart} size="" /></span>
				</a>
			</div>
			<div class="my-2">
				<Divider />
			</div>
			<!-- Playlists -->
			<div class="mt-1">
				{#await playlist}
					<!-- use placeholder class -->
					<div class="placeholder-circle w-8 h-8 animate-pulse" />
					<div class="placeholder w-32 h-4 animate-pulse" />
				{:then}
					{#each $playlistListStore as playlist}
						<button
							on:click={() => {
								goto(`/home/playlist/${playlist.id}`);
							}}
							class="btn btn-ghost-primary w-full justify-start text-xl dark:bg-surface-900 bg-surface-100"
						>
							<Avatar
								src={playlist.cover}
								width="w-8"
								initials={getInitials(playlist.name)}
								rounded="rounded-md"
							/>
							<span>{playlist.name}</span>
						</button>
					{/each}
				{/await}
			</div>
			<!-- button to open a drawer if mobile -->
			<div class="block sm:hidden">
				<button class="btn btn-ghost-primary p-5" on:click={() => drawer.set(true)}>
					<span><Fa icon={faBars} size="" /></span>
				</button>
			</div>
		</div>
		<div class="block sm:hidden">
			<Drawer open={drawer} position="left">
				<a
					on:click={() => drawer.set(true)}
					class="btn btn-ghost-primary w-full justify-start text-xl dark:bg-surface-900 bg-surface-100"
					href="/home"
				>
					<span><Fa icon={faHome} translateY="0.05" size="xs" /></span>
					<span>Home</span>
				</a>
				<div class="flex flex-row mt-1 gap-1">
					<a
						class="btn btn-ghost-primary text-xl dark:bg-surface-900 bg-surface-100 flex-1 items-center justify-center"
						href="/home/playlist/add"
					>
						<span><Fa icon={faPlus} size="" /></span>
					</a>
					<a
						class="btn btn-ghost-primary text-xl dark:bg-surface-900 bg-surface-100 flex-1 justify-center"
						href="/favorite-playlist"
					>
						<span><Fa icon={faHeart} size="" /></span>
					</a>
				</div>
			</Drawer>
		</div>
	</div>
	<div class="">
		<slot />
	</div>
	<div slot="footer">
		{#if $currentService === 'spotify'}
			<Spotify />
		{/if}
	</div>
</AppShell>
