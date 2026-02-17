# Complete Email Setup Guide

## What Emails Will Work After Setup

✅ Password Reset OTP Codes
✅ Leave Request Submitted Notifications
✅ Leave Approved Notifications
✅ Leave Rejected Notifications
✅ Manager Approval Notifications
✅ HR/Admin Approval Notifications

---

## Step-by-Step Setup

### Step 1: Get Gmail App Password (5 minutes)

1. **Go to Google Account:**
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with your Gmail account

2. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

3. **Create App Password:**
   - Go back to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter name: "Leave Management System"
   - Click "Generate"

4. **Copy the 16-character password:**
   - Example: `abcd efgh ijkl mnop`
   - Remove spaces: `abcdefghijklmnop`
   - Save this password!

---

### Step 2: Add to Render Backend (2 minutes)

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com
   - Click your backend service (leave-management-he2w)

2. **Go to Environment Tab:**
   - Click "Environment" in left sidebar

3. **Add Email Variables:**
   
   Click "Add Environment Variable" and add:
   
   ```
   Key: EMAIL_USER
   Value: your-email@gmail.com
   ```
   
   Click "Add Environment Variable" again:
   
   ```
   Key: EMAIL_PASSWORD
   Value: abcdefghijklmnop (your 16-char app password)
   ```

4. **Save Changes:**
   - Click "Save Changes" button
   - Wait 2-3 minutes for redeploy

---

### Step 3: Test Email Functionality

#### Test 1: Password Reset OTP

1. Go to: https://leave-management-frontend-five.vercel.app/forgot-password
2. Enter email: `admin@test.com`
3. Click "Send Reset Code"
4. Check email inbox for OTP code
5. Enter OTP and reset password

#### Test 2: Leave Request Email

1. Login as employee: `employee1@test.com` / `employee123`
2. Apply for leave
3. Check email for "Leave Request Submitted" notification

#### Test 3: Manager Notification

1. After employee applies for leave
2. Manager should receive email: `manager@test.com`
3. Check manager's inbox for "New Leave Request" notification

#### Test 4: Approval Email

1. Login as manager: `manager@test.com` / `manager123`
2. Approve the leave request
3. Employee should receive "Leave Approved by Manager" email

---

## Email Templates

### Password Reset Email
- Subject: "Password Reset Code - Leave Management System"
- Contains: 6-digit OTP code
- Expires: 10 minutes

### Leave Request Submitted
- Subject: "Leave Request Pending - Leave Management System"
- Contains: Leave details, status
- Sent to: Employee

### Manager Notification
- Subject: "New Leave Request from [Employee Name] - Action Required"
- Contains: Employee details, leave details
- Sent to: Manager

### Leave Approved
- Subject: "Leave Request Approved - Leave Management System"
- Contains: Approval details, comments
- Sent to: Employee

### Leave Rejected
- Subject: "Leave Request Rejected - Leave Management System"
- Contains: Rejection reason, comments
- Sent to: Employee

---

## Troubleshooting

### Emails Not Sending?

**Check 1: Environment Variables**
- Verify EMAIL_USER and EMAIL_PASSWORD are set in Render
- No typos in email address
- App password is correct (16 characters, no spaces)

**Check 2: Gmail Settings**
- 2-Step Verification is enabled
- App password is generated correctly
- Gmail account is active

**Check 3: Render Logs**
- Go to Render Dashboard → Your service → Logs
- Look for email errors
- Check for "Email sent successfully" messages

**Check 4: Spam Folder**
- Check spam/junk folder in email
- Mark as "Not Spam" if found

### Common Errors

**Error: "Invalid login"**
- App password is incorrect
- Regenerate app password and update in Render

**Error: "Authentication failed"**
- 2-Step Verification not enabled
- Enable it in Google Account settings

**Error: "Connection timeout"**
- Render server issue
- Wait a few minutes and try again

---

## Alternative Email Providers

### Using Outlook/Hotmail

```
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

Update `emailService.js` and `notificationService.js`:
```javascript
service: 'outlook'  // instead of 'gmail'
```

### Using SendGrid (Recommended for Production)

1. Sign up: https://sendgrid.com/
2. Get API key
3. Update code to use SendGrid API

---

## Production Recommendations

For production use, consider:

1. **SendGrid** (Free tier: 100 emails/day)
   - More reliable
   - Better deliverability
   - Email analytics

2. **AWS SES** (Very cheap)
   - $0.10 per 1000 emails
   - High deliverability
   - Scalable

3. **Mailgun** (Free tier: 5000 emails/month)
   - Easy setup
   - Good documentation
   - Reliable

---

## Security Notes

⚠️ **Important:**
- Never commit EMAIL_PASSWORD to Git
- Use environment variables only
- Rotate app passwords periodically
- Use different app passwords for different apps

---

**After completing setup, all email notifications will work in real-time!** 📧✅
