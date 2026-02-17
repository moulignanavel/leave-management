const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send leave status update email
const sendLeaveStatusEmail = async (user, leave, status, comments) => {
  try {
    const transporter = createTransporter();

    const statusMessages = {
      pending: 'Your leave request has been submitted and is pending approval.',
      managerApproved: 'Your leave request has been approved by your manager and is pending HR approval.',
      approved: 'Great news! Your leave request has been approved.',
      rejected: 'Your leave request has been rejected.'
    };

    const statusColors = {
      pending: '#ffc107',
      managerApproved: '#17a2b8',
      approved: '#28a745',
      rejected: '#dc3545'
    };

    const leaveTypes = {
      paidLeave: 'Paid Leave',
      sickLeave: 'Sick Leave',
      casualLeave: 'Casual Leave',
      maternityLeave: 'Maternity Leave',
      paternityLeave: 'Paternity Leave'
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Leave Request ${status.charAt(0).toUpperCase() + status.slice(1)} - Leave Management System`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Leave Request Update</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
            <div style="background: ${statusColors[status]}; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">${statusMessages[status]}</h2>
            </div>

            <h3 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Leave Details</h3>
            
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Employee:</strong></td>
                <td style="padding: 10px;">${user.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Leave Type:</strong></td>
                <td style="padding: 10px;">${leaveTypes[leave.leaveType]}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Duration:</strong></td>
                <td style="padding: 10px;">${leave.duration} day${leave.duration > 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Start Date:</strong></td>
                <td style="padding: 10px;">${new Date(leave.startDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>End Date:</strong></td>
                <td style="padding: 10px;">${new Date(leave.endDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Status:</strong></td>
                <td style="padding: 10px;"><span style="background: ${statusColors[status]}; color: white; padding: 5px 10px; border-radius: 5px;">${status.toUpperCase()}</span></td>
              </tr>
            </table>

            ${comments ? `
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                <strong>Comments:</strong><br/>
                ${comments}
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 15px 0; color: #666;">View your leave details and status</p>
              <a href="http://localhost:3000/my-leaves" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                View My Leaves
              </a>
            </div>
          </div>

          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Leave Management System | ${new Date().getFullYear()}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Leave status email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending leave status email:', error);
    return { success: false, error: error.message };
  }
};

// Send notification to manager about new leave request
const sendManagerNotification = async (manager, employee, leave) => {
  try {
    const transporter = createTransporter();

    const leaveTypes = {
      paidLeave: 'Paid Leave',
      sickLeave: 'Sick Leave',
      casualLeave: 'Casual Leave',
      maternityLeave: 'Maternity Leave',
      paternityLeave: 'Paternity Leave'
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: manager.email,
      subject: `New Leave Request from ${employee.name} - Action Required`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Leave Request</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
              <strong>⚠️ Action Required:</strong> A team member has submitted a leave request that requires your approval.
            </div>

            <h3 style="color: #333; border-bottom: 2px solid #f5576c; padding-bottom: 10px;">Request Details</h3>
            
            <table style="width: 100%; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Employee:</strong></td>
                <td style="padding: 10px;">${employee.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Email:</strong></td>
                <td style="padding: 10px;">${employee.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Department:</strong></td>
                <td style="padding: 10px;">${employee.department || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Leave Type:</strong></td>
                <td style="padding: 10px;">${leaveTypes[leave.leaveType]}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Duration:</strong></td>
                <td style="padding: 10px;">${leave.duration} day${leave.duration > 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Period:</strong></td>
                <td style="padding: 10px;">${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8f9fa;"><strong>Reason:</strong></td>
                <td style="padding: 10px;">${leave.reason}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 15px 0; color: #666;">Review and take action on this request</p>
              <a href="http://localhost:3000/pending-leaves" style="display: inline-block; background: #f5576c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Review Request
              </a>
            </div>
          </div>

          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Leave Management System | ${new Date().getFullYear()}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Manager notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending manager notification:', error);
    return { success: false, error: error.message };
  }
};

// Send reminder for pending approvals
const sendApprovalReminder = async (approver, pendingCount) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: approver.email,
      subject: `Reminder: ${pendingCount} Pending Leave Approval${pendingCount > 1 ? 's' : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Pending Approvals Reminder</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
            <div style="text-align: center; padding: 30px;">
              <div style="font-size: 48px; font-weight: bold; color: #667eea; margin-bottom: 10px;">
                ${pendingCount}
              </div>
              <p style="font-size: 18px; color: #666; margin: 0;">
                Leave request${pendingCount > 1 ? 's' : ''} awaiting your approval
              </p>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <strong>⏰ Reminder:</strong> Please review and take action on pending leave requests to avoid delays.
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center;">
              <a href="http://localhost:3000/pending-leaves" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Review Pending Requests
              </a>
            </div>
          </div>

          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Leave Management System | ${new Date().getFullYear()}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Approval reminder sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending approval reminder:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendLeaveStatusEmail,
  sendManagerNotification,
  sendApprovalReminder
};
