const Leave = require('../models/Leave');
const User = require('../models/User');
const { sendLeaveStatusEmail, sendManagerNotification } = require('../utils/notificationService');
const { GoogleCalendarSync, OutlookCalendarSync } = require('../utils/calendarSync');

// Calculate number of days between two dates
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
  return diffDays;
};

// Create leave request with balance check
const createLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    
    // Calculate duration
    const duration = calculateDuration(startDate, endDate);
    
    // Get user's leave balance
    const user = await User.findById(req.user._id);
    const balance = user.leaveBalance[leaveType];
    
    // Check if user has sufficient balance
    if (balance < duration) {
      return res.status(400).json({ 
        message: `Insufficient leave balance. Available: ${balance} days, Requested: ${duration} days` 
      });
    }
    
    // Check for overlapping leaves
    const overlappingLeave = await Leave.findOne({
      userId: req.user._id,
      status: { $in: ['pending', 'managerApproved', 'hrApproved', 'approved'] },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });
    
    if (overlappingLeave) {
      return res.status(400).json({ 
        message: 'You already have a leave request for overlapping dates' 
      });
    }
    
    // Create leave request
    const leave = await Leave.create({
      userId: req.user._id,
      leaveType,
      startDate,
      endDate,
      duration,
      reason,
      approvalWorkflow: []
    });
    
    // Send notification to employee
    await sendLeaveStatusEmail(user, leave, 'pending', null);
    
    // Send notification to manager if exists
    if (user.managerId) {
      const manager = await User.findById(user.managerId);
      if (manager) {
        await sendManagerNotification(manager, user, leave);
      }
    }
    
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user._id })
      .populate('approvedBy', 'name email')
      .populate('rejectedBy', 'name email')
      .sort('-createdAt');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending leaves (for managers and admins)
const getPendingLeaves = async (req, res) => {
  try {
    let query = { status: { $in: ['pending', 'managerApproved'] } };
    
    // If manager, show only their team's leaves
    if (req.user.role === 'manager') {
      const teamMembers = await User.find({ managerId: req.user._id });
      const teamIds = teamMembers.map(member => member._id);
      query.userId = { $in: teamIds };
    }
    
    const leaves = await Leave.find(query)
      .populate('userId', 'name email department')
      .populate('approvalWorkflow.approver', 'name email role')
      .sort('-createdAt');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update leave status with multi-level approval
const updateLeaveStatus = async (req, res) => {
  try {
    const { status, comments } = req.body;
    const leave = await Leave.findById(req.params.id).populate('userId');
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    const approverRole = req.user.role;
    
    // Add to approval workflow
    leave.approvalWorkflow.push({
      approver: req.user._id,
      role: approverRole,
      status: status === 'rejected' ? 'rejected' : 'approved',
      comments: comments,
      actionDate: new Date()
    });
    
    // Handle rejection
    if (status === 'rejected') {
      leave.status = 'rejected';
      leave.rejectedBy = req.user._id;
      leave.comments = comments;
      await leave.save();
      
      // Send rejection notification to employee
      const employee = await User.findById(leave.userId._id);
      await sendLeaveStatusEmail(employee, leave, 'rejected', comments);
      
      return res.json(leave);
    }
    
    // Multi-level approval logic
    const employee = await User.findById(leave.userId._id);
    
    if (approverRole === 'manager') {
      leave.status = 'managerApproved';
      leave.comments = comments || 'Approved by manager, pending HR approval';
      
      // Send notification to employee
      await sendLeaveStatusEmail(employee, leave, 'managerApproved', comments);
      
    } else if (approverRole === 'admin' || approverRole === 'hr') {
      // If already manager approved or direct admin approval
      leave.status = 'approved';
      leave.approvedBy = req.user._id;
      leave.comments = comments || 'Approved';
      
      // Deduct leave balance
      employee.leaveBalance[leave.leaveType] -= leave.duration;
      await employee.save();
      
      // Auto-sync to calendar if enabled
      await autoSyncToCalendar(leave, employee);
      
      // Send approval notification to employee
      await sendLeaveStatusEmail(employee, leave, 'approved', comments);
    }
    
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get leave statistics
const getLeaveStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's leave balance
    const user = await User.findById(userId);
    
    // Get leave history
    const leaves = await Leave.find({ userId });
    
    // Calculate statistics
    const stats = {
      balance: user.leaveBalance,
      totalRequests: leaves.length,
      pending: leaves.filter(l => l.status === 'pending' || l.status === 'managerApproved').length,
      approved: leaves.filter(l => l.status === 'approved').length,
      rejected: leaves.filter(l => l.status === 'rejected').length,
      usedLeave: {
        paidLeave: 20 - user.leaveBalance.paidLeave,
        sickLeave: 10 - user.leaveBalance.sickLeave,
        casualLeave: 12 - user.leaveBalance.casualLeave,
        maternityLeave: 180 - user.leaveBalance.maternityLeave,
        paternityLeave: 15 - user.leaveBalance.paternityLeave
      }
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leaves (admin only)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('userId', 'name email department')
      .populate('approvedBy', 'name email')
      .populate('rejectedBy', 'name email')
      .populate('approvalWorkflow.approver', 'name email role')
      .sort('-createdAt');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Auto-sync leave to calendar when approved
const autoSyncToCalendar = async (leave, employee) => {
  try {
    // Check if Google Calendar is enabled
    if (employee.calendarIntegration?.google?.enabled && employee.calendarIntegration.google.accessToken) {
      const googleSync = new GoogleCalendarSync();
      googleSync.initializeClient({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI
      });
      
      googleSync.setCredentials({
        access_token: employee.calendarIntegration.google.accessToken,
        refresh_token: employee.calendarIntegration.google.refreshToken
      });
      
      const result = await googleSync.createLeaveEvent(leave, employee.email);
      
      if (result.success) {
        leave.calendarEventId = result.eventId;
        leave.calendarProvider = 'google';
        await leave.save();
        console.log('Leave synced to Google Calendar:', result.eventId);
      }
    }
    
    // Check if Outlook Calendar is enabled
    if (employee.calendarIntegration?.outlook?.enabled && employee.calendarIntegration.outlook.accessToken) {
      const outlookSync = new OutlookCalendarSync();
      outlookSync.setAccessToken(employee.calendarIntegration.outlook.accessToken);
      
      const result = await outlookSync.createLeaveEvent(leave, employee.email);
      
      if (result.success) {
        leave.calendarEventId = result.eventId;
        leave.calendarProvider = 'outlook';
        await leave.save();
        console.log('Leave synced to Outlook Calendar:', result.eventId);
      }
    }
  } catch (error) {
    console.error('Auto calendar sync failed:', error.message);
    // Don't throw error - calendar sync failure shouldn't block leave approval
  }
};

module.exports = { 
  createLeave, 
  getMyLeaves, 
  getPendingLeaves, 
  updateLeaveStatus,
  getLeaveStats,
  getAllLeaves
};
