import { isQuestBlocked, isStageLocked } from './utils/questDependencies';
import { useEffect, useState } from 'react';
import type { Quest } from './types/quest';
import { QuestForm } from './components/QuestForm';
import { QuestList } from './components/QuestList';
import { Questlines } from './data/Questlines';
import { questStorage } from './utils/questStorage';
import './App.css';

function App() {
	const [ quests, setQuests ] = useState<Quest[]>([]);
	const [ showForm, setShowForm ] = useState(false);

	// Load quests from localStorage on mount, or initialize with questlines
	useEffect(() => {
		const savedQuests = questStorage.loadQuests();
		if (savedQuests.length === 0) {
			setQuests(Questlines);
			Questlines.map(j => questStorage.addQuest(j));
		} else {
			setQuests(savedQuests);
		}
	}, []);

	const handleAddQuest = (questData: Omit<Quest, 'id'>) => {
		const newQuest: Quest = {
			...questData,
			id: `quest-${Date.now()}`
		};
		setQuests([ ...quests, newQuest ]);
		questStorage.addQuest(newQuest);
		setShowForm(false);
	};

	const handleStatusChange = (id: string, newStatus: Quest['status']) => {
		// Get the full quest context
		const updatedQuests = quests.map(q => {
			if (q.id === id) {
			// If trying to set to in-progress, check if blocked
				if (newStatus === 'in-progress' && isQuestBlocked(q, quests)) {
					return { ...q, status: 'blocked' as const };
				}
				return { ...q, status: newStatus };
			}
			return q;
		});

		// Update all dependent quests - check if their blocked status should change
		const finalQuests = updatedQuests.map(q => {
			if (q.status === 'blocked' && !isQuestBlocked(q, updatedQuests)) {
			// Quest is no longer blocked, set it to not-started
				return { ...q, status: 'not-started' as const };
			}
			return q;
		});

		setQuests(finalQuests);
		const updatedQuest = finalQuests.find(q => q.id === id);
		if (updatedQuest) {
			questStorage.updateQuestStatus(id, updatedQuest.status);
		}
	};

	const handleDeleteQuest = (id: string) => {
		setQuests(quests.filter(q => q.id !== id));
		questStorage.deleteQuest(id);
	};

	const handleStageProgress = (id: string, stageIndex: number) => {
		const quest = quests.find(q => q.id === id);
		if (!quest) {
			return;
		}

		// Check if this stage progression is locked
		if (isStageLocked(quest, quest.currentStage ?? 0, quests)) {
			return; // Don't allow progression
		}

		const isLastStage = quest.stages && stageIndex >= quest.stages.length - 1;

		const updatedQuests = quests.map(q =>
			q.id === id
				? {
					...q,
					currentStage: stageIndex,
					status: isLastStage ? ('completed' as const) : ('in-progress' as const)
				}
				: q
		);

		// Check if any dependent quests should be unblocked
		const finalQuests = updatedQuests.map(q => {
			/* if (q.status === 'blocked' && !isStageLocked(q, q.currentStage + 1, updatedQuests)) {
              return { ...q, status: 'in-progress' as const };
          } */
			if (q.status === 'blocked' && !isQuestBlocked(q, updatedQuests)) {
				return { ...q, status: 'not-started' as const };
			}
			return q;
		});

		setQuests(finalQuests);
		questStorage.updateQuest(id, {
			currentStage: stageIndex,
			status: isLastStage ? 'completed' : 'in-progress'
		});

		// Update dependent quests in storage
		finalQuests.forEach(q => {
			const originalQuest = quests.find(orig => orig.id === q.id);
			if (originalQuest && originalQuest.status !== q.status) {
				questStorage.updateQuestStatus(q.id, q.status);
			}
		});
	};

	return (
		<div className='app-container'>
			<header className='app-header'>
				<h1>Elden Ring Quest Tracker</h1>
				<p>The Call of Long-Lost Grace guides you Tranished</p>
			</header>

			<main className='app-main'>
				{showForm
					? (
						<section className='form-section'>
							<h2>Add New Quest</h2>
							<QuestForm
								onSubmit={handleAddQuest}
								onCancel={() => setShowForm(false)}
							/>
						</section>)
					: (
						<button
							className='btn btn-primary btn-add-quest'
							onClick={() => setShowForm(true)}
						>
							+ Add Quest
						</button>
					)}

				<section className='list-section'>
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
