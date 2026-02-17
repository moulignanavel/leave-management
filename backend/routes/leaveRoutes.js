const express = require('express');
const { 
  createLeave, 
  getMyLeaves, 
  getPendingLeaves, 
  updateLeaveStatus,
  getLeaveStats,
  getAllLeaves
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/stats', protect, getLeaveStats);
router.get('/all', protect, authorize('admin'), getAllLeaves);
router.get('/pending', protect, authorize('manager', 'admin'), getPendingLeaves);
router.put('/:id', protect, authorize('manager', 'admin'), updateLeaveStatus);

module.exports = router;
