import type { Quest } from '../types/quest';

const fiaQuestline: Quest = {
  id: 'quest-fia-001',
  name: "Fia's Quest",
  npc: 'Fia, the Deathbed Companion',
  requirements: ['Defeat Godrick the Grafted'],
  status: 'blocked',
  description: 'Fia seeks to become the Elden Lord. Follow her questline for the Age of Duskborn ending.',
  location: 'Roundtable Hold',
  rewards: ['Deathbed Dress', 'Cursemark of Death', 'Mending Rune of the Death-Prince'],
  notes: 'Major questline with consequences.',
  stages: [
      'Speak with Fia, reload the area, then speak with Sorcerer Rogier',
      'Head to the Altus Plateau, and speak to Fia near the Grand Lift of Dectus',
      'Speak with Fia to receive the Weathered Dagger',
      'Give the Dagger to D at the Roundtable Hold',
      'Reload the area and speak with Fia at her new location (Smithing Master Hewg)',
      "Go to the Prince of Death's Throne and speak with Fia",
      'Embrace her when she asks you if you came to kill her',
      'Reload the area, and speak to Fia again',
      'Enter the dream and defeat Lichdragon Fortissax',
      "Return to Fia to receive the Mending Rune of the Death-Prince and Fia's Set"
  ],
  currentStage: 0,
  // Fia's Quest can't be started until Patches' quest is at stage 2
  dependencies: [
    {
      questId: 'quest-patches-001',
      requiredStage: 1, // Stage 2 in 0-indexed is 1
    }
  ],
  // Stage 3 of Fia's Quest can't be progressed to Stage 4 until patches' quest is at stage 6
  stageDependencies: [
    {
      fromStage: 2, // Stage 3 in 0-indexed is 2, moving from stage 2 to 3
      dependency: {
        questId: 'quest-patches-001',
        requiredStage: 5, // Stage 6 in 0-indexed is 5
      }
    }
  ]
};

const patchesQuestline: Quest = {
    id: 'quest-patches-001',
    name: "Patches' Quest",
    npc: 'Patches',
    requirements: ['Defeat Godrick the Grafted.'],
    status: 'not-started',
    description: 'Follow Patches through his adventures and misdeeds.',
    location: 'Roundtable Hold, Crumbling Farum Azula',
    rewards: ['Deathbed Dress', 'Cursemark of Death', 'Mending Rune of the Death-Prince'],
    notes: 'Major questline with consequences.',
    stages: [
        'Meet Patches at Roundtable Hold',
        'Exhaust his dialogue',
        'Find first encounter',
        'Find second encounter',
        'Find third encounter',
        'Meet at Deeproot Depths',
        'Defeat Patches',
        'Complete ending'
    ],
    currentStage: 0,
};


export const Questlines = [fiaQuestline, patchesQuestline]