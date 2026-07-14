# Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

You'll see output like:
```
  VITE v4.4.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser
Click the link or navigate to `http://localhost:5173/`

---

## 📋 First Quest

1. Click **"+ Add Quest"** button
2. Fill in the form:
   - Quest Name: *Ranni's Questline*
   - NPC: *Ranni the Witch*
   - Location: *Liurnia of the Lakes*
   - Description: *Help Ranni achieve the Age of Stars*
   - Rewards: *Dark Moon Ring, Ranni's Black Feathers*
   - Status: *Not Started*
3. Click **"Add Quest"**

---

## 🎮 How to Use

### Viewing Quests
- **All Quests**: Click "All" button
- **In Progress**: Click "In Progress" button to see active quests
- **Completed**: Click "Completed" to see finished quests
- **Not Started**: Click "Not Started" to see queued quests

### Updating Quest Status
1. Find the quest card
2. Click the status dropdown (bottom of card)
3. Select new status
4. Changes save automatically

### Deleting a Quest
1. Find the quest card
2. Click the **✕** button (top right)
3. Quest is immediately deleted

### Tracking Progress
- **Stats Bar**: Shows total quests and counts per status
- **Filter Buttons**: Shows counts in parentheses
- **Progress**: Complete quests to see percentage increase

---

## 📁 Project Structure

Everything you need is in `src/`:

| File | Purpose |
|------|---------|
| `App.tsx` | Main app logic and state |
| `components/` | UI components (Form, Card, List) |
| `types/quest.ts` | Quest data structure |
| `utils/questStorage.ts` | Save/load from browser |
| `styles/` | All styling |

---

## 🔧 Development Tips

### Hot Module Reload (HMR)
- Edit any file in `src/`
- Save with Ctrl+S
- Browser refreshes automatically ✨

### Clear All Data
Open browser DevTools (F12) → Console, then:
```javascript
localStorage.removeItem('elden-ring-quests');
location.reload();
```

### Export Your Data
In browser console:
```javascript
copy(JSON.stringify(JSON.parse(localStorage.getItem('elden-ring-quests')), null, 2))
```
Then paste into a text file to backup.

---

## 🎨 Customization Ideas

### Change Colors
Edit `src/index.css` and look for the `:root` section:
```css
:root {
  --accent: #d4af37;  /* Change this to your color */
}
```

### Change Fonts
Edit `src/index.css`:
```css
--sans: 'Your Font Here', sans-serif;
```

### Add More Quest Fields
1. Update `Quest` interface in `src/types/quest.ts`
2. Add field to form in `src/components/QuestForm.tsx`
3. Display in card in `src/components/QuestCard.tsx`

---

## 🐛 Troubleshooting

**Server won't start?**
```bash
npm install   # Reinstall dependencies
npm run dev   # Try again
```

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000  # Use different port
```

**Quests disappeared?**
- Check if you cleared browser data
- Check DevTools → Storage → LocalStorage
- Your browser data might have been cleared

**Styling looks broken?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

---

## 📚 Learn More

- **React Docs**: https://react.dev
- **TypeScript Docs**: https://www.typescriptlang.org
- **Vite Docs**: https://vitejs.dev
- **CSS Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS

---

## 🎯 Next Challenge

Try adding these features:
- ✅ Search by quest name
- ✅ Sort quests by name or NPC
- ✅ Add a "Priority" field
- ✅ Add quest categories (Main, Side, Boss)
- ✅ Export quests to JSON file
- ✅ Import quests from JSON file

---

## ⚔️ Have Fun!

You've got a working quest tracker! Start customizing and make it your own. The Lands Between await... 🌙
