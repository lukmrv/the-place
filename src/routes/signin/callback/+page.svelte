<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import LoadingButton from '../../../components/LoadingButton.svelte';

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		if (!code) {
			goto('/signin?error=no_code');
			return;
		}

		// Send the code to your backend
		fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code })
		})
			.then((response) => response.json())
			.then((data) => {
				// Store the token or handle the response
				if (data.token) {
					// You might want to store this in a cookie or localStorage
					localStorage.setItem('token', data.token);
					goto('/dashboard');
				} else {
					throw new Error('No token received');
				}
			})
			.catch((error) => {
				console.error('Authentication error:', error);
				goto('/signin?error=authentication_failed');
			});
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<LoadingButton loading={true}>Processing login...</LoadingButton>
</div>
