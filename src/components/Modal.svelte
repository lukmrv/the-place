<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';

	let {
		dialog = $bindable(),
		header,
		children
	}: {
		dialog?: HTMLDialogElement;
		header?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	class="max-h-[90vh] max-w-[90vw]"
	bind:this={dialog}
	onclose={() => dialog?.close()}
	onclick={(e) => {
		if (e.target === dialog) dialog?.close();
	}}
>
	<div>
		<div
			class="border-b-1 flex flex-col items-center justify-center border-b-gray-200 p-4 text-center"
		>
			{@render header?.()}
		</div>

		<div class="flex flex-col items-center justify-center">
			{@render children?.()}
		</div>

		<!-- svelte-ignore a11y_autofocus -->
		<button
			class="absolute right-0 top-0 flex h-14 w-10 items-center justify-center bg-gray-100 text-[36px] text-gray-400"
			onclick={() => dialog?.close()}
		>
			&times;
		</button>
	</div>
</dialog>

<style>
	dialog {
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
