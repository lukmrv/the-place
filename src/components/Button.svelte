<script lang="ts">
	// TODO - refactor this button component
	import { onMount, type Snippet } from 'svelte';

	import { onDestroy } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type ButtonProps = {
		children: Snippet;
	} & HTMLButtonAttributes;

	let { children, class: className, ...rest }: ButtonProps = $props();

	let isPressed = false;
	let pressProgress = 0;
	let animationFrame: number;
	let buttonElement: HTMLButtonElement;

	function handleMouseDown() {
		isPressed = true;
		cancelAnimationFrame(animationFrame);
		animate();
	}

	function handleMouseUp() {
		isPressed = false;
		cancelAnimationFrame(animationFrame);
		animate();
	}

	function animate() {
		const targetProgress = isPressed ? 1 : 0;
		const speed = isPressed ? 0.2 : 0.1;

		pressProgress += (targetProgress - pressProgress) * speed;

		if (Math.abs(targetProgress - pressProgress) > 0.01) {
			animationFrame = requestAnimationFrame(animate);
		} else {
			pressProgress = targetProgress;
		}

		updateShadows();
	}

	function updateShadows() {
		if (!buttonElement) return;

		// Initial shadow offsets
		const shadowOffsets = [
			{ x: 0, y: 0, spread: 2, color: 'rgba(255, 0, 0, 1)' }, // Red
			{ x: 2, y: 2, spread: 1, color: 'rgba(255, 255, 255, 1)' }, // White
			{ x: 3, y: 3, spread: 2, color: 'rgba(0, 255, 0, 1)' }, // Green
			{ x: 5, y: 5, spread: 1, color: 'rgba(255, 255, 255, 1)' }, // White
			{ x: 6, y: 6, spread: 2, color: 'rgba(0, 0, 255, 1)' } // Blue
		];

		// Compress shadows based on press progress
		const shadows = shadowOffsets.map((shadow, index) => {
			const compression = pressProgress * (index + 1) * 1.2;
			const x = Math.max(0, shadow.x - compression);
			const y = Math.max(0, shadow.y - compression);
			return `${x}px ${y}px 0 ${shadow.spread}px ${shadow.color}`;
		});

		buttonElement.style.boxShadow = shadows.join(',');
		buttonElement.style.transform = `translate(${pressProgress * 6}px, ${pressProgress * 6}px)`;
	}

	onMount(() => {
		animate();
	});

	onDestroy(() => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	});
</script>

<button
	bind:this={buttonElement}
	class={twMerge(className || '', 'px-5 py-2.5')}
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
	{...rest}
>
	{@render children()}
</button>

<style>
	button {
		background-color: red;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
		border: none;
		cursor: pointer;
		transition: transform 0.1s ease-out;
		/* Default shadow state */
		box-shadow:
			0px 0px 0 2px rgba(255, 0, 0, 1),
			2px 2px 0 1px rgba(255, 255, 255, 1),
			3px 3px 0 2px rgba(0, 255, 0, 1),
			5px 5px 0 1px rgba(255, 255, 255, 1),
			6px 6px 0 2px rgba(0, 0, 255, 1);
	}
</style>
