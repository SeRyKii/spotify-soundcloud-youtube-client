<script lang="ts">
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import '../theme-original.css';
	import { Toast } from '@skeletonlabs/skeleton';
	import { globals, theme, customTheme } from '$lib/stores';
	import { themes } from '$lib/themes';
	import { onMount } from 'svelte';
	let themeLink = Object.values(themes)[$theme];

	$: themeLink = Object.values(themes)[$theme];
</script>

<Toast />
<slot />
<link id="themeLink" rel="stylesheet" href={themeLink} />
