const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

console.log('Testing Email Configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '****' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test email
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Send to yourself for testing
  subject: 'Test Email - Leave Management System',
  html: `
    <h2>Email Configuration Test</h2>
    <p>If you receive this email, your Gmail configuration is working correctly!</p>
    <p>Test Code: <strong>123456</strong></p>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('\n❌ EMAIL FAILED:');
    console.log('Error:', error.message);
    console.log('\nPossible Solutions:');
    console.log('1. Make sure 2-Step Verification is enabled on your Gmail');
    console.log('2. Generate a NEW App Password at: https://myaccount.google.com/apppasswords');
    console.log('3. Make sure you copied the ENTIRE 16-character password');
    console.log('4. Remove ALL spaces from the password in .env file');
    console.log('5. Try using a different Gmail account');
  } else {
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    console.log('Check your inbox:', process.env.EMAIL_USER);
  }
  process.exit();
});
