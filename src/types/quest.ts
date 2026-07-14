export interface Quest {
  id: string;
  name: string;
  npc: string;
  requirements: string[];
  status: 'not-started' | 'in-progress' | 'completed';
  description: string;
  location: string;
  rewards: string[];
  notes: string;
  stages?: string[];
  currentStage?: number;
}

export type QuestStatus = Quest['status'];
