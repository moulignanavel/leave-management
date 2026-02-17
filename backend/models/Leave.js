const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { 
    type: String, 
    enum: ['paidLeave', 'sickLeave', 'casualLeave', 'maternityLeave', 'paternityLeave'],
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // Number of days
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'managerApproved', 'hrApproved', 'approved', 'rejected'], 
    default: 'pending' 
  },
  approvalWorkflow: [{
    approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['manager', 'hr', 'admin'] },
    status: { type: String, enum: ['pending', 'approved', 'rejected'] },
    comments: { type: String },
    actionDate: { type: Date }
  }],
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: { type: String },
  attachments: [{ type: String }], // File URLs for medical certificates, etc.
  calendarEventId: { type: String }, // Google/Outlook calendar event ID
  calendarProvider: { type: String, enum: ['google', 'outlook', 'none'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
