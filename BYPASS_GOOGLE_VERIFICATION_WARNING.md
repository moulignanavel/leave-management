# Bypass "App Not Verified" Warning - Testing Mode

## ✅ Good News!
This message means your OAuth setup is **CORRECT**! This is a normal warning for apps in testing/development mode.

---

## 🎯 The Message You're Seeing

```
Access blocked: Leave Management System has not completed the Google verification process
```

Or:

```
This app isn't verified
This app hasn't been verified by Google yet. Only proceed if you know and trust the developer.
```

---

## ⚡ How to Bypass (2 Clicks)

### Step 1: Click "Advanced"
When you see the warning screen, look for a small link that says **"Advanced"** at the bottom left.

```
┌─────────────────────────────────────────────┐
│  ⚠️  This app isn't verified                │
│                                             │
│  This app hasn't been verified by Google    │
│  yet. Only proceed if you know and trust    │
│  the developer.                             │
│                                             │
│  [Advanced] ←── CLICK HERE                  │
│                                             │
│                              [Back to safety]│
└─────────────────────────────────────────────┘
```

### Step 2: Click "Go to Leave Management System (unsafe)"
After clicking "Advanced", you'll see a new link appear:

```
┌─────────────────────────────────────────────┐
│  ⚠️  This app isn't verified                │
│                                             │
│  Advanced                                   │
│                                             │
│  Go to Leave Management System (unsafe)     │
│  ↑↑↑ CLICK HERE                             │
│                                             │
│                              [Back to safety]│
└─────────────────────────────────────────────┘
```

### Step 3: Grant Permissions
You'll now see the normal permission screen:

```
┌─────────────────────────────────────────────┐
│  Leave Management System wants to access    │
│  your Google Account                        │
│                                             │
│  This will allow Leave Management System to:│
│  ☑ See, edit, share, and permanently       │
│    delete all the calendars you can access  │
│    using Google Calendar                    │
│                                             │
│                    [Cancel]  [Allow] ←CLICK │
└─────────────────────────────────────────────┘
```

Click **"Allow"** and you're done! ✅

---

## 🔍 Why This Happens

### For Testing/Development Apps:
- Google shows this warning for all unverified apps
- Your app is in "Testing" mode (not published)
- This is **NORMAL** and **SAFE** for your own app
- You're the developer, so you can trust it!

### To Remove This Warning (Optional):
You would need to:
1. Complete Google's verification process
2. Submit your app for review
3. Wait for Google approval (can take weeks)
4. Only needed for public/production apps

**For development/testing: Just bypass the warning!**

---

## 📸 Visual Step-by-Step

### Screen 1: Warning Page
```
┌──────────────────────────────────────────────────┐
│                                                  │
│              ⚠️  Google                          │
│                                                  │
│  This app isn't verified                         │
│                                                  │
│  This app hasn't been verified by Google yet.    │
│  Only proceed if you know and trust the          │
│  developer.                                      │
│                                                  │
│  Learn about risks                               │
│                                                  │
│  Advanced  ←── 1. CLICK HERE FIRST               │
│                                                  │
│                                                  │
│                           [Back to safety]       │
└──────────────────────────────────────────────────┘
```

### Screen 2: After Clicking "Advanced"
```
┌──────────────────────────────────────────────────┐
│                                                  │
│              ⚠️  Google                          │
│                                                  │
│  This app isn't verified                         │
│                                                  │
│  Advanced                                        │
│                                                  │
│  This app hasn't been verified by Google to      │
│  access your Google Account. You should only     │
│  continue if you understand the risks and        │
│  trust the developer.                            │
│                                                  │
│  Go to Leave Management System (unsafe)          │
│  ↑↑↑ 2. CLICK HERE                               │
│                                                  │
│                           [Back to safety]       │
└──────────────────────────────────────────────────┘
```

### Screen 3: Permission Request
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Leave Management System wants to access your    │
│  Google Account                                  │
│                                                  │
│  your-email@gmail.com                            │
│                                                  │
│  This will allow Leave Management System to:     │
│                                                  │
│  ☑ See, edit, share, and permanently delete     │
│    all the calendars you can access using        │
│    Google Calendar                               │
│                                                  │
│  Make sure you trust Leave Management System     │
│                                                  │
│  You may be sharing sensitive info with this     │
│  site or app. Learn about how Leave Management   │
│  System will handle your data by reviewing its   │
│  terms of service and privacy policies.          │
│                                                  │
│                                                  │
│                    [Cancel]    [Allow]  ←3. CLICK│
└──────────────────────────────────────────────────┘
```

---

## ✅ After Clicking "Allow"

You'll be redirected back to your app and see:
```
✅ Google Calendar connected successfully!
```

Now when you apply for leave and it gets approved, it will automatically sync to your Google Calendar!

---

## 🎯 Quick Summary

1. See warning? **Normal for testing apps**
2. Click **"Advanced"**
3. Click **"Go to Leave Management System (unsafe)"**
4. Click **"Allow"**
5. Done! ✅

**Time needed: 10 seconds**

---

## 🔒 Is This Safe?

**YES!** Because:
- ✅ You're the developer
- ✅ You control the code
- ✅ You know what the app does
- ✅ It's running on your local machine
- ✅ Only you can access it

The warning is for **public users** who don't know the developer. Since you ARE the developer, it's completely safe to proceed!

---

## 🚀 Alternative: Add Yourself as Test User

To avoid seeing this warning every time:

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Scroll to **"Test users"**
3. Click **"+ ADD USERS"**
4. Enter your Gmail address
5. Click **"SAVE"**

Now you'll see a simpler permission screen without the scary warning!

---

## 📋 Checklist

- [x] OAuth credentials configured
- [x] Redirect URI added
- [x] Google Calendar API enabled
- [x] See "App not verified" warning ← **You are here**
- [ ] Click "Advanced"
- [ ] Click "Go to Leave Management System (unsafe)"
- [ ] Click "Allow"
- [ ] ✅ Connected!

---

## 🎉 What Happens Next

After you click "Allow":

1. **Immediate**: Redirected back to Integration Settings
2. **See**: "Google Calendar connected successfully" message
3. **Apply for leave**: Submit a leave request
4. **Get approved**: Admin/Manager approves it
5. **Auto-sync**: Leave automatically appears in your Google Calendar! 📅
6. **Badge**: See "✓ Synced to Google Calendar" in My Leaves page

---

## 💡 Pro Tip

If you're testing with multiple Google accounts:
- Use incognito/private browsing mode
- Or sign out and sign in with different account
- Each account needs to go through this process once

---

## 🆘 Troubleshooting

**Q: I don't see "Advanced" link**
**A**: Scroll down on the warning page, it's at the bottom left

**Q: After clicking "Allow", nothing happens**
**A**: Check if popup was blocked. Allow popups for localhost:3000

**Q: Getting "redirect_uri_mismatch" error**
**A**: Go back to Google Console and verify redirect URI is exactly:
```
http://localhost:5000/api/integrations/google/callback
```

**Q: Want to disconnect and reconnect**
**A**: 
1. Go to: https://myaccount.google.com/permissions
2. Find "Leave Management System"
3. Click "Remove access"
4. Try connecting again

---

**Bottom line: Click "Advanced" → "Go to Leave Management System (unsafe)" → "Allow" and you're done!** 🎊
