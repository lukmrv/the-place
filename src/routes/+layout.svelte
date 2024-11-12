<script lang="ts">
	import '../global.css';

	let { children } = $props();
</script>

<div>
	<main>
		{@render children()}
	</main>
</div>
