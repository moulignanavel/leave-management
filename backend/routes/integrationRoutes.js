const express = require('express');
const {
  getPayrollData,
  payrollWebhook,
  googleCalendarAuth,
  googleCalendarCallback,
  syncToGoogleCalendar,
  outlookCalendarAuth,
  outlookCalendarCallback,
  syncToOutlookCalendar,
  downloadICalFile,
  getIntegrationStatus
} = require('../controllers/integrationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Integration status
router.get('/status', protect, getIntegrationStatus);

// Payroll Integration
router.get('/payroll/data', protect, authorize('admin'), getPayrollData);
router.post('/payroll/webhook', payrollWebhook); // Public endpoint for external systems

// Google Calendar Integration
router.get('/google/auth', protect, googleCalendarAuth);
router.get('/google/callback', googleCalendarCallback);
router.post('/google/sync', protect, syncToGoogleCalendar);

// Outlook Calendar Integration
router.get('/outlook/auth', protect, outlookCalendarAuth);
router.get('/outlook/callback', outlookCalendarCallback);
router.post('/outlook/sync', protect, syncToOutlookCalendar);

// iCal Export
router.get('/ical/:leaveId', protect, downloadICalFile);

module.exports = router;
