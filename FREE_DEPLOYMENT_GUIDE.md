# 🆓 100% FREE DEPLOYMENT GUIDE

## Deploy Your Leave Management System - ZERO COST!

**Tech Stack (All FREE)**:
- ✅ Frontend: Vercel (FREE forever)
- ✅ Backend: Render (FREE tier)
- ✅ Database: MongoDB Atlas (FREE M0 tier)
- ✅ Storage: Firebase Storage (FREE tier - optional)

**Total Cost**: $0/month
**Time**: 20 minutes
**Limitations**: Backend sleeps after 15 min inactivity (wakes up in ~30 seconds)

---

## 🎯 STEP-BY-STEP FREE DEPLOYMENT

### Prerequisites (5 minutes)

1. **GitHub Account**: Already done ✅
   - Repository: https://github.com/moulignanavel/leave-management

2. **Create Free Accounts**:
   - Vercel: https://vercel.com (Sign up with GitHub)
   - Render: https://render.com (Sign up with GitHub)
   - MongoDB Atlas: Already have ✅

---

## 📱 STEP 1: Deploy Frontend to Vercel (5 minutes)

### 1.1 Sign Up & Import

1. **Go to**: https://vercel.com
2. **Click**: "Sign Up" → "Continue with GitHub"
3. **Authorize** Vercel to access your GitHub
4. **Click**: "Add New..." → "Project"
5. **Find**: `moulignanavel/leave-management`
6. **Click**: "Import"

### 1.2 Configure Project

**Framework Preset**: Create React App (auto-detected)

**Root Directory**: 
- Click "Edit"
- Type: `frontend`
- Click "Continue"

**Build Settings** (auto-filled):
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

### 1.3 Add Environment Variables

Click "Environment Variables" and add:

```
Name: REACT_APP_API_URL
Value: https://leave-backend-xxxx.onrender.com
(We'll update this after deploying backend)
```

```
Name: REACT_APP_GOOGLE_CLIENT_ID
Value: (copy from YOUR_CREDENTIALS.md)
```

**For now, use placeholder**:
```
REACT_APP_API_URL = https://placeholder.com
```

### 1.4 Deploy

1. **Click**: "Deploy"
2. **Wait**: 2-3 minutes for build
3. **Copy URL**: `https://leave-management-xxxx.vercel.app`
4. **Save this URL** - you'll need it!

✅ **Frontend Deployed!**

---

## 🖥️ STEP 2: Deploy Backend to Render (10 minutes)

### 2.1 Sign Up & Create Web Service

1. **Go to**: https://render.com
2. **Click**: "Get Started" → "Sign Up with GitHub"
3. **Authorize** Render
4. **Click**: "New +" → "Web Service"

### 2.2 Connect Repository

1. **Click**: "Connect account" (if needed)
2. **Find**: `moulignanavel/leave-management`
3. **Click**: "Connect"

### 2.3 Configure Web Service

**Name**: `leave-backend`

**Region**: Choose closest to you

**Branch**: `main`

**Root Directory**: Leave empty

**Runtime**: `Node`

**Build Command**: 
```
npm install
```

**Start Command**: 
```
node backend/server.js
```

**Instance Type**: `Free`

### 2.4 Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these one by one (copy from YOUR_CREDENTIALS.md):

```
MONGO_URI = mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0
```

```
JWT_SECRET = mysupersecretkey12345changethis
```

```
PORT = 5000
```

```
NODE_ENV = production
```

```
EMAIL_USER = (your email from YOUR_CREDENTIALS.md)
```

```
EMAIL_PASSWORD = (your email password from YOUR_CREDENTIALS.md)
```

```
GOOGLE_CLIENT_ID = (from YOUR_CREDENTIALS.md)
```

```
GOOGLE_CLIENT_SECRET = (from YOUR_CREDENTIALS.md)
```

```
GOOGLE_REDIRECT_URI = https://leave-backend-xxxx.onrender.com/api/integrations/google/callback
(Update xxxx with your actual Render URL after deployment)
```

