<script lang="ts">
	// TODO: currently signout happens outlide of API flow -> add to API flow
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		await goto('/', { invalidateAll: true });
	});
</script>
