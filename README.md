# Budget Tracker

A local-first React Native app for tracking income and expenses, scanning receipts, and exporting records for spreadsheet workflows.

## Why this project exists

Budget data was previously managed in spreadsheets and proved fragile over time. This app was built to keep financial data available on-device, reduce manual entry with OCR, and support practical export needs.

## Core features

- Add and categorize income/expense transactions
- View transaction history with fast local retrieval
- Dashboard with total income, total expenses, and expense category breakdown
- Receipt capture + OCR pre-fill flow (Veryfi integration)
- CSV export for selected date ranges

## Tech stack

- **Mobile:** React Native + Expo Router
- **Storage:** `expo-sqlite` (local SQLite)
- **Visualization:** `react-native-chart-kit`
- **Receipt OCR:** Veryfi API
- **File sharing/export:** `expo-file-system`, `expo-sharing`

## Architecture

High-level architecture and data flow are documented in **`/home/runner/work/Budget-Tracker/Budget-Tracker/ARCHITECTURE.md`**.

## Project structure

```text
app/
  (tabs)/
    Add_Transaction.jsx
    Transaction_List.jsx
    Dashboard.jsx
    Settings.jsx
  Settings/
    Export.jsx
    Profile.jsx
    Currency.jsx
  modal/
    camera.jsx
components/ui/
  Input.js
  button.js
  Card.js
  Income_Expense_toggle.js
db/
  database.js
utils/
  veryfiService.js
  parseVeryfiResponse.js
constants/
  themes.js
  veryfi.js
```

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Provide OCR credentials in `.env`:
   ```bash
   VERYFI_CLIENT_ID=...
   VERYFI_CLIENT_SECRET=...
   VERYFI_USERNAME=...
   VERYFI_API_KEY=...
   ```
3. Start the app:
   ```bash
   npm run start
   ```

## Validation

- Lint:
  ```bash
  npm run lint
  ```

## Highlights

- Implements local persistence, safe schema evolution, and parameterized SQL operations
- Integrates third-party OCR workflow with defensive parsing and fallback UX
- Delivers reusable UI primitives and multi-screen navigation structure
- Prioritizes practical security hygiene by keeping API credentials out of source control

- ---

*Built by Steeve G. Nsangou. AI tools (Claude) were used for assistance during development.*
