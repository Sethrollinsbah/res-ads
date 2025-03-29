<script lang="ts">
	import { onMount } from 'svelte';
	import Dnd from './dnd.svelte';
	import * as Card from '$lib/components/ui/card';

	// Budget state
	let budget = $state(1000);
	let readOnly = $state(false);
	let showLabels = $state(true);
	let showValues = $state(true);
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">Marketing Funnel Visualization</h1>

	<!-- Controls -->
	<div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
		<h2 class="mb-4 text-lg font-semibold">Funnel Configuration</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div>
				<label class="mb-2 block text-sm font-medium text-gray-700">
					Budget: ${budget}
				</label>
				<input
					type="range"
					min="500"
					max="5000"
					step="100"
					bind:value={budget}
					class="w-full accent-blue-500"
				/>
				<p class="mt-1 text-xs text-gray-500">
					Adjust the budget to see how it affects the marketing funnel
				</p>
			</div>

			<div class="flex flex-col space-y-3">
				<label class="flex items-center">
					<input type="checkbox" bind:checked={readOnly} class="mr-2" />
					<span>Read-only mode (disables dragging)</span>
				</label>

				<label class="flex items-center">
					<input type="checkbox" bind:checked={showLabels} class="mr-2" />
					<span>Show labels and descriptions</span>
				</label>

				<label class="flex items-center">
					<input type="checkbox" bind:checked={showValues} class="mr-2" />
					<span>Show values and budget allocation</span>
				</label>
			</div>
		</div>
	</div>

	<!-- Funnel visualization -->
	<Card.Root class="mb-6">
		<Card.Header>
			<Card.Title>Interactive Marketing Funnel</Card.Title>
			<Card.Description>
				Drag nodes to reposition, scroll to zoom, and drag the canvas to pan
			</Card.Description>
		</Card.Header>
		<Card.Content class="p-6"></Card.Content>
	</Card.Root>

	{#if Dnd}
		<Dnd />
	{/if}
	<!-- Explanation -->
	<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-lg font-semibold">About This Visualization</h2>
		<p class="mb-4">
			This marketing funnel visualization uses pure Svelte drag-and-drop functionality without
			requiring any external libraries. It demonstrates:
		</p>

		<ul class="mb-4 list-disc space-y-1 pl-5">
			<li>Custom drag and drop implementation</li>
			<li>Canvas panning and zooming</li>
			<li>Dynamic path generation between nodes</li>
			<li>Budget-responsive metrics calculation</li>
			<li>Animated connection paths</li>
		</ul>

		<p class="text-sm text-gray-600">
			The implementation is lightweight and fully integrated with Svelte's reactivity system, making
			it easy to connect to your actual marketing data.
		</p>
	</div>
</div>
