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

| Phase              | Status           | Goal                                                                 |
|--------------------|-----------------|----------------------------------------------------------------------|
| 1                  | ✅ Complete      | Manual entry → SQLite → transaction list view                        |
| 1 (improvements)   | ✅ Complete      | Better date input, delete transaction                                |
| 2                  | ✅ Complete      | Export to CSV (Excel-compatible) via Settings                        |
| 2.5                | ✅ Complete      | UI polish — reusable components (Button, Card, Input, I_E toggle), centralized theme, refactored screens |
| 3                  | Not started      | Camera → OCR → parse receipt → confirm & save (ML Kit, offline)      |
| 4                  | Not started      | Dashboard with charts and category breakdowns                        |
| 5                  | Not started      | Backup + optional sync to laptop                                     |
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

---

## Where We Left Off

Phase 1 core is complete and tested end-to-end on a physical Android device.

---

## Working Application — Version 1 Status

> **Version 1 is feature-complete and functional on Android.**

| Feature                          | Status        |
|----------------------------------|--------------|
| Add transaction (amount, desc, category, date, type) | ✅ Done |
| Income / Expense toggle          | ✅ Done       |
| SQLite local storage             | ✅ Done       |
| Transaction list (newest first)  | ✅ Done       |
| Long-press to delete             | ✅ Done       |
| Export to CSV (Settings tab)     | ✅ Done       |
| Reusable component library       | ✅ Done       |
| Centralized theme                | ✅ Done       |
| Cancel clears form               | ✅ Done       |
| Tab navigation (3 tabs)         | ✅ Done       |

---

## Skills Learned (May 2, 2026)

| Category | Skills |
|---|---|
| Frameworks & Libraries | React Native, Expo, Expo Router, expo-sqlite, expo-file-system |
| Languages | JavaScript (JSX), TypeScript (config/types) |
| UI Development | Reusable component architecture (Button, Card, Input, Toggle), centralized theming, StyleSheet composition, style prop merging |
| State Management | React `useState`, form reset patterns, `useFocusEffect` + `useCallback` for data refresh |
| Database | SQLite local storage with `expo-sqlite` (sync API), parameterized queries |
| DevOps & Tooling | Expo CLI, npm, PowerShell execution policy management, Git (branch renaming, remote setup) |
| Debugging | Import path resolution, Expo config plugin requirements, `app.json` plugin configuration |

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
