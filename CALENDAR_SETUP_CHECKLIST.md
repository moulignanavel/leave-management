# Calendar Integration Setup Checklist

## 🎯 Quick Reference Guide

Use this checklist to set up Google and Outlook Calendar integration step by step.

---

## 📋 Pre-Setup Checklist

- [ ] Application is running (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Can login with test credentials
- [ ] Have Google account ready
- [ ] Have Microsoft account ready
- [ ] `.env` file is accessible

---

## 🔵 Google Calendar Setup (15 minutes)

### Part 1: Google Cloud Console

- [ ] Go to https://console.cloud.google.com/
- [ ] Create new project: "Leave Management System"
- [ ] Enable "Google Calendar API"
- [ ] Configure OAuth consent screen (External)
- [ ] Add app name and email
- [ ] Add scope: `https://www.googleapis.com/auth/calendar`
- [ ] Add test user: Your Gmail address
- [ ] Create OAuth 2.0 credentials (Web application)
- [ ] Add redirect URI: `http://localhost:5000/api/integrations/google/callback`
- [ ] Copy Client ID
- [ ] Copy Client Secret

### Part 2: Update Configuration

- [ ] Open `.env` file
- [ ] Add `GOOGLE_CLIENT_ID=...`
- [ ] Add `GOOGLE_CLIENT_SECRET=...`
- [ ] Add `GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback`
- [ ] Save file
- [ ] Restart server (Ctrl+C, then `npm run dev`)

### Part 3: Test Connection

- [ ] Open http://localhost:3000
- [ ] Login as employee1@test.com
- [ ] Go to Integration Settings
- [ ] See "✓ Available" for Google Calendar
- [ ] Click "Connect Google Calendar"
- [ ] Popup opens successfully
- [ ] Authorize with Google account
- [ ] See success message
- [ ] Connection established ✅

---

## 🔷 Outlook Calendar Setup (15 minutes)

### Part 1: Azure Portal

- [ ] Go to https://portal.azure.com/
- [ ] Search "App registrations"
- [ ] Click "New registration"
- [ ] Name: "Leave Management System"
- [ ] Account types: "Any organizational directory and personal accounts"
- [ ] Redirect URI: `http://localhost:5000/api/integrations/outlook/callback`
- [ ] Click "Register"
- [ ] Copy Application (client) ID
- [ ] Go to "Certificates & secrets"
- [ ] Create new client secret
- [ ] Copy secret value (shown only once!)
- [ ] Go to "API permissions"
- [ ] Add "Microsoft Graph" permissions
- [ ] Add `Calendars.ReadWrite`
- [ ] Add `offline_access`
- [ ] Go to "Authentication"
- [ ] Add URI: `http://localhost:3000`
- [ ] Check "Access tokens" and "ID tokens"
- [ ] Save

### Part 2: Update Configuration

- [ ] Open `.env` file
- [ ] Add `OUTLOOK_CLIENT_ID=...`
- [ ] Add `OUTLOOK_CLIENT_SECRET=...`
- [ ] Add `OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback`
- [ ] Save file
- [ ] Restart server (Ctrl+C, then `npm run dev`)

### Part 3: Test Connection

- [ ] Open http://localhost:3000
- [ ] Login as employee1@test.com
- [ ] Go to Integration Settings
- [ ] See "✓ Available" for Outlook Calendar
- [ ] Click "Connect Outlook Calendar"
- [ ] Popup opens successfully
- [ ] Authorize with Microsoft account
- [ ] See success message
- [ ] Connection established ✅

---

## 🧪 End-to-End Testing

### Test Google Calendar Sync

- [ ] Login as employee1@test.com
- [ ] Connect Google Calendar (if not already)
- [ ] Go to "Apply Leave"
- [ ] Select Paid Leave
- [ ] Choose dates (tomorrow to 3 days later)
- [ ] Enter reason: "Testing calendar sync"
- [ ] Submit
- [ ] Logout
- [ ] Login as admin@test.com
- [ ] Go to "Pending Leaves"
- [ ] Approve the leave
- [ ] Logout
- [ ] Login as employee1@test.com
- [ ] Go to "My Leaves"
- [ ] See "✓ Synced to Google Calendar" badge
- [ ] Open Google Calendar
- [ ] See leave event with correct dates
- [ ] Event shows leave type and details
- [ ] Success! ✅

### Test Outlook Calendar Sync

- [ ] Login as employee2@test.com
- [ ] Connect Outlook Calendar
- [ ] Apply for leave
- [ ] Get it approved by admin
- [ ] Check "My Leaves" for sync badge
- [ ] Open Outlook Calendar
- [ ] See leave event
- [ ] Event shows as "Out of Office"
- [ ] Success! ✅

### Test iCal Export

- [ ] Login as any user
- [ ] Go to "My Leaves"
- [ ] Find approved leave
- [ ] Click "Download iCal"
- [ ] File downloads successfully
- [ ] Import to calendar app
- [ ] Event appears in calendar
- [ ] Success! ✅

---

## ✅ Verification Checklist

### Integration Settings Page

- [ ] Google Calendar shows "✓ Available"
- [ ] Outlook Calendar shows "✓ Available"
- [ ] iCal Export shows "✓ Always Available"
- [ ] Can click connect buttons
- [ ] No error messages

### My Leaves Page

- [ ] Approved leaves show sync badges
- [ ] "Download iCal" button appears
- [ ] Clicking download works
- [ ] No console errors

### Calendar Apps

- [ ] Events appear in Google Calendar
- [ ] Events appear in Outlook Calendar
- [ ] Events have correct dates
- [ ] Events show leave details
- [ ] Events are private
- [ ] Reminders are set

### Server Logs

- [ ] No error messages
- [ ] See "Leave synced to Google Calendar"
- [ ] See "Leave synced to Outlook Calendar"
- [ ] MongoDB connection stable

---

## 🐛 Troubleshooting Checklist

### If Google Calendar Not Working

- [ ] Check .env has GOOGLE_CLIENT_ID
- [ ] Check .env has GOOGLE_CLIENT_SECRET
- [ ] Check .env has GOOGLE_REDIRECT_URI
- [ ] Verify redirect URI matches exactly in Google Console
- [ ] Check test user is added in OAuth consent screen
- [ ] Restart server after .env changes
- [ ] Clear browser cache
- [ ] Try different browser
- [ ] Check browser console for errors
- [ ] Check server logs for errors

### If Outlook Calendar Not Working

- [ ] Check .env has OUTLOOK_CLIENT_ID
- [ ] Check .env has OUTLOOK_CLIENT_SECRET
- [ ] Check .env has OUTLOOK_REDIRECT_URI
- [ ] Verify redirect URI matches exactly in Azure Portal
- [ ] Check API permissions are granted
- [ ] Restart server after .env changes
- [ ] Clear browser cache
- [ ] Try different browser
- [ ] Check browser console for errors
- [ ] Check server logs for errors

### If Popup Blocked

- [ ] Allow popups for localhost:3000
- [ ] Check browser popup settings
- [ ] Try incognito/private mode
- [ ] Try different browser

### If Calendar Not Syncing

- [ ] Verify leave is approved (not pending)
- [ ] Check calendar is connected
- [ ] Reconnect calendar
- [ ] Check server logs
- [ ] Verify tokens in database
- [ ] Try manual sync

---

## 📝 Configuration Template

Copy this to your `.env` file:

```env
# Google Calendar Integration
GOOGLE_CLIENT_ID=paste-your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback

# Outlook Calendar Integration
OUTLOOK_CLIENT_ID=paste-your-application-id-here
OUTLOOK_CLIENT_SECRET=paste-your-client-secret-here
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback
```

---

## 🎯 Success Criteria

You're done when:

1. ✅ Both calendars show "Available" in Integration Settings
2. ✅ Can connect both calendars without errors
3. ✅ Approved leaves show sync badges
4. ✅ Events appear in calendar apps automatically
5. ✅ iCal download works
6. ✅ No errors in console or logs

---

## 📚 Reference Documents

- **Detailed Google Setup**: `SETUP_GOOGLE_CALENDAR.md`
- **Detailed Outlook Setup**: `SETUP_OUTLOOK_CALENDAR.md`
- **Complete Guide**: `CALENDAR_INTEGRATION_COMPLETE_GUIDE.md`
- **All Features**: `INTEGRATION_FEATURES.md`
- **Quick Start**: `QUICK_START_INTEGRATIONS.md`

---

## ⏱️ Time Estimates

- Google Calendar Setup: 15 minutes
- Outlook Calendar Setup: 15 minutes
- Testing: 10 minutes
- **Total**: ~40 minutes

---

## 🎉 Completion

Once all checkboxes are marked:

✅ **Google Calendar Integration**: Complete
✅ **Outlook Calendar Integration**: Complete
✅ **iCal Export**: Working
✅ **Auto-Sync**: Enabled
✅ **Testing**: Passed

**Congratulations! Calendar integration is fully operational!** 🚀

---

**Last Updated**: February 15, 2026
**Status**: Ready for Setup
