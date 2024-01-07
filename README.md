# TK24 CRUD 

### About the Project

Here is a straightforward TO-DO application with CRUD operations. This implementation uses SQLite for the database, as I'm more familiar with it than PostgreSQL. Below, you'll find information on API endpoints, CRUD operations and a database schema. Additionally, I've included commands for PowerShell and attached some screenshots to help you visualize these endpoints.

## API Endpoints

> commands Power Shell

#### Feel free to Adjust these commands As Needed.


### Create a Task

```javascript
Invoke-RestMethod -Uri http://localhost:6969/ -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"task": "Sample Task", "created": "2023-01-05"}'
```

```python
> UruvaakuVadharku
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
```
---

### Get All Tasks

```javascript
Invoke-RestMethod -Uri http://localhost:6969/ -Method Get
```

```python
> Papadharku
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
```
---

### Update Task Status

```javascript
Invoke-RestMethod -Uri http://localhost:6969/10121 -Method Put -Headers @{"Content-Type"="application/json"} -Body '{"status": true}'
```

```python
> ThiruthuVatharuku
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
```
---

### Delete a Task

```javascript
Invoke-RestMethod -Uri http://localhost:6969/10122 -Method Delete
```

```python
> Alipadharku
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
```
---

### Delete All Tasks

```javascript
Invoke-RestMethod -Uri http://localhost:6969/all -Method Delete
```

```python
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
```
---

## Database Example

| id    | task          | created      | status |
|-------|---------------|--------------|--------|
| 10121 | Wash dishes   | 2023-01-05   | true   |
| 10122 | Hit the Gym   | 2023-01-05   | false  |
| 10123 | Eat Food      | 2023-01-05   | false  |


---

## Database Schema
```sql
id: INTEGER PRIMARY KEY AUTOINCREMENT - Unique identifier for each task.
task: TEXT NOT NULL - Description of the task.
created: TEXT NOT NULL - Creation date of the task.
status: BOOLEAN NOT NULL DEFAULT 0 - Status of the task, where 0 is not completed and 1 is completed.
```





