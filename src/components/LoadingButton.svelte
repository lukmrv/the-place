<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type LoadingButtonProps = {
		loading: boolean;
		children: Snippet;
	} & HTMLButtonAttributes;

	let { loading, children, ...rest }: LoadingButtonProps = $props();
</script>

<button
	class={twMerge('cursor-not-allowed', loading ? 'disabled:opacity-25' : '')}
	disabled={loading}
	{...rest}
>
	<span class:hidden={loading}>
		{@render children()}
	</span>

	{#if loading}
		<span class="loader"></span>
	{/if}
</button>

<style>
	.loader {
		position: absolute;
		width: 16px;
		height: 16px;
		border: 2px solid #ccc;
		border-top-color: #333;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
