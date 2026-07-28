import type { Quest } from '../types/quest';

const STORAGE_KEY = 'elden-ring-quests';

export const questStorage = {
	// Load quests from localStorage
	loadQuests: (): Quest[] => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			return saved ? JSON.parse(saved) : [];
		} catch (error) {
			console.error('Error loading quests:', error);
			return [];
		}
	},

	// Save quests to localStorage
	saveQuests: (quests: Quest[]): void => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(quests));
		} catch (error) {
			console.error('Error saving quests:', error);
		}
	},

	// Add a new quest
	addQuest: (quest: Quest): void => {
		const quests = questStorage.loadQuests();
		quests.push(quest);
		questStorage.saveQuests(quests);
	},

	// Update a quest
	updateQuest: (id: string, updates: Partial<Quest>): void => {
		const quests = questStorage.loadQuests();
		const index = quests.findIndex(q => q.id === id);
		if (index !== -1) {
			quests[index] = { ...quests[index], ...updates };
			questStorage.saveQuests(quests);
		}
	},

	// Delete a quest
	deleteQuest: (id: string): void => {
		const quests = questStorage.loadQuests().filter(q => q.id !== id);
		questStorage.saveQuests(quests);
	},

	// Update quest status
	updateQuestStatus: (id: string, status?: 'not-started' | 'in-progress' | 'completed' | 'blocked'): void => {
		questStorage.updateQuest(id, { status });
	}
};
