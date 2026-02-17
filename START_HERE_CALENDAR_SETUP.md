# 🚀 START HERE - Calendar Integration Setup

## Welcome! 👋

This guide will help you set up Google and Outlook Calendar integration in just 30 minutes.

---

## 🎯 What You'll Get

After setup:
- ✅ Approved leaves automatically sync to Google Calendar
- ✅ Approved leaves automatically sync to Outlook Calendar
- ✅ Download iCal files for any calendar app
- ✅ Private calendar events with reminders
- ✅ Out-of-office indicators
- ✅ Real-time updates

---

## 📋 Before You Start

Make sure you have:
- ✅ Application running (`npm run dev`)
- ✅ Google account (Gmail)
- ✅ Microsoft account (Outlook/Hotmail)
- ✅ 30 minutes of time
- ✅ Access to `.env` file

---

## 🔵 OPTION 1: Google Calendar (Choose this if you use Gmail)

### Step 1: Open Google Cloud Console

**Click here**: https://console.cloud.google.com/

### Step 2: Create Project (2 minutes)

1. Click "Select a project" (top bar)
2. Click "NEW PROJECT"
3. Project name: `Leave Management System`
4. Click "CREATE"
5. Wait 10 seconds

### Step 3: Enable Calendar API (1 minute)

**Click here**: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com

1. Make sure your project is selected (top bar)
2. Click "ENABLE"
3. Wait 5 seconds

### Step 4: Setup OAuth (5 minutes)

**Click here**: https://console.cloud.google.com/apis/credentials/consent

1. Select "External"
2. Click "CREATE"
3. Fill in:
   - App name: `Leave Management System`
   - User support email: Your email
   - Developer email: Your email
4. Click "SAVE AND CONTINUE"
5. Click "ADD OR REMOVE SCOPES"
6. Search: `calendar`
7. Check: `https://www.googleapis.com/auth/calendar`
8. Click "UPDATE"
9. Click "SAVE AND CONTINUE"
10. Click "ADD USERS"
11. Enter your Gmail address
12. Click "ADD"
13. Click "SAVE AND CONTINUE"
14. Click "BACK TO DASHBOARD"

### Step 5: Create Credentials (3 minutes)

**Click here**: https://console.cloud.google.com/apis/credentials

1. Click "CREATE CREDENTIALS"
2. Select "OAuth client ID"
3. Application type: "Web application"
4. Name: `Leave Management System`
5. Under "Authorized redirect URIs":
   - Click "ADD URI"
   - Paste: `http://localhost:5000/api/integrations/google/callback`
6. Click "CREATE"
7. **IMPORTANT**: A popup appears with your credentials
   - Copy "Client ID" (ends with .apps.googleusercontent.com)
   - Copy "Client secret"
   - Keep this window open!

### Step 6: Update .env File (2 minutes)

1. Open your project folder
2. Open `.env` file
3. Add these lines at the end:

```env
# Google Calendar Integration
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
```

4. Replace `paste-your-client-id-here` with your actual Client ID
5. Replace `paste-your-client-secret-here` with your actual Client Secret
6. Save the file

### Step 7: Restart Server (1 minute)

In your terminal:
1. Press `Ctrl+C` to stop the server
2. Run: `npm run dev`
3. Wait for "Server running on port 5000"

### Step 8: Test It! (2 minutes)

1. Open: http://localhost:3000
2. Login: `employee1@test.com` / `employee123`
3. Click "Integrations" from dashboard
4. You should see "✓ Available" for Google Calendar
5. Click "Connect Google Calendar"
6. A popup opens - sign in with your Google account
7. Click "Allow"
8. Success! You should see "Google Calendar connected successfully"

### Step 9: Test Auto-Sync (5 minutes)

1. Go to "Apply Leave"
2. Select any leave type
3. Choose tomorrow to 3 days later
4. Enter reason: "Testing"
5. Click "Submit"
6. Logout
7. Login as: `admin@test.com` / `admin123`
8. Go to "Pending Leaves"
9. Click "Approve" on the leave
10. Logout
11. Login back as: `employee1@test.com` / `employee123`
12. Go to "My Leaves"
13. You should see "✓ Synced to Google Calendar"
14. Open your Google Calendar
15. You should see the leave event! 🎉

**Google Calendar Setup Complete!** ✅

---

## 🔷 OPTION 2: Outlook Calendar (Choose this if you use Outlook/Office 365)

### Step 1: Open Azure Portal

**Click here**: https://portal.azure.com/

Sign in with your Microsoft account

### Step 2: Register App (3 minutes)

1. In search bar (top), type: `App registrations`
2. Click "App registrations" from results
3. Click "+ New registration"
4. Fill in:
   - Name: `Leave Management System`
   - Supported account types: Select "Accounts in any organizational directory and personal Microsoft accounts"
   - Redirect URI: 
     - Platform: Web
     - URI: `http://localhost:5000/api/integrations/outlook/callback`
5. Click "Register"
6. **Copy "Application (client) ID"** from overview page

### Step 3: Create Secret (2 minutes)

1. In left menu, click "Certificates & secrets"
2. Click "+ New client secret"
3. Description: `Leave Management System Secret`
4. Expires: 24 months
5. Click "Add"
6. **IMPORTANT**: Copy the "Value" immediately (shown only once!)

### Step 4: Add Permissions (2 minutes)

1. In left menu, click "API permissions"
2. Click "+ Add a permission"
3. Click "Microsoft Graph"
4. Click "Delegated permissions"
5. Search: `Calendars.ReadWrite`
6. Check the box
7. Search: `offline_access`
8. Check the box
9. Click "Add permissions"

### Step 5: Configure Authentication (1 minute)

