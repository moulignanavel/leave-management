# Google Calendar Integration Setup Guide

## Step-by-Step Instructions

### Step 1: Create Google Cloud Project

1. Go to **Google Cloud Console**: https://console.cloud.google.com/

2. Click **"Select a project"** at the top → **"New Project"**

3. Enter project details:
   - Project name: `Leave Management System`
   - Click **"Create"**

4. Wait for project creation (takes a few seconds)

### Step 2: Enable Google Calendar API

1. In the Google Cloud Console, make sure your new project is selected

2. Go to **"APIs & Services"** → **"Library"**
   - Or use this direct link: https://console.cloud.google.com/apis/library

3. Search for **"Google Calendar API"**

4. Click on **"Google Calendar API"**

5. Click **"Enable"** button

6. Wait for API to be enabled

### Step 3: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
   - Or use this link: https://console.cloud.google.com/apis/credentials/consent

2. Select **"External"** user type → Click **"Create"**

3. Fill in the required fields:
   - App name: `Leave Management System`
   - User support email: Your email address
   - Developer contact email: Your email address
   - Click **"Save and Continue"**

4. **Scopes** page:
   - Click **"Add or Remove Scopes"**
   - Search for: `calendar`
   - Select: `https://www.googleapis.com/auth/calendar`
   - Click **"Update"** → **"Save and Continue"**

5. **Test users** page:
   - Click **"Add Users"**
   - Add your Gmail address (the one you'll use for testing)
   - Click **"Add"** → **"Save and Continue"**

6. Click **"Back to Dashboard"**

### Step 4: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
   - Or use this link: https://console.cloud.google.com/apis/credentials

2. Click **"Create Credentials"** → **"OAuth client ID"**

3. If prompted to configure consent screen, follow Step 3 above first

4. Select application type:
   - Application type: **"Web application"**
   - Name: `Leave Management System Web Client`

5. Add **Authorized redirect URIs**:
   - Click **"Add URI"**
   - Enter: `http://localhost:5000/api/integrations/google/callback`
   - Click **"Add URI"** again
   - Enter: `http://localhost:3000` (for frontend)

6. Click **"Create"**

7. **IMPORTANT**: Copy your credentials:
   - **Client ID**: Looks like `xxxxx.apps.googleusercontent.com`
   - **Client Secret**: Random string
   - Keep this window open or download the JSON

### Step 5: Update .env File

1. Open your `.env` file in the project root

2. Add these lines (replace with your actual credentials):

```env
# Google Calendar Integration
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
```

3. Save the file

### Step 6: Restart the Server

1. Stop the current server (Ctrl+C in terminal)

2. Start again:
```bash
npm run dev
```

### Step 7: Test the Integration

1. Open browser: http://localhost:3000

2. Login with: `employee1@test.com` / `employee123`

3. Go to **Integration Settings** page

4. Click **"Connect Google Calendar"** button

5. A popup will open asking you to:
   - Choose your Google account
   - Review permissions
   - Click **"Allow"**

6. You should see: "Google Calendar connected successfully"

7. Now apply for a leave and get it approved

8. Check your Google Calendar - the leave should appear automatically!

---

## Troubleshooting

### Error: "Access blocked: This app's request is invalid"
- Make sure you added your email as a test user in OAuth consent screen
- Make sure the redirect URI matches exactly: `http://localhost:5000/api/integrations/google/callback`

### Error: "redirect_uri_mismatch"
- Check that redirect URI in Google Console matches exactly
- No trailing slashes
- Use http (not https) for localhost

### Popup blocked
- Allow popups for localhost:3000 in your browser
- Try a different browser

### Calendar not syncing
- Make sure leave is approved (not just pending)
- Check browser console for errors
- Check server logs for errors

---

## What Happens After Setup

1. **When you connect**: Your Google Calendar access token is stored securely in the database

2. **When leave is approved**: 
   - System automatically creates a calendar event
   - Event includes leave type, dates, duration, reason
   - Event is marked as private
   - Reminders are set (1 day before, 1 hour before)

3. **In My Leaves page**:
   - You'll see a badge: "✓ Synced to Google Calendar"
   - You can still download iCal files manually

---

## Security Notes

- Tokens are stored encrypted in MongoDB
- Only you can access your calendar
- Events are marked as private
- You can disconnect anytime from Integration Settings

---

## Example Credentials Format

```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
```

---

## Need Help?

- Google Cloud Console: https://console.cloud.google.com/
- Google Calendar API Docs: https://developers.google.com/calendar
- OAuth 2.0 Guide: https://developers.google.com/identity/protocols/oauth2

---

**Once setup is complete, calendar sync will work automatically for all approved leaves!** 🎉
