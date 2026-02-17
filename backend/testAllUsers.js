const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const testAllUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected\n');

    const testCredentials = [
      { email: 'admin@test.com', password: 'admin123', role: 'Admin' },
      { email: 'manager@test.com', password: 'manager123', role: 'Manager' },
      { email: 'employee1@test.com', password: 'employee123', role: 'Employee 1' },
      { email: 'employee2@test.com', password: 'employee123', role: 'Employee 2' }
    ];

    for (const cred of testCredentials) {
      console.log(`\n--- Testing ${cred.role} ---`);
      console.log(`Email: ${cred.email}`);
      
      const user = await User.findOne({ email: cred.email });
      
      if (!user) {
        console.log('❌ User NOT found in database!');
        continue;
      }
      
      console.log('✅ User found');
      console.log('Name:', user.name);
      console.log('Role:', user.role);
      
      const isMatch = await user.matchPassword(cred.password);
      
      if (isMatch) {
        console.log(`✅ Password "${cred.password}" matches! Login should work.`);
      } else {
        console.log(`❌ Password "${cred.password}" does NOT match!`);
      }
    }
    
    console.log('\n--- Summary ---');
    const allUsers = await User.find({});
    console.log(`Total users in database: ${allUsers.length}`);
    allUsers.forEach(u => {
      console.log(`- ${u.email} (${u.role})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testAllUsers();
