<script lang="ts">
	import Logo from './logo.svelte';
	import { siteContent } from '$lib/data/site-content';
	import { createSmoothScrollHandler } from '$lib/utils/scroll';
	import { onMount } from 'svelte';

	let { isScrolled } = $props();

	const { hero, nav } = siteContent;

	// Initialize the scroll handler
	let handleNavClick: (e: MouseEvent) => void;

	onMount(() => {
		// Create a handler with 70px offset to account for the sticky header
		handleNavClick = createSmoothScrollHandler(70);
	});
</script>

<!-- Hero Section -->
<header class="relative overflow-hidden px-4 pb-20 pt-12 md:px-6 lg:px-8">
	<nav
		class="{isScrolled
			? 'fixed left-0 right-0 top-0 z-50 border-b-2 border-black bg-white px-4 py-4 shadow-md md:px-6 lg:px-8'
			: ''} mx-auto flex items-center justify-between py-6 transition-all duration-300"
	>
		<div class="flex items-center gap-3">
			<a
				href={'#main'}
				class="font-bold transition-colors hover:text-red-500"
				on:click={handleNavClick}
			>
				<Logo></Logo>
			</a>
		</div>
		<div class="hidden items-center gap-8 md:flex">
			{#each nav.links as link}
				<a
					href={link.href}
					class="font-bold transition-colors hover:text-red-500"
					on:click={handleNavClick}
				>
					{link.text}
				</a>
			{/each}
		</div>
		<div>
			<a
				href={nav.ctaButton.href}
				class="rounded-lg border-2 border-black bg-black px-6 py-3 font-bold text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
				on:click={handleNavClick}
			>
				{nav.ctaButton.text}
			</a>
		</div>
	</nav>

	<div id="main" class="mx-auto mt-16 max-w-7xl">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<div>
				<h1 class="text-5xl font-extrabold leading-tight md:text-6xl">
					{hero.headline.prefix}
					<span
						class="-mx-2 rounded-lg border-2 border-black bg-red-500 px-2 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
					>
						{hero.headline.highlight}
					</span>
					{hero.headline.suffix}
				</h1>
				<p class="mt-6 text-xl">
					{hero.description}
				</p>
				<div class="mt-10 flex flex-wrap gap-4">
					<a
						href="#contact"
						class="rounded-lg border-2 border-black bg-red-500 px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
						on:click={handleNavClick}
					>
						{hero.cta.primary}
					</a>
					<a
						href="#howItWorks"
						class="rounded-lg border-2 border-black bg-white px-8 py-4 font-bold text-black shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
						on:click={handleNavClick}
					>
						{hero.cta.secondary}
					</a>
				</div>
			</div>
			<div class="relative">
				<div
					class="absolute -left-10 -top-10 h-40 w-40 rotate-12 rounded-lg border-2 border-black bg-yellow-300"
				></div>
				<div
					class="relative overflow-hidden rounded-lg border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
				>
					<img
						src="https://images.pexels.com/photos/3801426/pexels-photo-3801426.jpeg?auto=compress&cs=tinysrgb&w=1600"
						alt="Restaurant advertisement example"
						class="h-full w-full object-cover"
					/>
				</div>
				<div
					class="absolute -bottom-8 -right-8 h-32 w-32 rounded-full border-2 border-black bg-blue-400"
				></div>
			</div>
		</div>
	</div>
</header>
