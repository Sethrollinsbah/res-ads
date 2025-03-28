<!-- src/routes/dash/+layout.svelte -->
<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		Menu,
		X,
		Home,
		BarChart3,
		Settings,
		FileText,
		PlusCircle,
		Bell,
		User,
		HelpCircle,
		LogOut
	} from 'lucide-svelte';
	import Logo from '$lib/components/logo.svelte';
	import { cn } from '$lib/utils';

	// Sidebar state
	let sidebarOpen = $state(false);
	let windowWidth = $state(0);
	const isMobile = () => windowWidth < 768;

	// Defines if sidebar should be shown over content instead of pushing content
	$effect(() => {
		overlayMode = isMobile() && sidebarOpen;
	});
	let overlayMode = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	const closeSidebar = () => {
		if (isMobile()) {
			sidebarOpen = false;
		}
	};

	// Navigation items
	const navigationItems = [
		{ icon: Home, label: 'Dashboard', href: '/dash' },
		{ icon: BarChart3, label: 'Analytics', href: '/dash/analytics' },
		{ icon: PlusCircle, label: 'New Campaign', href: '/dash/new' },
		{ icon: FileText, label: 'Campaigns', href: '/dash/campaigns' },
		{ icon: Settings, label: 'Settings', href: '/dash/settings' }
	];

	onMount(() => {
		windowWidth = window.innerWidth;
		const handleResize = () => {
			windowWidth = window.innerWidth;
			if (windowWidth >= 768) {
				// Reset sidebar state on large screens
				sidebarOpen = false;
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// Extract props for the slot
	let { data, children } = $props();
</script>

<svelte:window bind:innerWidth={windowWidth} />

<!-- Overlay backdrop for mobile -->
{#if overlayMode}
	<div
		class="fixed inset-0 z-20 bg-black/50"
		on:click={toggleSidebar}
		transition:fade={{ duration: 200 }}
	></div>
{/if}

<div class="flex h-screen w-full bg-gray-50">
	<!-- Sidebar -->
	<aside
		class={cn(
			'fixed inset-y-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out',
			overlayMode ? 'left-0' : sidebarOpen ? 'left-0' : '-left-64',
			isMobile() ? 'w-full md:w-64' : 'w-64'
		)}
	>
		<!-- Mobile close button -->
		{#if isMobile()}
			<button
				class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 md:hidden"
				on:click={toggleSidebar}
			>
				<X class="h-6 w-6" />
			</button>
		{/if}

		<!-- Sidebar header -->
		<div class="flex h-16 items-center border-b border-gray-200 px-6">
			<Logo scale="scale-50" />
		</div>

		<!-- Navigation links -->
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
	</aside>

	<!-- Main content container -->
	<div
		class={cn(
			'flex flex-1 flex-col transition-all duration-300 ease-in-out',
			!isMobile() && sidebarOpen ? 'ml-64' : 'ml-0'
		)}
	>
		<!-- Header -->
		<header
			class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6"
		>
			<div class="flex items-center">
				<button
					class="mr-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100"
					on:click={toggleSidebar}
					aria-label="Toggle navigation menu"
				>
					<Menu class="h-6 w-6" />
				</button>
				<h1 class="hidden text-xl font-semibold md:block">Restaurant Ad Dashboard</h1>
			</div>

			<div class="flex items-center space-x-3">
				<button class="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
					<Bell class="h-5 w-5" />
					<span class="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
				</button>
				<div class="flex items-center space-x-2">
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
						<User class="h-5 w-5 text-gray-500" />
					</div>
					<span class="hidden text-sm font-medium md:inline">Restaurant Owner</span>
				</div>
			</div>
		</header>

		<!-- Page content -->
		<main class="flex-1 overflow-auto">
			{@render children()}
		</main>
	</div>
</div>
