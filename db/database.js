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
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            type TEXT NOT NULL
        )`
    );
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
         ORDER BY date DESC`
    )
}

// Deleting a transaction form transaction list
export function deleteTransaction(id) {
    db.runSync(`
        DELETE FROM transctions 
        WHERE id = ?`, [id])
}