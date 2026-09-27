import type { Quest } from '../types/quest';
// added rogier's quest dependencies
const fiaQuestline: Quest = {
	id: 'quest-fia-001',
	name: 'Fia\'s Quest',
	npc: 'Fia, the Deathbed Companion',
	requirements: [ 'Defeat Godrick the Grafted' ],
	status: 'not-started',
	description: 'Fia seeks to become the Elden Lord. Follow her questline for the Age of Duskborn ending.',
	location: 'Roundtable Hold',
	rewards: [ '[Mending Rune of the Death-Prince](https://eldenring.wiki.gg/wiki/Mending_Rune_of_the_Death-Prince)', '[Fia\'s Set](https://eldenring.wiki.gg/wiki/Fia%27s_Set)' ],
	stages: [
		'Speak with Fia, reload the area, then speak with Sorcerer Rogier',
		'Head to the Altus Plateau, and speak to Fia near the Grand Lift of Dectus',
		'Speak with Fia to receive the Weathered Dagger',
		// 'Give the Dagger to D at the Roundtable Hold',
		'Reload the area and speak with Fia at her new location (Smithing Master Hewg)',
		'Go to the Prince of Death\'s Throne and speak with Fia',
		'Embrace her when she asks you if you came to kill her',
		'Reload the area, and speak to Fia again',
		'Enter the dream and defeat Lichdragon Fortissax',
		'Return to Fia to receive the [Mending Rune of the Death-Prince](https://eldenring.wiki.gg/wiki/Mending_Rune_of_the_Death-Prince) and [Fia\'s Set](https://eldenring.wiki.gg/wiki/Fia%27s_Set)',
		'Completed'
	],
	currentStage: 0,
	wasStageLocked: false,
	// Stage 3 of Fia's Quest can't be progressed to Stage 4 until patches' quest is at stage 6
	stageDependencies: [
		{
			fromStage: 3, // Stage 3 in 0-indexed is 2, moving from stage 2 to 3
			dependency: {
				questId: 'quest-d-001',
				requiredStage: 4 // Stage 6 in 0-indexed is 5
			}
		}
	],
	worldDependencies: [
		{
			worldId: 'world-godrick-001'
		}
	],
	image: '/images/quests/fia-001.jpg'
};

const patchesQuestline: Quest = {
	id: 'quest-patches-001',
	name: 'Patches\' Quest',
	npc: 'Patches the Untethered',
	status: 'not-started',
	description: 'Follow Patches through his adventures and misdeeds.',
	location: 'Murkwater Cave',
	rewards: [ '[Magma Whip Candlestick](https://eldenring.wiki.gg/wiki/Magma_Whip_Candlestick)', '[Patches\' Crouch](https://eldenring.wiki.gg/wiki/Patches\'_Crouch)' ],
	stages: [
		'Spare Patches during his boss fight and speak to him',
		'Activate Patches\' Trap Chest in Murkwater Cave',
		'Travel back to Murkwater Cave after being teleported and speak to Patches',
		'Speak with Patches at Scenic Isle',
		'Find the rainbow stones near the First Mt. Gelmire Campsite and trigger a cutscene',
		'Speak with Patches at Volcano Manor and receive [Letter to Patches](https://eldenring.wiki.gg/wiki/Letter_to_Patches)',
		'Go to Ruin-Strewn Precipice and defeat Great Horned Tragoth',
		'Return to Patches at Volcano Manor and speak with him',
		'Reload the area and speak with Patches again to receive the [Magma Whip Candlestick](https://eldenring.wiki.gg/wiki/Magma_Whip_Candlestick)',
		'Speak with Patches at the Shaded Castle to receive the [Dancer\'s Castanets](https://eldenring.wiki.gg/wiki/Dancer\'s_Castanets)',
		'Return to Murkwater Cave, fight Patches, and spare him once again to recieve the [Patches\' Crouch](https://eldenring.wiki.gg/wiki/Patches\'_Crouch)',
		'Completed'
	],
	currentStage: 0,
	wasStageLocked: false,
	stageDependencies: [
		{
			fromStage: 5,
			dependency: {
				questId: 'quest-tanith-001',
				requiredStage: 6
			}
		}
	],
	image: '/images/quests/patches-001.jpg'
};

