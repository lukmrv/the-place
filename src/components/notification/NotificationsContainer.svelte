<script lang="ts">
	import { notifications } from './notificationStore';
	import Notification from './Notification.svelte';

	let maxNotifications = 3; // Default max number of notifications
	// Derived store to limit the number of notifications
	let visibleNotifications = $derived($notifications.slice(-maxNotifications));
</script>

<div class="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
	{#each visibleNotifications as notification (notification.id)}
		<Notification {...notification} />
	{/each}
</div>
