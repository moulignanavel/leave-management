# Setup Guide - Leave Management System

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## Step-by-Step Setup

### 1. Install Backend Dependencies
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install -D nodemon concurrently
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install react-scripts @reduxjs/toolkit react-redux react-router-dom axios react-toastify
cd ..
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_secret_key_here_change_this
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/leave-management
```

### 4. Start MongoDB (if using local)
```bash
mongod
```

### 5. Run the Application

Option A - Run both frontend and backend together:
```bash
npm run dev
```

Option B - Run separately:

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Test Users

You'll need to register users first. Here are sample credentials to create:

**Admin User:**
- Email: admin@example.com
- Password: admin123
- Role: admin

**Manager User:**
- Email: manager@example.com
- Password: manager123
- Role: manager

**Employee User:**
- Email: employee@example.com
- Password: employee123
- Role: employee

## Testing the Application

1. Register a new user at the login page
2. Login with credentials
3. Navigate to "Apply for Leave" to create a leave request
4. If you're a manager/admin, check "Pending Approvals" to approve/reject leaves
5. View "My Leaves" to see your leave history

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGO_URI in .env file

**Port Already in Use:**
- Change PORT in .env file
- Or kill the process using the port

**Module Not Found:**
- Run `npm install` in root directory
- Run `npm install` in frontend directory

## Project Structure
```
leave-management-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── features/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── .env
├── package.json
└── README.md
```
