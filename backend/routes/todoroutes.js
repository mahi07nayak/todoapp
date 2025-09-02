// Import Express router
const express = require('express');
const router = express.Router();

// Import Todo model
const Todo = require('../models/todomodel');

// 📌 Get all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 }); // newest first
  res.json(todos);
});

// 📌 Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.json(todo);
});

// 📌 Update a todo (mark done/undone)
router.put('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

// 📌 Delete a todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// Export router so server.js can use it
module.exports = router;
