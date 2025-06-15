const Database = require('better-sqlite3');
const db = new Database('Logs.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    objectName TEXT,
    objectType TEXT,
    actionType TEXT,
    username TEXT
  )
`).run();