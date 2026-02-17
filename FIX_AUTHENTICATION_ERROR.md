# 🔧 Fix Authentication/Login Error

## The Problem

You're getting an authentication error when trying to login. This is usually because:
1. Users weren't created in the database
2. MongoDB connection is slow/timing out
3. IP address not whitelisted in MongoDB Atlas

---

## 🎯 Solution: Whitelist Your IP in MongoDB Atlas

### Step 1: Go to MongoDB Atlas

1. Open: https://cloud.mongodb.com
2. Login to your account

### Step 2: Go to Network Access

1. Click **"Network Access"** in the left menu (under Security)
2. You'll see a list of IP addresses

### Step 3: Add Your IP Address

**Option A: Allow All IPs (Easiest for Development)**

1. Click **"Add IP Address"** button
2. Click **"Allow Access from Anywhere"**
3. It will add: `0.0.0.0/0`
4. Click **"Confirm"**

**Option B: Add Your Current IP**

1. Click **"Add IP Address"** button
2. Click **"Add Current IP Address"**
3. Click **"Confirm"**

### Step 4: Wait 2-3 Minutes

MongoDB Atlas needs time to update the firewall rules.

### Step 5: Recreate Users

After waiting, run this command:

```bash
npm run seed
```

You should see:
```
MongoDB Connected
Sample users created successfully!
```

### Step 6: Try Login Again

1. Go to: http://localhost:3000
2. Login with: admin@test.com / admin123

---

## 🔄 Alternative: Check Database Access

### Step 1: Go to Database Access

1. In MongoDB Atlas, click **"Database Access"** (left menu)
2. You'll see your database users

### Step 2: Verify User Exists

Make sure you have a user with:
- Username: `admin`
- Password: `admin123`
- Role: Atlas admin or Read and write to any database

### Step 3: If User Doesn't Exist

1. Click **"Add New Database User"**
2. Username: `admin`
3. Password: `admin123`
4. Built-in Role: **"Atlas admin"**
5. Click **"Add User"**

### Step 4: Update .env if Needed

If you changed the username or password, update your `.env` file:

```env
MONGO_URI=mongodb+srv://admin:admin123@cluster0.owqdzcp.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0
```

---

## 🚀 Quick Fix Steps

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com
2. **Network Access** → Add IP → **"Allow Access from Anywhere"** → Confirm
3. **Wait 2-3 minutes**
4. **Run:** `npm run seed`
5. **Try login:** admin@test.com / admin123

---

## 📋 Detailed Troubleshooting

### Issue 1: "Invalid credentials" Error

**Cause:** User doesn't exist in database or wrong password

**Fix:**
1. Run `npm run seed` to create users
2. Make sure you're using: admin@test.com / admin123
3. Check for typos

### Issue 2: Connection Timeout

**Cause:** IP not whitelisted in MongoDB Atlas

**Fix:**
1. Go to Network Access in Atlas
2. Add 0.0.0.0/0 (allow all)
3. Wait 2-3 minutes
4. Try again

### Issue 3: "MongoServerError: bad auth"

**Cause:** Wrong database username/password in connection string

**Fix:**
1. Go to Database Access in Atlas
2. Verify username is `admin` and password is `admin123`
3. If different, update .env file
4. Restart: `npm run dev`

### Issue 4: Users Not Created

**Cause:** Seed script didn't run successfully

**Fix:**
1. Stop the app: Ctrl + C
2. Run: `npm run seed`
3. Wait for "Sample users created successfully!"
4. Start app: `npm run dev`
5. Try login

---

## 🎯 Step-by-Step Fix

### 1. Whitelist IP Address

```
MongoDB Atlas → Network Access → Add IP Address → 
Allow Access from Anywhere → Confirm
```

### 2. Wait 2-3 Minutes

MongoDB needs time to update firewall.

### 3. Stop Your App

In terminal:
```
Ctrl + C
```

### 4. Create Users

```bash
npm run seed
```

Expected output:
```
MongoDB Connected
Existing users deleted
Sample users created successfully!
```

### 5. Start App

```bash
npm run dev
```

Wait for:
```
[0] Server running on port 5000
[0] MongoDB Connected
[1] Compiled successfully!
```

### 6. Try Login

1. Open: http://localhost:3000
2. Email: admin@test.com
3. Password: admin123
4. Click Login

---

## ✅ Verification

After following the steps, you should be able to:

1. ✅ Run `npm run seed` without timeout
2. ✅ See "MongoDB Connected" in terminal
3. ✅ See "Sample users created successfully!"
4. ✅ Login with admin@test.com / admin123
5. ✅ See the Dashboard after login

---

## 🆘 Still Not Working?

### Check These:

1. **MongoDB Atlas Network Access:**
   - Is 0.0.0.0/0 listed?
   - Is it "Active" (green)?

2. **MongoDB Atlas Database Access:**
   - Does user `admin` exist?
   - Is password `admin123`?
   - Does it have "Atlas admin" role?

3. **Terminal Output:**
   - Does `npm run seed` complete?
   - Does it show "MongoDB Connected"?
   - Any error messages?

4. **Browser Console (F12):**
   - What error message do you see?
   - Copy the exact error text

---

## 📞 Tell Me:

If still not working, tell me:

1. **Did you whitelist IP in MongoDB Atlas?**
   - Yes/No

2. **Can you run `npm run seed` successfully?**
   - Yes/No
   - If no, what error?

3. **What error do you see when trying to login?**
   - "Invalid credentials"
   - "Network error"
   - "Connection timeout"
   - Other (specify)

4. **Browser console error (F12):**
   - Copy the exact error message

---

**Most likely fix: Whitelist IP in MongoDB Atlas Network Access!** 🎯
