require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tasksRouter = require('./src/tasks');  // Import the tasks router

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Error connecting to database:", err));

const Task = mongoose.model("Task", { name: String });

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();
  res.json(task);
});

app.use('/api/tasks', tasksRouter);  // Use tasks router for /api/tasks routes

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
