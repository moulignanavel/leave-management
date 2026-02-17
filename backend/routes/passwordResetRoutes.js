const express = require('express');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../utils/emailService');
const router = express.Router();

// In-memory storage for reset tokens (in production, use Redis or database)
const resetTokens = new Map();

// Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ message: 'If the email exists, a reset code has been sent' });
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store reset code with expiry (10 minutes)
    resetTokens.set(email, {
      code: resetCode,
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // Send email with reset code
    const emailResult = await sendPasswordResetEmail(email, resetCode);

    if (emailResult.success) {
      console.log(`Password reset code sent to ${email}`);
      res.json({ 
        message: 'If the email exists, a reset code has been sent to your email'
      });
    } else {
      // If email fails, still log to console as fallback
      console.log(`Email failed. Password reset code for ${email}: ${resetCode}`);
      res.json({ 
        message: 'Reset code generated. Check server console (email service not configured)',
        resetCode: resetCode // Only for development
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify reset code
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and code are required' });
    }

    const resetData = resetTokens.get(email);

    if (!resetData) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    if (Date.now() > resetData.expires) {
      resetTokens.delete(email);
      return res.status(400).json({ message: 'Reset code has expired' });
    }

    if (resetData.code !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    res.json({ message: 'Code verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const resetData = resetTokens.get(email);

    if (!resetData) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    if (Date.now() > resetData.expires) {
      resetTokens.delete(email);
      return res.status(400).json({ message: 'Reset code has expired' });
    }

    if (resetData.code !== code) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    // Find user and update password
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    // Remove used token
    resetTokens.delete(email);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
