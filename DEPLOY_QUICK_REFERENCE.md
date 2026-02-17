# 🚀 Quick Reference - Deploy in 30 Minutes

## One-Page Deployment Guide

---

## 📋 What You Need

- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Digital Ocean account ($200 credit)
- ✅ 30 minutes

---

## 🎯 4 Simple Steps

### STEP 1: Push to GitHub (2 min)
```bash
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/YOUR-USERNAME/leave-management.git
git push -u origin main
```

### STEP 2: Deploy Frontend (5 min)
1. Go to vercel.com → Sign up
2. Import repository
3. Root: `frontend`
4. Add env vars:
   - `REACT_APP_API_URL` = (add after step 3)
   - `REACT_APP_GOOGLE_CLIENT_ID` = `your-google-client-id.apps.googleusercontent.com`
5. Deploy
6. Copy URL: `https://your-app.vercel.app`

### STEP 3: Deploy Backend (15 min)
1. Go to digitalocean.com → Sign up
2. Create Droplet: Ubuntu 22.04, $6/month
3. Copy IP address
4. SSH: `ssh root@YOUR_IP`
5. Run:
```bash
curl -o deploy.sh https://raw.githubusercontent.com/YOUR-USERNAME/leave-management/main/deploy-digitalocean.sh
chmod +x deploy.sh
./deploy.sh
```
6. Update .env with Vercel URL
7. Restart: `pm2 restart leave-backend`

### STEP 4: Configure (5 min)
1. Update Vercel env: `REACT_APP_API_URL` = `http://YOUR_IP`
2. Google Console: Add redirect URIs
3. MongoDB Atlas: Allow 0.0.0.0/0
4. Test: Visit your Vercel URL

---

## ✅ Test Login

- Admin: admin@test.com / admin123
- Manager: manager@test.com / manager123
- Employee: employee1@test.com / employee123

---

## 🎉 DONE!

**Frontend**: https://your-app.vercel.app
**Backend**: http://YOUR_DROPLET_IP
**Cost**: $6/month

---

## 🆘 Quick Fixes

**Frontend error**: Check REACT_APP_API_URL in Vercel
**Backend down**: `ssh root@YOUR_IP` → `pm2 restart leave-backend`
**OAuth error**: Update redirect URIs in Google Console
**DB error**: Allow 0.0.0.0/0 in MongoDB Atlas

---

## 📞 Full Guides

- **Detailed**: [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)
- **Alternative**: [DEPLOY_VERCEL_NETLIFY.md](DEPLOY_VERCEL_NETLIFY.md)
- **Fastest**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

---

**Ready? Start deploying!** 🚀
