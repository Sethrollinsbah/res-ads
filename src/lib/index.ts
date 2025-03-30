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
