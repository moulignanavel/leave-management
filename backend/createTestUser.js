const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createTestUser = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Delete existing admin user
    await User.deleteOne({ email: 'admin@test.com' });
    console.log('Deleted existing admin user');

    // Create new admin user
    const user = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin',
      department: 'Management'
    });

    console.log('✅ Test user created successfully!');
    console.log('Email:', user.email);
    console.log('Password: admin123');
    console.log('Role:', user.role);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createTestUser();