```
FRONTEND_URL = https://leave-management-xxxx.vercel.app
(Your Vercel URL from Step 1)
```

### 2.5 Deploy

1. **Click**: "Create Web Service"
2. **Wait**: 5-10 minutes for first deployment
3. **Copy URL**: `https://leave-backend-xxxx.onrender.com`
4. **Test**: Visit `https://leave-backend-xxxx.onrender.com/health`
   - Should see: `{"status":"OK",...}`

✅ **Backend Deployed!**

---

## 🔗 STEP 3: Connect Frontend & Backend (3 minutes)

### 3.1 Update Frontend Environment

1. **Go to**: Vercel Dashboard
2. **Select**: Your project
3. **Click**: "Settings" → "Environment Variables"
4. **Find**: `REACT_APP_API_URL`
5. **Click**: "Edit"
6. **Update Value**: `https://leave-backend-xxxx.onrender.com`
   (Use your actual Render URL)
7. **Click**: "Save"

### 3.2 Redeploy Frontend

1. **Go to**: "Deployments" tab
2. **Click**: "..." on latest deployment
3. **Click**: "Redeploy"
4. **Wait**: 2 minutes

### 3.3 Update Backend Environment

1. **Go to**: Render Dashboard
2. **Select**: `leave-backend`
3. **Click**: "Environment"
4. **Find**: `GOOGLE_REDIRECT_URI`
5. **Update**: `https://YOUR-ACTUAL-BACKEND-URL.onrender.com/api/integrations/google/callback`
6. **Click**: "Save Changes"
7. **Wait**: Service will auto-redeploy

✅ **Connected!**

---

## 🔐 STEP 4: Update Google OAuth (2 minutes)

### 4.1 Add Production URLs

1. **Go to**: https://console.cloud.google.com/apis/credentials
2. **Click**: Your OAuth 2.0 Client ID
3. **Authorized JavaScript origins** - Add:
   ```
   https://leave-management-xxxx.vercel.app
   https://leave-backend-xxxx.onrender.com
   ```
4. **Authorized redirect URIs** - Add:
   ```
   https://leave-backend-xxxx.onrender.com/api/integrations/google/callback
   https://leave-management-xxxx.vercel.app
   ```
5. **Click**: "Save"

✅ **OAuth Updated!**

---

## 🗄️ STEP 5: Update MongoDB Network Access (1 minute)

### 5.1 Allow Render Access

1. **Go to**: https://cloud.mongodb.com
2. **Click**: "Network Access" (left sidebar)
3. **Click**: "Add IP Address"
4. **Click**: "Allow Access from Anywhere"
5. **Confirm**: This adds `0.0.0.0/0`
6. **Click**: "Confirm"

✅ **Database Accessible!**

---

## 🎉 DEPLOYMENT COMPLETE!

### Your Live URLs:

**Frontend**: `https://leave-management-xxxx.vercel.app`
**Backend**: `https://leave-backend-xxxx.onrender.com`
**Database**: MongoDB Atlas (M0 Free)

**Total Cost**: $0/month ✅

---

## 🧪 TEST YOUR DEPLOYMENT

### 1. Test Backend

Visit: `https://leave-backend-xxxx.onrender.com/health`

Should see:
```json
{
  "status": "OK",
  "message": "Leave Management System API is running",
  "environment": "production"
}
```

### 2. Test Frontend

Visit: `https://leave-management-xxxx.vercel.app`

Should see:
- Landing page with MS IT Solutions logo
- "Get Started" and "Login" buttons

### 3. Test Login

Click "Login" and try:

**Email/Password**:
- Admin: `admin@test.com` / `admin123`
- Manager: `manager@test.com` / `manager123`
- Employee: `employee1@test.com` / `employee123`

**Google OAuth**:
- Click "Sign in with Google"
- Choose your Google account
- Should redirect to dashboard

### 4. Test Features

**As Employee**:
- ✅ View dashboard
- ✅ Apply for leave
- ✅ View leave history
- ✅ Update profile
- ✅ Search leaves

