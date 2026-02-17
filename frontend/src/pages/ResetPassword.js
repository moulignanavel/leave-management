import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ResetPassword() {
  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('resetEmail');
    if (!storedEmail) {
      toast.error('Please request a reset code first');
      navigate('/forgot-password');
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        code: formData.code,
        newPassword: formData.newPassword
      });

      toast.success('Password reset successfully! Please login with your new password');
      localStorage.removeItem('resetEmail');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h2>Reset Password</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Enter the 6-digit code sent to {email}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="6-Digit Reset Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            maxLength="6"
            pattern="[0-9]{6}"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          <span 
            onClick={() => navigate('/forgot-password')} 
            style={{ color: '#007bff', cursor: 'pointer' }}
          >
            Resend Code
          </span>
          {' | '}
          <span 
            onClick={() => navigate('/login')} 
            style={{ color: '#007bff', cursor: 'pointer' }}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
