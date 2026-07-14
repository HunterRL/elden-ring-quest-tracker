export interface QuestDependency {
  questId: string;
  requiredStage: number; // 0-indexed stage
}

export interface QuestStageDependency {
  fromStage: number; // The stage that requires the dependency
  dependency: QuestDependency;
}

export interface Quest {
  id: string;
  name: string;
  npc: string;
  requirements: string[];
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  description: string;
  location: string;
  rewards: string[];
  notes: string;
  stages?: string[];
  currentStage?: number;
  dependencies?: QuestDependency[]; // Quest must reach this stage before this quest can start
  stageDependencies?: QuestStageDependency[]; // Stage-specific dependencies
}

export type QuestStatus = Quest['status'];
