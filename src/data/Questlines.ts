import type { Quest } from '../types/quest';

const fiaQuestline: Quest = {
  id: 'quest-fia-001',
  name: "Fia's Questline",
  npc: 'Fia, the Deathbed Companion',
  requirements: ['Defeat Godrick the Grafted'],
  status: 'not-started',
  description: 'Fia seeks to become the Elden Lord. Follow her questline for the Age of Duskborn ending.',
  location: 'Roundtable Hold, Crumbling Farum Azula',
  rewards: ['Deathbed Dress', 'Cursemark of Death', 'Mending Rune of the Death-Prince'],
  notes: 'Major questline with consequences.',
  stages: [
    'Give the Black Knifeprint to Sorcerer Rogier',
    'Speak with Fia, reload the area, then speak with Sorcerer Rogier',
    'Find first Seedbed Curse',
    'Find second Seedbed Curse',
    'Find third Seedbed Curse',
    'Meet at Deeproot Depths',
    'Defeat Fia champions',
    'Complete ending'
  ],
  currentStage: 0,
};

const patchesQuestline: Quest = {
    id: 'quest-patches-001',
    name: "Patches' Quest",
    npc: 'Patches',
    requirements: ['Defeat Godrick the Grafted.'],
    status: 'not-started',
    description: 'Fia seeks to become the Elden Lord. Follow her questline for the Age of Duskborn ending.',
    location: 'Roundtable Hold, Crumbling Farum Azula',
    rewards: ['Deathbed Dress', 'Cursemark of Death', 'Mending Rune of the Death-Prince'],
    notes: 'Major questline with consequences.',
    stages: [
        'Meet Fia at Roundtable Hold',
        'Exhaust her dialogue',
        'Find first Seedbed Curse',
        'Find second Seedbed Curse',
        'Find third Seedbed Curse',
        'Meet at Deeproot Depths',
        'Defeat Fia champions',
        'Complete ending'
    ],
    currentStage: 0,
};


export const Questlines = [fiaQuestline, patchesQuestline]