// Import mongoose to create schema/model
const mongoose = require('mongoose');

// Define schema (structure) of a Todo item
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Task title
  done: { type: Boolean, default: false }, // Whether task is completed
}, { timestamps: true }); // Automatically add createdAt & updatedAt

// Create a model (collection in MongoDB will be "todos")
module.exports = mongoose.model('Todo', todoSchema);
