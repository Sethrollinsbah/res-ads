<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Database, Layers, Plus } from 'lucide-svelte';
	import { settingsPanel } from '@/lib';
</script>

<Dialog.Root>
	<Dialog.Trigger
		id="find"
		class={buttonVariants({ variant: 'outline' }) + ' fixed right-4 top-24 '}
		><Plus class="mr-[2px] size-4" /> Create {$settingsPanel}</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Tabs.Root value="home" class="h-full w-full bg-none">
			<Tabs.Content class="bg-none" value="home">
				<Tabs.List class="flex h-full w-full flex-col divide-y-[1px] divide-accent bg-transparent ">
					<Tabs.Trigger
						class="group flex w-full flex-row justify-start rounded-none bg-transparent text-base font-normal"
						value="Database"><Database class="mr-2" />Database</Tabs.Trigger
					>
					<Tabs.Trigger
						class="flex w-full flex-row justify-start rounded-none text-base font-normal"
						value="Platform"><Layers class="mr-2 " />Platform</Tabs.Trigger
					>
				</Tabs.List>
			</Tabs.Content>
			<Tabs.Content value="Database">
				<Button class="flex  w-full flex-row justify-start" variant="outline">
					<span class="mr-4">l</span>
					<span>Google Sheets</span>
				</Button>
				<Button class="flex  w-full flex-row justify-start" variant="outline">
					<span class="mr-4">l</span>
					<span>Microsoft Excel</span>
				</Button>
			</Tabs.Content>
			<Tabs.Content value="Platform">
				<Button class="flex  w-full flex-row justify-start" variant="outline">
					<span class="mr-4">l</span>
					<span>Google Ads</span>
				</Button>
				<Button class="flex  w-full flex-row justify-start" variant="outline">
					<span class="mr-4">l</span>
					<span>Meta Ads</span>
				</Button>
				<Button class="flex  w-full flex-row justify-start" variant="outline">
					<span class="mr-4">l</span>
					<span>Microsoft Ads</span>
				</Button>
				<Button class="flex  w-full flex-row justify-start" variant="outline">
					<span class="mr-4">l</span>
					<span>Reddit Ads</span>
				</Button>
			</Tabs.Content>
		</Tabs.Root>
	</Dialog.Content>
</Dialog.Root>
