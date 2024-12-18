const express = require('express');
const Book = require('../models/Book');
const { verifyToken } = require('./auth');  // Import verifyToken middleware
const router = express.Router();

// Middleware to validate book data
const validateBookData = (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }
  next();
};

// 1. Get all books
router.get('/', verifyToken, async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// 2. Add a new book
router.post('/', verifyToken, validateBookData, async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = await Book.create({ title, author, genre });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

// 3. Update a book by ID
router.put('/:id', verifyToken, validateBookData, async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre || book.genre;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

// 4. Delete a book by ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

module.exports = router;
