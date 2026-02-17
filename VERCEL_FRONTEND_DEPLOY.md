# 🚀 Deploy Frontend to Vercel - Step by Step

## Deploy Your Frontend in 5 Minutes

---

## 📋 What You Need

- ✅ GitHub Repository: https://github.com/moulignanavel/leave-management
- ✅ Backend URL from Render (you have this!)
- ✅ Vercel account (free signup)
- ✅ 5 minutes

---

## 🎯 STEP-BY-STEP GUIDE

### Step 1: Create Vercel Account (1 minute)

1. **Go to**: https://vercel.com
2. **Click**: "Sign Up" or "Start Deploying"
3. **Choose**: "Continue with GitHub"
4. **Authorize**: Vercel to access your GitHub
5. **Complete**: Email verification if needed

✅ **Account Created!**

---

### Step 2: Import Your Project (1 minute)

1. **Click**: "Add New..." (top right)
2. **Select**: "Project"
3. **Find**: `moulignanavel/leave-management`
4. **Click**: "Import"

✅ **Repository Connected!**

---

### Step 3: Configure Project (2 minutes)

#### Framework Preset:
```
Create React App (auto-detected)
```

#### Root Directory:
1. **Click**: "Edit" next to Root Directory
2. **Type**: `frontend`
3. **Click**: "Continue"

#### Build Settings (auto-filled):
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

✅ **Configuration Done!**

---

### Step 4: Add Environment Variables (1 minute)

**Click**: "Environment Variables" section

**Add Variable 1**:
```
Name: REACT_APP_API_URL
Value: https://YOUR-BACKEND-URL.onrender.com
```
⚠️ **IMPORTANT**: Replace with your actual Render backend URL!

**Example**:
```
REACT_APP_API_URL = https://leave-backend-a1b2.onrender.com
```

**Add Variable 2**:
```
Name: REACT_APP_GOOGLE_CLIENT_ID
Value: (copy from YOUR_CREDENTIALS.md)
```

**Example**:
```
REACT_APP_GOOGLE_CLIENT_ID = 473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com
```

✅ **Environment Variables Added!**

---

### Step 5: Deploy! (1 minute)

1. **Click**: "Deploy"
2. **Wait**: 2-3 minutes for build
3. **Watch**: Build progress in real-time

**You'll see**:
```
Building...
✓ Compiled successfully
✓ Build completed
✓ Deployment ready
```

✅ **Frontend Deployed!**

---

### Step 6: Get Your Frontend URL (30 seconds)

After deployment completes:

1. **You'll see**: "Congratulations!" message
2. **Click**: "Visit" button
3. **Or copy URL**: `https://leave-management-xxxx.vercel.app`
4. **Save this URL**: You'll need it!

✅ **URL Copied!**

---

## 🎉 FRONTEND DEPLOYMENT COMPLETE!

### Your Frontend Info:

**URL**: `https://leave-management-xxxx.vercel.app`
**Status**: Live ✅
**Cost**: FREE
**Auto-deploy**: Yes (on git push)

---

## 🧪 TEST YOUR FRONTEND

### Step 1: Open Your URL

Visit: `https://leave-management-xxxx.vercel.app`

**You should see**:
- Landing page with MS IT Solutions logo
- "Get Started" button
- "Login" button

### Step 2: Test Login

1. **Click**: "Login"
2. **Try logging in**:
   - Email: `admin@test.com`
   - Password: `admin123`

**If login works** → Everything is connected! ✅

---

## 🔗 NEXT STEPS (IMPORTANT!)

### 1. Update Backend Environment (2 minutes)

Your backend needs to know the frontend URL:

1. **Go to**: https://dashboard.render.com
2. **Click**: Your backend service
3. **Click**: "Environment" (left sidebar)
4. **Find**: `FRONTEND_URL`
5. **Update**: `https://leave-management-xxxx.vercel.app`
6. **Click**: "Save Changes"

Service will auto-redeploy (2-3 minutes)

---

### 2. Update Google OAuth (2 minutes)

Add your Vercel URL to Google Console:

1. **Go to**: https://console.cloud.google.com/apis/credentials
2. **Click**: Your OAuth 2.0 Client ID
3. **Authorized JavaScript origins** - Add:
   ```
   https://leave-management-xxxx.vercel.app
   ```
4. **Authorized redirect URIs** - Add:
   ```
   https://leave-management-xxxx.vercel.app
   https://YOUR-BACKEND-URL.onrender.com/api/integrations/google/callback
   ```
5. **Click**: "Save"

---

### 3. Update MongoDB Network Access (1 minute)

Ensure Render can access MongoDB:

