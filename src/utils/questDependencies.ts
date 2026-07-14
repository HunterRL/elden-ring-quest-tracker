import type { Quest, QuestDependency } from '../types/quest';

/**
 * Check if a quest is blocked by its dependencies
 * @param quest - The quest to check
 * @param allQuests - All quests for reference
 * @returns true if the quest is blocked, false otherwise
 */
export function isQuestBlocked(quest: Quest, allQuests: Quest[]): boolean {
  // Check if quest has dependencies for starting
  if (quest.dependencies && quest.dependencies.length > 0) {
    for (const dep of quest.dependencies) {
      if (!isDependencyMet(dep, allQuests)) {
        return true;
      }
    }
  }
  return false;
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
    if (targetStage <= 0) return false;
    if (!quest.stageDependencies) {
        return false;
    }

    const previousStage = targetStage - 1;

  for (const stageDep of quest.stageDependencies) {
      if (stageDep.fromStage === previousStage) {
          return !isDependencyMet(stageDep.dependency, allQuests);
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
  const dependencyQuest = allQuests.find((q) => q.id === dependency.questId);
  if (!dependencyQuest) return false;

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
        const depQuest = allQuests.find((q) => q.id === dep.questId);
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
    if (!quest.stageDependencies || targetStage <= 0) return null;

    const previousStage = targetStage - 1;

  for (const stageDep of quest.stageDependencies) {
      if (stageDep.fromStage === previousStage) {
      if (!isDependencyMet(stageDep.dependency, allQuests)) {
        const depQuest = allQuests.find((q) => q.id === stageDep.dependency.questId);
        if (depQuest) {
            return `Stage ${targetStage + 1} requires ${depQuest.name} to reach Stage ${stageDep.dependency.requiredStage + 1}`;
        }
      }
    }
  }
  return null;
}