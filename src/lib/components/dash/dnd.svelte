<script lang="ts">
	import { Svelvet } from 'svelvet';
	import { onMount } from 'svelte';
	import ActivityPanel from './activity-panel.svelte';
	import CampaignPanel from './campaign-panel.svelte';
	import CreateButton from './create-button.svelte';

	import { nodes } from '@/lib';
	// Use $state to make these reactive
	let loaded = $state(false);
	let innerHeight = $state(0);
	let innerWidth = $state(0);
	let partialInnerHeight = $derived(innerHeight - 4 * 16);
	// Make sure components are only rendered after onMount

	onMount(() => {
		// Set a small timeout to ensure the DOM is fully ready
		setTimeout(() => {
			loaded = true;
		}, 100);
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />
{#if loaded}
	<Svelvet width={innerWidth} height={partialInnerHeight} fitView controls minimap>
		{#each $nodes as n}
			<svelte:component this={n.component} {...n.data} position={n.position} id={n.id} />
		{/each}
	</Svelvet>
{/if}

<ActivityPanel></ActivityPanel>
<CampaignPanel></CampaignPanel>
<CreateButton></CreateButton>
