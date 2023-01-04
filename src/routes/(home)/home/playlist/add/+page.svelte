<script lang="ts">
	import { ProgressRadial, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { globals, playlistListStore, token } from '$lib/stores';
	import { goto } from '$app/navigation';

	let name = '';
	let publicPlaylist = false;
	let loading = false;
	const createPlaylist = async () => {
		if (name === '') {
			const t: ToastSettings = {
				message: 'Name cannot be empty',
				autohide: true,
				timeout: 3000
			};
			toastStore.trigger(t);
			return;
		}
		loading = true;
		playlistListStore.update((list) => {
			list.push({
				id: 0,
				name: name.trim(),
				cover: '',
				public: publicPlaylist,
				user_id: 0,
				username: '',
				avatar: ''
			});
			return list;
		});
		const res = await fetch($globals.backendUrl + '/api/playlists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: $token
			},
			body: JSON.stringify({
				name: name.trim(),
				public: publicPlaylist
			})
		});

		if (res.ok) {
			const { id, err } = await res.json();
			if (err) {
				const t: ToastSettings = {
					message: err,
					autohide: true,
					timeout: 3000
				};
				toastStore.trigger(t);
				return;
			}
			const t: ToastSettings = {
				message: 'Playlist created',
				autohide: true,
				timeout: 3000
			};
			toastStore.trigger(t);

			setTimeout(() => {
				loading = false;
				goto(`/home/playlist/${id}`);
			}, 3000);
		}
	};
</script>

<div class="w-full ml-24">
	<div
		class="sm:w-3/4 w-64 flex flex-col gap-4 dark:bg-surface-800 bg-surface-200 p-5 overflow-hidden relative"
	>
		{#if loading == true}
			<div
				class="backdrop-brightness-50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10"
			>
				<div class="w-32 h-32">
					<ProgressRadial>Creating playlist</ProgressRadial>
				</div>
			</div>
		{/if}
		<label for="name">
			<span>Name</span>
			<input type="text" name="name" id="name" bind:value={name} placeholder="Name" />
		</label>
		<label for="public">
			<span class="mb-0">Public</span>
			<input type="checkbox" name="public" bind:checked={publicPlaylist} id="public" />
		</label>
		<button class="btn btn-filled-primary text-white" on:click={createPlaylist}>Create</button>
	</div>
</div>
