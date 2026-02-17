# Complete Calendar Integration Guide

## 🎯 Overview

This guide will help you set up Google Calendar and Outlook Calendar integration for your Leave Management System. Once configured, approved leaves will automatically sync to employees' calendars.

---

## 📋 Prerequisites

- Leave Management System running (npm run dev)
- Google account (for Google Calendar)
- Microsoft account (for Outlook Calendar)
- 15-20 minutes for setup

---

## 🔵 Option 1: Google Calendar Integration

### Quick Setup Checklist

- [ ] Create Google Cloud Project
- [ ] Enable Google Calendar API
- [ ] Configure OAuth Consent Screen
- [ ] Create OAuth 2.0 Credentials
- [ ] Update .env file
- [ ] Restart server
- [ ] Test connection

### Detailed Steps

#### 1. Create Google Cloud Project (2 minutes)

1. Go to: https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Name: `Leave Management System`
4. Click "Create"

#### 2. Enable Google Calendar API (1 minute)

1. Go to: https://console.cloud.google.com/apis/library
2. Search: `Google Calendar API`
3. Click on it → Click "Enable"

#### 3. Configure OAuth Consent Screen (3 minutes)

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Select "External" → Click "Create"
3. Fill in:
   - App name: `Leave Management System`
   - User support email: Your email
   - Developer contact: Your email
4. Click "Save and Continue"
5. Add Scopes:
   - Click "Add or Remove Scopes"
   - Search: `calendar`
   - Select: `https://www.googleapis.com/auth/calendar`
   - Click "Update" → "Save and Continue"
6. Add Test Users:
   - Click "Add Users"
   - Add your Gmail address
   - Click "Add" → "Save and Continue"

#### 4. Create OAuth 2.0 Credentials (2 minutes)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: `Leave Management System Web Client`
5. Authorized redirect URIs:
   - Add: `http://localhost:5000/api/integrations/google/callback`
   - Add: `http://localhost:3000`
6. Click "Create"
7. **COPY** Client ID and Client Secret

#### 5. Update .env File (1 minute)

Open `.env` and add:

```env
# Google Calendar Integration
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
```

#### 6. Restart Server (1 minute)

```bash
# Stop server (Ctrl+C)
npm run dev
```

#### 7. Test Connection (2 minutes)

1. Open: http://localhost:3000
2. Login: employee1@test.com / employee123
3. Go to "Integration Settings"
4. Click "Connect Google Calendar"
5. Authorize in popup
6. Success! ✅

---

## 🔷 Option 2: Outlook Calendar Integration

### Quick Setup Checklist

- [ ] Register app in Azure Portal
- [ ] Copy Application ID
- [ ] Create Client Secret
- [ ] Add API Permissions
- [ ] Configure Redirect URIs
- [ ] Update .env file
- [ ] Restart server
- [ ] Test connection

### Detailed Steps

#### 1. Register Application (2 minutes)

1. Go to: https://portal.azure.com/
2. Search: "App registrations"
3. Click "New registration"
4. Fill in:
   - Name: `Leave Management System`
   - Account types: "Accounts in any organizational directory and personal Microsoft accounts"
   - Redirect URI: Web → `http://localhost:5000/api/integrations/outlook/callback`
5. Click "Register"

#### 2. Copy Application ID (1 minute)

1. On overview page, copy "Application (client) ID"
2. Save it for .env file

#### 3. Create Client Secret (2 minutes)

1. Click "Certificates & secrets" (left menu)
2. Click "New client secret"
3. Description: `Leave Management System Secret`
4. Expires: 24 months
5. Click "Add"
6. **COPY the Value immediately** (shown only once!)

#### 4. Add API Permissions (2 minutes)

1. Click "API permissions" (left menu)
2. Click "Add a permission"
3. Select "Microsoft Graph"
4. Select "Delegated permissions"
5. Search and add:
   - `Calendars.ReadWrite`
   - `offline_access`
6. Click "Add permissions"

#### 5. Configure Redirect URIs (1 minute)

1. Click "Authentication" (left menu)
2. Add URI: `http://localhost:3000`
3. Check boxes:
   - ✅ Access tokens
   - ✅ ID tokens
4. Click "Save"

#### 6. Update .env File (1 minute)

