<script lang="ts">
	export let loading = false;
	export let type: 'button' | 'submit' = 'button';
	export let disabled = false;
</script>

<button {type} class="loading-button" disabled={disabled || loading} on:click>
	<span class:hidden={loading}>
		<slot />
	</span>

	{#if loading}
		<span class="loader" />
	{/if}
</button>

<style>
	.loading-button {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 120px;
		padding: 8px 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		font-family: inherit;
		transition: background-color 0.2s;
	}

	.loading-button:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.loading-button:hover:not(:disabled) {
		background: #f8f8f8;
	}

	.hidden {
		visibility: hidden;
	}

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
