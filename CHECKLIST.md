# ✅ Setup Checklist

Follow this checklist to get your Leave Management System running:

## 📋 Pre-Setup

- [ ] Node.js installed (v14 or higher)
- [ ] npm installed
- [ ] MongoDB installed OR MongoDB Atlas account created
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

---

## 🔧 Installation Steps

### Step 1: Install Dependencies
- [ ] Run `npm install` in root directory
- [ ] Run `cd frontend && npm install` for frontend
- [ ] OR run `QUICK_START.bat` (Windows)

### Step 2: Database Setup
Choose one option:

**Option A: Local MongoDB**
- [ ] MongoDB installed and running
- [ ] MongoDB service started

**Option B: MongoDB Atlas (Recommended)**
- [ ] Created MongoDB Atlas account
- [ ] Created a free cluster
- [ ] Got connection string
- [ ] Whitelisted IP address (0.0.0.0/0 for development)
- [ ] Created database user

### Step 3: Environment Configuration
- [ ] Created `.env` file in root directory
- [ ] Added `MONGO_URI` (your MongoDB connection string)
- [ ] Added `JWT_SECRET` (any random string)
- [ ] Added `PORT=5000`
- [ ] Added `NODE_ENV=development`

Example .env file:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=mysupersecretkey123
PORT=5000
NODE_ENV=development
```

### Step 4: Create Sample Data
- [ ] Run `npm run seed` to create test users
- [ ] Verify success message in terminal

### Step 5: Start Application
- [ ] Run `npm run dev` in root directory
- [ ] Wait for both servers to start
- [ ] Backend should show "Server running on port 5000"
- [ ] Frontend should show "Compiled successfully"

---

## 🧪 Testing

### Browser Testing
- [ ] Open http://localhost:3000
- [ ] Login page loads correctly
- [ ] Login with admin@test.com / admin123
- [ ] Dashboard loads successfully
- [ ] Navigate to "Apply for Leave"
- [ ] Fill and submit leave form
- [ ] Check "My Leaves" page
- [ ] Logout works

### Manager/Admin Testing
- [ ] Login as manager@test.com / manager123
- [ ] "Pending Approvals" option visible
- [ ] Can see pending leave requests
- [ ] Can approve a leave request
- [ ] Can reject a leave request

### API Testing (Optional)
- [ ] Install REST Client extension OR Postman
- [ ] Open `test-api.http` file
- [ ] Test register endpoint
- [ ] Test login endpoint
- [ ] Test create leave endpoint

---

## 🎨 Customization (Optional)

- [ ] Review Figma design
- [ ] Update colors in `frontend/src/index.css`
- [ ] Modify UI components to match design
- [ ] Add company logo
- [ ] Customize leave types
- [ ] Add additional fields if needed

---

## 🚀 Next Steps

- [ ] Add email notifications
- [ ] Implement calendar view
- [ ] Add reports and analytics
- [ ] Deploy to production
- [ ] Setup CI/CD pipeline

---

## ❌ Troubleshooting Checklist

If something doesn't work:

### Backend Issues
- [ ] Check if MongoDB is running
- [ ] Verify .env file exists and has correct values
- [ ] Check terminal for error messages
- [ ] Verify port 5000 is not in use
- [ ] Run `npm install` again

### Frontend Issues
- [ ] Check if backend is running first
- [ ] Verify frontend dependencies installed
- [ ] Clear browser cache
- [ ] Check browser console for errors
- [ ] Verify port 3000 is not in use

### Database Issues
- [ ] MongoDB service is running (local)
- [ ] Connection string is correct
- [ ] IP is whitelisted (Atlas)
- [ ] Database user has correct permissions
- [ ] Network/firewall not blocking connection

### Login Issues
- [ ] Sample users created (run `npm run seed`)
- [ ] Using correct credentials
- [ ] Backend is running
- [ ] Check browser console for errors

---

## 📞 Help Resources

If you're stuck, check these files:
1. **RUN_PROJECT.md** - Complete guide with solutions
2. **SETUP_GUIDE.md** - Detailed setup instructions
3. **PROJECT_SUMMARY.md** - Project overview
4. **README.md** - Quick reference

---

## ✨ Success Indicators

You'll know everything is working when:
- ✅ No errors in terminal
- ✅ Can login successfully
- ✅ Can create leave requests
- ✅ Can view leave history
- ✅ Managers can approve/reject leaves
- ✅ UI is responsive and looks good

---

**Current Status:** [ ] Not Started | [ ] In Progress | [ ] Complete

**Last Updated:** _______________

**Notes:**
_______________________________________
_______________________________________
_______________________________________
