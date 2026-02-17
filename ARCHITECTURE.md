# 🏗️ System Architecture

## Overview

This document explains how the Leave Management System works.

---

## 📊 System Flow Diagram

```
┌─────────────┐
│   Browser   │
│ (React App) │
└──────┬──────┘
       │
       │ HTTP Requests
       │ (axios)
       ▼
┌─────────────────┐
│  Express Server │
│   (Port 5000)   │
└────────┬────────┘
         │
         │ Mongoose
         │ Queries
         ▼
┌─────────────────┐
│    MongoDB      │
│   (Database)    │
└─────────────────┘
```

---

## 🔄 Request Flow

### 1. User Login Flow
```
User enters credentials
        ↓
React Login Component
        ↓
Redux Action (login)
        ↓
Axios POST /api/auth/login
        ↓
Express authController
        ↓
MongoDB User.findOne()
        ↓
Password verification (bcrypt)
        ↓
Generate JWT Token
        ↓
Return user data + token
        ↓
Store in Redux + localStorage
        ↓
Redirect to Dashboard
```

### 2. Apply Leave Flow
```
User fills leave form
        ↓
React ApplyLeave Component
        ↓
Redux Action (createLeave)
        ↓
Axios POST /api/leaves
        ↓
Auth Middleware (verify JWT)
        ↓
Express leaveController
        ↓
MongoDB Leave.create()
        ↓
Return leave data
        ↓
Update Redux state
        ↓
Show success message
        ↓
Redirect to My Leaves
```

### 3. Approve Leave Flow (Manager)
```
Manager views pending leaves
        ↓
React PendingLeaves Component
        ↓
Axios GET /api/leaves/pending
        ↓
Auth Middleware (verify JWT + role)
        ↓
Express leaveController
        ↓
MongoDB Leave.find({status: 'pending'})
        ↓
Return pending leaves
        ↓
Manager clicks Approve/Reject
        ↓
Axios PUT /api/leaves/:id
        ↓
Update leave status in DB
        ↓
Refresh pending leaves list
```

---

