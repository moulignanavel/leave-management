# 🚀 Deploy Backend to Render - Step by Step

## Deploy Your Backend in 10 Minutes

---

## 📋 What You Need

- ✅ GitHub Repository: https://github.com/moulignanavel/leave-management
- ✅ Render account (free signup)
- ✅ Your credentials from YOUR_CREDENTIALS.md
- ✅ 10 minutes

---

## 🎯 STEP-BY-STEP GUIDE

### Step 1: Create Render Account (2 minutes)

1. **Go to**: https://render.com
2. **Click**: "Get Started" or "Sign Up"
3. **Choose**: "Sign Up with GitHub"
4. **Authorize**: Render to access your GitHub
5. **Complete**: Email verification if needed

✅ **Account Created!**

---

### Step 2: Create Web Service (1 minute)

1. **Click**: "New +" (top right)
2. **Select**: "Web Service"
3. **Click**: "Connect account" (if first time)
4. **Find**: `moulignanavel/leave-management`
5. **Click**: "Connect"

✅ **Repository Connected!**

---

### Step 3: Configure Web Service (2 minutes)

Fill in these settings:

**Name**: 
```
leave-backend
```

**Region**: 
```
Choose closest to you (e.g., Oregon, Frankfurt, Singapore)
```

**Branch**: 
```
main
```

**Root Directory**: 
```
(Leave empty)
```

**Runtime**: 
```
Node
```

**Build Command**: 
```
npm install
```

**Start Command**: 
```
node backend/server.js
```

**Instance Type**: 
```
Free
```

✅ **Basic Configuration Done!**

---

### Step 4: Add Environment Variables (5 minutes)

**Click**: "Advanced" → Scroll to "Environment Variables"

**Add these variables one by one** (copy from YOUR_CREDENTIALS.md):

#### 1. MongoDB Connection
```
Key: MONGO_URI
Value: mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0
```

#### 2. JWT Secret
```
Key: JWT_SECRET
Value: mysupersecretkey12345changethis
```

#### 3. Port
```
Key: PORT
Value: 5000
```

#### 4. Environment
```
Key: NODE_ENV
Value: production
```

#### 5. Email User
```
Key: EMAIL_USER
Value: moulignanavel@gmail.com
```

#### 6. Email Password
```
Key: EMAIL_PASSWORD
Value: dgsluaoidmrkpdsr
```

#### 7. Google Client ID
```
Key: GOOGLE_CLIENT_ID
Value: (copy from YOUR_CREDENTIALS.md)
```

#### 8. Google Client Secret
```
Key: GOOGLE_CLIENT_SECRET
Value: (copy from YOUR_CREDENTIALS.md)
```

#### 9. Google Redirect URI (IMPORTANT - Update after deployment)
```
Key: GOOGLE_REDIRECT_URI
Value: https://leave-backend-xxxx.onrender.com/api/integrations/google/callback
```
⚠️ **Note**: Replace `xxxx` with your actual Render URL after deployment

#### 10. Frontend URL (Update after deploying frontend)
```
Key: FRONTEND_URL
Value: https://your-frontend-url.vercel.app
```
⚠️ **Note**: Update this after deploying frontend to Vercel

✅ **Environment Variables Added!**

---

### Step 5: Deploy! (2 minutes)

1. **Scroll down**
2. **Click**: "Create Web Service"
3. **Wait**: 5-10 minutes for first deployment
4. **Watch**: Build logs in real-time

**You'll see**:
```
==> Cloning from https://github.com/moulignanavel/leave-management...
==> Running 'npm install'
==> Installing dependencies...
==> Build successful!
==> Starting service...
==> Your service is live!
```

✅ **Backend Deployed!**

---

### Step 6: Get Your Backend URL (1 minute)

After deployment completes:

1. **Look at top of page**: You'll see your URL
2. **Copy it**: `https://leave-backend-xxxx.onrender.com`
3. **Save it**: You'll need this for frontend!

**Example**: `https://leave-backend-a1b2.onrender.com`

✅ **URL Copied!**

---

### Step 7: Test Your Backend (1 minute)

**Open in browser**:
```
https://YOUR-BACKEND-URL.onrender.com/health
```

**You should see**:
```json
{
  "status": "OK",
  "message": "Leave Management System API is running",
  "environment": "production",
  "timestamp": "2024-..."
}
```

✅ **Backend is Working!**

---

### Step 8: Update Environment Variables (2 minutes)

Now that you have your backend URL, update these:

1. **Go to**: Render Dashboard → Your service
2. **Click**: "Environment" (left sidebar)
3. **Find**: `GOOGLE_REDIRECT_URI`
4. **Click**: Edit icon
5. **Update**: Replace `xxxx` with your actual URL
   ```
   https://leave-backend-a1b2.onrender.com/api/integrations/google/callback
   ```
6. **Click**: "Save Changes"

**Service will auto-redeploy** (takes 2-3 minutes)

✅ **Environment Updated!**

---

## 🎉 BACKEND DEPLOYMENT COMPLETE!

