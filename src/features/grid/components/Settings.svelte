<script lang="ts">
	import { patternsStore } from '../../../stores/patterns-store';
	import type { ResponseGridPatternCoordinate } from '../../patterns/types';
	import type { InsertMode } from '../types';

	const patterns = patternsStore.get();

	let {
		selectedMode = $bindable(),
		showCursorPosition = $bindable(),
		selectedPattern = $bindable(),
		mainGridSettingsDialog
	}: {
		showCursorPosition: boolean;
		selectedPattern: Record<string, ResponseGridPatternCoordinate[]> | null;
		selectedMode: InsertMode;
		mainGridSettingsDialog: HTMLDialogElement | undefined;
	} = $props();

	const handleSelectChange = (event: Event, type: InsertMode) => {
		const target = event.target as HTMLSelectElement;
		const value = target.value;

		if (!value) {
			selectedPattern = null;
			return;
		}

		const patternData = type === 'letter' ? patterns.alphabet[value] : patterns.patterns[value];
		if (patternData) {
			selectedPattern = { [value]: patternData };
		}

		mainGridSettingsDialog?.close();
	};

	const handleModeChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value !== 'pixel') {
			selectedPattern = null;
			showCursorPosition = false;
		}
		if (target.value !== 'pixel') {
			selectedPattern = null;
			showCursorPosition = false;
		}
	};
</script>

<div class="min-h-70 flex w-80 flex-1 flex-col items-start justify-center gap-4 bg-gray-100 p-8">
	<div class="flex w-full flex-col gap-4">
		<div class="text-sm font-medium">Select Mode:</div>
		<fieldset class="flex flex-col gap-2">
			<label class="flex gap-2 text-sm">
				<input
					type="radio"
					name="mode"
					value="pixel"
					bind:group={selectedMode}
					onchange={handleModeChange}
				/>
				Pixel
			</label>
			<label class="flex gap-2 text-sm">
				<input
					type="radio"
					name="mode"
					value="letter"
					bind:group={selectedMode}
					onchange={handleModeChange}
				/>
				Letter
			</label>
			<label class="flex gap-2 text-sm">
				<input
					type="radio"
					name="mode"
					value="pattern"
					bind:group={selectedMode}
					onchange={handleModeChange}
				/>
				Pattern
			</label>
		</fieldset>

		{#if selectedMode === 'pixel'}
			<label class="flex gap-2 text-sm">
				<input type="checkbox" bind:checked={showCursorPosition} />
				Show pixel position
			</label>
		{/if}

		{#if selectedMode === 'letter'}
			<label class="flex w-full flex-col gap-2">
				Select Letter
				<select
					onchange={(e) => handleSelectChange(e, 'letter')}
					class="w-full border border-gray-300 p-2 text-sm"
					value={selectedPattern ? Object.keys(selectedPattern)[0] : ''}
				>
					{#each Object.keys(patterns.alphabet) as letter}
						<option
							value={letter}
							selected={selectedPattern ? Object.keys(selectedPattern)[0] === letter : false}
						>
							{letter}
						</option>
					{/each}
				</select>
				<div class="text-xs text-gray-500">letters can change colors!</div>
			</label>
		{/if}

		{#if selectedMode === 'pattern'}
			<label class="flex w-full flex-col gap-2">
				Select Pattern
				<select
					onchange={(e) => handleSelectChange(e, 'pattern')}
					class="w-full border border-gray-300 p-2 text-sm"
					value={selectedPattern ? Object.keys(selectedPattern)[0] : ''}
				>
					{#each Object.keys(patterns.patterns) as pattern}
						<option
							value={pattern}
							selected={selectedPattern ? Object.keys(selectedPattern)[0] === pattern : false}
						>
							{pattern}
						</option>
					{/each}
				</select>
			</label>
		{/if}
	</div>
</div>

<button
	class="flex h-10 w-full items-center justify-center bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 active:bg-gray-800"
	onclick={() => {
		if (!selectedPattern) {
			selectedMode = 'pixel';
		}
		mainGridSettingsDialog?.close();
	}}
>
	CLOSE
</button>
