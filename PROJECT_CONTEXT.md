# Budget Tracker — Project Context & Decisions Log

## The Problem
Tracking spending manually in Excel is error-prone and fragile. Data was lost during a university account migration. Receipts are hard to enter on busy/offline days.

## The Goal
A local-first mobile app that:
1. Stores data safely on-device (no more data loss)
2. Exports to an Excel spreadsheet matching an existing template
3. Scans receipts and auto-fills spending entries
4. Eventually syncs across phone and laptop

---

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Database | SQLite (`expo-sqlite`) | Local file on device, no server needed, phone-first |
| Framework | React Native + Expo | JS/TS familiarity, Expo simplifies Android setup |
| Language | JavaScript (.jsx / .js) | More familiar than TypeScript; can migrate later |
| Platform | Android first | User's current phone |
| DB API style | Sync (`openDatabaseSync`, `runSync`, etc.) | Simpler to reason about than async/await for DB ops |
| Single table | `transactions` with `type` column | Cleaner than two tables; `type` = `'expense'` or `'income'` |
| Date format | TEXT as `YYYY-MM-DD` | Enables text-based `ORDER BY date DESC` sorting |
| SQL params | `?` placeholders | Prevents SQL injection |
| List refresh | `useFocusEffect` | Runs every time the tab is focused, unlike `useEffect` which only runs once on mount |
| Cloud sync | Future phase | Solve local problem first, extend later |

---

## Excel Template Columns
Month Number | Date | Amount | Transaction Name | Category of Transaction

---

## Phased Roadmap

| Phase | Status | Goal |
|---|---|---|
| 1 | ✅ Complete | Manual entry → SQLite → transaction list view |
| 1 (improvements) | 🔄 In progress | Better date input, delete transaction |
| 2 | Not started | Export to .xlsx matching the Excel template |
| 2.5 | Not started | UI polish (Figma-informed design) |
| 3 | Not started | Camera → OCR → parse receipt → confirm & save (ML Kit, offline) |
| 4 | Not started | Dashboard with charts and category breakdowns |
| 5 | Not started | Backup + optional sync to laptop |

---

## Environment
- Node: v24.0.1
- npm: 11.8.0
- Expo Go installed on Android phone
- Project scaffolded with: `npx create-expo-app@latest budget-tracker`
- GitHub repo: `https://github.com/SGNILC/Budget-Tracker.git` (branch: `main`)

---

## File Structure (custom files)

```
db/
  database.js          ← SQLite layer: initDB, addTransaction, getTransactions

app/(tabs)/
  _layout.jsx          ← Tab navigation (Add Transaction + Transaction List tabs)
  Add_Transaction.jsx  ← Form screen: enter and save a new transaction
  Transaction_List.jsx ← List screen: view all transactions, newest first
```

---

## Key Code: `db/database.js`

```js
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('budget.db');

export function initDB() {
    db.execSync(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL
    )`);
}

export function addTransaction(date, amount, description, category, type) {
    db.runSync(
        `INSERT INTO transactions (date, amount, description, category, type) VALUES (?, ?, ?, ?, ?)`,
        [date, amount, description, category, type]
    );
}

export function getTransactions() {
    return db.getAllSync(`SELECT * FROM transactions ORDER BY date DESC`);
}
```

---

## Bugs Fixed So Far

| Bug | Cause | Fix |
|---|---|---|
| `openDatabaseAsync` returned a Promise, not a db object | API mismatch | Switched to `openDatabaseSync` |
| `tsconfig.json` corrupted | Malformed entries left over from file renames | Removed invalid `include` array entries |
| `useFocusEffect` error: "passed second argument" | `React.useCallback` used without importing React; trailing comma | Import `useCallback` from `'react'` directly |
| Transaction list didn't update after adding | `useEffect` only runs once on mount | Replaced with `useFocusEffect` from `expo-router` |
| Git push rejected: master vs main branch | GitHub created `main`; local was `master` | `git branch -m master main` + `--allow-unrelated-histories` pull |
| TextInput invisible on Android | Default background transparent on some Android versions | Added `backgroundColor: 'white'`, `color: 'black'`, `placeholderTextColor="#999"` |

---

## Where We Left Off

Phase 1 core is complete and tested end-to-end on a physical Android device.

**Completed:**
- ✅ `db/database.js` — full database layer
- ✅ `Add_Transaction.jsx` — form with validation and input visibility fix
- ✅ `Transaction_List.jsx` — live-updating list with color-coded amounts
- ✅ `_layout.jsx` — tab navigation
- ✅ App tested end-to-end on physical Android device via Expo Go
- ✅ Code pushed to GitHub (`main` branch)

**Next steps (Phase 1 improvements):**
1. Replace Date `TextInput` with a proper date picker (`@react-native-community/datetimepicker`)
2. Add delete transaction (long press on row → `deleteTransaction(id)` in `database.js`)

**Then Phase 2:** Export transactions to `.xlsx` matching the Excel template columns.

---

## Working Style
- Step by step — one decision at a time
- Explain the "why" before recommending anything
- User contributes and writes code too — this is collaborative and educational
- Check for understanding before moving on
