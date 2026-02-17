const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testLogin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected\n');

    // Find the admin user
    const user = await User.findOne({ email: 'admin@test.com' });
    
    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    console.log('✅ User found:');
    console.log('Email:', user.email);
    console.log('Name:', user.name);
    console.log('Role:', user.role);
    console.log('Password (hashed):', user.password.substring(0, 20) + '...');
    
    // Test password matching
    console.log('\nTesting password "admin123"...');
    const isMatch = await user.matchPassword('admin123');
    
    if (isMatch) {
      console.log('✅ Password matches! Login should work.');
    } else {
      console.log('❌ Password does NOT match!');
      console.log('This means the password was not hashed correctly.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testLogin();
