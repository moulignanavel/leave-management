# 🎯 DEPLOYMENT COMMAND CENTER

## Your Complete Deployment Setup

**Tech Stack**: Vercel/Netlify + AWS EC2/Digital Ocean + MongoDB Atlas + AWS S3/Firebase

**GitHub Repository**: https://github.com/moulignanavel/leave-management ✅

---

## 🚀 CHOOSE YOUR DEPLOYMENT PATH

### Path 1: Vercel + Digital Ocean (RECOMMENDED) ⭐

**Best for**: Production, reliable performance, easy maintenance

| Component | Service | Cost | Setup Time |
|-----------|---------|------|------------|
| Frontend | Vercel | FREE | 5 min |
| Backend | Digital Ocean | $6/month | 15 min |
| Database | MongoDB Atlas | FREE | Already done ✅ |
| Storage | AWS S3 (optional) | ~$1/month | 10 min |

**Total**: $6-7/month | **Time**: 30 minutes

👉 **START**: [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)

---

### Path 2: Netlify + AWS EC2

**Best for**: AWS ecosystem, free tier (first year)

| Component | Service | Cost | Setup Time |
|-----------|---------|------|------------|
| Frontend | Netlify | FREE | 5 min |
| Backend | AWS EC2 t2.micro | FREE (1 year) | 20 min |
| Database | MongoDB Atlas | FREE | Already done ✅ |
| Storage | AWS S3 | ~$1/month | 10 min |

**Total**: $0-1/month (first year) | **Time**: 35 minutes

👉 **START**: [DEPLOY_VERCEL_NETLIFY.md](DEPLOY_VERCEL_NETLIFY.md)

---

### Path 3: Render (FASTEST) ⚡

**Best for**: Quick testing, demos, MVP

| Component | Service | Cost | Setup Time |
|-----------|---------|------|------------|
| Frontend | Render Static | FREE | 3 min |
| Backend | Render Web | FREE (sleeps) | 5 min |
| Database | MongoDB Atlas | FREE | Already done ✅ |

**Total**: FREE | **Time**: 15 minutes

👉 **START**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ Already Complete:
- [x] Application code ready
- [x] MongoDB Atlas configured
- [x] Google OAuth set up
- [x] Email service configured
- [x] Code pushed to GitHub
- [x] Deployment files created
- [x] Documentation complete

### 🔧 You Need:
- [ ] Vercel/Netlify account (free signup)
- [ ] Digital Ocean/AWS account (free trial available)
- [ ] 30-60 minutes of time
- [ ] Your credentials from [YOUR_CREDENTIALS.md](YOUR_CREDENTIALS.md)

---

## 🎯 QUICK START GUIDE

### Step 1: Deploy Frontend (5 minutes)

#### Option A: Vercel
```bash
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import: moulignanavel/leave-management
5. Root Directory: frontend
6. Environment Variables:
   - REACT_APP_API_URL = (add after backend)
   - REACT_APP_GOOGLE_CLIENT_ID = (from YOUR_CREDENTIALS.md)
7. Deploy!
```

#### Option B: Netlify
```bash
1. Go to: https://netlify.com
2. Sign up with GitHub
3. Add new site → Import from Git
4. Select: moulignanavel/leave-management
5. Base directory: frontend
6. Build command: npm run build
7. Publish directory: frontend/build
8. Environment Variables: (same as Vercel)
9. Deploy!
```

---

### Step 2: Deploy Backend (15-20 minutes)

#### Option A: Digital Ocean (Easiest)

**Create Droplet**:
```bash
1. Go to: https://digitalocean.com
2. Sign up (get $200 credit)
3. Create → Droplets
4. Choose:
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic $6/month (1GB RAM)
   - Datacenter: Closest to you
   - Authentication: Password or SSH Key
5. Create Droplet
6. Copy IP address
```

**Deploy Application**:
```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Download and run deployment script
curl -o deploy.sh https://raw.githubusercontent.com/moulignanavel/leave-management/main/deploy-digitalocean.sh
chmod +x deploy.sh
./deploy.sh

# When prompted, enter:
https://github.com/moulignanavel/leave-management.git

# Edit .env with your credentials
cd leave-management
nano .env
# Copy from YOUR_CREDENTIALS.md
# Update FRONTEND_URL with your Vercel/Netlify URL
# Save: Ctrl+X, Y, Enter

# Restart application
pm2 restart leave-backend

# Test
curl http://localhost:5000/health
```

#### Option B: AWS EC2

