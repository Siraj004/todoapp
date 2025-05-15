// backend/routes/todos.js
const express = require('express');
const Todo = require('../models/todo');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get all tasks for this user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('📥 Incoming GET /api/todos request');
    console.log('req.user:', req.user); // This should contain { id, username }

    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error('❌ Error in GET /api/todos:', error);
    res.status(500).json({ error: error.message });
  }
});


// Create a new task
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('POST /api/todos');
    console.log('req.body:', req.body);
    console.log('req.user:', req.user);

    const todo = new Todo({
      text: req.body.text,
      user: req.user.id
    });

    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error in POST /api/todos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Update (e.g. toggle completed or edit text)
router.put('/:id', authenticateToken, async (req, res) => {
  const { text, completed } = req.body;
  // Only allow update if it belongs to this user
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { text, completed },
    { new: true }
  );
  if (todo) res.json(todo);
  else res.sendStatus(404);
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
  const result = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (result) res.sendStatus(204);
  else res.sendStatus(404);
});

module.exports = router;
