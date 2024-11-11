<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.user}
	<div class="user-info">
		<h3>Logged In</h3>
		<p>User ID: {data.user.id}</p>
		<p>Email: {data.user.email}</p>
		<p>Name: {data.user.name}</p>

		<a href="/logout" class="logout-button">Log Out</a>
	</div>
{:else}
	<div class="login-prompt">
		<h3>Not logged in</h3>
		<p>Please sign in to continue</p>
	</div>
{/if}

<style>
	.user-info {
		padding: 1rem;
		border-radius: 8px;
		background: #f9f9f9;
		max-width: 400px;
		margin: 2rem auto;
	}

	.logout-button {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: #dc3545;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		margin-top: 1rem;
	}

	.login-prompt {
		text-align: center;
		margin: 2rem auto;
	}
</style>
