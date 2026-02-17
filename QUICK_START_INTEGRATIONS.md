# Quick Start Guide - Integration Features

## 🚀 Get Started in 5 Minutes

### Step 1: Start the Application
```bash
npm run dev
```
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Step 2: Login
```
Admin: admin@test.com / admin123
Manager: manager@test.com / manager123
Employee: employee1@test.com / employee123
```

### Step 3: Access Integration Settings
1. Login to the system
2. Click on **Integrations** from dashboard
3. Or navigate to: http://localhost:3000/integrations

---

## 📅 iCal Export (No Setup Required)

### How to Use
1. Login as any user
2. Go to **My Leaves**
3. Find an approved leave
4. Click **Download iCal** button
5. Import the .ics file to your calendar app

### Supported Calendar Apps
- Apple Calendar
- Google Calendar
- Outlook
- Any calendar app that supports .ics files

---

## 💰 Payroll Export (Admin/Manager Only)

### How to Use
1. Login as admin or manager
2. Go to **Integration Settings**
3. Click **Export Payroll Data**
4. Enter date range:
   - Start Date: 2024-01-01
   - End Date: 2024-12-31
5. Select format:
   - generic (recommended for testing)
   - adp
   - gusto
   - quickbooks
   - sap
6. Download JSON file
7. Import to your payroll system

### What You Get
```json
{
  "period": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  },
  "totalEmployees": 5,
  "totalLeaveDays": 25,
  "totalUnpaidDays": 3,
  "employees": [
    {
      "employeeId": "...",
      "employeeName": "John Doe",
      "employeeEmail": "john@test.com",
      "department": "Engineering",
      "totalDays": 5,
      "paidDays": 5,
      "unpaidDays": 0,
      "leaves": [...]
    }
  ]
}
```

---

## 📆 Google Calendar Integration (Optional)

### Setup (One-time)

1. **Get Google Calendar API Credentials**
   - Go to: https://console.cloud.google.com/
   - Create new project: "Leave Management System"
   - Enable "Google Calendar API"
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:5000/api/integrations/google/callback`
   - Copy Client ID and Client Secret

2. **Update .env File**
   ```env
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
   ```

3. **Restart Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Connect Your Calendar

1. Login to the system
2. Go to **Integration Settings**
3. Click **Connect Google Calendar**
4. Authorize in popup window
5. Done! ✅

### What Happens Next
- When your leave is approved, it automatically syncs to Google Calendar
- You'll see a badge: "✓ Synced to Google Calendar"
- Calendar event includes:
  - Leave type
  - Duration
  - Reason
  - Status
  - Reminders (1 day before, 1 hour before)

---

## 📧 Outlook Calendar Integration (Optional)

### Setup (One-time)

1. **Get Outlook Calendar API Credentials**
   - Go to: https://portal.azure.com/
   - Register new application: "Leave Management System"
   - Add platform: Web
   - Add redirect URI: `http://localhost:5000/api/integrations/outlook/callback`
   - Add API permissions: Calendars.ReadWrite
   - Create client secret
   - Copy Application (client) ID and Client Secret

2. **Update .env File**
   ```env
   OUTLOOK_CLIENT_ID=your-application-id
   OUTLOOK_CLIENT_SECRET=your-client-secret
   OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback
   ```

3. **Restart Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Connect Your Calendar

1. Login to the system
2. Go to **Integration Settings**
3. Click **Connect Outlook Calendar**
4. Authorize in popup window
5. Done! ✅

### What Happens Next
- When your leave is approved, it automatically syncs to Outlook Calendar
- You'll see a badge: "✓ Synced to Outlook Calendar"
- Calendar event includes:
  - Leave type
  - Duration
  - Reason
  - Status
  - Out-of-office indicator

---

## 🧪 Test the Features

### Test Payroll Export
```bash
node backend/testIntegrations.js
```

Expected output:
```
✅ Integration Status API - Working
✅ Payroll Data Export - Working
✅ Multiple Payroll Formats - Working
✅ iCal Export - Working
```

### Test iCal Download
1. Login as employee1@test.com
2. Apply for leave (any type, any dates)
3. Login as admin@test.com
4. Approve the leave
5. Login back as employee1@test.com
6. Go to My Leaves
7. Click "Download iCal" on approved leave
8. Import to your calendar app

### Test Calendar Auto-Sync
1. Set up Google or Outlook credentials (see above)
2. Connect your calendar in Integration Settings
3. Apply for leave
4. Get it approved
5. Check your calendar - event should appear automatically!

---

## 📊 Integration Status

Check what's enabled:
```bash
curl http://localhost:5000/api/integrations/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response:
```json
{
  "payroll": {
    "enabled": true,
    "supportedFormats": ["generic", "adp", "gusto", "quickbooks", "sap"]
  },
  "googleCalendar": {
    "enabled": true,
    "configured": true
  },
  "outlookCalendar": {
    "enabled": true,
    "configured": true
  },
  "icalExport": {
    "enabled": true
  }
}
```

---

## 🎯 Quick Tips

### For Employees
- Use iCal export if you don't want to connect your calendar
- Download iCal files for approved leaves
- Import to any calendar app

### For Managers
- Export payroll data monthly for processing
- Use generic format for testing
- Use specific formats (ADP, Gusto, etc.) for production

### For Admins
- Set up calendar integrations for all users
- Configure payroll webhook for automatic sync
- Monitor integration status regularly

---

## 🔧 Troubleshooting

### iCal Download Not Working
- Make sure leave is approved
- Check browser console for errors
- Try different browser

### Payroll Export Shows 0 Employees
- Make sure there are approved leaves in the date range
- Try wider date range (e.g., full year)

### Calendar Not Syncing
- Check if credentials are set in .env
- Restart server after updating .env
- Reconnect calendar in Integration Settings
- Check browser console for errors

### OAuth Popup Blocked
- Allow popups for localhost:3000
- Try different browser
- Check if redirect URI matches exactly

---

## 📞 Need Help?

1. Check **INTEGRATION_FEATURES.md** for detailed guide
2. Check **COMPLETE_SYSTEM_SUMMARY.md** for full documentation
3. Run test script: `node backend/testIntegrations.js`
4. Check server logs for errors
5. Verify .env configuration

---

## ✅ Checklist

- [ ] Application running (npm run dev)
- [ ] Can login with test credentials
- [ ] Can access Integration Settings page
- [ ] Can download iCal files
- [ ] Can export payroll data
- [ ] (Optional) Google Calendar connected
- [ ] (Optional) Outlook Calendar connected
- [ ] (Optional) Auto-sync working

---

**That's it! You're ready to use all integration features! 🎉**

For detailed documentation, see:
- INTEGRATION_FEATURES.md
- COMPLETE_SYSTEM_SUMMARY.md
