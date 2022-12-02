<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	let pageNumber: Writable<number> = writable(1);

	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
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
	<svelte:fragment slot="sidebarLeft">
		<AppRail selected={pageNumber} height="h-fit">
			<AppRailTile label="Home" title="Home" value={1} />
			<AppRailTile label="test" title="TEST" value={2} />
		</AppRail>
	</svelte:fragment>
	<div class="">
		{$pageNumber}
		<slot />
	</div>
	<svelte:fragment slot="footer">
		<h1>Footer</h1>
	</svelte:fragment>
</AppShell>
