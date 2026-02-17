const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.employeeId !== undefined) user.employeeId = req.body.employeeId; // Allow empty string
    if (req.body.department) user.department = req.body.department;
    if (req.body.mobile !== undefined) user.mobile = req.body.mobile; // Allow empty string
    if (req.body.picture !== undefined) user.picture = req.body.picture; // Allow empty string to remove picture

    // Handle password change
    if (req.body.newPassword) {
      if (!req.body.currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }

      const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      user.password = req.body.newPassword;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      mobile: user.mobile,
      picture: user.picture
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
