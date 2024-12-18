const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
});

// Create the Book model based on the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
