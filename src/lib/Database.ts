import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

let db: Database | null = null;

async function openDb(): Promise<Database> {
    if (!db) {
        db = await open({
            filename: "./notabene.sqlite",
            driver: sqlite3.Database,
        });
    }
    return db;
}

async function initDb(): Promise<void> {
    try {
        const database = await openDb();
        await database.exec(`
            CREATE TABLE IF NOT EXISTS memos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                category TEXT
            )
        `);
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

export { openDb, initDb };