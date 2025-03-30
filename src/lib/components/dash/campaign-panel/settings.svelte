<script lang="ts">
	import Button from '../../ui/button/button.svelte';
	import { settingsPanel } from '$lib';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Switch from '$lib/components/ui/switch';
	import {
		Calendar,
		Upload,
		Lock,
		Users,
		Clock,
		Bell,
		Link,
		Image,
		Cog,
		Target,
		DollarSign,
		Calendar as CalendarIcon,
		Settings,
		Tag,
		BarChart3,
		ThumbsUp,
		AlertCircle,
		Database,
		RefreshCw,
		Share2,
		ShieldAlert,
		Key,
		Trash2
	} from 'lucide-svelte';
	import * as Separator from '$lib/components/ui/separator';

	// Campaign settings state
	let campaignSettings = $state({
		name: 'Weekend Special Promotion',
		status: 'active',
		budget: 1200,
		startDate: '2025-03-01',
		endDate: '2025-04-15',
		dailyCap: 40,
		target: 'local_customers',
		notifications: true,
		automaticBidding: true
	});

	// Platform settings state
	let platformSettings = $state({
		name: 'Instagram',
		type: 'social',
		budget: 450,
		budgetPercentage: 35,
		adFormat: 'carousel',
		audience: 'food_enthusiasts',
		bidStrategy: 'automatic',
		dayparting: true,
		daypartingHours: [12, 13, 14, 17, 18, 19, 20, 21],
		tracking: true
	});

	// Table settings state
	let tableSettings = $state({
		name: 'Customers',
		description: 'Customer data for CRM and targeting',
		refreshFrequency: 'daily',
		autoSync: true,
		includeInReports: true,
		privacyLevel: 'restricted',
		backupEnabled: true,
		apiAccess: true
	});

	// Form handlers
	function handleCampaignSubmit() {
		// In a real app, this would save to the backend
		alert('Campaign settings updated!');
	}

	function handlePlatformSubmit() {
		// In a real app, this would save to the backend
		alert('Platform settings updated!');
	}

	function handleTableSubmit() {
		// In a real app, this would save to the backend
		alert('Table settings updated!');
	}

	function handleDeleteComponent() {
		if (confirm('Are you sure you want to delete this component? This action cannot be undone.')) {
			// In a real app, this would delete the component
			alert('Component deleted!');
			$settingsPanel = { id: null, type: null };
		}
	}

	// Helper for day-parting time selection
	function isTimeSelected(hour: number): boolean {
		return platformSettings.daypartingHours.includes(hour);
	}

	function toggleTimeSelection(hour: number) {
		if (isTimeSelected(hour)) {
			platformSettings.daypartingHours = platformSettings.daypartingHours.filter((h) => h !== hour);
		} else {
			platformSettings.daypartingHours = [...platformSettings.daypartingHours, hour].sort(
				(a, b) => a - b
			);
		}
	}

	// Get the time display for hour (24-hour to 12-hour conversion)
	function getTimeDisplay(hour: number): string {
		const period = hour >= 12 ? 'PM' : 'AM';
		const displayHour = hour % 12 === 0 ? 12 : hour % 12;
		return `${displayHour} ${period}`;
	}

	// Days of the week
	const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Campaign status options
	const statusOptions = [
		{ value: 'active', label: 'Active' },
		{ value: 'paused', label: 'Paused' },
		{ value: 'scheduled', label: 'Scheduled' },
		{ value: 'ended', label: 'Ended' }
	];

	// Target audience options
	const targetOptions = [
		{ value: 'local_customers', label: 'Local Customers (5mi radius)' },
		{ value: 'regional_customers', label: 'Regional Customers (20mi radius)' },
		{ value: 'tourists', label: 'Tourists & Visitors' },
		{ value: 'business_lunch', label: 'Business Lunch Crowd' },
		{ value: 'families', label: 'Families with Children' },
		{ value: 'evening_diners', label: 'Evening & Weekend Diners' }
	];

	// Platform types
	const platformTypes = [
		{ value: 'social', label: 'Social Media' },
		{ value: 'search', label: 'Search' },
		{ value: 'display', label: 'Display' },
		{ value: 'email', label: 'Email' },
		{ value: 'video', label: 'Video' }
	];

	// Ad formats by platform type
	const adFormats = {
		social: [
			{ value: 'carousel', label: 'Carousel Ads' },
			{ value: 'single_image', label: 'Single Image' },
			{ value: 'video', label: 'Video' },
			{ value: 'stories', label: 'Stories' },
			{ value: 'reels', label: 'Reels/Short Video' }
		],
		search: [
			{ value: 'text', label: 'Text Ads' },
			{ value: 'callout', label: 'Callout Extensions' },
			{ value: 'location', label: 'Location Extensions' },
			{ value: 'sitelink', label: 'Sitelink Extensions' }
		],
		display: [
			{ value: 'banner', label: 'Banner Ads' },
			{ value: 'responsive', label: 'Responsive Ads' },
			{ value: 'native', label: 'Native Ads' }
		],
		email: [
			{ value: 'newsletter', label: 'Newsletter' },
			{ value: 'promotion', label: 'Promotional Email' },
			{ value: 'abandoned_cart', label: 'Abandoned Cart' }
		],
		video: [
			{ value: 'instream', label: 'In-stream Ads' },
			{ value: 'discovery', label: 'Discovery Ads' },
			{ value: 'bumper', label: 'Bumper Ads' }
		]
	};

	// Audience options
	const audienceOptions = [
		{ value: 'food_enthusiasts', label: 'Food Enthusiasts' },
		{ value: 'local_residents', label: 'Local Residents' },
		{ value: 'office_workers', label: 'Office Workers' },
		{ value: 'families', label: 'Families' },
		{ value: 'nightlife', label: 'Nightlife & Entertainment' },
		{ value: 'health_conscious', label: 'Health Conscious Diners' }
	];

	// Table refresh frequency options
	const refreshOptions = [
		{ value: 'real_time', label: 'Real-time' },
		{ value: 'hourly', label: 'Hourly' },
		{ value: 'daily', label: 'Daily' },
		{ value: 'weekly', label: 'Weekly' },
		{ value: 'monthly', label: 'Monthly' },
		{ value: 'manual', label: 'Manual Only' }
	];

	// Privacy levels
	const privacyLevels = [
		{ value: 'public', label: 'Public - All teams' },
		{ value: 'internal', label: 'Internal - Organization only' },
		{ value: 'restricted', label: 'Restricted - Marketing team only' },
		{ value: 'private', label: 'Private - Admins only' }
	];

	// Helper to format currency
	function formatCurrency(value: number): string {
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	}
</script>

