import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import ProfileAvatar from './ProfileAvatar';
import SearchBar from './SearchBar';
import CompanyLogo from './CompanyLogo';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '30px',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
             onClick={() => navigate('/dashboard')}>
          <CompanyLogo size="medium" variant="default" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '24px'
          }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-nav">
          {/* Search Bar */}
          <SearchBar />

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {user?.role === 'admin' && (
              <>
                <button 
                  onClick={() => navigate('/manage-users')}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                >
                  👥 Users
                </button>
                <button 
                  onClick={() => navigate('/reports')}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                >
                  📊 Reports
                </button>
              </>
            )}
            
            {(user?.role === 'manager' || user?.role === 'admin') && (
              <button 
                onClick={() => navigate('/pending-leaves')}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                ✅ Approvals
              </button>
            )}
          </nav>

          {/* User Profile */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            background: 'rgba(255,255,255,0.2)',
            padding: '5px 15px 5px 5px',
            borderRadius: '25px',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/profile')}>
            <ProfileAvatar user={user} size={35} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255,0,0,0.3)';
              e.target.style.borderColor = 'rgba(255,0,0,0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000
        }} className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* User Profile */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              background: 'rgba(255,255,255,0.2)',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}>
              <ProfileAvatar user={user} size={40} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>{user?.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{user?.email}</div>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Navigation Links */}
            {user?.role === 'admin' && (
              <>
                <button 
                  onClick={() => { navigate('/manage-users'); setMobileMenuOpen(false); }}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    textAlign: 'left'
                  }}
                >
                  👥 Manage Users
                </button>
                <button 
                  onClick={() => { navigate('/reports'); setMobileMenuOpen(false); }}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    textAlign: 'left'
                  }}
                >
                  📊 Reports
                </button>
              </>
            )}
            
            {(user?.role === 'manager' || user?.role === 'admin') && (
              <button 
                onClick={() => { navigate('/pending-leaves'); setMobileMenuOpen(false); }}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'left'
                }}
              >
                ✅ Pending Approvals
              </button>
            )}

            <button 
              onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left'
              }}
            >
              🏠 Dashboard
            </button>

            <button 
              onClick={() => { navigate('/apply-leave'); setMobileMenuOpen(false); }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left'
              }}
            >
              ➕ Apply Leave
            </button>

            <button 
              onClick={() => { navigate('/my-leaves'); setMobileMenuOpen(false); }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                textAlign: 'left'
              }}
            >
              📋 My Leaves
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              style={{
                background: 'rgba(255,0,0,0.3)',
                border: '1px solid rgba(255,0,0,0.5)',
                color: 'white',
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'left'
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