1. **Go to**: https://cloud.mongodb.com
2. **Click**: "Network Access"
3. **Verify**: `0.0.0.0/0` is allowed
4. **If not**: Add IP Address → Allow Access from Anywhere

---

## 🎯 COMPLETE TESTING

### Test All Features:

1. **Landing Page**: ✅
   - Visit: `https://your-vercel-url.vercel.app`
   - Should load with logo and buttons

2. **Login (Email/Password)**: ✅
   - Email: `admin@test.com`
   - Password: `admin123`
   - Should redirect to dashboard

3. **Google OAuth**: ✅
   - Click "Sign in with Google"
   - Choose Google account
   - Should redirect to dashboard

4. **Dashboard**: ✅
   - Should see admin dashboard
   - All features working

5. **Apply Leave**: ✅
   - Navigate to "Apply Leave"
   - Fill form and submit
   - Should work without errors

---

## 🔧 USEFUL COMMANDS

### View Deployment Logs:

1. **Go to**: https://vercel.com/dashboard
2. **Click**: Your project
3. **Click**: "Deployments"
4. **Click**: Latest deployment
5. **View**: Build logs

### Redeploy:

1. **Go to**: Vercel Dashboard
2. **Click**: Your project
3. **Click**: "Deployments"
4. **Click**: "..." on latest
5. **Click**: "Redeploy"

### Update Environment Variables:

1. **Go to**: Vercel Dashboard
2. **Click**: Your project
3. **Click**: "Settings"
4. **Click**: "Environment Variables"
5. **Edit**: Variables
6. **Redeploy**: Required after changes

---

## 🆘 TROUBLESHOOTING

### Build Failed:

**Check**:
1. Build logs in Vercel
2. Root directory is `frontend`
3. Build command is correct

**Fix**:
1. Review error message
2. Fix issue in code
3. Push to GitHub
4. Vercel auto-redeploys

### Frontend Can't Connect to Backend:

**Check**:
1. `REACT_APP_API_URL` is correct
2. Backend is running (test health endpoint)
3. CORS is configured in backend

**Fix**:
1. Verify backend URL
2. Update environment variable
3. Redeploy frontend

### Google OAuth Not Working:

**Check**:
1. Redirect URIs in Google Console
2. Both frontend and backend URLs added
3. HTTPS (not HTTP)

**Fix**:
1. Add all URLs to Google Console
2. Clear browser cache
3. Try incognito mode

### Page Shows "Cannot GET /":

**Check**:
1. Root directory is `frontend`
2. Build completed successfully
3. Output directory is `build`

**Fix**:
1. Verify configuration
2. Redeploy with correct settings

---

## 📊 MONITOR YOUR FRONTEND

### Vercel Dashboard:

**View**:
- Deployment status
- Build logs
- Analytics (page views)
- Performance metrics

**Access**:
- Go to: https://vercel.com/dashboard
- Select: Your project

### Performance:

**Check**:
- Page load time
- Build time
- Bandwidth usage
- Error rate

---

## 💡 PRO TIPS

### Automatic Deployments:

Every time you push to GitHub:
- Vercel automatically builds
- Deploys new version
- Updates live site

### Preview Deployments:

For pull requests:
- Vercel creates preview URL
- Test before merging
- Automatic cleanup

### Custom Domain (Optional):

Add your own domain:
1. Settings → Domains
2. Add domain
3. Update DNS records
4. Requires paid plan ($20/month)

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Root directory set to `frontend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Frontend URL copied
- [ ] Backend `FRONTEND_URL` updated
- [ ] Google OAuth updated
- [ ] MongoDB access verified
- [ ] Login tested
- [ ] All features working

---

## 🎉 SUCCESS!

**Your complete application is now live!**

**Frontend**: `https://leave-management-xxxx.vercel.app`
**Backend**: `https://leave-backend-xxxx.onrender.com`
**Database**: MongoDB Atlas (FREE)

**Total Cost**: $0/month ✅

---

## 📱 SHARE WITH USERS

```
🎉 Leave Management System is Live!

URL: https://leave-management-xxxx.vercel.app

Test Accounts:
• Admin: admin@test.com / admin123
• Manager: manager@test.com / manager123
• Employee: employee1@test.com / employee123

Features:
✅ Apply for leave
✅ Approve/reject requests
✅ Google OAuth login
✅ Email notifications
✅ Real-time search
✅ Profile management
✅ Analytics & reports

Note: First backend request may take 30 seconds (free tier)
After that, works instantly!

Enjoy! 🚀
```

---

**Congratulations! Your Leave Management System is fully deployed!** 🎉

**Next**: Test everything and share with your users!
