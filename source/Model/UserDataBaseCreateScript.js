const Database = require('better-sqlite3');

const db = new Database('User.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    password TEXT,
    accessLevel INTEGER
  )
`).run();

const insert = db.prepare('INSERT INTO users (login, password, accessLevel) VALUES (?, ?, ?)');
insert.run('User', '123', 1);
insert.run('Admin', 'admin', 2);

//const rows = db.prepare('SELECT * FROM users').all();
//console.log(rows);