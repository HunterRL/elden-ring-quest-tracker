import { type FC, type ReactNode, createContext, useContext, useState } from 'react';

interface SettingsContextType {
	showSpoilers: boolean;
	setShowSpoilers: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [ showSpoilers, setShowSpoilers ] = useState(false);

	return (
		<SettingsContext.Provider value={{ showSpoilers, setShowSpoilers }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error('useSettings must be used within SettingsProvider');
	}
	return context;
};
