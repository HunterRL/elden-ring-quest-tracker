import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import type { Quest } from '../types/quest';
import '../styles/QuestForm.css';

interface QuestFormProps {
  onSubmit: (quest: Omit<Quest, 'id'>) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  npc: string;
  description: string;
  location: string;
  rewards: string;
  notes: string;
  status: Quest['status'];
  stages: string;
}

export const QuestForm: FC<QuestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    npc: '',
    description: '',
    location: '',
    rewards: '',
    notes: '',
    status: 'not-started',
    stages: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.npc.trim()) {
      alert('Please fill in quest name and NPC');
      return;
    }

    const stages = formData.stages
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s);

    onSubmit({
      name: formData.name,
      npc: formData.npc,
      description: formData.description,
      location: formData.location,
      rewards: formData.rewards
        .split(',')
        .map((r) => r.trim())
        .filter((r) => r),
      notes: formData.notes,
        status: formData.status,
      requirements: [],
      stages: stages.length > 0 ? stages : [],
        currentStage: 0,
    });
  };

  return (
    <form className="quest-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Quest Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Ranni's Questline"
        />
      </div>

      <div className="form-group">
        <label htmlFor="npc">NPC *</label>
        <input
          id="npc"
          type="text"
          value={formData.npc}
          onChange={(e) => setFormData({ ...formData, npc: e.target.value })}
          placeholder="e.g., Ranni the Witch"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., Liurnia of the Lakes"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Quest details and steps..."
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="stages">Quest Stages (one per line)</label>
        <textarea
          id="stages"
          value={formData.stages}
          onChange={(e) => setFormData({ ...formData, stages: e.target.value })}
          placeholder="e.g., Meet Fia at Roundtable Hold&#10;Give her a Seedbed Curse&#10;Defeat her for the ending"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rewards">Rewards (comma-separated)</label>
        <input
          id="rewards"
          type="text"
          value={formData.rewards}
          onChange={(e) => setFormData({ ...formData, rewards: e.target.value })}
          placeholder="e.g., Dark Moon Ring, Ranni's Black Feathers"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => {
            const value = e.target.value as Quest['status'];
            setFormData({
              ...formData,
              status: value,
            });
          }}
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Personal Notes</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Your personal notes..."
          rows={2}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Add Quest
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
