# Complete Website Testing Checklist

## Website URLs
- **Frontend:** https://leave-management-frontend-five.vercel.app
- **Backend:** https://leave-management-he2w.onrender.com

---

## Test Accounts

### Admin Account
- Email: `admin@test.com`
- Password: `admin123`
- Role: Admin

### Manager Account
- Email: `manager@test.com`
- Password: `manager123`
- Role: Manager

### Employee Accounts
- Email: `employee1@test.com` / Password: `employee123`
- Email: `employee2@test.com` / Password: `employee123`
- Email: `employee3@test.com` / Password: `employee123`

---

## 1. Landing Page Tests ✅

### Desktop View
- [ ] Landing page loads correctly
- [ ] Company logo displays
- [ ] "Sign In" button works → redirects to /login
- [ ] "Get Started" button works → redirects to /register
- [ ] Hero section displays properly
- [ ] Features section shows all 6 features
- [ ] Benefits section shows statistics
- [ ] CTA section displays
- [ ] Footer displays with company info

### Mobile View (< 768px)
- [ ] Responsive header with buttons stacked
- [ ] Hero title and subtitle resize properly
- [ ] Feature cards stack vertically
- [ ] Stats grid shows 2 columns on mobile
- [ ] All buttons are full-width
- [ ] Text is readable on small screens

---

## 2. Authentication Tests ✅

### Login Page
- [ ] Login page loads at /login
- [ ] Email/password form displays
- [ ] Google Sign-In button displays
- [ ] "Forgot Password?" link works
- [ ] "Register here" link works
- [ ] Login with admin@test.com works
- [ ] Login with manager@test.com works
- [ ] Login with employee1@test.com works
- [ ] Invalid credentials show error
- [ ] Successful login redirects to dashboard

### Register Page
- [ ] Register page loads at /register
- [ ] All form fields display (name, email, password, role, department)
- [ ] Form validation works
- [ ] Registration creates new user
- [ ] Redirects to dashboard after registration

### Forgot Password
- [ ] Forgot password page loads
- [ ] Email input field works
- [ ] "Send Reset Code" button works
- [ ] OTP code is sent to email (if email configured)
- [ ] OTP verification works
- [ ] Password reset works
- [ ] Redirects to login after reset

### Google OAuth
- [ ] Google Sign-In button works
- [ ] Google OAuth flow completes
- [ ] User is created/logged in
- [ ] Redirects to dashboard

---

## 3. Admin Dashboard Tests ✅

### Dashboard Access
- [ ] Admin dashboard loads at /dashboard
- [ ] Welcome card shows admin info
- [ ] Profile picture/avatar displays
- [ ] Employee ID displays (if set)
- [ ] Department displays

### Statistics Cards
- [ ] Total Users count displays
- [ ] Total Leaves count displays
- [ ] Pending Leaves count displays
- [ ] Approved Leaves count displays

### Quick Actions
- [ ] "Manage Users" card → /manage-users
- [ ] "Pending Approvals" card → /pending-leaves
- [ ] "Reports & Analytics" card → /reports
- [ ] "Leave Policies" card → /leave-policies
- [ ] "Audit Logs" card → /audit-logs
- [ ] "Apply Leave" card → /apply-leave
- [ ] "My Leaves" card → /my-leaves

### Recent Activity
- [ ] Recent leaves list displays
- [ ] Shows employee name, leave type, dates
- [ ] Status badges show correct colors
- [ ] "View All" button works

---

## 4. Manager Dashboard Tests ✅

### Dashboard Access
- [ ] Manager dashboard loads
- [ ] Welcome card shows manager info
- [ ] Profile picture displays

### Team Statistics
- [ ] Pending Approvals count
- [ ] Approved count
- [ ] Rejected count

### Quick Actions
- [ ] "Pending Approvals" → /pending-leaves
- [ ] "Team Calendar" → /team-calendar
- [ ] "Apply for Leave" → /apply-leave
- [ ] "My Leaves" → /my-leaves

### Pending Team Requests
- [ ] Shows team members' pending leaves
- [ ] Displays employee name, leave type, dates
- [ ] "Review" button → /pending-leaves
- [ ] Shows "No pending requests" if empty

---

## 5. Employee Dashboard Tests ✅

### Dashboard Access
- [ ] Employee dashboard loads
- [ ] Welcome card shows employee info
- [ ] Profile picture displays

