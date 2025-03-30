<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Bell,
		X,
		Check,
		Settings,
		TrendingUp,
		AlertTriangle,
		Info,
		MessageSquare,
		Calendar,
		Filter,
		ChevronRight
	} from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils';

	// Define the notification type
	interface Notification {
		id: number;
		title: string;
		message: string;
		time: string;
		type: 'success' | 'warning' | 'info' | 'error';
		read: boolean;
		icon?: any;
		actionText?: string;
		actionLink?: string;
	}

	// Sample notifications data
	let notifications = $state<Notification[]>([
		{
			id: 1,
			title: 'Weekend Campaign Performance',
			message:
				'Your weekend special campaign is performing 15% above average. Consider increasing budget allocation.',
			time: '10 minutes ago',
			type: 'success',
			read: false,
			icon: TrendingUp,
			actionText: 'View Campaign',
			actionLink: '#/campaign/weekend-special'
		},
		{
			id: 2,
			title: 'Budget Alert',
			message:
				'Instagram ads campaign has reached 80% of allocated budget. Review spending or increase budget.',
			time: '1 hour ago',
			type: 'warning',
			read: false,
			icon: AlertTriangle,
			actionText: 'Adjust Budget',
			actionLink: '#/settings/budget'
		},
		{
			id: 3,
			title: 'New Feature Available',
			message: 'Try our new audience segmentation tool for better targeting and improved ROI.',
			time: 'Yesterday',
			type: 'info',
			read: true,
			icon: Info,
			actionText: 'Explore Feature',
			actionLink: '#/features/segmentation'
		},
		{
			id: 4,
			title: 'Campaign Ended',
			message:
				"Your 'Summer Special' campaign has ended. View the performance report to analyze results.",
			time: '3 days ago',
			type: 'info',
			read: true,
			icon: Info,
			actionText: 'View Report',
			actionLink: '#/reports/summer-special'
		},
		{
			id: 5,
			title: 'Customer Feedback',
			message:
				'3 new reviews from customers who mentioned your recent promotion. Overall sentiment is positive.',
			time: '1 week ago',
			type: 'success',
			read: true,
			icon: MessageSquare,
			actionText: 'Read Reviews',
			actionLink: '#/reviews'
		}
	]);

	// Animation settings
	let animationDelay = 50; // ms between items

	// Filter state
	let activeFilter = $state('all');

	// Filtered notifications based on active filter
	let filteredNotifications = $derived(
		activeFilter === 'all'
			? notifications
			: activeFilter === 'unread'
				? notifications.filter((n) => !n.read)
				: notifications.filter((n) => n.type === activeFilter)
	);

	// Count of unread notifications
	let unreadCount = $derived(notifications.filter((n) => !n.read).length);

	// Mark a single notification as read
	function markAsRead(id: number) {
		notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
	}

	// Mark all notifications as read
	function markAllAsRead() {
		notifications = notifications.map((n) => ({ ...n, read: true }));
	}

	// Delete a notification
	function deleteNotification(id: number, event?: Event) {
		if (event) event.stopPropagation();
		notifications = notifications.filter((n) => n.id !== id);
	}

	// Clear all notifications
	function clearAllNotifications() {
		if (confirm('Are you sure you want to clear all notifications?')) {
			notifications = [];
		}
	}

	// Get appropriate icon based on notification type
	function getIconComponent(type: string, customIcon?: any) {
		if (customIcon) return customIcon;

		switch (type) {
			case 'success':
				return Check;
			case 'warning':
				return AlertTriangle;
			case 'info':
				return Info;
			case 'error':
				return X;
			default:
				return Bell;
		}
	}

	// Get appropriate color based on notification type
	function getTypeColor(type: string) {
		switch (type) {
			case 'success':
				return 'bg-gradient-to-br from-green-50 to-green-100 text-green-700 border-green-300';
			case 'warning':
				return 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border-amber-300';
			case 'info':
				return 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-300';
			case 'error':
				return 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-red-300';
			default:
				return 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border-gray-300';
		}
	}

	// Get appropriate ring color based on notification type for hover states
	function getRingColor(type: string) {
		switch (type) {
			case 'success':
				return 'hover:ring-green-200';
			case 'warning':
				return 'hover:ring-amber-200';
			case 'info':
				return 'hover:ring-blue-200';
			case 'error':
				return 'hover:ring-red-200';
			default:
				return 'hover:ring-gray-200';
		}
	}

	// Format time to be more readable
	function formatTime(timeString: string): string {
		return timeString;
	}

	// Navigation function
	function navigateToAction(link: string) {
		// In a real app, this would navigate to the link
		console.log('Navigating to:', link);
	}

	let dateRange = 'Last 7 Days';
