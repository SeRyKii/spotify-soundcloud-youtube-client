<script lang="ts">
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';
	import { globals, theme, customTheme } from '$lib/stores';
	import { themes } from '$lib/themes';
	import { onMount } from 'svelte';
	onMount(() => {
		let customCss = '';
		theme.subscribe((theme) => {
			if (theme >= 0) {
				let style =
					(document.getElementById('themeStyle') as HTMLStyleElement) ||
					document.createElement('style');
				style.innerHTML = '';
				const link =
					(document.getElementById('themeLink') as HTMLLinkElement) ||
					document.createElement('link');
				link.href = Object.values(themes)[theme];
			} else if (theme == -1) {
				const link = document.getElementById('themeLink') as HTMLLinkElement;
				link.href = '';
				const style =
					(document.getElementById('themeStyle') as HTMLStyleElement) ||
					document.createElement('style');
				style.innerHTML = customCss;
			}
		});
		customTheme.subscribe((css) => {
			customCss = css;
			const style =
				(document.getElementById('themeStyle') as HTMLStyleElement) ||
				document.createElement('style');
			style.innerHTML = css;
		});
	});
</script>

<Toast />
<slot />
<link id="themeLink" rel="stylesheet" href="/themes/theme-skeleton.css" />

<style id="themeStyle"></style>
