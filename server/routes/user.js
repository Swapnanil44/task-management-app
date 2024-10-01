const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: '5h', // Token valid for 1 hour
  });
};

// @route   POST /register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body; // Accept role from body
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'user', // Set role based on request
    });

    // Save the user to the database
    await user.save();

    // Create and send JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// @route   POST /login
// @desc    Log in user
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
       token,
       user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
        } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /logout
// @desc    Log out user
// @access  Public
router.post('/logout', (req, res) => {
  // In most cases, logout can be handled client-side by deleting the token
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