const tanithQuestline: Quest = {
	id: 'quest-tanith-001',
	name: 'Tanith\'s Quest',
	npc: 'Tanith, Volcano Manor Proprietress',
	status: 'not-started',
	description: 'Help Tanith fight against the Tyranny of the Fingers.',
	location: 'Murkwater Cave',
	rewards: [ '[Magma Shot](https://eldenring.wiki.gg/wiki/Magma_Shot)', '[Serpentbone Blade](https://eldenring.wiki.gg/wiki/Serpentbone_Blade)', '[Taker\'s Cameo](https://eldenring.wiki.gg/wiki/Taker\'s_Cameo)' ],
	stages: [
		'Speak with Tanith at Volcano Manor, agree to join her family, and receive the [Drawing-Room Key](https://eldenring.wiki.gg/wiki/Drawing-Room_Key)',
		'Using the Drawing-Room Key, open up several doors in Volcano Manro and pick up the note left on the table for your first mission',
		'Invade Istvan near the Divine Bridge in Stormhill (A marker will be on placed on your map)',
		'Return to Tanith and recieve the [Magma Shot](https://eldenring.wiki.gg/wiki/Magma_Shot)',
		'Find another note left on the table for your second mission',
		'Invade Rileigh the Idle in Altus Plateau (A marker will be on placed on your map)',
		'Return to Tanith and receive the [Serpentbone Blade](https://eldenring.wiki.gg/wiki/Serpentbone_Blade)',
		'Find another note left on the table for your third mission',
		'Invade Juno Hoslow, Knight of Blood in the Mountaintops of the Giants (A marker will be on placed on your map)',
		'Return to Tanith and receive [Taker\'s Cameo](https://eldenring.wiki.gg/wiki/Taker\'s_Cameo)',
		'Speak to Tanith and she will ask if you want to meet their Lord, saying yes teleports you to a site of grace immediately before the boss fight with Rykard, Lord of Blasphemy.',
		'Speak with Tanith again',
		'Once Tanith has disappeared, find her in Rykard\'s boss area',
		'Give Tanith the [Dancer\'s Castanets](https://eldenring.wiki.gg/wiki/Dancer\'s_Castanets)',
		'Completed'
	],
	currentStage: 0,
	wasStageLocked: false,

	stageDependencies: [
		{
			fromStage: 13,
			dependency: {
				questId: 'quest-patches-001',
				requiredStage: 10
			}
		}
	],
	image: '/images/quests/tanith-001.jpg'
};

