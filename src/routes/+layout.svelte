<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user';
	import '../global.css';

	$: if ($page.data.user) {
		user.set($page.data.user);
	} else {
		user.set(null);
	}
</script>

<slot />
