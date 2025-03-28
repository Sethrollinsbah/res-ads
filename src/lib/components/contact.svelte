<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { siteContent } from '$lib/data/site-content';
	import { onMount } from 'svelte';

	const { contact } = siteContent;

	// You can add interactive functionality here
	let isScrolled = $state(false);

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
			<h2 class="text-4xl font-extrabold">{contact.title}</h2>
			<p class="mt-4 text-xl">{contact.subtitle}</p>
		</div>

		<div class="mx-auto max-w-2xl">
			<div
				class="rounded-lg border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]"
			>
				<form onsubmit={handleSubmit}>
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

						<Select.Root portal={null}>
							<Select.Trigger
								class="w-full border-2 border-black  focus:outline-none focus:ring-2 focus:ring-red-500"
							>
								<Select.Value
									id="package"
									placeholder="Select a package to discuss during our call"
								/>
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Packages</Select.Label>
									{#each contact.packageOptions as option}
										<Select.Item value={option.value} label={option.label}
											>{option.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
							<Select.Input name="package" />
						</Select.Root>
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
						{contact.submitButtonText}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
