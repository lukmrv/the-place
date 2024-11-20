<script lang="ts">
	import { notifications } from './notification-store';
	import Notification from './Notification.svelte';

	let { maxNotifications }: { maxNotifications: number } = $props();

	let visibleNotifications = $derived($notifications.slice(-maxNotifications));
</script>

<div class="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
	{#each visibleNotifications as notification (notification.id)}
		<Notification {...notification} />
	{/each}
</div>
