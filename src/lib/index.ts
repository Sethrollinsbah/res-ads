import { writable } from 'svelte/store';
import DbTable from '$lib/components/svelvet/tables/db-table.svelte';
import CampaignNode from '@/lib/components/svelvet/tables/campaign-node.svelte';
import PlatformNode from '@/lib/components/svelvet/tables/platform-node.svelte';

export let settingsPanel = writable<{id:String, type:String}>({id: null, type: null, data: null});

export let nodes = writable([
		{
			id: '1---people',
			position: { x: -300, y: -300 },
			data: {
				headingText: 'People',
				headingColor: '#4285F4',
				borderColor: '#000000',
				shadowColor: '#99C9FF',
				tableData: [
					{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
					{ field: 'name', type: 'varchar', constraint: 'not null' },
					{ field: 'height', type: 'int', constraint: '' },
					{ field: 'mass', type: 'int', constraint: '' }
				]
			},
			component: DbTable
		},
		{
			id: '1---weekend-special',
			position: { x: -400, y: -200 },
			data: {
				campaignName: 'Weekend Special',
				campaignStatus: 'Active',
				budget: 1200,
				impressions: 45000,
				clicks: 2250,
				conversions: 180,
				startDate: '2025-03-15',
				endDate: '2025-04-15',
				mainColor: '#FF5252',
				shadowColor: '#FF9999'
			},
			component: CampaignNode
		},
		{
			id: '1---instagram-channel',
			position: { x: 800, y: 200 },
			data: {
				platformName: 'Instagram',
				platformType: 'Social',
				platformIcon: '📸',
				budget: 450,
				budgetPercentage: 35,
				impressions: 22500,
				clicks: 1125,
				conversions: 90,
				costPerClick: 0.4,
				costPerConversion: 5.0,
				mainColor: '#E1306C',
				shadowColor: '#F5A3C7'
			},
			component: PlatformNode
		},
		{
			id: '1---google-search',
			position: { x: 500, y: 400 },
			data: {
				platformName: 'Google',
				platformType: 'Search',
				platformIcon: '🔍',
				budget: 350,
				budgetPercentage: 27,
				impressions: 10200,
				clicks: 765,
				conversions: 45,
				costPerClick: 0.46,
				costPerConversion: 7.78,
				mainColor: '#4285F4',
				shadowColor: '#A4C2F4'
			},
			component: PlatformNode
		},
		{
			id: '1---email-channel',
			position: { x: 1100, y: 300 },
			data: {
				platformName: 'Email',
				platformType: 'Email',
				platformIcon: '📧',
				budget: 200,
				budgetPercentage: 15,
				impressions: 8500,
				clicks: 340,
				conversions: 42,
				costPerClick: 0.59,
				costPerConversion: 4.76,
				mainColor: '#D54B3D',
				shadowColor: '#F4A9A3'
			},
			component: PlatformNode
		},
		{
			id: '1---facebook-channel',
			position: { x: 200, y: 600 },
			data: {
				platformName: 'Facebook',
				platformType: 'Social',
				platformIcon: '👥',
				budget: 300,
				budgetPercentage: 23,
				impressions: 18500,
				clicks: 925,
				conversions: 37,
				costPerClick: 0.32,
				costPerConversion: 8.11,
				mainColor: '#1877F2',
				shadowColor: '#8BB9FE',
				anchorDirection: 'east'
			},
			component: PlatformNode
		}
	]);
