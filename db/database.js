// Imports the expo-sqlite package and create a db file locally
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('budget.db')


// Initializes the SQL Table
export function initDB() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT NOT NULL
        )`
    );

    // Safe migrations to add new columns without losing data
    try {
        db.execSync(`ALTER TABLE transactions ADD COLUMN category TEXT DEFAULT 'Other' NOT NULL`);
    } catch (e) {
        // Ignored if column already exists
    }

    try {
        db.execSync(`ALTER TABLE transactions ADD COLUMN type TEXT DEFAULT 'expense' NOT NULL`);
    } catch (e) {
        // Ignored if column already exists
    }
}

// Inserts a transaction into the table 
export function addTransaction(date, amount, description, category, type) {
    db.runSync(
        `INSERT INTO transactions  (date, amount, description, category, type)
     VALUES (?, ?, ?, ?, ?)`,
     [date, amount, description, category, type]
    );
}

// Outputs the data from the table showing the most recent transaction first
export function getTransactions() {
    return db.getAllSync(
        `SELECT * 
         FROM transactions
         ORDER BY date DESC, id DESC
         
         `

    )
}

// Returns transactions between two months (inclusive), e.g. '2026-01' to '2026-04'
export function getTransactionsByRange(fromYYYYMM, toYYYYMM) {
    return db.getAllSync(
        `SELECT * FROM transactions
         WHERE substr(date, 1, 7) >= ? AND substr(date, 1, 7) <= ?
         ORDER BY date ASC`,
        [fromYYYYMM, toYYYYMM]
    );
}

// Returns expense totals grouped by category for dashboard pie chart
export function getExpenseTotalsByCategory() {
    return db.getAllSync(
        `SELECT COALESCE(NULLIF(category, ''), 'Other') AS category,
                ROUND(SUM(amount), 2) AS total
         FROM transactions
         WHERE type = 'expense'
         GROUP BY COALESCE(NULLIF(category, ''), 'Other')
         ORDER BY total DESC`
    );
}

// Returns income totals grouped by category for dashboard
export function getIncomeTotalsByCategory() {
    return db.getAllSync(
        `SELECT COALESCE(NULLIF(category, ''), 'Other') AS category,
                ROUND(SUM(amount), 2) AS total
         FROM transactions
         WHERE type = 'income'
         GROUP BY COALESCE(NULLIF(category, ''), 'Other')
         ORDER BY total DESC`
    );
}

// Returns total sum of all expenses
export function getTotalExpenses() {
    const result = db.getAllSync(
        `SELECT ROUND(SUM(amount), 2) AS total FROM transactions WHERE type = 'expense'`
    );
    return result[0]?.total || 0;
}

// Returns total sum of all income
export function getTotalIncome() {
    const result = db.getAllSync(
        `SELECT ROUND(SUM(amount), 2) AS total FROM transactions WHERE type = 'income'`
    );
    return result[0]?.total || 0;
}

// Deleting a transaction form transaction list
export function deleteTransaction(id) {
    db.runSync(`
        DELETE FROM transactions 
        WHERE id = ?`, [id])
}
