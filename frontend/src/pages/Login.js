import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { GOOGLE_CLIENT_ID } from '../config';
import CompanyLogo from '../components/CompanyLogo';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleLogin
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { 
            theme: 'outline', 
            size: 'large',
            width: '100%',
            text: 'signin_with',
            shape: 'rectangular'
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      const result = await axios.post('/api/auth/google-login', {
        credential: response.credential
      });

      // Store user data in Redux and localStorage
      const userData = result.data;
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch({ type: 'auth/login/fulfilled', payload: userData });
      
      toast.success('Google login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      toast.success('Login successful');
    } catch (error) {
      toast.error(error || 'Login failed');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/assets/login-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="container" style={{ maxWidth: '450px' }}>
      <div className="card" style={{ 
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        borderRadius: '15px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <CompanyLogo size="large" variant="white" />
          </div>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Sign in to manage your leaves</p>
        </div>

        {/* Google Sign-In Button */}
        <div style={{ marginBottom: '25px' }}>
          <div id="googleSignInButton" style={{ width: '100%' }}></div>
        </div>

        {/* Divider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '25px 0',
          color: '#999'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
          <span style={{ padding: '0 15px', fontSize: '14px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
        </div>

        {/* Email/Password Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: '100%' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              padding: '12px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          <span 
            onClick={() => window.location.href = '/forgot-password'} 
            style={{ color: '#667eea', cursor: 'pointer', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Forgot Password?
          </span>
        </p>

        <div style={{ 
          marginTop: '25px', 
          paddingTop: '25px', 
          borderTop: '1px solid #eee',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Don't have an account?{' '}
          <span 
            onClick={() => window.location.href = '/register'} 
            style={{ color: '#667eea', cursor: 'pointer', fontWeight: '500' }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Register here
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
