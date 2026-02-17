# Leave Management System

A comprehensive full-stack leave management application built with MERN stack (MongoDB, Express, React, Node.js).

## 🌐 Live Demo

- **Frontend:** https://leave-management-frontend-five.vercel.app
- **Backend:** https://leave-management-he2w.onrender.com

## 📋 Features

### Core Features
- ✅ Multi-role authentication (Admin, Manager, Employee)
- ✅ Google OAuth integration
- ✅ Leave application and approval workflow
- ✅ Multi-level approval system (Manager → Admin/HR)
- ✅ Real-time leave balance tracking
- ✅ Email notifications for all leave actions
- ✅ Password reset with OTP
- ✅ Profile management with picture upload
- ✅ Mobile-responsive design

### Admin Features
- 👥 User management (CRUD operations)
- 📊 Analytics and reports
- 📋 Leave policy management
- 🔍 Audit logs
- 📈 Organization-wide analytics
- 📤 Export reports (PDF, Excel, CSV)

### Manager Features
- ✅ Team leave approvals
- 📅 Team calendar view
- 📊 Team analytics
- 🔔 Pending approval notifications

### Employee Features
- 📝 Apply for leave
- 📋 View leave history
- 💰 Check leave balance
- 📅 Team calendar
- 🔔 Real-time notifications

### Integrations
- 📧 Email notifications (Gmail/SMTP)
- 📅 Google Calendar sync
- 📅 Outlook Calendar sync
- 🔍 Global search functionality

## 🛠️ Technology Stack

### Frontend
- React 18
- Redux Toolkit (State Management)
- React Router v6
- Axios
- React Toastify
- Deployed on Vercel

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer (Email)
- Deployed on Render

### External Services
- MongoDB Atlas (Database)
- Gmail API (Email)
- Google OAuth 2.0
- Vercel (Frontend Hosting)
- Render (Backend Hosting)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account (for email notifications)
- Google Cloud Console project (for OAuth)

### 1. Clone Repository
```bash
git clone https://github.com/moulignanavel/leave-management.git
cd leave-management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in root directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/integrations/google/callback

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### 4. Run Application

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

Visit: http://localhost:3000

## 🚀 Deployment

### Backend (Render)
1. Create account on Render.com
2. Connect GitHub repository
3. Create Web Service
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Create account on Vercel.com
2. Import GitHub repository
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy

See detailed guides:
- [Email Setup Guide](EMAIL_SETUP_COMPLETE_GUIDE.md)
- [Keep Server Awake](KEEP_SERVER_AWAKE.md)
- [Fix Manager Dashboard](FIX_MANAGER_DASHBOARD.md)

## 👥 Test Accounts

### Admin
- Email: `admin@test.com`
- Password: `admin123`

### Manager
- Email: `manager@test.com`
- Password: `manager123`

### Employee
- Email: `employee1@test.com`
- Password: `employee123`

## 📖 Documentation

- [Architecture](ARCHITECTURE.md) - System architecture and design
- [Technology Stack](TECHNOLOGY_STACK.md) - Detailed tech stack information
- [Testing Checklist](COMPLETE_TESTING_CHECKLIST.md) - Comprehensive testing guide
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions

## 🔧 Configuration

### Email Notifications
1. Enable 2-Step Verification in Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to environment variables

### Google OAuth
1. Create project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized origins and redirect URIs

### MongoDB
1. Create cluster on MongoDB Atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string

## 🐛 Known Issues

### Performance
- First request to backend takes 30-50 seconds (Render free tier cold start)
- Solution: Use cron job to keep server awake (see KEEP_SERVER_AWAKE.md)

### Manager Dashboard
- Employees must be assigned to manager to see pending approvals
- Solution: Run `node backend/assignManagerToEmployees.js`

### Email Notifications
- Requires Gmail App Password configuration
- Solution: See EMAIL_SETUP_COMPLETE_GUIDE.md

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## �‍💻 Author

**Mouli Gnanavel**
- GitHub: [@moulignanavel](https://github.com/moulignanavel)

## 🙏 Acknowledgments

- MS IT Solutions for branding
- All contributors and testers
- Open source community

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- Review [Testing Checklist](COMPLETE_TESTING_CHECKLIST.md)

---

**Built with ❤️ using MERN Stack**
