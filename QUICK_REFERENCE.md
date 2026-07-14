# Quick Reference Card

## 🚀 Get Started (Copy & Paste)

```bash
# Install and run
npm install
npm run dev

# Open browser
http://localhost:5173
```

## 📖 Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **PROJECT_SUMMARY.md** | Overview of everything | 5 min |
| **QUICKSTART.md** | Get started in 2 min | 2 min |
| **GETTING_STARTED.md** | Comprehensive guide | 10 min |
| **DEVELOPMENT.md** | Architecture deep dive | 15 min |
| **FEATURES.md** | Implementation ideas | 20 min |

## 💾 Commands

```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint code for errors
npm run dev -- --port 3000  # Use different port
```

## 🎮 Load Sample Data

**In browser console (F12):**
```javascript
// Copy entire sampleQuests.ts file and paste, then run:
importSampleQuests()
```

## 🎨 File Locations

```
Component files    → src/components/
Style files        → src/styles/
TypeScript types   → src/types/
Utility functions  → src/utils/
Main app          → src/App.tsx
Global styles     → src/index.css
```

## 🔧 Common Edits

### Change Colors
File: `src/index.css`
```css
:root {
  --accent: #d4af37;        /* Gold */
  --bg: #1a1a2e;            /* Dark background */
  /* ... more colors ... */
}
```

### Add Form Fields
Files: 
1. `src/types/quest.ts` - Add to Quest interface
2. `src/components/QuestForm.tsx` - Add input field
3. `src/components/QuestCard.tsx` - Display it
4. `src/utils/questStorage.ts` - Handle in storage

### Add Filter/Sort
File: `src/components/QuestList.tsx`
- Search by name already partially there
- Add your filter logic
- Combine with existing filters

## 🐛 Quick Debugging

```javascript
// In browser console (F12):

// See all quests
localStorage.getItem('elden-ring-quests')

// Clear all data
localStorage.removeItem('elden-ring-quests')

// Reload page
location.reload()

// Check if quest exists
JSON.parse(localStorage.getItem('elden-ring-quests')).find(q => q.name === 'Quest Name')
```

## 📊 Component Tree

```
App (main state)
├── Header (title)
├── QuestForm (when adding)
└── QuestList
	├── Stats Bar
	├── Filter Buttons
	└── QuestCard (× many)
```

## 🎯 Quest Data Structure

```typescript
{
  id: "quest-123456",
  name: "Quest Name",
  npc: "NPC Name",
  status: "not-started" | "in-progress" | "completed",
  description: "Details about quest",
  location: "Where it happens",
  rewards: ["Reward 1", "Reward 2"],
  notes: "Your notes"
}
```

## 🎨 Colors & Classes

```css
/* Status colors */
.status-not-started { color: #7f8c8d; }  /* Gray */
.status-in-progress { color: #3498db; }  /* Blue */
.status-completed { color: #2ecc71; }    /* Green */

/* Gold accent */
--accent: #d4af37
--accent-light: #f5d547

/* Backgrounds */
--bg: #1a1a2e              /* Main */
--bg-secondary: #16213e    /* Darker */
```

## 🚀 Feature Ideas (Easy to Hard)

### Easy (30 min - 1 hour)
- Search by quest name
- Sort (name, NPC, date)
- Priority levels
- Due dates

### Medium (1-2 hours)
- Export/import JSON
- Quest categories
- Edit quests
- Delete confirmation

### Hard (2-4 hours)
- NPC tracker
- Statistics dashboard
- Multiple playthroughs
- Cloud sync

*See FEATURES.md for full list*

## 📱 Responsive Breakpoints

```css
@media (max-width: 768px) {
  /* Mobile adjustments */
}

/* Current breakpoint: 768px for tablets */
```

## 🔐 Storage Info

- **Where**: Browser localStorage
- **Key**: `elden-ring-quests`
- **Format**: JSON
- **Limit**: ~5-10MB per domain
- **Persistent**: Until cleared manually
- **Cross-device**: NO (local only)

## 🌟 Keyboard Shortcuts (To Implement)

Suggested future additions:
- `Ctrl/Cmd + N` = New quest
- `Ctrl/Cmd + F` = Search
- `Ctrl/Cmd + E` = Export
- `Ctrl/Cmd + I` = Import
- `Ctrl/Cmd + ?` = Help

## 📞 Support

1. **Check docs** → Start with PROJECT_SUMMARY.md
2. **Check console** → F12 → Console tab for errors
3. **Check devtools** → F12 → Application → LocalStorage
4. **Google error** → Copy error message into Google
5. **Check code** → Read comments in component files

## 🎬 First-Time Checklist

- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Click "+ Add Quest"
- [ ] Fill form and submit
- [ ] See quest appear
- [ ] Change status dropdown
- [ ] Delete quest
- [ ] Refresh page (data persists!)
- [ ] Celebrate! 🎉

## 🔄 Update Workflow

1. Make changes to src/
2. Save file (Ctrl+S)
3. Browser auto-refreshes (hot reload)
4. See changes immediately
5. No manual rebuild needed!

## ⚠️ Common Mistakes

❌ Editing CSS but not seeing changes → Hard refresh (Ctrl+Shift+R)
❌ Quests disappeared → Check localStorage wasn't cleared
❌ Form won't submit → Check required fields (name, npc)
❌ Port 5173 in use → Use `npm run dev -- --port 3000`
❌ Dependencies not installing → Delete node_modules and package-lock.json, run npm install again

## ✨ Pro Tips

💡 Use `console.log()` for debugging
💡 Use browser DevTools (F12) to inspect elements
💡 Save frequently with Ctrl+S
💡 Use git to save versions: `git add .` then `git commit -m "message"`
💡 Read existing comments in code for guidance
💡 Hover over types in VSCode to see definitions
💡 Right-click → Go to Definition in VSCode

## 🎮 Next Level

When you're comfortable, try:
1. Adding a search feature
2. Making it export to JSON
3. Creating a dashboard
4. Adding edit functionality
5. Implementing cloud sync

## 📚 Learning Resources

- React Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org
- MDN Web Docs: https://developer.mozilla.org
- Elden Ring Wiki: https://eldenring.wiki.fextralife.com

---

**You've got this, Tarnished!** ⚔️ Good luck building!
