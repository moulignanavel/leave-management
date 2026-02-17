import React from 'react';

const ProfileAvatar = ({ user, size = 40, showName = false, onClick }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #007bff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: user?.picture ? 'transparent' : '#007bff',
    color: 'white',
    fontSize: `${size / 2.5}px`,
    fontWeight: 'bold',
    cursor: onClick ? 'pointer' : 'default',
    flexShrink: 0
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const nameStyle = {
    fontWeight: '500',
    color: '#333'
  };

  const content = (
    <div style={avatarStyle} onClick={onClick}>
      {user?.picture ? (
        <img 
          src={user.picture} 
          alt={user?.name || 'User'} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span>{getInitials(user?.name)}</span>
      )}
    </div>
  );

  if (showName) {
    return (
      <div style={containerStyle}>
        {content}
        <span style={nameStyle}>{user?.name}</span>
      </div>
    );
  }

  return content;
};

export default ProfileAvatar;
