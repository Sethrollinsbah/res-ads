<script lang="ts">
	import Contact from '@/lib/components/contact.svelte';
	import Features from '@/lib/components/features.svelte';
	import Footer from '@/lib/components/footer.svelte';
	import Hero from '@/lib/components/hero.svelte';
	import HowItWorks from '@/lib/components/how-it-works.svelte';
	import Pricing from '@/lib/components/pricing.svelte';
	import Stats from '@/lib/components/stats.svelte';
	import Testimonials from '@/lib/components/testimonials.svelte';
	import { onMount } from 'svelte';

	// You can add interactive functionality here
	let isScrolled = false;

	// Handle scroll for sticky header effect
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// For a real implementation, you would add form submission logic
	const handleSubmit = (e: Event) => {
		e.preventDefault();
		// Process form submission
		alert("Thanks for your interest! We'll contact you soon.");
	};
</script>

<div class="min-h-screen bg-amber-50">
	<Hero {isScrolled}></Hero>
	<Stats></Stats>
	<Features></Features>
	<HowItWorks></HowItWorks>
	<Pricing></Pricing>
	<Testimonials></Testimonials>
	<Contact></Contact>
	<Footer></Footer>
</div>
