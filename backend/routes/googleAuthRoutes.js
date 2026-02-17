const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Google OAuth login/signup
router.post('/google', async (req, res) => {
  try {
    const { email, name, googleId, picture } = req.body;

    if (!email || !name || !googleId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, login
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture || picture,
        token: generateToken(user._id)
      });
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        password: googleId, // Use googleId as password (will be hashed)
        role: 'employee', // Default role
        googleId,
        picture,
        authProvider: 'google'
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
