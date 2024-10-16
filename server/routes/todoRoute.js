const express = require('express');
const authMiddleware = require('../middleWare/authmiddleware');
const Todo = require('../model/todoModel');


const router = express.Router();

// Get todos for authenticated user
router.get('/todos', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

// Add a todo
router.post('/todos', authMiddleware, async (req, res) => {
  const newTodo = new Todo({ userId: req.user.id, task: req.body.task });
  await newTodo.save();
  res.json(newTodo);
});

// Edit a todo
router.put('/todos/:id', authMiddleware, async (req, res) => {
  const { task, isCompleted } = req.body;
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { task, isCompleted },
    { new: true }
  );
  res.json(updatedTodo);
});

// Delete a todo
router.delete('/todos/:id', authMiddleware, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
