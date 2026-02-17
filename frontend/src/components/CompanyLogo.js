import React from 'react';

function CompanyLogo({ size = 'medium', variant = 'default', showText = true }) {
  const sizes = {
    small: { container: 40, text: 14, subtext: 10 },
    medium: { container: 50, text: 18, subtext: 12 },
    large: { container: 70, text: 24, subtext: 14 }
  };

  const currentSize = sizes[size];

  // Variant styles for text
  const variants = {
    default: {
      textColor: 'white',
      logoBackground: 'white',
      useMixBlend: false
    },
    white: {
      textColor: '#333',
      logoBackground: 'transparent',
      useMixBlend: true
    },
    gradient: {
      textColor: 'white',
      logoBackground: 'white',
      useMixBlend: false
    }
  };

  const currentVariant = variants[variant];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Logo Image Container */}
      <div style={{
        background: currentVariant.logoBackground,
        padding: variant === 'default' ? '8px' : '0',
        borderRadius: variant === 'default' ? '10px' : '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: variant === 'default' ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
      }}>
        <img 
          src="/assets/ms-logo.png.jpg" 
          alt="MS IT Solutions Logo"
          style={{
            height: `${currentSize.container}px`,
            width: 'auto',
            objectFit: 'contain',
            mixBlendMode: currentVariant.useMixBlend ? 'multiply' : 'normal',
            display: 'block'
          }}
          onError={(e) => {
            // Fallback if image not found - show text logo
            e.target.parentElement.style.display = 'none';
            e.target.parentElement.nextSibling.style.display = 'flex';
          }}
        />
      </div>
      
      {/* Fallback Text Logo (hidden by default, shown if image fails) */}
      <div style={{
        display: 'none',
        width: `${currentSize.container}px`,
        height: `${currentSize.container}px`,
        background: variant === 'white' ? 'white' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: `${currentSize.text}px`,
        color: variant === 'white' ? '#667eea' : 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: variant === 'white' ? '2px solid #667eea' : 'none'
      }}>
        MS
      </div>
      
      {/* Company Name Text */}
      {showText && (
        <div>
          <div style={{ 
            fontSize: `${currentSize.text}px`, 
            fontWeight: 'bold',
            color: currentVariant.textColor,
            lineHeight: '1.2',
            letterSpacing: '0.5px'
          }}>
            MS IT Solutions
          </div>
          <div style={{ 
            fontSize: `${currentSize.subtext}px`, 
            color: currentVariant.textColor,
            opacity: 0.85,
            lineHeight: '1.2'
          }}>
            Leave Management System
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyLogo;
