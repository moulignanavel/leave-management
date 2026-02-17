import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLeave } from '../features/leave/leaveSlice';
import { toast } from 'react-toastify';
import axios from '../api/axios';

function ApplyLeave() {
  const [formData, setFormData] = useState({
    leaveType: 'paidLeave',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [duration, setDuration] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fetch leave balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('api/leaves/stats', config);
        setLeaveBalance(data.balance);
      } catch (error) {
        console.error('Failed to fetch leave balance');
      }
    };
    fetchBalance();
  }, [user]);

  // Calculate duration when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDuration(diffDays);
    }
  }, [formData.startDate, formData.endDate]);

  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error('End date must be after start date');
      return;
    }

    if (leaveBalance && leaveBalance[formData.leaveType] < duration) {
      toast.error(`Insufficient balance. Available: ${leaveBalance[formData.leaveType]} days`);
      return;
    }

    try {
      await dispatch(createLeave(formData)).unwrap();
      toast.success('Leave request submitted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Failed to submit leave request');
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
      
      <div className="card" style={{ maxWidth: '700px', margin: '20px auto' }}>
        <h2>Apply for Leave</h2>
        
        {/* Leave Balance Display */}
        {leaveBalance && (
          <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Your Leave Balance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              {Object.entries(leaveBalance).map(([type, balance]) => (
                <div key={type} style={{ 
                  background: 'white', 
                  padding: '10px', 
                  borderRadius: '5px',
                  border: formData.leaveType === type ? '2px solid #007bff' : '1px solid #ddd'
                }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>{leaveTypes[type]}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                    {balance} days
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Leave Type
            </label>
            <select
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              {Object.entries(leaveTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label} {leaveBalance && `(${leaveBalance[value]} days available)`}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          {duration > 0 && (
            <div style={{ 
              background: '#e7f3ff', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '15px',
              color: '#004085'
            }}>
              <strong>Duration:</strong> {duration} {duration > 1 ? 'days' : 'day'}
              {leaveBalance && leaveBalance[formData.leaveType] < duration && (
                <div style={{ color: '#dc3545', marginTop: '5px' }}>
                  ⚠️ Insufficient balance! You need {duration - leaveBalance[formData.leaveType]} more days.
                </div>
              )}
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              Reason for Leave
            </label>
            <textarea
              placeholder="Please provide a detailed reason for your leave request..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows="4"
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ddd',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ 
            background: '#fff3cd', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            fontSize: '14px',
            color: '#856404'
          }}>
            <strong>Note:</strong> Your leave request will go through a multi-level approval process:
            <ol style={{ marginTop: '5px', marginBottom: '0', paddingLeft: '20px' }}>
              <li>Manager Approval</li>
              <li>HR/Admin Approval</li>
            </ol>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={leaveBalance && leaveBalance[formData.leaveType] < duration}
            style={{ width: '100%' }}
          >
            Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
