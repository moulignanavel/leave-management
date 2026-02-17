# 🎉 Welcome to Your Leave Management System!

## 📖 What You Have

A complete, working Leave Management System built with the MERN stack. Everything is ready to run!

---

## 🚀 Get Started in 3 Steps

### Step 1: Install Everything (5 minutes)
```bash
npm install
cd frontend
npm install
cd ..
```

### Step 2: Setup Database (2 minutes)
Create a `.env` file:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=mysecretkey123
PORT=5000
```

### Step 3: Run It! (1 minute)
```bash
npm run seed
npm run dev
```

Open http://localhost:3000 and login with:
- **Email:** admin@test.com
- **Password:** admin123

**That's it! You're done!** 🎊

---

## 📚 Documentation Guide

Not sure where to start? Here's what each file does:

### 🎯 Start Here
1. **GET_STARTED.md** (this file) - Quick overview
2. **RUN_PROJECT.md** - Complete setup guide
3. **CHECKLIST.md** - Step-by-step checklist

### 📖 Learn More
4. **PROJECT_SUMMARY.md** - What's included
5. **ARCHITECTURE.md** - How it works
6. **SETUP_GUIDE.md** - Detailed instructions

### 🔧 When You Need Help
7. **TROUBLESHOOTING.md** - Fix common issues
8. **test-api.http** - Test API endpoints

### 📝 Reference
9. **README.md** - Project overview
10. **.env.example** - Environment variables template

---

## 🎮 What Can You Do?

### As Employee
- ✅ Apply for different types of leave
- ✅ View your leave history
- ✅ Track request status (Pending/Approved/Rejected)
- ✅ Check leave balance

### As Manager
- ✅ Everything employees can do, plus:
- ✅ View all pending leave requests
- ✅ Approve or reject leaves
- ✅ Add comments to decisions

### As Admin
- ✅ Everything managers can do, plus:
- ✅ View all users
- ✅ Access system reports
- ✅ Manage leave policies

---

## 🎨 Project Structure

```
leave-management-system/
│
├── 📁 backend/              # Server-side code
│   ├── config/              # Database setup
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & validation
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   └── server.js            # Main server file
│
├── 📁 frontend/             # Client-side code
│   └── src/
│       ├── features/        # Redux state
│       ├── pages/           # React pages
│       └── App.js           # Main component
│
├── 📄 .env                  # Your config (create this)
├── 📄 package.json          # Dependencies
│
└── 📚 Documentation/
    ├── GET_STARTED.md       # ← You are here
    ├── RUN_PROJECT.md       # Complete guide
    ├── CHECKLIST.md         # Setup checklist
    ├── TROUBLESHOOTING.md   # Fix issues
    └── ARCHITECTURE.md      # System design
```

---

## 🎯 Quick Commands

```bash
# Install everything
npm install && cd frontend && npm install && cd ..

# Create sample users
npm run seed

# Run the app (both frontend & backend)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

---

## 🌟 Test Accounts

After running `npm run seed`, you can login with:

| Role     | Email                | Password    |
|----------|----------------------|-------------|
| Admin    | admin@test.com       | admin123    |
| Manager  | manager@test.com     | manager123  |
| Employee | employee1@test.com   | employee123 |

---

## 🎨 Customize for Your Needs

### Match Your Figma Design
1. Open `frontend/src/index.css`
2. Update colors, fonts, spacing
3. Modify components in `frontend/src/pages/`

### Add More Features
- Email notifications
- Calendar integration
- Advanced reports
- Multi-level approvals
- Export to PDF/Excel

---

## 🆘 Need Help?

### Quick Fixes
- **Can't connect to database?** → Check MongoDB is running
- **Port already in use?** → Change PORT in .env
- **Login not working?** → Run `npm run seed`
- **Page is blank?** → Check browser console (F12)

### Detailed Help
- Read **TROUBLESHOOTING.md** for solutions
- Check **RUN_PROJECT.md** for step-by-step guide
- Review **ARCHITECTURE.md** to understand the system

---

## ✅ Success Checklist

You'll know everything is working when:
- [x] No errors in terminal
- [x] Can access http://localhost:3000
- [x] Can login successfully
- [x] Can create a leave request
- [x] Can view leave history
- [x] Managers can approve/reject leaves

---

## 🚀 Next Steps

1. **Run the project** - Follow Step 1-3 above
2. **Test all features** - Try different user roles
3. **Customize UI** - Match your Figma design
4. **Add features** - Email, calendar, reports
5. **Deploy** - Put it online for your team

---

## 🎓 Learning Resources

### Understanding the Code
- **ARCHITECTURE.md** - System design and flow
- **backend/models/** - Database structure
- **frontend/src/features/** - State management
- **backend/routes/** - API endpoints

### Making Changes
- **frontend/src/pages/** - UI components
- **backend/controllers/** - Business logic
- **frontend/src/index.css** - Styling

---

## 💡 Pro Tips

1. **Always start backend first** before frontend
2. **Check both terminals** for error messages
3. **Use browser console (F12)** to debug frontend
4. **Read error messages carefully** - they usually tell you what's wrong
5. **Test with different user roles** to see all features

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just follow the 3 steps at the top of this file and you'll have a working Leave Management System in minutes!

**Questions?** Check the other documentation files or the troubleshooting guide.

**Happy coding!** 🚀

---

**Quick Start Command:**
```bash
npm install && cd frontend && npm install && cd .. && npm run seed && npm run dev
```

Copy and paste this single command to do everything at once!
