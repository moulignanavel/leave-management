# 🔧 Troubleshooting Guide

Common issues and their solutions for the Leave Management System.

---

## 🔴 Installation Issues

### Error: "npm: command not found"
**Problem:** Node.js/npm not installed

**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. Restart your terminal
4. Verify: `node --version` and `npm --version`

### Error: "Cannot find module 'express'"
**Problem:** Dependencies not installed

**Solution:**
```bash
# In root directory
npm install

# In frontend directory
cd frontend
npm install
cd ..
```

---

## 🔴 Database Connection Issues

### Error: "MongooseServerSelectionError: connect ECONNREFUSED"
**Problem:** MongoDB not running or wrong connection string

**Solution for Local MongoDB:**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

**Solution for MongoDB Atlas:**
1. Check your connection string in .env
2. Ensure IP is whitelisted (use 0.0.0.0/0 for testing)
3. Verify database user credentials
4. Check internet connection

### Error: "Authentication failed"
**Problem:** Wrong MongoDB credentials

**Solution:**
1. Go to MongoDB Atlas → Database Access
2. Verify username and password
3. Update connection string in .env
4. Make sure to replace `<password>` with actual password

---

## 🔴 Server Issues

### Error: "Port 5000 already in use"
**Problem:** Another application using port 5000

**Solution 1 - Change Port:**
Edit `.env` file:
```
PORT=5001
```

**Solution 2 - Kill Process:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Error: "Cannot GET /"
**Problem:** Accessing wrong URL

**Solution:**
- Backend API: http://localhost:5000
- Frontend App: http://localhost:3000
- Always use http://localhost:3000 in browser

---

## 🔴 Frontend Issues

### Error: "Proxy error: Could not proxy request"
**Problem:** Backend not running

**Solution:**
1. Make sure backend is running first
2. Check backend terminal for errors
3. Verify backend is on port 5000
4. Restart both servers

### Blank Page / White Screen
**Problem:** JavaScript error or build issue

**Solution:**
1. Open browser console (F12)
2. Check for error messages
3. Clear browser cache (Ctrl+Shift+Delete)
4. Delete `node_modules` and reinstall:
```bash
cd frontend
rm -rf node_modules
npm install
```

### Error: "Failed to fetch" or Network Error
**Problem:** Backend not reachable

**Solution:**
1. Verify backend is running
2. Check backend URL in axios calls
3. Disable browser extensions (ad blockers)
4. Check CORS settings

---

## 🔴 Authentication Issues

### Error: "Invalid credentials"
**Problem:** Wrong email/password or user doesn't exist

**Solution:**
1. Run seed script to create users:
```bash
npm run seed
```
2. Use correct credentials:
   - admin@test.com / admin123
   - manager@test.com / manager123
   - employee1@test.com / employee123

### Error: "Not authorized" or "No token provided"
**Problem:** JWT token issue

**Solution:**
1. Logout and login again
2. Clear localStorage:
   - Open browser console (F12)
   - Type: `localStorage.clear()`
   - Refresh page
3. Check JWT_SECRET in .env file

### Can't Login - Redirects to Login Page
**Problem:** Token not being saved

**Solution:**
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try incognito/private mode
4. Check if cookies are blocked

---

## 🔴 Leave Management Issues

### Can't Create Leave Request
**Problem:** Validation error or backend issue

**Solution:**
1. Check all fields are filled
2. Ensure end date is after start date
3. Open browser console for error details
4. Check backend terminal for errors

### Pending Leaves Not Showing
**Problem:** User role or data issue

**Solution:**
1. Verify logged in as manager or admin
2. Check if any leaves are pending
3. Create a test leave as employee first
4. Check backend logs

### Leave Status Not Updating
**Problem:** API call failing

**Solution:**
1. Check browser console for errors
2. Verify user has manager/admin role
3. Check backend terminal for errors
4. Verify leave ID is correct

---

## 🔴 Development Issues

### Changes Not Reflecting
**Problem:** Cache or build issue

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Restart development server
4. Check if you saved the file

### Hot Reload Not Working
**Problem:** File watcher issue

**Solution:**
1. Restart development server
2. Check file permissions
3. Reduce number of files being watched
4. Use `npm start` instead of `npm run dev`

---

## 🔴 Windows-Specific Issues

### Error: "nodemon: command not found"
**Problem:** nodemon not installed globally

**Solution:**
```bash
npm install -g nodemon
```

Or use npx:
```bash
npx nodemon backend/server.js
```

### Error: "concurrently: command not found"
**Problem:** concurrently not installed

**Solution:**
```bash
npm install
```

Or run separately:
```bash
# Terminal 1
npm run server

# Terminal 2
npm run client
```

### Scripts Not Running
**Problem:** Execution policy on Windows

**Solution:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🔴 MongoDB Atlas Specific

### Can't Connect to Atlas
**Problem:** Network or configuration issue

**Solution:**
1. **Check IP Whitelist:**
   - Go to Network Access
   - Add 0.0.0.0/0 (for development)

2. **Verify Connection String:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```
   - Replace `username` with your username
   - Replace `password` with your password
   - Replace `cluster` with your cluster name
   - Replace `dbname` with database name

3. **Check Database User:**
   - Go to Database Access
   - Ensure user has read/write permissions

### Error: "bad auth: Authentication failed"
**Problem:** Wrong credentials in connection string

**Solution:**
1. Go to Database Access in Atlas
2. Edit user or create new one
3. Copy password carefully
4. Update .env file
5. Restart server

---

## 🔴 General Debugging Steps

### Step 1: Check Logs
- Backend terminal for server errors
- Browser console (F12) for frontend errors
- MongoDB logs for database issues

### Step 2: Verify Environment
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check if MongoDB is running
# (for local MongoDB)
```

### Step 3: Clean Install
```bash
# Remove node_modules
rm -rf node_modules
rm -rf frontend/node_modules

# Remove package-lock
rm package-lock.json
rm frontend/package-lock.json

# Reinstall
npm install
cd frontend && npm install
```

### Step 4: Check File Paths
- Ensure you're in the correct directory
- Verify .env file is in root directory
- Check file permissions

---

## 📞 Still Having Issues?

### Checklist Before Asking for Help:
- [ ] Read error message carefully
- [ ] Checked all terminals for errors
- [ ] Verified .env file exists and is correct
- [ ] Tried restarting servers
- [ ] Cleared browser cache
- [ ] Checked this troubleshooting guide

### Information to Provide:
1. Error message (full text)
2. What you were trying to do
3. Steps you've already tried
4. Operating system
5. Node.js version
6. Screenshots of error

---

## 🎯 Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Can't connect to DB | Check MongoDB is running |
| Port in use | Change PORT in .env |
| Module not found | Run `npm install` |
| Can't login | Run `npm run seed` |
| Blank page | Check browser console |
| Changes not showing | Hard refresh (Ctrl+Shift+R) |
| Backend error | Check backend terminal |
| Frontend error | Check browser console (F12) |

---

**Remember:** Most issues are solved by:
1. Restarting the servers
2. Checking the .env file
3. Running `npm install` again
4. Reading error messages carefully

Good luck! 🚀
