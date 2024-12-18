const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
