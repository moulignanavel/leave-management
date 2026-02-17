#!/bin/bash

# Vercel Frontend Deployment Script
# This script helps deploy the frontend to Vercel

echo "🚀 Vercel Frontend Deployment Helper"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found!"
    echo ""
    echo "Install it with:"
    echo "npm install -g vercel"
    echo ""
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Navigate to frontend directory
cd frontend || exit

echo "📁 Current directory: $(pwd)"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found in frontend/"
    echo ""
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env created"
        echo ""
        echo "⚠️  IMPORTANT: Update .env with your actual values!"
        echo ""
    else
        echo "❌ .env.example not found"
        exit 1
    fi
fi

echo "🔧 Environment Configuration:"
echo "----------------------------"
echo "REACT_APP_API_URL: https://leave-management-he2w.onrender.com"
echo "REACT_APP_GOOGLE_CLIENT_ID: 473868904819-ni5pnun4q5aqjathge9ddk8ei5fqanu9.apps.googleusercontent.com"
echo ""

echo "📦 Installing dependencies..."
npm install
echo ""

echo "🏗️  Building project..."
npm run build
echo ""

if [ -d "build" ]; then
    echo "✅ Build successful!"
    echo ""
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🚀 Ready to deploy!"
echo ""
echo "Choose deployment option:"
echo "1. Deploy to preview (test deployment)"
echo "2. Deploy to production"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🔄 Deploying to preview..."
        vercel
        ;;
    2)
        echo ""
        echo "🚀 Deploying to production..."
        vercel --prod
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy your Vercel URL"
echo "2. Update backend FRONTEND_URL environment variable"
echo "3. Add Vercel URL to Google OAuth console"
echo "4. Test your application!"
echo ""
echo "🎉 Done!"
