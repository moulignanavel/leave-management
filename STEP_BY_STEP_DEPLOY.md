# 🎯 Step-by-Step Deployment Guide

## Complete Deployment in 30 Minutes

Follow these exact steps to deploy your Leave Management System.

---

## 📋 Before You Start

### Create Accounts (5 minutes):
1. **GitHub**: [github.com](https://github.com) - FREE
2. **Vercel**: [vercel.com](https://vercel.com) - FREE
3. **Digital Ocean**: [digitalocean.com](https://digitalocean.com) - $200 credit
   - Or **AWS**: [aws.amazon.com](https://aws.amazon.com) - 12 months free

### What You Have:
- ✅ MongoDB Atlas (already configured)
- ✅ Google OAuth (already configured)
- ✅ Email service (already configured)
- ✅ Complete application code

---

## 🚀 STEP 1: Push to GitHub (3 minutes)

Open terminal in your project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment"

# Go to github.com and create a new repository
# Then run these commands (replace with your repo URL):
git remote add origin https://github.com/YOUR-USERNAME/leave-management.git
git branch -M main
git push -u origin main
```

✅ **Checkpoint**: Your code is now on GitHub!

---

## 🚀 STEP 2: Deploy Backend to Digital Ocean (15 minutes)

### 2.1 Create Droplet (3 minutes)

1. Go to [digitalocean.com](https://digitalocean.com)
2. Sign up (get $200 credit)
3. Click **"Create"** → **"Droplets"**
4. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic - $6/month (1GB RAM)
   - **Datacenter**: Choose closest to you
   - **Authentication**: Password (easier) or SSH Key
   - **Hostname**: `leave-backend`
5. Click **"Create Droplet"**
6. **COPY YOUR DROPLET IP**: `123.456.789.0`

### 2.2 Connect to Droplet (1 minute)

```bash
# SSH into your droplet (use the IP you copied)
ssh root@YOUR_DROPLET_IP

# Enter password when prompted
```

### 2.3 Run Deployment Script (10 minutes)

```bash
# Download and run the deployment script
curl -o deploy.sh https://raw.githubusercontent.com/YOUR-USERNAME/leave-management/main/deploy-digitalocean.sh

# Make it executable
chmod +x deploy.sh

# Run it
./deploy.sh
```

**The script will ask for your GitHub repository URL. Paste**:
```
https://github.com/YOUR-USERNAME/leave-management.git
```

**Wait for installation to complete...**

### 2.4 Update Environment Variables (1 minute)

```bash
# Edit .env file
cd leave-management
nano .env
```

**Update these lines**:
- Change `FRONTEND_URL` to your Vercel URL (we'll get this in Step 3)
- Keep everything else as is

**Save**: Press `Ctrl+X`, then `Y`, then `Enter`

```bash
# Restart application
pm2 restart leave-backend
```

✅ **Checkpoint**: Backend is running at `http://YOUR_DROPLET_IP`

**Test it**:
```bash
curl http://YOUR_DROPLET_IP/health
```

You should see: `{"status":"OK",...}`

---

## 🚀 STEP 3: Deploy Frontend to Vercel (7 minutes)

### 3.1 Connect Vercel to GitHub (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 3.2 Import Project (2 minutes)

1. Click **"Add New..."** → **"Project"**
2. Find your `leave-management` repository
3. Click **"Import"**

### 3.3 Configure Project (3 minutes)

**Framework Preset**: Create React App

**Root Directory**: Click **"Edit"** → Type `frontend`

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Environment Variables** - Click **"Add"**:

```
Name: REACT_APP_API_URL
Value: http://YOUR_DROPLET_IP
```

```
Name: REACT_APP_GOOGLE_CLIENT_ID
Value: your-google-client-id.apps.googleusercontent.com
```

Click **"Deploy"**

**Wait 2-3 minutes for deployment...**

### 3.4 Copy Your Vercel URL

After deployment completes:
- Click **"Visit"** or copy the URL
- It looks like: `https://leave-management-xxxx.vercel.app`

✅ **Checkpoint**: Frontend is live on Vercel!

---

## 🚀 STEP 4: Connect Frontend to Backend (3 minutes)

### 4.1 Update Backend Environment

SSH back into your droplet:

```bash
ssh root@YOUR_DROPLET_IP
cd leave-management
nano .env
```

**Update this line**:
```
FRONTEND_URL=https://your-vercel-url.vercel.app
```

**Save**: `Ctrl+X`, `Y`, `Enter`

```bash
# Restart backend
pm2 restart leave-backend
```

---

## 🚀 STEP 5: Update Google OAuth (2 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click on your OAuth 2.0 Client ID
3. **Authorized JavaScript origins** - Add:
   ```
   https://your-vercel-url.vercel.app
   http://YOUR_DROPLET_IP
   ```
4. **Authorized redirect URIs** - Add:
   ```
   http://YOUR_DROPLET_IP/api/integrations/google/callback
   https://your-vercel-url.vercel.app
   ```
5. Click **"Save"**

---

## 🚀 STEP 6: Update MongoDB Network Access (1 minute)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"**
5. Click **"Confirm"**

---

## ✅ STEP 7: Test Your Deployment (5 minutes)

### Test Backend:

```bash
# From your computer
curl http://YOUR_DROPLET_IP/health
```

Should return: `{"status":"OK",...}`

### Test Frontend:

1. Open your Vercel URL in browser
2. You should see the landing page
3. Click **"Get Started"** or **"Login"**

### Test Login:

Try these accounts:
- **Admin**: admin@test.com / admin123
- **Manager**: manager@test.com / manager123
- **Employee**: employee1@test.com / employee123

### Test Google OAuth:

1. Click **"Sign in with Google"**
2. Choose your Google account
3. Should redirect to dashboard

### Test Features:

- ✅ Apply for leave (Employee)
- ✅ View dashboard
- ✅ Update profile
- ✅ Search functionality
- ✅ Manager approval (login as manager)

---

## 🎉 SUCCESS! Your App is Live!

### Your URLs:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `http://YOUR_DROPLET_IP`
- **Database**: MongoDB Atlas

### Share with Users:

```
🎉 Leave Management System is Live!

URL: https://your-app.vercel.app

Test Accounts:
- Admin: admin@test.com / admin123
- Manager: manager@test.com / manager123
- Employee: employee1@test.com / employee123

Features:
✅ Apply for leave
✅ Approve/reject requests
✅ Google login
✅ Email notifications
✅ Real-time search
✅ Profile management
```

---

## 🔧 Maintenance Commands

### View Backend Logs:

```bash
ssh root@YOUR_DROPLET_IP
pm2 logs leave-backend
```

### Restart Backend:

```bash
ssh root@YOUR_DROPLET_IP
pm2 restart leave-backend
```

### Update Code:

```bash
ssh root@YOUR_DROPLET_IP
cd leave-management
git pull
npm install
pm2 restart leave-backend
```

### Redeploy Frontend:

1. Push changes to GitHub
2. Vercel auto-deploys!
3. Or manually: Vercel Dashboard → Deployments → Redeploy

---

## 🆘 Troubleshooting

### Frontend shows "Network Error":
- Check REACT_APP_API_URL in Vercel
- Verify backend is running: `curl http://YOUR_DROPLET_IP/health`

### Backend not responding:
```bash
ssh root@YOUR_DROPLET_IP
pm2 status
pm2 logs leave-backend
```

### Google OAuth not working:
- Verify redirect URIs in Google Console
- Check both frontend and backend URLs are added

### MongoDB connection failed:
- Check Network Access in Atlas (allow 0.0.0.0/0)
- Verify MONGO_URI in .env

---

## 💰 Monthly Cost

- **Vercel Frontend**: FREE
- **Digital Ocean Droplet**: $6/month
- **MongoDB Atlas**: FREE
- **Total**: $6/month

### Upgrade for Production:
- Digital Ocean 4GB: $24/month
- MongoDB M10: $57/month
- **Total**: $81/month

---

## 📊 Next Steps

1. **Monitor**: Set up [UptimeRobot](https://uptimerobot.com) (free)
2. **Backup**: Enable MongoDB backups (paid tier)
3. **Domain**: Buy custom domain (optional, $12/year)
4. **SSL**: Install Let's Encrypt (free, optional)
5. **Scale**: Upgrade as needed

---

## 🎯 Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | https://your-app.vercel.app | User interface |
| Backend | http://YOUR_DROPLET_IP | API server |
| Database | MongoDB Atlas | Data storage |
| GitHub | Your repository | Code hosting |

---

**Congratulations! Your Leave Management System is deployed and running!** 🚀

**Total Time**: ~30 minutes
**Total Cost**: $6/month
**Status**: Production Ready ✅
