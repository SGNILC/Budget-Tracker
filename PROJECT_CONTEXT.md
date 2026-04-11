# Budget Tracker — Project Context & Decisions Log

## The Problem
Tracking spending manually in Excel is error-prone and fragile. Data was lost during a university account migration. Receipts are hard to enter on busy/offline days.

## The Goal
A local-first mobile app that:
1. Scans receipts and auto-fills spending entries
2. Stores data safely on-device (no more data loss)
3. Exports to an Excel spreadsheet matching an existing template
4. Eventually syncs across phone and laptop (Phase 2)

---

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Database | SQLite | Local file on device, no server needed, phone-first |
| Framework | React Native + Expo | JS/TS familiarity, Expo simplifies Android setup |
| Language | JavaScript | More familiar than TypeScript; can migrate later |
| Platform | Android first | User's current phone |
| Cloud sync | Phase 2 | Solve local problem first, extend later |

---

## Excel Template Columns
Month Number | Date | Amount | Transaction Name | Category of Transaction

---

## Phased Roadmap

| Phase | Goal |
|---|---|
| 1 | Manual entry → SQLite → transaction list view |
| 2 | Export to .xlsx matching the Excel template |
| 3 | Camera → OCR → parse receipt → confirm & save |
| 4 | Dashboard with charts and category breakdowns |
| 5 | Backup + optional sync to laptop |

---

## Environment
- Node: v24.0.1
- npm: 11.8.0
- Expo Go installed on Android phone
- Project scaffolded with: `npx create-expo-app@latest budget-tracker`

---

## Where We Left Off
Project was just scaffolded. Next step: open `package.json`, review dependencies, then install `expo-sqlite`.

## Working Style
- Step by step — one decision at a time
- Explain the "why" before recommending anything
- User contributes and writes code too — this is collaborative and educational
- Check for understanding before moving on
