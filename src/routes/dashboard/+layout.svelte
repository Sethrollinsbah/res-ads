<script lang="ts">
	import '../../app.css';

	import {
		LayoutGrid,
		Menu,
		BarChart3,
		PlusCircle,
		FileText,
		Settings,
		HelpCircle,
		LogOut,
		Bell,
		User
	} from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import Logo from '$lib/components/logo.svelte';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as DropdownMenu from '@/lib/components/ui/dropdown-menu';
	import Notifications from '@/lib/components/header/notifications.svelte';
	import ProjectSwitcher from '@/lib/components/header/project-switcher.svelte';

	// Navigation state
	let sidebarOpen = $state(false);
	let windowWidth = $state(0);

	// Computed state
	const isMobile = $derived(windowWidth < 768);
	let overlayMode = $state(false);

	// Navigation items
	const navigationItems = [
		{ icon: LayoutGrid, label: 'Dashboard', href: '/dash' },
		{ icon: BarChart3, label: 'Analytics', href: '/dash/analytics' },
		{ icon: PlusCircle, label: 'New Campaign', href: '/dash/new' },
		{ icon: FileText, label: 'Campaigns', href: '/dash/campaigns' },
		{ icon: Settings, label: 'Settings', href: '/dash/settings' }
	];

	// Window resize handling
	$effect(() => {
		const handleResize = () => {
			windowWidth = window.innerWidth;
			if (windowWidth >= 768) {
				sidebarOpen = false;
			} else {
				sidebarOpen = false;
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial call

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// Overlay mode effect
	$effect(() => {
		overlayMode = isMobile && sidebarOpen;
	});

	// Toggle sidebar
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		if (isMobile) {
			sidebarOpen = false;
		}
	}

	// Extract props for the slot
	let { data, children } = $props();
</script>

<svelte:window bind:innerWidth={windowWidth} />

<!-- Mobile Sheet Sidebar -->
<Sheet.Root bind:open={sidebarOpen}>
	<Sheet.Content side="left" class="w-64 p-0">
		<div class="flex h-full flex-col">
			<!-- Sidebar Header -->
			<div class="flex h-16 items-center border-b border-gray-200 px-6">
				<Logo scale="scale-50" />
			</div>

			<!-- Navigation Links -->
			<nav class="flex-1 overflow-y-auto px-4 py-6">
				<ul class="space-y-1">
					{#each navigationItems as item}
						<li>
							<a
								href={item.href}
								class="flex items-center rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
								on:click={closeSidebar}
							>
								<svelte:component this={item.icon} class="mr-3 h-5 w-5 text-gray-500" />
								<span>{item.label}</span>
							</a>
						</li>
					{/each}
				</ul>

				<div class="my-6 border-t border-gray-200"></div>

				<ul class="space-y-1">
					<li>
						<a
							href="/dash/help"
							class="flex items-center rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
							on:click={closeSidebar}
						>
							<HelpCircle class="mr-3 h-5 w-5 text-gray-500" />
							<span>Help & Support</span>
						</a>
					</li>
					<li>
						<a
							href="/auth/logout"
							class="flex items-center rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
							on:click={closeSidebar}
						>
							<LogOut class="mr-3 h-5 w-5 text-red-500" />
							<span>Log Out</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</Sheet.Content>
</Sheet.Root>

<!-- Overlay backdrop for mobile -->
{#if overlayMode}
	<div class="fixed inset-0 z-40 bg-black/50" on:click={toggleSidebar}></div>
{/if}

<div class="flex h-screen w-full bg-gray-50">
	<!-- Desktop Sidebar -->
	<aside
		class={cn(
			'fixed inset-y-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out md:flex',
			sidebarOpen ? 'left-0' : '-left-64'
		)}
	>
		<!-- Sidebar Header -->
		<div class="flex h-16 items-center border-b border-gray-200 px-6">
			<Logo scale="scale-50" />
		</div>

		<!-- Navigation Links -->
		<nav class="flex-1 overflow-y-auto px-4 py-6">
			<ul class="space-y-1">
				{#each navigationItems as item}
					<li>
						<a
							href={item.href}
							class="flex items-center rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
						>
							<svelte:component this={item.icon} class="mr-3 h-5 w-5 text-gray-500" />
							<span>{item.label}</span>
						</a>
					</li>
				{/each}
			</ul>

			<div class="my-6 border-t border-gray-200"></div>

			<ul class="space-y-1">
				<li>
					<a
						href="/dash/help"
						class="flex items-center rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
					>
						<HelpCircle class="mr-3 h-5 w-5 text-gray-500" />
						<span>Help & Support</span>
					</a>
				</li>
				<li>
					<a
						href="/auth/logout"
						class="flex items-center rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
					>
						<LogOut class="mr-3 h-5 w-5 text-red-500" />
						<span>Log Out</span>
					</a>
				</li>
			</ul>
		</nav>
	</aside>

	<!-- Main content container -->
	<div
		class={cn(
			'flex flex-1 flex-col transition-all duration-300 ease-in-out',
			sidebarOpen ? 'md:ml-64' : 'md:ml-0'
		)}
	>
		<!-- Header -->
		<header
			class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6"
		>
			<div class="flex items-center">
				<Button variant="ghost" size="icon" class="mr-2 " on:click={toggleSidebar}>
					<Menu class="h-6 w-6" />
				</Button>
				<a href="/projects" class="hidden text-sm font-light md:block">ResAds</a>
				<span class="mx-2 text-sm font-light">/</span>
				<ProjectSwitcher></ProjectSwitcher>
			</div>

			<div class="flex items-center space-x-3">
				<div></div>

				<Notifications></Notifications>
				<div class="relative flex items-center space-x-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="ghost" class="flex items-center space-x-2">
								<Avatar.Root>
									<Avatar.Fallback>
										<User class="h-5 w-5 text-gray-500" />
									</Avatar.Fallback>
								</Avatar.Root>
								<span class="hidden text-sm font-medium md:inline">Restaurant Owner</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<Settings class="mr-2 h-4 w-4" />
								<span>Profile Settings</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<HelpCircle class="mr-2 h-4 w-4" />
								<span>Help & Support</span>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item class="text-red-600">
								<LogOut class="mr-2 h-4 w-4" />
								<span>Logout</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</header>

		<!-- Page content -->
		<main class="flex-1 overflow-auto">
			{@render children()}
		</main>
	</div>
</div>
