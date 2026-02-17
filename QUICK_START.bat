@echo off
echo ========================================
echo Leave Management System - Quick Start
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
call npm install express mongoose dotenv cors bcryptjs jsonwebtoken
call npm install -D nodemon concurrently
echo.

echo Step 2: Installing Frontend Dependencies...
cd frontend
call npm install react-scripts @reduxjs/toolkit react-redux react-router-dom axios react-toastify
cd ..
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo IMPORTANT: Before running the application:
echo 1. Create a .env file in the root directory
echo 2. Add your MongoDB connection string
echo 3. Add a JWT secret key
echo.
echo Example .env file:
echo MONGO_URI=mongodb://localhost:27017/leave-management
echo JWT_SECRET=your_secret_key_here
echo PORT=5000
echo.
echo After creating .env file, run:
echo npm run dev
echo.
pause