### Leave Balance
- [ ] Paid Leave balance displays
- [ ] Sick Leave balance displays
- [ ] Casual Leave balance displays
- [ ] Maternity Leave balance displays
- [ ] Paternity Leave balance displays

### Quick Actions
- [ ] "Apply for Leave" → /apply-leave
- [ ] "My Leaves" → /my-leaves
- [ ] "Team Calendar" → /team-calendar
- [ ] "My Profile" → /profile

### Recent Leaves
- [ ] Shows employee's recent leaves
- [ ] Displays leave type, dates, status
- [ ] Status badges show correct colors

---

## 6. Header Navigation Tests ✅

### Desktop Header
- [ ] Company logo displays
- [ ] Logo click → /dashboard
- [ ] Search bar displays and works
- [ ] Admin sees "Users" button
- [ ] Admin sees "Reports" button
- [ ] Manager sees "Approvals" button
- [ ] Profile avatar displays
- [ ] Profile click → /profile
- [ ] Logout button works
- [ ] Logout redirects to /login

### Mobile Header (< 768px)
- [ ] Hamburger menu icon displays
- [ ] Hamburger menu opens on click
- [ ] Mobile menu shows user profile
- [ ] Mobile menu shows search bar
- [ ] All navigation links work
- [ ] "Dashboard" link works
- [ ] "Apply Leave" link works
- [ ] "My Leaves" link works
- [ ] Admin links show for admin
- [ ] Manager links show for manager
- [ ] Logout button works
- [ ] Menu closes after navigation

---

## 7. Apply Leave Tests ✅

### Page Load
- [ ] Apply leave page loads at /apply-leave
- [ ] Form displays all fields
- [ ] Leave type dropdown works
- [ ] Start date picker works
- [ ] End date picker works
- [ ] Reason textarea works

### Form Validation
- [ ] All fields are required
- [ ] End date must be after start date
- [ ] Shows error for invalid dates
- [ ] Shows error for insufficient balance

### Leave Submission
- [ ] Submit button works
- [ ] Shows success message
- [ ] Leave appears in "My Leaves"
- [ ] Leave balance is NOT deducted (pending)
- [ ] Manager receives notification (if email configured)
- [ ] Employee receives confirmation email

---

## 8. My Leaves Tests ✅

### Page Load
- [ ] My leaves page loads at /my-leaves
- [ ] Shows all user's leaves
- [ ] Displays leave type, dates, duration
- [ ] Shows status badges (pending, approved, rejected)
- [ ] Shows reason
- [ ] Shows approval workflow

### Filtering
- [ ] Can filter by status
- [ ] Can filter by leave type
- [ ] Can filter by date range

### Leave Details
- [ ] Click on leave shows details
- [ ] Shows approver information
- [ ] Shows comments if any
- [ ] Shows calendar event ID if synced

---

## 9. Pending Leaves (Manager/Admin) Tests ✅

### Page Load
- [ ] Pending leaves page loads
- [ ] Shows all pending leaves (admin)
- [ ] Shows only team leaves (manager)
- [ ] Displays employee name, leave type, dates
- [ ] Shows reason

### Approval Actions
- [ ] "Approve" button works
- [ ] "Reject" button works
- [ ] Can add comments
- [ ] Shows confirmation dialog
- [ ] Updates leave status
- [ ] Employee receives email notification
- [ ] Leave disappears from pending list

### Manager Approval
- [ ] Manager approval changes status to "Manager Approved"
- [ ] Leave still shows in admin's pending list
- [ ] Admin can give final approval

### Admin Approval
- [ ] Admin approval changes status to "Approved"
- [ ] Leave balance is deducted
- [ ] Leave syncs to calendar (if configured)
- [ ] Employee receives approval email

---

## 10. Profile Page Tests ✅

### Page Load
- [ ] Profile page loads at /profile
- [ ] Shows user information
- [ ] Shows profile picture/avatar
- [ ] Shows name, email, role
- [ ] Shows employee ID
- [ ] Shows department
- [ ] Shows mobile number

### Profile Update
- [ ] Can update name
- [ ] Can update department
- [ ] Can update mobile number
- [ ] Can update employee ID
- [ ] Save button works
- [ ] Shows success message
- [ ] Changes reflect immediately

### Profile Picture
- [ ] Can upload profile picture
- [ ] Picture preview works
- [ ] Picture saves correctly
- [ ] Picture displays in header

