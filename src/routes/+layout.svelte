<script lang="ts">
	import '../global.css';
	import LoginButton from '../components/LoadingButton.svelte';
	import { user } from '../features/user/store';

	let { children, data } = $props();

	let loading = $state(false);

	$user = data.user;

	const logout = async () => {
		loading = true;

		console.log('logout');

		setTimeout(() => {
			loading = false;
		}, 1000);
	};

	const login = () => {
		loading = true;

		console.log('login');

		setTimeout(() => {
			loading = false;
		}, 1000);
	};
</script>

<div>
	<header class="flex items-center justify-center">
		<nav>
			{#if $user}
				<LoginButton {loading} onclick={logout}>Logout</LoginButton>
			{:else}
				<LoginButton {loading} onclick={login}>Login</LoginButton>
			{/if}
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>
