# 🚀 Deploy Frontend to Vercel - Quick Start

## Option 1: Deploy via Vercel Dashboard (Recommended - 5 minutes)

### Step 1: Go to Vercel
Visit: https://vercel.com/new

### Step 2: Import Repository
1. Sign in with GitHub
2. Import `moulignanavel/leave-management`
3. Click "Import"

### Step 3: Configure
```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
```

### Step 4: Environment Variables
Add these in Vercel dashboard:

```
REACT_APP_API_URL=https://leave-management-he2w.onrender.com
REACT_APP_GOOGLE_CLIENT_ID=473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com
```

### Step 5: Deploy
Click "Deploy" and wait 2-3 minutes!

---

## Option 2: Deploy via Vercel CLI (Advanced - 2 minutes)

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy:
```bash
cd frontend
vercel
```

Follow prompts:
- Set up and deploy? Y
- Which scope? (your account)
- Link to existing project? N
- Project name? leave-management-frontend
- Directory? ./
- Override settings? N

### Set Environment Variables:
```bash
vercel env add REACT_APP_API_URL
# Enter: https://leave-management-he2w.onrender.com

vercel env add REACT_APP_GOOGLE_CLIENT_ID
# Enter: 473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com
```

### Deploy to Production:
```bash
vercel --prod
```

---

## After Deployment

### 1. Get Your URL
You'll receive: `https://leave-management-xxxx.vercel.app`

### 2. Update Backend CORS
Add your Vercel URL to backend environment variables

### 3. Update Google OAuth
Add to Google Console:
- Authorized JavaScript origins: `https://leave-management-xxxx.vercel.app`
- Authorized redirect URIs: `https://leave-management-xxxx.vercel.app`

### 4. Test
Visit your URL and test login!

---

## Troubleshooting

### Build fails?
- Check Root Directory is set to `frontend`
- Verify environment variables are set

### Can't connect to backend?
- Verify `REACT_APP_API_URL` is correct
- Check backend is running

### Need help?
See detailed guide: `VERCEL_FRONTEND_DEPLOY.md`

---

**That's it! Your frontend is live! 🎉**
