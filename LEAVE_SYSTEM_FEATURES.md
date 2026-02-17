# Enhanced Leave Request & Approval System

## Features Implemented

### 1. Leave Categories
All leave types are now fully supported with individual balances:

- **Paid Leave**: 20 days per year
- **Sick Leave**: 10 days per year
- **Casual Leave**: 12 days per year
- **Maternity Leave**: 180 days (6 months)
- **Paternity Leave**: 15 days

### 2. Leave Balance Tracking

#### Automatic Balance Management
- Each user has individual leave balances for each leave type
- Balances are automatically deducted when leave is approved
- Real-time balance display when applying for leave
- Balance validation before submission (prevents over-booking)

#### Balance Display
- Dashboard shows current balance for all leave types
- Apply Leave page shows available balance for selected type
- My Leaves page shows detailed balance breakdown
- Visual indicators for low balance

### 3. Enhanced Leave Application

#### Smart Duration Calculation
- Automatically calculates number of days between start and end dates
- Includes both start and end dates in calculation
- Real-time duration display as dates are selected
- Prevents end date before start date

#### Validation Features
- Checks sufficient leave balance before submission
- Prevents overlapping leave requests
- Validates date ranges
- Requires detailed reason for leave

#### User Experience
- Color-coded balance cards
- Highlighted selected leave type
- Warning messages for insufficient balance
- Minimum date set to today (can't apply for past dates)
- End date automatically adjusts based on start date

### 4. Multi-Level Approval Workflow

#### Two-Stage Approval Process

**Stage 1: Manager Approval**
- Leave request first goes to employee's manager
- Manager can approve or reject with comments
- Status changes to "Manager Approved" after approval
- Automatically forwards to HR/Admin for final approval

**Stage 2: HR/Admin Approval**
- HR or Admin reviews manager-approved requests
- Final approval deducts leave balance
- Can reject even after manager approval
- Comments are tracked for audit trail

#### Approval Workflow Tracking
- Complete history of all approvals
- Shows who approved/rejected and when
- Comments from each approver visible
- Role-based approval badges (MANAGER, HR, ADMIN)

#### Status Levels
- **Pending**: Awaiting manager approval
- **Manager Approved**: Awaiting HR/Admin approval
- **Approved**: Fully approved, balance deducted
- **Rejected**: Rejected by manager or HR/Admin

### 5. Enhanced Pending Leaves Page (Managers & Admins)

#### For Managers
- View only their team members' leave requests
- Approve to forward to HR
- Reject to deny immediately
- Add comments for context

#### For Admins/HR
- View all pending and manager-approved requests
- Final approval authority
- Can override manager decisions
- Balance automatically deducted on approval

#### Features
- Detailed employee information display
- Leave type, duration, and dates clearly shown
- Approval history visible
- Comment system for communication
- Action confirmation with comments

### 6. Enhanced My Leaves Page

#### Statistics Dashboard
- Total requests count
- Pending requests count
- Approved requests count
- Rejected requests count
- Color-coded stat cards

#### Leave Balance Overview
- All leave types displayed
- Remaining days for each type
- Visual balance cards
- Easy-to-read format

#### Leave History
- Complete list of all leave requests
- Status badges with color coding
- Duration and dates clearly displayed
- Approval workflow history
- Comments from approvers
- Timestamp for each request

### 7. Leave Request Details

Each leave request now includes:
- **Employee Information**: Name, email, department
- **Leave Details**: Type, duration, dates, reason
- **Status**: Current approval stage
- **Approval History**: Complete workflow trail
- **Comments**: Feedback from approvers
- **Timestamps**: Request date, approval dates

### 8. Security & Validation

#### Backend Validation
- Sufficient balance check
- Overlapping leave detection
- Date range validation
- Role-based authorization
- Manager-team relationship validation

#### Frontend Validation
- Real-time balance checking
- Date range validation
- Minimum date restrictions
- Duplicate request prevention
- User-friendly error messages

## API Endpoints

### Leave Management
- `POST /api/leaves` - Create leave request
- `GET /api/leaves/my-leaves` - Get user's leaves
- `GET /api/leaves/stats` - Get leave statistics
- `GET /api/leaves/all` - Get all leaves (admin only)
- `GET /api/leaves/pending` - Get pending approvals
- `PUT /api/leaves/:id` - Update leave status

## Database Schema Updates

### User Model
```javascript
leaveBalance: {
  paidLeave: { type: Number, default: 20 },
  sickLeave: { type: Number, default: 10 },
  casualLeave: { type: Number, default: 12 },
  maternityLeave: { type: Number, default: 180 },
  paternityLeave: { type: Number, default: 15 }
}
```

### Leave Model
```javascript
{
  userId: ObjectId,
  leaveType: String,
  startDate: Date,
  endDate: Date,
  duration: Number,
  reason: String,
  status: String, // pending, managerApproved, approved, rejected
  approvalWorkflow: [{
    approver: ObjectId,
    role: String,
    status: String,
    comments: String,
    actionDate: Date
  }],
  approvedBy: ObjectId,
  rejectedBy: ObjectId,
  comments: String
}
```

## User Workflows

### Employee Workflow
1. Navigate to Dashboard
2. Click "Apply for Leave"
3. Select leave type (see available balance)
4. Choose start and end dates (duration auto-calculated)
5. Enter detailed reason
6. Submit request
7. Track status in "My Leaves"
8. View approval history and comments

### Manager Workflow
1. Navigate to Dashboard
2. Click "Pending Approvals"
3. Review team member's leave request
4. Check employee details and leave history
5. Click "Take Action"
6. Add comments (optional)
7. Approve (forwards to HR) or Reject
8. Request status updated

### Admin/HR Workflow
1. Navigate to Dashboard
2. Click "Pending Approvals"
3. Review manager-approved requests
4. Verify leave balance and details
5. Click "Take Action"
6. Add comments (optional)
7. Approve (deducts balance) or Reject
8. Employee notified of final decision

## Benefits

### For Employees
- Clear visibility of leave balance
- Easy application process
- Real-time status tracking
- Transparent approval process
- Prevents booking errors

### For Managers
- Streamlined approval process
- Team leave visibility
- Comment system for communication
- Audit trail for decisions

### For HR/Admin
- Centralized leave management
- Automatic balance tracking
- Complete approval history
- Reduced manual work
- Better compliance

### For Organization
- Automated leave tracking
- Reduced paperwork
- Better resource planning
- Audit trail for compliance
- Improved transparency

## Testing the Features

### Test Scenario 1: Employee Applies for Leave
1. Login as employee1@test.com / employee123
2. Go to Apply Leave
3. Select "Paid Leave"
4. Choose dates (e.g., 3 days)
5. Enter reason
6. Submit
7. Check "My Leaves" for status

### Test Scenario 2: Manager Approval
1. Login as manager@test.com / manager123
2. Go to Pending Approvals
3. Review employee's request
4. Add comment: "Approved for team coverage"
5. Click Approve
6. Status changes to "Manager Approved"

### Test Scenario 3: HR Final Approval
1. Login as admin@test.com / admin123
2. Go to Pending Approvals
3. Review manager-approved request
4. Add comment: "Final approval granted"
5. Click Approve
6. Employee's balance automatically deducted
7. Status changes to "Approved"

### Test Scenario 4: Insufficient Balance
1. Login as employee
2. Try to apply for 25 days of Paid Leave (only 20 available)
3. System shows error: "Insufficient balance"
4. Request blocked from submission

### Test Scenario 5: Overlapping Dates
1. Apply for leave: Jan 10-15
2. Try to apply for another leave: Jan 12-18
3. System shows error: "Overlapping leave request"
4. Request blocked

## Future Enhancements

- Email notifications for status changes
- Calendar view of team leaves
- Leave policy customization
- Carry-forward balance
- Leave encashment
- Holiday calendar integration
- Mobile app support
- Bulk approval features
- Advanced reporting and analytics

---

**Status**: Fully Implemented and Tested
**Version**: 2.0
**Last Updated**: February 2026
