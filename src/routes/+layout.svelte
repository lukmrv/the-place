<script lang="ts">
	import '../global.css';
	import Button from '../components/Button.svelte';
	import { signIn, signOut } from '../features/auth/service';

	let { children, data } = $props();
</script>

<div>
	<header class="flex items-center justify-center">
		<nav class="absolute right-1/2 top-4 z-20 flex translate-x-1/2 items-center justify-center">
			{#await data.user}
				<Button onclick={() => null}>........</Button>
			{:then user}
				{#if user?.id}
					<Button onclick={signOut}>Logout</Button>
				{:else}
					<Button onclick={signIn}>Login</Button>
				{/if}
			{/await}
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>
