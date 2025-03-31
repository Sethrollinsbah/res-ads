<!-- src/lib/components/dash/create-button.svelte -->
<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Database, Layers, Plus, Calendar, Tag, ShoppingBag, BarChart4, Utensils, Coffee, Pizza, Store, 
		TrendingUp, Facebook, Instagram, Search, Send } from 'lucide-svelte';
	import { addNode } from '$lib/stores/node-store';
	import type { TableNode, CampaignNode, PlatformNode } from '$lib/types/node-types';

	// State for active tab
	let activeTab = $state('home');
	// State for the dialog
	let isDialogOpen = $state(false);

	// Campaign type options
	const campaignTypes = [
		{ id: 'weekend-special', name: 'Weekend Special', icon: Calendar, color: '#FF5252', description: 'Limited-time weekend promotions' },
		{ id: 'happy-hour', name: 'Happy Hour', icon: Coffee, color: '#FBBC05', description: 'Discounted drinks during specific hours' },
		{ id: 'dinner-deal', name: 'Dinner Deal', icon: Utensils, color: '#4285F4', description: 'Special meal packages for dinner time' },
		{ id: 'lunch-promo', name: 'Lunch Promotion', icon: Pizza, color: '#34A853', description: 'Weekday lunch special offers' },
		{ id: 'seasonal-menu', name: 'Seasonal Menu', icon: Tag, color: '#EA4335', description: 'Limited-time seasonal dishes campaign' }
	];

	// Platform type options
	const platformTypes = [
		{ id: 'google-ads', name: 'Google Ads', icon: Search, color: '#4285F4', description: 'Search engine advertising' },
		{ id: 'meta-ads', name: 'Meta Ads', icon: Facebook, color: '#1877F2', description: 'Facebook & Instagram ads' },
		{ id: 'instagram-ads', name: 'Instagram Ads', icon: Instagram, color: '#E1306C', description: 'Visual platform for food pics' },
		{ id: 'email-marketing', name: 'Email Marketing', icon: Send, color: '#D54B3D', description: 'Direct email campaigns to customers' },
		{ id: 'local-display', name: 'Local Display', icon: Store, color: '#34A853', description: 'Ads on local websites and apps' }
	];

	// Table type options
	const tableTypes = [
		{ id: 'customers', name: 'Customers', icon: ShoppingBag, color: '#4285F4', description: 'Customer data for targeting' },
		{ id: 'products', name: 'Menu Items', icon: Coffee, color: '#FF5252', description: 'Restaurant menu tracking' },
		{ id: 'orders', name: 'Orders', icon: ShoppingBag, color: '#FBBC05', description: 'Order history and analytics' },
		{ id: 'campaigns', name: 'Campaigns', icon: BarChart4, color: '#34A853', description: 'Campaign performance data' },
		{ id: 'reservations', name: 'Reservations', icon: Calendar, color: '#E1306C', description: 'Table booking information' }
	];

	// Function to create a new table
	function createNewTable(tableType: string) {
		const schema: Record<string, any> = {
			'customers': {
				headingText: 'Customers',
				headingColor: '#4285F4',
				schema: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'name', type: 'varchar', constraint: 'not null' },
					{ field: 'email', type: 'varchar', constraint: 'not null' },
					{ field: 'phone', type: 'varchar', constraint: '' },
					{ field: 'created_at', type: 'timestamp', constraint: 'not null' },
					{ field: 'last_order', type: 'timestamp', constraint: '' }
				]
			},
			'menu-items': {
				headingText: 'Menu Items',
				headingColor: '#FF5252',
				schema: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'name', type: 'varchar', constraint: 'not null' },
					{ field: 'category', type: 'varchar', constraint: 'not null' },
					{ field: 'price', type: 'decimal', constraint: 'not null' },
					{ field: 'description', type: 'text', constraint: '' },
					{ field: 'is_active', type: 'boolean', constraint: 'not null' }
				]
			},
			'orders': {
				headingText: 'Orders',
				headingColor: '#FBBC05',
				schema: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'customer_id', type: 'bigint', constraint: 'not null' },
					{ field: 'order_date', type: 'timestamp', constraint: 'not null' },
					{ field: 'total_amount', type: 'decimal', constraint: 'not null' },
					{ field: 'status', type: 'varchar', constraint: 'not null' },
					{ field: 'payment_method', type: 'varchar', constraint: 'not null' }
				]
			},
			'campaigns': {
				headingText: 'Campaigns',
				headingColor: '#34A853',
				schema: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'name', type: 'varchar', constraint: 'not null' },
					{ field: 'start_date', type: 'date', constraint: 'not null' },
					{ field: 'end_date', type: 'date', constraint: 'not null' },
					{ field: 'budget', type: 'decimal', constraint: 'not null' },
					{ field: 'status', type: 'varchar', constraint: 'not null' }
				]
			},
			'reservations': {
				headingText: 'Reservations',
				headingColor: '#E1306C',
				schema: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'customer_id', type: 'bigint', constraint: 'not null' },
					{ field: 'reservation_date', type: 'timestamp', constraint: 'not null' },
					{ field: 'party_size', type: 'int', constraint: 'not null' },
					{ field: 'table_number', type: 'int', constraint: '' },
					{ field: 'status', type: 'varchar', constraint: 'not null' }
				]
			}
		};

		const tableConfig = schema[tableType] || {
			headingText: 'New Table',
			headingColor: '#4285F4',
			schema: [
				{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
				{ field: 'name', type: 'varchar', constraint: 'not null' },
				{ field: 'created_at', type: 'timestamp', constraint: 'not null' }
			]
		};

		const newTable: Omit<TableNode, 'component'> = {
			id: `table-${tableType}-${Date.now()}`,
			type: 'table',
			position: { x: 100, y: 100 },
			data: {
				...tableConfig,
				borderColor: '#000000',
				shadowColor: '#99C9FF'
			}
		};

		addNode(newTable);
		isDialogOpen = false;
	}

	// Function to create a new campaign
	function createNewCampaign(campaignType: string) {
		const campaignData: Record<string, any> = {
			'weekend-special': {
				campaignName: 'Weekend Special',
				campaignStatus: 'Active',
				budget: 1200,
				mainColor: '#FF5252',
				shadowColor: '#FF9999'
			},
			'happy-hour': {
				campaignName: 'Happy Hour Promo',
				campaignStatus: 'Scheduled',
				budget: 800,
				mainColor: '#FBBC05',
				shadowColor: '#FFDE99'
			},
			'dinner-deal': {
				campaignName: 'Dinner Deal',
				campaignStatus: 'Active',
				budget: 1500,
				mainColor: '#4285F4',
				shadowColor: '#A4C2F4'
			},
			'lunch-promo': {
				campaignName: 'Lunch Special',
				campaignStatus: 'Scheduled',
				budget: 900,
				mainColor: '#34A853',
				shadowColor: '#A5D7B9'
			},
			'seasonal-menu': {
				campaignName: 'Seasonal Menu',
				campaignStatus: 'Scheduled',
				budget: 1800,
				mainColor: '#EA4335',
				shadowColor: '#F4A9A3'
			}
		};

		const campaignConfig = campaignData[campaignType] || {
			campaignName: 'New Campaign',
			campaignStatus: 'Scheduled',
			budget: 1000,
			mainColor: '#FF5252',
			shadowColor: '#FF9999'
		};

		// Calculate dates
		const today = new Date();
		const startDate = new Date(today);
		startDate.setDate(today.getDate() + 7); // Start in a week
		
		const endDate = new Date(startDate);
		endDate.setDate(startDate.getDate() + 30); // Run for 30 days

		const newCampaign: Omit<CampaignNode, 'component'> = {
			id: `campaign-${campaignType}-${Date.now()}`,
			type: 'campaign',
			position: { x: 100, y: 100 },
			data: {
				...campaignConfig,
				impressions: 0,
				clicks: 0,
				conversions: 0,
				startDate: startDate.toISOString().split('T')[0],
				endDate: endDate.toISOString().split('T')[0]
			}
		};

		addNode(newCampaign);
		isDialogOpen = false;
	}

	// Function to create a new platform
	function createNewPlatform(platformType: string) {
		const platformData: Record<string, any> = {
			'google-ads': {
				platformName: 'Google',
				platformType: 'Search',
				platformIcon: '🔍',
				budget: 500,
				budgetPercentage: 30,
				mainColor: '#4285F4',
				shadowColor: '#A4C2F4'
			},
			'meta-ads': {
				platformName: 'Facebook',
				platformType: 'Social',
				platformIcon: '👥',
				budget: 450,
				budgetPercentage: 25,
				mainColor: '#1877F2',
				shadowColor: '#8BB9FE'
			},
			'instagram-ads': {
				platformName: 'Instagram',
				platformType: 'Social',
				platformIcon: '📸',
				budget: 350,
				budgetPercentage: 20,
				mainColor: '#E1306C',
				shadowColor: '#F5A3C7'
			},
			'email-marketing': {
				platformName: 'Email',
				platformType: 'Email',
				platformIcon: '📧',
				budget: 200,
				budgetPercentage: 15,
				mainColor: '#D54B3D',
				shadowColor: '#F4A9A3'
			},
			'local-display': {
				platformName: 'Local Display',
				platformType: 'Display',
				platformIcon: '🖥️',
				budget: 180,
				budgetPercentage: 10,
				mainColor: '#34A853',
				shadowColor: '#A5D7B9'
			}
		};

		const platformConfig = platformData[platformType] || {
			platformName: 'New Platform',
			platformType: 'Other',
			platformIcon: '📱',
			budget: 200,
			budgetPercentage: 15,
			mainColor: '#A4A4A4',
			shadowColor: '#D4D4D4'
		};

		const newPlatform: Omit<PlatformNode, 'component'> = {
			id: `platform-${platformType}-${Date.now()}`,
			type: 'platform',
			position: { x: 100, y: 100 },
			data: {
				...platformConfig,
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
		id="create-button"
		class={buttonVariants({ variant: 'outline' }) + ' fixed right-4 top-24 shadow-md'}
		on:click={() => {
			activeTab = 'home';
			isDialogOpen = true;
		}}><Plus class="mr-[2px] size-4" /> Create</Dialog.Trigger
	>

	<Dialog.Content class="sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Create New Item</Dialog.Title>
			<Dialog.Description>
				Choose what kind of item you want to create for your restaurant marketing dashboard.
			</Dialog.Description>
		</Dialog.Header>

		<Tabs.Root
			value={activeTab}
			class="h-full w-full"
			on:change={(e) => (activeTab = e.detail)}
		>
			<!-- Main Navigation -->
			{#if activeTab === 'home'}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<Button 
						variant="outline" 
						class="flex h-24 flex-col items-center justify-center gap-2 p-4"
						on:click={() => activeTab = 'campaign'}
					>
						<Calendar class="h-8 w-8 text-red-500" />
						<span>Campaign</span>
					</Button>
					
					<Button 
						variant="outline" 
						class="flex h-24 flex-col items-center justify-center gap-2 p-4"
						on:click={() => activeTab = 'platform'}
					>
						<Layers class="h-8 w-8 text-blue-500" />
						<span>Platform</span>
					</Button>
					
					<Button 
						variant="outline" 
						class="flex h-24 flex-col items-center justify-center gap-2 p-4"
						on:click={() => activeTab = 'table'}
					>
						<Database class="h-8 w-8 text-green-500" />
						<span>Data Table</span>
					</Button>
				</div>
			{/if}

			<!-- Campaign Options -->
			<Tabs.Content value="campaign">
				<div class="mb-4">
					<Button variant="outline" size="sm" on:click={() => (activeTab = 'home')}>
						← Back
					</Button>
				</div>
				
				<h3 class="mb-4 text-lg font-medium">Choose Campaign Type</h3>
				
				<div class="grid gap-3">
					{#each campaignTypes as campaign}
						<Button
							variant="outline"
							class="flex h-auto items-start justify-start gap-3 p-3 text-left"
							on:click={() => createNewCampaign(campaign.id)}
						>
							<div 
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" 
								style="background-color: {campaign.color}25;"
							>
								<svelte:component this={campaign.icon} class="h-5 w-5" style="color: {campaign.color};" />
							</div>
							<div>
								<div class="font-medium">{campaign.name}</div>
								<div class="text-sm text-gray-500">{campaign.description}</div>
							</div>
						</Button>
					{/each}
				</div>
			</Tabs.Content>

			<!-- Platform Options -->
			<Tabs.Content value="platform">
				<div class="mb-4">
					<Button variant="outline" size="sm" on:click={() => (activeTab = 'home')}>
						← Back
					</Button>
				</div>
				
				<h3 class="mb-4 text-lg font-medium">Choose Advertising Platform</h3>
				
				<div class="grid gap-3">
					{#each platformTypes as platform}
						<Button
							variant="outline"
							class="flex h-auto items-start justify-start gap-3 p-3 text-left"
							on:click={() => createNewPlatform(platform.id)}
						>
							<div 
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" 
								style="background-color: {platform.color}25;"
							>
								<svelte:component this={platform.icon} class="h-5 w-5" style="color: {platform.color};" />
							</div>
							<div>
								<div class="font-medium">{platform.name}</div>
								<div class="text-sm text-gray-500">{platform.description}</div>
							</div>
						</Button>
					{/each}
				</div>
			</Tabs.Content>

			<!-- Table Options -->
			<Tabs.Content value="table">
				<div class="mb-4">
					<Button variant="outline" size="sm" on:click={() => (activeTab = 'home')}>
						← Back
					</Button>
				</div>
				
				<h3 class="mb-4 text-lg font-medium">Choose Data Table Type</h3>
				
				<div class="grid gap-3">
					{#each tableTypes as table}
						<Button
							variant="outline"
							class="flex h-auto items-start justify-start gap-3 p-3 text-left"
							on:click={() => createNewTable(table.id)}
						>
							<div 
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" 
								style="background-color: {table.color}25;"
							>
								<svelte:component this={table.icon} class="h-5 w-5" style="color: {table.color};" />
							</div>
							<div>
								<div class="font-medium">{table.name}</div>
								<div class="text-sm text-gray-500">{table.description}</div>
							</div>
						</Button>
					{/each}
				</div>
			</Tabs.Content>
		</Tabs.Root>

		<Dialog.Footer>
			<Button variant="outline" on:click={() => (isDialogOpen = false)}>Cancel</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
