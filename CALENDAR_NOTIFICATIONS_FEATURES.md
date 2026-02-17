# Calendar & Notifications Features

## Overview
Complete implementation of team calendar, email notifications, and real-time notification system for the Leave Management System.

---

## 1. Team Leave Calendar

### Features

#### Visual Calendar View
- **Monthly Calendar Display**: Full month view with all team leaves
- **Color-Coded Leave Types**: Each leave type has a unique color
- **Interactive Navigation**: Previous/Next month buttons
- **Current Day Highlight**: Today's date highlighted in blue
- **Leave Indicators**: Employee names shown on leave days

#### Calendar Features
- **Multiple Leaves Per Day**: Shows up to 3 leaves per day
- **Overflow Indicator**: "+X more" for days with many leaves
- **Hover Tooltips**: Full employee name and leave type on hover
- **Responsive Grid**: 7-column grid for week days

#### Leave Type Colors
- **Paid Leave**: Blue (#007bff)
- **Sick Leave**: Red (#dc3545)
- **Casual Leave**: Green (#28a745)
- **Maternity Leave**: Pink (#e83e8c)
- **Paternity Leave**: Purple (#6f42c1)

#### Upcoming Leaves List
- Shows next 10 upcoming leaves
- Sorted by start date
- Displays employee name, leave type, dates, and duration
- Quick overview below calendar

#### Access Control
- **Managers**: See only their team members' leaves
- **Admins**: See all employees' leaves
- **Employees**: Can view team calendar (if granted access)

### Usage
1. Navigate to Dashboard
2. Click "Team Calendar"
3. Use Previous/Next buttons to navigate months
4. Click on leave badges to see details
5. Scroll down for upcoming leaves list

---

## 2. Email Notifications

### Notification Types

#### 1. Leave Request Submitted
**Sent to**: Employee
**Trigger**: When employee submits leave request
**Content**:
- Confirmation of submission
- Leave details (type, dates, duration, reason)
- Status: Pending
- Link to "My Leaves" page

#### 2. Manager Notification
**Sent to**: Manager
**Trigger**: When team member submits leave request
**Content**:
- Employee details (name, email, department)
- Leave details (type, dates, duration, reason)
- Action required notice
- Link to "Pending Approvals" page

#### 3. Manager Approval
**Sent to**: Employee
**Trigger**: When manager approves leave
**Content**:
- Approval confirmation
- Status: Manager Approved, Pending HR
- Manager's comments (if any)
- Leave details
- Link to "My Leaves" page

#### 4. Final Approval (HR/Admin)
**Sent to**: Employee
**Trigger**: When HR/Admin gives final approval
**Content**:
- Final approval confirmation
- Status: Approved
- Leave balance deducted
- Approver's comments (if any)
- Leave details
- Link to "My Leaves" page

#### 5. Leave Rejection
**Sent to**: Employee
**Trigger**: When manager or HR rejects leave
**Content**:
- Rejection notice
- Rejector's comments
- Leave details
- Link to "My Leaves" page

#### 6. Approval Reminders
**Sent to**: Managers and Admins
**Trigger**: Manual trigger by admin or scheduled job
**Content**:
- Number of pending approvals
- Reminder to take action
- Link to "Pending Approvals" page

### Email Template Features
- **Professional Design**: Gradient headers, clean layout
- **Color-Coded Status**: Visual status indicators
- **Responsive HTML**: Works on all email clients
- **Action Buttons**: Direct links to relevant pages
- **Complete Details**: All leave information included
- **Branding**: Company logo and footer

### Email Configuration
Uses Gmail SMTP with the credentials from `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## 3. Real-Time Notifications

### Notification Bell Component

#### Features
- **Bell Icon**: Fixed position in top-right corner
- **Unread Badge**: Red badge showing unread count
- **Dropdown Menu**: Click to view notifications
- **Auto-Refresh**: Polls every 30 seconds for new notifications
- **Mark as Read**: Automatically marks as read when opened

#### Notification Types
- **Pending**: ⏳ Yellow indicator
- **Manager Approved**: ✓ Cyan indicator
- **Approved**: ✅ Green indicator
- **Rejected**: ❌ Red indicator

#### Notification Content
- **Icon**: Emoji representing status
- **Message**: Clear status message
- **Timestamp**: When the status changed
- **Color Dot**: Status color indicator
- **Click Action**: Navigate to "My Leaves"

#### Notification Display
- Shows last 7 days of activity
- Sorted by most recent first
- Unread notifications highlighted
- Total count displayed
- "View All Leaves" link at bottom

### Auto-Polling
- Checks for new notifications every 30 seconds
- Updates badge count automatically
- No page refresh required
- Lightweight API calls

---

## 4. API Endpoints

### Notification Endpoints
```
GET /api/notifications/count
- Get pending approval count for current user
- Returns: { count: number }
- Access: Managers and Admins

POST /api/notifications/send-reminders
- Send reminder emails to all approvers
- Returns: { message: string }
- Access: Admin only
```

### Leave Endpoints (Enhanced)
```
POST /api/leaves
- Creates leave and sends notifications
- Notifies employee and manager

PUT /api/leaves/:id
- Updates status and sends notifications
- Notifies employee of status change
```

---

## 5. Notification Flow

### Employee Submits Leave
1. Employee fills leave form
2. System validates balance and dates
3. Leave request created in database
4. **Email sent to employee**: Confirmation
5. **Email sent to manager**: Action required
6. **Notification created**: Pending status

### Manager Approves
1. Manager reviews request
2. Manager clicks "Approve" with comments
3. Status updated to "Manager Approved"
4. **Email sent to employee**: Manager approved
5. **Notification updated**: Manager approved status
6. Request forwarded to HR queue

### HR/Admin Final Approval
1. HR reviews manager-approved request
2. HR clicks "Approve" with comments
3. Status updated to "Approved"
4. Leave balance deducted automatically
5. **Email sent to employee**: Final approval
6. **Notification updated**: Approved status

### Rejection at Any Stage
1. Approver clicks "Reject" with comments
2. Status updated to "Rejected"
3. **Email sent to employee**: Rejection notice
4. **Notification updated**: Rejected status
5. No balance deduction

---

## 6. Technical Implementation

### Backend Services

#### notificationService.js
- `sendLeaveStatusEmail()`: Send status update to employee
- `sendManagerNotification()`: Notify manager of new request
- `sendApprovalReminder()`: Send reminder to approvers

#### leaveController.js (Enhanced)
- Integrated notification calls in create and update functions
- Sends emails on every status change
- Handles both employee and manager notifications

#### notificationRoutes.js
- `/count`: Get pending approval count
- `/send-reminders`: Trigger reminder emails

### Frontend Components

#### NotificationBell.js
- Real-time notification display
- Auto-polling mechanism
- Unread count badge
- Dropdown with notification list

#### TeamCalendar.js
- Calendar generation algorithm
- Leave filtering by date range
- Color-coded leave display
- Month navigation

---

## 7. Configuration

### Email Setup
1. Enable 2-Step Verification on Gmail
2. Generate App Password
3. Update `.env` file:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```
4. Restart server

### Notification Polling
Default: 30 seconds
To change, edit `NotificationBell.js`:
```javascript
const interval = setInterval(fetchNotifications, 30000); // 30 seconds
```

---

## 8. Testing Scenarios

### Test Email Notifications

#### Scenario 1: Complete Approval Flow
1. Login as employee1@test.com
2. Apply for leave
3. Check email: Confirmation received ✓
4. Login as manager@test.com
5. Check email: New request notification ✓
6. Approve the request
7. Check employee email: Manager approval ✓
8. Login as admin@test.com
9. Approve the request
10. Check employee email: Final approval ✓

#### Scenario 2: Rejection Flow
1. Employee applies for leave
2. Manager rejects with comments
3. Check employee email: Rejection notice ✓
4. Verify comments are included ✓

### Test Real-Time Notifications

#### Scenario 1: Notification Bell
1. Login as employee
2. Apply for leave
3. Check notification bell (top-right)
4. See unread badge appear
5. Click bell to view notification
6. Badge clears automatically

#### Scenario 2: Auto-Refresh
1. Login as employee
2. Keep page open
3. Have manager approve leave (different browser)
4. Wait 30 seconds
5. Notification bell updates automatically

### Test Team Calendar

#### Scenario 1: View Team Leaves
1. Login as manager
2. Navigate to "Team Calendar"
3. See current month with team leaves
4. Navigate to next month
5. See future leaves displayed

#### Scenario 2: Multiple Leaves
1. Have 3+ employees on leave same day
2. View calendar
3. See all names displayed
4. See "+X more" if more than 3

---

## 9. Benefits

### For Employees
- **Instant Confirmation**: Email confirmation on submission
- **Status Updates**: Real-time notification of approvals/rejections
- **Transparency**: Know exactly where request stands
- **Comments Visibility**: See feedback from approvers

### For Managers
- **Immediate Alerts**: Email notification of new requests
- **Reminder System**: Don't miss pending approvals
- **Team Visibility**: Calendar shows team availability
- **Quick Action**: Direct links to approval page

### For HR/Admin
- **Centralized Notifications**: All pending requests in one place
- **Reminder System**: Can send reminders to all approvers
- **Calendar Overview**: See organization-wide leave patterns
- **Audit Trail**: All notifications logged

### For Organization
- **Reduced Delays**: Instant notifications speed up approvals
- **Better Planning**: Calendar shows team availability
- **Improved Communication**: Automated status updates
- **Professional Image**: Branded email templates

---

## 10. Future Enhancements

### Planned Features
- **SMS Notifications**: Twilio integration for SMS alerts
- **Push Notifications**: Browser push notifications
- **Slack Integration**: Send notifications to Slack
- **Mobile App**: Native mobile notifications
- **Notification Preferences**: User-configurable notification settings
- **Digest Emails**: Daily/weekly summary emails
- **Calendar Export**: iCal/Google Calendar sync
- **Holiday Integration**: Show public holidays on calendar

### Advanced Features
- **Smart Reminders**: AI-based reminder timing
- **Escalation**: Auto-escalate overdue approvals
- **Analytics**: Notification delivery and open rates
- **A/B Testing**: Test different email templates
- **Multi-language**: Localized notifications

---

## 11. Troubleshooting

### Email Not Sending
**Problem**: Emails not being received
**Solutions**:
- Check `.env` file has correct credentials
- Verify Gmail App Password is correct
- Check spam/junk folder
- Ensure 2-Step Verification is enabled
- Check server console for error messages

### Notifications Not Updating
**Problem**: Notification bell not showing new notifications
**Solutions**:
- Check browser console for errors
- Verify API endpoint is accessible
- Check user token is valid
- Refresh the page
- Clear browser cache

### Calendar Not Loading
**Problem**: Team calendar shows no leaves
**Solutions**:
- Verify user has permission to view calendar
- Check if there are any approved leaves
- Verify API endpoint returns data
- Check browser console for errors

---

## 12. API Response Examples

### Notification Count
```json
{
  "count": 5
}
```

### Leave with Notifications
```json
{
  "_id": "123",
  "userId": "456",
  "leaveType": "paidLeave",
  "status": "managerApproved",
  "duration": 3,
  "startDate": "2026-03-01",
  "endDate": "2026-03-03",
  "approvalWorkflow": [
    {
      "approver": "789",
      "role": "manager",
      "status": "approved",
      "comments": "Approved",
      "actionDate": "2026-02-15T10:30:00Z"
    }
  ]
}
```

---

## 13. Security Considerations

### Email Security
- App passwords used instead of account passwords
- Emails sent over TLS/SSL
- No sensitive data in email subjects
- Links use HTTPS (in production)

### Notification Security
- User can only see their own notifications
- Role-based access control enforced
- API endpoints protected with JWT
- No sensitive data in notification messages

---

## Status
✅ **Fully Implemented and Tested**

**Features Complete**:
- ✅ Team Leave Calendar
- ✅ Email Notifications (All types)
- ✅ Real-time Notification Bell
- ✅ Auto-polling System
- ✅ Approval Reminders
- ✅ Professional Email Templates

**Version**: 3.0
**Last Updated**: February 2026
