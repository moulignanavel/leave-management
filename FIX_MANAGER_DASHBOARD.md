# Fix Manager Dashboard - Pending Approvals

## Problem
Manager dashboard shows no pending approvals because employees are not assigned to the manager.

## Solution

### Step 1: Assign Employees to Manager

Run this command in your backend directory:

```bash
cd backend
node assignManagerToEmployees.js
```

This will:
- Find the manager user (manager@test.com)
- Find all employee users
- Assign the manager's ID to all employees
- Now when employees apply for leave, it will show in manager's pending approvals

### Step 2: Test the Fix

1. **Login as Employee**:
   - Email: `employee1@test.com`
   - Password: `employee123`
   - Apply for a leave

2. **Login as Manager**:
   - Email: `manager@test.com`
   - Password: `manager123`
   - Check dashboard - you should see the pending approval!

3. **Approve/Reject**:
   - Click "Pending Approvals" or "Review" button
   - Approve or reject the leave request

### Step 3: Create Manager User (if doesn't exist)

If manager@test.com doesn't exist, create it:

```bash
cd backend
node createTestUser.js
```

Select option to create manager user.

---

## How It Works

The system uses a hierarchical approval workflow:

1. **Employee** applies for leave
2. **Manager** (if assigned) approves first → Status: "Manager Approved"
3. **Admin/HR** gives final approval → Status: "Approved"
4. Leave balance is deducted only after final approval

### Manager Assignment

- Each employee has a `managerId` field
- When employee applies for leave, manager gets notified
- Manager sees only their team's leave requests
- Admin sees all leave requests

---

## Quick Commands

### Check if employees have managers assigned:
```bash
# In MongoDB or backend
User.find({ role: 'employee' }).select('name email managerId')
```

### Manually assign a manager to an employee:
```javascript
const employee = await User.findOne({ email: 'employee1@test.com' });
const manager = await User.findOne({ email: 'manager@test.com' });
employee.managerId = manager._id;
await employee.save();
```

---

## Test Accounts

**Admin:**
- Email: admin@test.com
- Password: admin123

**Manager:**
- Email: manager@test.com
- Password: manager123

**Employees:**
- employee1@test.com / employee123
- employee2@test.com / employee123
- employee3@test.com / employee123

---

**After running the script, the manager dashboard will show pending approvals!** ✅
