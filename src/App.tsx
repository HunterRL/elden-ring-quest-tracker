import { useState, useEffect } from 'react';
import type { Quest } from './types/quest';
import { questStorage } from './utils/questStorage';
import { QuestForm } from './components/QuestForm';
import { QuestList } from './components/QuestList';
import { Questlines } from './data/Questlines';
import './App.css';

function App() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Load quests from localStorage on mount, or initialize with Fia's questline
  useEffect(() => {
    const savedQuests = questStorage.loadQuests();
    if (savedQuests.length === 0) {
        setQuests(Questlines);
        Questlines.map (j => questStorage.addQuest(j));
    } else {
      setQuests(savedQuests);
    }
  }, []);

  const handleAddQuest = (questData: Omit<Quest, 'id'>) => {
    const newQuest: Quest = {
      ...questData,
      id: `quest-${Date.now()}`,
    };
    setQuests([...quests, newQuest]);
    questStorage.addQuest(newQuest);
    setShowForm(false);
  };

  const handleStatusChange = (id: string, status: Quest['status']) => {
    setQuests(
      quests.map((q) => (q.id === id ? { ...q, status } : q))
    );
    questStorage.updateQuestStatus(id, status);
  };

  const handleDeleteQuest = (id: string) => {
    setQuests(quests.filter((q) => q.id !== id));
    questStorage.deleteQuest(id);
  };

  const handleStageProgress = (id: string, stageIndex: number) => {
    const quest = quests.find((q) => q.id === id);
    const isLastStage = quest?.stages && stageIndex >= quest.stages.length - 1;

    setQuests(
      quests.map((q) =>
        q.id === id
          ? {
              ...q,
              currentStage: stageIndex,
              status: isLastStage ? 'completed' : 'in-progress',
            }
          : q
      )
    );
    questStorage.updateQuest(id, {
      currentStage: stageIndex,
      status: isLastStage ? 'completed' : 'in-progress',
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Elden Ring Quest Tracker</h1>
        <p>The Call of Long-Loss grace calls to you Tranished</p>
      </header>

      <main className="app-main">
        {showForm ? (
          <section className="form-section">
            <h2>Add New Quest</h2>
            <QuestForm
              onSubmit={handleAddQuest}
              onCancel={() => setShowForm(false)}
            />
          </section>
        ) : (
          <button
            className="btn btn-primary btn-add-quest"
            onClick={() => setShowForm(true)}
          >
            + Add Quest
          </button>
        )}

        <section className="list-section">
          <QuestList
            quests={quests}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteQuest}
            onStageProgress={handleStageProgress}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
