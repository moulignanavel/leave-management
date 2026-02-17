# 🆓 FREE DEPLOYMENT - QUICK START

## Deploy in 20 Minutes - ZERO COST!

---

## 📋 What You Need

- ✅ GitHub account (done!)
- ✅ Vercel account (free signup)
- ✅ Render account (free signup)
- ✅ 20 minutes

---

## 🚀 3 SIMPLE STEPS

### STEP 1: Deploy Frontend (5 min)

1. Go to **vercel.com** → Sign up with GitHub
2. Import: `moulignanavel/leave-management`
3. Root: `frontend`
4. Add env:
   - `REACT_APP_API_URL` = `https://placeholder.com` (update later)
   - `REACT_APP_GOOGLE_CLIENT_ID` = (from YOUR_CREDENTIALS.md)
5. Deploy!
6. Copy URL: `https://leave-management-xxxx.vercel.app`

### STEP 2: Deploy Backend (10 min)

1. Go to **render.com** → Sign up with GitHub
2. New Web Service → Connect: `moulignanavel/leave-management`
3. Settings:
   - Name: `leave-backend`
   - Build: `npm install`
   - Start: `node backend/server.js`
   - Instance: **Free**
4. Add environment variables (from YOUR_CREDENTIALS.md):
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI` = `https://YOUR-BACKEND.onrender.com/api/integrations/google/callback`
   - `FRONTEND_URL` = (your Vercel URL)
5. Deploy!
6. Copy URL: `https://leave-backend-xxxx.onrender.com`

### STEP 3: Connect (5 min)

1. **Update Vercel**:
   - Settings → Environment Variables
   - Edit `REACT_APP_API_URL` = (your Render URL)
   - Redeploy

2. **Update Google OAuth**:
   - console.cloud.google.com/apis/credentials
   - Add redirect URIs (both Vercel and Render URLs)

3. **Update MongoDB**:
   - cloud.mongodb.com
   - Network Access → Allow 0.0.0.0/0

---

## ✅ TEST

Visit: `https://leave-management-xxxx.vercel.app`

Login:
- Admin: admin@test.com / admin123
- Manager: manager@test.com / manager123
- Employee: employee1@test.com / employee123

---

## 🎉 DONE!

**Frontend**: https://leave-management-xxxx.vercel.app
**Backend**: https://leave-backend-xxxx.onrender.com
**Cost**: $0/month ✅

**Note**: First load may take 30 seconds (backend wakes up)

---

## 📖 Full Guide

For detailed instructions: [FREE_DEPLOYMENT_GUIDE.md](FREE_DEPLOYMENT_GUIDE.md)

---

**Your app is live for FREE!** 🚀
