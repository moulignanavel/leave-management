# Quick Email Setup - Do This Now!

## Your forgot password feature is working, but emails need Gmail setup

### What's Happening Now:
- Reset codes are generated successfully ✓
- Codes are shown in server console (fallback mode) ✓
- Email sending fails because Gmail credentials not configured ✗

### Fix It in 5 Minutes:

## Step 1: Get Gmail App Password

1. Open: https://myaccount.google.com/apppasswords
2. Sign in to your Gmail account
3. If you see "2-Step Verification is not turned on":
   - Click "2-Step Verification" 
   - Follow steps to enable it
   - Come back to https://myaccount.google.com/apppasswords

4. Select app: **Mail**
5. Select device: **Other (Custom name)**
6. Type: **Leave Management System**
7. Click **Generate**
8. Copy the 16-character password (example: `abcd efgh ijkl mnop`)

## Step 2: Update .env File

Open `.env` file in your project root and update these lines:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**Replace with your actual values:**
- `your-email@gmail.com` → Your Gmail address
- `abcdefghijklmnop` → The 16-char app password (remove spaces!)

**Example:**
```env
EMAIL_USER=moulignanavel@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

## Step 3: Restart Server

The server will auto-restart when you save .env file (nodemon is watching).

Or manually restart:
- Press `Ctrl+C` in terminal
- Run: `npm run dev`

## Step 4: Test It!

1. Go to: http://localhost:3000/login
2. Click "Forgot Password?"
3. Enter: moulignanavel@gmail.com (or any test user email)
4. Check your email inbox for the 6-digit code
5. Enter code and new password
6. Done!

## Important Notes:

- **Use App Password, NOT your regular Gmail password**
- **Remove all spaces** from the app password
- **Keep .env file private** - never share or commit it
- If email fails, code still shows in server console as backup

## Need Help?

See detailed guide: `GMAIL_SETUP_GUIDE.md`

---

**Current Status**: Email service ready, just needs Gmail credentials!
