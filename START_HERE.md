# 🚀 How to Run This Project

## Quick Start (3 Simple Steps)

### Step 1: Install Dependencies
Run this command in the root folder:
```bash
npm install
```

Then install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

OR use the quick install script:
```bash
QUICK_START.bat
```

### Step 2: Create .env File
Create a file named `.env` in the root directory and add:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=mysecretkey123
PORT=5000
NODE_ENV=development
```

**Don't have MongoDB installed?** Use MongoDB Atlas (free cloud database):
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Replace MONGO_URI with your Atlas connection string

### Step 3: Run the Application
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

## First Time Usage

1. Open http://localhost:3000 in your browser
2. You'll see the login page
3. Since there are no users yet, you need to register via API first

### Register Your First User (Admin)

Open a new terminal and run:
```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Admin User\",\"email\":\"admin@test.com\",\"password\":\"admin123\",\"role\":\"admin\",\"department\":\"Management\"}"
```

Or use Postman/Thunder Client with:
- URL: http://localhost:5000/api/auth/register
- Method: POST
- Body (JSON):
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin",
  "department": "Management"
}
```

4. Now login with:
   - Email: admin@test.com
   - Password: admin123

## What You Can Do

### As Employee:
- Apply for leave
- View your leave history
- Check leave status

### As Manager/Admin:
- All employee features
- Approve/reject leave requests
- View team leave requests

## Troubleshooting

**"Cannot connect to MongoDB"**
- Make sure MongoDB is running (if local)
- Or check your MongoDB Atlas connection string

**"Port 5000 already in use"**
- Change PORT in .env to 5001 or another port

**"Module not found"**
- Run `npm install` in root directory
- Run `npm install` in frontend directory

**Frontend not loading**
- Make sure you're in the root directory
- Run `npm run dev` (not just `npm start`)

## Need Help?
Check SETUP_GUIDE.md for detailed instructions.
