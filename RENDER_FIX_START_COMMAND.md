# 🔧 FIX: Render Start Command Error

## Error: Cannot find module '/opt/render/project/src/server.js'

### The Problem:
Render is looking for `server.js` in the root directory, but your file is in the `backend` folder.

---

## ✅ SOLUTION 1: Update Start Command in Render (FASTEST)

### Step 1: Go to Render Dashboard
1. Open: https://dashboard.render.com
2. Click on: `leave-backend` (or your service name)

### Step 2: Update Start Command
1. Click: "Settings" (left sidebar)
2. Scroll to: "Build & Deploy" section
3. Find: "Start Command"
4. **Current value**: `node server.js` ❌
5. **Change to**: `node backend/server.js` ✅
6. Click: "Save Changes"

### Step 3: Wait for Redeploy
- Service will automatically redeploy
- Wait 2-3 minutes
- Check logs for success

✅ **Fixed!**

---

## ✅ SOLUTION 2: Manual Deploy with Correct Command

### If you're still setting up:

1. **In Render setup page**
2. **Start Command field**, enter:
   ```
   node backend/server.js
   ```
3. **NOT**: `node server.js`
4. Continue with deployment

---

## 🔍 VERIFY IT'S WORKING

### Check Logs:
1. Go to: Render Dashboard → Your service
2. Click: "Logs"
3. Look for:
   ```
   🚀 Server running on port 5000
   📝 Environment: production
   🗄️  Database: Connected
   ```

### Test Health Endpoint:
```
https://YOUR-BACKEND-URL.onrender.com/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Leave Management System API is running",
  "environment": "production"
}
```

---

## 📝 CORRECT CONFIGURATION

### Build Command:
```
npm install
```

### Start Command:
```
node backend/server.js
```

### Root Directory:
```
(Leave empty)
```

---

## 🆘 STILL NOT WORKING?

### Check These:

1. **Start Command is correct**:
   - Must be: `node backend/server.js`
   - NOT: `node server.js`

2. **Build succeeded**:
   - Check logs for "Build successful"
   - No npm install errors

3. **Environment variables set**:
   - All 10 variables added
   - No typos in variable names

4. **Repository connected**:
   - Correct repository selected
   - Branch is `main`

---

## 💡 PRO TIP: Use render.yaml

Add this file to your repository root for automatic configuration:

```yaml
services:
  - type: web
    name: leave-management-backend
    env: node
    buildCommand: npm install
    startCommand: node backend/server.js
    plan: free
```

Then push to GitHub and Render will use these settings automatically!

---

## ✅ CHECKLIST

- [ ] Start command updated to `node backend/server.js`
- [ ] Service redeployed
- [ ] Logs show "Server running"
- [ ] Health endpoint returns OK
- [ ] No errors in logs

---

## 🎉 SUCCESS!

Once you see this in logs:
```
🚀 Server running on port 5000
📝 Environment: production
```

Your backend is live! ✅

**Test it**: `https://YOUR-URL.onrender.com/health`

---

**Need more help?** Check [RENDER_BACKEND_DEPLOY.md](RENDER_BACKEND_DEPLOY.md)
