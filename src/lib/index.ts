// src/lib/index.ts

import { writable } from 'svelte/store';
import { nodes } from './stores/node-store';

// Settings panel store
export let settingsPanel = writable<{
  id: string | null;
  type: string | null;
  icon?: string | null;
  data?: any
}>({
  id: null,
  type: null,
  icon: null,
  data: null
});

// Export the nodes store
export { nodes };

// Re-export other stores and types for easy access
export * from './stores/node-store';
export * from './types/node-types';
export * from './registry/node-registry';
export * from './init/node-init';

export let projectId = writable<String>("planetbun")

export let projects = writable<{id: string, name: String}[]>([
				{
					id: 'planetbun-13',
					name: 'PlaneikbtBun',
					lastUpdated: new Date(2025, 2, 25), // March 25, 2025
					services: [
						{ id: 'srv-1', name: 'Web Service', active: true },
						{ id: 'srv-2', name: 'API Service', active: true },
						{ id: 'srv-3', name: 'Database', active: true }
					],
					active: true
				},
				{
					id: 'planetbun-123',
					name: 'PlanetBun',
					lastUpdated: new Date(2025, 2, 28), // March 28, 2025
					services: [
						{ id: 'srv-4', name: 'Web Frontend', active: true },
						{ id: 'srv-5', name: 'Backend API', active: false }
					],
					active: true
				},
				{
					id: 'ecommerce-app',
					name: 'E-Commerce Platform',
					lastUpdated: new Date(2025, 2, 15), // March 15, 2025
					services: [
						{ id: 'srv-6', name: 'Frontend', active: true },
						{ id: 'srv-7', name: 'Auth Service', active: true },
						{ id: 'srv-8', name: 'Products Service', active: true },
						{ id: 'srv-9', name: 'Cart Service', active: true }
					],
					active: false
				},
				{
					id: 'analytics-dashboard',
					name: 'Analytics Dashboard',
					lastUpdated: new Date(2025, 2, 29), // March 29, 2025
					services: [
						{ id: 'srv-10', name: 'Metrics Service', active: true },
						{ id: 'srv-11', name: 'Visualization API', active: true },
						{ id: 'srv-12', name: 'Data Pipeline', active: false }
					],
					active: true
				},
				{
					id: 'mobile-app-backend',
					name: 'Mobile App Backend',
					lastUpdated: new Date(2025, 1, 20), // February 20, 2025
					services: [
						{ id: 'srv-13', name: 'Auth API', active: true },
						{ id: 'srv-14', name: 'Content API', active: true },
						{ id: 'srv-15', name: 'Push Notifications', active: true },
						{ id: 'srv-16', name: 'User Management', active: true }
					],
					active: true
				}
			])
export 	let selectedProjectId = writable<String>("planetbun")

