<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { settingsPanel } from '@/lib';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

{#if $settingsPanel}
	<div
		class="fixed bottom-0 right-0 h-[80dvh] w-[60vw] rounded-tl-lg bg-white shadow-lg ring-1 ring-black"
		transition:fly={{
			x: 100,
			y: 100,
			duration: 300,
			easing: quintOut,
			css: (t) => `transform: translate(${t * 100}%, ${t * 100}%)`
		}}
	>
		<Tabs.Root value="account" class="w-full">
			<div class=" flex flex-row justify-between p-12">
				<h1>Redis</h1>
				<button
					class="flex w-full items-center justify-end"
					onclick={() => {
						$settingsPanel = false;
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			</Tabs.List>
			<div class="overflow-y-auto border-t-[1px] border-accent px-12">
				<Tabs.Content value="account">
					<Card.Root>
						<Card.Header>
							<Card.Title>Account</Card.Title>
							<Card.Description>
								Make changes to your account here. Click save when you're done.
							</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="space-y-1">
								<Label for="name">Name</Label>
								<Input id="name" value="Pedro Duarte" />
							</div>
							<div class="space-y-1">
								<Label for="username">Username</Label>
								<Input id="username" value="@peduarte" />
							</div>
						</Card.Content>
						<Card.Footer>
							<Button>Save changes</Button>
						</Card.Footer>
					</Card.Root>
				</Tabs.Content>
				<Tabs.Content value="password">
					<Card.Root>
						<Card.Header>
							<Card.Title>Password</Card.Title>
							<Card.Description>
								Change your password here. After saving, you'll be logged out.
							</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="space-y-1">
								<Label for="current">Current password</Label>
								<Input id="current" type="password" />
							</div>
							<div class="space-y-1">
								<Label for="new">New password</Label>
								<Input id="new" type="password" />
							</div>
						</Card.Content>
						<Card.Footer>
							<Button>Save password</Button>
						</Card.Footer>
					</Card.Root>
				</Tabs.Content>
			</div>
		</Tabs.Root>
	</div>
{:else}
	<button
		class="fixed bottom-4 right-4 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black"
		onclick={() => {
			$settingsPanel = true;
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 12h16.5m-16.5 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"
			/>
		</svg>
	</button>
{/if}
