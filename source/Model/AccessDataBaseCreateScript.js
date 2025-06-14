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
insert.run('dist\\renamedDir', 1);
insert.run('dist\\renamedDir\\file.log', 1);
insert.run('dist\\2.txt', 0);
insert.run('dist\\file.txt', 0);
insert.run('dist\\python.py', 0);
insert.run('dist\\test.png', 0);
insert.run('dist', 0);

//const rows = db.prepare('SELECT * FROM access').all();
//console.log(rows);