## 🗂️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (employee/manager/admin),
  department: String,
  managerId: ObjectId (ref: User),
  leaveBalance: {
    paidLeave: Number (default: 20),
    sickLeave: Number (default: 10),
    casualLeave: Number (default: 12)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Leave Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  leaveType: String (paidLeave/sickLeave/etc),
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String (pending/approved/rejected),
  approvedBy: ObjectId (ref: User),
  comments: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────┐
│         User Registration/Login          │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│    Password Hashed with bcrypt (10x)     │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│         User Saved to MongoDB            │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│      JWT Token Generated & Returned      │
│   (Contains: user ID, expires in 30d)   │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│   Token Stored in Redux + localStorage   │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│  Token Sent in Authorization Header      │
│  for All Protected API Requests          │
└──────────────────────────────────────────┘
```

---

## 🛡️ Authorization Levels

```
┌─────────────────────────────────────────┐
│              ADMIN                      │
│  • All Manager permissions              │
│  • Manage all users                     │
│  • View all reports                     │
│  • Define leave policies                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│             MANAGER                     │
│  • All Employee permissions             │
│  • View pending leave requests          │
│  • Approve/Reject leaves                │
│  • View team calendar                   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│            EMPLOYEE                     │
│  • Apply for leave                      │
│  • View own leave history               │
│  • Check leave balance                  │
│  • Track request status                 │
└─────────────────────────────────────────┘
```

---

## 📁 Component Hierarchy

```
App
├── Router
    ├── Login
    │   └── LoginForm
    │
    ├── Dashboard
    │   ├── Header (with Logout)
    │   ├── UserInfo Card
    │   └── Navigation Cards
    │       ├── Apply Leave
    │       ├── My Leaves
    │       └── Pending Approvals (Manager/Admin)
    │
    ├── ApplyLeave
    │   └── LeaveForm
    │       ├── Leave Type Select
    │       ├── Date Inputs
    │       └── Reason Textarea
    │
    ├── MyLeaves
    │   └── LeaveList
    │       └── LeaveCard (multiple)
    │           ├── Leave Details
    │           └── Status Badge
    │
    └── PendingLeaves (Manager/Admin)
        └── PendingLeaveList
            └── PendingLeaveCard (multiple)
                ├── Employee Info
                ├── Leave Details
                └── Action Buttons
                    ├── Approve
                    └── Reject
```

---

## 🔄 Redux State Management

```
Store
├── auth
│   ├── user: { _id, name, email, role, token }
│   ├── isLoading: boolean
│   └── error: string | null
│
└── leave
    ├── leaves: Array<Leave>
    ├── isLoading: boolean
    └── error: string | null
```

### Redux Actions
```
auth/
├── login (async)
├── register (async)
└── logout (sync)

leave/
├── createLeave (async)
├── getMyLeaves (async)
└── updateLeaveStatus (async)
```

---

## 🌐 API Endpoints Structure

```
/api
├── /auth
│   ├── POST /register
│   └── POST /login
│
├── /users
│   └── GET /profile (protected)
│
├── /leaves
│   ├── POST / (protected)
│   ├── GET /my-leaves (protected)
│   ├── GET /pending (protected, manager/admin)
│   └── PUT /:id (protected, manager/admin)
│
└── /admin
    ├── GET /users (protected, admin)
    └── GET /reports (protected, admin)
```

---

## 🔒 Middleware Chain

```
Request
   ↓
CORS Middleware
   ↓
JSON Parser
   ↓
Route Handler
   ↓
Auth Middleware (if protected)
   ├── Verify JWT Token
   ├── Decode User ID
   ├── Fetch User from DB
   └── Attach to req.user
   ↓
Authorization Middleware (if role-based)
   └── Check user.role
   ↓
Controller Function
   ↓
Database Operation
   ↓
Response
   ↓
Error Middleware (if error)
```

---

## 📦 Data Flow Example

### Creating a Leave Request

```
1. Frontend (React)
   ┌─────────────────────────────────┐
   │ User fills form:                │
   │ - Leave Type: Paid Leave        │
   │ - Start: 2026-03-01             │
   │ - End: 2026-03-05               │
   │ - Reason: "Family vacation"     │
   └────────────┬────────────────────┘
                │
                ▼
2. Redux Action
   ┌─────────────────────────────────┐
   │ dispatch(createLeave(formData)) │
   └────────────┬────────────────────┘
                │
                ▼
3. API Call
   ┌─────────────────────────────────┐
   │ POST /api/leaves                │
   │ Headers: {                      │
   │   Authorization: "Bearer token" │
   │ }                               │
   │ Body: { leaveType, dates, ... } │
   └────────────┬────────────────────┘
                │
                ▼
4. Backend Middleware
   ┌─────────────────────────────────┐
   │ • Verify JWT token              │
   │ • Extract user ID               │
   │ • Attach user to request        │
   └────────────┬────────────────────┘
                │
                ▼
5. Controller
   ┌─────────────────────────────────┐
   │ leaveController.createLeave()   │
   │ • Validate data                 │
   │ • Create leave object           │
   └────────────┬────────────────────┘
                │
                ▼
6. Database
   ┌─────────────────────────────────┐
   │ Leave.create({                  │
   │   userId: req.user._id,         │
   │   leaveType: "paidLeave",       │
   │   startDate: "2026-03-01",      │
   │   endDate: "2026-03-05",        │
   │   reason: "Family vacation",    │
   │   status: "pending"             │
   │ })                              │
   └────────────┬────────────────────┘
                │
                ▼
7. Response
   ┌─────────────────────────────────┐
   │ {                               │
   │   _id: "...",                   │
   │   userId: "...",                │
   │   leaveType: "paidLeave",       │
   │   status: "pending",            │
   │   ...                           │
   │ }                               │
   └────────────┬────────────────────┘
                │
                ▼
8. Redux Update
   ┌─────────────────────────────────┐
   │ state.leave.leaves.unshift(     │
   │   action.payload                │
   │ )                               │
   └────────────┬────────────────────┘
                │
                ▼
9. UI Update
   ┌─────────────────────────────────┐
   │ • Show success toast            │
   │ • Navigate to My Leaves         │
   │ • Display new leave in list     │
   └─────────────────────────────────┘
```

---

## 🎯 Key Technologies & Their Roles

| Technology | Purpose | Location |
|------------|---------|----------|
| React | UI Components | Frontend |
| Redux Toolkit | State Management | Frontend |
| React Router | Navigation | Frontend |
| Axios | HTTP Requests | Frontend |
| Express.js | Web Server | Backend |
| Mongoose | MongoDB ODM | Backend |
| JWT | Authentication | Backend |
| bcrypt | Password Hashing | Backend |
| MongoDB | Database | Database |

---

## 🔄 Development vs Production

### Development
```
Frontend (localhost:3000)
    ↓ proxy
Backend (localhost:5000)
    ↓
MongoDB (localhost:27017 or Atlas)
```

### Production
```
Frontend (Vercel/Netlify)
    ↓ HTTPS
Backend (AWS/DigitalOcean)
    ↓ HTTPS
MongoDB Atlas (Cloud)
```

---

This architecture provides a scalable, maintainable foundation for the Leave Management System.
