<script lang="ts">
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { globals, token } from '$lib/stores';
	import { goto } from '$app/navigation';

	let name = '';
	let publicPlaylist = false;

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
				goto(`/home/playlist/${id}`);
			}, 3000);
		}
	};
</script>

<div class="w-full ml-24">
	<div
		class="sm:w-3/4 w-64 flex flex-col gap-4 dark:bg-surface-800 bg-surface-200 p-5 overflow-hidden"
	>
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