**Create EC2 Instance**:
```bash
1. Go to: https://console.aws.amazon.com/ec2
2. Launch Instance
3. Choose:
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t2.micro (free tier) or t3.small
   - Key pair: Create new or use existing
   - Security Group: Allow ports 22, 80, 443, 5000
4. Launch
5. Copy Public IP
```

**Deploy Application**:
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# Download and run deployment script
curl -o deploy.sh https://raw.githubusercontent.com/moulignanavel/leave-management/main/deploy-aws.sh
chmod +x deploy.sh
./deploy.sh

# Follow same steps as Digital Ocean
```

---

### Step 3: Connect Frontend & Backend (5 minutes)

**Update Frontend Environment**:
```bash
1. Go to Vercel/Netlify dashboard
2. Your project → Settings → Environment Variables
3. Edit REACT_APP_API_URL:
   - Value: http://YOUR_DROPLET_IP (or http://YOUR_EC2_IP)
4. Save and Redeploy
```

**Update Google OAuth**:
```bash
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth 2.0 Client ID
3. Authorized JavaScript origins - Add:
   - https://your-vercel-url.vercel.app
   - http://YOUR_BACKEND_IP
4. Authorized redirect URIs - Add:
   - http://YOUR_BACKEND_IP/api/integrations/google/callback
   - https://your-vercel-url.vercel.app
5. Save
```

**Update MongoDB Network Access**:
```bash
1. Go to: https://cloud.mongodb.com
2. Network Access → Add IP Address
3. Allow Access from Anywhere (0.0.0.0/0)
4. Confirm
```

---

### Step 4: Test Deployment (5 minutes)

**Test Backend**:
```bash
curl http://YOUR_BACKEND_IP/health
# Should return: {"status":"OK",...}
```

**Test Frontend**:
```bash
1. Visit: https://your-vercel-url.vercel.app
2. Should see landing page
3. Click "Get Started" or "Login"
```

**Test Login**:
```bash
Admin: admin@test.com / admin123
Manager: manager@test.com / manager123
Employee: employee1@test.com / employee123
```

**Test Features**:
- [ ] Email/password login
- [ ] Google OAuth login
- [ ] Apply for leave
- [ ] Approve leave (as manager)
- [ ] View dashboards
- [ ] Update profile
- [ ] Search functionality
- [ ] Email notifications

---

## 🎉 DEPLOYMENT COMPLETE!

### Your Live URLs:

**Frontend**: `https://your-app.vercel.app`
**Backend**: `http://YOUR_BACKEND_IP`
**GitHub**: `https://github.com/moulignanavel/leave-management`

### Share with Users:

```
🎉 Leave Management System is Live!

URL: https://your-app.vercel.app

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

Enjoy! 🚀
```

---

## 🔧 MAINTENANCE COMMANDS

### View Backend Logs:
```bash
ssh root@YOUR_BACKEND_IP
pm2 logs leave-backend
```

### Restart Backend:
```bash
ssh root@YOUR_BACKEND_IP
pm2 restart leave-backend
```

### Update Application:
```bash
ssh root@YOUR_BACKEND_IP
cd leave-management
git pull
npm install
pm2 restart leave-backend
```

### Redeploy Frontend:
```bash
# Vercel/Netlify auto-deploys on git push
git add .
git commit -m "Update"
git push origin main
```

### Check Server Status:
```bash
ssh root@YOUR_BACKEND_IP
pm2 status
pm2 monit
sudo systemctl status nginx
```

---

## 📊 OPTIONAL: Add File Storage

### Option A: AWS S3

**Setup**:
```bash
1. Go to: https://console.aws.amazon.com/s3
2. Create bucket: leave-management-files
3. Set permissions: Private
4. Enable CORS
5. Get Access Keys from IAM
```

**Install Dependencies**:
```bash
ssh root@YOUR_BACKEND_IP
cd leave-management
npm install aws-sdk multer
```

