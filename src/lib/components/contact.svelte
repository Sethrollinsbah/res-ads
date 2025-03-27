<script lang="ts">
	import Footer from '@/lib/components/footer.svelte';
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

<!-- Contact Section -->
<section id="contact" class="bg-amber-50 py-24">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-extrabold">Ready to Get Started?</h2>
			<p class="mt-4 text-xl">Fill out the form below and we'll be in touch within 24 hours</p>
		</div>

		<div class="mx-auto max-w-2xl">
			<div
				class="rounded-lg border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]"
			>
				<form on:submit={handleSubmit}>
					<div class="mb-6">
						<label for="name" class="mb-2 block font-bold">Restaurant Name</label>
						<input
							type="text"
							id="name"
							required
							class="w-full rounded-lg border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="Your Restaurant Name"
						/>
					</div>
					<div class="mb-6">
						<label for="email" class="mb-2 block font-bold">Email Address</label>
						<input
							type="email"
							id="email"
							required
							class="w-full rounded-lg border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="you@example.com"
						/>
					</div>
					<div class="mb-6">
						<label for="phone" class="mb-2 block font-bold">Phone Number</label>
						<input
							type="tel"
							id="phone"
							required
							class="w-full rounded-lg border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="(123) 456-7890"
						/>
					</div>
					<div class="mb-6">
						<label for="package" class="mb-2 block font-bold">Interested In</label>
						<select
							id="package"
							required
							class="w-full rounded-lg border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
						>
							<option value="" disabled selected>Select a package</option>
							<option value="appetizer">Appetizer - $499/mo</option>
							<option value="main-course">Main Course - $899/mo</option>
							<option value="full-menu">Full Menu - $1499/mo</option>
							<option value="custom">Custom Solution</option>
						</select>
					</div>
					<div class="mb-6">
						<label for="message" class="mb-2 block font-bold">Tell Us About Your Restaurant</label>
						<textarea
							id="message"
							rows="4"
							required
							class="w-full rounded-lg border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="What type of cuisine do you serve? What are your goals?"
						></textarea>
					</div>
					<button
						type="submit"
						class="w-full rounded-lg border-2 border-black bg-red-500 px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
					>
						Let's Cook Up Some Ads!
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
