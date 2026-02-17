const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role, department });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      mobile: user.mobile,
      picture: user.picture,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
        department: user.department,
        mobile: user.mobile,
        picture: user.picture,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };


const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, update Google info if needed
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (!user.picture) user.picture = picture;
        await user.save();
      }
    } else {
      // Create new user with Google account
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8) + 'Aa1!', // Random password (won't be used)
        googleId,
        picture,
        authProvider: 'google',
        role: 'employee' // Default role for new Google sign-ups
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      mobile: user.mobile,
      picture: user.picture,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google authentication failed' });
  }
};

module.exports = { register, login, googleLogin };
