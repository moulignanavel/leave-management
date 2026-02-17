import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyLeaves } from '../features/leave/leaveSlice';
import axios from '../api/axios';
import ProfileAvatar from '../components/ProfileAvatar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ManagerDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { leaves } = useSelector((state) => state.leave);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pendingTeamLeaves, setPendingTeamLeaves] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    dispatch(getMyLeaves());
    fetchPendingLeaves();
  }, [dispatch]);

  const fetchPendingLeaves = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get('api/leaves/pending', config);
      setPendingTeamLeaves(response.data);
      
      // Calculate stats
      const pending = response.data.filter(l => l.status === 'pending').length;
      const approved = response.data.filter(l => l.status === 'approved').length;
      const rejected = response.data.filter(l => l.status === 'rejected').length;
      setStats({ pending, approved, rejected });
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #fff9c4 25%, #ffccbc 50%, #f8bbd0 75%, #e1bee7 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <Header />
      <div className="container">
        <h1 style={{ marginBottom: '20px' }}>Manager Dashboard</h1>

      {/* Welcome Card */}
      <div className="card" style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ProfileAvatar user={user} size={80} />
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}>Welcome, {user?.name}!</h3>
            <p style={{ margin: '0' }}>Role: Manager</p>
            {user?.employeeId && <p style={{ margin: '5px 0 0 0' }}>Employee ID: {user.employeeId}</p>}
            <p style={{ margin: '5px 0 0 0' }}>Department: {user?.department || 'Not assigned'}</p>
            {user?.mobile && <p style={{ margin: '5px 0 0 0' }}>Mobile: {user.mobile}</p>}
          </div>
        </div>
      </div>

      {/* Team Leave Statistics */}
      <div className="card" style={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' }}>
        <h3>📊 Team Leave Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255, 243, 224, 0.6)', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#f57c00' }}>{stats.pending}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Pending Approvals</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(232, 245, 233, 0.6)', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#388e3c' }}>{stats.approved}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Approved</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(255, 235, 238, 0.6)', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#d32f2f' }}>{stats.rejected}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Rejected</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="card" onClick={() => navigate('/pending-leaves')} style={{ cursor: 'pointer', background: 'rgba(255, 243, 224, 0.5)', backdropFilter: 'blur(10px)' }}>
          <h3>✅ Pending Approvals</h3>
          <p>Review and approve team leave requests</p>
          {stats.pending > 0 && (
            <span style={{ 
              background: '#f57c00', 
              color: 'white', 
              padding: '5px 10px', 
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              {stats.pending} pending
            </span>
          )}
        </div>
        
        <div className="card" onClick={() => navigate('/team-calendar')} style={{ cursor: 'pointer', background: 'rgba(227, 242, 253, 0.5)', backdropFilter: 'blur(10px)' }}>
          <h3>📅 Team Calendar</h3>
          <p>View team leave schedule</p>
        </div>

        <div className="card" onClick={() => navigate('/apply-leave')} style={{ cursor: 'pointer', background: 'rgba(243, 229, 245, 0.5)', backdropFilter: 'blur(10px)' }}>
          <h3>📝 Apply for Leave</h3>
          <p>Submit your own leave request</p>
        </div>

        <div className="card" onClick={() => navigate('/my-leaves')} style={{ cursor: 'pointer', background: 'rgba(232, 245, 233, 0.5)', backdropFilter: 'blur(10px)' }}>
          <h3>📋 My Leaves</h3>
          <p>View your leave history</p>
        </div>
      </div>

      {/* Pending Team Requests */}
      <div className="card" style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' }}>
        <h3>⏳ Pending Team Requests</h3>
        {pendingTeamLeaves.filter(l => l.status === 'pending').slice(0, 5).map((leave) => (
          <div key={leave._id} style={{ 
            padding: '15px', 
            marginTop: '10px', 
            background: 'rgba(245, 245, 245, 0.6)', 
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
              <p style={{ margin: '5px 0', fontSize: '14px' }}>{leave.reason}</p>
            </div>
            <button 
              onClick={() => navigate('/pending-leaves')} 
              className="btn btn-primary"
              style={{ fontSize: '14px' }}
            >
              Review
            </button>
          </div>
        ))}
        {pendingTeamLeaves.filter(l => l.status === 'pending').length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>No pending requests</p>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManagerDashboard;
