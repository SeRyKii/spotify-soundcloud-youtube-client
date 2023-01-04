<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getInitials } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let playlist: DbPlaylist;
	export let placeholder: boolean;
</script>

<button
	on:click={() => {
		if (!placeholder) {
			goto(`/home/playlist/${playlist.id}`);
		}
	}}
	class="w-48 h-28 p-4 rounded-md flex-row flex items-center  border-token border-primary-800 cursor-pointer"
>
	{#if placeholder}
		<div class="placeholder w-16 h-16 animate-pulse rounded-md" />
		<div class="placeholder h-4 w-8 animate-pulse" />
	{:else}
		<Avatar
			src={playlist.cover}
			width="w-16"
			initials={getInitials(playlist.name)}
			rounded="rounded-md"
		/>
		<span class="text-xl ml-5">{playlist.name}</span>
	{/if}
</button>
