<script lang="ts">
	import { spotifyOAuth, spotifyCodeVerifier, token, globals } from '$lib/stores';
	import { GradientHeading, LightSwitch, Divider } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let themes = {};
	let themePicked = 0;

    $: themePicked, () => {
        if (themePicked == 0) {
            return
        } else if (themePicked == 1) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (themePicked == 2) {
            document.documentElement.setAttribute('data-theme', 'system');
        }
    }
</script>

<div class="flex flex-col gap-2 ml-5 w-1/2">
	<GradientHeading tag="h1" from="bg-primary-100" to="bg-accent-700">Settings</GradientHeading>

	<h2 class="text-2xl mt-4">Lightmode</h2>
	<Divider />
	<LightSwitch />

	<h2 class="text-2xl mt-4">Theme</h2>
	<Divider />
</div>

<style>
</style>
