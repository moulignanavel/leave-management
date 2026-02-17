# 📝 MongoDB in 5 Simple Steps

## No technical knowledge needed!

---

## Step 1: Sign Up (1 minute)

**Go to:** https://www.mongodb.com/cloud/atlas/register

**Click:** "Sign up with Google" (easiest way)

**That's it!** You now have an account.

---

## Step 2: Create Database (2 minutes)

**You'll see:** "Deploy a cloud database"

**Click:** The **FREE** option (says "$0/month")

**Click:** "Create" (green button)

**Wait:** 2-3 minutes

---

## Step 3: Create Login (30 seconds)

**A popup appears!**

**Type:**
- Username: `admin`
- Password: `admin123`

**Click:** "Create User"

---

## Step 4: Allow Access (30 seconds)

**Still in popup:**

**Click:** "Allow Access from Anywhere"

**Click:** "Finish and Close"

---

## Step 5: Get Connection Code (1 minute)

**Click:** "Connect" button

**Click:** "Drivers"

**You'll see a long text like:**
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/...
```

**Click:** "Copy" button

---

## Step 6: Paste in Your Project

**Open file:** `.env` (in your project folder)

**Find line:**
```
MONGO_URI=mongodb://localhost:27017/leave-management
```

**Replace with your copied text, but:**
1. Replace `<password>` with `admin123`
2. Add `/leave-management` before the `?`

**Example:**
```
MONGO_URI=mongodb+srv://admin:admin123@cluster0.abc123.mongodb.net/leave-management?retryWrites=true&w=majority
```

**Save file** (Ctrl+S)

---

## Step 7: Test It!

**Run in terminal:**
```bash
npm run seed
```

**You should see:**
```
MongoDB Connected ✅
Sample users created successfully!
```

**If you see this, YOU DID IT! 🎉**

---

## Now Run Your App

```bash
npm run dev
```

**Open:** http://localhost:3000

**Login:**
- Email: `admin@test.com`
- Password: `admin123`

---

## Need More Help?

**Detailed guide:** Open `CONNECT_MONGODB_EASY.md`

**Or just tell me:** "I'm stuck on step X" and I'll help!

---

## Quick Checklist

- [ ] Signed up at MongoDB Atlas
- [ ] Created free database
- [ ] Created user (admin/admin123)
- [ ] Allowed access from anywhere
- [ ] Copied connection string
- [ ] Updated .env file
- [ ] Replaced `<password>` with `admin123`
- [ ] Added `/leave-management` before `?`
- [ ] Saved .env file
- [ ] Ran `npm run seed`
- [ ] Saw "MongoDB Connected"

**All checked? You're done! 🚀**
