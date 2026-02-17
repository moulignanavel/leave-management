import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function TeamAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/analytics/team', config);
      setAnalyticsData(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch analytics');
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const config = { 
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: 'blob'
      };
      const response = await axios.get('http://localhost:5000/api/analytics/export/team', config);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `team-analytics-${Date.now()}.csv`);
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
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <p>No analytics data available</p>
        </div>
      </div>
    );
  }

  const { stats, teamMembers } = analyticsData;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
        <button onClick={handleExport} className="btn btn-primary">
          📥 Export Report (CSV)
        </button>
      </div>

      <h2>Team Analytics & Insights</h2>

      {/* Overview Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Team Size</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.teamSize}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Requests</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.totalLeaveRequests}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Days Used</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.totalDaysUsed}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Avg Days/Employee</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.averageDaysPerEmployee.toFixed(1)}</div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Leave Status Breakdown</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
              {stats.statusBreakdown.pending}
            </div>
            <div style={{ fontSize: '14px', color: '#856404' }}>Pending</div>
          </div>
          <div style={{ background: '#d1ecf1', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0c5460' }}>
              {stats.statusBreakdown.managerApproved}
            </div>
            <div style={{ fontSize: '14px', color: '#0c5460' }}>Manager Approved</div>
          </div>
          <div style={{ background: '#d4edda', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>
              {stats.statusBreakdown.approved}
            </div>
            <div style={{ fontSize: '14px', color: '#155724' }}>Approved</div>
          </div>
          <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#721c24' }}>
              {stats.statusBreakdown.rejected}
            </div>
            <div style={{ fontSize: '14px', color: '#721c24' }}>Rejected</div>
          </div>
        </div>
      </div>

      {/* Leave Type Distribution */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Leave Type Distribution</h3>
        <div style={{ marginTop: '15px' }}>
          {Object.entries(stats.leaveTypeBreakdown).map(([type, count]) => {
            const total = Object.values(stats.leaveTypeBreakdown).reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? (count / total * 100).toFixed(1) : 0;
            
            return (
              <div key={type} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: '500' }}>{leaveTypes[type]}</span>
                  <span style={{ color: '#666' }}>{count} requests ({percentage}%)</span>
                </div>
                <div style={{ 
                  background: '#e9ecef', 
                  height: '25px', 
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: 'width 0.3s ease'
                  }}>
                    {count > 0 && count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Monthly Leave Trend</h3>
        <div style={{ marginTop: '20px' }}>
          {Object.entries(stats.monthlyTrend).map(([month, data]) => (
            <div key={month} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '500' }}>{month}</span>
                <span style={{ color: '#666' }}>
                  {data.requests} requests | {data.approved} approved | {data.days} days
                </span>
              </div>
              <div style={{ 
                background: '#e9ecef', 
                height: '30px', 
                borderRadius: '15px',
                overflow: 'hidden',
                display: 'flex'
              }}>
                {data.approved > 0 && (
                  <div style={{
                    width: `${(data.approved / Math.max(data.requests, 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #28a745, #20c997)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✓ {data.approved}
                  </div>
                )}
                {data.rejected > 0 && (
                  <div style={{
                    width: `${(data.rejected / Math.max(data.requests, 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #dc3545, #c82333)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ✗ {data.rejected}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Leave Users */}
      {stats.topLeaveUsers && stats.topLeaveUsers.length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Top Leave Users</h3>
          <div style={{ marginTop: '15px' }}>
            {stats.topLeaveUsers.map((user, index) => (
              <div key={user.userId} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: index === 0 ? '#fff3cd' : '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px',
                borderLeft: `4px solid ${index === 0 ? '#ffc107' : index === 1 ? '#6c757d' : '#dee2e6'}`
              }}>
                <div>
                  <div style={{ fontWeight: '500' }}>
                    {index === 0 && '🥇 '}
                    {index === 1 && '🥈 '}
                    {index === 2 && '🥉 '}
                    {user.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{user.department}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: '#007bff' }}>{user.days} days</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{user.requests} requests</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department Breakdown */}
      {stats.departmentBreakdown && Object.keys(stats.departmentBreakdown).length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Department Breakdown</h3>
          <div style={{ marginTop: '15px' }}>
            {Object.entries(stats.departmentBreakdown).map(([dept, data]) => (
              <div key={dept} style={{ 
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{dept}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '14px' }}>
                  <div>
                    <span style={{ color: '#666' }}>Employees: </span>
                    <strong>{data.employees}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#666' }}>Leaves: </span>
                    <strong>{data.leaves}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#666' }}>Days: </span>
                    <strong>{data.days}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members Summary */}
      <div className="card">
        <h3>Team Members</h3>
        <div style={{ marginTop: '15px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Paid</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Sick</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Casual</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{member.name}</td>
                  <td style={{ padding: '12px' }}>{member.department || 'N/A'}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{member.leaveBalance.paidLeave}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{member.leaveBalance.sickLeave}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{member.leaveBalance.casualLeave}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeamAnalytics;
