<script lang="ts">
	import { onMount } from 'svelte';
	// Import components
	import ChatInterface from './chat/chat-interface.svelte';
	import FunnelVisualization from './funnel/funnel-visualization.svelte';
	import SettingsPanel from './campaign-settings/settings-panel.svelte';
	// Import Drawer components
	import * as Drawer from '$lib/components/ui/drawer';
	// Import types
	import type { CampaignSettings, FunnelStep } from './dashboard-types';
	// Icons
	import { Rocket, RefreshCw, X } from 'lucide-svelte';
	import Logo from '../logo.svelte';

	// State for responsive design
	let windowWidth = 0;
	let drawerOpen = $state(false);

	// Campaign settings state
	let campaignSettings = $state<CampaignSettings>({
		budget: 750,
		duration: 30,
		primaryGoal: 'website',
		secondaryGoal: 'calls'
	});

	// Reference to funnel component for methods
	let funnelComponent: FunnelVisualization;
	let highlightedPlan = $state('');
	let calculatorResult = $state(false);

	// Toggle drawer for mobile view
	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	// Reset funnel to defaults
	function resetFunnel() {
		if (funnelComponent) {
			funnelComponent.resetFunnel();
		}
	}

	// Handle updates from campaign settings
	function handleSettingsUpdate(event: CustomEvent<CampaignSettings>) {
		campaignSettings = event.detail;
	}

	// Handle updates from chat conversation
	function handleConversationUpdate(event: CustomEvent) {
		const { budget, audienceFocus, conversionFocus, onlineOrdersFocus, input } = event.detail;

		// Update budget if provided
		if (budget !== null) {
			campaignSettings.budget = budget;
		}

		// Update awareness node if audience is mentioned
		if (audienceFocus) {
			funnelComponent.updateNodeMetrics('1', {
				reach: '15,700',
				impressions: Math.round(campaignSettings.budget * 60).toLocaleString()
			});

			funnelComponent.updateNodeAppearance('1', {
				description: 'Target local food enthusiasts'
			});
		}

		// Update phone calls conversion if mentioned
		if (conversionFocus === 'calls') {
			funnelComponent.updateNodeMetrics('4a', {
				calls: '127',
				callRate: '6.8%'
			});

			funnelComponent.updateNodeAppearance('4a', {
				width: 140 // Make it slightly larger to emphasize
			});
		}

		// Update online orders if mentioned
		if (onlineOrdersFocus) {
			funnelComponent.updateNodeMetrics('4c', {
				orders: '104',
				orderRate: '5.6%'
			});

			funnelComponent.updateNodeAppearance('4c', {
				width: 140 // Make it slightly larger to emphasize
			});
		}
	}

	onMount(() => {
		// Set up window resize listener
		const handleResize = () => {
			windowWidth = window.innerWidth;
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial call

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="flex h-screen flex-col bg-gray-500">
	<header class="border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center gap-3">
				<!-- <Logo></Logo> -->
				<h1 class="text-xl font-bold">Campaign Builder</h1>
			</div>

			<div class="flex items-center gap-4">
				<div
					class="hidden items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm sm:flex"
				>
					<span class="font-semibold text-gray-700">Budget:</span>
					<span class="ml-1">${campaignSettings.budget}</span>
				</div>
				<div
					class="hidden items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm sm:flex"
				>
					<span class="font-semibold text-gray-700">Duration</span>
					<span class="ml-1">{campaignSettings.duration} days</span>
				</div>
				<button
					class="flex items-center gap-1 rounded-lg border border-blue-500 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
				>
					<Rocket class="h-4 w-4" />
					<span class="hidden md:inline">Launch Campaign</span>
					<span class="md:hidden">Launch</span>
				</button>
			</div>
		</div>
	</header>

	<div class="flex flex-1 overflow-hidden">
		<!-- DESKTOP VIEW: Funnel Visualization Section (visible on md and up) -->
		<div class="hidden w-1/2 flex-col border-r border-gray-200 bg-gray-50 md:flex">
			<div class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
				<h2 class="text-lg font-semibold">Campaign Funnel Visualization</h2>
				<button
					onclick={resetFunnel}
					class="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
				>
					<RefreshCw class="h-3 w-3" />
					<span>Reset</span>
				</button>
			</div>

			<div class="relative flex-1">
				<FunnelVisualization
					bind:this={funnelComponent}
					budget={campaignSettings.budget}
					{highlightedPlan}
				/>
			</div>

			<SettingsPanel settings={campaignSettings} on:update={handleSettingsUpdate} />
		</div>

		<!-- Chat Interface Section - Fixed height with proper scrolling -->
		<div class="flex w-full flex-col md:w-1/2">
			<ChatInterface on:conversationUpdate={handleConversationUpdate}>
				<svelte:fragment slot="header-actions">
					<!-- MOBILE: Funnel Toggle Button (visible on small screens) -->
					<button
						onclick={toggleDrawer}
						class="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-sm font-medium text-gray-700 md:hidden"
					>
						<span>View Funnel</span>
					</button>
				</svelte:fragment>
			</ChatInterface>
		</div>
	</div>

	<!-- MOBILE: Drawer for Funnel Visualization -->
	<Drawer.Root bind:open={drawerOpen} snapPoints={['90%']} closeOnOutsideClick={true}>
		<Drawer.Portal>
			<Drawer.Overlay class="fixed inset-0 z-50 bg-black/40" />
			<Drawer.Content
				class="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-lg border-t border-gray-200 bg-white"
			>
				<div class="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
					<h2 class="text-lg font-semibold">Campaign Funnel</h2>
					<Drawer.Close class="rounded-full p-1.5 text-gray-500 hover:bg-gray-100">
						<X class="h-5 w-5" />
					</Drawer.Close>
				</div>

				<div class="relative flex-1 overflow-hidden">
					<FunnelVisualization budget={campaignSettings.budget} {highlightedPlan} />
				</div>

				<SettingsPanel settings={campaignSettings} on:update={handleSettingsUpdate}>
					<div class="mt-4 flex justify-end">
						<button
							onclick={resetFunnel}
							class="mr-2 flex items-center gap-1 rounded border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
						>
							<RefreshCw class="h-3 w-3" />
							<span>Reset Funnel</span>
						</button>

						<Drawer.Close
							class="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
						>
							<span>Back to Chat</span>
						</Drawer.Close>
					</div>
				</SettingsPanel>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
</div>
