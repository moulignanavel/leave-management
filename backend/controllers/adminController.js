const User = require('../models/User');
const Leave = require('../models/Leave');
const LeavePolicy = require('../models/LeavePolicy');
const AuditLog = require('../models/AuditLog');
const bcrypt = require('bcryptjs');

// Helper function to create audit log
const createAuditLog = async (action, performedBy, targetUser, targetResource, details, req) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetUser,
      targetResource,
      details,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      status: 'SUCCESS'
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('managerId', 'name email')
      .sort('-createdAt');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department, managerId } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'employee',
      department,
      managerId: managerId || null
    });

    // Create audit log
    await createAuditLog(
      'USER_CREATED',
      req.user._id,
      user._id,
      { type: 'User', id: user._id },
      { name, email, role, department },
      req
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store old values for audit
    const oldValues = {
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      managerId: user.managerId
    };

    // Update fields
    if (updates.name) user.name = updates.name;
    if (updates.email) user.email = updates.email;
    if (updates.role) user.role = updates.role;
    if (updates.department) user.department = updates.department;
    if (updates.managerId !== undefined) user.managerId = updates.managerId;
    
    // Update leave balance if provided
    if (updates.leaveBalance) {
      user.leaveBalance = { ...user.leaveBalance, ...updates.leaveBalance };
    }

    await user.save();

    // Create audit log
    await createAuditLog(
      'USER_UPDATED',
      req.user._id,
      user._id,
      { type: 'User', id: user._id },
      { oldValues, newValues: updates },
      req
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      leaveBalance: user.leaveBalance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Store user data for audit
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role
    };

    await User.findByIdAndDelete(userId);

    // Create audit log
    await createAuditLog(
      'USER_DELETED',
      req.user._id,
      userId,
      { type: 'User', id: userId },
      userData,
      req
    );

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adjust user leave balance
const adjustLeaveBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { leaveType, amount, reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const oldBalance = user.leaveBalance[leaveType];
    user.leaveBalance[leaveType] = amount;
    await user.save();

    // Create audit log
    await createAuditLog(
      'BALANCE_ADJUSTED',
      req.user._id,
      user._id,
      { type: 'User', id: user._id },
      { leaveType, oldBalance, newBalance: amount, reason },
      req
    );

    res.json({
      message: 'Leave balance adjusted successfully',
      leaveBalance: user.leaveBalance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leave policies
const getLeavePolicies = async (req, res) => {
  try {
    const policies = await LeavePolicy.find()
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort('-createdAt');
    
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create leave policy
const createLeavePolicy = async (req, res) => {
  try {
    const policy = await LeavePolicy.create({
      ...req.body,
      createdBy: req.user._id
    });

    // Create audit log
    await createAuditLog(
      'POLICY_CREATED',
      req.user._id,
      null,
      { type: 'Policy', id: policy._id },
      { name: policy.name, leaveQuotas: policy.leaveQuotas },
      req
    );

    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update leave policy
const updateLeavePolicy = async (req, res) => {
  try {
    const { policyId } = req.params;

    const policy = await LeavePolicy.findByIdAndUpdate(
      policyId,
      { ...req.body, updatedBy: req.user._id },
      { new: true }
    );

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Create audit log
    await createAuditLog(
      'POLICY_UPDATED',
      req.user._id,
      null,
      { type: 'Policy', id: policy._id },
      { updates: req.body },
      req
    );

    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete leave policy
const deleteLeavePolicy = async (req, res) => {
  try {
    const { policyId } = req.params;

    const policy = await LeavePolicy.findByIdAndDelete(policyId);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Create audit log
    await createAuditLog(
      'POLICY_DELETED',
      req.user._id,
      null,
      { type: 'Policy', id: policyId },
      { name: policy.name },
      req
    );

    res.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get audit logs
const getAuditLogs = async (req, res) => {
  try {
    const { action, userId, startDate, endDate, limit = 100 } = req.query;

    let query = {};
    
    if (action) query.action = action;
    if (userId) query.performedBy = userId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const logs = await AuditLog.find(query)
      .populate('performedBy', 'name email role')
      .populate('targetUser', 'name email')
      .sort('-createdAt')
      .limit(parseInt(limit));

    const total = await AuditLog.countDocuments(query);

    res.json({ logs, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get system statistics
const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalManagers = await User.countDocuments({ role: 'manager' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    
    const totalLeaves = await Leave.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: 'pending' });
    const approvedLeaves = await Leave.countDocuments({ status: 'approved' });
    const rejectedLeaves = await Leave.countDocuments({ status: 'rejected' });
    
    const totalPolicies = await LeavePolicy.countDocuments();
    const activePolicies = await LeavePolicy.countDocuments({ isActive: true });
    
    const recentLogs = await AuditLog.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    res.json({
      users: {
        total: totalUsers,
        employees: totalEmployees,
        managers: totalManagers,
        admins: totalAdmins
      },
      leaves: {
        total: totalLeaves,
        pending: pendingLeaves,
        approved: approvedLeaves,
        rejected: rejectedLeaves
      },
      policies: {
        total: totalPolicies,
        active: activePolicies
      },
      audit: {
        last24Hours: recentLogs
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  adjustLeaveBalance,
  getLeavePolicies,
  createLeavePolicy,
  updateLeavePolicy,
  deleteLeavePolicy,
  getAuditLogs,
  getSystemStats
};
