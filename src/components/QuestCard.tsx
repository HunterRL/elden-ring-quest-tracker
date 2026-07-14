import type { FC } from 'react';
import type { Quest } from '../types/quest';
import '../styles/QuestCard.css';

interface QuestCardProps {
  quest: Quest;
  onStatusChange: (id: string, status: Quest['status']) => void;
  onDelete: (id: string) => void;
  onStageProgress?: (id: string, stageIndex: number) => void;
}

export const QuestCard: FC<QuestCardProps> = ({ quest, onStatusChange, onDelete, onStageProgress }) => {
  const getStatusColor = (status: Quest['status']): string => {
    switch (status) {
      case 'not-started':
        return 'status-not-started';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
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
    }
  };

  // Calculate progress fill percentage
  const getProgressFill = (): number => {
    if (!quest.stages || quest.stages.length === 0) return 0;
    if (quest.currentStage === undefined) return 0;
    return ((quest.currentStage + 1) / quest.stages.length) * 100;
  };

  return (
    <div className={`quest-card ${getStatusColor(quest.status)}`}>
      <div className="quest-header">
        <h3 className="quest-name">{quest.name}</h3>
        <button
          className="btn-delete"
          onClick={() => onDelete(quest.id)}
          title="Delete quest"
        >
          ✕
        </button>
      </div>

      <div className="quest-meta">
        <span className="meta-item">
          <strong>NPC:</strong> {quest.npc}
        </span>
        {quest.location && (
          <span className="meta-item">
            <strong>Starting Location:</strong> {quest.location}
          </span>
        )}
      </div>

      {quest.description && (
        <p className="quest-description">{quest.description}</p>
      )}

      {quest.requirements && (
              <span className="quest-requirements">
                  <strong>Requirements:</strong> {quest.requirements}
              </span>
      )}

      {quest.stages && quest.stages.length > 0 && (
        <div className="quest-stages">
          <div className="stages-progress-bar" style={{ '--progress-fill': `${getProgressFill()}%` } as React.CSSProperties}>
            <div className="progress-track">
              {quest.stages.map((stage, idx) => (
                <button
                  key={idx}
                  className={`stage-circle ${
                    quest.currentStage !== undefined && idx <= quest.currentStage
                      ? 'stage-completed'
                      : ''
                  } ${quest.currentStage === idx ? 'stage-current' : ''}`}
                  onClick={() => onStageProgress?.(quest.id, idx)}
                  title={`Stage ${idx + 1}: ${stage}`}
                  aria-label={`Stage ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {quest.currentStage !== undefined && quest.stages.length > 0 && (
            <div className="stage-info">
              <div className="stage-text-display">
                <span className="stage-label">Current Stage:</span>
                <span className="stage-name">{quest.stages[quest.currentStage]}</span>
              </div>
              <div className="stage-counter">
                {Math.min(quest.currentStage + 1, quest.stages.length)} / {quest.stages.length}
              </div>
            </div>
          )}
        </div>
      )}

      {quest.rewards.length > 0 && (
        <div className="quest-rewards">
          <strong>Rewards:</strong>
          <ul>
            {quest.rewards.map((reward, idx) => (
              <li key={idx}>{reward}</li>
            ))}
          </ul>
        </div>
      )}

      {quest.notes && (
        <div className="quest-notes">
          <strong>Notes:</strong>
          <p>{quest.notes}</p>
        </div>
      )}

      <div className="quest-footer">
        <select
          className={`status-select ${getStatusColor(quest.status)}`}
          value={quest.status}
          onChange={(e) =>
            onStatusChange(quest.id, e.target.value as Quest['status'])
          }
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <span className={`status-badge ${getStatusColor(quest.status)}`}>
          {getStatusLabel(quest.status)}
        </span>
      </div>
    </div>
  );
};
