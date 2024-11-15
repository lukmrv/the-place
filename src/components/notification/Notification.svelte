<script lang="ts">
	import { fly } from 'svelte/transition';
	import { notifications, type NotificationType } from './notification-store';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let id: string;
	export let type: NotificationType;
	export let message: string;
	export let duration: number = 3000;

	const colors = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		info: 'bg-blue-500',
		warning: 'bg-yellow-500'
	};

	const progressColors = {
		success: 'bg-green-300',
		error: 'bg-red-300',
		info: 'bg-blue-300',
		warning: 'bg-yellow-300'
	};

	let progress = 100;
	let progressInterval: ReturnType<typeof setInterval>;

	onMount(() => {
		if (duration !== Infinity) {
			const startTime = Date.now();
			const endTime = startTime + duration;

			progressInterval = setInterval(() => {
				const now = Date.now();
				progress = ((endTime - now) / duration) * 100;

				if (progress <= 0) {
					clearInterval(progressInterval);
				}
			}, 100);

			return () => {
				clearInterval(progressInterval);
			};
		}
	});

	function remove() {
		clearInterval(progressInterval);
		notifications.remove(id);
	}
</script>

<button
	class={twMerge(
		'relative min-w-[120px] cursor-pointer overflow-hidden p-4 pr-6 font-bold text-white shadow-lg',
		colors[type]
	)}
	onclick={remove}
	transition:fly={{ x: -300, duration: 300 }}
>
	<div class="flex items-center gap-2">
		{#if type === 'success'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		{:else if type === 'error'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		{:else if type === 'info'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		{:else if type === 'warning'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		{/if}
		<span>{message}</span>
	</div>

	{#if duration !== Infinity}
		<div
			class="absolute bottom-0 left-0 h-full opacity-50 {progressColors[type]}"
			style="width: {progress}%; transition: width 100ms linear;"
		>
			&nbsp;
		</div>
	{/if}
</button>
