import { intitalCheck } from '../utils/questDependencies';
import type { FC } from 'react';
import type { Quest } from '../types/quest';
import { QuestCard } from './QuestCard';
import type { World } from '../types/world';
import { useState } from 'react';
import '../styles/QuestList.css';

interface QuestListProps {
	quests: Quest[];
	world: World[];
	onStatusChange: (id: string, status: Quest['status']) => void;
	onDelete: (id: string) => void;
	onStageProgress?: (id: string, stageIndex: number) => void;
}

export const QuestList: FC<QuestListProps> = ({
	quests,
	world,
	onStatusChange,
	onDelete,
	onStageProgress
}) => {
	const [ filter, setFilter ] = useState<'all' | 'not-started' | 'in-progress' | 'completed' | 'blocked'>(
		'all'
	);

	const filteredQuests = quests.filter(
		q => filter === 'all' || q.status === filter
	);
	intitalCheck(quests, world);
	const stats = {
		total: quests.length,
		notStarted: quests.filter(q => q.status === 'not-started').length,
		inProgress: quests.filter(q => q.status === 'in-progress').length,
		completed: quests.filter(q => q.status === 'completed').length,
		blocked: quests.filter(q => q.status === 'blocked').length
	};

	return (
		<div className='quest-list-container'>
			<div className='stats-bar'>
				<div className='stat-item'>
					<span className='stat-label'>Total Quests:</span>
					<span className='stat-value'>{stats.total}</span>
				</div>
				<div className='stat-item'>
					<span className='stat-label'>Not Started:</span>
					<span className='stat-value'>{stats.notStarted}</span>
				</div>
				<div className='stat-item'>
					<span className='stat-label'>In Progress:</span>
					<span className='stat-value'>{stats.inProgress}</span>
				</div>
				<div className='stat-item'>
					<span className='stat-label'>Completed:</span>
					<span className='stat-value'>{stats.completed}</span>
				</div>
				<div className='stat-item'>
					<span className='stat-label'>Blocked:</span>
					<span className='stat-value'>{stats.blocked}</span>
				</div>
			</div>

			<div className='filter-buttons'>
				<button
					className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
					onClick={() => setFilter('all')}
				>
					All ({stats.total})
				</button>
				<button
					className={`filter-btn ${filter === 'not-started' ? 'active' : ''}`}
					onClick={() => setFilter('not-started')}
				>
					Not Started ({stats.notStarted})
				</button>
				<button
					className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
					onClick={() => setFilter('in-progress')}
				>
					In Progress ({stats.inProgress})
				</button>
				<button
					className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
					onClick={() => setFilter('completed')}
				>
					Completed ({stats.completed})
				</button>
				<button
					className={`filter-btn ${filter === 'blocked' ? 'active' : ''}`}
					onClick={() => setFilter('blocked')}
				>
					Blocked ({stats.blocked})
				</button>
			</div>

			<div className='quests-grid'>
				{filteredQuests.length === 0
					? (
						<div className='empty-state'>
							<p>Alas foul Tarnished, it would seem you are questless.</p>
						</div>
					)
					: (
						filteredQuests.map(quest => (
							<QuestCard
								key={quest.id}
								quest={quest}
								quests={quests}
								world={world}
								onStatusChange={onStatusChange}
								onDelete={onDelete}
								onStageProgress={onStageProgress}
							/>
						))
					)}
			</div>
		</div>
	);
};
