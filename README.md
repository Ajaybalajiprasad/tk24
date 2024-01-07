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

### Get All Tasks

```javascript
Invoke-RestMethod -Uri http://localhost:6969/ -Method Get
```

### Update Task Status

```javascript
Invoke-RestMethod -Uri http://localhost:6969/10121 -Method Put -Headers @{"Content-Type"="application/json"} -Body '{"status": true}'
```
### Delete a Task

```javascript
Invoke-RestMethod -Uri http://localhost:6969/10122 -Method Delete
```

### Delete All Tasks

```javascript
Invoke-RestMethod -Uri http://localhost:6969/all -Method Delete
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