1. In left menu, click "Authentication"
2. Under "Platform configurations", click "Add a platform"
3. Click "Web"
4. Add redirect URI: `http://localhost:3000`
5. Under "Implicit grant and hybrid flows":
   - Check "Access tokens"
   - Check "ID tokens"
6. Click "Configure"
7. Click "Save" at bottom

### Step 6: Update .env File (2 minutes)

1. Open your project folder
2. Open `.env` file
3. Add these lines at the end:

```env
# Outlook Calendar Integration
OUTLOOK_CLIENT_ID=paste-your-application-id-here
OUTLOOK_CLIENT_SECRET=paste-your-client-secret-here
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback
```

4. Replace `paste-your-application-id-here` with your Application (client) ID
5. Replace `paste-your-client-secret-here` with your Client Secret value
6. Save the file

### Step 7: Restart Server (1 minute)

In your terminal:
1. Press `Ctrl+C` to stop the server
2. Run: `npm run dev`
3. Wait for "Server running on port 5000"

### Step 8: Test It! (2 minutes)

1. Open: http://localhost:3000
2. Login: `employee2@test.com` / `employee123`
3. Click "Integrations" from dashboard
4. You should see "✓ Available" for Outlook Calendar
5. Click "Connect Outlook Calendar"
6. A popup opens - sign in with your Microsoft account
7. Click "Accept"
8. Success! You should see "Outlook Calendar connected successfully"

### Step 9: Test Auto-Sync (5 minutes)

1. Go to "Apply Leave"
2. Select any leave type
3. Choose tomorrow to 3 days later
4. Enter reason: "Testing"
5. Click "Submit"
6. Logout
7. Login as: `admin@test.com` / `admin123`
8. Go to "Pending Leaves"
9. Click "Approve" on the leave
10. Logout
11. Login back as: `employee2@test.com` / `employee123`
12. Go to "My Leaves"
13. You should see "✓ Synced to Outlook Calendar"
14. Open your Outlook Calendar
15. You should see the leave event with "Out of Office" status! 🎉

**Outlook Calendar Setup Complete!** ✅

---

## 🎨 OPTION 3: iCal Export (No Setup Required!)

This works immediately without any configuration:

1. Login to the system
2. Go to "My Leaves"
3. Find any approved leave
4. Click "Download iCal" button
5. Import the .ics file to:
   - Apple Calendar
   - Google Calendar
   - Outlook
   - Any calendar app

**That's it!** ✅

---

## 🎯 Quick Links

### Google Calendar Setup
- **Google Cloud Console**: https://console.cloud.google.com/
- **Enable Calendar API**: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
- **OAuth Consent**: https://console.cloud.google.com/apis/credentials/consent
- **Create Credentials**: https://console.cloud.google.com/apis/credentials

### Outlook Calendar Setup
- **Azure Portal**: https://portal.azure.com/
- **App Registrations**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade

### Your Application
- **Frontend**: http://localhost:3000
- **Integration Settings**: http://localhost:3000/integrations
- **Login Page**: http://localhost:3000/login

---

## 🐛 Common Issues

### "Integration not configured"
- Check .env file has the credentials
- Restart server after updating .env

### "Popup blocked"
- Allow popups for localhost:3000 in browser settings

### "Redirect URI mismatch"
- Make sure redirect URI is exactly: `http://localhost:5000/api/integrations/google/callback` (for Google)
- Make sure redirect URI is exactly: `http://localhost:5000/api/integrations/outlook/callback` (for Outlook)
- No trailing slashes!

### "Access denied"
- Google: Add your email as test user in OAuth consent screen
- Outlook: Make sure API permissions are added

### "Calendar not syncing"
- Make sure leave is approved (not just pending)
- Check server logs for errors
- Reconnect calendar from Integration Settings

---

## ✅ Success Checklist

You're done when you can:

- [ ] See "✓ Available" in Integration Settings
- [ ] Click connect button without errors
- [ ] Authorize in popup successfully
- [ ] See success message after authorization
- [ ] Apply for leave
- [ ] Get leave approved
- [ ] See "✓ Synced to [Calendar]" badge in My Leaves
- [ ] See event in your calendar app
- [ ] Event has correct dates and details

---

## 📚 Need More Help?

**Detailed Guides:**
- `CALENDAR_INTEGRATION_COMPLETE_GUIDE.md` - Complete guide with all details
- `SETUP_GOOGLE_CALENDAR.md` - Google Calendar only
- `SETUP_OUTLOOK_CALENDAR.md` - Outlook Calendar only
- `CALENDAR_SETUP_CHECKLIST.md` - Step-by-step checklist

**Test Scripts:**
```bash
node backend/testIntegrations.js
```

**Check Status:**
- Open Integration Settings page
- Check server logs
- Check browser console

---

## 🎉 You're All Set!

Once setup is complete:
- Approved leaves automatically sync to your calendar
- No manual work needed
- Events update automatically
- Private and secure

**Enjoy your automated calendar sync!** 🚀

---

## 💡 Pro Tips

1. **Set up both calendars** - Users can choose their preference
2. **Test with different accounts** - Make sure it works for everyone
3. **Use iCal as backup** - Always available without setup
4. **Check Integration Settings regularly** - Monitor connection status
5. **Reconnect if needed** - Tokens may expire after some time

---

## 📞 Support

If you get stuck:
1. Check the detailed guides listed above
2. Run the test script
3. Check server logs
4. Verify .env configuration
5. Try different browser

---

**Ready to start? Pick Google or Outlook above and follow the steps!** 🎯

**Estimated Time**: 15-20 minutes per calendar

**Difficulty**: Easy to Medium

**Result**: Automatic calendar sync! ✨
