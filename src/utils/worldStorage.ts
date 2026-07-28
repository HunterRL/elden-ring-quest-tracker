import type { World } from '../types/world.ts';

const STORAGE_KEY = 'elden-ring-world-modifiers';

export const worldStorage = {
	// Load worlds from localStorage
	loadWorlds: (): World[] => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			return saved ? JSON.parse(saved) : [];
		} catch (error) {
			console.error('Error loading worlds:', error);
			return [];
		}
	},

	// Save worlds to localStorage
	saveWorlds: (worlds: World[]): void => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(worlds));
		} catch (error) {
			console.error('Error saving worlds:', error);
		}
	},

	// Add a new world
	addWorld: (world: World): void => {
		const worlds = worldStorage.loadWorlds();
		worlds.push(world);
		worldStorage.saveWorlds(worlds);
	},

	// Update a world
	updateWorld: (id: string, updates: Partial<World>): void => {
		const worlds = worldStorage.loadWorlds();
		const index = worlds.findIndex(w => w.id === id);
		if (index !== -1) {
			worlds[index] = { ...worlds[index], ...updates };
			worldStorage.saveWorlds(worlds);
		}
	},

	// Delete a world
	deleteWorld: (id: string): void => {
		const worlds = worldStorage.loadWorlds().filter(w => w.id !== id);
		worldStorage.saveWorlds(worlds);
	},

	// Update world status
	updateWorldstatus: (id: string, completed: boolean): void => {
		worldStorage.updateWorld(id, { completed });
	}
};
