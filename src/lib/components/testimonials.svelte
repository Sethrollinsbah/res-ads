<script lang="ts">
	import { siteContent } from '$lib/data/site-content';

	const { testimonials } = siteContent;
</script>

<!-- Testimonials Section -->
<section id="testimonials" class="border-y-4 border-black bg-yellow-300 py-24">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-extrabold">{testimonials.title}</h2>
			<p class="mt-4 text-xl">{testimonials.subtitle}</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each testimonials.items as testimonial, i}
				<div
					class="relative rounded-lg border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] {i ===
					1
						? 'md:mt-8'
						: ''}"
				>
					<div class="mb-6 text-5xl">⭐⭐⭐⭐⭐</div>
					<p class="mb-6 italic">
						"{testimonial.quote}"
					</p>
					<div class="flex items-center">
						<div class="mr-4 h-12 w-12 rounded-full border-2 border-black bg-gray-300"></div>
						<div>
							<div class="font-bold">{testimonial.name}</div>
							<div>{testimonial.company}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
