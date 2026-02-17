import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.picture || '');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    employeeId: user?.employeeId || '',
    department: user?.department || '',
    mobile: user?.mobile || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const updateData = {
        name: formData.name,
        employeeId: formData.employeeId,
        department: formData.department,
        mobile: formData.mobile,
        picture: profilePicture
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await axios.put('api/users/profile', updateData, config);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Update local storage with new profile picture
      const updatedUser = { ...user, picture: profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.location.reload(); // Reload to update user state
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setUploadingImage(false);
        toast.success('Image uploaded! Click Save Changes to update');
      };
      reader.onerror = () => {
        toast.error('Failed to read image');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture('');
    toast.info('Profile picture removed. Click Save Changes to update');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
      
      <div className="card" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>My Profile</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Picture Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginTop: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #007bff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: profilePicture ? 'transparent' : '#007bff',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span>{getInitials(user?.name)}</span>
            )}
          </div>
          
          {isEditing && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <label style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  disabled={uploadingImage}
                />
              </label>
              {profilePicture && (
                <button
                  type="button"
                  onClick={removeProfilePicture}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Remove Photo
                </button>
              )}
            </div>
          )}
        </div>

        {!isEditing ? (
          // View Mode
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Name</label>
              <p style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>{user?.name}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email</label>
              <p style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>{user?.email}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Role</label>
              <p style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                <span style={{
                  padding: '5px 15px',
                  borderRadius: '20px',
                  background: user?.role === 'admin' ? '#f44336' : user?.role === 'manager' ? '#ff9800' : '#4caf50',
                  color: 'white'
                }}>
                  {user?.role}
                </span>
              </p>
            </div>

            {(user?.role === 'employee' || user?.role === 'manager') && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Employee ID</label>
                <p style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                  {user?.employeeId || 'Not assigned'}
                </p>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Department</label>
              <p style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                {user?.department || 'Not assigned'}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Mobile Number</label>
              <p style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                {user?.mobile || 'Not provided'}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Leave Balance</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0', color: '#1976d2' }}>20</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Paid Leave</p>
                </div>
                <div style={{ padding: '15px', background: '#f3e5f5', borderRadius: '8px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0', color: '#7b1fa2' }}>10</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Sick Leave</p>
                </div>
                <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0', color: '#388e3c' }}>12</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Casual Leave</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email (Cannot be changed)</label>
              <input
                type="email"
                value={formData.email}
                disabled
                style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
              />
            </div>

            {(user?.role === 'employee' || user?.role === 'manager') && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="Enter your employee ID"
                />
              </div>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Mobile Number</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter your mobile number"
              />
            </div>

            <hr style={{ margin: '20px 0' }} />
            <h3>Change Password (Optional)</h3>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn-success">Save Changes</button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    employeeId: user?.employeeId || '',
                    department: user?.department || '',
                    mobile: user?.mobile || '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }} 
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
