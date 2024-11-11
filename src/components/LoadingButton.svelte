<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type LoadingButtonProps = {
		loading: boolean;
		children: Snippet;
	} & HTMLButtonAttributes;

	let { loading, children, class: className, ...rest }: LoadingButtonProps = $props();
</script>

<button
	class={twMerge(
		'min-w-[80px] border border-gray-300 bg-white px-5 py-2.5 hover:bg-gray-100',
		loading ? 'cursor-not-allowed disabled:opacity-25' : '',
		className || ''
	)}
	disabled={loading}
	{...rest}
>
	<span class:hidden={loading}>
		{@render children()}
	</span>

	{#if loading}
		<span class="flex items-center justify-center">
			&nbsp;
			<span class="loader"></span>
		</span>
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
