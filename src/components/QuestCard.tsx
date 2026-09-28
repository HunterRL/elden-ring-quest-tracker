import { getBlockedReason, getStageLockReason, getWorldBlockedReason } from '../utils/questDependencies';
import type { FC } from 'react';
import type { Quest } from '../types/quest';
import ReactMarkdown from 'react-markdown';
import type { World } from '../types/world';
import { useState } from 'react';
import '../styles/QuestCard.css';

interface QuestCardProps {
	quest: Quest;
	quests?: Quest[];
	world: World[];
	onStatusChange: (id: string, status: Quest['status']) => void;
	onDelete: (id: string) => void;
	onStageProgress?: (id: string, stageIndex: number) => void;
}

export const QuestCard: FC<QuestCardProps> = ({ quest, quests = [], world = [], onStatusChange, onDelete, onStageProgress }) => {
	const [ isExpanded, setIsExpanded ] = useState(false);
	const getStatusColor = (status: Quest['status']): string => {
		switch (status) {
			case 'not-started':
				return 'status-not-started';
			case 'in-progress':
				return 'status-in-progress';
			case 'completed':
				return 'status-completed';
			case 'blocked':
				return 'status-blocked';
		}
	};

	const getStatusLabel = (status: Quest['status']): string => {
		switch (status) {
			case 'not-started':
				return 'Not Started';
			case 'in-progress':
				return 'In Progress';
			case 'completed':
				return 'Completed';
			case 'blocked':
				return 'Blocked';
		}
	};

	// Calculate progress fill percentage
	const getProgressFill = (): number => {
		if (!quest.stages || quest.stages.length === 0) { return 0; };
		if (quest.currentStage === undefined) { return 0; }
		return ((quest.currentStage + 1) / quest.stages.length) * 100;
	};

	const blockedReason = getBlockedReason(quest, quests);
	const nextStageLockReason =
		quest.currentStage !== undefined &&
		quest.currentStage < quest.stages.length - 1
			? getStageLockReason(quest, quest.currentStage + 1, quests, world)
			: null;
	const worldblockedReason = getWorldBlockedReason(quest, world);
	if (blockedReason !== null || nextStageLockReason !== null || worldblockedReason !== null) {
		quest.status = 'blocked';
	};

	// Collapsed view
	if (!isExpanded) {
		return (
			<div
				className={`quest-card quest-card-collapsed ${getStatusColor(quest.status)}`}
				onClick={() => setIsExpanded(true)}
			>
				<div className='quest-collapsed-content'>
					<div className='quest-image-container'>
						<img src={quest.image} alt={quest.name} className='quest-image' />
					</div>
					<div className='quest-collapsed-text'>
						<h3 className='quest-name-collapsed'>{quest.name}</h3>
					</div>
				</div>
			</div>
		);
	}

	// Expanded view
	return (
		<div className={`quest-card quest-card-expanded ${getStatusColor(quest.status)}`}>
			<div className='quest-header'>
				<h3 className='quest-name'>{quest.name}</h3>
				<div className='quest-header-buttons'>
					<button
						className='btn-collapse'
						onClick={() => setIsExpanded(false)}
						title='Collapse quest'
					>
						✕
					</button>
					<button
						className='btn-delete'
						onClick={() => onDelete(quest.id)}
						title='Delete quest'
					>
						🗑
					</button>
				</div>
			</div>

			<div className='quest-meta'>
				<span className='meta-item'>
					<strong>NPC:</strong> {quest.npc}
				</span>
				{quest.location && (
					<span className='meta-item'>
						<strong>Starting Location:</strong> {quest.location}
					</span>
				)}
			</div>

			{quest.description && (
				<p className='quest-description'>{quest.description}</p>
			)}

			{worldblockedReason && (
				<div className='quest-blocked-message'>
					<strong>⚠ {worldblockedReason}</strong>
				</div>
			)}

			{blockedReason && (
				<div className='quest-blocked-message'>
					<strong>⚠ {blockedReason}</strong>
				</div>
			)}
			{nextStageLockReason && (
				<div className='quest-blocked-message'>
					<strong>⚠ {nextStageLockReason}</strong>
				</div>
			)}

			{quest.stages && quest.stages.length > 0 && (
				<div className='quest-stages'>
					<div className='stages-progress-bar' style={{ '--progress-fill': `${getProgressFill()}%` } as React.CSSProperties}>
						<div className='progress-track'>
							{quest.stages.map((stage, idx) => {
								const stageLocked = getStageLockReason(quest, idx, quests, world);
								return (
									<button
										key={idx}
										className={`stage-circle ${
											quest.currentStage !== undefined && idx <= quest.currentStage
												? 'stage-completed'
												: ''
										} ${quest.currentStage === idx ? 'stage-current' : ''}${
											stageLocked ? ' stage-locked' : ''
										}`}
										onClick={() => {
											if (!stageLocked && quest.status !== 'blocked') {
												onStageProgress?.(quest.id, idx);
											}
										}}
										title={`Stage ${idx + 1}: ${stage}`}
										aria-label={`Stage ${idx + 1}`}
										disabled={stageLocked === 'blocked'}
									>
										{stageLocked ? '🔒' : idx + 1}
									</button>
								);
							})}
						</div>
					</div>

					{quest.currentStage !== undefined && quest.stages.length > 0 && (
						<div className='stage-info'>
							<div className='stage-text-display'>
								<span className='stage-label'>Current Stage:</span>
								<span className='stage-name'>
									<ReactMarkdown components={{
										a: ({ ...props }) => (
											<a {...props} target='_blank' rel='noopener noreferrer' />
										)
									}}
									>
										{quest.stages[quest.currentStage]}
									</ReactMarkdown>
								</span>
							</div>
							<div className='stage-counter'>
								{Math.min(quest.currentStage + 1, quest.stages.length)} / {quest.stages.length}
							</div>
						</div>
					)}
				</div>
			)}

			{quest.rewards.length > 0 && (
				<div className='quest-rewards'>
					<strong>Rewards:</strong>
					<ul>
						{quest.rewards.map((reward, idx) => (
							<li key={idx}>
								<ReactMarkdown components={{
									a: ({ ...props }) => (
										<a {...props} target='_blank' rel='noopener noreferrer' />
									)
								}}
								>
									{reward}
								</ReactMarkdown>
							</li>
						))}
					</ul>
				</div>
			)}

			{quest.notes && (
				<div className='quest-notes'>
					<strong>Notes:</strong>
					<p>{quest.notes}</p>
				</div>
			)}

			<div className='quest-footer'>
				<select
					className={`status-select ${getStatusColor(quest.status)}`}
					value={quest.status}
					onChange={e => onStatusChange(quest.id, e.target.value as Quest['status'])}
					disabled={quest.status === 'blocked'}
				>
					<option value='not-started'>Not Started</option>
					<option value='in-progress'>In Progress</option>
					<option value='completed'>Completed</option>
					<option value='blocked'>Blocked</option>
				</select>
				<span className={`status-badge ${getStatusColor(quest.status)}`}>
					{getStatusLabel(quest.status)}
				</span>
			</div>
		</div>
	);
};
