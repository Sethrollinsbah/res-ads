<script lang="ts">
	import { settingsPanel } from '$lib';
</script>

{#if $settingsPanel.type === 'campaign'}
	Overview Campaign layout here
{:else if $settingsPanel.type === 'platform'}
	Overview Platform Campaign layout here
{:else if $settingsPanel.type === 'table'}
	Overview Table layout here
{/if}
