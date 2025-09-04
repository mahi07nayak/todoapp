// Import the Express framework
const express = require('express');

// Import Mongoose to connect with MongoDB
const mongoose = require('mongoose');

// Import dotenv to use environment variables (like DB URL, PORT)
require('dotenv').config();

// Import CORS so frontend (React) can talk to backend (Node)
const cors = require('cors');

// Import routes from routes/todoRoutes.js
const todoRoutes = require('./routes/todoroutes');

// Create an Express application
const app = express();

// Middleware: parse incoming JSON requests
app.use(express.json());

// Middleware: allow requests from frontend (React)
app.use(cors());

// Load MongoDB connection URL from .env file
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Use todo routes under /api/todos
app.use('/api/todos', todoRoutes);

// Pick port from .env OR fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));

