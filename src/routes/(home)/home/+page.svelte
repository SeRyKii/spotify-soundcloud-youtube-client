<script>
	import { playlistListStore } from '$lib/stores';
	import PlaylistCard from '$lib/PlaylistCard.svelte';
</script>

<h1>Hello world</h1>
<div class="flex flex-row flex-wrap gap-2">
	{#each $playlistListStore as playlist}
		<PlaylistCard {playlist} placeholder={false} />
	{/each}
</div>