{#if $settingsPanel.type === 'campaign'}
	<div class="space-y-6 py-4">
		<Tabs.Root value="general">
			<Tabs.List class="w-full">
				<Tabs.Trigger value="general">General</Tabs.Trigger>
				<Tabs.Trigger value="targeting">Targeting</Tabs.Trigger>
				<Tabs.Trigger value="budget">Budget</Tabs.Trigger>
				<Tabs.Trigger value="schedule">Schedule</Tabs.Trigger>
			</Tabs.List>

			<!-- General Tab -->
			<Tabs.Content value="general" class="py-4">
				<form on:submit|preventDefault={handleCampaignSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<Settings class="h-5 w-5 text-gray-500" />
								Campaign Settings
							</Card.Title>
							<Card.Description>Configure the basic settings for your campaign.</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid gap-2">
									<Label for="campaign-name">Campaign Name</Label>
									<Input
										id="campaign-name"
										bind:value={campaignSettings.name}
										placeholder="Enter campaign name"
										required
									/>
								</div>

								<div class="grid gap-2">
									<Label for="campaign-status">Status</Label>
									<Select.Root value={campaignSettings.status}>
										<Select.Trigger id="campaign-status" class="w-full">
											<Select.Value placeholder="Select campaign status" />
										</Select.Trigger>
										<Select.Content>
											{#each statusOptions as option}
												<Select.Item value={option.value}>{option.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="grid gap-2">
									<Label>Campaign Notifications</Label>
									<div class="flex items-center">
										<Switch.Root id="notifications-toggle" checked={campaignSettings.notifications}>
											<Switch.Thumb />
										</Switch.Root>
										<Label for="notifications-toggle" class="ml-2"
											>Send performance notifications</Label
										>
									</div>
									<p class="text-xs text-gray-500">
										Receive daily updates about campaign performance via email and in-app
										notifications.
									</p>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button type="submit" variant="outline">Cancel</Button>
							<Button type="submit">Save Changes</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Tabs.Content>

			<!-- Targeting Tab -->
			<Tabs.Content value="targeting" class="py-4">
				<form on:submit|preventDefault={handleCampaignSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<Target class="h-5 w-5 text-gray-500" />
								Audience Targeting
							</Card.Title>
							<Card.Description>Define who should see your campaign ads.</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid gap-2">
									<Label for="target-audience">Primary Target Audience</Label>
									<Select.Root value={campaignSettings.target}>
										<Select.Trigger id="target-audience" class="w-full">
											<Select.Value placeholder="Select target audience" />
										</Select.Trigger>
										<Select.Content>
											{#each targetOptions as option}
												<Select.Item value={option.value}>{option.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="grid gap-2">
									<Label>Location</Label>
									<div class="rounded-md border border-gray-200 p-3">
										<div class="flex items-center space-x-2">
											<input type="radio" id="location-restaurant" name="location" checked={true} />
											<Label for="location-restaurant" class="cursor-pointer text-sm font-normal">
												Restaurant Location (5 mile radius)
											</Label>
										</div>

										<div class="mt-2 flex items-center space-x-2">
											<input type="radio" id="location-custom" name="location" />
											<Label for="location-custom" class="cursor-pointer text-sm font-normal">
												Custom Location
											</Label>
										</div>

										<Button variant="outline" class="mt-3 w-full">Edit Geographic Targeting</Button>
									</div>
								</div>

								<div class="grid gap-2">
									<Label>Demographics</Label>
									<div class="space-y-3">
										<div class="rounded-md border border-gray-200 p-3">
											<Label class="text-sm">Age Range</Label>
											<div class="mt-2 flex flex-wrap gap-2">
												{#each ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] as ageRange}
													<Button
														variant={['25-34', '35-44'].includes(ageRange) ? 'default' : 'outline'}
														class="h-8 text-xs"
													>
														{ageRange}
													</Button>
												{/each}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button type="submit" variant="outline">Cancel</Button>
							<Button type="submit">Save Changes</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Tabs.Content>

			<!-- Budget Tab -->
			<Tabs.Content value="budget" class="py-4">
				<form on:submit|preventDefault={handleCampaignSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<DollarSign class="h-5 w-5 text-gray-500" />
								Budget Management
							</Card.Title>
							<Card.Description>Set campaign budget and bidding strategy.</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid gap-2">
									<Label for="campaign-budget">Total Campaign Budget</Label>
									<div class="flex items-center">
										<span class="mr-2 text-gray-500">$</span>
										<Input
											id="campaign-budget"
											type="number"
											bind:value={campaignSettings.budget}
											min="100"
											step="50"
											required
										/>
									</div>
								</div>

								<div class="grid gap-2">
									<Label for="daily-cap">Daily Spending Cap</Label>
									<div class="flex items-center">
										<span class="mr-2 text-gray-500">$</span>
										<Input
											id="daily-cap"
											type="number"
											bind:value={campaignSettings.dailyCap}
											min="10"
											step="5"
											required
										/>
									</div>
									<p class="text-xs text-gray-500">Maximum amount to spend per day.</p>
								</div>

								<div class="grid gap-2">
									<Label>Bidding Strategy</Label>
									<div class="flex items-center">
										<Switch.Root id="bidding-toggle" checked={campaignSettings.automaticBidding}>
											<Switch.Thumb />
										</Switch.Root>
										<Label for="bidding-toggle" class="ml-2">Use automatic bidding</Label>
									</div>
									<p class="text-xs text-gray-500">
										Let the system optimize bids to maximize results within your budget.
									</p>
								</div>

								<div class="mt-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
									<div class="flex items-center">
										<ThumbsUp class="mr-2 h-4 w-4" />
										<span class="font-medium">Pro Tip</span>
									</div>
									<p class="mt-1">
										Based on your restaurant type and location, we recommend a budget of at least
										$1,000 for a 30-day campaign to see optimal results.
									</p>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button type="submit" variant="outline">Cancel</Button>
							<Button type="submit">Save Changes</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Tabs.Content>

			<!-- Schedule Tab -->
			<Tabs.Content value="schedule" class="py-4">
				<form on:submit|preventDefault={handleCampaignSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<CalendarIcon class="h-5 w-5 text-gray-500" />
								Campaign Schedule
							</Card.Title>
							<Card.Description>Set the timeline for your campaign.</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid grid-cols-2 gap-4">
									<div class="grid gap-2">
										<Label for="start-date">Start Date</Label>
										<Input
											id="start-date"
											type="date"
											bind:value={campaignSettings.startDate}
											required
										/>
									</div>

									<div class="grid gap-2">
										<Label for="end-date">End Date</Label>
										<Input
											id="end-date"
											type="date"
											bind:value={campaignSettings.endDate}
											required
										/>
									</div>
								</div>

								<div class="grid gap-2">
									<Label>Active Days</Label>
									<div class="flex flex-wrap gap-2">
										{#each daysOfWeek as day}
											<Button
												variant={['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)
													? 'default'
													: 'outline'}
												class="h-10 flex-1"
											>
												{day}
											</Button>
										{/each}
									</div>
								</div>

								<div class="grid gap-2">
									<Label>Day Parting</Label>
									<p class="mb-2 text-xs text-gray-500">Select active hours for your campaign:</p>
									<div class="grid grid-cols-6 gap-2">
										{#each Array.from({ length: 24 }, (_, i) => i) as hour}
											<button
												type="button"
												class={`h-8 rounded-md border text-xs ${
													[11, 12, 13, 17, 18, 19, 20].includes(hour)
														? 'bg-primary text-primary-foreground'
														: 'bg-background text-foreground'
												}`}
											>
												{getTimeDisplay(hour)}
											</button>
										{/each}
									</div>
									<p class="mt-2 text-xs text-gray-600">
										Showing active hours in restaurant's local timezone (EDT).
									</p>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button type="submit" variant="outline">Cancel</Button>
							<Button type="submit">Save Changes</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Tabs.Content>
		</Tabs.Root>
	</div>
{:else if $settingsPanel.type === 'platform'}
	<div class="space-y-6 py-4">
		<Tabs.Root value="general">
			<Tabs.List class="w-full">
				<Tabs.Trigger value="general">General</Tabs.Trigger>
				<Tabs.Trigger value="creative">Creative</Tabs.Trigger>
				<Tabs.Trigger value="audience">Audience</Tabs.Trigger>
				<Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
			</Tabs.List>

			<!-- General Tab -->
			<Tabs.Content value="general" class="py-4">
				<form on:submit|preventDefault={handlePlatformSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<Settings class="h-5 w-5 text-gray-500" />
								Platform Settings
							</Card.Title>
							<Card.Description>
								Configure general settings for this platform channel.
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid gap-2">
									<Label for="platform-name">Platform Name</Label>
									<Input
										id="platform-name"
										bind:value={platformSettings.name}
										placeholder="Enter platform name"
										required
									/>
								</div>

								<div class="grid gap-2">
									<Label for="platform-type">Platform Type</Label>
									<Select.Root value={platformSettings.type}>
										<Select.Trigger id="platform-type" class="w-full">
											<Select.Value placeholder="Select platform type" />
										</Select.Trigger>
										<Select.Content>
											{#each platformTypes as option}
												<Select.Item value={option.value}>{option.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="grid gap-2">
									<Label for="platform-budget">Channel Budget</Label>
									<div class="flex items-center">
										<span class="mr-2 text-gray-500">$</span>
										<Input
											id="platform-budget"
											type="number"
											bind:value={platformSettings.budget}
											min="50"
											step="10"
											required
										/>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-xs text-gray-500">
											{platformSettings.budgetPercentage}% of total campaign budget
										</span>
										<input
											type="range"
											min="10"
											max="100"
											step="5"
											bind:value={platformSettings.budgetPercentage}
											class="h-2 w-32 accent-red-500"
										/>
									</div>
								</div>

								<div class="mt-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
									<div class="flex items-center">
										<ThumbsUp class="mr-2 h-4 w-4" />
										<span class="font-medium">Channel Insight</span>
									</div>
									<p class="mt-1">
										{platformSettings.name} performs best with visual content for restaurant promotions,
										with an average CTR of 5.7% in your industry.
									</p>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button type="submit" variant="outline">Cancel</Button>
							<Button type="submit">Save Changes</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Tabs.Content>

			<!-- Creative Tab -->
			<Tabs.Content value="creative" class="py-4">
				<form on:submit|preventDefault={handlePlatformSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<Image class="h-5 w-5 text-gray-500" />
								Creative Assets
							</Card.Title>
							<Card.Description>Configure the ads that will run on this platform.</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid gap-2">
									<Label for="ad-format">Ad Format</Label>
									<Select.Root value={platformSettings.adFormat}>
										<Select.Trigger id="ad-format" class="w-full">
											<Select.Value placeholder="Select an ad format" />
										</Select.Trigger>
										<Select.Content>
											{#each adFormats[platformSettings.type] || [] as option}
												<Select.Item value={option.value}>{option.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="grid gap-2">
									<Label>Upload Creative Assets</Label>
									<div class="grid grid-cols-2 gap-4">
										<div class="rounded-md border border-dashed border-gray-300 p-6 text-center">
											<Upload class="mx-auto h-8 w-8 text-gray-400" />
											<p class="mt-2 text-sm text-gray-500">Upload Images</p>
											<p class="text-xs text-gray-400">PNG, JPG or WEBP (max. 5MB)</p>
											<Button variant="outline" class="mt-4">Browse Files</Button>
										</div>

										<div class="rounded-md border border-dashed border-gray-300 p-6 text-center">
											<Upload class="mx-auto h-8 w-8 text-gray-400" />
											<p class="mt-2 text-sm text-gray-500">Upload Videos</p>
											<p class="text-xs text-gray-400">MP4 (max. 100MB)</p>
											<Button variant="outline" class="mt-4">Browse Files</Button>
										</div>
									</div>
								</div>

								<Separator.Root class="my-2" />

								<div class="grid gap-2">
									<Label>Ad Copy Templates</Label>
									<div class="space-y-2">
										<div class="rounded-md border border-gray-200 p-3">
											<div class="flex items-center justify-between">
												<h4 class="font-medium">Weekend Special Template</h4>
												<Button variant="ghost" size="sm">Edit</Button>
											</div>
											<p class="mt-2 text-sm text-gray-600">
												"Enjoy our weekend special! [DEAL_DETAILS] at [RESTAURANT_NAME]. Valid
												[DAYS_VALID]. #foodie #weekend"
											</p>
										</div>

										<div class="rounded-md border border-gray-200 p-3">
											<div class="flex items-center justify-between">
												<h4 class="font-medium">Limited Time Offer Template</h4>
												<Button variant="ghost" size="sm">Edit</Button>
											</div>
											<p class="mt-2 text-sm text-gray-600">
												"Limited time offer! [OFFER_DETAILS] - only at [RESTAURANT_NAME]. Don't miss
												out! #limitedtime #special"
											</p>
										</div>

										<Button variant="outline" class="w-full">
											<Tag class="mr-2 h-4 w-4" />
											Add New Template
										</Button>
									</div>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-between">
							<Button type="submit" variant="outline">Cancel</Button>
							<Button type="submit">Save Changes</Button>
						</Card.Footer>
					</Card.Root>
				</form>
			</Tabs.Content>

			<!-- Audience Tab -->
			<Tabs.Content value="audience" class="py-4">
				<form on:submit|preventDefault={handlePlatformSubmit} class="space-y-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center gap-2">
								<Users class="h-5 w-5 text-gray-500" />
								Audience Targeting
							</Card.Title>
							<Card.Description>Define who should see your ads on this platform.</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="grid gap-4">
								<div class="grid gap-2">
									<Label for="audience-segment">Primary Audience</Label>
									<Select.Root value={platformSettings.audience}>
										<Select.Trigger id="audience-segment" class="w-full">
											<Select.Value placeholder="Select audience segment" />
										</Select.Trigger>
										<Select.Content>
											{#each audienceOptions as option}
												<Select.Item value={option.value}>{option.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="grid gap-2">
									<Label>Location Targeting</Label>
									<div class="rounded-md border border-gray-200 p-3">
										<div class="flex items-center space-x-2">
											<input type="radio" id="location-restaurant" name="location" checked={true} />
											<Label for="location-restaurant" class="cursor-pointer text-sm font-normal">
												Restaurant Location (5 mile radius)
											</Label>
										</div>
									</div>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				</form></Tabs.Content
			>
		</Tabs.Root>
	</div>
{/if}
