<script lang="ts">
	import { mdiLogin } from '@mdi/js';
	import Icon from '$lib/Icon.svelte';
	import { goto } from '$app/navigation';
	import { token } from '$lib/stores';

	function redirectToLogin() {
		goto('/login');
	}

	function redirectToHome() {
		goto('/home');
	}

	if ($token != '') {
		redirectToHome();
	}
</script>

<div class="flex flex-col items-center">
	<div class="bg-surface-800 p-5 flex-col flex items-center max-w-[34rem] rounded-md mt-48">
		<h1 class="text-4xl font-heading-token text-white text-center">
			spotify-soundcloud-youtube-client
		</h1>

		<span class="text-xl font-heading-token text-white text-center"
			>This is a SvelteKit project. Thats main focus is to integrate spotify, soundcloud and
			youtubeinto one platform. While mimicking all of those playforms functionality if possible
		</span>

		<button class="btn btn-filled-primary text-white mt-5" on:click={redirectToLogin}>
			<span>
				<Icon path={mdiLogin} color="currentColor" />
			</span>
			<span>Go to sign in/up</span>
		</button>
	</div>
</div>
