const Leave = require('../models/Leave');
const User = require('../models/User');

/**
 * Payroll Integration Service
 * Provides API endpoints and webhooks for payroll system integration
 */

// Generate payroll data for a specific period
const generatePayrollData = async (startDate, endDate) => {
  try {
    const leaves = await Leave.find({
      status: 'approved',
      startDate: { $gte: new Date(startDate) },
      endDate: { $lte: new Date(endDate) }
    }).populate('userId', 'name email department');

    const payrollData = [];

    // Group by employee
    const employeeLeaves = {};
    leaves.forEach(leave => {
      const empId = leave.userId._id.toString();
      if (!employeeLeaves[empId]) {
        employeeLeaves[empId] = {
          employeeId: empId,
          employeeName: leave.userId.name,
          employeeEmail: leave.userId.email,
          department: leave.userId.department,
          leaves: [],
          totalDays: 0,
          paidDays: 0,
          unpaidDays: 0,
          deductionAmount: 0
        };
      }

      const isPaid = ['paidLeave', 'sickLeave'].includes(leave.leaveType);
      employeeLeaves[empId].leaves.push({
        leaveId: leave._id,
        type: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        duration: leave.duration,
        isPaid: isPaid
      });

      employeeLeaves[empId].totalDays += leave.duration;
      if (isPaid) {
        employeeLeaves[empId].paidDays += leave.duration;
      } else {
        employeeLeaves[empId].unpaidDays += leave.duration;
      }
    });

    // Calculate deductions (assuming daily rate calculation)
    Object.values(employeeLeaves).forEach(emp => {
      // Unpaid leave deduction (this would be calculated based on actual salary)
      // For now, we just mark the days that need deduction
      emp.deductionAmount = emp.unpaidDays; // In real scenario, multiply by daily rate
      payrollData.push(emp);
    });

    return {
      period: { startDate, endDate },
      generatedAt: new Date(),
      totalEmployees: payrollData.length,
      totalLeaveDays: payrollData.reduce((sum, emp) => sum + emp.totalDays, 0),
      totalUnpaidDays: payrollData.reduce((sum, emp) => sum + emp.unpaidDays, 0),
      employees: payrollData
    };
  } catch (error) {
    throw new Error(`Payroll data generation failed: ${error.message}`);
  }
};

// Webhook endpoint data for external payroll systems
const prepareWebhookData = (leave, action) => {
  return {
    event: `leave.${action}`,
    timestamp: new Date().toISOString(),
    data: {
      leaveId: leave._id,
      employeeId: leave.userId._id,
      employeeName: leave.userId.name,
      employeeEmail: leave.userId.email,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      duration: leave.duration,
      status: leave.status,
      isPaid: ['paidLeave', 'sickLeave'].includes(leave.leaveType),
      approvedBy: leave.approvedBy,
      approvedAt: leave.updatedAt
    }
  };
};

// Send webhook to external payroll system
const sendPayrollWebhook = async (webhookUrl, data) => {
  try {
    const axios = require('axios');
    const response = await axios.post(webhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'Leave-Management-System'
      },
      timeout: 10000
    });
    return { success: true, response: response.data };
  } catch (error) {
    console.error('Payroll webhook failed:', error.message);
    return { success: false, error: error.message };
  }
};

// API format for common payroll systems
const formatForPayrollSystem = (payrollData, system = 'generic') => {
  switch (system.toLowerCase()) {
    case 'adp':
      return formatForADP(payrollData);
    case 'gusto':
      return formatForGusto(payrollData);
    case 'quickbooks':
      return formatForQuickBooks(payrollData);
    case 'sap':
      return formatForSAP(payrollData);
    default:
      return payrollData; // Generic format
  }
};

// ADP format
const formatForADP = (data) => {
  return {
    payrollPeriod: {
      startDate: data.period.startDate,
      endDate: data.period.endDate
    },
    employees: data.employees.map(emp => ({
      associateOID: emp.employeeId,
      timeOffRequests: emp.leaves.map(leave => ({
        timeOffCode: leave.type,
        startDate: leave.startDate,
        endDate: leave.endDate,
        duration: leave.duration,
        payCode: leave.isPaid ? 'PAID' : 'UNPAID'
      }))
    }))
  };
};

// Gusto format
const formatForGusto = (data) => {
  return {
    version: '1.0',
    payroll_period: {
      start_date: data.period.startDate,
      end_date: data.period.endDate
    },
    time_off_requests: data.employees.flatMap(emp =>
      emp.leaves.map(leave => ({
        employee_id: emp.employeeId,
        time_off_type: leave.type,
        start_date: leave.startDate,
        end_date: leave.endDate,
        hours: leave.duration * 8, // Assuming 8-hour workday
        paid: leave.isPaid
      }))
    )
  };
};

// QuickBooks format
const formatForQuickBooks = (data) => {
  return {
    PayrollPeriod: {
      StartDate: data.period.startDate,
      EndDate: data.period.endDate
    },
    TimeActivities: data.employees.flatMap(emp =>
      emp.leaves.map(leave => ({
        EmployeeRef: { value: emp.employeeId },
        TimeActivityType: 'TimeOff',
        StartDate: leave.startDate,
        EndDate: leave.endDate,
        Hours: leave.duration * 8,
        PayrollItemRef: { value: leave.isPaid ? 'PAID_TIME_OFF' : 'UNPAID_TIME_OFF' }
      }))
    )
  };
};

// SAP format
const formatForSAP = (data) => {
  return {
    PayrollPeriod: {
      BeginDate: data.period.startDate,
      EndDate: data.period.endDate
    },
    AbsenceRecords: data.employees.flatMap(emp =>
      emp.leaves.map(leave => ({
        PersonnelNumber: emp.employeeId,
        AbsenceType: leave.type,
        BeginDate: leave.startDate,
        EndDate: leave.endDate,
        Days: leave.duration,
        PaymentIndicator: leave.isPaid ? 'P' : 'U'
      }))
    )
  };
};

module.exports = {
  generatePayrollData,
  prepareWebhookData,
  sendPayrollWebhook,
  formatForPayrollSystem
};
