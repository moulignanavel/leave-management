# 🚀 DEPLOY NOW - Your Code is on GitHub!

## ✅ Success! Your repository is live!

**GitHub URL**: https://github.com/moulignanavel/leave-management

---

## 🎯 Next: Deploy in 20 Minutes

### Option 1: 100% FREE Deployment (RECOMMENDED) 🆓

**Time**: 20 minutes | **Cost**: $0/month | **Difficulty**: Very Easy

**Stack**: Vercel (Frontend) + Render (Backend) + MongoDB Atlas (Database)

👉 **Follow**: [FREE_DEPLOYMENT_GUIDE.md](FREE_DEPLOYMENT_GUIDE.md) ⭐

### Option 2: Vercel + Digital Ocean (Production)

**Time**: 30 minutes | **Cost**: $6/month | **Difficulty**: Easy

👉 **Follow**: [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)

### Option 3: Render Only (Fastest)

**Time**: 15 minutes | **Cost**: FREE | **Difficulty**: Very Easy

👉 **Follow**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

---

## 🔑 Your Credentials

All your actual credentials are in: **[YOUR_CREDENTIALS.md](YOUR_CREDENTIALS.md)**

⚠️ **This file is NOT on GitHub** (it's in .gitignore for security)

---

## ⚡ Quick Start (Vercel + Digital Ocean)

### Step 1: Deploy Frontend (5 min)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import: `moulignanavel/leave-management`
5. Settings:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Environment Variables:
   ```
   REACT_APP_API_URL = (add after backend)
   REACT_APP_GOOGLE_CLIENT_ID = (copy from YOUR_CREDENTIALS.md)
   ```
7. Deploy!
8. Copy your URL: `https://leave-management-xxxx.vercel.app`

### Step 2: Deploy Backend (15 min)

1. Go to [digitalocean.com](https://digitalocean.com)
2. Sign up (get $200 credit)
3. Create Droplet:
   - Ubuntu 22.04 LTS
   - Basic $6/month
4. Copy IP address
5. SSH: `ssh root@YOUR_IP`
6. Run:
   ```bash
   curl -o deploy.sh https://raw.githubusercontent.com/moulignanavel/leave-management/main/deploy-digitalocean.sh
   chmod +x deploy.sh
   ./deploy.sh
   ```
7. When asked for repo: `https://github.com/moulignanavel/leave-management.git`
8. Edit .env:
   ```bash
   cd leave-management
   nano .env
   ```
9. Copy credentials from YOUR_CREDENTIALS.md
10. Update FRONTEND_URL with your Vercel URL
11. Save (Ctrl+X, Y, Enter)
12. Restart: `pm2 restart leave-backend`

### Step 3: Connect (5 min)

1. **Update Vercel**:
   - Settings → Environment Variables
   - Edit `REACT_APP_API_URL` = `http://YOUR_DROPLET_IP`
   - Redeploy

2. **Update Google OAuth**:
   - [Google Console](https://console.cloud.google.com/apis/credentials)
   - Add redirect URIs:
     - `http://YOUR_DROPLET_IP/api/integrations/google/callback`
     - `https://your-vercel-url.vercel.app`

3. **Update MongoDB**:
   - [MongoDB Atlas](https://cloud.mongodb.com)
   - Network Access → Allow 0.0.0.0/0

### Step 4: Test (5 min)

Visit: `https://your-vercel-url.vercel.app`

Login:
- Admin: admin@test.com / admin123
- Manager: manager@test.com / manager123
- Employee: employee1@test.com / employee123

---

## 🎉 Done!

Your Leave Management System is LIVE!

**Frontend**: https://your-vercel-url.vercel.app
**Backend**: http://YOUR_DROPLET_IP
**Cost**: $6/month

---

## 📚 Full Documentation

- **Step-by-Step**: [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)
- **Quick Deploy**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- **Detailed Guide**: [DEPLOY_VERCEL_NETLIFY.md](DEPLOY_VERCEL_NETLIFY.md)
- **Credentials**: [YOUR_CREDENTIALS.md](YOUR_CREDENTIALS.md)

---

## 🆘 Need Help?

### Common Issues:

**Frontend can't connect**:
- Check REACT_APP_API_URL in Vercel
- Test backend: `curl http://YOUR_IP/health`

**Backend not starting**:
```bash
ssh root@YOUR_IP
pm2 logs leave-backend
```

**Google OAuth error**:
- Update redirect URIs in Google Console
- Clear browser cache

**MongoDB error**:
- Allow 0.0.0.0/0 in Network Access

---

## 💡 Pro Tips

1. Start with free Render to test
2. Use deployment scripts (automated!)
3. Monitor with UptimeRobot (free)
4. Backup MongoDB regularly
5. Update dependencies monthly

---

**Ready? Let's deploy!** 🚀

**Start here**: [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)
