# Elden Ring Quest Tracker - Development Guide

## Project Overview

This is a React + TypeScript web application for tracking Elden Ring questline progress. The app uses local browser storage to persist data without requiring a backend server.

## Architecture

### Component Structure

```
App (main component)
├── Header (display only)
├── QuestForm (when adding a quest)
└── QuestList
	├── Stats Bar
	├── Filter Buttons
	└── QuestCard (repeated for each quest)
```

### Data Flow

1. **App.tsx** manages all state and passes down handlers
2. **QuestForm** collects user input and calls `handleAddQuest`
3. **QuestList** displays filtered quests and handles status updates
4. **QuestCard** renders individual quests with delete buttons
5. **questStorage** utility handles all localStorage operations

### Data Model

```typescript
interface Quest {
  id: string;                    // Unique identifier (timestamp-based)
  name: string;                  // Quest name
  npc: string;                   // Associated NPC
  status: 'not-started' | 'in-progress' | 'completed';
  description: string;           // Quest details
  location: string;              // Where the quest takes place
  rewards: string[];             // Array of reward strings
  notes: string;                 // Personal notes
}
```

## Key Features Implemented

### 1. Quest Management
- Add new quests with full details
- Update quest status with dropdown select
- Delete quests with confirmation
- Track quest rewards and locations

### 2. Progress Tracking
- Real-time statistics (total, not started, in progress, completed)
- Filter quests by status
- Visual status indicators (colors and badges)
- Progress bar context (ready for future enhancement)

### 3. Data Persistence
- Automatic save to localStorage on any change
- Automatic load from localStorage on app start
- JSON serialization for reliable storage

### 4. User Interface
- Dark theme inspired by Elden Ring
- Responsive grid layout for quest cards
- Smooth animations and transitions
- Mobile-friendly design

## Styling System

### Color Palette

- **Primary Gold**: `#d4af37` (accent color)
- **Light Gold**: `#f5d547` (hover state)
- **Dark Background**: `#1a1a2e` (main bg)
- **Darker Background**: `#16213e` (secondary bg)
- **Light Text**: `#e0e0e0` (primary text)
- **Muted Text**: `#b8b8b8` (secondary text)

### Status Colors

- **Not Started**: Gray (`#7f8c8d`)
- **In Progress**: Blue (`#3498db`)
- **Completed**: Green (`#2ecc71`)

## Running the Project

### Development

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:5173
```

### Production

```bash
npm run build    # Build optimized bundle
npm run preview  # Preview production build locally
```

## File Organization

```
src/
├── components/
│   ├── QuestForm.tsx      # Form component for adding quests
│   ├── QuestCard.tsx      # Single quest card display
│   └── QuestList.tsx      # List with filtering and stats
├── types/
│   └── quest.ts           # TypeScript interfaces
├── utils/
│   └── questStorage.ts    # LocalStorage management
├── styles/
│   ├── App.css            # Main app styles
│   ├── QuestForm.css      # Form styles
│   ├── QuestCard.css      # Card styles
│   └── QuestList.css      # List styles
├── App.tsx                # Root component
├── main.tsx               # Entry point
├── index.css              # Global styles
└── assets/                # Images and icons
```

## How to Extend This Project

### Adding a Search Feature

1. Add a search input in `QuestList`
2. Filter quests by name, NPC, or location
3. Combine with existing status filter

### Adding Export/Import

1. Create utility functions in `questStorage.ts`:
   - `exportQuests()` - Convert to JSON and download
   - `importQuests(file)` - Read JSON and import
2. Add buttons in `App.tsx`
3. Handle file upload in main component

### Adding NPC Tracking

1. Create `types/npc.ts` with NPC interface
2. Create `NPCList.tsx` component
3. Link quests to NPCs with many-to-one relationship
4. Add NPC details modal on quest card

### Adding Quest Templates

1. Create a `data/templates.ts` file with pre-populated quest data
2. Add a "Load Template" button in `QuestForm`
3. Pre-fill form with template data
4. Let users customize before saving

### Adding Local Backup

1. Create a "Export All" button that downloads JSON
2. Create an "Import" button that accepts JSON file
3. Add timestamp to exports for versioning
4. Add restore confirmation dialog

### Adding Statistics Dashboard

1. Create `components/Dashboard.tsx`
2. Calculate completion percentage
3. Show quest distribution charts (future: integrate Chart.js)
4. Track completion trends over time
5. Display most-needed items

## Best Practices for Development

### Component Guidelines
- Keep components focused on single responsibility
- Use TypeScript interfaces for props
- Extract repeated logic into utils
- Pass callbacks instead of state down to children

### State Management
- Keep state in the highest component that needs it (App)
- Use callbacks to bubble events up
- Sync state changes with localStorage immediately

### Styling
- Use CSS custom properties for colors
- Keep responsive design in mind (mobile-first)
- Use meaningful class names
- Organize CSS by component

### TypeScript
- Define all interfaces in `types/`
- Use type-safe function signatures
- Avoid `any` type
- Export types from index files

## Performance Considerations

Current optimizations:
- Component re-renders minimized with React.FC
- CSS Grid for efficient layouts
- LocalStorage instead of external API
- CSS transitions for smooth animations

Future optimizations:
- Implement React.memo for QuestCard to prevent re-renders
- Add useCallback to memoize event handlers
- Implement virtual scrolling for large quest lists
- Lazy load components if they become complex

## Testing Strategy

Consider adding tests for:

```typescript
// questStorage.test.ts
- loadQuests() returns empty array if no data
- saveQuests() persists data correctly
- updateQuest() modifies specific quest
- deleteQuest() removes quest by id

// components
- QuestForm validates required fields
- QuestList filters quests correctly
- QuestCard displays all quest properties
```

## Common Issues & Solutions

**Issue**: Data not persisting
- **Solution**: Check browser localStorage is enabled
- **Solution**: Verify questStorage.saveQuests is called after updates

**Issue**: Styling looks broken
- **Solution**: Ensure all CSS files are imported in components
- **Solution**: Check color variables in index.css

**Issue**: Form won't submit
- **Solution**: Verify required fields (name, npc) are filled
- **Solution**: Check console for validation errors

## Next Steps for Development

1. **Add more quest data**: Populate with actual Elden Ring quests
2. **Add search/filter enhancements**: Multiple filter combinations
3. **Add data export**: JSON export for backup
4. **Add statistics**: Charts and progress visualization
5. **Add quest templates**: Quick-add pre-made questlines
6. **Mobile optimization**: Fine-tune responsive design
7. **Add animations**: Smoother transitions and interactions
8. **Add themes**: Light/dark theme toggle

---

Happy developing, Tarnished! May your questline tracker guide you through the Lands Between. ⚔️
