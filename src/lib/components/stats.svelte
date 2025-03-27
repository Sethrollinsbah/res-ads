<script lang="ts">
	import { siteContent } from '$lib/data/site-content';

	const { stats } = siteContent;
</script>

<!-- Stats Section -->
<section class="border-y-4 border-black bg-red-500 py-16">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat}
				<div
					class="rounded-lg border-4 border-black bg-white p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
				>
					<div class="text-4xl font-extrabold">{stat.value}</div>
					<div class="mt-2 font-bold">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>
