const mongoose = require('mongoose');

const leavePolicySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  leaveQuotas: {
    paidLeave: { type: Number, default: 20 },
    sickLeave: { type: Number, default: 10 },
    casualLeave: { type: Number, default: 12 },
    maternityLeave: { type: Number, default: 180 },
    paternityLeave: { type: Number, default: 15 }
  },
  blackoutDates: [{
    startDate: { type: Date },
    endDate: { type: Date },
    reason: { type: String }
  }],
  holidays: [{
    date: { type: Date },
    name: { type: String },
    description: { type: String }
  }],
  rules: {
    maxConsecutiveDays: { type: Number, default: 30 },
    minAdvanceNoticeDays: { type: Number, default: 1 },
    allowNegativeBalance: { type: Boolean, default: false },
    carryForwardEnabled: { type: Boolean, default: false },
    carryForwardMaxDays: { type: Number, default: 5 }
  },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('LeavePolicy', leavePolicySchema);
