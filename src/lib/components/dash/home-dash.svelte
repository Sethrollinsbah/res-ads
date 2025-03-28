<script>
	import { onMount } from 'svelte';
	import {
		Calendar,
		Map,
		TrendingUp,
		Users,
		DollarSign,
		Utensils,
		Phone,
		Clock,
		Filter,
		Download,
		ArrowUpRight,
		Clipboard,
		ChevronDown
	} from 'lucide-svelte';
	import { Chart, registerables } from 'chart.js';

	// Register Chart.js components
	Chart.register(...registerables);

	// Date range state
	let dateRange = 'Last 14 Days';

	// Dashboard ref elements for charts
	let performanceChartEl;
	let conversionChartEl;
	let audienceChartEl;
	let sparklineEls = [null, null, null, null];

	// Charts instances
	let performanceChart;
	let conversionChart;
	let audienceChart;
	let sparklineCharts = [];

	// Sample data
	const performanceData = [
		{ name: 'Mar 1', impressions: 1200, clicks: 78, spend: 15 },
		{ name: 'Mar 2', impressions: 1320, clicks: 85, spend: 16.2 },
		{ name: 'Mar 3', impressions: 1450, clicks: 94, spend: 17.8 },
		{ name: 'Mar 4', impressions: 1390, clicks: 90, spend: 17.1 },
		{ name: 'Mar 5', impressions: 1520, clicks: 98, spend: 18.7 },
		{ name: 'Mar 6', impressions: 1650, clicks: 107, spend: 20.2 },
		{ name: 'Mar 7', impressions: 1700, clicks: 110, spend: 20.9 },
		{ name: 'Mar 8', impressions: 1580, clicks: 102, spend: 19.4 },
		{ name: 'Mar 9', impressions: 1620, clicks: 105, spend: 19.9 },
		{ name: 'Mar 10', impressions: 1720, clicks: 111, spend: 21.1 },
		{ name: 'Mar 11', impressions: 1810, clicks: 117, spend: 22.3 },
		{ name: 'Mar 12', impressions: 1890, clicks: 122, spend: 23.2 },
		{ name: 'Mar 13', impressions: 1930, clicks: 125, spend: 23.7 },
		{ name: 'Mar 14', impressions: 1760, clicks: 114, spend: 21.6 }
	];

	// Summary data
	const summaryCards = [
		{
			title: 'Total Impressions',
			value: '23,970',
			change: '+12.3%',
			icon: Users,
			iconColor: 'text-blue-500',
			chartData: performanceData.map((item) => item.impressions),
			lineColor: '#10b981',
			isNegative: false
		},
		{
			title: 'Total Clicks',
			value: '1,548',
			change: '+8.7%',
			icon: TrendingUp,
			iconColor: 'text-green-500',
			chartData: performanceData.map((item) => item.clicks),
			lineColor: '#10b981',
			isNegative: false
		},
		{
			title: 'CTR',
			value: '6.45%',
			change: '-0.2%',
			icon: ArrowUpRight,
			iconColor: 'text-amber-500',
			chartData: performanceData.map((item) => (item.clicks / item.impressions) * 100),
			lineColor: '#ef4444',
			isNegative: true
		},
		{
			title: 'Total Spend',
			value: '$294.40',
			change: '+4.1%',
			icon: DollarSign,
			iconColor: 'text-red-500',
			chartData: performanceData.map((item) => item.spend),
			lineColor: '#10b981',
			isNegative: false
		}
	];

	const conversionData = [
		{ name: 'Phone Calls', value: 42, color: '#ef4444' },
		{ name: 'Directions', value: 28, color: '#3b82f6' },
		{ name: 'Online Orders', value: 67, color: '#fbbf24' },
		{ name: 'Reservations', value: 53, color: '#10b981' }
	];

	const audienceData = [
		{ name: 'Local Residents', value: 55 },
		{ name: 'Tourists', value: 20 },
		{ name: 'Work Lunch', value: 15 },
		{ name: 'Special Occasions', value: 10 }
	];

	const campaignPerformance = [
		{
			name: 'Weekend Special',
			impressions: 12500,
			clicks: 625,
			ctr: 5.0,
			conversions: 94,
			cost: 154
		},
		{ name: 'Lunch Deal', impressions: 9800, clicks: 490, ctr: 5.0, conversions: 73, cost: 121 },
		{ name: 'Happy Hour', impressions: 8200, clicks: 574, ctr: 7.0, conversions: 115, cost: 101 },
		{
			name: 'Dinner for Two',
			impressions: 10300,
			clicks: 515,
			ctr: 5.0,
			conversions: 77,
			cost: 127
		}
	];

	onMount(() => {
		// Initialize the performance chart
		performanceChart = new Chart(performanceChartEl, {
			type: 'line',
			data: {
				labels: performanceData.map((d) => d.name),
				datasets: [
					{
						label: 'Impressions',
						data: performanceData.map((d) => d.impressions),
						borderColor: '#3b82f6',
						backgroundColor: 'rgba(59, 130, 246, 0.1)',
						borderWidth: 2,
						tension: 0.3,
						yAxisID: 'y'
					},
					{
						label: 'Clicks',
						data: performanceData.map((d) => d.clicks),
						borderColor: '#ef4444',
						backgroundColor: 'rgba(239, 68, 68, 0.1)',
						borderWidth: 2,
						tension: 0.3,
						yAxisID: 'y1'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					mode: 'index',
					intersect: false
				},
				scales: {
					y: {
						type: 'linear',
						display: true,
						position: 'left',
						title: {
							display: true,
							text: 'Impressions'
						}
					},
					y1: {
						type: 'linear',
						display: true,
						position: 'right',
						grid: {
							drawOnChartArea: false
						},
						title: {
							display: true,
							text: 'Clicks'
						}
					}
				}
			}
		});

		// Initialize the conversion chart (pie)
		conversionChart = new Chart(conversionChartEl, {
			type: 'pie',
			data: {
				labels: conversionData.map((d) => d.name),
				datasets: [
					{
						data: conversionData.map((d) => d.value),
						backgroundColor: conversionData.map((d) => d.color),
						borderWidth: 1,
						borderColor: '#fff'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'bottom'
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
								const value = context.raw;
								const percentage = Math.round((value / total) * 100);
								return `${context.label}: ${value} (${percentage}%)`;
							}
						}
					}
				}
			}
		});

		// Initialize the audience chart (horizontal bar)
		audienceChart = new Chart(audienceChartEl, {
			type: 'bar',
			data: {
				labels: audienceData.map((d) => d.name),
				datasets: [
					{
						label: 'Audience Breakdown',
						data: audienceData.map((d) => d.value),
						backgroundColor: '#ef4444',
						borderColor: '#b91c1c',
						borderWidth: 1
					}
				]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Percentage'
						}
					}
				}
			}
		});

		// Initialize sparkline charts
		summaryCards.forEach((card, index) => {
			if (sparklineEls[index]) {
				sparklineCharts[index] = new Chart(sparklineEls[index], {
					type: 'line',
					data: {
						labels: [...Array(card.chartData.length).keys()].map(String),
						datasets: [
							{
								data: card.chartData,
								borderColor: card.lineColor,
								backgroundColor: 'transparent',
								borderWidth: 2,
								pointRadius: 0,
								tension: 0.4
							}
						]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: { display: false },
							tooltip: { enabled: false }
						},
						scales: {
							x: { display: false },
							y: { display: false }
						},
						elements: {
							line: { tension: 0.4 }
						}
					}
				});
			}
		});
	});
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<!-- Navigation Header -->
	<header class="border-b border-gray-200 bg-white shadow-sm">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
			<div class="flex items-center gap-3">
				<div
					class="rounded-lg border-2 border-black bg-red-500 px-2 py-1 font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
				>
					ResAds
				</div>
				<h1 class="text-xl font-bold">Restaurant Dashboard</h1>
			</div>

			<div class="flex items-center gap-4">
				<div
					class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
				>
					<Calendar class="h-4 w-4 text-gray-500" />
					<span>{dateRange}</span>
					<ChevronDown class="h-4 w-4 text-gray-500" />
				</div>
				<div class="rounded-full bg-red-100 p-2 text-red-600">
					<Clipboard class="h-5 w-5" />
				</div>
				<div class="h-8 w-8 rounded-full bg-gray-200"></div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 py-6">
		<div class="mx-auto max-w-7xl px-4">
			<!-- Summary Cards -->
			<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each summaryCards as card, i}
					<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
						<div class="mb-2 flex items-center justify-between">
							<span class="text-sm font-medium text-gray-500">{card.title}</span>
							<svelte:component this={card.icon} class="h-5 w-5 {card.iconColor}" />
						</div>
						<div class="mb-2 flex items-baseline">
							<span class="text-2xl font-bold">{card.value}</span>
							<span
								class={`ml-2 text-xs font-medium ${card.isNegative ? 'text-red-500' : 'text-green-500'}`}
							>
								{card.change}
							</span>
						</div>
						<div class="h-10">
							<canvas bind:this={sparklineEls[i]}></canvas>
						</div>
					</div>
				{/each}
			</div>

			<!-- Performance Chart -->
			<div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div class="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h2 class="text-lg font-bold">Campaign Performance</h2>
						<div class="flex items-center gap-2">
							<button
								class="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-sm text-gray-600"
							>
								<Filter class="h-3 w-3" />
								<span>Filter</span>
							</button>
							<button
								class="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-sm text-gray-600"
							>
								<Download class="h-3 w-3" />
								<span>Export</span>
							</button>
						</div>
					</div>
					<div class="h-64">
						<canvas bind:this={performanceChartEl}></canvas>
					</div>
				</div>

				<!-- Conversion Metrics -->
				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h2 class="mb-4 text-lg font-bold">Conversion Actions</h2>
					<div class="mb-4 h-48">
						<canvas bind:this={conversionChartEl}></canvas>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<div class="rounded-lg bg-gray-50 p-3 text-center">
							<div class="flex items-center justify-center">
								<Phone class="mr-1 h-4 w-4 text-red-500" />
								<span class="text-sm font-semibold">42 Calls</span>
							</div>
						</div>
						<div class="rounded-lg bg-gray-50 p-3 text-center">
							<div class="flex items-center justify-center">
								<Map class="mr-1 h-4 w-4 text-blue-500" />
								<span class="text-sm font-semibold">28 Directions</span>
							</div>
						</div>
						<div class="rounded-lg bg-gray-50 p-3 text-center">
							<div class="flex items-center justify-center">
								<Utensils class="mr-1 h-4 w-4 text-amber-500" />
								<span class="text-sm font-semibold">67 Orders</span>
							</div>
						</div>
						<div class="rounded-lg bg-gray-50 p-3 text-center">
							<div class="flex items-center justify-center">
								<Clock class="mr-1 h-4 w-4 text-green-500" />
								<span class="text-sm font-semibold">53 Reservations</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Campaign Table & Audience -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div class="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h2 class="mb-4 text-lg font-bold">Campaign Breakdown</h2>
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th
										class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Campaign
									</th>
									<th
										class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Impressions
									</th>
									<th
										class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Clicks
									</th>
									<th
										class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										CTR
									</th>
									<th
										class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Conversions
									</th>
									<th
										class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										Cost
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200">
								{#each campaignPerformance as campaign, index}
									<tr class={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
										<td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
											{campaign.name}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{campaign.impressions.toLocaleString()}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{campaign.clicks.toLocaleString()}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{campaign.ctr.toFixed(1)}%
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{campaign.conversions}
										</td>
										<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											${campaign.cost}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<h2 class="mb-4 text-lg font-bold">Audience Breakdown</h2>
					<div class="mb-4 h-48">
						<canvas bind:this={audienceChartEl}></canvas>
					</div>
					<div class="rounded-lg bg-gray-50 p-3">
						<h3 class="mb-2 text-sm font-semibold">Audience Insights</h3>
						<p class="text-xs text-gray-600">
							Most of your ad clicks come from local residents within 5 miles of your restaurant,
							primarily on weekends and during dinner hours.
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
