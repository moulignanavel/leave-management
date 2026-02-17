# 🚀 Run Frontend Locally

## Quick Guide to Start Your Frontend

---

## ⚠️ Port 3000 is Already in Use

You have something already running on port 3000. Here's how to fix it:

---

## ✅ SOLUTION 1: Stop the Existing Process (Recommended)

### Option A: Find and Kill the Process

**Open a new terminal and run**:
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# You'll see something like:
# TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345

# Kill the process (replace 12345 with your PID)
taskkill /PID 12345 /F
```

### Option B: Close the Browser Tab

If you have the app already running in a browser tab:
1. Close all browser tabs with `localhost:3000`
2. Go back to the terminal where it's running
3. Press `Ctrl + C` to stop it

---

## ✅ SOLUTION 2: Run on Different Port

**In the frontend folder, run**:
```bash
# Run on port 3001 instead
set PORT=3001 && npm start
```

Or just press `Y` when asked:
```
? Something is already running on port 3000.
Would you like to run the app on another port instead? » (Y/n)
```
Press `Y` and Enter

---

## 🎯 CORRECT COMMANDS

### To Run Frontend:

**From project root**:
```bash
cd frontend
npm start
```

**Or from frontend folder**:
```bash
npm start
```

**NOT** `npm run dev` ❌

---

## 📋 Available Scripts

In the frontend folder, you can run:

### `npm start`
- Runs the app in development mode
- Opens http://localhost:3000
- Hot reload enabled

### `npm run build`
- Builds the app for production
- Creates optimized build in `build` folder

### `npm test`
- Runs tests (if any)

---

## 🔧 If You Want to Run Both Frontend & Backend

### Option 1: Two Terminals

**Terminal 1 (Backend)**:
```bash
# From project root
npm run server
```

**Terminal 2 (Frontend)**:
```bash
# From project root
cd frontend
npm start
```

### Option 2: Use the Dev Script

**From project root**:
```bash
npm run dev
```

This runs both frontend and backend concurrently!

---

## 🌐 Access Your App

Once started, open:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## 🆘 TROUBLESHOOTING

### Port 3000 Still in Use?

**Kill all Node processes**:
```bash
taskkill /F /IM node.exe
```

Then try again:
```bash
cd frontend
npm start
```

### "Module not found" Error?

**Install dependencies**:
```bash
cd frontend
npm install
```

### React Scripts Error?

**Reinstall React Scripts**:
```bash
cd frontend
npm install react-scripts@latest
```

---

## ✅ QUICK START

**Just run these commands**:

```bash
# Kill any existing Node processes
taskkill /F /IM node.exe

# Start frontend
cd frontend
npm start
```

**Your app will open at**: http://localhost:3000

---

## 🎉 SUCCESS!

When you see:
```
Compiled successfully!

You can now view leave-management-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

Your frontend is running! ✅

---

**Need to run backend too?** Open another terminal and run:
```bash
npm run server
```
