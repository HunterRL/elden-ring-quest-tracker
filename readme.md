# Elden Ring Quest Tracker

A comprehensive, interactive quest tracking application for *Elden Ring* built with React and TypeScript. Track your progress through complex questlines and manage your world progress.

![Status](https://img.shields.io/badge/version-0.0.1-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

### Quest Management
- **Track All Questlines** - Includes all NPC Questlines in *Elden Ring*, currently excluding Shadow of the Erdtree. 

- **Multi-Stage Quest Progress** - Break down each questline into detailed stages with visual progress tracking

- **Smart Dependency System** - Automatically detect when quests are blocked:
  - **Quest Dependencies**: Certain quests can only progress after completing specific stages in other quests
  - **Boss/World Dependencies**: Some quests require you to defeat specific bosses or complete world challenges before advancing
  - **Mid-Stage Dependencies**: Block progression to specific quest stages until their requirements are met

- **Quest Details** - Comprehensive information for each quest:
  - NPC name and location
  - Quest description with markdown support
  - Stage-by-stage guide
  - Rewards (with links to the Elden Ring wiki.gg)
  - Personal notes
  - Quest images

### World/Boss Tracking
- **Boss Defeat Tracking** - Keep track of which bosses you've defeated
- **Automatic Quest Updates** - Quest availability automatically updates based on world defeats

### Storage
- **Local Storage** - All progress automatically saves to your browser's local storage
- **Reset Option** - Clear all data and return to default questlines when starting a new playthrough

### Settings
- **Spoiler Toggle** - Hides quest that you do not have access to yet, toggled on by default

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HunterRL/elden-ring-quest-tracker.git
   cd elden-ring-quest-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

---

## Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── QuestCard.tsx       # Individual quest display
│   ├── QuestList.tsx       # Quest list container
│   ├── QuestForm.tsx       # Add new quest form
│   ├── WorldCard.tsx       # Boss/world tracker
│   ├── WorldList.tsx       # World list container
│   └── SettingsMenu.tsx    # Settings UI
├── types/              # TypeScript type definitions
│   ├── quest.ts           # Quest and dependency types
│   └── world.ts           # World/boss types
├── utils/              # Utility functions
│   ├── questDependencies.ts  # Dependency checking logic
│   ├── questStorage.ts       # LocalStorage management
│   └── worldStorage.ts       # World data persistence
├── data/               # Hardcoded quest/world data
│   ├── Questlines.ts       # Pre-populated quests
│   └── worldModifiers.ts   # Boss/world list
├── contexts/           # React context for state
│   └── SettingsContext.tsx # Settings state management
└── styles/             # CSS styling
```

## Development

### Available Scripts

```bash
npm start       # Start dev server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run fix     # Auto-fix linting issues
npm run preview # Preview production build
```

### Tech Stack

- **React 19.2** - UI framework
- **TypeScript 6.0** - Type safety
- **Vite** - Fast build tool
- **ESLint + TypeScript-ESLint** - Code quality
- **React Markdown** - Rich text formatting in descriptions