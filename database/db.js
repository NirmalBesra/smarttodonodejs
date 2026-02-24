const Database = require('better-sqlite3');

const db = new Database('database.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, taskname TEXT NOT NULL, priority TEXT, desc TEXT , isCompleted INTEGER NOT NULL DEFAULT 0)`).run();

module.exports = db;