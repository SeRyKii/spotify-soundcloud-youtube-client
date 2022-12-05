<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { faSmileWink as fasSmileWink } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from 'fontawesome-svelte';
	import Icon from '$lib/Icon.svelte';

	let pageNumber: Writable<number> = writable(1);

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<h1>My App</h1>
			</svelte:fragment>
			<h1>TEST</h1>
			<svelte:fragment slot="trail">
				<button>Test</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="w-32 sm:w-64" slot="sidebarLeft">
		<div>
			<a href="/home" class="btn w-full justify-start text-xl">
				<span><Icon path={mdiHome} size="32px" /></span>
				<span>Test</span>
			</a>
		</div>
	</div>
	<div class="">
		{$pageNumber}
		<slot />
	</div>
	<svelte:fragment slot="footer">
		<h1>Footer</h1>
	</svelte:fragment>
</AppShell>
