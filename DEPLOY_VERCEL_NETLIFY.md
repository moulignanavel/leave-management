# 🚀 Deploy to Vercel/Netlify + AWS/Digital Ocean

## Complete Deployment Guide for Your Tech Stack

### Tech Stack:
- ✅ Frontend: Vercel or Netlify
- ✅ Backend: AWS EC2 or Digital Ocean
- ✅ Database: MongoDB Atlas (already configured!)
- ✅ Storage: AWS S3 or Firebase Storage (optional)

---

## 📋 Prerequisites

### What You Need:
- [x] GitHub account
- [x] Vercel or Netlify account (free)
- [x] AWS or Digital Ocean account
- [x] MongoDB Atlas (already set up!)
- [x] Domain name (optional)
- [x] 30-60 minutes

---

## 🎯 OPTION A: Vercel + Digital Ocean (RECOMMENDED)

### Why This Combo?
- ✅ Easiest to set up
- ✅ Great performance
- ✅ Affordable ($12-20/month)
- ✅ Good for production

---

## Part 1: Deploy Frontend to Vercel (10 minutes)

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Vercel deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/moulignanavel/leave-management.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up** with GitHub
3. **Click "Add New Project"**
4. **Import your repository**
5. **Configure Project**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

6. **Environment Variables** (click "Add"):
   ```
   REACT_APP_API_URL = https://your-backend-url.com (add after backend setup)
   REACT_APP_GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
   ```

7. **Click "Deploy"**

8. **Copy your Vercel URL**: `https://leave-management-xxxx.vercel.app`

---

## Part 2: Deploy Backend to Digital Ocean (20 minutes)

### Step 1: Create Droplet