**As Manager**:
- ✅ View pending approvals
- ✅ Approve/reject leaves
- ✅ View team calendar
- ✅ Search team members

**As Admin**:
- ✅ View system stats
- ✅ Manage users
- ✅ View reports
- ✅ Search all data

---

## ⚠️ FREE TIER LIMITATIONS

### Render Free Tier:

**Limitations**:
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month free (enough for 24/7 if only one service)

**How it affects you**:
- If no one uses the app for 15 minutes, next user waits ~30 seconds
- After that, works normally
- Good for: Testing, demos, small teams, low-traffic apps

**Upgrade Option**:
- $7/month for always-on backend (no sleep)
- Instant response times
- Better for production use

### Vercel Free Tier:

**Limitations**:
- 100GB bandwidth/month
- 100 deployments/day
- No custom domains on free tier (can add for $20/month)

**How it affects you**:
- More than enough for most use cases
- Frontend never sleeps (always fast)
- Perfect for production

### MongoDB Atlas Free Tier:

**Limitations**:
- 512MB storage
- Shared CPU
- No backups

**How it affects you**:
- Good for ~1000-5000 users
- Upgrade to M10 ($57/month) for:
  - 10GB storage
  - Automatic backups
  - Better performance

---

## 🚀 OPTIONAL: Add Firebase Storage (FREE)

### For File Uploads (Leave Attachments)

**Firebase Free Tier**:
- 5GB storage
- 1GB/day downloads
- 20K/day uploads

### Setup (10 minutes):

1. **Go to**: https://console.firebase.google.com
2. **Create Project**: "leave-management"
3. **Add Firebase to Web App**
4. **Enable Storage**
5. **Get Configuration**
6. **Add to Backend**:

```bash
# SSH or use Render Shell
npm install firebase-admin

# Add to .env in Render:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

---

## 📊 MONITORING YOUR FREE DEPLOYMENT

### 1. Render Dashboard

**Monitor**:
- Deployment status
- Logs (real-time)
- Resource usage
- Uptime

**Access**:
- Go to: https://dashboard.render.com
- Select: `leave-backend`
- Click: "Logs" to see real-time logs

### 2. Vercel Dashboard

**Monitor**:
- Deployment history
- Analytics (page views)
- Performance metrics
- Error tracking

**Access**:
- Go to: https://vercel.com/dashboard
- Select: Your project
- View: Analytics, Deployments, Logs

### 3. MongoDB Atlas

**Monitor**:
- Database size
- Connections
- Query performance
- Storage usage

**Access**:
- Go to: https://cloud.mongodb.com
- Select: Your cluster
- View: Metrics, Performance Advisor

### 4. Free Uptime Monitoring

**UptimeRobot** (Free):
1. Go to: https://uptimerobot.com
2. Sign up (free)
3. Add monitor:
   - Type: HTTP(s)
   - URL: `https://leave-backend-xxxx.onrender.com/health`
   - Interval: 5 minutes
4. Get email alerts when down

---

## 🔧 MAINTENANCE COMMANDS

### View Backend Logs:

**Option 1: Render Dashboard**
1. Go to: https://dashboard.render.com
2. Select: `leave-backend`
3. Click: "Logs"

**Option 2: Render Shell**
1. Go to: https://dashboard.render.com
2. Select: `leave-backend`
3. Click: "Shell" tab
4. Run: `pm2 logs` or `tail -f logs/app.log`

### Restart Backend:

1. Go to: Render Dashboard
2. Select: `leave-backend`
3. Click: "Manual Deploy" → "Clear build cache & deploy"

### Update Code:

```bash
# On your computer
git add .
git commit -m "Update feature"
git push origin main

# Render auto-deploys!
# Vercel auto-deploys!
```

### Check Service Status:

**Backend**:
```bash
curl https://leave-backend-xxxx.onrender.com/health
```

**Frontend**:
```bash
curl https://leave-management-xxxx.vercel.app
```

---

## 🆘 TROUBLESHOOTING

### Backend is Sleeping

**Symptom**: First request takes 30 seconds

