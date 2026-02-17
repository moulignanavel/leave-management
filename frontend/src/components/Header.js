import React from 'react';
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '30px'
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

        {/* Navigation and User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
    </header>
  );
}

export default Header;
