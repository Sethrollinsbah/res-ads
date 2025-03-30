<!-- src/lib/components/dash/create-button.svelte -->
<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Database, Layers, Plus } from 'lucide-svelte';
	import { addNode } from '$lib/stores/node-store';
	import type { TableNode, CampaignNode, PlatformNode } from '$lib/types/node-types';

	// State for active tab
	let activeTab = $state('home');
	// State for the dialog
	let isDialogOpen = $state(false);

	// Function to create a new table
	function createNewTable() {
		const newTable: Omit<TableNode, 'component'> = {
			id: `table-${Date.now()}`,
			type: 'table',
			position: { x: 100, y: 100 },
			data: {
				headingText: 'New Table',
				headingColor: '#4285F4',
				borderColor: '#000000',
				shadowColor: '#99C9FF',
				tableData: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'name', type: 'varchar', constraint: 'not null' },
					{ field: 'created_at', type: 'timestamp', constraint: 'not null' }
				]
			}
		};

		addNode(newTable);
		isDialogOpen = false;
	}

	// Function to create a new campaign
	function createNewCampaign() {
		const newCampaign: Omit<CampaignNode, 'component'> = {
			id: `campaign-${Date.now()}`,
			type: 'campaign',
			position: { x: 100, y: 100 },
			data: {
				campaignName: 'New Campaign',
				campaignStatus: 'Scheduled',
				budget: 1000,
				impressions: 0,
				clicks: 0,
				conversions: 0,
				startDate: new Date().toISOString().split('T')[0],
				endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
				mainColor: '#FF5252',
				shadowColor: '#FF9999'
			}
		};

		addNode(newCampaign);
		isDialogOpen = false;
	}

	// Function to create a new platform
	function createNewPlatform(platformName: string) {
		const platformData: Record<string, any> = {
			'Google Ads': {
				platformName: 'Google',
				platformType: 'Search',
				platformIcon: '🔍',
				mainColor: '#4285F4',
				shadowColor: '#A4C2F4'
			},
			'Meta Ads': {
				platformName: 'Facebook',
				platformType: 'Social',
				platformIcon: '👥',
				mainColor: '#1877F2',
				shadowColor: '#8BB9FE'
			},
			'Microsoft Ads': {
				platformName: 'Microsoft',
				platformType: 'Search',
				platformIcon: '🔍',
				mainColor: '#00A4EF',
				shadowColor: '#99D6F8'
			},
			'Reddit Ads': {
				platformName: 'Reddit',
				platformType: 'Social',
				platformIcon: '🤖',
				mainColor: '#FF4500',
				shadowColor: '#FFB280'
			}
		};

		const platformConfig = platformData[platformName] || {
			platformName: platformName,
			platformType: 'Other',
			platformIcon: '📱',
			mainColor: '#A4A4A4',
			shadowColor: '#D4D4D4'
		};

		const newPlatform: Omit<PlatformNode, 'component'> = {
			id: `platform-${Date.now()}`,
			type: 'platform',
			position: { x: 100, y: 100 },
			data: {
				...platformConfig,
				budget: 500,
				budgetPercentage: 25,
				impressions: 0,
				clicks: 0,
				conversions: 0,
				costPerClick: 0.5,
				costPerConversion: 10.0
			}
		};

		addNode(newPlatform);
		isDialogOpen = false;
	}
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Trigger
		id="find"
		class={buttonVariants({ variant: 'outline' }) + ' fixed right-4 top-24 '}
		on:click={() => {
			activeTab = 'home';
			isDialogOpen = true;
		}}><Plus class="mr-[2px] size-4" /> Create</Dialog.Trigger
	>

	<Dialog.Content class="sm:max-w-[425px]">
		<Tabs.Root
			value={activeTab}
			class="h-full w-full bg-none"
			on:change={(e) => (activeTab = e.detail)}
		>
			<Tabs.Content class="bg-none" value="home">
				<Tabs.List class="flex h-full w-full flex-col divide-y-[1px] divide-accent bg-transparent ">
					<Tabs.Trigger
						class="group flex w-full flex-row justify-start rounded-none bg-transparent text-base font-normal"
						value="Database"><Database class="mr-2" />Database</Tabs.Trigger
					>
					<Tabs.Trigger
						class="flex w-full flex-row justify-start rounded-none text-base font-normal"
						value="Platform"><Layers class="mr-2 " />Platform</Tabs.Trigger
					>
				</Tabs.List>
			</Tabs.Content>

			<Tabs.Content value="Database">
				<Button
					class="flex w-full flex-row justify-start"
					variant="outline"
					on:click={createNewTable}
				>
					<span class="mr-4">🗃️</span>
					<span>Create New Table</span>
				</Button>
				<Button
					class="flex w-full flex-row justify-start"
					variant="outline"
					on:click={createNewCampaign}
				>
					<span class="mr-4">📊</span>
					<span>Create New Campaign</span>
				</Button>
			</Tabs.Content>

			<Tabs.Content value="Platform">
				<Button
					class="flex w-full flex-row justify-start"
					variant="outline"
					on:click={() => createNewPlatform('Google Ads')}
				>
					<span class="mr-4">🔍</span>
					<span>Google Ads</span>
				</Button>
				<Button
					class="flex w-full flex-row justify-start"
					variant="outline"
					on:click={() => createNewPlatform('Meta Ads')}
				>
					<span class="mr-4">👥</span>
					<span>Meta Ads</span>
				</Button>
				<Button
					class="flex w-full flex-row justify-start"
					variant="outline"
					on:click={() => createNewPlatform('Microsoft Ads')}
				>
					<span class="mr-4">🪟</span>
					<span>Microsoft Ads</span>
				</Button>
				<Button
					class="flex w-full flex-row justify-start"
					variant="outline"
					on:click={() => createNewPlatform('Reddit Ads')}
				>
					<span class="mr-4">🤖</span>
					<span>Reddit Ads</span>
				</Button>
			</Tabs.Content>
		</Tabs.Root>
	</Dialog.Content>
</Dialog.Root>
