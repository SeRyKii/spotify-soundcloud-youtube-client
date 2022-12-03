<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { globals, token } from '$lib/stores';
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';
	let confirmPassword = '';
	let disabled = true;
	let samePassword = true;

	let loading = false;

	async function register() {
		loading = true;

		if (password !== confirmPassword) {
			samePassword = false;
			loading = false;
			return;
		} else {
			const response: any = await fetch($globals.backendUrl + '/api/user/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password
				})
			}).catch((err) => {
				toastStore.trigger({
					message: 'An error occured',
					timeout: 3000,
					autohide: true,
					classes: 'bg-warning-500'
				});
				loading = false;
				return;
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
					message: 'Successfully registered in'
				});
				setTimeout(() => {
					goto('/login');
				}, 2000);
			}

			loading = false;
		}
	}

	function validate() {
		samePassword = true;
		if (username.length == 0 || password.length == 0 || confirmPassword.length == 0) {
			disabled = true;
		} else {
			disabled = false;
		}
	}

	$: username, password, confirmPassword, validate();
</script>

<div class="flex flex-col items-center">
	<div class="bg-surface-800 p-3 flex-col flex gap-3 justify-start w-64 sm:w-1/3 mt-12 relative">
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
			<span class="text-white text-sm">Username</span>
			<input
				type="text"
				id="name"
				placeholder="Username"
				bind:value={username}
				on:keyup={(e) => {
					if (e.key == 'Enter') {
						register();
					}
				}}
				required
			/>
		</label>
		<label for="password">
			<span class="text-white text-sm">Password</span>
			<input
				type="password"
				id="password"
				placeholder="Password"
				bind:value={password}
				on:keyup={(e) => {
					if (e.key == 'Enter') {
						register();
					}
				}}
				required
			/>
		</label>
		<label for="confirmPassword">
			<span class="text-white text-sm">Confirm Password</span>
			<input
				type="password"
				id="confirmPassword"
				placeholder={samePassword ? 'Confirm Password' : "Passwords don't match"}
				class={samePassword ? '' : 'input-invalid'}
				bind:value={confirmPassword}
				on:keyup={(e) => {
					if (e.key == 'Enter') {
						register();
					}
				}}
				required
			/>
			{#if samePassword == false}
				<span class="text-red-500 text-sm">Passwords don't match</span>
			{/if}
		</label>
		<a href="/login" class="text-xs text-surface-50 w-full text-left ">Already have an account?</a>
		<button class="btn btn-filled-primary w-full text-white" {disabled} on:click={register}
			>Register!</button
		>
	</div>
</div>
