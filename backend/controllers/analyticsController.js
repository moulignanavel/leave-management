const Leave = require('../models/Leave');
const User = require('../models/User');

// Get employee leave report
const getEmployeeReport = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    
    // Check authorization
    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const leaves = await Leave.find({ userId }).sort('-createdAt');

    // Calculate statistics
    const stats = {
      totalRequests: leaves.length,
      approved: leaves.filter(l => l.status === 'approved').length,
      rejected: leaves.filter(l => l.status === 'rejected').length,
      pending: leaves.filter(l => l.status === 'pending' || l.status === 'managerApproved').length,
      
      byType: {
        paidLeave: leaves.filter(l => l.leaveType === 'paidLeave').length,
        sickLeave: leaves.filter(l => l.leaveType === 'sickLeave').length,
        casualLeave: leaves.filter(l => l.leaveType === 'casualLeave').length,
        maternityLeave: leaves.filter(l => l.leaveType === 'maternityLeave').length,
        paternityLeave: leaves.filter(l => l.leaveType === 'paternityLeave').length
      },

      daysUsed: {
        paidLeave: leaves.filter(l => l.leaveType === 'paidLeave' && l.status === 'approved')
          .reduce((sum, l) => sum + l.duration, 0),
        sickLeave: leaves.filter(l => l.leaveType === 'sickLeave' && l.status === 'approved')
          .reduce((sum, l) => sum + l.duration, 0),
        casualLeave: leaves.filter(l => l.leaveType === 'casualLeave' && l.status === 'approved')
          .reduce((sum, l) => sum + l.duration, 0),
        maternityLeave: leaves.filter(l => l.leaveType === 'maternityLeave' && l.status === 'approved')
          .reduce((sum, l) => sum + l.duration, 0),
        paternityLeave: leaves.filter(l => l.leaveType === 'paternityLeave' && l.status === 'approved')
          .reduce((sum, l) => sum + l.duration, 0)
      },

      currentBalance: user.leaveBalance,
      
      monthlyTrend: getMonthlyTrend(leaves),
      
      averageApprovalTime: calculateAverageApprovalTime(leaves)
    };

    res.json({
      user: {
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role
      },
      stats,
      leaves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get team/department analytics
const getTeamAnalytics = async (req, res) => {
  try {
    let teamMembers;
    
    if (req.user.role === 'manager') {
      // Get manager's team
      teamMembers = await User.find({ managerId: req.user._id });
    } else if (req.user.role === 'admin') {
      // Get all users or filter by department
      const { department } = req.query;
      teamMembers = department 
        ? await User.find({ department, role: 'employee' })
        : await User.find({ role: { $in: ['employee', 'manager'] } });
    } else {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const teamIds = teamMembers.map(m => m._id);
    const leaves = await Leave.find({ userId: { $in: teamIds } })
      .populate('userId', 'name email department');

    // Team statistics
    const stats = {
      teamSize: teamMembers.length,
      totalLeaveRequests: leaves.length,
      
      statusBreakdown: {
        pending: leaves.filter(l => l.status === 'pending').length,
        managerApproved: leaves.filter(l => l.status === 'managerApproved').length,
        approved: leaves.filter(l => l.status === 'approved').length,
        rejected: leaves.filter(l => l.status === 'rejected').length
      },

      leaveTypeBreakdown: {
        paidLeave: leaves.filter(l => l.leaveType === 'paidLeave').length,
        sickLeave: leaves.filter(l => l.leaveType === 'sickLeave').length,
        casualLeave: leaves.filter(l => l.leaveType === 'casualLeave').length,
        maternityLeave: leaves.filter(l => l.leaveType === 'maternityLeave').length,
        paternityLeave: leaves.filter(l => l.leaveType === 'paternityLeave').length
      },

      totalDaysUsed: leaves.filter(l => l.status === 'approved')
        .reduce((sum, l) => sum + l.duration, 0),

      averageDaysPerEmployee: leaves.filter(l => l.status === 'approved')
        .reduce((sum, l) => sum + l.duration, 0) / (teamMembers.length || 1),

      topLeaveUsers: getTopLeaveUsers(leaves, teamMembers),
      
      monthlyTrend: getMonthlyTrend(leaves),
      
      upcomingLeaves: leaves.filter(l => 
        l.status === 'approved' && new Date(l.startDate) >= new Date()
      ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).slice(0, 10),

      departmentBreakdown: getDepartmentBreakdown(leaves, teamMembers)
    };

    res.json({
      teamMembers: teamMembers.map(m => ({
        id: m._id,
        name: m.name,
        email: m.email,
        department: m.department,
        leaveBalance: m.leaveBalance
      })),
      stats,
      leaves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get organization-wide analytics (admin only)
const getOrganizationAnalytics = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const users = await User.find({ role: { $in: ['employee', 'manager'] } });
    const leaves = await Leave.find().populate('userId', 'name email department role');

    const currentYear = new Date().getFullYear();
    const yearLeaves = leaves.filter(l => 
      new Date(l.createdAt).getFullYear() === currentYear
    );

    const stats = {
      totalEmployees: users.length,
      totalLeaveRequests: leaves.length,
      yearToDateRequests: yearLeaves.length,

      statusBreakdown: {
        pending: leaves.filter(l => l.status === 'pending').length,
        managerApproved: leaves.filter(l => l.status === 'managerApproved').length,
        approved: leaves.filter(l => l.status === 'approved').length,
        rejected: leaves.filter(l => l.status === 'rejected').length
      },

      leaveTypeBreakdown: {
        paidLeave: leaves.filter(l => l.leaveType === 'paidLeave' && l.status === 'approved').length,
        sickLeave: leaves.filter(l => l.leaveType === 'sickLeave' && l.status === 'approved').length,
        casualLeave: leaves.filter(l => l.leaveType === 'casualLeave' && l.status === 'approved').length,
        maternityLeave: leaves.filter(l => l.leaveType === 'maternityLeave' && l.status === 'approved').length,
        paternityLeave: leaves.filter(l => l.leaveType === 'paternityLeave' && l.status === 'approved').length
      },

      totalDaysUsed: leaves.filter(l => l.status === 'approved')
        .reduce((sum, l) => sum + l.duration, 0),

      averageApprovalRate: (leaves.filter(l => l.status === 'approved').length / leaves.length * 100).toFixed(2),

      monthlyTrend: getMonthlyTrend(yearLeaves),

      departmentStats: getDepartmentStats(leaves, users),

      peakLeaveMonths: getPeakLeaveMonths(yearLeaves),

      approvalTimeStats: {
        average: calculateAverageApprovalTime(leaves),
        fastest: calculateFastestApproval(leaves),
        slowest: calculateSlowestApproval(leaves)
      }
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions
const getMonthlyTrend = (leaves) => {
  const months = {};
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < 12; i++) {
    const monthName = new Date(currentYear, i, 1).toLocaleString('default', { month: 'short' });
    months[monthName] = {
      requests: 0,
      approved: 0,
      rejected: 0,
      days: 0
    };
  }

  leaves.forEach(leave => {
    const month = new Date(leave.createdAt).toLocaleString('default', { month: 'short' });
    if (months[month]) {
      months[month].requests++;
      if (leave.status === 'approved') {
        months[month].approved++;
        months[month].days += leave.duration;
      } else if (leave.status === 'rejected') {
        months[month].rejected++;
      }
    }
  });

  return months;
};

const getTopLeaveUsers = (leaves, users) => {
  const userLeaveCount = {};
  
  leaves.filter(l => l.status === 'approved').forEach(leave => {
    const userId = leave.userId._id || leave.userId;
    if (!userLeaveCount[userId]) {
      userLeaveCount[userId] = { days: 0, requests: 0 };
    }
    userLeaveCount[userId].days += leave.duration;
    userLeaveCount[userId].requests++;
  });

  return Object.entries(userLeaveCount)
    .map(([userId, data]) => {
      const user = users.find(u => u._id.toString() === userId);
      return {
        userId,
        name: user?.name || 'Unknown',
        department: user?.department,
        ...data
      };
    })
    .sort((a, b) => b.days - a.days)
    .slice(0, 5);
};

const getDepartmentBreakdown = (leaves, users) => {
  const departments = {};
  
  users.forEach(user => {
    const dept = user.department || 'Unassigned';
    if (!departments[dept]) {
      departments[dept] = {
        employees: 0,
        leaves: 0,
        days: 0
      };
    }
    departments[dept].employees++;
  });

  leaves.filter(l => l.status === 'approved').forEach(leave => {
    const user = users.find(u => u._id.toString() === (leave.userId._id || leave.userId).toString());
    const dept = user?.department || 'Unassigned';
    if (departments[dept]) {
      departments[dept].leaves++;
      departments[dept].days += leave.duration;
    }
  });

  return departments;
};

const getDepartmentStats = (leaves, users) => {
  const departments = {};
  
  users.forEach(user => {
    const dept = user.department || 'Unassigned';
    if (!departments[dept]) {
      departments[dept] = {
        employees: 0,
        totalLeaves: 0,
        approvedLeaves: 0,
        totalDays: 0
      };
    }
    departments[dept].employees++;
  });

  leaves.forEach(leave => {
    const userId = leave.userId._id || leave.userId;
    const user = users.find(u => u._id.toString() === userId.toString());
    const dept = user?.department || 'Unassigned';
    
    if (departments[dept]) {
      departments[dept].totalLeaves++;
      if (leave.status === 'approved') {
        departments[dept].approvedLeaves++;
        departments[dept].totalDays += leave.duration;
      }
    }
  });

  return departments;
};

const getPeakLeaveMonths = (leaves) => {
  const monthCounts = {};
  
  leaves.filter(l => l.status === 'approved').forEach(leave => {
    const month = new Date(leave.startDate).toLocaleString('default', { month: 'long' });
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  return Object.entries(monthCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([month, count]) => ({ month, count }));
};

const calculateAverageApprovalTime = (leaves) => {
  const approvedLeaves = leaves.filter(l => l.status === 'approved' && l.approvalWorkflow.length > 0);
  
  if (approvedLeaves.length === 0) return 0;

  const totalTime = approvedLeaves.reduce((sum, leave) => {
    const lastApproval = leave.approvalWorkflow[leave.approvalWorkflow.length - 1];
    if (lastApproval.actionDate) {
      const timeDiff = new Date(lastApproval.actionDate) - new Date(leave.createdAt);
      return sum + timeDiff;
    }
    return sum;
  }, 0);

  const avgMilliseconds = totalTime / approvedLeaves.length;
  return Math.round(avgMilliseconds / (1000 * 60 * 60)); // Convert to hours
};

const calculateFastestApproval = (leaves) => {
  const approvedLeaves = leaves.filter(l => l.status === 'approved' && l.approvalWorkflow.length > 0);
  
  if (approvedLeaves.length === 0) return 0;

  let fastest = Infinity;
  approvedLeaves.forEach(leave => {
    const lastApproval = leave.approvalWorkflow[leave.approvalWorkflow.length - 1];
    if (lastApproval.actionDate) {
      const timeDiff = new Date(lastApproval.actionDate) - new Date(leave.createdAt);
      if (timeDiff < fastest) fastest = timeDiff;
    }
  });

  return Math.round(fastest / (1000 * 60 * 60)); // Convert to hours
};

const calculateSlowestApproval = (leaves) => {
  const approvedLeaves = leaves.filter(l => l.status === 'approved' && l.approvalWorkflow.length > 0);
  
  if (approvedLeaves.length === 0) return 0;

  let slowest = 0;
  approvedLeaves.forEach(leave => {
    const lastApproval = leave.approvalWorkflow[leave.approvalWorkflow.length - 1];
    if (lastApproval.actionDate) {
      const timeDiff = new Date(lastApproval.actionDate) - new Date(leave.createdAt);
      if (timeDiff > slowest) slowest = timeDiff;
    }
  });

  return Math.round(slowest / (1000 * 60 * 60)); // Convert to hours
};

module.exports = {
  getEmployeeReport,
  getTeamAnalytics,
  getOrganizationAnalytics
};
