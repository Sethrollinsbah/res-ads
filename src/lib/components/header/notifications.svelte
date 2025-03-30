<script>
	import {
		Bell,
		Check,
		X,
		Calendar,
		TrendingUp,
		AlertCircle,
		Info,
		ShoppingBag
	} from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import * as Popover from '../ui/popover';
	import { Badge } from '../ui/badge';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';

	// Example notifications data for a restaurant marketing dashboard
	const notifications = [
		{
			id: 1,
			title: 'Weekend Campaign Performance',
			message:
				'Your weekend special campaign is performing 15% above average. Consider increasing budget allocation.',
			time: '10 minutes ago',
			type: 'success',
			read: false,
			icon: TrendingUp
		},
		{
			id: 2,
			title: 'Scheduled Campaign Starting Soon',
			message: "Your 'Happy Hour Promotion' campaign will go live tomorrow at 10:00 AM.",
			time: '25 minutes ago',
			type: 'info',
			read: false,
			icon: Calendar
		},
		{
			id: 3,
			title: 'Budget Alert',
			message:
				'Your Facebook Ads platform has reached 80% of its allocated budget. Review performance metrics.',
			time: '1 hour ago',
			type: 'warning',
			read: false,
			icon: AlertCircle
		},
		{
			id: 4,
			title: 'New Customer Data Available',
			message: '112 new customer records have been added to your database from recent orders.',
			time: '3 hours ago',
			type: 'info',
			read: true,
			icon: Info
		},
		{
			id: 5,
			title: 'Email Campaign Delivered',
			message: "Your 'Tuesday Taco Special' email was successfully delivered to 2,458 subscribers.",
			time: '5 hours ago',
			type: 'success',
			read: true,
			icon: ShoppingBag
		}
	];

	// State variables
	let isOpen = false;
	let unreadCount = $state(notifications.filter((n) => !n.read).length);
	let activeNotifications = $state(notifications);

	// Mark notification as read
	function markAsRead(id) {
		activeNotifications = activeNotifications.map((notification) => {
			if (notification.id === id && !notification.read) {
				unreadCount--;
				return { ...notification, read: true };
			}
			return notification;
		});
	}

	// Dismiss notification
	function dismissNotification(id) {
		const notification = activeNotifications.find((n) => n.id === id);
		if (notification && !notification.read) {
			unreadCount--;
		}
		activeNotifications = activeNotifications.filter((notification) => notification.id !== id);
	}

	// Mark all as read
	function markAllAsRead() {
		activeNotifications = activeNotifications.map((notification) => ({
			...notification,
			read: true
		}));
		unreadCount = 0;
	}

	// For demo purposes, add a new notification periodically
	onMount(() => {
		const interval = setInterval(() => {
			if (Math.random() > 0.7 && activeNotifications.length < 8) {
				const newId = Math.max(...activeNotifications.map((n) => n.id)) + 1;
				const newNotification = {
					id: newId,
					title: 'New Menu Item Performance',
					message: 'Your new Seasonal Burger is generating 23% more revenue than other menu items.',
					time: 'Just now',
					type: 'success',
					read: false,
					icon: TrendingUp
				};

				activeNotifications = [newNotification, ...activeNotifications];
				unreadCount++;
			}
		}, 30000); // Every 30 seconds

		return () => clearInterval(interval);
	});

	// Notification type styling
	function getTypeStyles(type) {
		switch (type) {
			case 'success':
				return {
					bg: 'bg-green-50',
					border: 'border-green-200',
					icon: 'text-green-500',
					iconBg: 'bg-green-100'
				};
			case 'warning':
				return {
					bg: 'bg-amber-50',
					border: 'border-amber-200',
					icon: 'text-amber-500',
					iconBg: 'bg-amber-100'
				};
			case 'error':
				return {
					bg: 'bg-red-50',
					border: 'border-red-200',
					icon: 'text-red-500',
					iconBg: 'bg-red-100'
				};
			case 'info':
			default:
				return {
					bg: 'bg-blue-50',
					border: 'border-blue-200',
					icon: 'text-blue-500',
					iconBg: 'bg-blue-100'
				};
		}
	}
</script>

<div class="relative">
	<Popover.Root portal={null} bind:open={isOpen}>
		<Popover.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" variant="ghost" on:click={() => (isOpen = !isOpen)}>
				<Bell class="h-5 w-5" />
				{#if unreadCount > 0}
					<span
						class="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
						>{unreadCount}</span
					>
				{/if}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-80 p-0">
			<div class="flex items-center justify-between border-b p-3">
				<h4 class="text-sm font-semibold">Notifications</h4>
				{#if unreadCount > 0}
					<Button variant="ghost" size="sm" class="h-8 text-xs" on:click={markAllAsRead}>
						Mark all as read
					</Button>
				{/if}
			</div>
			<div class="max-h-[calc(80vh-8rem)] overflow-y-auto">
				{#if activeNotifications.length === 0}
					<div class="flex flex-col items-center justify-center p-6 text-center">
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
							<Bell class="h-6 w-6 text-gray-400" />
						</div>
						<h3 class="mt-3 text-sm font-medium">No notifications</h3>
						<p class="mt-1 text-xs text-gray-500">You're all caught up!</p>
					</div>
				{:else}
					<div class="divide-y">
						{#each activeNotifications as notification (notification.id)}
							{@const styles = getTypeStyles(notification.type)}
							<div
								class={cn(
									'group relative p-4 transition-colors hover:bg-gray-50',
									notification.read ? '' : styles.bg
								)}
								on:mouseenter={() => markAsRead(notification.id)}
							>
								<div class="flex gap-3">
									<div
										class={cn(
											'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full',
											styles.iconBg
										)}
									>
										<svelte:component this={notification.icon} class={cn('h-5 w-5', styles.icon)} />
									</div>
									<div class="flex-1 overflow-hidden">
										<div class="flex items-start justify-between gap-2">
											<p class="truncate text-sm font-medium">{notification.title}</p>
											<button
												class="opacity-0 transition-opacity group-hover:opacity-100"
												on:click={() => dismissNotification(notification.id)}
											>
												<X class="h-4 w-4 text-gray-400 hover:text-gray-600" />
											</button>
										</div>
										<p class="mt-1 line-clamp-2 text-xs text-gray-600">{notification.message}</p>
										<p class="mt-1 text-xs text-gray-400">{notification.time}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div class="border-t p-3 text-center">
				<a
					href="/dash/settings/notifications"
					class="text-xs font-medium text-blue-500 hover:text-blue-700">View all notifications</a
				>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
