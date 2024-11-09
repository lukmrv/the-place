<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext, onMount } from 'svelte';

	import { onDestroy } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type SizeType = 'sm' | 'md' | 'lg';

	type CommonProps = {
		size?: SizeType;
		tag?: 'a' | 'button' | 'label';
	};

	type AnchorProps = CommonProps &
		Omit<HTMLAnchorAttributes, 'type'> & {
			href?: string | undefined;
		};

	type ButtonProps = CommonProps &
		HTMLButtonAttributes & {
			disabled?: HTMLButtonAttributes['disabled'];
			type?: HTMLButtonAttributes['type'];
		};

	type $$Props = AnchorProps | ButtonProps;

	const group: SizeType = getContext('group');

	export let size: NonNullable<$$Props['size']> = group ? 'sm' : 'md';
	export let href: string | undefined = undefined;
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let tag: $$Props['tag'] = 'button';
	export let disabled: HTMLButtonAttributes['disabled'] = false;

	const sizeClasses: Record<SizeType, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-5 py-3 text-base'
	};

	let buttonClass: string;
	$: buttonClass = twMerge(
		'text-center font-medium',
		group ? 'focus-within:ring-2' : 'focus-within:ring-4',
		group && 'focus-within:z-10',
		group || 'focus-within:outline-none',
		'inline-flex items-center justify-center ' + sizeClasses[size],
		disabled && 'cursor-not-allowed opacity-50',
		$$props.class
	);

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
			{ x: 0, y: 0, spread: 2, color: 'red' },
			{ x: 2, y: 2, spread: 1, color: 'white' },
			{ x: 3, y: 3, spread: 2, color: 'green' },
			{ x: 5, y: 5, spread: 1, color: 'white' },
			{ x: 6, y: 6, spread: 2, color: 'blue' }
		];

		// Compress shadows based on press progress
		const shadows = shadowOffsets.map((shadow, index) => {
			const compression = pressProgress * (index * 1);
			const x = shadow.x - compression;
			const y = shadow.y - compression;
			return `${x}px ${y}px 0 ${shadow.spread}px ${shadow.color}`;
		});

		buttonElement.style.boxShadow = shadows.join(',');
		buttonElement.style.transform = `translate(${pressProgress * 3}px, ${pressProgress * 3}px)`;
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

{#if href && !disabled}
	<a
		{href}
		{...$$restProps}
		class={buttonClass}
		role="button"
		on:click
		on:change
		on:keydown
		on:keyup
		on:touchstart|passive
		on:touchend
		on:touchcancel
		on:mouseenter
		on:mouseleave
	>
		<slot />
	</a>
{:else if tag === 'label'}
	<label {...$$restProps} class={buttonClass}>
		<slot />
	</label>
{:else if tag === 'button'}
	<button
		bind:this={buttonElement}
		{type}
		{...$$restProps}
		{disabled}
		class={buttonClass}
		on:mousedown={handleMouseDown}
		on:mouseup={handleMouseUp}
		on:mouseleave={handleMouseUp}
		on:click
		on:change
		on:keydown
		on:keyup
		on:touchstart|passive
		on:touchend
		on:touchcancel
		on:mouseenter
		on:mouseleave
	>
		<slot />
	</button>
{:else}
	<svelte:element this={tag} {...$$restProps} class={buttonClass}>
		<slot />
	</svelte:element>
{/if}

<style>
	button {
		background-color: red;
		color: white;
		font-weight: bold;
		text-transform: uppercase;

		box-shadow:
			0px 0px 0 2px red,
			0px 0px 0 0px transparent,
			0px 0px 0 0px transparent,
			0px 0px 0 0px transparent,
			0px 0px 0 0px transparent;
		transform: translate(0, 0);
		transition: transform 0.1s ease;
	}

	button:hover {
		animation: shadow-appear 0.1s forwards;
	}
</style>
