# Budget Tracker — Project Context

This document captures the project intent, architecture decisions, and roadmap in a concise format.

## Problem statement

Spreadsheet-first budgeting was error-prone and inconvenient, especially for mobile use and receipt-heavy workflows.

## Product goal

Build a reliable, local-first mobile app that lets users:

1. Track income and expenses quickly
2. Keep data on-device for offline access
3. Export records for spreadsheet-based analysis
4. Reduce manual entry using receipt OCR

## Key architecture choices

| Area | Decision | Rationale |
|---|---|---|
| Mobile framework | React Native + Expo Router | Fast iteration and stable navigation model |
| Persistence | SQLite via `expo-sqlite` | Simple local storage with no backend dependency |
| Data model | Single `transactions` table with `type` | Keeps querying and reporting straightforward |
| Query safety | Parameterized SQL (`?`) | Avoids SQL injection and query string issues |
| Date storage | `YYYY-MM-DD` text | Easy chronological sorting and range filtering |
| OCR | Veryfi API | Receipt-focused extraction with practical integration path |

## Current scope

- Transaction entry (income + expense)
- Transaction history list
- Dashboard summary and category chart
- CSV export by date range
- Receipt scan to pre-fill transaction form

## Future roadmap

- Multi-currency entry and display conversion
- Optional backup/sync flows
- Insight assistant based on aggregated spending trends

## Skills demonstrated

- Mobile feature delivery in React Native/Expo
- Local database design and migration-safe schema evolution
- API integration and response normalization
- Reusable component-based UI architecture
- Practical privacy/security handling for environment-based credentials