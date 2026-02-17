import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyLeaves } from '../features/leave/leaveSlice';
import axios from 'axios';

function MyLeaves() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leaves } = useSelector((state) => state.leave);
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [syncingLeave, setSyncingLeave] = useState(null);

  useEffect(() => {
    dispatch(getMyLeaves());
    fetchStats();
  }, [dispatch]);

  const fetchStats = async () => {
    try {
      const token = user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('http://localhost:5000/api/leaves/stats', config);
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const downloadICalFile = async (leaveId) => {
    try {
      setSyncingLeave(leaveId);
      const token = user.token;
      const config = { 
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      };
      const { data } = await axios.get(`http://localhost:5000/api/integrations/ical/${leaveId}`, config);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leave-${leaveId}.ics`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      alert('iCal file downloaded! You can import it to any calendar app.');
      setSyncingLeave(null);
    } catch (error) {
      alert('Failed to download iCal file');
      setSyncingLeave(null);
    }
  };

  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  const statusColors = {
    pending: '#ffc107',
    managerApproved: '#17a2b8',
    hrApproved: '#28a745',
    approved: '#28a745',
    rejected: '#dc3545'
  };

  const statusLabels = {
    pending: 'Pending Manager Approval',
    managerApproved: 'Pending HR Approval',
    hrApproved: 'Approved by HR',
    approved: 'Approved',
    rejected: 'Rejected'
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
      
      <h2>My Leave Requests</h2>

      {/* Statistics Cards */}
      {stats && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div className="card" style={{ background: '#e3f2fd' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Total Requests</h4>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1976d2' }}>
              {stats.totalRequests}
            </div>
          </div>
          <div className="card" style={{ background: '#fff3e0' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>Pending</h4>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f57c00' }}>
              {stats.pending}
            </div>
          </div>
          <div className="card" style={{ background: '#e8f5e9' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>Approved</h4>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#388e3c' }}>
              {stats.approved}
            </div>
          </div>
          <div className="card" style={{ background: '#ffebee' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#d32f2f' }}>Rejected</h4>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d32f2f' }}>
              {stats.rejected}
            </div>
          </div>
        </div>
      )}

      {/* Leave Balance */}
      {stats && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Leave Balance</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '15px',
            marginTop: '15px'
          }}>
            {Object.entries(stats.balance).map(([type, balance]) => (
              <div key={type} style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                  {leaveTypes[type]}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                  {balance}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  days remaining
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave Requests */}
      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Leave History</h3>
      
      {leaves.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>No leave requests yet</p>
          <button onClick={() => navigate('/apply-leave')} className="btn btn-primary">
            Apply for Leave
          </button>
        </div>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="card" style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>{leaveTypes[leave.leaveType]}</h3>
                  <span style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    background: statusColors[leave.status],
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {statusLabels[leave.status]}
                  </span>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Duration:</strong> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  <span style={{ marginLeft: '10px', color: '#666' }}>
                    ({leave.duration} {leave.duration > 1 ? 'days' : 'day'})
                  </span>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Reason:</strong> {leave.reason}
                </div>

                {leave.comments && (
                  <div style={{ 
                    marginTop: '10px', 
                    padding: '10px', 
                    background: '#f8f9fa', 
                    borderRadius: '5px',
                    borderLeft: '3px solid #007bff'
                  }}>
                    <strong>Comments:</strong> {leave.comments}
                  </div>
                )}

                {/* Approval Workflow */}
                {leave.approvalWorkflow && leave.approvalWorkflow.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <strong>Approval History:</strong>
                    <div style={{ marginTop: '10px' }}>
                      {leave.approvalWorkflow.map((approval, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          padding: '8px',
                          background: '#f8f9fa',
                          borderRadius: '5px',
                          marginBottom: '5px'
                        }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: approval.status === 'approved' ? '#28a745' : '#dc3545',
                            color: 'white',
                            fontSize: '11px'
                          }}>
                            {approval.role.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '14px' }}>
                            {approval.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                            {approval.actionDate && ` on ${new Date(approval.actionDate).toLocaleDateString()}`}
                          </span>
                          {approval.comments && (
                            <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                              - {approval.comments}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                  Applied on: {new Date(leave.createdAt).toLocaleString()}
                </div>

                {/* Calendar Sync Buttons */}
                {leave.status === 'approved' && (
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => downloadICalFile(leave._id)}
                      disabled={syncingLeave === leave._id}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      📅 {syncingLeave === leave._id ? 'Downloading...' : 'Download iCal'}
                    </button>
                    {leave.calendarEventId && (
                      <span style={{
                        padding: '8px 12px',
                        backgroundColor: '#e8f5e9',
                        color: '#2e7d32',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        ✓ Synced to {leave.calendarProvider === 'google' ? 'Google' : 'Outlook'} Calendar
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyLeaves;
