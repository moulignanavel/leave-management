const { 
  generatePayrollData, 
  formatForPayrollSystem,
  sendPayrollWebhook,
  prepareWebhookData
} = require('../utils/payrollIntegration');
const { 
  GoogleCalendarSync, 
  OutlookCalendarSync,
  generateICalEvent
} = require('../utils/calendarSync');
const Leave = require('../models/Leave');
const User = require('../models/User');

// Payroll Integration Endpoints

// Get payroll data for period
const getPayrollData = async (req, res) => {
  try {
    const { startDate, endDate, format = 'generic' } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const payrollData = await generatePayrollData(startDate, endDate);
    const formattedData = formatForPayrollSystem(payrollData, format);

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Webhook endpoint for payroll systems
const payrollWebhook = async (req, res) => {
  try {
    const { leaveId, action } = req.body;

    const leave = await Leave.findById(leaveId).populate('userId');
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    const webhookData = prepareWebhookData(leave, action);

    // In production, send to configured webhook URL
    const webhookUrl = process.env.PAYROLL_WEBHOOK_URL;
    if (webhookUrl) {
      const result = await sendPayrollWebhook(webhookUrl, webhookData);
      res.json({ message: 'Webhook sent', result });
    } else {
      res.json({ message: 'Webhook data prepared', data: webhookData });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calendar Integration Endpoints

// Google Calendar OAuth
const googleCalendarAuth = async (req, res) => {
  try {
    const googleSync = new GoogleCalendarSync();
    googleSync.initializeClient({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/integrations/google/callback'
    });

    const authUrl = googleSync.getAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Google Calendar OAuth Callback
const googleCalendarCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const googleSync = new GoogleCalendarSync();
    googleSync.initializeClient({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/integrations/google/callback'
    });

    const result = await googleSync.getTokens(code);

    if (result.success) {
      // Store tokens in user profile (in production)
      // For now, return them
      res.json({ 
        message: 'Google Calendar connected successfully',
        tokens: result.tokens 
      });
    } else {
      res.status(400).json({ message: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sync leave to Google Calendar
const syncToGoogleCalendar = async (req, res) => {
  try {
    const { leaveId, tokens } = req.body;

    const leave = await Leave.findById(leaveId).populate('userId');
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    const googleSync = new GoogleCalendarSync();
    googleSync.initializeClient({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI
    });
    googleSync.setCredentials(tokens);

    const result = await googleSync.createLeaveEvent(leave, leave.userId.email);

    if (result.success) {
      // Store event ID in leave record for future updates
      leave.calendarEventId = result.eventId;
      await leave.save();

      res.json({ 
        message: 'Leave synced to Google Calendar',
        eventLink: result.eventLink 
      });
    } else {
      res.status(400).json({ message: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Outlook Calendar OAuth
const outlookCalendarAuth = async (req, res) => {
  try {
    const outlookSync = new OutlookCalendarSync();
    const authUrl = outlookSync.getAuthUrl(
      process.env.OUTLOOK_CLIENT_ID,
      process.env.OUTLOOK_REDIRECT_URI || 'http://localhost:5000/api/integrations/outlook/callback'
    );

    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Outlook Calendar OAuth Callback
const outlookCalendarCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const outlookSync = new OutlookCalendarSync();
    const result = await outlookSync.getTokens(
      code,
      process.env.OUTLOOK_CLIENT_ID,
      process.env.OUTLOOK_CLIENT_SECRET,
      process.env.OUTLOOK_REDIRECT_URI || 'http://localhost:5000/api/integrations/outlook/callback'
    );

    if (result.success) {
      res.json({ 
        message: 'Outlook Calendar connected successfully',
        tokens: result.tokens 
      });
    } else {
      res.status(400).json({ message: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sync leave to Outlook Calendar
const syncToOutlookCalendar = async (req, res) => {
  try {
    const { leaveId, accessToken } = req.body;

    const leave = await Leave.findById(leaveId).populate('userId');
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    const outlookSync = new OutlookCalendarSync();
    outlookSync.setAccessToken(accessToken);

    const result = await outlookSync.createLeaveEvent(leave, leave.userId.email);

    if (result.success) {
      // Store event ID in leave record
      leave.calendarEventId = result.eventId;
      await leave.save();

      res.json({ 
        message: 'Leave synced to Outlook Calendar',
        eventLink: result.eventLink 
      });
    } else {
      res.status(400).json({ message: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download iCal file
const downloadICalFile = async (req, res) => {
  try {
    const { leaveId } = req.params;

    const leave = await Leave.findById(leaveId).populate('userId');
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    const icalContent = generateICalEvent(leave, leave.userId.email);

    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', `attachment; filename="leave-${leaveId}.ics"`);
    res.send(icalContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get integration status
const getIntegrationStatus = async (req, res) => {
  try {
    const status = {
      payroll: {
        enabled: !!process.env.PAYROLL_WEBHOOK_URL,
        webhookUrl: process.env.PAYROLL_WEBHOOK_URL ? 'Configured' : 'Not configured',
        supportedFormats: ['generic', 'adp', 'gusto', 'quickbooks', 'sap']
      },
      googleCalendar: {
        enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
        configured: !!process.env.GOOGLE_CLIENT_ID
      },
      outlookCalendar: {
        enabled: !!(process.env.OUTLOOK_CLIENT_ID && process.env.OUTLOOK_CLIENT_SECRET),
        configured: !!process.env.OUTLOOK_CLIENT_ID
      },
      icalExport: {
        enabled: true,
        description: 'Download .ics files for any calendar app'
      }
    };

    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
