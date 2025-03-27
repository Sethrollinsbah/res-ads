<script lang="ts">
	import { siteContent } from '$lib/data/site-content';

	const { features } = siteContent;

	// Map of colors to Tailwind shadow classes
	const shadowColors = {
		red: 'shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]',
		blue: 'shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]',
		amber: 'shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]'
	};

	// Map of colors to Tailwind background classes
	const bgColors = {
		red: 'bg-yellow-300',
		blue: 'bg-blue-300',
		amber: 'bg-red-300'
	};
</script>

<!-- Features Section -->
<section id="features" class="bg-amber-50 py-24">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-extrabold">{features.title}</h2>
			<p class="mt-4 text-xl">{features.subtitle}</p>
		</div>

		<div class="grid gap-12 md:grid-cols-3">
			{#each features.items as feature, i}
				<div class="rounded-lg border-4 border-black bg-white p-8 {shadowColors[feature.color]}">
					<div
						class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-black {bgColors[
							feature.color
						]}"
					>
						<span class="text-3xl">{feature.icon}</span>
					</div>
					<h3 class="mb-4 text-2xl font-bold">{feature.title}</h3>
					<p>
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
