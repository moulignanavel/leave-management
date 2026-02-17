import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        department: formData.department
      })).unwrap();
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card">
        <h2>Register - Leave Management System</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')} 
            style={{ color: '#007bff', cursor: 'pointer' }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
