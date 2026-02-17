#!/bin/bash

# Digital Ocean Droplet Deployment Script for Leave Management System
# Run this script on your droplet after SSH connection

echo "🚀 Starting Leave Management System Deployment on Digital Ocean..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
echo "✅ Node.js version:"
node --version
echo "✅ NPM version:"
npm --version

# Install PM2
echo "📦 Installing PM2 process manager..."
sudo npm install -g pm2

# Install Git
echo "📦 Installing Git..."
sudo apt install git -y

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y

# Configure firewall
echo "🔒 Configuring UFW firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000
echo "y" | sudo ufw enable

# Clone repository
echo "📥 Cloning repository..."
read -p "Enter your GitHub repository URL: " REPO_URL
git clone $REPO_URL leave-management
cd leave-management

# Install dependencies
echo "📦 Installing application dependencies..."
npm install

# Get droplet IP
DROPLET_IP=$(curl -s ifconfig.me)

# Create .env file
echo "⚙️  Creating environment configuration..."
cat > .env << EOF
MONGO_URI=mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=$(openssl rand -base64 32)
PORT=5000
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://${DROPLET_IP}/api/integrations/google/callback
FRONTEND_URL=https://your-frontend-url.vercel.app
EOF

echo "✅ Environment file created with auto-generated JWT secret"
echo "⚠️  Update FRONTEND_URL in .env after deploying frontend"

# Start application with PM2
echo "🚀 Starting application with PM2..."
pm2 start backend/server.js --name leave-backend
pm2 startup
pm2 save

# Configure Nginx
echo "⚙️  Configuring Nginx..."
sudo tee /etc/nginx/sites-available/leave-backend > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/leave-backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Install Fail2Ban for security
echo "🔒 Installing Fail2Ban..."
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Display status
echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📊 Application Status:"
pm2 status
echo ""
echo "🌐 Your backend is running at:"
echo "   http://${DROPLET_IP}"
echo ""
echo "🔑 Auto-generated JWT Secret saved in .env"
echo ""
echo "📝 Next Steps:"
echo "   1. Deploy frontend to Vercel/Netlify"
echo "   2. Update FRONTEND_URL in .env: nano .env"
echo "   3. Restart application: pm2 restart leave-backend"
echo "   4. Update Google OAuth redirect URIs:"
echo "      - Add: http://${DROPLET_IP}/api/integrations/google/callback"
echo "   5. Update MongoDB Atlas Network Access (allow 0.0.0.0/0)"
echo "   6. Test: curl http://${DROPLET_IP}/health"
echo ""
echo "🔧 Useful Commands:"
echo "   pm2 status              - Check application status"
echo "   pm2 logs leave-backend  - View application logs"
echo "   pm2 restart leave-backend - Restart application"
echo "   pm2 monit               - Monitor resources"
echo "   sudo systemctl status nginx - Check Nginx status"
echo "   sudo tail -f /var/log/nginx/error.log - View Nginx logs"
echo ""
echo "🔒 Security:"
echo "   - Firewall configured (UFW)"
echo "   - Fail2Ban installed"
echo "   - Security headers enabled"
echo ""
