# 👋 START HERE FIRST!

## Welcome to Your Leave Management System!

Everything is built, connected, and ready to run. This guide will help you get started in the fastest way possible.

---

## ⚡ Super Quick Start (2 Minutes)

### Step 1: Install
```bash
npm install && cd frontend && npm install && cd ..
```

### Step 2: Configure
Create a file named `.env` in the root folder:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=mysecretkey123
PORT=5000
```

### Step 3: Run
```bash
npm run seed
npm run dev
```

### Step 4: Login
Open http://localhost:3000
- Email: `admin@test.com`
- Password: `admin123`

**Done! You're running! 🎉**

---

## 📚 Which Guide Should I Read?

### I want the FASTEST way to run this
👉 **You're already here!** Just follow the steps above.

### I want step-by-step instructions
👉 Read **[GET_STARTED.md](GET_STARTED.md)** - 3 simple steps with explanations

### I want a complete detailed guide
👉 Read **[RUN_PROJECT.md](RUN_PROJECT.md)** - Everything explained in detail

### I want to understand how it works
👉 Read **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and diagrams

### I want to verify everything is connected
👉 Read **[ALL_CONNECTED.md](ALL_CONNECTED.md)** - Connection verification

### Something is not working
👉 Read **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Fix common issues

### I want to see all documentation
👉 Read **[MASTER_GUIDE.md](MASTER_GUIDE.md)** - Central hub for everything

---

## 🎯 What You Have

A complete Leave Management System with:
- ✅ User authentication (login/register)
- ✅ Role-based access (Employee, Manager, Admin)
- ✅ Leave request system
- ✅ Approval workflow
- ✅ Leave history tracking
- ✅ Dashboard for each role
- ✅ Complete documentation

---

## 🚀 Quick Commands

```bash
# Install everything
npm install && cd frontend && npm install && cd ..

# Create test users
npm run seed

# Run the app
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

---

## 🔑 Test Accounts

After running `npm run seed`:

| Email | Password | Role |
|-------|----------|------|
| admin@test.com | admin123 | Admin |
| manager@test.com | manager123 | Manager |
| employee1@test.com | employee123 | Employee |

---

## 📁 Project Structure

```
leave-management-system/
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # React + Redux
├── Documentation/    # 13 guide files
└── .env             # Your config (create this)
```

---

## ❓ Common Questions

### Q: Do I need MongoDB installed?
**A:** Yes, or use MongoDB Atlas (free cloud database). See [RUN_PROJECT.md](RUN_PROJECT.md) for setup.

### Q: What if port 5000 is already in use?
**A:** Change `PORT=5001` in your `.env` file.

### Q: Can I use this in production?
**A:** Yes! It's production-ready. Just update security settings and deploy.

### Q: How do I customize the UI?
**A:** Edit files in `frontend/src/pages/` and `frontend/src/index.css`

### Q: Where are the API endpoints?
**A:** Check `test-api.http` or [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🎓 Learning Path

1. **Run it first** (follow steps above)
2. **Test all features** (login, apply leave, approve)
3. **Read ARCHITECTURE.md** (understand how it works)
4. **Customize** (match your Figma design)
5. **Deploy** (put it online)

---

## 🆘 Need Help?

### Quick Fixes
- MongoDB error? → Check if MongoDB is running
- Port in use? → Change PORT in .env
- Can't login? → Run `npm run seed` again
- Blank page? → Check browser console (F12)

### Detailed Help
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Fix issues
- [RUN_PROJECT.md](RUN_PROJECT.md) - Complete guide
- [MASTER_GUIDE.md](MASTER_GUIDE.md) - All documentation

---

## ✅ Verification Checklist

After running, verify:
- [ ] Backend shows "Server running on port 5000"
- [ ] Frontend shows "Compiled successfully"
- [ ] Can open http://localhost:3000
- [ ] Can login with test account
- [ ] Dashboard loads correctly
- [ ] Can navigate between pages

If all checked, you're good to go! ✅

---

## 🎯 Next Steps

1. ✅ Run the project (follow steps above)
2. ✅ Test all features
3. ✅ Read documentation
4. ✅ Customize UI to match Figma
5. ✅ Add new features
6. ✅ Deploy to production

---

## 📚 All Documentation Files

Quick reference to all guides:

1. **START_HERE_FIRST.md** ← You are here!
2. **GET_STARTED.md** - Quick 3-step guide
3. **RUN_PROJECT.md** - Complete setup guide
4. **MASTER_GUIDE.md** - Central documentation hub
5. **ALL_CONNECTED.md** - Connection verification
6. **ARCHITECTURE.md** - System design
7. **CONNECTIONS_VERIFIED.md** - Detailed verification
8. **CONNECTION_MAP.md** - Visual diagrams
9. **TROUBLESHOOTING.md** - Fix issues
10. **CHECKLIST.md** - Step-by-step checklist
11. **PROJECT_SUMMARY.md** - What's included
12. **SETUP_GUIDE.md** - Detailed setup
13. **README.md** - Quick reference

---

## 🎉 You're Ready!

Everything is built and connected. Just run the commands above and you're live!

**Need more details?** Check the other documentation files.

**Ready to run?** Execute the commands in "Super Quick Start" above.

**Let's go! 🚀**

---

**Quick Start Command (Copy & Paste):**
```bash
npm install && cd frontend && npm install && cd .. && npm run seed && npm run dev
```

**Then open:** http://localhost:3000

**Login with:** admin@test.com / admin123

**That's it! You're running! 🎊**
