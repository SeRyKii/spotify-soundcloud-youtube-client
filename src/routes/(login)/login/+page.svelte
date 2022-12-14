<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { globals, token } from '$lib/stores';
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';
	let disabled = true;

	let loading = false;

	async function login() {
		loading = true;

		const response = await fetch($globals.backendUrl + '/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		const data = await response.json();

		if (data.error) {
			toastStore.trigger({
				message: data.error,
				timeout: 3000,
				autohide: true,
				classes: 'bg-warning-500'
			});
		} else if (data.token) {
			$token = data.token;
			toastStore.trigger({
				message: 'Successfully logged in'
			});
			setTimeout(() => {
				goto('/home');
			}, 3000);
		}

		loading = false;
	}

	function validate() {
		if (username.length > 0 || password.length > 0) {
			disabled = false;
		} else {
			disabled = true;
		}
	}
	validate();

	$: username, password, validate();
</script>

<div class="flex flex-col items-center dark:text-white text-black">
	<div
		class="dark:bg-surface-800 bg-surface-200 p-3 flex-col flex gap-3 justify-start w-64 sm:w-1/3 mt-12 relative"
	>
		{#if loading == true}
			<div
				class="backdrop-brightness-50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10"
			>
				<div class="w-32 h-32">
					<ProgressRadial>Logging you in</ProgressRadial>
				</div>
			</div>
		{/if}
		<label for="name">
			<span class="text-sm">Username</span>
			<input
				type="text"
				id="name"
				placeholder="Username"
				bind:value={username}
				on:keyup={(e) => {
					if (e.key == 'Enter') {
						login();
					}
				}}
				required
			/>
		</label>
		<label for="password">
			<span class="text-sm">Password</span>
			<input
				type="password"
				id="password"
				placeholder="Password"
				bind:value={password}
				on:keyup={(e) => {
					if (e.key == 'Enter') {
						login();
					}
				}}
				required
			/>
		</label>
		<a href="/register" class="text-xs w-full text-left ">Don't have an account?</a>
		<button class="btn btn-filled-primary w-full" {disabled} on:click={login}>Login!</button>
	</div>
</div>
