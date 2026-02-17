import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from './CompanyLogo';

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      marginTop: '50px',
      padding: '40px 0 20px 0',
      borderTop: '4px solid #667eea'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* About Section */}
          <div>
            <div style={{ marginBottom: '15px' }}>
              <CompanyLogo size="small" variant="default" />
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
              A comprehensive leave management system designed to streamline time-off requests, 
              approvals, and tracking for modern organizations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a 
                  onClick={() => navigate('/dashboard')}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                >
                  🏠 Dashboard
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a 
                  onClick={() => navigate('/apply-leave')}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                >
                  📝 Apply Leave
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a 
                  onClick={() => navigate('/my-leaves')}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                >
                  📋 My Leaves
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a 
                  onClick={() => navigate('/team-calendar')}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                >
                  📅 Team Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Features</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                ✓ Multi-level Approval Workflow
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                ✓ Real-time Notifications
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                ✓ Calendar Integration
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                ✓ Analytics & Reports
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                ✓ Email Notifications
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Support</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a 
                  onClick={() => navigate('/profile')}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                >
                  👤 My Profile
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a 
                  onClick={() => navigate('/integrations')}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                >
                  🔗 Integrations
                </a>
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                📧 support@leavemanagement.com
              </li>
              <li style={{ marginBottom: '10px', fontSize: '14px', opacity: 0.9 }}>
                📞 +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '20px',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
            © {currentYear} MS IT Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a 
              href="#" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '14px',
                opacity: 0.8
              }}
              onMouseOver={(e) => e.target.style.opacity = '1'}
              onMouseOut={(e) => e.target.style.opacity = '0.8'}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '14px',
                opacity: 0.8
              }}
              onMouseOver={(e) => e.target.style.opacity = '1'}
              onMouseOut={(e) => e.target.style.opacity = '0.8'}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '14px',
                opacity: 0.8
              }}
              onMouseOver={(e) => e.target.style.opacity = '1'}
              onMouseOut={(e) => e.target.style.opacity = '0.8'}
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
