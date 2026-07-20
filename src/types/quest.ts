export interface QuestDependency {
	questId: string;
	requiredStage: number;
}

export interface QuestStageDependency {
	fromStage: number;
	dependency: QuestDependency;
}

export interface Quest {
	id: string;
	name: string;
	npc: string;
	requirements?: string[];
	status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
	description: string;
	location: string;
	rewards: string[];
	notes?: string;
	stages: string[];
	currentStage: number;
	dependencies?: QuestDependency[];
	stageDependencies?: QuestStageDependency[];
	wasStageLocked: boolean;
}

export type QuestStatus = Quest['status'];
