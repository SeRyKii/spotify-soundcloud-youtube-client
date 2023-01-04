<script lang="ts">
	import Changer from './Changer.svelte';
	import { spotifyPlayback, spotifyInstance, spotifyAction } from '$lib/stores';
	import Fa from 'svelte-fa';
	import { ms_to_time } from '$lib/utils';
	import {
		faPlay,
		faPause,
		faStepForward,
		faStepBackward,
		faVolumeUp
		// shuffle and repeat icon
	} from '@fortawesome/free-solid-svg-icons';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	let pos = $spotifyPlayback.position || 0;
	let volume = 50;
	function togglePlay() {
		$spotifyAction = 'togglePlay';
	}

	async function setVolume() {
		$spotifyAction = `setVolume:${Math.floor(volume / 100)}`;
	}

	function nextTrack() {
		$spotifyAction = 'next';
	}

	function previousTrack() {
		$spotifyAction = 'previous';
	}

	function seek() {
		$spotifyAction = `seek:${pos}`;
	}

	// clock if not paused
	let interval: ReturnType<typeof setInterval>;
	interval = setInterval(() => {
		if (!$spotifyPlayback.paused) {
			pos += 100;
		} else {
			return;
		}
	}, 100);
</script>

<div class="grid grid-cols-3 grid-rows-1 grid-flow-col">
	<div class=" col-span-1 flex flex-row items-center px-4 gap-5">
		<div>
			<img
				src={$spotifyPlayback.track_window?.current_track?.album?.images[0]?.url}
				alt="album art"
				class="w-32"
			/>
		</div>
		<div>
			<h1 class="text-xl">{$spotifyPlayback.track_window?.current_track?.name}</h1>
			<h2 class="text-sm text-gray-400">
				{$spotifyPlayback.track_window?.current_track?.artists.map((v) => v.name).join(', ')}
			</h2>
		</div>
	</div>
	<div class="col-span-1 flex flex-row items-center justify-center">
		<div class="flex flex-row gap-2">
			<!-- shuffle -->
			<button class="w-8" on:click={previousTrack}>
				<Fa icon={faStepBackward} size="3x" />
			</button>
			{#if !$spotifyPlayback.paused}
				<button class="w-8" on:click={togglePlay}>
					<Fa icon={faPause} size="3x" />
				</button>
			{:else}
				<button class="w-8" on:click={togglePlay}>
					<Fa icon={faPlay} size="3x" />
				</button>
			{/if}
			<button class="w-8" on:click={nextTrack}>
				<Fa icon={faStepForward} size="3x" />
			</button>
			<!-- repeat -->
		</div>
	</div>
	<div class="col-span-1">test</div>
</div>
<div class="flex flex-col gap-0">
	<div class="flex flex-row w-full justify-between mb--2">
		<span>{ms_to_time(pos)}</span>
		<span>{ms_to_time($spotifyPlayback.duration)}</span>
	</div>
	<RangeSlider bind:value={pos} min={0} max={$spotifyPlayback.duration} on:change={seek} />
</div>
