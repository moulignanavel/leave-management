const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Leave = require('../models/Leave');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const { q } = req.query;
    const searchQuery = q.trim();

    if (!searchQuery) {
      return res.json([]);
    }

    const results = [];
    const searchRegex = new RegExp(searchQuery, 'i'); // Case-insensitive search

    // Search based on user role
    if (req.user.role === 'employee') {
      // Employees can search their own leaves
      const leaves = await Leave.find({
        userId: req.user._id,
        $or: [
          { leaveType: searchRegex },
          { reason: searchRegex },
          { status: searchRegex }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(10);

      leaves.forEach(leave => {
        results.push({
          type: 'leave',
          title: `${leave.leaveType} - ${leave.status}`,
          subtitle: `${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()}`,
          status: leave.status,
          id: leave._id
        });
      });
    }

    if (req.user.role === 'manager') {
      // Managers can search their team's leaves
      const teamLeaves = await Leave.find({
        $or: [
          { leaveType: searchRegex },
          { reason: searchRegex },
          { status: searchRegex }
        ]
      })
        .populate('userId', 'name email department')
        .sort({ createdAt: -1 })
        .limit(10);

      teamLeaves.forEach(leave => {
        results.push({
          type: leave.status === 'pending' ? 'pending-leave' : 'leave',
          title: `${leave.userId?.name || 'Unknown'} - ${leave.leaveType}`,
          subtitle: `${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()}`,
          status: leave.status,
          id: leave._id
        });
      });

      // Search their own leaves
      const myLeaves = await Leave.find({
        userId: req.user._id,
        $or: [
          { leaveType: searchRegex },
          { reason: searchRegex },
          { status: searchRegex }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(5);

      myLeaves.forEach(leave => {
        results.push({
          type: 'leave',
          title: `My ${leave.leaveType} - ${leave.status}`,
          subtitle: `${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()}`,
          status: leave.status,
          id: leave._id
        });
      });
    }

    if (req.user.role === 'admin') {
      // Admins can search users
      const users = await User.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { department: searchRegex },
          { employeeId: searchRegex },
          { role: searchRegex }
        ]
      })
        .select('name email role department employeeId')
        .limit(10);

      users.forEach(user => {
        results.push({
          type: 'user',
          title: user.name,
          subtitle: `${user.email} - ${user.role}${user.employeeId ? ` (${user.employeeId})` : ''}`,
          id: user._id
        });
      });

      // Admins can search all leaves
      const allLeaves = await Leave.find({
        $or: [
          { leaveType: searchRegex },
          { reason: searchRegex },
          { status: searchRegex }
        ]
      })
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(10);

      allLeaves.forEach(leave => {
        results.push({
          type: leave.status === 'pending' ? 'pending-leave' : 'leave',
          title: `${leave.userId?.name || 'Unknown'} - ${leave.leaveType}`,
          subtitle: `${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()}`,
          status: leave.status,
          id: leave._id
        });
      });
    }

    // Remove duplicates and limit results
    const uniqueResults = results.filter((result, index, self) =>
      index === self.findIndex((r) => r.id.toString() === result.id.toString() && r.type === result.type)
    );

    res.json(uniqueResults.slice(0, 15)); // Return max 15 results
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;
