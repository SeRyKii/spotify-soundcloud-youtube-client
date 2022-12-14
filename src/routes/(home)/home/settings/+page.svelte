<script lang="ts">
	import {
		spotifyOAuth,
		spotifyCodeVerifier,
		token,
		globals,
		theme,
		customTheme
	} from '$lib/stores';
	import { page } from '$app/stores';
	import { GradientHeading, LightSwitch, Divider } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { themes } from '$lib/themes';
	let lastTheme = 0;
	let themeNumber = $theme;
	let customCss = '';
	if (themeNumber == -1) {
		updateCssField();
	} else {
		customCss = '';
	}

	$: themeNumber, updateCssField();

	function updateCssField() {
		if (themeNumber == -1) {
			if ($customTheme != '') {
				customCss = $customTheme;
			} else {
				fetch($page.url.origin + Object.values(themes)[lastTheme])
					.then((res) => res.text())
					.then((css) => {
						customCss = css;
					});
				customCss = '';
			}
		} else {
			fetch($page.url.origin + Object.values(themes)[themeNumber])
				.then((res) => res.text())
				.then((css) => {
					customCss = css;
				});
		}
		lastTheme = themeNumber;
		save();
	}

	function save() {
		customTheme.set(customCss);
		theme.set(-1);
	}
</script>

<div class="flex flex-col gap-2 ml-5 w-1/2">
	<GradientHeading tag="h1" from="bg-primary-100" to="bg-accent-700">Settings</GradientHeading>

	<h2 class="text-2xl mt-4">Lightmode</h2>
	<Divider />
	<LightSwitch />

	<h2 class="text-2xl mt-4">Theme</h2>
	<Divider />
	<select
		bind:value={themeNumber}
		on:change={() => {
			theme.set(themeNumber);
		}}
		name="theme"
	>
		{#each Object.keys(themes) as theme, i}
			<option value={i} selected={i === themeNumber}>{theme}</option>
		{/each}
		<option value={-1} selected={-1 === themeNumber}>Custom</option>
	</select>
	<textarea name="customCss" bind:value={customCss} cols="50" rows="10" />
	<button class="btn btn-ghost-primary" on:click={save}>Save!</button>
</div>
