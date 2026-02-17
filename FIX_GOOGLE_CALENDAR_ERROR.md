# Fix "Access blocked: This app's request is invalid" Error

## 🔴 Problem
Google Calendar OAuth is showing: "Access blocked: This app's request is invalid"

## ✅ Solution

### Step 1: Check Your Google Cloud Console Settings

1. Go to: https://console.cloud.google.com/
2. Select your project (or the project where you created the OAuth credentials)
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Click on it to edit

### Step 2: Verify Authorized Redirect URIs

Make sure you have EXACTLY this redirect URI added:

```
http://localhost:5000/api/integrations/google/callback
```

**Important Notes:**
- ✅ Use `http://` (not `https://`)
- ✅ Use `localhost` (not `127.0.0.1`)
- ✅ Port must be `5000`
- ✅ Path must be `/api/integrations/google/callback`
- ✅ No trailing slash
- ✅ Case-sensitive

### Step 3: Add Authorized JavaScript Origins

Also add this to "Authorized JavaScript origins":

```
http://localhost:5000
http://localhost:3000
```

### Step 4: Enable Google Calendar API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Calendar API"
3. Click on it
4. Click **Enable** (if not already enabled)

### Step 5: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for testing)
3. Fill in required fields:
   - App name: "Leave Management System"
   - User support email: Your email
   - Developer contact: Your email
4. Click **Save and Continue**
5. Add scopes:
   - Click **Add or Remove Scopes**
   - Search for "Google Calendar API"
   - Select: `https://www.googleapis.com/auth/calendar`
   - Click **Update**
   - Click **Save and Continue**
6. Add test users:
   - Click **Add Users**
   - Add your Gmail address
   - Click **Save and Continue**
7. Click **Back to Dashboard**

### Step 6: Verify Your .env File

Make sure your `.env` file has these exact values:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
```

### Step 7: Restart the Application

After making changes in Google Cloud Console:

1. Stop the server (Ctrl+C in terminal)
2. Wait 1-2 minutes for Google to propagate changes
3. Start again: `npm run dev`

### Step 8: Test Again

1. Go to: http://localhost:3000/integrations
2. Click "Connect Google Calendar"
3. You should now see the Google sign-in page

---

## 🔍 Common Issues and Fixes

### Issue 1: "redirect_uri_mismatch"
**Fix**: Make sure the redirect URI in Google Console EXACTLY matches:
```
http://localhost:5000/api/integrations/google/callback
```

### Issue 2: "invalid_client"
**Fix**: 
- Check Client ID and Client Secret are correct
- No extra spaces in .env file
- Restart server after changing .env

### Issue 3: "access_denied"
**Fix**:
- Add your email as a test user in OAuth consent screen
- Make sure Google Calendar API is enabled

### Issue 4: "This app isn't verified"
**Fix**: This is normal for testing. Click "Advanced" → "Go to Leave Management System (unsafe)"

---

## 📋 Quick Checklist

- [ ] OAuth 2.0 Client ID created in Google Cloud Console
- [ ] Redirect URI added: `http://localhost:5000/api/integrations/google/callback`
- [ ] JavaScript origins added: `http://localhost:5000` and `http://localhost:3000`
- [ ] Google Calendar API enabled
- [ ] OAuth consent screen configured
- [ ] Test user (your email) added
- [ ] Scope added: `https://www.googleapis.com/auth/calendar`
- [ ] .env file updated with correct credentials
- [ ] Server restarted
- [ ] Waited 1-2 minutes after Google Console changes

---

## 🎯 Step-by-Step Visual Guide

### 1. Google Cloud Console - Credentials Page
```
APIs & Services → Credentials → OAuth 2.0 Client IDs → [Your Client ID]
```

### 2. Authorized Redirect URIs Section
```
Authorized redirect URIs
+ ADD URI

http://localhost:5000/api/integrations/google/callback

[Save]
```

### 3. Authorized JavaScript Origins Section
```
Authorized JavaScript origins
+ ADD URI

http://localhost:5000
http://localhost:3000

[Save]
```

### 4. OAuth Consent Screen
```
APIs & Services → OAuth consent screen

Publishing status: Testing
User type: External

Test users:
+ ADD USERS
[your-email@gmail.com]

Scopes:
https://www.googleapis.com/auth/calendar
```

---

## 🧪 Test the Fix

After completing all steps, test with this command:

```bash
# This should show "enabled": true, "configured": true
node backend/testIntegrations.js
```

Then test in browser:
1. Go to http://localhost:3000/integrations
2. Click "Connect Google Calendar"
3. Should see Google sign-in page (not error)

---

## 💡 Alternative: Create New OAuth Credentials

If the issue persists, create fresh credentials:

1. Go to Google Cloud Console → Credentials
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: "Leave Management System"
5. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5000`
6. Authorized redirect URIs:
   - `http://localhost:5000/api/integrations/google/callback`
7. Click **CREATE**
8. Copy the new Client ID and Client Secret
9. Update .env file
10. Restart server

---

## 📞 Still Having Issues?

If you're still seeing the error:

1. **Clear browser cache and cookies**
2. **Try incognito/private browsing mode**
3. **Wait 5-10 minutes** after making changes in Google Console
4. **Check browser console** for detailed error messages
5. **Verify the exact error message** - it might give more clues

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No "Access blocked" error
- ✅ See Google sign-in page
- ✅ Can select your Google account
- ✅ See permission request for calendar access
- ✅ After authorization, redirected back to your app
- ✅ See success message in Integration Settings

---

**Most Common Fix**: Just add the redirect URI in Google Cloud Console and wait 1-2 minutes!
