<script lang="ts">
	import { siteContent } from '$lib/data/site-content';
	import { onMount } from 'svelte';

	// Modify this to use CPM pricing instead of monthly subscription
	const pricing = siteContent;
	const pricingData = pricing;

	// Budget calculator state
	let currentBudget = 750;
	let recommendedPlan = '';
	let estimatedImpressions = 0;
	let calculatorVisible = false;
	let calculatorResult = false;

	// Calculate recommended plan based on current budget
	function calculateRecommendation() {
		if (currentBudget < pricingData.plans[0].minBudget) {
			recommendedPlan = 'custom'; // Budget too low for standard plans
			estimatedImpressions = Math.floor((currentBudget / pricingData.plans[0].cpmValue) * 1000);
			return;
		}

		// Find the best plan based on budget
		if (currentBudget >= pricingData.plans[2].minBudget) {
			recommendedPlan = pricingData.plans[2].id;
			estimatedImpressions = Math.floor((currentBudget / pricingData.plans[2].cpmValue) * 1000);
		} else if (currentBudget >= pricingData.plans[1].minBudget) {
			recommendedPlan = pricingData.plans[1].id;
			estimatedImpressions = Math.floor((currentBudget / pricingData.plans[1].cpmValue) * 1000);
		} else {
			recommendedPlan = pricingData.plans[0].id;
			estimatedImpressions = Math.floor((currentBudget / pricingData.plans[0].cpmValue) * 1000);
		}

		calculatorResult = true;
	}

	function toggleCalculator() {
		calculatorVisible = !calculatorVisible;
		if (!calculatorVisible) {
			calculatorResult = false;
		}
	}

	let highlightedPlan = '';

	$: {
		// Automatically highlight recommended plan when result is shown
		if (calculatorResult) {
			highlightedPlan = recommendedPlan;
		} else {
			highlightedPlan = '';
		}
	}

	// Format number with commas
	function formatNumber(num: number): string {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
</script>

<!-- Pricing Section -->
<section id="pricing" class="bg-amber-50 py-24">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-extrabold">{pricingData.title}</h2>
			<p class="mt-4 text-xl">{pricingData.subtitle}</p>
			<p class="mt-2 text-gray-600">Only pay for the impressions your ads actually receive</p>
		</div>

		<div class="mb-12">
			<button
				class="mx-auto flex items-center rounded-lg border-2 border-black bg-blue-500 px-6 py-3 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
				on:click={toggleCalculator}
			>
				<span class="mr-2">{calculatorVisible ? 'Hide' : 'Show'} Budget Calculator</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			{#if calculatorVisible}
				<div
					class="mt-6 rounded-lg border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
				>
					<h3 class="mb-4 text-xl font-bold">Find Your Perfect Ad Package</h3>
					<p class="mb-4">
						Enter your current monthly advertising budget to see which package would give you the
						best value.
					</p>

					<div class="mb-6">
						<label for="budget" class="mb-2 block font-bold">Monthly Budget ($)</label>
						<div class="flex items-center gap-4">
							<input
								type="range"
								id="budget"
								bind:value={currentBudget}
								min="300"
								max="2000"
								step="50"
								class="h-2 w-full appearance-none rounded-lg bg-gray-200 accent-red-500"
							/>
							<div
								class="flex min-w-24 items-center justify-center rounded-lg border-2 border-black bg-gray-100 px-3 py-2 font-bold"
							>
								${currentBudget}
							</div>
						</div>
					</div>

					<button
						on:click={calculateRecommendation}
						class="w-full rounded-lg border-2 border-black bg-red-500 px-6 py-3 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
					>
						Calculate Best Value
					</button>

					{#if calculatorResult}
						<div class="mt-6 rounded-lg border-2 border-black bg-green-100 p-4">
							<h4 class="mb-2 text-lg font-bold">Your Recommendation</h4>
							{#if recommendedPlan === 'custom'}
								<p>Your budget is below our starter package. Contact us for a custom solution!</p>
							{:else}
								<p>
									Based on your ${currentBudget} budget, we recommend our
									<span class="font-bold text-red-500"
										>{pricingData.plans.find((p) => p.id === recommendedPlan)?.name}</span
									> package.
								</p>
								<p class="mt-2">
									This would give you approximately <span class="font-bold"
										>{formatNumber(estimatedImpressions)}</span
									> ad impressions per month.
								</p>
							{/if}
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			{#each pricingData.plans as plan, i}
				<div
					class="relative mx-auto max-w-sm {plan.isPopular
						? 'z-10 -mt-4 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] md:-mb-4 md:mt-0'
						: highlightedPlan === plan.id
							? 'border-green-500 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]'
							: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'} overflow-hidden rounded-lg border-4 border-black bg-white p-8 transition-all duration-300"
				>
					{#if highlightedPlan === plan.id && !plan.isPopular}
						<div
							class="absolute -right-12 -top-1 rotate-45 transform border-2 border-black bg-green-500 px-12 py-1 font-bold text-white"
						>
							RECOMMENDED
						</div>
					{:else if plan.isPopular}
						<div class="-translate-y-14 translate-x-20 rotate-45">
							<div
								class="absolute -right-12 -top-1 transform border-2 border-black bg-red-500 px-20 py-1 font-bold text-white"
							>
								{plan.badge}
							</div>
						</div>
					{:else}
						<div
							class="absolute right-0 top-0 border-b-2 border-l-2 border-black bg-gray-200 px-4 py-1 font-bold"
						>
							{plan.badge}
						</div>
					{/if}
					<h3 class="mb-3 mt-8 text-2xl font-bold">{plan.name}</h3>

					<div class="mb-2">
						<div class="flex items-baseline">
							<span class="text-5xl font-extrabold text-red-500">{plan.price}</span>
							<span class="ml-1 text-xl font-bold text-gray-700">{plan.period}</span>
						</div>
						<div class="mt-1 text-sm text-gray-600">{plan.details}</div>
					</div>

					<div
						class="mb-4 mt-2 inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-bold text-green-800"
					>
						{plan.savings}
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
							: highlightedPlan === plan.id
								? 'bg-green-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
								: 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]'} px-6 py-3 text-center font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
					>
						Get Started
					</a>
				</div>
			{/each}
		</div>

		<div
			class="mx-auto mt-16 max-w-3xl rounded-lg border-2 border-black bg-blue-100 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
		>
			<h3 class="text-xl font-bold">What is CPM?</h3>
			<p class="mt-2">
				CPM stands for "Cost Per Mille" (cost per thousand impressions). With our transparent CPM
				pricing, you only pay when your ads are actually seen by potential customers. This means
				more efficient spending and better ROI compared to flat-fee advertising.
			</p>
			<p class="mt-2">
				<strong>Example:</strong> At $12.50 CPM, you pay just $12.50 for every 1,000 people who see your
				restaurant ads. The more visible your restaurant becomes, the more hungry customers walk through
				your door!
			</p>
		</div>
	</div>
</section>
