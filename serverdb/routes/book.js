const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Book = require('../models/Books');
const bcrypt = require('bcryptjs')

// Middleware to check for authentication
const authenticate = (req, res, next) => {
  try {
    // Get the token from the "Authorization" header
    const authHeader = req.header("Authorization");
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
      console.log("No Authorization header found, Access Denied");
      return res.status(401).json({ message: "Access Denied" });
    }

    // Extract the token from "Bearer <token>"
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) {
      console.log("Token not found after Bearer prefix, Access Denied");
      return res.status(401).json({ message: "Access Denied" });
    }

    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully:", verified);

    // Attach the user information from the token payload to the request object
    req.user = verified;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    console.log('token from login',token);
    res.json({ token });
});


// Create a Book (authenticated user)
router.post('/books', authenticate, async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({
      title,
      author,
      genre,
      user: req.user._id, // Associate the book with the user
    });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all books for the user (authenticated)
router.get('/books', authenticate, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id });
    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a Book (authenticated user)
router.put('/books/:id', authenticate, async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // Ensure the book belongs to the user
      { title, author, genre },
      { new: true }
    );
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a Book (authenticated user)
router.delete('/books/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router