### Password Change
- [ ] Current password field works
- [ ] New password field works
- [ ] Confirm password field works
- [ ] Password validation works
- [ ] Change password button works
- [ ] Shows success message

---

## 11. Manage Users (Admin Only) Tests ✅

### Page Load
- [ ] Manage users page loads
- [ ] Shows all users in table
- [ ] Displays name, email, role, department
- [ ] Shows employee ID
- [ ] Shows status (active/inactive)

### User Actions
- [ ] Can edit user details
- [ ] Can change user role
- [ ] Can assign manager to employee
- [ ] Can deactivate user
- [ ] Can reactivate user
- [ ] Can delete user (with confirmation)

### Add New User
- [ ] "Add User" button works
- [ ] Form displays
- [ ] Can create new user
- [ ] New user appears in list

### Search & Filter
- [ ] Search by name works
- [ ] Search by email works
- [ ] Filter by role works
- [ ] Filter by department works

---

## 12. Reports & Analytics Tests ✅

### Page Load
- [ ] Reports page loads
- [ ] Shows date range selector
- [ ] Shows export buttons

### Leave Statistics
- [ ] Total leaves count
- [ ] Pending leaves count
- [ ] Approved leaves count
- [ ] Rejected leaves count

### Charts & Graphs
- [ ] Leave type distribution chart
- [ ] Monthly leave trends chart
- [ ] Department-wise leave chart
- [ ] Employee leave usage chart

### Export Functionality
- [ ] Export to PDF works
- [ ] Export to Excel works
- [ ] Export to CSV works
- [ ] Downloaded file contains correct data

---

## 13. Team Calendar Tests ✅

### Page Load
- [ ] Team calendar page loads
- [ ] Calendar displays current month
- [ ] Shows team members' leaves

### Calendar Features
- [ ] Can navigate to previous month
- [ ] Can navigate to next month
- [ ] Can jump to specific month
- [ ] Leave days are highlighted
- [ ] Hover shows leave details
- [ ] Different colors for different leave types

### Filters
- [ ] Can filter by team member
- [ ] Can filter by leave type
- [ ] Can filter by status

---

## 14. Leave Policies Tests ✅

### Page Load
- [ ] Leave policies page loads
- [ ] Shows all leave types
- [ ] Displays default balances

### Policy Management (Admin)
- [ ] Can edit leave policy
- [ ] Can change default balance
- [ ] Can add new leave type
- [ ] Can delete leave type
- [ ] Changes save correctly

---

## 15. Audit Logs (Admin Only) Tests ✅

### Page Load
- [ ] Audit logs page loads
- [ ] Shows all system activities
- [ ] Displays timestamp, user, action

### Log Details
- [ ] Shows user who performed action
- [ ] Shows action type (create, update, delete)
- [ ] Shows affected resource
- [ ] Shows old and new values

### Filtering
- [ ] Can filter by date range
- [ ] Can filter by user
- [ ] Can filter by action type
- [ ] Can search logs

---

## 16. Integration Settings Tests ✅

### Page Load
- [ ] Integration settings page loads
- [ ] Shows Google Calendar section
- [ ] Shows Outlook Calendar section
- [ ] Shows Payroll Integration section

### Google Calendar
- [ ] "Connect Google Calendar" button works
- [ ] OAuth flow completes
- [ ] Shows connected status
- [ ] Can disconnect
- [ ] Can sync leaves to calendar

### Outlook Calendar
- [ ] "Connect Outlook Calendar" button works
- [ ] OAuth flow completes
- [ ] Shows connected status
- [ ] Can disconnect

---

## 17. Search Functionality Tests ✅

### Global Search
- [ ] Search bar in header works
- [ ] Can search for employees
- [ ] Can search for leaves
- [ ] Shows search results
- [ ] Click result navigates to detail page

### Search Results
- [ ] Shows employee name and email
- [ ] Shows leave type and dates
- [ ] Shows status
- [ ] Highlights search term

---

## 18. Notification Tests ✅

### Notification Bell
- [ ] Notification bell displays in header
- [ ] Shows unread count badge
- [ ] Click opens notification dropdown
- [ ] Shows recent notifications

### Notification Types
- [ ] Leave request submitted
- [ ] Leave approved
- [ ] Leave rejected
- [ ] Manager approval pending
- [ ] New team member leave request

