<script lang="ts">
	import { siteContent } from '$lib/data/site-content';

	const { howItWorks } = siteContent;
</script>

<!-- How It Works Section -->
<section id="howItWorks" class="border-y-4 border-black bg-blue-400 py-24">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-extrabold">{howItWorks.title}</h2>
			<p class="mt-4 text-xl">{howItWorks.subtitle}</p>
		</div>

		<div class="grid gap-8 md:grid-cols-4">
			{#each howItWorks.steps as step}
				<div
					class="relative rounded-lg border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
				>
					<div
						class="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-yellow-300 text-xl font-bold"
					>
						{step.number}
					</div>
					<h3 class="mb-4 mt-2 text-xl font-bold">{step.title}</h3>
					<p>{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
