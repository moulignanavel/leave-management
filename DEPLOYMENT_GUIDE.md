# 🚀 Leave Management System - Deployment Guide

## Quick Deployment Options

This guide provides **3 deployment options** from easiest to most advanced:

1. **Option A: Render (Easiest - Free Tier Available)** ⭐ RECOMMENDED
2. **Option B: Vercel + Railway (Free/Low Cost)**
3. **Option C: AWS/Digital Ocean (Professional)**

---

## 🎯 Option A: Render Deployment (EASIEST - RECOMMENDED)

### Why Render?
- ✅ Free tier available
- ✅ Deploys both frontend and backend
- ✅ Automatic HTTPS
- ✅ Easy MongoDB Atlas integration
- ✅ No credit card required for free tier
- ✅ Simple one-click deployment

### Step 1: Prepare Your Code

1. **Create a `.gitignore` file in root** (if not exists):
```
node_modules/
.env
frontend/node_modules/
frontend/build/
.DS_Store
```

2. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `leave-management-backend`
   - **Root Directory**: Leave empty
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Instance Type**: Free

5. **Add Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=mysupersecretkey12345changethis
   PORT=5000
   NODE_ENV=production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=https://YOUR-BACKEND-URL.onrender.com/api/integrations/google/callback
   ```

6. Click **"Create Web Service"**
7. **Copy your backend URL**: `https://leave-management-backend-xxxx.onrender.com`

### Step 3: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `leave-management-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `frontend/build`

4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://YOUR-BACKEND-URL.onrender.com
   ```

5. Click **"Create Static Site"**

### Step 4: Update Backend CORS

Update `backend/server.js` to allow your frontend domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://YOUR-FRONTEND-URL.onrender.com'
  ],
  credentials: true
}));
```

Push changes and Render will auto-deploy!

### Step 5: Update Google OAuth Redirect

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client
4. Add to **Authorized JavaScript origins**:
   - `https://YOUR-FRONTEND-URL.onrender.com`
5. Add to **Authorized redirect URIs**:
   - `https://YOUR-BACKEND-URL.onrender.com/api/integrations/google/callback`

### ✅ Done! Your app is live!

**Frontend**: `https://YOUR-FRONTEND-URL.onrender.com`
**Backend**: `https://YOUR-BACKEND-URL.onrender.com`

---

## 🎯 Option B: Vercel + Railway

### Frontend on Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://YOUR-BACKEND-URL.railway.app
   ```

6. Click **"Deploy"**

### Backend on Railway (Free $5 credit)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Configure:
   - **Root Directory**: Leave empty
   - **Start Command**: `node backend/server.js`

5. **Add Environment Variables** (same as Render)

6. Click **"Deploy"**

---

## 🎯 Option C: AWS/Digital Ocean (Professional)

### Prerequisites
- AWS/Digital Ocean account
- Domain name (optional)
- SSH knowledge

### Backend on AWS EC2

1. **Launch EC2 Instance**:
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t2.micro (free tier) or t3.small
   - Security Group: Allow ports 22, 80, 443, 5000

2. **Connect via SSH**:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

4. **Clone and Setup**:
```bash
git clone YOUR_GITHUB_REPO_URL
cd leave-management-system
npm install
cd frontend && npm install && npm run build
cd ..
```

5. **Create .env file**:
```bash
nano .env
# Paste your environment variables
```

6. **Start with PM2**:
```bash
pm2 start backend/server.js --name leave-backend
pm2 startup
pm2 save
```

7. **Install Nginx**:
```bash
sudo apt update
sudo apt install nginx
```

8. **Configure Nginx**:
```bash
sudo nano /etc/nginx/sites-available/leave-management
```

Paste:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /home/ubuntu/leave-management-system/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable site**:
```bash
sudo ln -s /etc/nginx/sites-available/leave-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **Install SSL (Let's Encrypt)**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📱 MongoDB Atlas Setup (All Options)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (already done - you're using it!)
3. **Important**: Update Network Access
   - Go to **Network Access** → **Add IP Address**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add your deployment server IPs

---

## 🔧 Pre-Deployment Checklist

### Code Updates Needed

1. **Update API URLs in Frontend**:

Create `frontend/src/config.js`:
```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

2. **Update all axios calls** to use this config:
```javascript
import { API_URL } from '../config';
axios.get(`${API_URL}/api/leaves`)
```

3. **Update backend CORS**:
```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:3000'],
  credentials: true
}));
```

4. **Add production scripts to root package.json**:
```json
{
  "scripts": {
    "start": "node backend/server.js",
    "build": "cd frontend && npm install && npm run build",
    "heroku-postbuild": "npm run build"
  }
}
```

---

## 🎨 Custom Domain Setup (Optional)

### For Render/Vercel:
1. Go to your project settings
2. Click **"Custom Domains"**
3. Add your domain
4. Update DNS records at your domain registrar:
   - Type: CNAME
   - Name: @ or www
   - Value: provided by platform

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Update MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Use environment variables (never commit .env)
- [ ] Enable HTTPS
- [ ] Update Google OAuth redirect URIs
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Regular backups configured

---

## 📊 Monitoring & Maintenance

### Free Monitoring Tools:
- **Uptime Robot**: Monitor uptime (free)
- **Render Dashboard**: Built-in logs and metrics
- **MongoDB Atlas**: Database monitoring
- **Google Analytics**: User tracking

### Regular Tasks:
- Check logs weekly
- Update dependencies monthly
- Backup database weekly
- Monitor disk space
- Review security alerts

---

## 🆘 Troubleshooting

### Common Issues:

**1. CORS Error**:
- Update backend CORS to include frontend URL
- Check credentials: true in both frontend and backend

**2. MongoDB Connection Failed**:
- Check Network Access in MongoDB Atlas
- Verify connection string
- Check if IP is whitelisted

**3. Google OAuth Not Working**:
- Update redirect URIs in Google Console
- Check GOOGLE_CLIENT_ID matches
- Verify domain is authorized

**4. Build Fails**:
- Check Node version (use 18.x)
- Clear node_modules and reinstall
- Check for missing dependencies

**5. API Calls Failing**:
- Verify REACT_APP_API_URL is set
- Check backend is running
- Verify CORS configuration

---

## 💰 Cost Breakdown

### Free Tier (Render):
- Frontend: Free
- Backend: Free (sleeps after 15 min inactivity)
- Database: Free (MongoDB Atlas M0)
- **Total**: $0/month

### Paid Tier (Recommended for Production):
- Render Backend: $7/month (always on)
- Render Frontend: Free
- MongoDB Atlas M10: $57/month
- **Total**: ~$64/month

### Professional (AWS):
- EC2 t3.small: $15/month
- MongoDB Atlas M10: $57/month
- Domain: $12/year
- **Total**: ~$73/month

---

## 🚀 Quick Start Commands

### Deploy to Render (After setup):
```bash
git add .
git commit -m "Deploy to production"
git push origin main
# Render auto-deploys!
```

### Manual Deploy to Server:
```bash
ssh user@your-server
cd leave-management-system
git pull
npm install
cd frontend && npm install && npm run build
pm2 restart leave-backend
```

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS configuration
5. Review this guide's troubleshooting section

---

**Ready to deploy? Start with Option A (Render) - it's the easiest!**

**Estimated deployment time**: 30-45 minutes
