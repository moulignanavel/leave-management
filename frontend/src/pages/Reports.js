import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { toast } from 'react-toastify';

function Reports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('api/analytics/employee', config);
      setReportData(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch report');
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const config = { 
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: 'blob'
      };
      const response = await axios.get('api/analytics/export/employee', config);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leave-report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  const leaveTypes = {
    paidLeave: 'Paid Leave',
    sickLeave: 'Sick Leave',
    casualLeave: 'Casual Leave',
    maternityLeave: 'Maternity Leave',
    paternityLeave: 'Paternity Leave'
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '48px' }}>📊</div>
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <p>No report data available</p>
        </div>
      </div>
    );
  }

  const { stats, leaves } = reportData;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
        <button onClick={handleExport} className="btn btn-primary">
          📥 Export Report (CSV)
        </button>
      </div>

      <h2>My Leave Report</h2>

      {/* Summary Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Requests</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.totalRequests}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Approved</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.approved}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Pending</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.pending}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Rejected</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.rejected}</div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Current Leave Balance</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px',
          marginTop: '15px'
        }}>
          {Object.entries(stats.currentBalance).map(([type, balance]) => (
            <div key={type} style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                {leaveTypes[type]}
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>
                {balance}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>days remaining</div>
            </div>
          ))}
        </div>
      </div>

      {/* Days Used by Type */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Leave Days Used</h3>
        <div style={{ marginTop: '15px' }}>
          {Object.entries(stats.daysUsed).map(([type, days]) => (
            <div key={type} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '12px',
              background: '#f8f9fa',
              borderRadius: '5px',
              marginBottom: '10px'
            }}>
              <span style={{ fontWeight: '500' }}>{leaveTypes[type]}</span>
              <span style={{ 
                background: '#007bff', 
                color: 'white', 
                padding: '5px 15px', 
                borderRadius: '20px',
                fontWeight: 'bold'
              }}>
                {days} days
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Monthly Leave Trend</h3>
        <div style={{ marginTop: '20px' }}>
          {Object.entries(stats.monthlyTrend).map(([month, data]) => (
            <div key={month} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '500' }}>{month}</span>
                <span style={{ color: '#666' }}>{data.requests} requests ({data.days} days)</span>
              </div>
              <div style={{ 
                background: '#e9ecef', 
                height: '25px', 
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {data.approved > 0 && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${(data.approved / Math.max(data.requests, 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #28a745, #20c997)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {data.approved > 0 && `${data.approved} ✓`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Time */}
      {stats.averageApprovalTime > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Average Approval Time</h3>
          <div style={{ 
            textAlign: 'center', 
            padding: '30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
              {stats.averageApprovalTime}
            </div>
            <div style={{ fontSize: '18px', marginTop: '10px' }}>hours</div>
          </div>
        </div>
      )}

      {/* Recent Leave History */}
      <div className="card">
        <h3>Recent Leave History</h3>
        <div style={{ marginTop: '15px' }}>
          {leaves.slice(0, 10).map(leave => (
            <div key={leave._id} style={{ 
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '10px',
              borderLeft: `4px solid ${
                leave.status === 'approved' ? '#28a745' :
                leave.status === 'rejected' ? '#dc3545' :
                leave.status === 'managerApproved' ? '#17a2b8' : '#ffc107'
              }`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{leaveTypes[leave.leaveType]}</strong>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  background: leave.status === 'approved' ? '#28a745' :
                    leave.status === 'rejected' ? '#dc3545' :
                    leave.status === 'managerApproved' ? '#17a2b8' : '#ffc107',
                  color: 'white'
                }}>
                  {leave.status}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()} ({leave.duration} days)
              </div>
              <div style={{ fontSize: '13px', color: '#999', marginTop: '5px' }}>
                Applied: {new Date(leave.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;
