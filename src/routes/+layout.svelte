<script lang="ts">
	import '../global.css';
	import LoginButton from '../components/LoadingButton.svelte';
	import { user } from '../features/user/store';

	let { children, data } = $props();

	$user = data.user;

	console.log('layout', $user);
</script>

<div>
	<header class="flex items-center justify-center">
		<nav>
			{#if $user}
				<LoginButton>Logout</LoginButton>
			{:else}
				<LoginButton>Login</LoginButton>
			{/if}
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>