**Solution**: This is normal on free tier
- Wait 30 seconds for wake up
- Or upgrade to $7/month for always-on

**Workaround**: Use a cron job to ping every 10 minutes
```bash
# Use cron-job.org (free)
1. Go to: https://cron-job.org
2. Create job
3. URL: https://leave-backend-xxxx.onrender.com/health
4. Interval: Every 10 minutes
```

### Frontend Can't Connect to Backend

**Check**:
1. Verify `REACT_APP_API_URL` in Vercel
2. Test backend: `curl https://YOUR-BACKEND.onrender.com/health`
3. Check CORS in backend
4. Check browser console for errors

**Fix**:
1. Update `REACT_APP_API_URL` in Vercel
2. Redeploy frontend
3. Clear browser cache

### Google OAuth Not Working

**Check**:
1. Redirect URIs in Google Console
2. Both frontend and backend URLs added
3. HTTPS (not HTTP) for production

**Fix**:
1. Update redirect URIs
2. Clear browser cache
3. Try incognito mode

### MongoDB Connection Failed

**Check**:
1. Network Access in Atlas (0.0.0.0/0)
2. MONGO_URI in Render environment
3. MongoDB Atlas status

**Fix**:
1. Allow all IPs in Network Access
2. Verify connection string
3. Check MongoDB Atlas status page

### Build Fails

**Render**:
1. Check logs in Render Dashboard
2. Verify Node version (18+)
3. Check for missing dependencies

**Vercel**:
1. Check build logs
2. Verify `frontend` root directory
3. Clear cache and redeploy

---

## 📈 WHEN TO UPGRADE

### Upgrade Backend ($7/month) when:
- ✅ Users complain about slow first load
- ✅ Need instant response times
- ✅ Using in production
- ✅ More than 10 daily users

### Upgrade Database ($57/month) when:
- ✅ Storage >400MB
- ✅ Need automatic backups
- ✅ Need better performance
- ✅ More than 100 concurrent users

### Upgrade Frontend ($20/month) when:
- ✅ Need custom domain
- ✅ Need more bandwidth
- ✅ Need team collaboration

---

## 💡 FREE TIER TIPS

### Maximize Free Resources:

1. **Keep Backend Awake**:
   - Use cron-job.org to ping every 10 min
   - Free and prevents sleep

2. **Optimize Database**:
   - Create indexes for faster queries
   - Clean up old data regularly
   - Monitor storage usage

3. **Optimize Frontend**:
   - Use lazy loading
   - Optimize images
   - Enable caching

4. **Monitor Usage**:
   - Check Render hours (750/month limit)
   - Check Vercel bandwidth
   - Check MongoDB storage

---

## 🎉 SUCCESS!

### Your FREE Deployment:

**Frontend**: Vercel (FREE forever)
**Backend**: Render (FREE with sleep)
**Database**: MongoDB Atlas (FREE M0)
**Total Cost**: $0/month

### Share with Users:

```
🎉 Leave Management System is Live!

URL: https://leave-management-xxxx.vercel.app

Test Accounts:
• Admin: admin@test.com / admin123
• Manager: manager@test.com / manager123
• Employee: employee1@test.com / employee123

Note: First load may take 30 seconds (free tier)
After that, works instantly!

Features:
✅ Apply for leave
✅ Approve/reject requests
✅ Google OAuth login
✅ Email notifications
✅ Real-time search
✅ Profile management

Enjoy! 🚀
```

---

## 📞 SUPPORT

### Documentation:
- This Guide: FREE_DEPLOYMENT_GUIDE.md
- Command Center: DEPLOYMENT_COMMAND_CENTER.md
- Credentials: YOUR_CREDENTIALS.md

### External Resources:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

### Community:
- Render Community: https://community.render.com
- Vercel Discord: https://vercel.com/discord
- MongoDB Forums: https://www.mongodb.com/community/forums

---

**Congratulations! Your Leave Management System is live for FREE!** 🎉

**Total Time**: 20 minutes
**Total Cost**: $0/month
**Status**: Production Ready (with free tier limitations) ✅
