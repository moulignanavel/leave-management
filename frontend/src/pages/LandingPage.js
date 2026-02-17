import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyLogo from '../components/CompanyLogo';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header/Navigation */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <CompanyLogo size="large" variant="default" />
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid white',
                color: 'white',
                padding: '10px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.color = 'white';
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'white',
                border: '2px solid white',
                color: '#667eea',
                padding: '10px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/office-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '48px', 
            marginBottom: '20px',
            fontWeight: 'bold',
            lineHeight: '1.2'
          }}>
            Simplify Leave Management for Your Organization
          </h1>
          <p style={{ 
            fontSize: '20px', 
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            A comprehensive solution to manage employee time-off requests, approvals, and tracking. 
            Streamline your HR processes with our intuitive platform.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'white',
                border: 'none',
                color: '#667eea',
                padding: '15px 40px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                padding: '15px 40px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '36px', 
            marginBottom: '50px',
            color: '#333'
          }}>
            Powerful Features for Modern Teams
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {/* Feature 1 */}
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📝</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#667eea' }}>Easy Leave Requests</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Submit leave requests in seconds with our intuitive interface. Track status in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>✅</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#667eea' }}>Multi-Level Approvals</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Streamlined approval workflow with manager and HR/admin review process.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📅</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#667eea' }}>Calendar Integration</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Sync with Google Calendar and Outlook. Never miss a team member's time off.
              </p>
            </div>

            {/* Feature 4 */}
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#667eea' }}>Analytics & Reports</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Comprehensive reports and analytics to track leave patterns and trends.
              </p>
            </div>

            {/* Feature 5 */}
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📧</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#667eea' }}>Email Notifications</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Automatic email notifications for all leave status changes and updates.
              </p>
            </div>

            {/* Feature 6 */}
            <div style={{
              padding: '30px',
              background: '#f8f9fa',
              borderRadius: '15px',
              textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔐</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#667eea' }}>Secure & Reliable</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Enterprise-grade security with role-based access control and data encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '36px', 
            marginBottom: '50px',
            color: '#333'
          }}>
            Why Choose Our System?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}>99.9%</h3>
              <p style={{ fontSize: '18px', color: '#666' }}>Uptime Guarantee</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}>24/7</h3>
              <p style={{ fontSize: '18px', color: '#666' }}>Customer Support</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}>5 Min</h3>
              <p style={{ fontSize: '18px', color: '#666' }}>Setup Time</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', color: '#667eea', marginBottom: '10px' }}>100%</h3>
              <p style={{ fontSize: '18px', color: '#666' }}>Cloud-Based</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', marginBottom: '20px' }}>
            Ready to Transform Your Leave Management?
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.95 }}>
            Join thousands of organizations already using our platform to streamline their HR processes.
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              background: 'white',
              border: 'none',
              color: '#667eea',
              padding: '18px 50px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            Get Started Now - It's Free!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#2c3e50',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <CompanyLogo size="medium" variant="default" />
          </div>
          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            paddingTop: '20px',
            fontSize: '14px',
            opacity: 0.8
          }}>
            © {new Date().getFullYear()} MS IT Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
