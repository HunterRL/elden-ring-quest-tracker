import type { FC } from 'react';
import type { World } from '../types/world';
import { WorldCard } from './WorldCard';
import '../styles/QuestList.css';

interface Props {
	worlds: World[];
	onToggle: (id: string) => void;
}

export const WorldList: FC<Props> = ({ worlds, onToggle }) => {
	return (
		<div className='quest-list-container'>

			<div className='stats-bar'>
				<div className='stat-item'>
					<span className='stat-label'>World Objectives</span>
					<span className='stat-value'>{worlds.length}</span>
				</div>

				<div className='stat-item'>
					<span className='stat-label'>Completed</span>
					<span className='stat-value'>
						{worlds.filter(w => w.completed).length}
					</span>
				</div>

				<div className='stat-item'>
					<span className='stat-label'>Remaining</span>
					<span className='stat-value'>
						{worlds.filter(w => !w.completed).length}
					</span>
				</div>
			</div>

			<div className='quests-grid'>
				{worlds.map(world => (
					<WorldCard
						key={world.id}
						world={world}
						onToggle={onToggle}
					/>
				))}
			</div>

		</div>
	);
};