### Your Backend Info:

**URL**: `https://leave-backend-xxxx.onrender.com`
**Status**: Live ✅
**Cost**: FREE
**Health Check**: `https://YOUR-URL.onrender.com/health`

---

## 📝 IMPORTANT NOTES

### Free Tier Behavior:

⚠️ **Backend sleeps after 15 minutes of inactivity**
- First request after sleep takes ~30 seconds
- After wake up, works instantly
- This is normal for free tier

### Keep Backend Awake (Optional):

Use **cron-job.org** (free):
1. Go to: https://cron-job.org
2. Sign up (free)
3. Create job:
   - URL: `https://YOUR-BACKEND-URL.onrender.com/health`
   - Interval: Every 10 minutes
4. Save

**Result**: Backend stays awake 24/7! 🎉

---

## 🔧 USEFUL COMMANDS

### View Logs:

1. **Go to**: Render Dashboard
2. **Select**: `leave-backend`
3. **Click**: "Logs" (left sidebar)
4. **See**: Real-time logs

### Restart Service:

1. **Go to**: Render Dashboard
2. **Select**: `leave-backend`
3. **Click**: "Manual Deploy" → "Clear build cache & deploy"

### Update Code:

```bash
# On your computer
git add .
git commit -m "Update backend"
git push origin main

# Render auto-deploys!
```

---

## 🆘 TROUBLESHOOTING

### Build Failed:

**Check**:
1. Build logs in Render Dashboard
2. Verify `node backend/server.js` is correct
3. Check for missing dependencies

**Fix**:
1. Review error message
2. Fix issue in code
3. Push to GitHub
4. Render auto-redeploys

### Service Won't Start:

**Check**:
1. Logs for error messages
2. Environment variables are set
3. MongoDB connection string is correct

**Fix**:
1. Verify all environment variables
2. Test MongoDB connection
3. Check PORT is set to 5000

### Can't Access Backend:

**Check**:
1. Service status (should be "Live")
2. URL is correct
3. Health endpoint works

**Fix**:
1. Wait for deployment to complete
2. Check logs for errors
3. Verify service is running

---

## 📊 MONITOR YOUR BACKEND

### Render Dashboard:

**View**:
- Deployment status
- Real-time logs
- Resource usage
- Uptime metrics

**Access**:
- Go to: https://dashboard.render.com
- Select: `leave-backend`

### Health Check:

**Test regularly**:
```bash
curl https://YOUR-BACKEND-URL.onrender.com/health
```

**Should return**:
```json
{"status":"OK",...}
```

---

## 🎯 NEXT STEPS

### 1. Deploy Frontend to Vercel

Follow: [FREE_DEPLOYMENT_GUIDE.md](FREE_DEPLOYMENT_GUIDE.md) - Step 1

### 2. Connect Frontend to Backend

Update `REACT_APP_API_URL` in Vercel with your Render URL

### 3. Update Google OAuth

Add your Render URL to Google Console redirect URIs

### 4. Update MongoDB Access

Allow 0.0.0.0/0 in MongoDB Atlas Network Access

### 5. Test Everything

Visit your frontend and test all features!

---

## 💡 PRO TIPS

### Optimize Performance:

1. **Enable Compression**: Already configured in server.js
2. **Use Caching**: Consider Redis (paid add-on)
3. **Monitor Logs**: Check for errors regularly
4. **Keep Awake**: Use cron-job.org

### Security:

1. **Change JWT_SECRET**: Use strong random string
2. **Update Passwords**: Use secure passwords
3. **Monitor Access**: Check logs for suspicious activity
4. **Regular Updates**: Keep dependencies updated

### Upgrade When Needed:

**Upgrade to $7/month for**:
- No sleep time
- Instant response
- Better performance
- 512MB RAM

---

## 📞 SUPPORT

### Render Documentation:
- Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### Your Guides:
- Complete Guide: [FREE_DEPLOYMENT_GUIDE.md](FREE_DEPLOYMENT_GUIDE.md)
- Quick Start: [FREE_DEPLOY_QUICK_START.md](FREE_DEPLOY_QUICK_START.md)
- Credentials: [YOUR_CREDENTIALS.md](YOUR_CREDENTIALS.md)

---

## ✅ CHECKLIST

- [ ] Render account created
- [ ] Repository connected
- [ ] Web service configured
- [ ] Environment variables added
- [ ] Service deployed successfully
- [ ] Backend URL copied
- [ ] Health check passed
- [ ] Environment variables updated
- [ ] Logs checked (no errors)

---

## 🎉 SUCCESS!

**Your backend is now live on Render!**

**Backend URL**: `https://leave-backend-xxxx.onrender.com`
**Status**: Live ✅
**Cost**: FREE
**Next**: Deploy frontend to Vercel

---

**Congratulations! Your backend is deployed!** 🚀

**Next Step**: Deploy frontend → [FREE_DEPLOYMENT_GUIDE.md](FREE_DEPLOYMENT_GUIDE.md)
