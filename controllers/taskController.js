import taskModel from "../models/taskModel.js";
const { Task, tasks } = taskModel;

export function createTask(req, res) {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = new Task(title, description, status || "To Do");
  tasks.push(task);

  res.status(201).json(task);
}

export function getTasks(req, res) {
  let results = [...tasks];

  // filtering by status
  if (req.query.status) {
  const status = req.query.status.toLowerCase();
  results = results.filter((t) => t.status.toLowerCase() === status);
}


  // searching by keyword in title or description
  if (req.query.search) {
    const keyword = req.query.search.toLowerCase();
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(keyword) ||
        t.description.toLowerCase().includes(keyword)
    );
  }

  // Sorting on createdAt or updatedAt

  if (req.query.sortBy) {
    results.sort((a, b) =>
      req.query.order === "desc"
        ? b[req.query.sortBy] - a[req.query.sortBy]
        : a[req.query.sortBy] - b[req.query.sortBy]
    );
  }

  res.json(results);
}

export function getTaskById(req, res) {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

export function updateTask(req, res) {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, status } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  task.updatedAt = new Date();

  res.json(task);
}

export function deleteTask(req, res) {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const deleted = tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully", task: deleted[0] });
}
