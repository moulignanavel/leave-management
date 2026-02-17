const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const assignManagerToEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Find the manager user
    const manager = await User.findOne({ email: 'manager@test.com' });
    
    if (!manager) {
      console.log('❌ Manager user not found. Please create manager@test.com first.');
      process.exit(1);
    }

    console.log(`✅ Found manager: ${manager.name} (${manager._id})`);

    // Find all employees (not admin or manager)
    const employees = await User.find({ 
      role: 'employee',
      email: { $ne: 'manager@test.com' }
    });

    console.log(`\n📋 Found ${employees.length} employees to assign to manager`);

    // Assign manager to all employees
    for (const employee of employees) {
      employee.managerId = manager._id;
      await employee.save();
      console.log(`✅ Assigned ${employee.name} (${employee.email}) to manager`);
    }

    console.log(`\n✅ Successfully assigned ${employees.length} employees to manager ${manager.name}`);
    console.log('\n📊 Summary:');
    console.log(`Manager: ${manager.name} (${manager.email})`);
    console.log(`Team Members: ${employees.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

assignManagerToEmployees();
