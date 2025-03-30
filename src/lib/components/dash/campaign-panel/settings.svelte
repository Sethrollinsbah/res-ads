<script lang="ts">
	import Button from '../../ui/button/button.svelte';
	import { settingsPanel } from '$lib';
</script>

{#if $settingsPanel.type === 'campaign'}
	Setting Campaign layout here
{:else if $settingsPanel.type === 'platform'}
	Setting Platform Campaign layout here
{:else if $settingsPanel.type === 'table'}
	Setting Table layout here
{/if}<!-- Delete Service  -->
<p class="text-sm text-destructive">
	<b> Delete Service </b>
	<br />
	Deleting this service will permanently delete all its deployments and remove it from this environment.
	This cannot be undone.
	<br />
	<br />
</p>
<Button variant="destructive">Delete Component</Button>

