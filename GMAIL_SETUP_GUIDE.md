# Gmail Setup Guide for Password Reset Feature

## Overview
The forgot password feature now sends a 6-digit reset code to the user's email address using Gmail SMTP.

## Step-by-Step Setup

### Step 1: Enable 2-Step Verification on Your Gmail Account

1. Go to your Google Account: https://myaccount.google.com/security
2. Under "Signing in to Google", click on "2-Step Verification"
3. Follow the prompts to enable 2-Step Verification
4. You'll need your phone to receive verification codes

### Step 2: Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
   - Or navigate: Google Account → Security → 2-Step Verification → App passwords
2. You may need to sign in again
3. Under "Select app", choose "Mail"
4. Under "Select device", choose "Other (Custom name)"
5. Enter a name like "Leave Management System"
6. Click "Generate"
7. Google will show you a 16-character password (like: `abcd efgh ijkl mnop`)
8. **IMPORTANT**: Copy this password immediately - you won't see it again!

### Step 3: Update .env File

1. Open the `.env` file in the root directory
2. Replace the email configuration:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**IMPORTANT NOTES:**
- Remove all spaces from the app password (use `abcdefghijklmnop`, not `abcd efgh ijkl mnop`)
- Use your actual Gmail address for EMAIL_USER
- Do NOT use your regular Gmail password - it won't work!
- Keep this .env file secure and never commit it to version control

### Step 4: Restart the Server

After updating the .env file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test the Feature

1. Go to http://localhost:3000/login
2. Click "Forgot Password?"
3. Enter a test user email (e.g., employee1@test.com)
4. Check the email inbox for the 6-digit code
5. Enter the code and new password
6. Login with the new password

## Troubleshooting

### Email Not Sending

**Problem**: "Invalid login" or "Username and Password not accepted"
- **Solution**: Make sure you're using an App Password, not your regular Gmail password
- **Solution**: Verify 2-Step Verification is enabled on your Google Account

**Problem**: "Less secure app access"
- **Solution**: Google removed this option. You MUST use App Passwords now

**Problem**: Email still not sending
- **Solution**: Check if the EMAIL_USER and EMAIL_PASSWORD in .env are correct
- **Solution**: Make sure there are no spaces in the app password
- **Solution**: Try generating a new app password

### Code Not Received

**Problem**: User doesn't receive the email
- **Solution**: Check spam/junk folder
- **Solution**: Verify the email address is correct
- **Solution**: Check server console for error messages
- **Solution**: Make sure the server restarted after updating .env

### Development Mode Fallback

If email is not configured or fails to send, the system will:
- Log the reset code to the server console
- Return the code in the API response (development mode only)
- This allows testing without email setup

## Security Best Practices

1. **Never commit .env file** - It's already in .gitignore
2. **Use different credentials for production** - Don't use personal Gmail
3. **Consider using a dedicated email service** for production:
   - SendGrid
   - AWS SES
   - Mailgun
   - Postmark

4. **Rotate app passwords periodically**
5. **Monitor for suspicious activity** in your Google Account

## Email Template

The reset email includes:
- Professional HTML formatting
- Large, easy-to-read 6-digit code
- 10-minute expiration notice
- Security warning if user didn't request reset

## Production Recommendations

For production deployment, consider:

1. **Use a transactional email service** instead of Gmail:
   - Better deliverability
   - Higher sending limits
   - Better analytics
   - Professional sender reputation

2. **Store tokens in Redis** instead of in-memory Map:
   - Survives server restarts
   - Works with multiple server instances
   - Better performance

3. **Add rate limiting**:
   - Prevent abuse
   - Limit reset requests per email/IP

4. **Remove development fallbacks**:
   - Don't return reset code in API response
   - Don't log sensitive information

## Support

If you encounter issues:
1. Check the server console for error messages
2. Verify all steps in this guide
3. Try generating a new app password
4. Test with a different Gmail account

## Quick Reference

- Gmail Security: https://myaccount.google.com/security
- App Passwords: https://myaccount.google.com/apppasswords
- 2-Step Verification: https://myaccount.google.com/signinoptions/two-step-verification

---

**Last Updated**: February 2026
