export interface QuestDependency {
	questId: string;
	requiredStage: number;
}

export interface QuestStageDependency {
	fromStage: number;
	dependency: QuestDependency;
}

export interface WorldDependency {
	worldId: string;
}

export interface StageWorldDependency {
	fromStage: number;
	dependency: WorldDependency;
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
	worldDependencies?: WorldDependency[];
	stageWorldDependencies?: StageWorldDependency[];
	wasStageLocked: boolean;
	image: string;
}
