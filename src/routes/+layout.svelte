<script lang="ts">
	import '../global.css';
	import NotificationsContainer from '../components/notification/NotificationsContainer.svelte';

	let { children } = $props();
</script>

<div>
	<main>
		<NotificationsContainer maxNotifications={5} />
		{@render children()}
	</main>
</div>
