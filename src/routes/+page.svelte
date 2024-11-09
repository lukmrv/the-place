<script lang="ts">
	import Grid from '../features/grid/components/Grid.svelte';
	import Modal from '../components/Modal.svelte';
	import PatternRecorderBoard from '../features/grid/components/PatternRecorderBoard.svelte';
	import Button from '../components/Button.svelte';

	let patternRecorderDialog = $state<HTMLDialogElement | undefined>();
</script>

<svelte:head>
	<title>Pixity</title>
	<meta name="description" content="r/the-place pixel art clone" />
</svelte:head>

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
