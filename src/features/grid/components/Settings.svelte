<script lang="ts">
	import { patterns } from '../patterns/index';

	let {
		showCursorPosition = $bindable(),
		selectedPattern = $bindable(),
		mainGridSettingsDialog
	}: {
		showCursorPosition: boolean;
		selectedPattern: string;
		mainGridSettingsDialog: HTMLDialogElement | undefined;
	} = $props();

	const isCheckboxDisabled = $derived(selectedPattern !== 'pixel');

	const handlePatternChange = (e: HTMLInputElement) => {
		console.log('e', e.value);
		if (e.value !== 'pixel') {
			showCursorPosition = false;
		}

		return e.value;
	};
</script>

<div class="min-h-70 flex w-80 flex-1 flex-col items-start justify-center gap-4 bg-gray-100 p-8">
	<label class:opacity-20={isCheckboxDisabled} class="flex gap-2 text-sm">
		<input type="checkbox" disabled={isCheckboxDisabled} bind:checked={showCursorPosition} />
		Show pixel position
	</label>

	<select
		bind:value={selectedPattern}
		onchange={(e) => handlePatternChange(e.target as HTMLInputElement)}
		class="w-full border border-gray-300 p-2 text-sm"
	>
		{#each Object.entries(patterns) as [patternName]}
			<option value={patternName}>
				{patternName}
			</option>
		{/each}
	</select>
</div>
<button
	class="flex h-10 w-full items-center justify-center bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 active:bg-gray-800"
	onclick={() => mainGridSettingsDialog?.close()}
>
	CLOSE
</button>
