# Budget Tracker Architecture

## 1) System overview

Budget Tracker is a local-first Expo/React Native application with optional cloud OCR integration for receipt scanning.

```text
UI (Expo Router screens)
        |
        v
Reusable UI components
        |
        v
Domain/data layer (db/database.js)
        |
        v
SQLite on-device database (budget.db)

Optional OCR flow:
Camera Modal -> veryfiService -> Veryfi API -> parseVeryfiResponse -> Add Transaction form
```

## 2) App layers

### Presentation layer

- `app/(tabs)/Add_Transaction.jsx` — create transactions
- `app/(tabs)/Transaction_List.jsx` — browse and delete transactions
- `app/(tabs)/Dashboard.jsx` — summary totals + category chart
- `app/(tabs)/Settings.jsx` and `app/Settings/*` — settings and export workflow
- `app/modal/camera.jsx` — receipt capture, preview, OCR trigger

### Component layer

- `components/ui/Input.js`
- `components/ui/button.js`
- `components/ui/Card.js`
- `components/ui/Income_Expense_toggle.js`

### Data layer

- `db/database.js`
  - Initializes and migrates schema
  - Performs CRUD operations
  - Supplies aggregate queries for dashboard and export

### Integration layer

- `utils/veryfiService.js` — sends base64 receipt image to Veryfi endpoint
- `utils/parseVeryfiResponse.js` — normalizes OCR response for form pre-fill
- `constants/veryfi.js` — centralizes runtime credential/config access

## 3) Data model

### `transactions` table

| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key, autoincrement |
| `date` | TEXT | `YYYY-MM-DD` format |
| `amount` | REAL | Monetary value |
| `description` | TEXT | User/receipt label |
| `category` | TEXT | Categorization for reporting |
| `type` | TEXT | `income` or `expense` |

## 4) Primary flows

### Manual transaction entry

1. User fills form on Add Transaction screen
2. Validation runs for required fields
3. `addTransaction(...)` inserts row into SQLite
4. History and dashboard refresh on focus

### Receipt-assisted transaction entry

1. User opens camera modal and captures receipt
2. Image is base64 encoded and sent to Veryfi
3. Response is normalized by parser
4. User is redirected back with pre-filled values
5. User confirms/edits, then saves

### Export

1. User selects date range in export screen
2. App queries rows with `getTransactionsByRange(...)`
3. CSV is generated and written to app storage
4. Native share sheet opens for export

## 5) Security and reliability notes

- SQL queries use parameter placeholders for safety
- Secrets are expected from environment variables, not committed source
- Schema migrations are additive to avoid destructive upgrades
- Local-first operation minimizes network dependency for core budgeting features
