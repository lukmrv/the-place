<script lang="ts">
	import Button from '../../components/Button.svelte';
	import { signIn, signOut } from '../../features/auth/service.js';

	let { data } = $props();
</script>

{#await data.user then user}
	{#if user?.id}
		<div class="mx-auto max-w-2xl p-6">
			<h1 class="mb-6 text-2xl font-bold">Profile</h1>

			<div class="rounded-lg bg-white p-6 shadow">
				<div class="space-y-4">
					<div>
						<span class="block text-sm font-medium text-gray-700">Email</span>
						<p class="mt-1">{user.email}</p>
					</div>
					<div>
						<span class="block text-sm font-medium text-gray-700">Email</span>
						<p class="mt-1">{user.name}</p>
					</div>

					<div>
						<span class="block text-sm font-medium text-gray-700">User ID</span>
						<p class="mt-1">{user.id}</p>
					</div>

					<!-- Add more user fields as needed -->
				</div>
			</div>
			<br />
			<Button onclick={() => signOut()}>Sign out</Button>
		</div>
	{:else}
		<div class="mx-auto flex max-w-2xl justify-center p-6">
			<Button onclick={() => signIn()}>Sign in</Button>
		</div>
	{/if}
{/await}
