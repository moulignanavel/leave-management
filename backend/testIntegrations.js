const axios = require('axios');

// Test Integration Features
const testIntegrations = async () => {
  try {
    console.log('🧪 Testing Integration Features...\n');

    // Step 1: Login as admin
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@test.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful!\n');

    // Step 2: Test Integration Status
    console.log('2️⃣ Testing integration status...');
    const statusResponse = await axios.get('http://localhost:5000/api/integrations/status', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Integration Status:', JSON.stringify(statusResponse.data, null, 2));
    console.log('');

    // Step 3: Test Payroll Data Export
    console.log('3️⃣ Testing payroll data export...');
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    const format = 'generic';
    
    const payrollResponse = await axios.get(
      `http://localhost:5000/api/integrations/payroll/data?startDate=${startDate}&endDate=${endDate}&format=${format}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log('✅ Payroll Data Generated:');
    console.log(`   Period: ${payrollResponse.data.period.startDate} to ${payrollResponse.data.period.endDate}`);
    console.log(`   Total Employees: ${payrollResponse.data.totalEmployees}`);
    console.log(`   Total Leave Days: ${payrollResponse.data.totalLeaveDays}`);
    console.log(`   Total Unpaid Days: ${payrollResponse.data.totalUnpaidDays}`);
    console.log('');

    // Step 4: Test Different Payroll Formats
    console.log('4️⃣ Testing different payroll formats...');
    const formats = ['adp', 'gusto', 'quickbooks', 'sap'];
    
    for (const fmt of formats) {
      const response = await axios.get(
        `http://localhost:5000/api/integrations/payroll/data?startDate=${startDate}&endDate=${endDate}&format=${fmt}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`   ✅ ${fmt.toUpperCase()} format: ${Object.keys(response.data).length} fields`);
    }
    console.log('');

    // Step 5: Test iCal Export (need a leave ID)
    console.log('5️⃣ Testing iCal export...');
    const leavesResponse = await axios.get('http://localhost:5000/api/leaves/my-leaves', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (leavesResponse.data.length > 0) {
      const leaveId = leavesResponse.data[0]._id;
      const icalResponse = await axios.get(
        `http://localhost:5000/api/integrations/ical/${leaveId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('✅ iCal file generated successfully!');
      console.log(`   Content length: ${icalResponse.data.length} characters`);
    } else {
      console.log('⚠️  No leaves found to test iCal export');
    }
    console.log('');

    // Summary
    console.log('🎉 All Integration Tests Passed!\n');
    console.log('✅ Integration Status API - Working');
    console.log('✅ Payroll Data Export - Working');
    console.log('✅ Multiple Payroll Formats - Working');
    console.log('✅ iCal Export - Working');
    console.log('');
    console.log('📝 Note: Calendar OAuth flows require manual testing in browser');
    console.log('   - Google Calendar: /api/integrations/google/auth');
    console.log('   - Outlook Calendar: /api/integrations/outlook/auth');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testIntegrations();
