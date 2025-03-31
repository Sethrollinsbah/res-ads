// src/lib/init/node-init.ts

import { registerNodeComponent } from '$lib/registry/node-registry';
import { addNode } from '$lib/stores/node-store';
import type { TableNode, CampaignNode, PlatformNode } from '$lib/types/node-types';

// Import the components
import DbTable from '$lib/components/svelvet/tables/db-table.svelte';
import CampaignNode from '$lib/components/svelvet/tables/campaign-node.svelte';
import PlatformNode from '$lib/components/svelvet/tables/platform-node.svelte';

/**
 * Register all node components
 */
export function registerComponents(): void {
  registerNodeComponent('table', DbTable);
  registerNodeComponent('campaign', CampaignNode);
  registerNodeComponent('platform', PlatformNode);
}

/**
 * Initialize the default nodes
 */
export function initializeDefaultNodes(): void {
  // Table node
  const peopleTable: Omit<TableNode, 'component'> = {
    id: 'people',
    type: 'table',
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
      ],
      schema: [
        { field: 'name', type: 'varchar', constraint: 'not null' },
        { field: 'height', type: 'int', constraint: '' },
        { field: 'mass', type: 'int', constraint: '' }
      ]
    }
  };
  
  // Campaign node
  const weekendSpecial: Omit<CampaignNode, 'component'> = {
    id: 'weekend-special',
    type: 'campaign',
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
    }
  };
  
  // Platform nodes
  const instagramChannel: Omit<PlatformNode, 'component'> = {
    id: 'instagram-channel',
    type: 'platform',
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
    }
  };
  
  const googleSearch: Omit<PlatformNode, 'component'> = {
    id: 'google-search',
    type: 'platform',
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
    }
  };
  
  const emailChannel: Omit<PlatformNode, 'component'> = {
    id: 'email-channel',
    type: 'platform',
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
    }
  };
  
  const facebookChannel: Omit<PlatformNode, 'component'> = {
    id: 'facebook-channel',
    type: 'platform',
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
      shadowColor: '#8BB9FE'
    }
  };
  
  // Add all nodes to the store
  addNode(peopleTable);
  addNode(weekendSpecial);
  addNode(instagramChannel);
  addNode(googleSearch);
  addNode(emailChannel);
  addNode(facebookChannel);
}

/**
 * Initialize everything
 */
export function initializeNodes(): void {
  registerComponents();
  initializeDefaultNodes();
}
