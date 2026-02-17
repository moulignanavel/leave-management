const { google } = require('googleapis');
const axios = require('axios');

/**
 * Calendar Sync Service
 * Integrates with Google Calendar and Outlook Calendar
 */

// Google Calendar Integration
class GoogleCalendarSync {
  constructor() {
    this.oauth2Client = null;
  }

  // Initialize OAuth2 client
  initializeClient(credentials) {
    const { client_id, client_secret, redirect_uri } = credentials;
    this.oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri
    );
  }

  // Set user tokens
  setCredentials(tokens) {
    if (this.oauth2Client) {
      this.oauth2Client.setCredentials(tokens);
    }
  }

  // Create calendar event for approved leave
  async createLeaveEvent(leave, userEmail) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const leaveTypes = {
        paidLeave: 'Paid Leave',
        sickLeave: 'Sick Leave',
        casualLeave: 'Casual Leave',
        maternityLeave: 'Maternity Leave',
        paternityLeave: 'Paternity Leave'
      };

      const event = {
        summary: `🏖️ ${leaveTypes[leave.leaveType]}`,
        description: `Leave Request\nType: ${leaveTypes[leave.leaveType]}\nDuration: ${leave.duration} days\nReason: ${leave.reason}\nStatus: ${leave.status}`,
        start: {
          date: leave.startDate.toISOString().split('T')[0],
          timeZone: 'UTC'
        },
        end: {
          date: new Date(leave.endDate.getTime() + 86400000).toISOString().split('T')[0], // +1 day for all-day event
          timeZone: 'UTC'
        },
        attendees: [{ email: userEmail }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 } // 1 hour before
          ]
        },
        colorId: '11', // Red color for leaves
        transparency: 'transparent', // Show as free/busy
        visibility: 'private'
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        sendUpdates: 'all'
      });

      return {
        success: true,
        eventId: response.data.id,
        eventLink: response.data.htmlLink
      };
    } catch (error) {
      console.error('Google Calendar sync failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update calendar event
  async updateLeaveEvent(eventId, leave) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const leaveTypes = {
        paidLeave: 'Paid Leave',
        sickLeave: 'Sick Leave',
        casualLeave: 'Casual Leave',
        maternityLeave: 'Maternity Leave',
        paternityLeave: 'Paternity Leave'
      };

      const event = {
        summary: `🏖️ ${leaveTypes[leave.leaveType]} - ${leave.status.toUpperCase()}`,
        description: `Leave Request\nType: ${leaveTypes[leave.leaveType]}\nDuration: ${leave.duration} days\nReason: ${leave.reason}\nStatus: ${leave.status}`,
        start: {
          date: leave.startDate.toISOString().split('T')[0],
          timeZone: 'UTC'
        },
        end: {
          date: new Date(leave.endDate.getTime() + 86400000).toISOString().split('T')[0],
          timeZone: 'UTC'
        }
      };

      await calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event,
        sendUpdates: 'all'
      });

      return { success: true };
    } catch (error) {
      console.error('Google Calendar update failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Delete calendar event
  async deleteLeaveEvent(eventId) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
        sendUpdates: 'all'
      });

      return { success: true };
    } catch (error) {
      console.error('Google Calendar delete failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Generate OAuth URL for user authorization
  getAuthUrl() {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async getTokens(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return { success: true, tokens };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Outlook Calendar Integration
class OutlookCalendarSync {
  constructor() {
    this.accessToken = null;
  }

  // Set access token
  setAccessToken(token) {
    this.accessToken = token;
  }

  // Create calendar event for approved leave
  async createLeaveEvent(leave, userEmail) {
    try {
      const leaveTypes = {
        paidLeave: 'Paid Leave',
        sickLeave: 'Sick Leave',
        casualLeave: 'Casual Leave',
        maternityLeave: 'Maternity Leave',
        paternityLeave: 'Paternity Leave'
      };

      const event = {
        subject: `🏖️ ${leaveTypes[leave.leaveType]}`,
        body: {
          contentType: 'HTML',
          content: `
            <h3>Leave Request</h3>
            <p><strong>Type:</strong> ${leaveTypes[leave.leaveType]}</p>
            <p><strong>Duration:</strong> ${leave.duration} days</p>
            <p><strong>Reason:</strong> ${leave.reason}</p>
            <p><strong>Status:</strong> ${leave.status}</p>
          `
        },
        start: {
          dateTime: leave.startDate.toISOString().split('T')[0] + 'T00:00:00',
          timeZone: 'UTC'
        },
        end: {
          dateTime: new Date(leave.endDate.getTime() + 86400000).toISOString().split('T')[0] + 'T00:00:00',
          timeZone: 'UTC'
        },
        isAllDay: true,
        showAs: 'oof', // Out of office
        categories: ['Leave', 'Out of Office'],
        sensitivity: 'private'
      };

      const response = await axios.post(
        'https://graph.microsoft.com/v1.0/me/events',
        event,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        eventId: response.data.id,
        eventLink: response.data.webLink
      };
    } catch (error) {
      console.error('Outlook Calendar sync failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update calendar event
  async updateLeaveEvent(eventId, leave) {
    try {
      const leaveTypes = {
        paidLeave: 'Paid Leave',
        sickLeave: 'Sick Leave',
        casualLeave: 'Casual Leave',
        maternityLeave: 'Maternity Leave',
        paternityLeave: 'Paternity Leave'
      };

      const event = {
        subject: `🏖️ ${leaveTypes[leave.leaveType]} - ${leave.status.toUpperCase()}`,
        body: {
          contentType: 'HTML',
          content: `
            <h3>Leave Request</h3>
            <p><strong>Type:</strong> ${leaveTypes[leave.leaveType]}</p>
            <p><strong>Duration:</strong> ${leave.duration} days</p>
            <p><strong>Reason:</strong> ${leave.reason}</p>
            <p><strong>Status:</strong> ${leave.status}</p>
          `
        }
      };

      await axios.patch(
        `https://graph.microsoft.com/v1.0/me/events/${eventId}`,
        event,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Outlook Calendar update failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Delete calendar event
  async deleteLeaveEvent(eventId) {
    try {
      await axios.delete(
        `https://graph.microsoft.com/v1.0/me/events/${eventId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Outlook Calendar delete failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Generate OAuth URL for user authorization
  getAuthUrl(clientId, redirectUri) {
    const scopes = 'Calendars.ReadWrite offline_access';
    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  }

  // Exchange authorization code for tokens
  async getTokens(code, clientId, clientSecret, redirectUri) {
    try {
      const response = await axios.post(
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return { success: true, tokens: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// iCal format generator (for generic calendar apps)
const generateICalEvent = (leave, userEmail) => {
  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  const startDate = leave.startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = new Date(leave.endDate.getTime() + 86400000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Leave Management System//EN
BEGIN:VEVENT
UID:leave-${leave._id}@leavemanagementsystem.com
DTSTAMP:${now}
DTSTART;VALUE=DATE:${startDate.split('T')[0]}
DTEND;VALUE=DATE:${endDate.split('T')[0]}
SUMMARY:${leaveTypes[leave.leaveType]}
DESCRIPTION:Leave Request\\nType: ${leaveTypes[leave.leaveType]}\\nDuration: ${leave.duration} days\\nReason: ${leave.reason}\\nStatus: ${leave.status}
STATUS:CONFIRMED
TRANSP:TRANSPARENT
CATEGORIES:LEAVE,OUT-OF-OFFICE
END:VEVENT
END:VCALENDAR`;
};

module.exports = {
  GoogleCalendarSync,
  OutlookCalendarSync,
  generateICalEvent
};
