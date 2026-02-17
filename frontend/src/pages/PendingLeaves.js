import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function PendingLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [comments, setComments] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  const fetchPendingLeaves = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get('api/leaves/pending', config);
      setLeaves(response.data);
    } catch (error) {
      toast.error('Failed to fetch pending leaves');
    }
  };

  const handleAction = async (leaveId, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`api/leaves/${leaveId}`, { 
        status, 
        comments 
      }, config);
      
      const action = status === 'rejected' ? 'rejected' : 'approved';
      toast.success(`Leave ${action} successfully`);
      setSelectedLeave(null);
      setComments('');
      fetchPendingLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
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
    managerApproved: '#17a2b8'
  };

  const statusLabels = {
    pending: 'Pending Manager Approval',
    managerApproved: 'Pending HR Approval'
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
      
      <h2>Pending Leave Approvals</h2>
      
      {user.role === 'manager' && (
        <div style={{ 
          background: '#e7f3ff', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #b3d9ff'
        }}>
          <strong>Manager Approval:</strong> Your approval will forward the request to HR for final approval.
        </div>
      )}

      {user.role === 'admin' && (
        <div style={{ 
          background: '#e8f5e9', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #a5d6a7'
        }}>
          <strong>Admin/HR Approval:</strong> Your approval will finalize the leave request and update the employee's balance.
        </div>
      )}

      {leaves.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666' }}>No pending leave requests</p>
        </div>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="card" style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>{leave.userId?.name}</h3>
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

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '10px',
                  marginBottom: '15px',
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '5px'
                }}>
                  <div>
                    <strong>Email:</strong> {leave.userId?.email}
                  </div>
                  <div>
                    <strong>Department:</strong> {leave.userId?.department || 'N/A'}
                  </div>
                  <div>
                    <strong>Leave Type:</strong> {leaveTypes[leave.leaveType]}
                  </div>
                  <div>
                    <strong>Duration:</strong> {leave.duration} {leave.duration > 1 ? 'days' : 'day'}
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong>Period:</strong> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <strong>Reason:</strong>
                  <div style={{ 
                    marginTop: '5px', 
                    padding: '10px', 
                    background: '#fff', 
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}>
                    {leave.reason}
                  </div>
                </div>

                {/* Approval History */}
                {leave.approvalWorkflow && leave.approvalWorkflow.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Approval History:</strong>
                    <div style={{ marginTop: '10px' }}>
                      {leave.approvalWorkflow.map((approval, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          padding: '8px',
                          background: '#e8f5e9',
                          borderRadius: '5px',
                          marginBottom: '5px'
                        }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: '#28a745',
                            color: 'white',
                            fontSize: '11px'
                          }}>
                            {approval.role.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '14px' }}>
                            ✓ Approved on {new Date(approval.actionDate).toLocaleDateString()}
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

                {/* Action Section */}
                {selectedLeave === leave._id ? (
                  <div style={{ 
                    marginTop: '15px', 
                    padding: '15px', 
                    background: '#f8f9fa', 
                    borderRadius: '8px',
                    border: '2px solid #007bff'
                  }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                      Comments (Optional):
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Add comments for this approval/rejection..."
                      rows="3"
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid #ddd',
                        marginBottom: '10px'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleAction(leave._id, 'approved')} 
                        className="btn"
                        style={{ background: '#28a745', color: 'white' }}
                      >
                        ✓ Approve
                      </button>
                      <button 
                        onClick={() => handleAction(leave._id, 'rejected')} 
                        className="btn"
                        style={{ background: '#dc3545', color: 'white' }}
                      >
                        ✗ Reject
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLeave(null);
                          setComments('');
                        }} 
                        className="btn"
                        style={{ background: '#6c757d', color: 'white' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: '15px' }}>
                    <button 
                      onClick={() => setSelectedLeave(leave._id)} 
                      className="btn btn-primary"
                    >
                      Take Action
                    </button>
                  </div>
                )}

                <div style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                  Requested on: {new Date(leave.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PendingLeaves;
