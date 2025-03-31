<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { ChevronDown, Plus } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Import projects from the specified location
	import { projects, selectedProjectId } from '@/lib';

	// Define project types
	type Project = {
		id: string;
		name: string;
	};

	// Current project ID state - change null to undefined to match expected types
	let position = $state<string | undefined>($page.params.projectId || undefined);
	let dialogOpen = $state(false);
	let projectName = $state('');
	let creationType = $state('fresh'); // 'fresh' or 'duplicate'

	// Fix: Explicitly define the type for availableProjects
	let availableProjects = $state<Project[]>([]);

	// Create a derived value for available projects using $effect
	$effect(() => {
		availableProjects = $projects.map((project) => ({
			id: project.id,
			name: project.name
		}));
	});

	// Mock data for previous projects
	const previousProjects = [
		{ id: 'project1', name: 'Website Redesign' },
		{ id: 'project2', name: 'Mobile App' },
		{ id: 'project3', name: 'Marketing Campaign' }
	];

	// Check if selectedProjectId matches URL param or exists
	$effect(() => {
		// Update projectId to undefined if the parameter doesn't exist
		const urlProjectId = $page.params.projectId || '';

		// Only update if they're different to avoid unnecessary state changes
		if ($selectedProjectId !== urlProjectId) {
			$selectedProjectId = urlProjectId;
			position = urlProjectId || undefined;

			// If the URL has a project ID, log that we're selecting it
			if (urlProjectId) {
				console.log(`Setting selected project ID to ${urlProjectId} from URL params`);
			}
		}
	});

	// Watch for changes in the page params and update the projectId
	$effect(() => {
		// Update projectId to undefined if the parameter doesn't exist
		$selectedProjectId = $page.params.projectId || '';
		position = $page.params.projectId || undefined;
	});

	// Handle keyboard shortcut
	onMount(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Check for Ctrl+N (works on all platforms)
			if ((e.key === 'n' || e.key === 'N') && e.ctrlKey) {
				e.preventDefault();
				dialogOpen = true;
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	function handleCreateProject() {
		// TODO: Add your project creation logic here
		if (creationType === 'fresh') {
			console.log(`Creating new project: ${projectName}`);
			// Add the new project to the state
			const newProject = { id: `project-${Date.now()}`, name: projectName };
			$projects = [...$projects, newProject];

			// Also add to the imported projects with full structure
			const newFullProject = {
				id: newProject.id,
				name: newProject.name,
				lastUpdated: new Date(),
				services: [],
				active: true
			};
			$projects = [...$projects, newFullProject];

			$selectedProjectId = newProject.id;
		} else {
			// console.log(`Duplicating project ${selectedProjectId} as: ${projectName}`);
			// Clone the selected project with a new ID and name
			const newProject = { id: `project-${Date.now()}`, name: projectName };
			$projects = [...$projects, newProject];

			// Find the selected project in the full projects list to duplicate it
			const sourceProject = $projects.find((p) => p.id === $selectedProjectId);
			if (sourceProject) {
				const duplicatedProject = {
					...sourceProject,
					id: newProject.id,
					name: newProject.name,
					lastUpdated: new Date()
				};
				$projects = [...$projects, duplicatedProject];
			}

			$selectedProjectId = newProject.id;
		}

		// Navigate to the new project if we have a project ID
		if ($selectedProjectId) {
			goto(`/dashboard/${$selectedProjectId}`);
		} else {
			goto('/projects'); // Fallback to dashboard if no project is selected
		}

		// Reset form
		dialogOpen = false;
		projectName = '';
		creationType = 'fresh';
		$selectedProjectId = '';
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="flex flex-row items-center gap-1">
			{$selectedProjectId || 'No Project Selected'}<ChevronDown class="size-4 text-sm" />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Label>Projects</DropdownMenu.Label>
			<DropdownMenu.RadioGroup
				value={position}
				onValueChange={(projectIdValue) => {
					// Navigate to the selected project
					goto(`/dashboard/${projectIdValue}`);
				}}
			>
				{#each $projects as pid}
					<DropdownMenu.RadioItem class="capitalize" value={pid.id}
						>{pid.name}</DropdownMenu.RadioItem
					>
				{/each}
			</DropdownMenu.RadioGroup>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => (dialogOpen = true)}>
				<Plus class="mr-2 size-4" />
				<span>New Project</span>
				<DropdownMenu.Shortcut>Ctrl+N</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create New Project</Dialog.Title>
			<Dialog.Description>Give your project a name and choose how to create it.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-6 py-4">
			<div class="grid grid-cols-1 items-center gap-4">
				<Label for="projectName" class="text-start">Project Name</Label>
				<Input
					id="projectName"
					bind:value={projectName}
					placeholder="My Awesome Project"
					class="col-span-3"
					autofocus
				/>
			</div>

			<div class="space-y-4">
				<Label>Project Type</Label>
				<RadioGroup.Root
					value={creationType}
					onValueChange={(val) => (creationType = val)}
					class="grid gap-4"
				>
					<div class="flex items-start space-x-2">
						<RadioGroup.Item value="fresh" id="r1" />
						<div class="grid gap-1.5">
							<Label for="r1" class="font-medium">Start Fresh</Label>
							<p class="text-sm text-muted-foreground">
								Create a new project with blank templates and default settings.
							</p>
						</div>
					</div>

					<div class="flex items-start space-x-2">
						<RadioGroup.Item value="duplicate" id="r2" />
						<div class="grid w-full gap-1.5">
							<Label for="r2" class="font-medium">Duplicate Existing Project</Label>
							<p class="text-sm text-muted-foreground">
								Copy all settings, templates, and configurations from an existing project.
							</p>

							{#if creationType === 'duplicate'}
								<div class="mt-2">
									<Select.Root
										selected={$selectedProjectId
											? {
													value: $selectedProjectId,
													label:
														previousProjects.find((p) => p.id === $selectedProjectId)?.name || ''
												}
											: undefined}
										onSelectedChange={(v) => {
											v && ($selectedProjectId = v.value);
										}}
									>
										<Select.Trigger class="w-full">
											<Select.Value placeholder="Select a project to duplicate" />
										</Select.Trigger>
										<Select.Content>
											{#each previousProjects as project}
												<Select.Item value={project.id} label={project.name} />
											{/each}
										</Select.Content>
									</Select.Root>
								</div>
							{/if}
						</div>
					</div>
				</RadioGroup.Root>
			</div>
		</div>
		<Dialog.Footer class="flex justify-between">
			<Button variant="outline" on:click={() => (dialogOpen = false)}>Cancel</Button>
			<Button
				type="submit"
				on:click={handleCreateProject}
				disabled={!projectName.trim() || (creationType === 'duplicate' && !$selectedProjectId)}
			>
				Create Project
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
