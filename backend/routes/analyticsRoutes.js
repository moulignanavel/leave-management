const express = require('express');
const {
  getEmployeeReport,
  getTeamAnalytics,
  getOrganizationAnalytics
} = require('../controllers/analyticsController');
const {
  exportEmployeeReport,
  exportTeamReport,
  exportPayrollReport,
  exportOrganizationReport
} = require('../controllers/exportController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Analytics endpoints
router.get('/employee/:userId?', protect, getEmployeeReport);
router.get('/team', protect, authorize('manager', 'admin'), getTeamAnalytics);
router.get('/organization', protect, authorize('admin'), getOrganizationAnalytics);

// Export endpoints
router.get('/export/employee/:userId?', protect, exportEmployeeReport);
router.get('/export/team', protect, authorize('manager', 'admin'), exportTeamReport);
router.get('/export/payroll', protect, authorize('admin'), exportPayrollReport);
router.get('/export/organization', protect, authorize('admin'), exportOrganizationReport);

module.exports = router;