Open `.env` and add:

```env
# Outlook Calendar Integration
OUTLOOK_CLIENT_ID=your-application-id
OUTLOOK_CLIENT_SECRET=your-client-secret
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback
```

#### 7. Restart Server (1 minute)

```bash
# Stop server (Ctrl+C)
npm run dev
```

#### 8. Test Connection (2 minutes)

1. Open: http://localhost:3000
2. Login: employee1@test.com / employee123
3. Go to "Integration Settings"
4. Click "Connect Outlook Calendar"
5. Authorize in popup
6. Success! ✅

---

## 🎨 Complete .env Example

```env
# Database
MONGO_URI=mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management

# JWT
JWT_SECRET=mysupersecretkey12345changethis

# Server
PORT=5000
NODE_ENV=development

# Email (Gmail)
EMAIL_USER=moulignanavel@gmail.com
EMAIL_PASSWORD=dgsluaoidmrkpdsr

# Google Calendar Integration
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOp
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback

# Outlook Calendar Integration
OUTLOOK_CLIENT_ID=12345678-1234-1234-1234-123456789abc
OUTLOOK_CLIENT_SECRET=AbC~dEf1GhI2jKl3MnO4pQr5
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback

# Payroll Integration (Optional)
# PAYROLL_WEBHOOK_URL=https://your-payroll-system.com/webhook
```

---

## 🧪 Testing the Integration

### Test Scenario 1: Google Calendar

1. **Connect Calendar**
   - Login as: employee1@test.com
   - Go to Integration Settings
   - Click "Connect Google Calendar"
   - Authorize with your Google account

2. **Apply for Leave**
   - Go to "Apply Leave"
   - Select: Paid Leave
   - Dates: Tomorrow to 3 days from now
   - Reason: "Vacation"
   - Submit

3. **Approve Leave**
   - Logout
   - Login as: admin@test.com / admin123
   - Go to "Pending Leaves"
   - Approve the leave

4. **Check Calendar**
   - Open Google Calendar
   - You should see the leave event!
   - Event details include leave type, duration, reason

5. **Verify in System**
   - Login back as employee1@test.com
   - Go to "My Leaves"
   - You should see: "✓ Synced to Google Calendar"

### Test Scenario 2: Outlook Calendar

Same steps as above, but:
- Click "Connect Outlook Calendar"
- Authorize with your Microsoft account
- Check Outlook Calendar after approval
- Event will show as "Out of Office"

### Test Scenario 3: iCal Export (No Setup Required)

1. Login as any user
2. Go to "My Leaves"
3. Find an approved leave
4. Click "Download iCal"
5. Import .ics file to any calendar app

---

## 🔍 Verification Checklist

After setup, verify:

- [ ] Integration Settings page shows "✓ Available" for Google Calendar
- [ ] Integration Settings page shows "✓ Available" for Outlook Calendar
- [ ] Can click "Connect Google Calendar" without errors
- [ ] Can click "Connect Outlook Calendar" without errors
- [ ] OAuth popup opens successfully
- [ ] After authorization, see success message
- [ ] Approved leaves show sync badge in My Leaves
- [ ] Calendar events appear in Google/Outlook Calendar
- [ ] Events include correct dates and details
- [ ] Can download iCal files

---

## 🐛 Common Issues & Solutions

### Issue: "Integration not configured"

**Solution**: 
- Check .env file has correct credentials
- Restart server after updating .env
- Verify no typos in client IDs/secrets

### Issue: "Popup blocked"

**Solution**:
- Allow popups for localhost:3000
- Try different browser
- Check browser console for errors

### Issue: "Redirect URI mismatch"

**Solution**:
- Google: Check redirect URI is exactly `http://localhost:5000/api/integrations/google/callback`
- Outlook: Check redirect URI is exactly `http://localhost:5000/api/integrations/outlook/callback`
- No trailing slashes
- Use http (not https) for localhost

### Issue: "Access denied" or "Consent required"

**Solution**:
- Google: Add your email as test user in OAuth consent screen
- Outlook: Grant API permissions in Azure Portal
- Make sure you're using the correct account

### Issue: "Calendar not syncing"

