const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const Leave = require('../models/Leave');
const User = require('../models/User');
const { sendApprovalReminder } = require('../utils/notificationService');
const router = express.Router();

// Get notification count for current user
router.get('/count', protect, async (req, res) => {
  try {
    let count = 0;
    
    if (req.user.role === 'manager') {
      // Count pending leaves for manager's team
      const teamMembers = await User.find({ managerId: req.user._id });
      const teamIds = teamMembers.map(member => member._id);
      count = await Leave.countDocuments({
        userId: { $in: teamIds },
        status: 'pending'
      });
    } else if (req.user.role === 'admin') {
      // Count manager-approved leaves pending HR approval
      count = await Leave.countDocuments({
        status: 'managerApproved'
      });
    }
    
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send reminder to approvers with pending requests
router.post('/send-reminders', protect, authorize('admin'), async (req, res) => {
  try {
    // Find all managers with pending approvals
    const managers = await User.find({ role: 'manager' });
    
    for (const manager of managers) {
      const teamMembers = await User.find({ managerId: manager._id });
      const teamIds = teamMembers.map(member => member._id);
      const pendingCount = await Leave.countDocuments({
        userId: { $in: teamIds },
        status: 'pending'
      });
      
      if (pendingCount > 0) {
        await sendApprovalReminder(manager, pendingCount);
      }
    }
    
    // Find admins with pending HR approvals
    const admins = await User.find({ role: 'admin' });
    const hrPendingCount = await Leave.countDocuments({ status: 'managerApproved' });
    
    if (hrPendingCount > 0) {
      for (const admin of admins) {
        await sendApprovalReminder(admin, hrPendingCount);
      }
    }
    
    res.json({ message: 'Reminders sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
