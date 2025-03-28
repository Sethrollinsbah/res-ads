<script>
	import { onMount } from 'svelte';
	// Import Svelvet for funnel visualization
	import { Svelvet, Node, Edge } from 'svelvet';
	// Import Shadcn components
	import * as Drawer from '$lib/components/ui/drawer';
	// Icons
	import {
		MessageSquare,
		Users,
		ShoppingCart,
		CreditCard,
		Send,
		UserPlus,
		BarChart,
		Coffee,
		ThumbsUp,
		Mail,
		Phone,
		Map,
		Download,
		Rocket,
		RefreshCw,
		MenuIcon,
		X
	} from 'lucide-svelte';

	// State for responsive design
	let windowWidth = 0;
	let drawerOpen = $state(false);

	// State for the chat interface
	let messages = $state([
		{
			sender: 'ai',
			content:
				"Hi there! I'm your ResAds campaign assistant. I'll help you create an effective restaurant ad campaign. What kind of restaurant are you promoting?",
			timestamp: new Date()
		}
	]);
	let newMessage = $state('');
	let loading = $state(false);
	let chatContainer;

	// Funnel state
	let funnelSteps = $state([
		{
			id: '1',
			type: 'awareness',
			name: 'Awareness',
			description: 'Get attention',
			icon: Users,
			color: '#ef4444',
			x: 150,
			y: 50,
			width: 200,
			targets: ['2'],
			metrics: {
				reach: '12,500',
				impressions: '45,000'
			}
		},
		{
			id: '2',
			type: 'interest',
			name: 'Interest',
			description: 'Build curiosity',
			icon: Coffee,
			color: '#3b82f6',
			x: 150,
			y: 180,
			width: 200,
			targets: ['3'],
			metrics: {
				clicks: '2,250',
				ctr: '5.0%'
			}
		},
		{
			id: '3',
			type: 'consideration',
			name: 'Consideration',
			description: 'Evaluate options',
			icon: ThumbsUp,
			color: '#f59e0b',
			x: 150,
			y: 310,
			width: 200,
			targets: ['4a', '4b', '4c'],
			metrics: {
				pageViews: '1,870',
				timeOnPage: '1:45'
			}
		},
		{
			id: '4a',
			type: 'conversion',
			name: 'Phone Call',
			description: 'Make reservation',
			icon: Phone,
			color: '#10b981',
			x: 50,
			y: 440,
			width: 120,
			targets: [],
			metrics: {
				calls: '95',
				callRate: '5.1%'
			}
		},
		{
			id: '4b',
			type: 'conversion',
			name: 'Directions',
			description: 'Visit location',
			icon: Map,
			color: '#8b5cf6',
			x: 190,
			y: 440,
			width: 120,
			targets: [],
			metrics: {
				directionClicks: '128',
				clickRate: '6.8%'
			}
		},
		{
			id: '4c',
			type: 'conversion',
			name: 'Order Online',
			description: 'Place takeout order',
			icon: ShoppingCart,
			color: '#ec4899',
			x: 330,
			y: 440,
			width: 120,
			targets: [],
			metrics: {
				orders: '76',
				orderRate: '4.1%'
			}
		}
	]);

	let edges = $state([]);
	let canvas;
	let restaurantInfo = $state({
		name: '',
		type: '',
		location: '',
		targetAudience: '',
		goals: ''
	});

	// Campaign settings
	let campaignSettings = $state({
		budget: 750,
		duration: 30,
		primaryGoal: 'website',
		secondaryGoal: 'calls'
	});

	$effect(() => {
		// Generate edges based on the targets in each node
		const newEdges = [];
		funnelSteps.forEach((step) => {
			step.targets.forEach((targetId) => {
				newEdges.push({
					id: `${step.id}-${targetId}`,
					source: step.id,
					target: targetId,
					animated: true,
					label: '',
					color: step.color
				});
			});
		});
		edges = newEdges;
	});

	// Function to handle sending a message
	function sendMessage() {
		if (!newMessage.trim()) return;

		// Add user message
		messages = [
			...messages,
			{
				sender: 'user',
				content: newMessage.trim(),
				timestamp: new Date()
			}
		];

		// Clear input and set loading state
		const userQuestion = newMessage;
		newMessage = '';
		loading = true;

		// Simulate AI response (replace with actual API call)
		setTimeout(() => {
			const aiResponse = generateAIResponse(userQuestion);
			messages = [
				...messages,
				{
					sender: 'ai',
					content: aiResponse,
					timestamp: new Date()
				}
			];
			loading = false;

			// Update the funnel based on the conversation
			updateFunnelFromChat(userQuestion);
		}, 1000);
	}

	// Function to generate mock AI responses
	function generateAIResponse(question) {
		question = question.toLowerCase();

		if (question.includes('italian') || question.includes('pasta') || question.includes('pizza')) {
			restaurantInfo.type = 'Italian';
			return 'Great! Italian cuisine is popular and has broad appeal. For Italian restaurants, we typically focus on appealing food imagery, family-style dining experiences, and authentic flavors. What location are you in? This will help us target the right audience.';
		}

		if (question.includes('budget')) {
			return 'With your $750 budget, I recommend a combination of targeted Facebook ads to local food enthusiasts and Google Search ads for people looking for restaurants in your area. This should generate approximately 40,000 impressions and drive around 2,000 clicks to your website or listing. Would you like to focus more on brand awareness or direct conversions like reservations and orders?';
		}

		if (question.includes('audience') || question.includes('demographic')) {
			return 'For your restaurant, I recommend targeting these audience segments:\n\n1. Local residents within 5-7 miles (primary)\n2. Office workers looking for lunch options (if applicable)\n3. Weekend diners looking for special experiences\n4. Food enthusiasts and reviewers\n\nWe can create custom audiences based on interests, location, and dining behaviors. Which of these audiences is most important to you?';
		}

		if (question.includes('goal') || question.includes('objective')) {
			return 'For restaurant campaigns, we typically focus on these objectives:\n\n1. Increase reservations/bookings\n2. Drive foot traffic to your location\n3. Boost online orders/takeout\n4. Promote special events or new menu items\n5. Build brand awareness locally\n\nWhich of these aligns best with your current priorities?';
		}

		if (
			question.includes('creative') ||
			question.includes('image') ||
			question.includes('design')
		) {
			return 'Great question about creative design! For restaurant ads, high-quality food photography is essential. We recommend:\n\n1. Professional photos of signature dishes\n2. Warm, inviting images of your dining area\n3. Happy customers enjoying their experience\n4. Any unique elements of your restaurant (patio, view, special features)\n\nWould you like me to recommend a photographer or help with guidelines for your existing images?';
		}

		if (
			question.includes('platform') ||
			question.includes('facebook') ||
			question.includes('instagram') ||
			question.includes('google')
		) {
			return 'Based on your goals and audience, I recommend this platform mix:\n\n• Instagram (40% of budget): Best for food imagery and reaching younger diners\n• Facebook (30%): Great for local targeting and events\n• Google Search (30%): Capture high-intent users searching for restaurants\n\nThis balanced approach will maximize both awareness and conversions. Does this align with your thinking?';
		}

		if (question.includes('hello') || question.includes('hi ') || question.includes('hey')) {
			return "Hello! I'm excited to help you create an effective ad campaign for your restaurant. To get started, could you tell me about your restaurant? What type of cuisine do you serve, and what makes your restaurant special?";
		}

		// Default response
		return "That's great information to help build your campaign. As we continue, I'll help you define your target audience, budget allocation, creative approach, and conversion goals. Is there anything specific about restaurant advertising you'd like to know more about?";
	}

	// Function to update the funnel visualization based on chat content
	function updateFunnelFromChat(userInput) {
		const input = userInput.toLowerCase();

		// Example: Update target audience in the Awareness node if mentioned
		if (input.includes('audience') || input.includes('demographic') || input.includes('people')) {
			const awarenessNode = funnelSteps.find((step) => step.id === '1');
			if (awarenessNode) {
				awarenessNode.description = 'Target local food enthusiasts';
				awarenessNode.metrics.reach = '15,700';
				funnelSteps = [...funnelSteps];
			}
		}

		// Update conversion focus if specified
		if (input.includes('reservation') || input.includes('book') || input.includes('call')) {
			const phoneNode = funnelSteps.find((step) => step.id === '4a');
			if (phoneNode) {
				phoneNode.metrics.calls = '127';
				phoneNode.metrics.callRate = '6.8%';
				phoneNode.width = 140; // Make it slightly larger to emphasize
				funnelSteps = [...funnelSteps];
			}
		}

		// Update online orders if mentioned
		if (input.includes('online') || input.includes('order') || input.includes('delivery')) {
			const orderNode = funnelSteps.find((step) => step.id === '4c');
			if (orderNode) {
				orderNode.metrics.orders = '104';
				orderNode.metrics.orderRate = '5.6%';
				orderNode.width = 140; // Make it slightly larger to emphasize
				funnelSteps = [...funnelSteps];
			}
		}

		// Update budget info if mentioned
		if (input.includes('budget') || input.includes('spend') || input.includes('cost')) {
			if (input.includes('500')) campaignSettings.budget = 500;
			else if (input.includes('1000') || input.includes('1,000')) campaignSettings.budget = 1000;
			else if (input.includes('1500') || input.includes('1,500')) campaignSettings.budget = 1500;
			else if (input.includes('2000') || input.includes('2,000')) campaignSettings.budget = 2000;

			// Update metrics throughout the funnel based on new budget
			const budgetFactor = campaignSettings.budget / 750; // Calculate ratio compared to default

			funnelSteps.forEach((step) => {
				if (step.id === '1') {
					step.metrics.impressions = Math.round(45000 * budgetFactor).toLocaleString();
					step.metrics.reach = Math.round(12500 * budgetFactor).toLocaleString();
				} else if (step.id === '2') {
					step.metrics.clicks = Math.round(2250 * budgetFactor).toLocaleString();
				}
			});

			funnelSteps = [...funnelSteps];
		}
	}

	function resetFunnel() {
		funnelSteps = [
			{
				id: '1',
				type: 'awareness',
				name: 'Awareness',
				description: 'Get attention',
				icon: Users,
				color: '#ef4444',
				x: 150,
				y: 50,
				width: 200,
				targets: ['2'],
				metrics: {
					reach: '12,500',
					impressions: '45,000'
				}
			},
			{
				id: '2',
				type: 'interest',
				name: 'Interest',
				description: 'Build curiosity',
				icon: Coffee,
				color: '#3b82f6',
				x: 150,
				y: 180,
				width: 200,
				targets: ['3'],
				metrics: {
					clicks: '2,250',
					ctr: '5.0%'
				}
			},
			{
				id: '3',
				type: 'consideration',
				name: 'Consideration',
				description: 'Evaluate options',
				icon: ThumbsUp,
				color: '#f59e0b',
				x: 150,
				y: 310,
				width: 200,
				targets: ['4a', '4b', '4c'],
				metrics: {
					pageViews: '1,870',
					timeOnPage: '1:45'
				}
			},
			{
				id: '4a',
				type: 'conversion',
				name: 'Phone Call',
				description: 'Make reservation',
				icon: Phone,
				color: '#10b981',
				x: 50,
				y: 440,
				width: 120,
				targets: [],
				metrics: {
					calls: '95',
					callRate: '5.1%'
				}
			},
			{
				id: '4b',
				type: 'conversion',
				name: 'Directions',
				description: 'Visit location',
				icon: Map,
				color: '#8b5cf6',
				x: 190,
				y: 440,
				width: 120,
				targets: [],
				metrics: {
					directionClicks: '128',
					clickRate: '6.8%'
				}
			},
			{
				id: '4c',
				type: 'conversion',
				name: 'Order Online',
				description: 'Place takeout order',
				icon: ShoppingCart,
				color: '#ec4899',
				x: 330,
				y: 440,
				width: 120,
				targets: [],
				metrics: {
					orders: '76',
					orderRate: '4.1%'
				}
			}
		];
	}

	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	onMount(() => {
		// Set up any initialization logic here
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}

		// Set up window resize listener
		const handleResize = () => {
			windowWidth = window.innerWidth;
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial call

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// Effect to scroll chat to bottom on new messages
	$effect(() => {
		if (messages.length && chatContainer) {
			setTimeout(() => {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}, 50);
		}
	});

	// Custom Node component for the funnel
	const FunnelNode = ({ id, data }) => {
		const IconComponent = data.icon;

		return `
      <div class="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-3 shadow-md" style="width: ${data.width}px">
        <div class="flex h-10 w-10 items-center justify-center rounded-full" style="background-color: ${data.color}25">
          <IconComponent class="h-6 w-6" style="color: ${data.color}" />
        </div>
        <div class="mt-1 text-center">
          <div class="text-sm font-bold">${data.name}</div>
          <div class="text-xs text-gray-500">${data.description}</div>
          
          <div class="mt-2 border-t border-gray-200 pt-1">
            ${Object.entries(data.metrics)
							.map(
								([key, value]) => `
              <div class="flex items-center justify-between gap-2 text-xs">
                <span class="text-gray-500">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span class="font-semibold">${value}</span>
              </div>
            `
							)
							.join('')}
          </div>
        </div>
      </div>
    `;
	};
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="flex h-screen flex-col bg-gray-50">
	<header class="border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="flex items-center gap-3">
				<div
					class="rounded-lg border-2 border-black bg-red-500 px-2 py-1 font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
				>
					ResAds
				</div>
				<h1 class="text-xl font-bold">Campaign Builder</h1>
			</div>

			<div class="flex items-center gap-4">
				<div
					class="hidden items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm sm:flex"
				>
					<span class="font-semibold text-gray-700">Budget:</span>
					<span class="ml-1">${campaignSettings.budget}</span>
				</div>
				<div
					class="hidden items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm sm:flex"
				>
					<span class="font-semibold text-gray-700">Duration</span>
					<span class="ml-1">{campaignSettings.duration} days</span>
				</div>
				<button
					class="flex items-center gap-1 rounded-lg border border-blue-500 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
				>
					<Rocket class="h-4 w-4" />
					<span class="hidden sm:inline">Launch Campaign</span>
					<span class="sm:hidden">Launch</span>
				</button>
			</div>
		</div>
	</header>

	<div class="flex flex-1 overflow-hidden">
		<!-- DESKTOP VIEW: Funnel Visualization Section (visible on md and up) -->
		<div class="hidden w-1/2 flex-col border-r border-gray-200 bg-gray-50 md:flex">
			<div class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
				<h2 class="text-lg font-semibold">Campaign Funnel Visualization</h2>
				<button
					onclick={resetFunnel}
					class="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
				>
					<RefreshCw class="h-3 w-3" />
					<span>Reset</span>
				</button>
			</div>

			<div class="relative flex-1">
				<Svelvet
					bind:this={canvas}
					editable={false}
					background="#f9fafb"
					height="100%"
					width="100%"
				>
					{#each funnelSteps as node}
						<Node
							id={node.id}
							x={node.x}
							y={node.y}
							width={node.width}
							height="auto"
							component={FunnelNode}
							data={node}
							noDefaultInteractions={true}
						/>
					{/each}

					{#each edges as edge}
						<Edge
							id={edge.id}
							source={edge.source}
							target={edge.target}
							animated={edge.animated}
							label={edge.label}
							sourceHandle="bottom"
							targetHandle="top"
							color={edge.color}
							type="smoothstep"
							thickness={2}
						/>
					{/each}
				</Svelvet>
			</div>

			<div class="bg-white p-4 shadow-inner">
				<h3 class="mb-2 font-semibold">Campaign Settings</h3>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="mb-1 block text-xs font-medium text-gray-700">Budget</label>
						<div class="flex items-center">
							<span class="mr-2 text-gray-500">$</span>
							<input
								type="range"
								min="500"
								max="2000"
								step="50"
								bind:value={campaignSettings.budget}
								class="w-full accent-red-500"
							/>
							<span class="ml-2">${campaignSettings.budget}</span>
						</div>
					</div>

					<div>
						<label class="mb-1 block text-xs font-medium text-gray-700">Duration</label>
						<select
							bind:value={campaignSettings.duration}
							class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200"
						>
							<option value={7}>7 days</option>
							<option value={14}>14 days</option>
							<option value={30}>30 days</option>
							<option value={60}>60 days</option>
							<option value={90}>90 days</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<!-- Chat Interface Section -->
		<div class="flex w-full flex-col bg-white md:w-1/2">
			<div class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
				<h2 class="text-lg font-semibold">AI Campaign Assistant</h2>

				<!-- MOBILE: Funnel Toggle Button (visible on small screens) -->
				<button
					onclick={toggleDrawer}
					class="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-sm font-medium text-gray-700 md:hidden"
				>
					<span>View Funnel</span>
				</button>
			</div>

			<div class="flex-1 overflow-y-auto p-4" bind:this={chatContainer}>
				{#each messages as message}
					<div class="mb-4 flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
						<div
							class="{message.sender === 'user'
								? 'bg-red-500 text-white'
								: 'bg-gray-100 text-gray-800'} max-w-3/4 rounded-lg px-4 py-2 shadow-sm"
						>
							{#if message.sender === 'ai'}
								<div class="mb-1 flex items-center">
									<div
										class="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
									>
										<MessageSquare class="h-3 w-3" />
									</div>
									<span class="ml-2 font-semibold">ResAds Assistant</span>
								</div>
							{/if}
							<div class="whitespace-pre-line">{message.content}</div>
							<div
								class="mt-1 text-right text-xs {message.sender === 'user'
									? 'text-red-200'
									: 'text-gray-500'}"
							>
								{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
							</div>
						</div>
					</div>
				{/each}

				{#if loading}
					<div class="mb-4 flex justify-start">
						<div class="max-w-3/4 flex items-center rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
							<div class="typing-indicator">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<div class="border-t border-gray-200 p-4">
				<form onsubmit={sendMessage} class="flex gap-2">
					<input
						type="text"
						bind:value={newMessage}
						placeholder="Ask about restaurant ad strategies, targeting, budgets..."
						class="flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200"
					/>
					<button
						type="submit"
						class="flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 disabled:opacity-50"
						disabled={loading || !newMessage.trim()}
					>
						<Send class="h-5 w-5" />
					</button>
				</form>

				<div class="mt-3 flex flex-wrap gap-2">
					<button
						onclick={() => {
							newMessage = "What's the best audience targeting for my restaurant?";
							sendMessage();
						}}
						class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200"
					>
						Audience targeting
					</button>
					<button
						onclick={() => {
							newMessage = 'How should I split my budget?';
							sendMessage();
						}}
						class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200"
					>
						Budget allocation
					</button>
					<button
						onclick={() => {
							newMessage = 'What creative assets do I need?';
							sendMessage();
						}}
						class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200"
					>
						Creative assets
					</button>
					<button
						onclick={() => {
							newMessage = 'Which platforms are best for restaurants?';
							sendMessage();
						}}
						class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200"
					>
						Platform recommendations
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- MOBILE: Drawer for Funnel Visualization -->
	<Drawer.Root bind:open={drawerOpen} snapPoints={['90%']} closeOnOutsideClick={true}>
		<Drawer.Portal>
			<Drawer.Overlay class="fixed inset-0 z-50 bg-black/40" />
			<Drawer.Content
				class="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-lg border-t border-gray-200 bg-white"
			>
				<div class="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
					<h2 class="text-lg font-semibold">Campaign Funnel</h2>
					<Drawer.Close class="rounded-full p-1.5 text-gray-500 hover:bg-gray-100">
						<X class="h-5 w-5" />
					</Drawer.Close>
				</div>

				<div class="relative flex-1 overflow-hidden">
					<Svelvet editable={false} background="#f9fafb" height="100%" width="100%">
						{#each funnelSteps as node}
							<Node
								id={node.id}
								x={node.x}
								y={node.y}
								width={node.width}
								height="auto"
								component={FunnelNode}
								data={node}
								noDefaultInteractions={true}
							/>
						{/each}

						{#each edges as edge}
							<Edge
								id={edge.id}
								source={edge.source}
								target={edge.target}
								animated={edge.animated}
								label={edge.label}
								sourceHandle="bottom"
								targetHandle="top"
								color={edge.color}
								type="smoothstep"
								thickness={2}
							/>
						{/each}
					</Svelvet>
				</div>

				<div class="bg-white p-4 shadow-inner">
					<h3 class="mb-2 font-semibold">Campaign Settings</h3>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label class="mb-1 block text-xs font-medium text-gray-700">Budget</label>
							<div class="flex items-center">
								<span class="mr-2 text-gray-500">$</span>
								<input
									type="range"
									min="500"
									max="2000"
									step="50"
									bind:value={campaignSettings.budget}
									class="w-full accent-red-500"
								/>
								<span class="ml-2">${campaignSettings.budget}</span>
							</div>
						</div>

						<div>
							<label class="mb-1 block text-xs font-medium text-gray-700">Duration</label>
							<select
								bind:value={campaignSettings.duration}
								class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200"
							>
								<option value={7}>7 days</option>
								<option value={14}>14 days</option>
								<option value={30}>30 days</option>
								<option value={60}>60 days</option>
								<option value={90}>90 days</option>
							</select>
						</div>
					</div>

					<div class="mt-4 flex justify-end">
						<button
							onclick={resetFunnel}
							class="mr-2 flex items-center gap-1 rounded border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
						>
							<RefreshCw class="h-3 w-3" />
							<span>Reset Funnel</span>
						</button>

						<Drawer.Close
							class="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
						>
							<span>Back to Chat</span>
						</Drawer.Close>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
</div>

<style>
	.typing-indicator {
		display: flex;
		align-items: center;
	}

	.typing-indicator span {
		height: 8px;
		width: 8px;
		margin: 0 2px;
		background-color: #888;
		border-radius: 50%;
		display: inline-block;
		animation: typing 1.4s infinite ease-in-out both;
	}

	.typing-indicator span:nth-child(1) {
		animation-delay: 0s;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
