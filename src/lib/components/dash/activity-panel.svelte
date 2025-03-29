<script lang="ts">
	import { ChevronUp, ChevronDown, CircleCheckBig } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let isOpen = $state(true);
	interface HistoryItem {
		project: String;
		action: String;
		time: number;
	}

	let history: HistoryItem[] = $state([]); // Store history as an array of strings

	function togglePanel() {
		isOpen = !isOpen;
	}

	function addToHistory(item: HistoryItem) {
		history = [...history, item];
		// Limit history length if needed
		if (history.length > 10) {
			history = history.slice(history.length - 10);
		}
	}

	// Example usage:
	onMount(() => {
		addToHistory({
			project: 'Bun',
			action: 'Deployed',
			time: new Date().getTime()
		});
		setTimeout(
			() =>
				addToHistory({
					project: 'Bun',
					action: 'Deployed',
					time: new Date().getTime()
				}),
			2000
		);
		setTimeout(
			() =>
				addToHistory({
					project: 'Bun',
					action: 'Deployed',
					time: new Date().getTime()
				}),
			4000
		);
	});
</script>

<div class="fixed bottom-0 right-4 z-10 w-80 rounded-t-lg bg-white shadow-lg ring-1 ring-black">
	<button class="flex w-full items-center justify-between p-4" onclick={togglePanel}>
		{isOpen ? 'Close History' : 'Open History'}
		{#if isOpen}
			<ChevronDown class="h-5 w-5" />
		{:else}
			<ChevronUp class="h-5 w-5" />
		{/if}
	</button>

	{#if isOpen}
		<div
			class="h-[70dvh] overflow-y-auto p-4"
			transition:fly={{ y: 50, duration: 300, easing: quintOut }}
		>
			<ul class="space-y-2">
				{#each history.reverse() as item}
					<li class="grid h-fit grid-cols-[32px_1fr] rounded bg-gray-100 p-2">
						<CircleCheckBig />
						<div class="flex flex-col justify-evenly">
							<h1 class="text-sm font-light">{item.project}</h1>
							<h1 class="text-sm font-light">{item.action}</h1>
							<h1 class="text-sm font-light">{item.time}</h1>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