const roderikaquest: Quest = {
	id: 'quest-roderika-001',
	name: 'Roderika\'s Quest',
	npc: 'Roderika',
	status: 'not-started',
	description: 'Blank',
	location: 'Stormhill Shack',
	rewards: [ '[Crimson Hood](https://eldenring.wiki.gg/wiki/Crimson_Hood)', '[Spirit Tuning](https://eldenring.wiki.fextralife.com/Upgrades)' ],
	stages: [
		'Speak with the Red Cloaked Woman at the Stormhill Shack',
		'Obtain the [Chrysalid\'s Memento](https://eldenring.wiki.gg/wiki/Chrysalid\'s_Memento) from Stormveil Castle',
		'Give the [Chrysalid\'s Memento](https://eldenring.wiki.gg/wiki/Chrysalid\'s_Memento) to Roderika before killing Godrick the Grafted',
		'Speak with Roderkia at the Roundtable Hold',
		'Speak with Smithing Master Hewg and return to Rderkia',
		'Speak with Roderika again',
		'Return to Smithing Master Hewg',
		'Reload the area and Roderkia will now offer spirit tuning services',
		'Return to where you found the [Chrysalid\'s Memento](https://eldenring.wiki.gg/wiki/Chrysalid\'s_Memento) to find the [Crimson Hood](https://eldenring.wiki.gg/wiki/Crimson_Hood)',
		'Completed'
	],
	currentStage: 0,
	wasStageLocked: false,
	image: '/images/quests/roderika-001.jpg'
};
// requirement: need to be added, get two great runes.
const poopquest: Quest = {
	id: 'quest-poop-001',
	name: 'Dung Eater\'s Quest',
	npc: 'Dung Eater',
	status: 'not-started',
	description: 'Blank',
	location: 'Roundtable Hold',
	rewards: [ '[Sewer-Gaol Key](https://eldenring.wiki.gg/wiki/Sewer-Gaol_Key)', '[Mending Rune of the Fell Curse](https://eldenring.wiki.gg/wiki/Mending_Rune_of_the_Fell_Curse)'],
	stages: [
		'Speak with the Dung Eater at the Roundtable Hold',
		'Give him a [Seedbed Curse](https://eldenring.wiki.gg/wiki/Seedbed_Curse) to get the [Sewer-Gaol Key](https://eldenring.wiki.gg/wiki/Sewer-Gaol_Key)',
		'Use the [Sewer-Gaol Key](https://eldenring.wiki.gg/wiki/Sewer-Gaol_Key) to access the sewers beneath Leyndell and speak to Dung Eater there',
		'Speak to Dung Eater, saying "Leave your gaol!"',
		'Return to the Roundtable Hold. Dung Eater has left you a message, challenging you to a fight',
		'Defeat Dung Eater outside Lendell',
		'Return to Dung Eater at the Roundtable Hold',
		'Bring 5 [Seedbed Curses](https://eldenring.wiki.gg/wiki/Seedbed_Curse) to Dung Eater\'s body in the sewers underneath Leyndell and receive the [Mending Rune of the Fell Curse](https://eldenring.wiki.gg/wiki/Mending_Rune_of_the_Fell_Curse)',
		'Completed'
	],
	currentStage: 0,
	wasStageLocked: false,
	image: '/images/quests/poop-001.jpg'
};

// need to add optional choice to not give set, add beastman dependency
const dquest: Quest = {
	id: 'quest-d-001',
	name: 'D\'s Quest',
	npc: 'D, Hunter of the Dead',
	status: 'not-started',
	description: 'Blank',
	location: 'Summonwater Village',
	rewards: [],
	stages: [
		'Speak with D west of Summonwater Village',
		'Speak with D at the entrance of Summonwater Village',
		'Speak with D at the Roundtable Hold',
		'Give the [Weathered Dagger](https://eldenring.wiki.gg/wiki/Weathered_Dagger) to D at the Roundtable Hold',
		'Return to where Fia was when you got the [Weathered Dagger](https://eldenring.wiki.gg/wiki/Weathered_Dagger) and loot the [Twinned Set](https://eldenring.wiki.gg/wiki/Twinned_Set) and [D\'s Bell Bearing](https://eldenring.wiki.gg/wiki/D\'s_Bell_Bearing)',
		'Give the [Twinned Set](https://eldenring.wiki.gg/wiki/Twinned_Set) to D\'s twin Brother in the Roundtable Hold',
		'Speak with D\'s twin Brother in Deeproot Depths',
		'Completed'
	],
	currentStage: 0,
	wasStageLocked: false,
	stageDependencies: [
		{
			fromStage: 3,
			dependency: {
				questId: 'quest-fia-001',
				requiredStage: 2
			}
		},
		{
			fromStage: 6,
			dependency: {
				questId: 'quest-fia-001',
				requiredStage: 9
			}
		}
	],
	image: '/images/quests/d-001.jpg'
};

export const Questlines = [ fiaQuestline, patchesQuestline, tanithQuestline, roderikaquest, poopquest, dquest ];
