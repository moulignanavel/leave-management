const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetCode) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Code - Leave Management System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password for the Leave Management System.</p>
          <p>Your password reset code is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${resetCode}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">Leave Management System</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPasswordResetEmail
};
