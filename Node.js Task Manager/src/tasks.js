// Import necessary modules
const express = require('express');
const router = express.Router();

// Sample task data (you can replace it with a database integration)
let tasks = [
  { id: 1, title: "Complete project documentation", completed: false },
  { id: 2, title: "Fix login authentication issue", completed: true },
  { id: 3, title: "Prepare for client meeting", completed: false },
];

// ROUTE: GET all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

// ROUTE: GET task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
});

// ROUTE: POST - Create a new task
router.post('/', (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ROUTE: PUT - Update a task by ID
router.put('/:id', (req, res) => {
  const { title, completed } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex].title = title || tasks[taskIndex].title;
  tasks[taskIndex].completed = completed !== undefined ? completed : tasks[taskIndex].completed;
  res.status(200).json(tasks[taskIndex]);
});

// ROUTE: DELETE - Delete a task by ID
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;
