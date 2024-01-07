const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 6969;
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());


const db = new sqlite3.Database('task.db');

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    created TEXT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 0
  )
`);

// UruvaakuVadharku
app.post('/', (req, res) => {
  const {id,task,created} = req.body;
  const sql = 'INSERT INTO tasks (id, task, created, status) VALUES (?, ?, ?, ?)';
  const params = [id, task, created, false];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ error: 'Id already irukunga' });
      }
      return res.status(500).json({ error: 'Server Kolaru' });
    }
    res.status(201).json({ id: this.lastID, task, created, status: false });
  });
});

// Papadharku
app.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server Kolaru' });
    }
    const tasks = rows.reduce((acc, task) => {
      task.status ? acc.Mudichiten.push(task) : acc.Innum_Mudikala.push(task);
      return acc;
    }, { Mudichiten: [], Innum_Mudikala: [] });

    res.json(tasks);
  });
});

// ThiruthuVatharuku
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run('UPDATE tasks SET status = ? WHERE id = ?', [status, id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server kolaru' });
    }if (this.changes === 0) {
      return res.status(404).json({ error: 'Apdi oru Task illa' });
    }
    res.json({ id, status });
  });
});

// Alipadharku
app.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server kolaru' });
    }if (this.changes === 0) {
      return res.status(404).json({ error: 'Apdi oru Task illa' });
    }
    res.json({ Thagaval: 'Task delete Panniten', DeletedTaskId: id });
  });
});

// Mothamaga Alipadharku
app.delete('/all',(req, res) => {
  db.run('DELETE FROM tasks', function(err){
    if(err){
      console.log(err.message);
      return res.status(500).json({error: 'server Kolaru'});
    }
    res.json({Thagaval: 'Totall Task Gaali..'});
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
