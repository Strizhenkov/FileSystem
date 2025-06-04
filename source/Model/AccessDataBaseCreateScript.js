const Database = require('better-sqlite3');
const db = new Database('Access.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS access (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    objectName TEXT,
    accessLevel INTEGER
  )
`).run();

const insert = db.prepare('INSERT INTO access (objectName, accessLevel) VALUES (?, ?)');
insert.run('renamedDir', 0);
insert.run('2.txt', 0);
insert.run('file.txt', 0);
insert.run('python.py', 0);
insert.run('test.png', 1);

//const rows = db.prepare('SELECT * FROM access').all();
//console.log(rows);