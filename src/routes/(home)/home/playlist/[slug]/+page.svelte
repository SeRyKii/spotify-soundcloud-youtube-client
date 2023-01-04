<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { Divider } from '@skeletonlabs/skeleton';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { getTrackBulkDetails } from '$lib/services';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { globals, token } from '$lib/stores';
	import { playlistView } from '$lib/api/playlist';
	import { faPlay } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Track from '$lib/components/Track.svelte';
	import TrackPlaceholder from '$lib/components/TrackPlaceholder.svelte';

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};
	let result: Promise<DbPlaylistView>;
	function load() {
		const getPlaylist = async () => {
			return await playlistView(data.slug || '0', $token, $globals.backendUrl);
		};

		result = getPlaylist();
	}
	// Workaround for changing the slug while in playlistview doesnt trigger re-initialization of this pagw
	$: data.slug, load();
</script>

<div class="ml-12 mt-5 flex flex-col gap-5 w-3/4">
	<div class="flex flex-row gap-5 items-center">
		<div>
			{#await result}
				<div class="placeholder w-64 h-64 animate-pulse" />
			{:then playlist}
				<div>
					<Avatar
						src={playlist.meta.cover}
						width="w-64"
						initials={getInitials(playlist.meta.name)}
						rounded="rounded-md"
					/>
				</div>
			{/await}
		</div>
		<div class="flex flex-col gap-2">
			{#await result}
				<div class="placeholder w-64 mt-1 h-9 animate-pulse" />
				<div class="flex flex-row gap-1 items-center">
					<div class="w-8 h-8 placeholder-circle animate-pulse" />
					<div class="placeholder w-16 h-4 animate-pulse" />
				</div>
			{:then playlist}
				<div>
					<h1 class="text-4xl font-bold">{playlist.meta.name}</h1>
				</div>
				<div class="flex flex-row gap-1 items-center">
					<Avatar
						src={playlist.meta.avatar}
						width="w-8"
						initials={getInitials(playlist.meta.username)}
						border="border-2 dark:border-gray-800 border-gray-200"
					/>
					<p class="text-sm mt--1">{playlist.meta.username}</p>
				</div>
			{/await}
		</div>
		<div class="w-full flex flex-row justify-end">
			<button class="btn-icon btn-filled-primary w-16 flex items-center justify-center pl-6"
				><Fa icon={faPlay} size="2x" /></button
			>
		</div>
	</div>
	<Divider />
	<div class="flex flex-col gap-2">
		{#await result}
			{#each Array(10) as _, i}
				<TrackPlaceholder />
			{/each}
		{:then playlist}
			{#each playlist.tracks as track, i}
				<Track {track} />
			{/each}
		{/await}
	</div>
</div>
