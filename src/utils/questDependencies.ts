import type { Quest, QuestDependency, WorldDependency } from '../types/quest';
import type { World } from '../types/world';

/**
 * Check if a quest is blocked by its dependencies
 * @param quest - The quest to check
 * @param allQuests - All quests for reference
 * @returns true if the quest is blocked, false otherwise
 */
export function isQuestBlocked(quest: Quest, allQuests: Quest[], allWorldModifiers: World[]): boolean {
	let worldBlocked = false;
	let questBlocked = false;
	if (quest.worldDependencies && quest.worldDependencies.length > 0) {
		for (const dep of quest.worldDependencies) {
			if (!isWorldDependencyMet(dep, allWorldModifiers)) {
				worldBlocked = true;
			}
		}
	}
	// Check if quest has dependencies for starting
	if (quest.dependencies && quest.dependencies.length > 0) {
		for (const dep of quest.dependencies) {
			if (!isDependencyMet(dep, allQuests)) {
				questBlocked = true;
			}
		}
	}
	return worldBlocked || questBlocked;
}

/**
 * Check if a specific stage progression is blocked
 * @param quest - The quest
 * @param fromStage - The stage trying to progress from (0-indexed)
 * @param allQuests - All quests for reference
 * @returns true if the stage progression is blocked, false otherwise
 */
export function isStageLocked(
	quest: Quest,
	targetStage: number,
	allQuests: Quest[]
): boolean {
	if (targetStage <= 0) { return false; }
	if (!quest.stageDependencies) {
		return false;
	}

	const previousStage = targetStage - 1;

	for (const stageDep of quest.stageDependencies) {
		if (stageDep.fromStage === previousStage) {
			if (!isDependencyMet(stageDep.dependency, allQuests)) {
				quest.wasStageLocked = true;
				return true;
			}
		}
	}
	return false;
}

/**
 * Check if a single dependency is met
 * @param dependency - The dependency to check
 * @param allQuests - All quests for reference
 * @returns true if the dependency is met, false otherwise
 */
function isDependencyMet(dependency: QuestDependency, allQuests: Quest[]): boolean {
	const dependencyQuest = allQuests.find(q => q.id === dependency.questId);
	if (!dependencyQuest) { return false; }

	// Check if the dependency quest has reached the required stage
	if (dependencyQuest.currentStage === undefined) {
		return false;
	}

	return dependencyQuest.currentStage >= dependency.requiredStage;
}

/**
 * Get the reason why a quest is blocked (for display purposes)
 * @param quest - The quest to check
 * @param allQuests - All quests for reference
 * @returns A description of why the quest is blocked, or null if not blocked
 */
export function getBlockedReason(quest: Quest, allQuests: Quest[]): string | null {
	if (quest.dependencies && quest.dependencies.length > 0) {
		for (const dep of quest.dependencies) {
			if (!isDependencyMet(dep, allQuests)) {
				const depQuest = allQuests.find(q => q.id === dep.questId);
				if (depQuest) {
					return `Requires ${depQuest.name} to reach Stage ${dep.requiredStage + 1}`;
				}
			}
		}
	}
	return null;
}

/**
 * Get the reason why a stage is locked (for display purposes)
 * @param quest - The quest
 * @param fromStage - The stage trying to progress from (0-indexed)
 * @param allQuests - All quests for reference
 * @returns A description of why the stage is locked, or null if not locked
 */
export function getStageLockReason(
	quest: Quest,
	targetStage: number,
	allQuests: Quest[]
): string | null {
	if (!quest.stageDependencies || targetStage <= 0) { return null; }

	const previousStage = targetStage - 1;

	for (const stageDep of quest.stageDependencies) {
		if (stageDep.fromStage === previousStage) {
			if (!isDependencyMet(stageDep.dependency, allQuests)) {
				const depQuest = allQuests.find(q => q.id === stageDep.dependency.questId);
				if (depQuest) {
					quest.wasStageLocked = true;
					return `Stage ${targetStage + 1} requires ${depQuest.name} to reach Stage ${stageDep.dependency.requiredStage + 1}`;
				}
			}
		}
	}
	return null;
};
export function isWorldDependencyMet(dependency: WorldDependency, allWorldModifiers: World[]): boolean {
	const dependencyWorld = allWorldModifiers.find(w => w.id === dependency.worldId);
	if (!dependencyWorld) { return false; }
	if (dependencyWorld.completed) { return true; }
	return false;
}

export function isQuestWorldBlocked(quest: Quest, allWorldModifiers: World[]): boolean {
	// Check if quest has dependencies for starting
	if (quest.worldDependencies && quest.worldDependencies.length > 0) {
		for (const dep of quest.worldDependencies) {
			if (!isWorldDependencyMet(dep, allWorldModifiers)) {
				return true;
			}
		}
	}
	return false;
}

export function getWorldBlockedReason(quest: Quest, allWorldModifiers: World[]): string | null {
	if (quest.worldDependencies && quest.worldDependencies.length > 0) {
		for (const dep of quest.worldDependencies) {
			if (!isWorldDependencyMet(dep, allWorldModifiers)) {
				const depWorld = allWorldModifiers.find(w => w.id === dep.worldId);
				if (depWorld) {
					return `This Quest requires ${depWorld.name} to be defeated`;
				}
			}
		}
	}
	return null;
};
