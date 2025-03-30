<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { settingsPanel } from '@/lib';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Overview from './campaign-panel/overview.svelte';
	import Settings from './campaign-panel/settings.svelte';
	import { onMount } from 'svelte';

	const campPanel = [
		{
			name: 'Overview',
			code: 'overview'
		},
		{
			name: 'Settings',
			code: 'settings'
		}
	];

	// Add state to track screen size
	let isMdOrLarger = $state(false);

	// Function to check screen size
	function checkScreenSize() {
		const mdBreakpoint = 768; // Standard Tailwind md breakpoint
		isMdOrLarger = window.innerWidth >= mdBreakpoint;
	}

	onMount(() => {
		// Initial check
		checkScreenSize();

		// Add resize listener
		window.addEventListener('resize', checkScreenSize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});
</script>

<svelte:window on:resize={checkScreenSize} />

{#if isMdOrLarger && $settingsPanel.id !== null}
	<div
		class="fixed bottom-0 right-0 h-[80dvh] w-[60vw] rounded-tl-lg bg-white shadow-lg ring-1 ring-black"
		in:fly={isMdOrLarger
			? {
					x: 100,
					y: 100,
					duration: 300,
					easing: quintOut
				}
			: { duration: 0 }}
		out:fly={isMdOrLarger
			? {
					x: 100,
					y: 100,
					duration: 300,
					easing: quintOut
				}
			: { duration: 0 }}
	>
		<Tabs.Root value="overview" class="w-full">
			<div class="flex flex-row justify-between p-12">
				<h1>{$settingsPanel.id}</h1>
				<button
					class="flex w-full items-center justify-end"
					onclick={() => {
						$settingsPanel = { id: null, type: null };
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<Tabs.List class="grid w-full grid-cols-2 bg-transparent">
				{#each campPanel as s}
					<Tabs.Trigger
						class="border-red-500 text-primary/50 data-[state=active]:text-primary"
						value={s.code}>{s.name}</Tabs.Trigger
					>
				{/each}
			</Tabs.List>
			<div class="overflow-y-auto border-t-[1px] border-accent px-12">
				<Tabs.Content value="overview"><Overview></Overview></Tabs.Content>
				<Tabs.Content value="settings"><Settings></Settings></Tabs.Content>
			</div>
		</Tabs.Root>
	</div>
{/if}
