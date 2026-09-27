import { type FC } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import '../styles/SettingsMenu.css';

interface SettingsMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onClearAllData: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ isOpen, onClose, onClearAllData }) => {
	const { showSpoilers, setShowSpoilers } = useSettings();

	if (!isOpen) { return null; }

	return (
		<>
			<div className='settings-overlay' onClick={onClose}></div>
			<div className='settings-modal'>
				<div className='settings-header'>
					<h2>Settings</h2>
					<button className='close-btn' onClick={onClose}>
						✕
					</button>
				</div>

				<div className='settings-content'>
					<div className='settings-item'>
						<label htmlFor='show-spoilers' className='settings-label'>
							Show Spoilers
						</label>
						<p className='settings-description'>
							If disabled, quests that you do not meet the requirements for will not be shown
						</p>
						<div className='toggle-switch'>
							<input
								id='show-spoilers'
								type='checkbox'
								checked={showSpoilers}
								onChange={e => setShowSpoilers(e.target.checked)}
								className='toggle-input'
							/>
							<label htmlFor='show-spoilers' className='toggle-label'>
								<span className='toggle-slider'></span>
							</label>
						</div>
					</div>
				</div>

				<div className='settings-footer'>
					<button
						className='btn btn-danger'
						onClick={() => {
							onClearAllData();
							onClose();
						}}
					>
						Reset All Data
					</button>
				</div>
			</div>
		</>
	);
};
