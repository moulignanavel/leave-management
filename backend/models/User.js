const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
  employeeId: { type: String, unique: true, sparse: true },
  department: { type: String },
  mobile: { type: String },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  googleId: { type: String },
  picture: { type: String },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  leaveBalance: {
    paidLeave: { type: Number, default: 20 },
    sickLeave: { type: Number, default: 10 },
    casualLeave: { type: Number, default: 12 },
    maternityLeave: { type: Number, default: 180 },
    paternityLeave: { type: Number, default: 15 }
  },
  calendarIntegration: {
    google: {
      enabled: { type: Boolean, default: false },
      accessToken: { type: String },
      refreshToken: { type: String },
      expiryDate: { type: Date }
    },
    outlook: {
      enabled: { type: Boolean, default: false },
      accessToken: { type: String },
      refreshToken: { type: String },
      expiryDate: { type: Date }
    }
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