**Add to .env**:
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=leave-management-files
```

### Option B: Firebase Storage

**Setup**:
```bash
1. Go to: https://console.firebase.google.com
2. Create project
3. Storage → Get Started
4. Download service account key
```

**Install Dependencies**:
```bash
ssh root@YOUR_BACKEND_IP
cd leave-management
npm install firebase-admin
```

**Add to .env**:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

---

## 🆘 TROUBLESHOOTING

### Frontend Issues:

**Can't connect to backend**:
```bash
✓ Check REACT_APP_API_URL in Vercel/Netlify
✓ Test backend: curl http://YOUR_IP/health
✓ Check CORS in backend server.js
✓ Verify firewall allows port 80/5000
```

**Build fails**:
```bash
✓ Check Node version (should be 18+)
✓ Clear cache and rebuild
✓ Check for missing dependencies
✓ Review build logs
```

### Backend Issues:

**Won't start**:
```bash
ssh root@YOUR_IP
pm2 logs leave-backend
# Check for errors
pm2 restart leave-backend
```

**MongoDB connection failed**:
```bash
✓ Check Network Access in Atlas (allow 0.0.0.0/0)
✓ Verify MONGO_URI in .env
✓ Test connection string
```

**Port issues**:
```bash
sudo ufw status
sudo ufw allow 80
sudo ufw allow 5000
sudo systemctl restart nginx
```

### OAuth Issues:

**Redirect error**:
```bash
✓ Update redirect URIs in Google Console
✓ Add both frontend and backend URLs
✓ Clear browser cache
✓ Check GOOGLE_CLIENT_ID matches
```

---

## 💰 COST SUMMARY

### Free Tier (Testing):
- Frontend: FREE
- Backend: FREE (Render with sleep)
- Database: FREE (MongoDB M0)
- **Total: $0/month**

### Production (Recommended):
- Frontend: FREE
- Backend: $6/month (Digital Ocean)
- Database: FREE (MongoDB M0)
- Storage: ~$1/month (optional)
- **Total: $6-7/month**

### Enterprise:
- Frontend: FREE
- Backend: $24/month (4GB RAM)
- Database: $57/month (MongoDB M10)
- Storage: ~$5/month
- **Total: $86/month**

---

## 📈 SCALING GUIDE

### When to Scale:

**Frontend**: Already on CDN (Vercel/Netlify) ✅

**Backend** - Upgrade when:
- CPU usage >80%
- Memory usage >80%
- Response time >1 second
- >100 concurrent users

**Database** - Upgrade when:
- Storage >400MB (M0 limit)
- Need backups
- Need better performance
- >100 connections

### How to Scale:

**Backend**:
```bash
# Digital Ocean: Resize droplet
1. Power off droplet
2. Resize to 2GB/4GB/8GB
3. Power on

# AWS: Change instance type
1. Stop instance
2. Change instance type
3. Start instance
```

**Database**:
```bash
# MongoDB Atlas
1. Go to cluster
2. Edit configuration
3. Upgrade to M10 ($57/month)
4. Enable backups
```

---

## 🔒 SECURITY CHECKLIST

### Before Going Live:

- [ ] Change JWT_SECRET to random string
- [ ] Update MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Install SSL certificate (Let's Encrypt)
- [ ] Enable firewall (UFW)
- [ ] Install Fail2Ban
- [ ] Disable root SSH login
- [ ] Use SSH keys (not passwords)
- [ ] Enable HTTPS redirect
- [ ] Add security headers
- [ ] Enable rate limiting
- [ ] Regular backups configured
- [ ] Monitor logs daily
- [ ] Update dependencies monthly

---

## 📞 SUPPORT RESOURCES

### Documentation:
- **Quick Start**: [DEPLOY_NOW.md](DEPLOY_NOW.md)
- **Step-by-Step**: [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)
- **Detailed Guide**: [DEPLOY_VERCEL_NETLIFY.md](DEPLOY_VERCEL_NETLIFY.md)
- **Fast Deploy**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- **Credentials**: [YOUR_CREDENTIALS.md](YOUR_CREDENTIALS.md)

### External Resources:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Digital Ocean Docs: https://docs.digitalocean.com
- AWS Docs: https://docs.aws.amazon.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

### Monitoring Tools (Free):
- UptimeRobot: https://uptimerobot.com
- StatusCake: https://www.statuscake.com
- Pingdom: https://www.pingdom.com (free trial)

---

## 🎯 SUCCESS METRICS

Your deployment is successful when:

### Technical:
- ✅ Uptime >99%
- ✅ Page load <3 seconds
- ✅ API response <1 second
- ✅ Zero data loss
- ✅ All features working

### Business:
- ✅ Users can login
- ✅ Leaves can be applied
- ✅ Approvals work
- ✅ Notifications sent
- ✅ Reports generated

### User Experience:
- ✅ Fast and responsive
- ✅ No errors
- ✅ Intuitive navigation
- ✅ Mobile-friendly
- ✅ Professional appearance

---

## 🚀 READY TO DEPLOY?

### Choose Your Path:

**For Production** → [STEP_BY_STEP_DEPLOY.md](STEP_BY_STEP_DEPLOY.md)

**For Quick Test** → [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

**For AWS Users** → [DEPLOY_VERCEL_NETLIFY.md](DEPLOY_VERCEL_NETLIFY.md)

---

**Your Leave Management System will be live in 30 minutes!** 🎉

**Let's deploy!** 🚀
