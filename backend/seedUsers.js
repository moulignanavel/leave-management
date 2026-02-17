const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    department: 'Management'
  },
  {
    name: 'Manager User',
    email: 'manager@test.com',
    password: 'manager123',
    role: 'manager',
    department: 'IT'
  },
  {
    name: 'Employee One',
    email: 'employee1@test.com',
    password: 'employee123',
    role: 'employee',
    department: 'IT'
  },
  {
    name: 'Employee Two',
    email: 'employee2@test.com',
    password: 'employee123',
    role: 'employee',
    department: 'HR'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await User.deleteMany();
    console.log('Existing users deleted');

    // Create users one by one to ensure pre-save hook runs
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }

    console.log('Sample users created successfully!');
    console.log('\nYou can now login with:');
    console.log('Admin: admin@test.com / admin123');
    console.log('Manager: manager@test.com / manager123');
    console.log('Employee: employee1@test.com / employee123');
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedUsers();
