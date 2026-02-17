const Leave = require('../models/Leave');
const User = require('../models/User');

// Export employee leave report as CSV
const exportEmployeeReport = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    
    // Check authorization
    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findById(userId);
    const leaves = await Leave.find({ userId })
      .populate('approvedBy', 'name')
      .populate('rejectedBy', 'name')
      .sort('-createdAt');

    // Generate CSV
    const csv = generateEmployeeCSV(user, leaves);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="leave-report-${user.name.replace(/\s+/g, '-')}-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export team analytics as CSV
const exportTeamReport = async (req, res) => {
  try {
    let teamMembers;
    
    if (req.user.role === 'manager') {
      teamMembers = await User.find({ managerId: req.user._id });
    } else if (req.user.role === 'admin') {
      const { department } = req.query;
      teamMembers = department 
        ? await User.find({ department, role: 'employee' })
        : await User.find({ role: { $in: ['employee', 'manager'] } });
    } else {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const teamIds = teamMembers.map(m => m._id);
    const leaves = await Leave.find({ userId: { $in: teamIds } })
      .populate('userId', 'name email department')
      .populate('approvedBy', 'name')
      .sort('-createdAt');

    // Generate CSV
    const csv = generateTeamCSV(teamMembers, leaves);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="team-leave-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export payroll integration report
const exportPayrollReport = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const leaves = await Leave.find({
      status: 'approved',
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) }
    })
    .populate('userId', 'name email department')
    .sort('userId');

    // Generate payroll CSV
    const csv = generatePayrollCSV(leaves, startDate, endDate);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="payroll-report-${startDate}-to-${endDate}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export organization analytics
const exportOrganizationReport = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const users = await User.find({ role: { $in: ['employee', 'manager'] } });
    const leaves = await Leave.find()
      .populate('userId', 'name email department')
      .populate('approvedBy', 'name')
      .sort('-createdAt');

    // Generate comprehensive CSV
    const csv = generateOrganizationCSV(users, leaves);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="organization-leave-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper functions to generate CSV
const generateEmployeeCSV = (user, leaves) => {
  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  let csv = 'Employee Leave Report\n\n';
  csv += `Employee Name,${user.name}\n`;
  csv += `Email,${user.email}\n`;
  csv += `Department,${user.department || 'N/A'}\n`;
  csv += `Report Generated,${new Date().toLocaleString()}\n\n`;

  csv += 'Leave Balance\n';
  csv += 'Leave Type,Available Days\n';
  Object.entries(user.leaveBalance).forEach(([type, balance]) => {
    csv += `${leaveTypes[type]},${balance}\n`;
  });

  csv += '\n\nLeave History\n';
  csv += 'Leave Type,Start Date,End Date,Duration (Days),Status,Reason,Approved By,Comments,Applied On\n';
  
  leaves.forEach(leave => {
    const approver = leave.approvedBy?.name || leave.rejectedBy?.name || 'N/A';
    csv += `"${leaveTypes[leave.leaveType]}",`;
    csv += `"${new Date(leave.startDate).toLocaleDateString()}",`;
    csv += `"${new Date(leave.endDate).toLocaleDateString()}",`;
    csv += `${leave.duration},`;
    csv += `"${leave.status}",`;
    csv += `"${leave.reason.replace(/"/g, '""')}",`;
    csv += `"${approver}",`;
    csv += `"${leave.comments || 'N/A'}",`;
    csv += `"${new Date(leave.createdAt).toLocaleString()}"\n`;
  });

  return csv;
};

const generateTeamCSV = (teamMembers, leaves) => {
  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  let csv = 'Team Leave Report\n\n';
  csv += `Report Generated,${new Date().toLocaleString()}\n`;
  csv += `Team Size,${teamMembers.length}\n`;
  csv += `Total Leave Requests,${leaves.length}\n\n`;

  csv += 'Team Members Summary\n';
  csv += 'Name,Email,Department,Paid Leave,Sick Leave,Casual Leave,Total Leaves Taken\n';
  
  teamMembers.forEach(member => {
    const memberLeaves = leaves.filter(l => 
      (l.userId._id || l.userId).toString() === member._id.toString() && l.status === 'approved'
    );
    const totalDays = memberLeaves.reduce((sum, l) => sum + l.duration, 0);
    
    csv += `"${member.name}",`;
    csv += `"${member.email}",`;
    csv += `"${member.department || 'N/A'}",`;
    csv += `${member.leaveBalance.paidLeave},`;
    csv += `${member.leaveBalance.sickLeave},`;
    csv += `${member.leaveBalance.casualLeave},`;
    csv += `${totalDays}\n`;
  });

  csv += '\n\nDetailed Leave Records\n';
  csv += 'Employee Name,Email,Department,Leave Type,Start Date,End Date,Duration,Status,Reason,Applied On\n';
  
  leaves.forEach(leave => {
    csv += `"${leave.userId?.name || 'Unknown'}",`;
    csv += `"${leave.userId?.email || 'N/A'}",`;
    csv += `"${leave.userId?.department || 'N/A'}",`;
    csv += `"${leaveTypes[leave.leaveType]}",`;
    csv += `"${new Date(leave.startDate).toLocaleDateString()}",`;
    csv += `"${new Date(leave.endDate).toLocaleDateString()}",`;
    csv += `${leave.duration},`;
    csv += `"${leave.status}",`;
    csv += `"${leave.reason.replace(/"/g, '""')}",`;
    csv += `"${new Date(leave.createdAt).toLocaleString()}"\n`;
  });

  return csv;
};

const generatePayrollCSV = (leaves, startDate, endDate) => {
  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  let csv = 'Payroll Integration Report\n\n';
  csv += `Period,${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}\n`;
  csv += `Report Generated,${new Date().toLocaleString()}\n`;
  csv += `Total Approved Leaves,${leaves.length}\n\n`;

  csv += 'Employee ID,Employee Name,Email,Department,Leave Type,Start Date,End Date,Duration (Days),Deduction Required\n';
  
  leaves.forEach(leave => {
    const isPaid = leave.leaveType === 'paidLeave' || leave.leaveType === 'sickLeave';
    csv += `"${leave.userId._id}",`;
    csv += `"${leave.userId.name}",`;
    csv += `"${leave.userId.email}",`;
    csv += `"${leave.userId.department || 'N/A'}",`;
    csv += `"${leaveTypes[leave.leaveType]}",`;
    csv += `"${new Date(leave.startDate).toLocaleDateString()}",`;
    csv += `"${new Date(leave.endDate).toLocaleDateString()}",`;
    csv += `${leave.duration},`;
    csv += `"${isPaid ? 'No' : 'Yes'}"\n`;
  });

  // Summary by employee
  csv += '\n\nEmployee Summary\n';
  csv += 'Employee Name,Email,Total Leave Days,Paid Days,Unpaid Days\n';
  
  const employeeSummary = {};
  leaves.forEach(leave => {
    const empId = leave.userId._id.toString();
    if (!employeeSummary[empId]) {
      employeeSummary[empId] = {
        name: leave.userId.name,
        email: leave.userId.email,
        totalDays: 0,
        paidDays: 0,
        unpaidDays: 0
      };
    }
    
    employeeSummary[empId].totalDays += leave.duration;
    if (leave.leaveType === 'paidLeave' || leave.leaveType === 'sickLeave') {
      employeeSummary[empId].paidDays += leave.duration;
    } else {
      employeeSummary[empId].unpaidDays += leave.duration;
    }
  });

  Object.values(employeeSummary).forEach(emp => {
    csv += `"${emp.name}",`;
    csv += `"${emp.email}",`;
    csv += `${emp.totalDays},`;
    csv += `${emp.paidDays},`;
    csv += `${emp.unpaidDays}\n`;
  });

  return csv;
};

const generateOrganizationCSV = (users, leaves) => {
  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  let csv = 'Organization Leave Report\n\n';
  csv += `Report Generated,${new Date().toLocaleString()}\n`;
  csv += `Total Employees,${users.length}\n`;
  csv += `Total Leave Requests,${leaves.length}\n`;
  csv += `Approved Leaves,${leaves.filter(l => l.status === 'approved').length}\n\n`;

  csv += 'All Leave Records\n';
  csv += 'Employee Name,Email,Department,Leave Type,Start Date,End Date,Duration,Status,Approved By,Applied On,Approved On\n';
  
  leaves.forEach(leave => {
    const approvedDate = leave.approvalWorkflow.length > 0 
      ? new Date(leave.approvalWorkflow[leave.approvalWorkflow.length - 1].actionDate).toLocaleString()
      : 'N/A';
    
    csv += `"${leave.userId?.name || 'Unknown'}",`;
    csv += `"${leave.userId?.email || 'N/A'}",`;
    csv += `"${leave.userId?.department || 'N/A'}",`;
    csv += `"${leaveTypes[leave.leaveType]}",`;
    csv += `"${new Date(leave.startDate).toLocaleDateString()}",`;
    csv += `"${new Date(leave.endDate).toLocaleDateString()}",`;
    csv += `${leave.duration},`;
    csv += `"${leave.status}",`;
    csv += `"${leave.approvedBy?.name || 'N/A'}",`;
    csv += `"${new Date(leave.createdAt).toLocaleString()}",`;
    csv += `"${approvedDate}"\n`;
  });

  return csv;
};

module.exports = {
  exportEmployeeReport,
  exportTeamReport,
  exportPayrollReport,
  exportOrganizationReport
};
