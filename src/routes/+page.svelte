<script lang="ts">
	import Grid from '../features/grid/components/Grid.svelte';
	import Modal from '../components/Modal.svelte';
	import Button from '../components/Button.svelte';
	import { signIn, signOut } from '../features/auth/service';
	import PatternRecorderBoard from '../features/patterns/components/PatternRecorderBoard.svelte';
	import { userStore } from '../stores/user-store';
	import { generateWhiteUnit8ClampedArray } from '../features/grid/utils';

	// local state
	let patternRecorderDialog = $state<HTMLDialogElement | undefined>();
	// loader state
	let { data } = $props();
	// store state initialized in loader
	const user = userStore.get();

	const DEFAULT_GRID_SIZE = 200;
</script>

<svelte:head>
	<title>Pixity</title>
	<meta name="description" content="r/the-place pixel art clone" />
</svelte:head>

<header class="flex items-center justify-center">
	<nav class="absolute right-1/2 top-4 z-20 flex translate-x-1/2 items-center justify-center">
		{#if user?.id}
			<Button onclick={signOut}>Logout</Button>
		{:else}
			<Button onclick={signIn}>Login</Button>
		{/if}
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

	{#await data.gridState}
		<Grid
			gridState={{
				grid: { id: 1, width: DEFAULT_GRID_SIZE, height: DEFAULT_GRID_SIZE, cooldown_in_ms: 1000 },
				pixels: generateWhiteUnit8ClampedArray(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE)
			}}
		/>
	{:then gridState}
		{#if gridState}
			<Grid gridState={{ grid: gridState.grid, pixels: gridState.pixels }} />
		{:else}
			<div>Oops! Something went wrong.</div>
		{/if}
	{/await}
</div>