### Notification Actions
- [ ] Click notification navigates to relevant page
- [ ] Can mark as read
- [ ] Can mark all as read
- [ ] Can delete notification

---

## 19. Email Notifications Tests 📧

### Password Reset
- [ ] Forgot password sends OTP email
- [ ] Email contains 6-digit code
- [ ] Email has proper formatting
- [ ] Code expires after 10 minutes

### Leave Request
- [ ] Employee receives submission confirmation
- [ ] Manager receives new request notification
- [ ] Email contains leave details

### Leave Approval
- [ ] Employee receives approval email
- [ ] Email contains approver name
- [ ] Email contains comments if any

### Leave Rejection
- [ ] Employee receives rejection email
- [ ] Email contains rejection reason

---

## 20. Mobile Responsiveness Tests 📱

### All Pages (< 768px)
- [ ] Landing page is mobile-friendly
- [ ] Login page is mobile-friendly
- [ ] Dashboard is mobile-friendly
- [ ] Apply leave form is mobile-friendly
- [ ] My leaves table scrolls horizontally
- [ ] Profile page is mobile-friendly
- [ ] All buttons are touch-friendly (44px min)
- [ ] Text is readable (16px min)
- [ ] No horizontal scrolling
- [ ] Images scale properly

### Tablet View (768px - 1024px)
- [ ] Layout adjusts for tablet
- [ ] Cards display in 2 columns
- [ ] Navigation is accessible
- [ ] Forms are properly sized

---

## 21. Performance Tests ⚡

### Page Load Times
- [ ] Landing page loads < 3 seconds
- [ ] Dashboard loads < 3 seconds
- [ ] First backend request < 50 seconds (cold start)
- [ ] Subsequent requests < 2 seconds

### Optimization
- [ ] Images are optimized
- [ ] CSS is minified
- [ ] JavaScript is minified
- [ ] No console errors
- [ ] No memory leaks

---

## 22. Security Tests 🔒

### Authentication
- [ ] Cannot access dashboard without login
- [ ] Cannot access admin pages as employee
- [ ] Cannot access manager pages as employee
- [ ] JWT token expires correctly
- [ ] Logout clears session

### Authorization
- [ ] Employee cannot approve leaves
- [ ] Manager cannot access admin features
- [ ] Cannot edit other users' profiles
- [ ] Cannot delete other users' leaves

### Data Protection
- [ ] Passwords are hashed
- [ ] Sensitive data is not exposed in API
- [ ] CORS is properly configured
- [ ] XSS protection is enabled

---

## 23. Error Handling Tests ❌

### Network Errors
- [ ] Shows error message on network failure
- [ ] Shows error on API timeout
- [ ] Shows error on 500 server error
- [ ] Shows error on 404 not found

### Form Errors
- [ ] Shows validation errors
- [ ] Shows error on duplicate email
- [ ] Shows error on insufficient balance
- [ ] Shows error on invalid dates

### User Feedback
- [ ] Success messages display
- [ ] Error messages display
- [ ] Loading spinners show
- [ ] Toast notifications work

---

## 24. Browser Compatibility Tests 🌐

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet
- [ ] Firefox Mobile

---

## Summary

**Total Tests:** ~250+

**Critical Features:**
✅ Authentication & Authorization
✅ Leave Application & Approval
✅ Dashboard Navigation
✅ Mobile Responsiveness
✅ Email Notifications (if configured)
✅ CORS Configuration

**Known Issues:**
- ⚠️ First request takes 30-50 seconds (Render free tier cold start)
- ⚠️ Email notifications require configuration
- ⚠️ Manager approval requires employees to be assigned to manager

---

## Quick Test Script

Run this quick test to verify core functionality:

1. **Landing Page:** Visit homepage → Click "Get Started"
2. **Login:** Login as admin@test.com / admin123
3. **Dashboard:** Verify dashboard loads with stats
4. **Apply Leave:** Apply for 2 days paid leave
5. **My Leaves:** Verify leave appears in list
6. **Logout:** Click logout → Redirects to login
7. **Manager Login:** Login as manager@test.com / manager123
8. **Pending Approvals:** Verify leave appears (if employee assigned)
9. **Approve Leave:** Approve the leave request
10. **Employee Login:** Login as employee → Verify leave is approved

**If all 10 steps work, core functionality is working! ✅**

---

**Last Updated:** February 17, 2026
