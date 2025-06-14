const crypto = require('crypto');
const Database = require('better-sqlite3');
const db = new Database('User.db');

function hashString(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    accessLevel INTEGER
  )
`).run();

const insert = db.prepare('INSERT INTO users (username, password, accessLevel) VALUES (?, ?, ?)');
insert.run(hashString("default"), hashString(""), 0);
insert.run(hashString("User"), hashString("user"), 1);
insert.run(hashString("Admin"), hashString("admin"), 2);
insert.finalize();

//const rows = db.prepare('SELECT * FROM users').all();
//console.log(rows);