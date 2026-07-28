import type { FC } from 'react';
import type { World } from '../types/world';
import '../styles/QuestCard.css';

interface Props {
	world: World;
	onToggle: (id: string) => void;
}

export const WorldCard: FC<Props> = ({
	world,
	onToggle
}) => {
	return (
		<div className='quest-card'>

			<h3 className='quest-name'>
				{world.name}
			</h3>

			<div className='quest-meta'>
				<span className='meta-item'>
					<strong>Location:</strong> {world.location}
				</span>
			</div>

			<button
				className={`btn ${world.completed
					? 'btn-secondary'
					: 'btn-primary'
				}`}
				onClick={() => onToggle(world.id)}
			>
				{world.completed
					? 'Defeated'
					: 'Mark Defeated'}
			</button>

		</div>
	);
};
