# Outlook Calendar Integration Setup Guide

## Step-by-Step Instructions

### Step 1: Go to Azure Portal

1. Open **Azure Portal**: https://portal.azure.com/

2. Sign in with your Microsoft account
   - If you don't have one, create a free account

### Step 2: Register Application

1. In Azure Portal, search for **"App registrations"** in the top search bar

2. Click **"App registrations"** from the results

3. Click **"+ New registration"** button

4. Fill in the registration form:
   - **Name**: `Leave Management System`
   - **Supported account types**: Select **"Accounts in any organizational directory and personal Microsoft accounts"**
   - **Redirect URI**: 
     - Platform: **Web**
     - URI: `http://localhost:5000/api/integrations/outlook/callback`
   - Click **"Register"**

5. You'll be taken to the app overview page

### Step 3: Copy Application (Client) ID

1. On the app overview page, you'll see:
   - **Application (client) ID**: Copy this (looks like: `12345678-1234-1234-1234-123456789abc`)
   - **Directory (tenant) ID**: You can ignore this for now

2. Keep this ID safe - you'll need it for .env file

### Step 4: Create Client Secret

1. In the left menu, click **"Certificates & secrets"**

2. Click **"+ New client secret"**

3. Add description:
   - Description: `Leave Management System Secret`
   - Expires: **24 months** (or your preference)
   - Click **"Add"**

4. **IMPORTANT**: Copy the **Value** immediately!
   - This is your Client Secret
   - It will only be shown once
   - If you lose it, you'll need to create a new one

### Step 5: Add API Permissions

1. In the left menu, click **"API permissions"**

2. Click **"+ Add a permission"**

3. Select **"Microsoft Graph"**

4. Select **"Delegated permissions"**

5. Search and select these permissions:
   - `Calendars.ReadWrite` (Read and write user calendars)
   - `offline_access` (Maintain access to data you have given it access to)

6. Click **"Add permissions"**

7. **Optional**: Click **"Grant admin consent for [Your Organization]"**
   - This step is optional for personal accounts
   - For organizational accounts, admin consent may be required

### Step 6: Configure Redirect URIs (Additional)

1. In the left menu, click **"Authentication"**

2. Under **"Platform configurations"**, you should see your Web platform

3. Click **"Add URI"** and add:
   - `http://localhost:3000` (for frontend)

4. Under **"Implicit grant and hybrid flows"**, check:
   - ✅ **Access tokens**
   - ✅ **ID tokens**

5. Click **"Save"** at the bottom

### Step 7: Update .env File

1. Open your `.env` file in the project root

2. Add these lines (replace with your actual credentials):

```env
# Outlook Calendar Integration
OUTLOOK_CLIENT_ID=your-application-client-id-here
OUTLOOK_CLIENT_SECRET=your-client-secret-value-here
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback
```

3. Save the file

### Step 8: Restart the Server

1. Stop the current server (Ctrl+C in terminal)

2. Start again:
```bash
npm run dev
```

### Step 9: Test the Integration

1. Open browser: http://localhost:3000

2. Login with: `employee1@test.com` / `employee123`

3. Go to **Integration Settings** page

4. Click **"Connect Outlook Calendar"** button

5. A popup will open asking you to:
   - Sign in with your Microsoft account
   - Review permissions
   - Click **"Accept"**

6. You should see: "Outlook Calendar connected successfully"

7. Now apply for a leave and get it approved

8. Check your Outlook Calendar - the leave should appear automatically!

---

## Troubleshooting

### Error: "AADSTS50011: The reply URL specified in the request does not match"
- Check that redirect URI in Azure Portal matches exactly
- Should be: `http://localhost:5000/api/integrations/outlook/callback`
- No trailing slashes
- Use http (not https) for localhost

### Error: "AADSTS65001: The user or administrator has not consented"
- Make sure you added the required API permissions
- Try granting admin consent in Azure Portal
- Make sure you're using the correct Microsoft account

### Popup blocked
- Allow popups for localhost:3000 in your browser
- Try a different browser

### Calendar not syncing
- Make sure leave is approved (not just pending)
- Check browser console for errors
- Check server logs for errors
- Verify permissions are granted in Azure Portal

### Token expired
- Tokens expire after some time
- Reconnect your calendar from Integration Settings
- The system should auto-refresh tokens (if refresh token is available)

---

## What Happens After Setup

1. **When you connect**: Your Outlook Calendar access token is stored securely in the database

2. **When leave is approved**: 
   - System automatically creates a calendar event
   - Event includes leave type, dates, duration, reason
   - Event is marked as "Out of Office"
   - Event visibility is set to private
   - Categories: Leave, Out of Office

3. **In My Leaves page**:
   - You'll see a badge: "✓ Synced to Outlook Calendar"
   - You can still download iCal files manually

---

## Security Notes

- Tokens are stored encrypted in MongoDB
- Only you can access your calendar
- Events are marked as private
- You can disconnect anytime from Integration Settings
- Refresh tokens allow automatic token renewal

---

## Example Credentials Format

```env
OUTLOOK_CLIENT_ID=12345678-1234-1234-1234-123456789abc
OUTLOOK_CLIENT_SECRET=AbC~dEf1GhI2jKl3MnO4pQr5StU6vWx7YzA8BcD9
OUTLOOK_REDIRECT_URI=http://localhost:5000/api/integrations/outlook/callback
```

---

## Azure Portal Quick Links

- **App Registrations**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
- **Your App**: After registration, bookmark your app's page
- **API Permissions**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/CallAnAPI
- **Certificates & Secrets**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Credentials

---

## Permissions Explained

- **Calendars.ReadWrite**: Allows the app to create, read, update, and delete events in your calendar
- **offline_access**: Allows the app to refresh access tokens without requiring you to sign in again

---

## Testing with Different Accounts

You can test with:
- Personal Microsoft account (outlook.com, hotmail.com, live.com)
- Work or school account (Office 365)
- Both will work with the same configuration

---

## Need Help?

- Azure Portal: https://portal.azure.com/
- Microsoft Graph API Docs: https://docs.microsoft.com/en-us/graph/api/resources/calendar
- OAuth 2.0 Guide: https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

---

**Once setup is complete, calendar sync will work automatically for all approved leaves!** 🎉

---

## Comparison: Google vs Outlook

| Feature | Google Calendar | Outlook Calendar |
|---------|----------------|------------------|
| Setup Complexity | Medium | Medium |
| Free Tier | Yes | Yes |
| Auto-sync | ✅ Yes | ✅ Yes |
| Out-of-Office | ❌ No | ✅ Yes |
| Reminders | ✅ Yes | ✅ Yes |
| Private Events | ✅ Yes | ✅ Yes |
| Token Refresh | ✅ Auto | ✅ Auto |

**Recommendation**: Set up both! Users can choose which calendar to connect based on their preference.
