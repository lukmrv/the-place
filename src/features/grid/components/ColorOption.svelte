<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let {
		size = 'lg',
		color,
		selected,
		onclick
	}: { size?: 'sm' | 'lg'; color: number[]; selected: boolean; onclick: () => void } = $props();

	const sizeClass = {
		sm: 'h-6 w-6',
		lg: 'h-8 w-8'
	};
</script>

<button
	{onclick}
	aria-label={`Color ${color}`}
	class:border-gray-600={selected}
	class={twMerge('border-2 border-gray-200', sizeClass[size])}
	style="background-color: rgba({color[0]}, {color[1]}, {color[2]}, {color[3]})"
></button>
