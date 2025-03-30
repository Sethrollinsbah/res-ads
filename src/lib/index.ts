	import { writable } from 'svelte/store';

export let settingsPanel = writable<{id:String, type:String}>({id: null, type: null})
