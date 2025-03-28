<script>
	import { onMount } from 'svelte';
	import ChatDash from '@/lib/components/dash/chat-dash.svelte';

	let error = null;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if error}
	<div class="rounded-lg bg-red-100 p-4 text-red-800">
		<h2>Error loading component:</h2>
		<pre>{error.message}</pre>
	</div>
{:else if mounted}
	<ChatDash />
{:else}
	<div>Loading...</div>
{/if}
