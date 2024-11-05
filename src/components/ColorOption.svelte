<script lang="ts">
	let { color, selected, onclick }: { color: number[]; selected: boolean; onclick: () => void } =
		$props();
</script>

<button
	{onclick}
	aria-label={`Color ${color}`}
	class:border-gray-600={selected}
	class="h-8 w-8 border-2 border-gray-200"
	style="background-color: rgba({color[0]}, {color[1]}, {color[2]}, {color[3]})"
></button>
