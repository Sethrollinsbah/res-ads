<script lang="ts">
	import { siteContent } from '$lib/data/site-content';

	const { pricing } = siteContent;
</script>

<!-- Pricing Section -->
<section id="pricing" class="bg-amber-50 py-24">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-extrabold">{pricing.title}</h2>
			<p class="mt-4 text-xl">{pricing.subtitle}</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			{#each pricing.plans as plan, i}
				<div
					class="relative {plan.isPopular
						? 'z-10 -mt-4 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] md:-mb-4 md:mt-0'
						: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'} overflow-hidden rounded-lg border-4 border-black bg-white p-8"
				>
					{#if plan.isPopular}
						<div
							class="absolute -right-1 -top-1 rotate-3 transform border-2 border-black bg-red-500 px-4 py-1 font-bold text-white"
						>
							{plan.badge}
						</div>
					{:else}
						<div
							class="absolute right-0 top-0 border-b-2 border-l-2 border-black bg-gray-200 px-4 py-1 font-bold"
						>
							{plan.badge}
						</div>
					{/if}
					<h3 class="mb-6 mt-8 text-2xl font-bold">{plan.name}</h3>
					<div class="mb-6 text-4xl font-extrabold">
						{plan.price}<span class="text-xl font-bold">{plan.period}</span>
					</div>
					<ul class="mb-8 space-y-3">
						{#each plan.features as feature}
							<li class="flex items-start">
								<span class="mr-2 text-green-500">✓</span>
								{feature}
							</li>
						{/each}
					</ul>
					<a
						href="#contact"
						class="block w-full rounded-lg border-2 border-black {plan.isPopular
							? 'bg-red-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
							: 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]'} px-6 py-3 text-center font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
					>
						Get Started
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
