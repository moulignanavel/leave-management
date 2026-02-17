# Google Calendar Quick Fix - 5 Minutes

## 🎯 The Problem
Error: "Access blocked: This app's request is invalid"

## ⚡ Quick Fix (Most Common Solution)

### 1. Go to Google Cloud Console
👉 https://console.cloud.google.com/apis/credentials

### 2. Click on Your OAuth 2.0 Client ID
Find the one with your Client ID: `473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9`

### 3. Add This Exact Redirect URI
```
http://localhost:5000/api/integrations/google/callback
```

**Screenshot of what to do:**
```
┌─────────────────────────────────────────────────┐
│ Authorized redirect URIs                        │
├─────────────────────────────────────────────────┤
│ + ADD URI                                       │
│                                                 │
│ URI 1 *                                         │
│ ┌─────────────────────────────────────────────┐ │
│ │ http://localhost:5000/api/integrations/    │ │
│ │ google/callback                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│                                    [SAVE]       │
└─────────────────────────────────────────────────┘
```

### 4. Also Add JavaScript Origins
```
http://localhost:5000
http://localhost:3000
```

### 5. Enable Google Calendar API
👉 https://console.cloud.google.com/apis/library/calendar-json.googleapis.com

Click **ENABLE** button

### 6. Add Test User (Your Email)
👉 https://console.cloud.google.com/apis/credentials/consent

1. Click **OAuth consent screen** (left sidebar)
2. Scroll to **Test users**
3. Click **+ ADD USERS**
4. Enter your Gmail address
5. Click **SAVE**

### 7. Wait & Restart
```bash
# Wait 1-2 minutes for Google to update
# Then restart your app
npm run dev
```

### 8. Test Again
Go to: http://localhost:3000/integrations
Click: "Connect Google Calendar"

---

## ✅ What You Should See

### Before Fix:
```
❌ Access blocked: This app's request is invalid
```

### After Fix:
```
✅ Sign in with Google
   Choose an account to continue to Leave Management System
```

---

## 🔍 Verify Your Settings

### In Google Cloud Console, you should have:

**1. Credentials Page:**
- ✅ OAuth 2.0 Client ID exists
- ✅ Redirect URI: `http://localhost:5000/api/integrations/google/callback`
- ✅ JavaScript origins: `http://localhost:5000`, `http://localhost:3000`

**2. OAuth Consent Screen:**
- ✅ App name: "Leave Management System" (or any name)
- ✅ User type: External
- ✅ Publishing status: Testing
- ✅ Test users: Your Gmail address added
- ✅ Scopes: `https://www.googleapis.com/auth/calendar`

**3. APIs & Services → Library:**
- ✅ Google Calendar API: Enabled

---

## 🚨 Still Not Working?

### Try These:

1. **Clear Browser Cache**
   - Press Ctrl+Shift+Delete
   - Clear cookies and cache
   - Try again

2. **Use Incognito Mode**
   - Open incognito/private window
   - Go to http://localhost:3000/integrations
   - Try connecting

3. **Check .env File**
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback
   ```
   - No extra spaces
   - No quotes
   - Exact match

4. **Restart Everything**
   ```bash
   # Kill all node processes
   taskkill /F /IM node.exe
   
   # Start fresh
   npm run dev
   ```

5. **Wait Longer**
   - Google changes can take 5-10 minutes to propagate
   - Have a coffee ☕
   - Try again

---

## 📸 Visual Guide

### Step 1: Find Your OAuth Client
```
Google Cloud Console
└── APIs & Services
    └── Credentials
        └── OAuth 2.0 Client IDs
            └── [Click on your client ID]
```

### Step 2: Add Redirect URI
```
[Edit OAuth client]
│
├── Authorized JavaScript origins
│   ├── http://localhost:3000
│   └── http://localhost:5000
│
└── Authorized redirect URIs
    └── http://localhost:5000/api/integrations/google/callback
    
[SAVE]
```

### Step 3: Add Test User
```
OAuth consent screen
│
├── App information
│   └── App name: Leave Management System
│
├── Scopes
│   └── https://www.googleapis.com/auth/calendar
│
└── Test users
    └── + ADD USERS
        └── your-email@gmail.com
        
[SAVE]
```

---

## 🎉 Success!

When it works, you'll see:
1. Google sign-in page (no error)
2. Permission request for calendar access
3. Redirect back to your app
4. Success message: "Google Calendar connected successfully"
5. Badge in My Leaves: "✓ Synced to Google Calendar"

---

## 📞 Quick Support

**Error**: "redirect_uri_mismatch"
**Fix**: Redirect URI must be EXACTLY: `http://localhost:5000/api/integrations/google/callback`

**Error**: "invalid_client"
**Fix**: Check Client ID and Secret in .env file

**Error**: "access_denied"
**Fix**: Add your email as test user

**Error**: "This app isn't verified"
**Fix**: Click "Advanced" → "Go to Leave Management System (unsafe)" - this is normal for testing

---

**Time to fix: 5 minutes**
**Most important: Add the redirect URI and wait 1-2 minutes!**
