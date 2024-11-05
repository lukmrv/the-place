<script lang="ts">
	import { enhance } from '$app/forms';
	import Grid from '../components/Grid.svelte';
</script>

<svelte:head>
	<title>Pixity</title>
	<meta name="description" content="r/the-place pixel art clone" />
</svelte:head>

<div class="flex h-[100vh] w-full flex-col items-center justify-center">
	<Grid />
</div>
