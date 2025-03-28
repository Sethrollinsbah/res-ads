<script lang="ts">
	import type { FunnelStep } from '../dashboard-types';

	// Define the props interface
	interface FunnelNodeProps {
		data: FunnelStep;
	}

	// Use $props() for props in Svelte 5
	let { data } = $props() as FunnelNodeProps;

	// Get the icon component
	const IconComponent = data.icon;
</script>

<div
	class="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-3 shadow-md"
	style="width: {data.width}px"
>
	<div
		class="flex h-10 w-10 items-center justify-center rounded-full"
		style:background-color="{data.color}25"
	>
		{#if IconComponent}
			<IconComponent class="h-6 w-6" style="color: {data.color}" />
		{/if}
	</div>
	<div class="mt-1 text-center">
		<div class="text-sm font-bold">{data.name}</div>
		<div class="text-xs text-gray-500">{data.description}</div>

		<div class="mt-2 border-t border-gray-200 pt-1">
			{#each Object.entries(data.metrics) as [key, value]}
				<div class="flex items-center justify-between gap-2 text-xs">
					<span class="text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
					<span class="font-semibold">{value}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
