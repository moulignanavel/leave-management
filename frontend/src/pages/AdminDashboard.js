import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import ProfileAvatar from '../components/ProfileAvatar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0
  });

  useEffect(() => {
    fetchUsers();
    fetchAllLeaves();
  }, []);

  const fetchUsers = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get('/api/admin/users', config);
      setUsers(response.data);
      setStats(prev => ({ ...prev, totalUsers: response.data.length }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAllLeaves = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get('/api/admin/reports', config);
      setLeaves(response.data);
      
      const pending = response.data.filter(l => l.status === 'pending').length;
      const approved = response.data.filter(l => l.status === 'approved').length;
      
      setStats(prev => ({
        ...prev,
        totalLeaves: response.data.length,
        pendingLeaves: pending,
        approvedLeaves: approved
      }));
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'url(/assets/admin-dashboard.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <Header />
      <div className="container">
        <h1 style={{ marginBottom: '20px' }}>Admin Dashboard</h1>

      {/* Welcome Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ProfileAvatar user={user} size={80} />
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}>Welcome, {user?.name}!</h3>
            <p style={{ margin: '0' }}>Role: Administrator</p>
            <p style={{ margin: '5px 0 0 0' }}>You have full system access</p>
            {user?.mobile && <p style={{ margin: '5px 0 0 0' }}>Mobile: {user.mobile}</p>}
          </div>
        </div>
      </div>

      {/* System Statistics */}
      <div className="card">
        <h3>📊 System Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#1976d2' }}>{stats.totalUsers}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Total Users</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f3e5f5', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#7b1fa2' }}>{stats.totalLeaves}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Total Leaves</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#fff3e0', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#f57c00' }}>{stats.pendingLeaves}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Pending</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#388e3c' }}>{stats.approvedLeaves}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Approved</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3>Admin Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="card" onClick={() => navigate('/manage-users')} style={{ cursor: 'pointer', background: '#e3f2fd' }}>
          <h3>👥 Manage Users</h3>
          <p>Add, edit, or remove users</p>
        </div>
        
        <div className="card" onClick={() => navigate('/leave-policies')} style={{ cursor: 'pointer', background: '#f3e5f5' }}>
          <h3>📋 Leave Policies</h3>
          <p>Define and manage leave policies</p>
        </div>

        <div className="card" onClick={() => navigate('/reports')} style={{ cursor: 'pointer', background: '#fff3e0' }}>
          <h3>📈 Generate Reports</h3>
          <p>View and export system reports</p>
        </div>

        <div className="card" onClick={() => navigate('/pending-leaves')} style={{ cursor: 'pointer', background: '#e8f5e9' }}>
          <h3>✅ Approve Leaves</h3>
          <p>Review pending leave requests</p>
        </div>

        <div className="card" onClick={() => navigate('/apply-leave')} style={{ cursor: 'pointer', background: '#fce4ec' }}>
          <h3>📝 Apply for Leave</h3>
          <p>Submit your own leave request</p>
        </div>

        <div className="card" onClick={() => navigate('/my-leaves')} style={{ cursor: 'pointer', background: '#e0f2f1' }}>
          <h3>📋 My Leaves</h3>
          <p>View your leave history</p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3>👥 Recent Users</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Email</th>
                <th style={{ padding: '10px' }}>Role</th>
                <th style={{ padding: '10px' }}>Department</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{u.name}</td>
                  <td style={{ padding: '10px' }}>{u.email}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: u.role === 'admin' ? '#f44336' : u.role === 'manager' ? '#ff9800' : '#4caf50',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>{u.department || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3>📋 Recent Leave Requests</h3>
        {leaves.slice(0, 5).map((leave) => (
          <div key={leave._id} style={{ 
            padding: '15px', 
            marginTop: '10px', 
            background: '#f5f5f5', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{leave.userId?.name}</strong> - {leave.leaveType}
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>
            <span style={{
              padding: '5px 15px',
              borderRadius: '20px',
              background: leave.status === 'approved' ? '#4caf50' : leave.status === 'rejected' ? '#f44336' : '#ff9800',
              color: 'white',
              fontSize: '14px'
            }}>
              {leave.status}
            </span>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
