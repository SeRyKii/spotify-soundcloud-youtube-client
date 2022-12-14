<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { token } from '$lib/stores';
	import * as service from '$lib/services';
	import * as util from '$lib/utils';

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};

	export let track: DbTrack | null;
	export const action = (track: DbTrack) => {};
</script>

<!-- Implement some kind of bulking the requests or smth -->
<div class="flex flex-row gap-2 items-cente hover:bg-surface-200 hover:dark:bg-surface-700">
	{#await service.getTrackBulkDetails([track?.track_id || 0], track?.service_type || Service.Spotify, $token)}
		<div class="flex flex-row gap-2 items-center">
			<div class="placeholder h-12 w-12 rounded-md" />
			<div class="flex flex-col gap-1 justify-center">
				<div class="placeholder w-24 h-4" />
				<div class="placeholder w-16 h-2" />
			</div>
			<div class="w-full flex flex-row justify-end gap-6">
				<div class="placeholder w-24 h-4" />
				<div class="placeholder w-12 h-4" />
			</div>
		</div>
	{:then meta}
		<Avatar
			width="w-12"
			rounded="rounded-md"
			src={meta[0].cover}
			initials={getInitials(meta[0].title || '')}
		/>
		<div class="flex flex-col gap-1 justify-center">
			<span class="text-md">{meta[0].title || 'Test title'}</span>
			<span class="text-xs">{meta[0].artists[0].name || 'Test artist'}</span>
		</div>
		<div class="w-full flex flex-row justify-end gap-6">
			<span class="text-md">{meta[0].album.title || 'Test album'}</span>
			<div class="text-md">{util.ms_to_time(meta[0].duration) || '5:10'}</div>
		</div>
	{/await}
</div>
