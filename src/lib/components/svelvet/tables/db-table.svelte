<script lang="ts">
	import { Node, Anchor } from 'svelvet';
	import * as Table from '$lib/components/ui/table';

	// Customizable properties using Svelte 5's $props()
	let {
		id = 'films',
		positionX = 1090,
		positionY = 150,
		headingText = 'Films',
		headingColor = '#FF5252',
		borderColor = '#000000',
		anchorDirection = 'west',
		tableData = [
			{ field: 'id', type: 'bigint', constraint: 'autoincrement()' },
			{ field: 'title', type: 'varchar', constraint: 'not null' },
			{ field: 'episode_id', type: 'varchar', constraint: 'not null' },
			{ field: 'opening_crawl', type: 'varchar', constraint: 'not null' },
			{ field: 'director', type: 'varchar', constraint: 'not null' },
			{ field: 'producer', type: 'varchar', constraint: 'not null' },
			{ field: 'release_date', type: 'date', constraint: 'not null' }
		],
		anchorTop = 52,
		anchorLeft = -16,
		cellWidth = 70,
		cellPadding = 10,
		backgroundColor = '#FFFFFF',
		shadowColor = '#000000'
	} = $props();

	// Local state using $state
	let isHovered = $state(false);
</script>

<Node useDefaults {id} position={{ x: positionX, y: positionY }}>
	<div
		class="nodeWrapper"
		style="
            background-color: {backgroundColor}; 
            border: 3px solid {borderColor};
            box-shadow: {isHovered ? '8px 8px 0px' : '6px 6px 0px'} {shadowColor};
        "
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
	>
		<div class="anchor-point" style="top: {anchorTop}px; left: {anchorLeft}px;">
			<Anchor output id="{id}_anchor1" direction={anchorDirection}></Anchor>
		</div>
		<div id="container">
			<div
				class="heading"
				style="
                    background-color: {headingColor}; 
                    border-bottom: 3px solid {borderColor};
                "
			>
				{headingText}
			</div>

			<Table.Root id="{id}Table" class="db-table">
				<Table.Body>
					{#each tableData as row}
						<Table.Row>
							<Table.Cell
								style="
                                    width: {cellWidth}px; 
                                    padding: {cellPadding}px; 
                                    border-right: 2px solid {borderColor}; 
                                    border-bottom: {row === tableData[tableData.length - 1]
									? '0'
									: '2px'} solid {borderColor};
                                    font-family: 'Courier New', monospace;
                                    font-weight: bold;
                                "
							>
								{row.field}
							</Table.Cell>
							<Table.Cell
								style="
                                    width: {cellWidth}px; 
                                    padding: {cellPadding}px; 
                                    border-right: 2px solid {borderColor}; 
                                    border-bottom: {row === tableData[tableData.length - 1]
									? '0'
									: '2px'} solid {borderColor};
                                    font-family: 'Courier New', monospace;
                                "
							>
								{row.type}
							</Table.Cell>
							<Table.Cell
								style="
                                    width: {cellWidth}px; 
                                    padding: {cellPadding}px; 
                                    border-bottom: {row === tableData[tableData.length - 1]
									? '0'
									: '2px'} solid {borderColor};
                                    font-family: 'Courier New', monospace;
                                    font-style: italic;
                                "
							>
								{row.constraint}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</Node>

<style>
	.nodeWrapper {
		box-sizing: border-box;
		width: fit-content;
		border-radius: 0px;
		height: fit-content;
		position: relative;
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		padding: 0px;
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
	}

	.nodeWrapper:hover {
		transform: translate(-2px, -2px);
	}

	.anchor-point {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 10px;
		z-index: 10;
	}

	.heading {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 12px;
		font-size: 22px;
		font-weight: 900;
		font-family: Arial, sans-serif;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: #000000;
	}

	:global(.db-table) {
		border-collapse: collapse;
		width: 100%;
	}

	:global(.db-table td) {
		transition: background-color 0.2s ease;
	}

	:global(.db-table tr:hover td) {
		background-color: #f3f3f3;
	}
</style>
