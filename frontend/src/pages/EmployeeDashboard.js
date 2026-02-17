import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyLeaves } from '../features/leave/leaveSlice';
import ProfileAvatar from '../components/ProfileAvatar';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EmployeeDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { leaves } = useSelector((state) => state.leave);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyLeaves());
  }, [dispatch]);

  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const approvedLeaves = leaves.filter(l => l.status === 'approved').length;
  const rejectedLeaves = leaves.filter(l => l.status === 'rejected').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'url(/assets/employee-dashboard.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <Header />
      <div className="container">
        <h1 style={{ marginBottom: '20px' }}>Employee Dashboard</h1>

      {/* Welcome Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ProfileAvatar user={user} size={80} />
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}>Welcome, {user?.name}!</h3>
            <p style={{ margin: '0' }}>Role: Employee</p>
            {user?.employeeId && <p style={{ margin: '5px 0 0 0' }}>Employee ID: {user.employeeId}</p>}
            <p style={{ margin: '5px 0 0 0' }}>Department: {user?.department || 'Not assigned'}</p>
            {user?.mobile && <p style={{ margin: '5px 0 0 0' }}>Mobile: {user.mobile}</p>}
          </div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="card">
        <h3>📊 Leave Balance</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#1976d2' }}>20</h2>
            <p style={{ margin: '5px 0 0 0' }}>Paid Leave</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f3e5f5', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#7b1fa2' }}>10</h2>
            <p style={{ margin: '5px 0 0 0' }}>Sick Leave</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#388e3c' }}>12</h2>
            <p style={{ margin: '5px 0 0 0' }}>Casual Leave</p>
          </div>
        </div>
      </div>

      {/* Leave Status Summary */}
      <div className="card">
        <h3>📈 Leave Request Status</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#fff3e0', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#f57c00' }}>{pendingLeaves}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Pending</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#388e3c' }}>{approvedLeaves}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Approved</p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#ffebee', borderRadius: '8px' }}>
            <h2 style={{ margin: '0', color: '#d32f2f' }}>{rejectedLeaves}</h2>
            <p style={{ margin: '5px 0 0 0' }}>Rejected</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="card" onClick={() => navigate('/apply-leave')} style={{ cursor: 'pointer', background: 'rgba(227, 242, 253, 0.7)', backdropFilter: 'blur(10px)' }}>
          <h3>📝 Apply for Leave</h3>
          <p>Submit a new leave request</p>
        </div>
        
        <div className="card" onClick={() => navigate('/my-leaves')} style={{ cursor: 'pointer', background: 'rgba(243, 229, 245, 0.7)', backdropFilter: 'blur(10px)' }}>
          <h3>📋 My Leaves</h3>
          <p>View your leave history and status</p>
        </div>

        <div className="card" onClick={() => navigate('/integrations')} style={{ cursor: 'pointer', background: 'rgba(255, 243, 224, 0.7)', backdropFilter: 'blur(10px)' }}>
          <h3>🔗 Integrations</h3>
          <p>Connect calendar and payroll systems</p>
        </div>

        <div className="card" onClick={() => navigate('/profile')} style={{ cursor: 'pointer', background: 'rgba(232, 245, 233, 0.7)', backdropFilter: 'blur(10px)' }}>
          <h3>👤 My Profile</h3>
          <p>Update your profile information</p>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Recent Leave Requests</h3>
        {leaves.slice(0, 3).map((leave) => (
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
              <strong>{leave.leaveType}</strong>
              <p style={{ margin: '5px 0' }}>
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
        {leaves.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>No leave requests yet</p>}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default EmployeeDashboard;
