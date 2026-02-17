# 🔧 Quick Fix - MongoDB Connection Error

## ✅ Problem Solved!

The `.env` file has been created for you!

---

## What Happened?

You got this error:
```
Error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

**Cause:** The `.env` file was missing, so `MONGO_URI` was undefined.

**Solution:** I've created the `.env` file with default values.

---

## Next Steps (Choose One)

### Option A: Use Local MongoDB (if installed)

1. **Start MongoDB:**
   ```bash
   net start MongoDB
   ```

2. **Run your app:**
   ```bash
   npm run dev
   ```

**That's it!** Your `.env` is already configured for local MongoDB.

---

### Option B: Use MongoDB Atlas (Cloud - Free)

If you don't have MongoDB installed:

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Create free account** and cluster (5 minutes)
3. **Get connection string** (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/
   ```
4. **Update .env file** - Replace the MONGO_URI line with your connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/leave-management
   ```
5. **Run your app:**
   ```bash
   npm run dev
   ```

**Detailed Atlas setup:** See [MONGODB_SETUP.md](MONGODB_SETUP.md)

---

## Verify It's Working

When you run `npm run dev`, you should see:

```
✅ MongoDB Connected: ...
✅ Server running on port 5000
```

If you see this, you're good to go! 🎉

---

## Quick Commands

```bash
# Create test users
npm run seed

# Start the app
npm run dev

# Open in browser
# http://localhost:3000

# Login with
# Email: admin@test.com
# Password: admin123
```

---

## Still Having Issues?

### MongoDB not installed?
→ Use MongoDB Atlas (Option B above)

### Can't connect to Atlas?
→ Check [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed steps

### Other errors?
→ Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## Your Current .env File

```env
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=mysupersecretkey12345changethis
PORT=5000
NODE_ENV=development
```

- ✅ File created
- ✅ Default values set
- ✅ Ready for local MongoDB
- 📝 Update MONGO_URI if using Atlas

---

**You're all set! Try running `npm run dev` now!** 🚀
