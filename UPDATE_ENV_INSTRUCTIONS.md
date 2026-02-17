# 📝 How to Update Your .env File

## After you get your MongoDB Atlas connection string:

### Your connection string looks like:
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### You need to modify it:

1. **Replace `<password>` with your actual password** (e.g., `admin123`)
2. **Add `/leave-management` before the `?`**

### Example:

**Before:**
```
mongodb+srv://admin:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**After:**
```
mongodb+srv://admin:admin123@cluster0.abc123.mongodb.net/leave-management?retryWrites=true&w=majority
```

### Update .env file:

Open `.env` file and replace the MONGO_URI line:

```env
MONGO_URI=mongodb+srv://admin:admin123@cluster0.abc123.mongodb.net/leave-management?retryWrites=true&w=majority
JWT_SECRET=mysupersecretkey12345changethis
PORT=5000
NODE_ENV=development
```

### Save the file (Ctrl+S)

### Then run:
```bash
npm run seed
npm run dev
```

---

## Or Just Tell Me Your Connection String

Paste your connection string here and I'll update the .env file for you automatically!
