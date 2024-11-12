<script lang="ts">
	import Grid from '../features/grid/components/Grid.svelte';
	import Modal from '../components/Modal.svelte';
	import PatternRecorderBoard from '../features/grid/components/PatternRecorderBoard.svelte';
	import Button from '../components/Button.svelte';
	import { signIn, signOut } from '../features/auth/service';

	let patternRecorderDialog = $state<HTMLDialogElement | undefined>();

	let { data } = $props();
</script>

<svelte:head>
	<title>Pixity</title>
	<meta name="description" content="r/the-place pixel art clone" />
</svelte:head>

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

<div class="flex h-[100vh] w-full flex-col items-center justify-center">
	<div class="absolute left-4 top-4 z-20">
		<Button onclick={() => patternRecorderDialog?.showModal()}>create pattern</Button>
	</div>

	<Modal bind:dialog={patternRecorderDialog}>
		{#snippet header()}Create pattern!{/snippet}

		<PatternRecorderBoard dialog={patternRecorderDialog} />
	</Modal>

	<Grid />
</div>
