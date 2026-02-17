# Keep Render Server Awake (Free Solution)

## Problem
Render free tier spins down after 15 minutes of inactivity, causing 30-50 second delays on first request.

## Solution: Use Cron-Job.org (Free)

### Step 1: Create Cron Job

1. Go to: https://cron-job.org/en/
2. Sign up for free account
3. Click "Create Cronjob"

### Step 2: Configure Cron Job

**Title:** Keep Leave Management Awake

**URL:** `https://leave-management-he2w.onrender.com/health`

**Schedule:** Every 10 minutes
- Pattern: `*/10 * * * *`

**Request Method:** GET

**Enabled:** Yes

### Step 3: Save

Click "Create" and your server will stay awake!

---

## Alternative: UptimeRobot (Free)

1. Go to: https://uptimerobot.com/
2. Sign up for free
3. Add New Monitor:
   - Monitor Type: HTTP(s)
   - Friendly Name: Leave Management Backend
   - URL: `https://leave-management-he2w.onrender.com/health`
   - Monitoring Interval: 5 minutes
4. Create Monitor

---

## How It Works

- Pings your backend every 10 minutes
- Keeps the server awake
- No more cold starts
- Users get instant response

---

## Paid Solution (If Budget Allows)

Upgrade Render to paid tier ($7/month):
- No cold starts
- Always-on server
- Better performance
- More resources

Go to: https://dashboard.render.com → Your service → Upgrade

---

**After setting up cron job, your website will be fast all the time!** ⚡
