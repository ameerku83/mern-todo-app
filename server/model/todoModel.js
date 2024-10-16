const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
