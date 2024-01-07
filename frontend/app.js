    document.addEventListener('DOMContentLoaded', function() {
    const createTaskForm = document.getElementById('create-task-form');
    const tasksList = document.getElementById('tasks-list');
    const deleteAllTasksButton = document.getElementById('delete-all-tasks');
    const baseUrl = 'https://tk24-test.onrender.com';

    // Function to get and display tasks
    function getTasks() {
        fetch(`${baseUrl}/`)
            .then(response => response.json())
            .then(data => {
                tasksList.innerHTML = '';
                [...data.Mudichiten, ...data.Innum_Mudikala].forEach(task => {
                    const li = document.createElement('li');
                    li.textContent = `${task.task} - ${task.created} - ${task.status ? 'Completed' : 'Not Completed'}`;
                    tasksList.appendChild(li);

                    // Add a delete button for each task
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = function() {
                        deleteTask(task.id);
                    };
                    li.appendChild(deleteButton);
                });
            });
    }

    // Function to create a new task
    createTaskForm.onsubmit = function(event) {
        event.preventDefault();
        const task = document.getElementById('task').value;
        const created = document.getElementById('created').value;

        fetch(`${baseUrl}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, created })
        })
        .then(response => response.json())
        .then(() => {
            getTasks(); // Refresh the list of tasks
            createTaskForm.reset(); // Reset the form
        });
    };

    // Function to delete a task
    function deleteTask(id) {
        fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            getTasks(); // Refresh the list of tasks
        });
    }

    // Function to delete all tasks
    deleteAllTasksButton.onclick = function() {
        fetch(`${baseUrl}/all`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            getTasks(); // Refresh the list of tasks
        });
    };

    // Initial fetch of tasks
    getTasks();
});
