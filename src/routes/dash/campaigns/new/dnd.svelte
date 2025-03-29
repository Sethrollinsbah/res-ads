<script>
	import { Svelvet } from 'svelvet';
	import DbTable from '$lib/components/svelvet/tables/db-table.svelte';

	// Use $state to make these reactive
	let loaded = $state(false);

	// Make sure components are only rendered after onMount
	import { onMount } from 'svelte';
	import CampaignNode from '@/lib/components/svelvet/tables/campaign-node.svelte';
	import PlatformNode from '@/lib/components/svelvet/tables/platform-node.svelte';

	onMount(() => {
		// Set a small timeout to ensure the DOM is fully ready
		setTimeout(() => {
			loaded = true;
		}, 100);
	});
</script>

<div class="svelvet-container">
	{#if loaded}
		<Svelvet fitView controls minimap>
			<DbTable
				id="people"
				positionX={-300}
				positionY={-300}
				headingText="People"
				headingColor="#4285F4"
				borderColor="#000000"
				shadowColor="#99C9FF"
				tableData={[
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'name', type: 'varchar', constraint: 'not null' },
					{ field: 'height', type: 'int', constraint: '' },
					{ field: 'mass', type: 'int', constraint: '' }
				]}
			/>
			<!-- Weekend Special Campaign with red theme -->
			<CampaignNode
				id="weekend-special"
				positionX={-400}
				positionY={-200}
				campaignName="Weekend Special"
				campaignStatus="Active"
				budget={1200}
				impressions={45000}
				clicks={2250}
				conversions={180}
				startDate="2025-03-15"
				endDate="2025-04-15"
				mainColor="#FF5252"
				shadowColor="#FF9999"
			/>

			<!-- Instagram Platform -->
			<PlatformNode
				id="instagram-channel"
				positionX={800}
				positionY={200}
				platformName="Instagram"
				platformType="Social"
				platformIcon="📸"
				budget={450}
				budgetPercentage={35}
				impressions={22500}
				clicks={1125}
				conversions={90}
				costPerClick={0.4}
				costPerConversion={5.0}
				mainColor="#E1306C"
				shadowColor="#F5A3C7"
			/>

			<!-- Google Search Platform -->
			<PlatformNode
				id="google-search"
				positionX={500}
				positionY={400}
				platformName="Google"
				platformType="Search"
				platformIcon="🔍"
				budget={350}
				budgetPercentage={27}
				impressions={10200}
				clicks={765}
				conversions={45}
				costPerClick={0.46}
				costPerConversion={7.78}
				mainColor="#4285F4"
				shadowColor="#A4C2F4"
			/>

			<!-- Email Marketing Platform -->
			<PlatformNode
				id="email-channel"
				positionX={1100}
				positionY={300}
				platformName="Email"
				platformType="Email"
				platformIcon="📧"
				budget={200}
				budgetPercentage={15}
				impressions={8500}
				clicks={340}
				conversions={42}
				costPerClick={0.59}
				costPerConversion={4.76}
				mainColor="#D54B3D"
				shadowColor="#F4A9A3"
			/>

			<!-- Facebook Platform -->
			<PlatformNode
				id="facebook-channel"
				positionX={200}
				positionY={600}
				platformName="Facebook"
				platformType="Social"
				platformIcon="👥"
				budget={300}
				budgetPercentage={23}
				impressions={18500}
				clicks={925}
				conversions={37}
				costPerClick={0.32}
				costPerConversion={8.11}
				mainColor="#1877F2"
				shadowColor="#8BB9FE"
				anchorDirection="east"
			/>
		</Svelvet>
	{/if}
</div>

<style>
	.svelvet-container {
		width: 100%;
		height: 600px;
		background-color: #f0f0f0;
		border-radius: 8px;
		overflow: hidden;
	}
</style>