**Solution**:
- Make sure leave is approved (not pending)
- Check server logs for errors
- Reconnect calendar in Integration Settings
- Verify tokens are stored in database

### Issue: "Token expired"

**Solution**:
- Reconnect calendar from Integration Settings
- System should auto-refresh tokens
- Check refresh token is stored

---

## 📊 How It Works

### Auto-Sync Flow

```
1. Employee applies for leave
   ↓
2. Manager approves
   ↓
3. Admin approves
   ↓
4. System checks if calendar connected
   ↓
5. If Google Calendar enabled:
   - Creates event in Google Calendar
   - Stores event ID in database
   - Shows "Synced to Google Calendar" badge
   ↓
6. If Outlook Calendar enabled:
   - Creates event in Outlook Calendar
   - Stores event ID in database
   - Shows "Synced to Outlook Calendar" badge
   ↓
7. Employee receives email notification
   ↓
8. Calendar event appears automatically
```

### Calendar Event Details

**Google Calendar Event:**
- Title: 🏖️ [Leave Type]
- Description: Leave details, duration, reason
- All-day event
- Color: Red
- Visibility: Private
- Reminders: 1 day before, 1 hour before

**Outlook Calendar Event:**
- Title: 🏖️ [Leave Type]
- Description: HTML formatted leave details
- All-day event
- Show as: Out of Office
- Visibility: Private
- Categories: Leave, Out of Office

---

## 🎯 Best Practices

1. **For Employees**:
   - Connect your preferred calendar (Google or Outlook)
   - Check calendar after leave approval
   - Use iCal export as backup

2. **For Managers**:
   - Encourage team to connect calendars
   - Verify calendar sync is working
   - Use Team Calendar to see all leaves

3. **For Admins**:
   - Set up both Google and Outlook integrations
   - Test with multiple accounts
   - Monitor integration status regularly
   - Keep credentials secure

---

## 🔐 Security & Privacy

- **Tokens**: Stored encrypted in MongoDB
- **Access**: Only user can access their own calendar
- **Events**: Marked as private
- **Permissions**: Minimal required permissions only
- **Revoke**: Users can disconnect anytime
- **Data**: No sensitive information in calendar events

---

## 📱 What Users See

### Before Connection
- Integration Settings: "Connect Google Calendar" button
- Status: "Not Connected"

### After Connection
- Integration Settings: "✓ Connected" badge
- My Leaves: "✓ Synced to Google Calendar" badge
- Calendar: Leave events appear automatically

### In Calendar App
- Event title: "🏖️ Paid Leave"
- Dates: Leave start to end date
- Description: Leave type, duration, reason, status
- All-day event
- Private visibility

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Integration Settings shows "Available" status
2. ✅ Can connect calendar without errors
3. ✅ Approved leaves show sync badge
4. ✅ Calendar events appear automatically
5. ✅ Events have correct dates and details
6. ✅ No errors in browser console
7. ✅ No errors in server logs

---

## 📞 Need Help?

**Documentation Files:**
- `SETUP_GOOGLE_CALENDAR.md` - Detailed Google setup
- `SETUP_OUTLOOK_CALENDAR.md` - Detailed Outlook setup
- `INTEGRATION_FEATURES.md` - All integration features
- `QUICK_START_INTEGRATIONS.md` - Quick start guide

**Test Scripts:**
```bash
node backend/testIntegrations.js
```

**Check Server Logs:**
- Look for "Leave synced to Google Calendar"
- Look for "Leave synced to Outlook Calendar"
- Check for any error messages

**External Resources:**
- Google Cloud Console: https://console.cloud.google.com/
- Azure Portal: https://portal.azure.com/
- Google Calendar API: https://developers.google.com/calendar
- Microsoft Graph API: https://docs.microsoft.com/en-us/graph/

---

## ✨ Summary

**Setup Time**: 15-20 minutes per calendar
**Difficulty**: Medium
**Result**: Automatic calendar sync for all approved leaves

**What You Get:**
- ✅ Auto-sync to Google Calendar
- ✅ Auto-sync to Outlook Calendar
- ✅ iCal export (no setup needed)
- ✅ Private calendar events
- ✅ Out-of-office indicators
- ✅ Email reminders
- ✅ Real-time updates

**Once configured, everything works automatically!** 🚀
