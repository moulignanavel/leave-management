# Email Setup Guide for Password Reset Feature

## Gmail Configuration (Recommended)

To send password reset emails, you need to configure Gmail with an App Password.

### Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", enable "2-Step Verification"
4. Follow the prompts to set it up

### Step 2: Generate App Password

1. After enabling 2FA, go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app and "Other" as the device
4. Name it "Leave Management System"
5. Click "Generate"
6. Copy the 16-character password (it will look like: xxxx xxxx xxxx xxxx)

### Step 3: Update .env File

Open your `.env` file and update these lines:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace:
- `your-gmail-address@gmail.com` with your actual Gmail address
- `xxxx xxxx xxxx xxxx` with the App Password you generated

### Step 4: Restart Backend Server

After updating the .env file, restart your backend server:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## Testing the Feature

1. Go to http://localhost:3000/login
2. Click "Forgot Password?"
3. Enter your email address (must be a registered user)
4. Check your email inbox for the 6-digit reset code
5. Enter the code and your new password
6. Login with your new password

## Troubleshooting

### Email Not Received?

1. **Check spam folder** - Gmail might filter it as spam initially
2. **Verify App Password** - Make sure you copied it correctly (remove spaces)
3. **Check console** - If email fails, the code will be logged to backend console
4. **Gmail security** - Make sure 2FA is enabled and App Password is active

### "Invalid credentials" error?

- Double-check your EMAIL_USER and EMAIL_PASSWORD in .env
- Make sure you're using an App Password, not your regular Gmail password
- Remove any spaces from the App Password

### Still not working?

The system has a fallback - if email sending fails, the reset code will be printed in the backend console. You can use that code to reset your password.

## Alternative: Using Other Email Services

### Outlook/Hotmail

```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

Update `backend/utils/emailService.js`:
```javascript
service: 'hotmail'
```

### Custom SMTP Server

Update `backend/utils/emailService.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-domain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## Security Notes

- Never commit your .env file to Git
- Use App Passwords, not regular passwords
- The reset code expires in 10 minutes
- Each code can only be used once
- For production, consider using services like SendGrid, AWS SES, or Mailgun