1. **Go to [digitalocean.com](https://digitalocean.com)**
2. **Sign up** (get $200 credit for 60 days)
3. **Create** → **Droplets**
4. **Choose**:
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic ($6/month - 1GB RAM)
   - Datacenter: Closest to your users
   - Authentication: SSH Key (recommended) or Password
   - Hostname: `leave-backend`

5. **Click "Create Droplet"**
6. **Copy the IP address**: `123.456.789.0`

### Step 2: Connect to Server

```bash
# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# Update system
sudo apt update && sudo apt upgrade -y
```

### Step 3: Install Node.js and Dependencies

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install git -y
```

### Step 4: Clone and Setup Application

```bash
# Clone your repository
git clone https://github.com/YOUR-USERNAME/leave-management.git
cd leave-management

# Install dependencies
npm install

# Create .env file
nano .env
```

**Paste this in .env** (press Ctrl+X, then Y, then Enter to save):
```env
MONGO_URI=mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-production-key-change-this-now
PORT=5000
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://YOUR_DROPLET_IP:5000/api/integrations/google/callback
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### Step 5: Start Backend with PM2

```bash
# Start the application
pm2 start backend/server.js --name leave-backend

# Set PM2 to start on boot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs leave-backend
```

### Step 6: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS, and Node.js port
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000
sudo ufw enable
sudo ufw status
```

### Step 7: Install and Configure Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/leave-backend
```

**Paste this configuration**:
```nginx
server {
    listen 80;
    server_name YOUR_DROPLET_IP;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable the site**:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/leave-backend /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Step 8: Test Backend

```bash
# Test locally
curl http://localhost:5000/health

# Test via Nginx
curl http://YOUR_DROPLET_IP/health
```

**Your backend URL**: `http://YOUR_DROPLET_IP`

---

## Part 3: Connect Frontend to Backend (5 minutes)

### Update Vercel Environment Variables

1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. **Edit** `REACT_APP_API_URL`:
   ```
   REACT_APP_API_URL = http://YOUR_DROPLET_IP
   ```
4. **Redeploy** (Deployments → Click "..." → Redeploy)

---

## Part 4: Update Google OAuth (5 minutes)

### Add Production URLs

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. **Authorized JavaScript origins**:
   ```
   https://your-vercel-url.vercel.app
   http://YOUR_DROPLET_IP
   ```
4. **Authorized redirect URIs**:
   ```
   http://YOUR_DROPLET_IP/api/integrations/google/callback
   https://your-vercel-url.vercel.app
   ```
5. **Save**

---

## Part 5: MongoDB Atlas Network Access (2 minutes)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → **Add IP Address**
3. **Allow Access from Anywhere** (0.0.0.0/0)
4. **Confirm**

---

## Part 6: Install SSL Certificate (Optional - 10 minutes)

### Get a Domain (Optional)

If you have a domain, point it to your droplet IP:
- A Record: `api.yourdomain.com` → `YOUR_DROPLET_IP`

### Install Let's Encrypt SSL

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (if you have a domain)
sudo certbot --nginx -d api.yourdomain.com

# Or for IP-based (self-signed)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt
```

---

## ✅ DEPLOYMENT COMPLETE!

### Your Live URLs:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `http://YOUR_DROPLET_IP`
- **Database**: MongoDB Atlas (already configured)

### Test Your Deployment:

1. Visit your Vercel URL
2. Try logging in:
   - Admin: admin@test.com / admin123
   - Manager: manager@test.com / manager123
   - Employee: employee1@test.com / employee123
3. Test Google OAuth login
4. Apply for leave
5. Check all dashboards

---

## 🎯 OPTION B: Netlify + AWS EC2

### Frontend on Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up** with GitHub
3. **Add new site** → **Import from Git**
4. **Select repository**
5. **Build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
6. **Environment variables**:
   ```
   REACT_APP_API_URL = http://YOUR_EC2_IP
   REACT_APP_GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
   ```
7. **Deploy**

### Backend on AWS EC2

1. **Go to [AWS Console](https://console.aws.amazon.com)**
2. **EC2** → **Launch Instance**
3. **Configure**:
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t2.micro (free tier) or t3.small
   - Key pair: Create new or use existing
   - Security Group: Allow ports 22, 80, 443, 5000
4. **Launch**
5. **Follow same steps as Digital Ocean** (Part 2, Steps 2-8)

---

## 🔧 Maintenance Commands

### Update Application

```bash
# SSH into server
ssh root@YOUR_DROPLET_IP

# Navigate to project
cd leave-management

# Pull latest changes
git pull

# Install new dependencies
npm install

# Restart application
pm2 restart leave-backend

# Check logs
pm2 logs leave-backend
```

### Monitor Application

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs leave-backend

# Monitor resources
pm2 monit

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🆘 Troubleshooting

### Backend not accessible

```bash
# Check if Node.js is running
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check firewall
sudo ufw status

# View logs
pm2 logs leave-backend
sudo tail -f /var/log/nginx/error.log
```

### Frontend can't connect to backend

1. Verify REACT_APP_API_URL in Vercel
2. Check CORS in backend server.js
3. Test backend: `curl http://YOUR_DROPLET_IP/health`
4. Check browser console for errors

### MongoDB connection failed

1. Check Network Access in Atlas (allow 0.0.0.0/0)
2. Verify MONGO_URI in .env
3. Test connection: `pm2 logs leave-backend`

---

## 💰 Cost Breakdown

### Vercel + Digital Ocean:
- Vercel Frontend: **FREE**
- Digital Ocean Droplet (1GB): **$6/month**
- MongoDB Atlas M0: **FREE**
- **Total: $6/month**

### Netlify + AWS EC2:
- Netlify Frontend: **FREE**
- AWS EC2 t2.micro: **FREE** (first year) or **$8/month**
- MongoDB Atlas M0: **FREE**
- **Total: $0-8/month**

### Recommended for Production:
- Frontend: **FREE**
- Backend (4GB RAM): **$24/month**
- MongoDB Atlas M10: **$57/month**
- **Total: $81/month**

---

## 📊 Performance Optimization

### Enable Gzip Compression

Add to Nginx config:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### Enable Caching

Add to Nginx config:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🔐 Security Hardening

### Change Default SSH Port

```bash
sudo nano /etc/ssh/sshd_config
# Change Port 22 to Port 2222
sudo systemctl restart sshd
```

### Disable Root Login

```bash
# Create new user
adduser deploy
usermod -aG sudo deploy

# Disable root login
sudo nano /etc/ssh/sshd_config
# Set PermitRootLogin no
sudo systemctl restart sshd
```

### Install Fail2Ban

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 📈 Monitoring Setup

### Install Uptime Monitor

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add monitor:
   - Type: HTTP(s)
   - URL: `http://YOUR_DROPLET_IP/health`
   - Interval: 5 minutes
3. Add email alerts

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Backend deployed to Digital Ocean/AWS
- [ ] Environment variables configured
- [ ] MongoDB Network Access updated
- [ ] Google OAuth URLs updated
- [ ] SSL certificate installed (optional)
- [ ] Firewall configured
- [ ] PM2 auto-start enabled
- [ ] Nginx configured
- [ ] All features tested
- [ ] Monitoring setup
- [ ] Backup strategy in place

---

## 🎉 Success!

Your Leave Management System is now live!

**Share with users**:
- Frontend: `https://your-app.vercel.app`
- Login credentials provided
- All features working

**Next steps**:
1. Test all features
2. Monitor performance
3. Set up backups
4. Collect user feedback
5. Plan improvements

---

**Need help?** Check the troubleshooting section or deployment logs!

**Congratulations on your deployment!** 🚀
