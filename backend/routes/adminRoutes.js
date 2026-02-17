const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  adjustLeaveBalance,
  getLeavePolicies,
  createLeavePolicy,
  updateLeavePolicy,
  deleteLeavePolicy,
  getAuditLogs,
  getSystemStats
} = require('../controllers/adminController');
const router = express.Router();

// User Management
router.get('/users', protect, authorize('admin'), getAllUsers);
router.post('/users', protect, authorize('admin'), createUser);
router.put('/users/:userId', protect, authorize('admin'), updateUser);
router.delete('/users/:userId', protect, authorize('admin'), deleteUser);
router.put('/users/:userId/balance', protect, authorize('admin'), adjustLeaveBalance);

// Leave Policy Management
router.get('/policies', protect, authorize('admin'), getLeavePolicies);
router.post('/policies', protect, authorize('admin'), createLeavePolicy);
router.put('/policies/:policyId', protect, authorize('admin'), updateLeavePolicy);
router.delete('/policies/:policyId', protect, authorize('admin'), deleteLeavePolicy);

// Audit Logs
router.get('/audit-logs', protect, authorize('admin'), getAuditLogs);

// System Statistics
router.get('/stats', protect, authorize('admin'), getSystemStats);

module.exports = router;
