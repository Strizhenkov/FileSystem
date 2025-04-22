const Database = require('better-sqlite3');

const db = new Database('my-database.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    password TEXT
  )
`).run();

const insert = db.prepare('INSERT INTO users (login, password) VALUES (?, ?)');
insert.run('User', '123');
insert.run('Admin', 'admin');

const rows = db.prepare('SELECT * FROM users').all();
console.log(rows);