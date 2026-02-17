const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
  action: { 
    type: String, 
    required: true,
    enum: [
      'USER_CREATED', 'USER_UPDATED', 'USER_DELETED',
      'LEAVE_CREATED', 'LEAVE_APPROVED', 'LEAVE_REJECTED', 'LEAVE_CANCELLED',
      'POLICY_CREATED', 'POLICY_UPDATED', 'POLICY_DELETED',
      'LOGIN', 'LOGOUT', 'PASSWORD_RESET',
      'ROLE_CHANGED', 'BALANCE_ADJUSTED'
    ]
  },
  performedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  targetUser: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  targetResource: {
    type: { type: String, enum: ['Leave', 'User', 'Policy'] },
    id: { type: mongoose.Schema.Types.ObjectId }
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  status: { 
    type: String, 
    enum: ['SUCCESS', 'FAILURE'],
    default: 'SUCCESS'
  }
}, { timestamps: true });

// Index for faster queries
auditLogSchema.index({ performedBy: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ targetUser: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
