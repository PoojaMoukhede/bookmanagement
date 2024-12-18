const express = require('express');
const { connectToDatabase } = require('./db');
const bookRoutes = require('./routes/book');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/books', bookRoutes);

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
