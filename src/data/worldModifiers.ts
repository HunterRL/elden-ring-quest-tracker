import type { World } from '../types/world';

const margit: World = {
	id: 'world-margit-001',
	name: 'Margit, the Fell Omen',
	completed: false,
	location: 'Entrance of Stormveil Castle'
};
const godrick: World = {
	id: 'world-godrick-001',
	name: 'Godrick the Grafted',
	completed: false,
	location: 'Stormveil Castle'
};
export const worldModifiers = [ margit, godrick ];
