# MongoDB Setup Guide

## ✅ .env File Created!

Your `.env` file has been created with default values.

---

## Choose Your MongoDB Option

### Option 1: Local MongoDB (if installed)

If you have MongoDB installed locally:

1. **Start MongoDB:**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

2. **Verify it's running:**
   ```bash
   # Should connect without errors
   mongosh
   ```

3. **Your .env is already configured for local MongoDB:**
   ```
   MONGO_URI=mongodb://localhost:27017/leave-management
   ```

4. **Run your app:**
   ```bash
   npm run dev
   ```

---

### Option 2: MongoDB Atlas (Cloud - Recommended)

If you don't have MongoDB installed, use the free cloud database:

#### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Choose "Shared" (Free tier)

#### Step 2: Create Cluster
1. Select a cloud provider (AWS recommended)
2. Choose a region close to you
3. Click "Create Cluster" (takes 3-5 minutes)

#### Step 3: Create Database User
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin`
5. Password: `admin123` (or your choice)
6. User Privileges: "Atlas admin"
7. Click "Add User"

#### Step 4: Whitelist IP Address
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Or enter `0.0.0.0/0`
5. Click "Confirm"

#### Step 5: Get Connection String
1. Go back to "Database" (Clusters)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

#### Step 6: Update .env File
Open your `.env` file and replace the MONGO_URI:

```env
MONGO_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/leave-management?retryWrites=true&w=majority
JWT_SECRET=mysupersecretkey12345changethis
PORT=5000
NODE_ENV=development
```

**Important:** 
- Replace `<password>` with your actual password
- Replace `cluster0.xxxxx` with your actual cluster address
- Add `/leave-management` before the `?` to specify database name

#### Step 7: Run Your App
```bash
npm run dev
```

---

## Verify Connection

When your app starts, you should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

If you see this, MongoDB is connected! ✅

---

## Troubleshooting

### Error: "MongooseServerSelectionError"
**Solution:** 
- Check your internet connection
- Verify IP is whitelisted in Atlas (0.0.0.0/0)
- Check username and password are correct
- Make sure you replaced `<password>` in connection string

### Error: "Authentication failed"
**Solution:**
- Go to Database Access in Atlas
- Verify username and password
- Update .env file with correct credentials

### Error: "Network timeout"
**Solution:**
- Check firewall settings
- Verify Network Access in Atlas
- Try different network/disable VPN

---

## Quick Test

After setup, test your connection:

```bash
# Create sample users
npm run seed

# You should see:
# MongoDB Connected: ...
# Sample users created successfully!
```

If you see this, everything is working! ✅

---

## Current .env Configuration

Your `.env` file currently has:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=mysupersecretkey12345changethis
PORT=5000
NODE_ENV=development
```

- If using **local MongoDB**: Keep as is
- If using **MongoDB Atlas**: Update MONGO_URI with your connection string

---

## Next Steps

1. ✅ Choose MongoDB option (local or Atlas)
2. ✅ Update .env if using Atlas
3. ✅ Run `npm run seed` to create test users
4. ✅ Run `npm run dev` to start the app
5. ✅ Open http://localhost:3000
6. ✅ Login with admin@test.com / admin123

---

**Need more help?** Check TROUBLESHOOTING.md
