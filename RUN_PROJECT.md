# 🎯 Complete Guide to Run the Leave Management System

## Prerequisites Check
- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] MongoDB installed OR MongoDB Atlas account

---

## 🚀 Method 1: Automated Setup (Recommended for Windows)

### Step 1: Run the Quick Start Script
```bash
QUICK_START.bat
```

This will automatically install all dependencies.

### Step 2: Setup MongoDB

**Option A - Local MongoDB:**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Your connection string: `mongodb://localhost:27017/leave-management`

**Option B - MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

### Step 3: Create .env File
Create a file named `.env` in the root directory:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
NODE_ENV=development
```

If using MongoDB Atlas:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/leave-management
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
NODE_ENV=development
```

### Step 4: Create Sample Users
```bash
npm run seed
```

This creates test users:
- Admin: admin@test.com / admin123
- Manager: manager@test.com / manager123
- Employee: employee1@test.com / employee123

### Step 5: Start the Application
```bash
npm run dev
```

### Step 6: Access the Application
Open your browser and go to: http://localhost:3000

Login with any of the test accounts created above.

---

## 🔧 Method 2: Manual Setup

### Step 1: Install Backend Dependencies
```bash
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 3: Create .env File
(Same as Method 1, Step 3)

### Step 4: Create Sample Users
```bash
npm run seed
```

### Step 5: Start Backend Server
Open Terminal 1:
```bash
npm run server
```

### Step 6: Start Frontend
Open Terminal 2:
```bash
npm run client
```

### Step 7: Access Application
Browser: http://localhost:3000

---

## 📱 Using the Application

### Login
1. Go to http://localhost:3000
2. Enter credentials (use seeded users)
3. Click Login

### Employee Actions
1. **Apply for Leave:**
   - Click "Apply for Leave"
   - Select leave type
   - Choose dates
   - Enter reason
   - Submit

2. **View My Leaves:**
   - Click "My Leaves"
   - See all your leave requests and their status

### Manager/Admin Actions
1. **Approve/Reject Leaves:**
   - Click "Pending Approvals"
   - Review leave requests
   - Click Approve or Reject

---

## 🧪 Testing the API

### Using curl (Command Line)

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"role\":\"employee\",\"department\":\"IT\"}"
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@test.com\",\"password\":\"admin123\"}"
```

### Using Postman or Thunder Client
Import the `test-api.http` file for ready-to-use API requests.

---

## ❌ Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: "MongooseServerSelectionError"
**Solution:**
- Check if MongoDB is running (local)
- Verify MONGO_URI in .env file
- Check internet connection (if using Atlas)
- Whitelist your IP in MongoDB Atlas

### Issue: "Port 5000 already in use"
**Solution:**
Change PORT in .env:
```
PORT=5001
```

### Issue: "Cannot GET /"
**Solution:**
Make sure you're accessing http://localhost:3000 (not 5000)

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console for errors
2. Ensure backend is running
3. Clear browser cache
4. Run `npm install` in frontend folder

---

## 📂 Project Structure
```
leave-management-system/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seedUsers.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── features/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── .env
├── package.json
└── README.md
```

---

## 🎓 Next Steps

1. Customize the UI based on your Figma design
2. Add email notifications
3. Implement calendar view
4. Add reports and analytics
5. Deploy to production

---

## 📞 Need Help?

Check these files:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `START_HERE.md` - Quick start guide
- `test-api.http` - API testing examples

Happy coding! 🚀
