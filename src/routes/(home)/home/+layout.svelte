<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { faHome, faPlus, faHeart, faBars } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { writable } from 'svelte/store';
	import { AppShell, AppBar, Drawer } from '@skeletonlabs/skeleton';
	// @ts-ignore
	import DeviceDetector from 'svelte-device-detector';

	const drawer = writable(false);
</script>

<AppShell>
	<div class="mb-1" slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<h1>My App</h1>
			</svelte:fragment>
			<h1>TEST</h1>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<button>Test</button>
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
		</div>
		<!-- button to open a drawer if mobile -->
		<div class="block sm:hidden">
			<button class="btn btn-ghost-primary p-5" on:click={() => drawer.set(true)}>
				<span><Fa icon={faBars} size="" /></span>
			</button>
		</div>
	</div>
	<div class="bock sm:hidden">
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

	<div class="">
		<slot />
	</div>
	<svelte:fragment slot="footer">
		<h1>Footer</h1>
	</svelte:fragment>
</AppShell>