</script>

<div class="flex min-h-[calc(100dvh-4rem)] flex-col bg-gradient-to-br from-gray-50 to-gray-100">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
		<div class="mx-auto flex max-w-4xl items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
					<Bell class="h-5 w-5 text-red-600" />
				</div>
				<div>
					<h1 class="text-2xl font-bold">Notifications</h1>
					<p class="text-sm text-gray-500">Stay updated on your campaigns and activities</p>
				</div>
				{#if unreadCount > 0}
					<Badge variant="destructive" class="ml-2 animate-pulse">{unreadCount} unread</Badge>
				{/if}
			</div>

			<div class="flex items-center gap-3">
				<div
					class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
				>
					<Calendar class="h-4 w-4 text-gray-500" />
					<span>{dateRange}</span>
				</div>

				<Button
					variant="outline"
					size="sm"
					class="flex items-center gap-1 border-dashed"
					on:click={markAllAsRead}
				>
					<Check class="h-4 w-4 text-green-600" />
					<span class="hidden sm:inline">Mark all read</span>
				</Button>

				<Button
					variant="outline"
					size="sm"
					class="flex items-center gap-1 border-dashed"
					on:click={clearAllNotifications}
				>
					<X class="h-4 w-4 text-red-500" />
					<span class="hidden sm:inline">Clear all</span>
				</Button>

				<Button
					variant="ghost"
					size="icon"
					class="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
				>
					<Settings class="h-5 w-5" />
				</Button>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 py-8">
		<div class="mx-auto max-w-4xl px-4">
			<!-- Filters -->
			<div class="mb-6 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
				<Tabs.Root value={activeFilter} class="w-full">
					<Tabs.List class="grid w-full grid-cols-5">
						<Tabs.Trigger
							value="all"
							class="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-50 data-[state=active]:to-gray-100 data-[state=active]:font-semibold"
							on:click={() => (activeFilter = 'all')}
						>
							<span class="flex items-center gap-1.5">
								<Bell class="h-4 w-4" />
								<span>All</span>
							</span>
							<Badge variant="outline" class="ml-1 bg-gray-50">{notifications.length}</Badge>
						</Tabs.Trigger>
						<Tabs.Trigger
							value="unread"
							class="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-50 data-[state=active]:to-gray-100 data-[state=active]:font-semibold"
							on:click={() => (activeFilter = 'unread')}
						>
							<span class="flex items-center gap-1.5">
								<span class="relative">
									<Bell class="h-4 w-4" />
									{#if unreadCount > 0}
										<span class="absolute -right-1 -top-1 flex h-2 w-2">
											<span
												class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"
											></span>
											<span class="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
										</span>
									{/if}
								</span>
								<span>Unread</span>
							</span>
							{#if unreadCount > 0}
								<Badge variant="outline" class="ml-1 bg-blue-50 text-blue-700">{unreadCount}</Badge>
							{/if}
						</Tabs.Trigger>
						<Tabs.Trigger
							value="success"
							class="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-green-50 data-[state=active]:to-green-100 data-[state=active]:font-semibold"
							on:click={() => (activeFilter = 'success')}
						>
							<span class="flex items-center gap-1.5">
								<Check class="h-4 w-4 text-green-600" />
								<span>Success</span>
							</span>
							<Badge variant="outline" class="ml-1 bg-green-50 text-green-700"
								>{notifications.filter((n) => n.type === 'success').length}</Badge
							>
						</Tabs.Trigger>
						<Tabs.Trigger
							value="warning"
							class="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-amber-50 data-[state=active]:to-amber-100 data-[state=active]:font-semibold"
							on:click={() => (activeFilter = 'warning')}
						>
							<span class="flex items-center gap-1.5">
								<AlertTriangle class="h-4 w-4 text-amber-600" />
								<span>Alerts</span>
							</span>
							<Badge variant="outline" class="ml-1 bg-amber-50 text-amber-700"
								>{notifications.filter((n) => n.type === 'warning').length}</Badge
							>
						</Tabs.Trigger>
						<Tabs.Trigger
							value="info"
							class="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-50 data-[state=active]:to-blue-100 data-[state=active]:font-semibold"
							on:click={() => (activeFilter = 'info')}
						>
							<span class="flex items-center gap-1.5">
								<Info class="h-4 w-4 text-blue-600" />
								<span>Info</span>
							</span>
							<Badge variant="outline" class="ml-1 bg-blue-50 text-blue-700"
								>{notifications.filter((n) => n.type === 'info').length}</Badge
							>
						</Tabs.Trigger>
					</Tabs.List>
				</Tabs.Root>
			</div>

			<!-- Notifications List -->
			{#if filteredNotifications.length === 0}
				<div
					class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 shadow-sm"
				>
					<div class="rounded-full bg-gray-100 p-4">
						<Bell class="h-10 w-10 text-gray-400" />
					</div>
					<h2 class="mt-4 text-xl font-semibold text-gray-700">No notifications</h2>
					<p class="mt-2 max-w-md text-center text-sm text-gray-500">
						{activeFilter === 'all'
							? "You don't have any notifications yet. We'll notify you when there are updates about your campaigns or important events."
							: `You don't have any ${activeFilter === 'unread' ? 'unread' : activeFilter} notifications at the moment.`}
					</p>
				</div>
			{:else}
				<div class="space-y-4">
					{#each filteredNotifications as notification, i}
						<div
							class="transform transition-all duration-200"
							style="animation: fadeIn 0.3s ease-in-out forwards; animation-delay: {i *
								animationDelay}ms;"
						>
							<Card.Root
								class={cn(
									'group relative overflow-hidden rounded-xl border transition-all duration-200',
									!notification.read
										? 'border-l-[6px] border-l-blue-500 bg-white shadow-md hover:shadow-lg'
										: 'border-gray-200 bg-white hover:shadow-md',
									getRingColor(notification.type),
									'cursor-pointer hover:ring-2 hover:ring-offset-1'
								)}
								onclick={() => navigateToAction(notification.actionLink || '#')}
							>
								{#if !notification.read}
									<div
										class="absolute -left-10 top-0 h-full w-40 animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
									></div>
								{/if}

								<Card.Content class="p-0">
									<div class="flex p-4 md:p-5">
										<div
											class={cn(
												'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full shadow-inner',
												getTypeColor(notification.type)
											)}
										>
											<svelte:component
												this={getIconComponent(notification.type, notification.icon)}
												class="h-6 w-6"
											/>
										</div>

										<div class="ml-4 flex-1">
											<div class="flex flex-col md:flex-row md:items-start md:justify-between">
												<div class="flex-1">
													<div class="flex items-start gap-2">
														<h3
															class={cn(
																'text-base font-bold',
																!notification.read ? 'text-gray-900' : 'text-gray-700'
															)}
														>
															{notification.title}
														</h3>
														{#if !notification.read}
															<Badge
																variant="outline"
																class="mt-0.5 border-blue-200 bg-blue-50 px-2 py-0 text-[10px] text-blue-700"
																>NEW</Badge
															>
														{/if}
													</div>
													<p class="mt-1 text-sm text-gray-600">
														{notification.message}
													</p>
												</div>
												<div class="mt-2 text-xs text-gray-500 md:ml-4 md:mt-0 md:text-right">
													<div class="flex items-center md:justify-end">
														<Calendar class="mr-1.5 h-3 w-3" />
														{formatTime(notification.time)}
													</div>
												</div>
											</div>

											<div
												class="mt-3 flex flex-wrap justify-between border-t border-dashed border-gray-100 pt-3"
											>
												{#if notification.actionText}
													<Button
														variant="outline"
														size="sm"
														class="h-8 rounded-full border-blue-200 bg-transparent text-xs font-medium text-blue-700 hover:bg-blue-50"
													>
														{notification.actionText}
														<ChevronRight class="ml-1 h-3 w-3" />
													</Button>
												{/if}

												<div class="flex gap-1">
													{#if !notification.read}
														<Button
															variant="ghost"
															size="sm"
															class="h-8 rounded-full text-xs hover:bg-green-50 hover:text-green-700"
															on:click={(e) => {
																e.stopPropagation();
																markAsRead(notification.id);
															}}
														>
															<Check class="mr-1 h-3 w-3" />
															Mark as read
														</Button>
													{/if}
													<Button
														variant="ghost"
														size="sm"
														class="h-8 rounded-full text-xs text-gray-500 hover:bg-red-50 hover:text-red-700"
														on:click={(e) => deleteNotification(notification.id, e)}
													>
														<X class="mr-1 h-3 w-3" />
														Dismiss
													</Button>
												</div>
											</div>
										</div>
									</div>
								</Card.Content>
							</Card.Root>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shine {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>

