# No "Advanced" Option? Add Yourself as Test User

## 🎯 The Problem
You're seeing "Access blocked" but there's NO "Advanced" link to click.

## ✅ Solution: Add Yourself as Test User

### Step 1: Go to OAuth Consent Screen
👉 https://console.cloud.google.com/apis/credentials/consent

### Step 2: Scroll Down to "Test Users"
Look for a section called **"Test users"**

### Step 3: Click "+ ADD USERS"
```
┌─────────────────────────────────────────┐
│  Test users                             │
│                                         │
│  + ADD USERS  ← CLICK THIS              │
│                                         │
└─────────────────────────────────────────┘
```

### Step 4: Enter Your Gmail Address
```
┌─────────────────────────────────────────┐
│  Add test users                         │
│                                         │
│  Email address                          │
│  ┌───────────────────────────────────┐  │
│  │ your-email@gmail.com              │  │
│  └───────────────────────────────────┘  │
│                                         │
│                    [CANCEL]  [ADD]      │
└─────────────────────────────────────────┘
```

Type your Gmail address and click **ADD**

### Step 5: Click "SAVE" at Bottom
Scroll to the bottom of the page and click **SAVE**

### Step 6: Try Connecting Again
1. Go back to: http://localhost:3000/integrations
2. Click "Connect Google Calendar"
3. Now you should see the normal permission screen (no warning!)

---

## 📸 Visual Guide

### Where to Find OAuth Consent Screen

```
Google Cloud Console
│
└── APIs & Services
    │
    └── OAuth consent screen  ← CLICK HERE
        │
        ├── App information
        │   └── App name: Leave Management System
        │
        ├── Scopes
        │   └── .../auth/calendar
        │
        └── Test users  ← SCROLL TO HERE
            │
            └── + ADD USERS  ← CLICK THIS
                │
                └── Enter: your-email@gmail.com
                
[SAVE] ← CLICK AT BOTTOM
```

---

## 🎯 Complete OAuth Consent Screen Setup

If you haven't set this up yet, here's the complete process:

### 1. Go to OAuth Consent Screen
👉 https://console.cloud.google.com/apis/credentials/consent

### 2. Choose User Type
- Select: **External**
- Click: **CREATE**

### 3. Fill App Information
```
App name: Leave Management System
User support email: your-email@gmail.com
Developer contact: your-email@gmail.com
```
Click: **SAVE AND CONTINUE**

### 4. Add Scopes
- Click: **ADD OR REMOVE SCOPES**
- Search: "Google Calendar API"
- Check: `https://www.googleapis.com/auth/calendar`
- Click: **UPDATE**
- Click: **SAVE AND CONTINUE**

### 5. Add Test Users (IMPORTANT!)
- Click: **+ ADD USERS**
- Enter: **your-email@gmail.com** (the Gmail you'll use to test)
- Click: **ADD**
- Click: **SAVE AND CONTINUE**

### 6. Review and Confirm
- Click: **BACK TO DASHBOARD**

---

## ✅ After Adding Test User

Now when you try to connect Google Calendar:

### Before (Access Blocked):
```
❌ Access blocked: Leave Management System has not 
   completed the Google verification process
   
   [Back to safety]
```

### After (Normal Permission Screen):
```
✅ Leave Management System wants to access your 
   Google Account
   
   ☑ See, edit, share, and permanently delete all 
     the calendars you can access using Google Calendar
   
   [Cancel]  [Allow]
```

Just click **"Allow"** and you're done!

---

## 🔍 Why This Happens

Google has two modes for OAuth apps:

### 1. Without Test Users (What you're seeing now):
- Shows "Access blocked" message
- No "Advanced" option
- Cannot proceed

### 2. With Test Users (What you need):
- Shows normal permission screen
- Can click "Allow"
- Works immediately

**Solution: Add yourself as a test user!**

---

## 📋 Quick Checklist

Complete these in Google Cloud Console:

- [ ] Go to OAuth consent screen
- [ ] User type: External
- [ ] App name: Leave Management System
- [ ] User support email: your-email@gmail.com
- [ ] Scopes: `https://www.googleapis.com/auth/calendar`
- [ ] **Test users: your-email@gmail.com** ← MOST IMPORTANT
- [ ] Click SAVE
- [ ] Try connecting again

---

## 🎯 Step-by-Step with Screenshots

### Screen 1: OAuth Consent Screen
```
┌──────────────────────────────────────────────┐
│  OAuth consent screen                        │
├──────────────────────────────────────────────┤
│                                              │
│  Publishing status: Testing                  │
│                                              │
│  [EDIT APP]                                  │
│                                              │
│  App information                             │
│  App name: Leave Management System           │
│  User support email: your-email@gmail.com    │
│                                              │
│  Scopes                                      │
│  .../auth/calendar                           │
│                                              │
│  Test users                                  │
│  + ADD USERS  ← CLICK HERE                   │
│                                              │
└──────────────────────────────────────────────┘
```

### Screen 2: Add Test Users Dialog
```
┌──────────────────────────────────────────────┐
│  Add test users                              │
├──────────────────────────────────────────────┤
│                                              │
│  Email address                               │
│  ┌──────────────────────────────────────┐   │
│  │ your-email@gmail.com                 │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  You can add up to 100 test users.          │
│                                              │
│                      [CANCEL]  [ADD]         │
└──────────────────────────────────────────────┘
```

### Screen 3: Test Users Added
```
┌──────────────────────────────────────────────┐
│  Test users                                  │
├──────────────────────────────────────────────┤
│                                              │
│  your-email@gmail.com                        │
│  [Remove]                                    │
│                                              │
│  + ADD USERS                                 │
│                                              │
└──────────────────────────────────────────────┘

[SAVE] ← CLICK THIS AT BOTTOM OF PAGE
```

---

## 🚀 After Setup

1. **Test users added**: ✅
2. **Try connecting**: Go to http://localhost:3000/integrations
3. **Click**: "Connect Google Calendar"
4. **See**: Normal permission screen (no "Access blocked")
5. **Click**: "Allow"
6. **Success**: "Google Calendar connected successfully!"

---

## 💡 Pro Tips

### Tip 1: Add Multiple Test Users
You can add up to 100 test users. Add any Gmail addresses you want to test with.

### Tip 2: Publishing Status
Keep it as "Testing" for development. Only publish when ready for production.

### Tip 3: Test User Limit
While in "Testing" mode, only test users can connect. This is perfect for development!

---

## 🆘 Still Having Issues?

### Issue: Can't find OAuth consent screen
**Solution**: 
1. Go to: https://console.cloud.google.com/
2. Select your project
3. Left menu: APIs & Services → OAuth consent screen

### Issue: "SAVE" button is grayed out
**Solution**: Fill in all required fields (App name, User support email, Developer contact)

### Issue: Added test user but still seeing "Access blocked"
**Solution**: 
1. Make sure you clicked SAVE at the bottom
2. Wait 1-2 minutes for Google to update
3. Clear browser cache
4. Try in incognito mode

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Test user added in OAuth consent screen
- ✅ No "Access blocked" message
- ✅ See normal "Allow" permission screen
- ✅ Can click "Allow" button
- ✅ Redirected back to app with success message

---

**Bottom line: Add your Gmail address as a test user in OAuth consent screen, then try again!** 🎯
