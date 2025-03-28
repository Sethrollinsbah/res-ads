<script lang="ts">
	import { Svelvet, Node, Edge } from 'svelvet';
	import { onMount, createEventDispatcher } from 'svelte';
	import FunnelNode from './funnel-node.svelte';
	import { defaultFunnelSteps, updateMetricsForBudget } from './funnel-data';
	import type { FunnelStep, FunnelEdge } from '../dashboard-types';

	const dispatch = createEventDispatcher();

	// Define props interface
	interface FunnelVisualizationProps {
		budget?: number;
		funnelSteps?: FunnelStep[];
		highlightedPlan?: string;
	}

	// Props with Svelte 5 syntax
	let {
		budget = 750,
		funnelSteps = defaultFunnelSteps,
		highlightedPlan = ''
	} = $props() as FunnelVisualizationProps;

	// Reactive state
	let edges = $state<FunnelEdge[]>([]);
	let canvas: any; // Svelvet canvas reference

	// Dummy data for Svelvet (simple example nodes)
	const dummyNodes = $state([
		{ id: 'node1', x: 100, y: 100, label: 'Node 1' },
		{ id: 'node2', x: 300, y: 100, label: 'Node 2' },
		{ id: 'node3', x: 200, y: 250, label: 'Node 3' }
	]);

	const dummyEdges = $state([
		{ id: 'edge1', source: 'node1', target: 'node2' },
		{ id: 'edge2', source: 'node1', target: 'node3' },
		{ id: 'edge3', source: 'node2', target: 'node3' }
	]);

	// When funnelSteps change, update edges - using $effect instead of reactive block
	$effect(() => {
		edges = [];
		funnelSteps.forEach((step) => {
			step.targets.forEach((targetId) => {
				edges.push({
					id: `${step.id}-${targetId}`,
					source: step.id,
					target: targetId,
					animated: true,
					label: '',
					color: step.color
				});
			});
		});
	});

	// Update metrics when budget changes - using $effect instead of reactive block
	$effect(() => {
		if (budget) {
			funnelSteps = updateMetricsForBudget(funnelSteps, budget);
		}
	});

	// Reset funnel to defaults
	function resetFunnel() {
		funnelSteps = defaultFunnelSteps;
		dispatch('reset');
	}

	// Update a specific node's metrics
	function updateNodeMetrics(nodeId: string, metrics: Record<string, string>) {
		funnelSteps = funnelSteps.map((step) => {
			if (step.id === nodeId) {
				return {
					...step,
					metrics: { ...step.metrics, ...metrics }
				};
			}
			return step;
		});
	}

	// Update a node's appearance (width, etc.)
	function updateNodeAppearance(nodeId: string, updates: Partial<FunnelStep>) {
		funnelSteps = funnelSteps.map((step) => {
			if (step.id === nodeId) {
				return { ...step, ...updates };
			}
			return step;
		});
	}
</script>

<div class="relative flex-1">
	<Svelvet bind:this={canvas} editable={false} background="#f9fafb" height="100%" width="100%">
		{#each funnelSteps as node}
			<Node
				id={node.id}
				x={node.x}
				y={node.y}
				width={node.width}
				height="auto"
				component={FunnelNode}
				data={node}
				noDefaultInteractions={true}
			/>
		{/each}

		{#each edges as edge}
			<Edge
				id={edge.id}
				source={edge.source}
				target={edge.target}
				animated={edge.animated}
				label={edge.label}
				sourceHandle="bottom"
				targetHandle="top"
				color={edge.color}
				type="smoothstep"
				thickness={2}
			/>
		{/each}
	</Svelvet>
</div>

<!-- Alternative Svelvet with dummy data for testing/development -->
<!--
<div class="relative flex-1">
  <Svelvet
    editable={true}
    background="#f9fafb"
    height="100%"
    width="100%"
  >
    {#each dummyNodes as node}
      <Node
        id={node.id}
        x={node.x}
        y={node.y}
        label={node.label}
      />
    {/each}

    {#each dummyEdges as edge}
      <Edge
        id={edge.id}
        source={edge.source}
        target={edge.target}
        animated={true}
        type="smoothstep"
        thickness={2}
      />
    {/each}
  </Svelvet>
</div>
-->
