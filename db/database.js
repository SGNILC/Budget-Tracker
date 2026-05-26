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

// Deleting a transaction form transaction list
export function deleteTransaction(id) {
    db.runSync(`
        DELETE FROM transactions 
        WHERE id = ?`, [id])
}
