import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { toast } from 'react-toastify';

function OrganizationAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('api/analytics/organization', config);
      setAnalyticsData(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch analytics');
      setLoading(false);
    }
  };

  const handleExportOrganization = async () => {
    try {
      const config = { 
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: 'blob'
      };
      const response = await axios.get('api/analytics/export/organization', config);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `organization-report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Report exported successfully');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  const handleExportPayroll = async () => {
    try {
      const config = { 
        headers: { Authorization: `Bearer ${user.token}` },
        responseType: 'blob',
        params: dateRange
      };
      const response = await axios.get('api/analytics/export/payroll', config);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payroll-report-${dateRange.startDate}-to-${dateRange.endDate}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Payroll report exported successfully');
    } catch (error) {
      toast.error('Failed to export payroll report');
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
          <p>Loading organization analytics...</p>
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

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleExportOrganization} className="btn btn-primary">
            📥 Export Full Report
          </button>
          <button onClick={handleExportPayroll} className="btn" style={{ background: '#28a745', color: 'white' }}>
            💰 Export Payroll Report
          </button>
        </div>
      </div>

      <h2>Organization Analytics</h2>

      {/* Payroll Date Range */}
      <div className="card" style={{ marginBottom: '20px', background: '#e7f3ff' }}>
        <h4 style={{ marginBottom: '15px' }}>Payroll Report Date Range</h4>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Start Date:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>End Date:</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Employees</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{analyticsData.totalEmployees}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Requests</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{analyticsData.totalLeaveRequests}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>YTD Requests</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{analyticsData.yearToDateRequests}</div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Total Days Used</h4>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{analyticsData.totalDaysUsed}</div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Leave Status Overview</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px',
          marginTop: '15px'
        }}>
          {Object.entries(analyticsData.statusBreakdown).map(([status, count]) => {
            const colors = {
              pending: { bg: '#fff3cd', text: '#856404' },
              managerApproved: { bg: '#d1ecf1', text: '#0c5460' },
              approved: { bg: '#d4edda', text: '#155724' },
              rejected: { bg: '#f8d7da', text: '#721c24' }
            };
            
            return (
              <div key={status} style={{ 
                background: colors[status].bg, 
                padding: '20px', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: colors[status].text }}>
                  {count}
                </div>
                <div style={{ fontSize: '14px', color: colors[status].text, textTransform: 'capitalize' }}>
                  {status.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#e7f3ff', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <strong>Approval Rate:</strong> {analyticsData.averageApprovalRate}%
        </div>
      </div>

      {/* Leave Type Distribution */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>Approved Leave Type Distribution</h3>
        <div style={{ marginTop: '15px' }}>
          {Object.entries(analyticsData.leaveTypeBreakdown).map(([type, count]) => {
            const total = Object.values(analyticsData.leaveTypeBreakdown).reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? (count / total * 100).toFixed(1) : 0;
            
            return (
              <div key={type} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: '500' }}>{leaveTypes[type]}</span>
                  <span style={{ color: '#666' }}>{count} leaves ({percentage}%)</span>
                </div>
                <div style={{ 
                  background: '#e9ecef', 
                  height: '30px', 
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '15px',
                    color: 'white',
                    fontSize: '14px',
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
        <h3>Monthly Leave Trend (Current Year)</h3>
        <div style={{ marginTop: '20px' }}>
          {Object.entries(analyticsData.monthlyTrend).map(([month, data]) => (
            <div key={month} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '500' }}>{month}</span>
                <span style={{ color: '#666' }}>
                  {data.requests} requests | {data.approved} approved | {data.days} days
                </span>
              </div>
              <div style={{ 
                background: '#e9ecef', 
                height: '35px', 
                borderRadius: '17px',
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
                    fontSize: '13px',
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
                    fontSize: '13px',
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

      {/* Department Statistics */}
      {analyticsData.departmentStats && Object.keys(analyticsData.departmentStats).length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Department Statistics</h3>
          <div style={{ marginTop: '15px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Department</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Employees</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Total Leaves</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Approved</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Total Days</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Avg Days/Employee</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(analyticsData.departmentStats).map(([dept, stats]) => (
                  <tr key={dept} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{dept}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{stats.employees}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{stats.totalLeaves}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{stats.approvedLeaves}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{stats.totalDays}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {(stats.totalDays / stats.employees).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Peak Leave Months */}
      {analyticsData.peakLeaveMonths && analyticsData.peakLeaveMonths.length > 0 && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Peak Leave Months</h3>
          <div style={{ marginTop: '15px' }}>
            {analyticsData.peakLeaveMonths.map((item, index) => (
              <div key={item.month} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                background: index === 0 ? '#fff3cd' : '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px',
                borderLeft: `4px solid ${index === 0 ? '#ffc107' : index === 1 ? '#6c757d' : '#dee2e6'}`
              }}>
                <div style={{ fontWeight: '500' }}>
                  {index === 0 && '🥇 '}
                  {index === 1 && '🥈 '}
                  {index === 2 && '🥉 '}
                  {item.month}
                </div>
                <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                  {item.count} leaves
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approval Time Statistics */}
      <div className="card">
        <h3>Approval Time Statistics</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{ background: '#e7f3ff', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Average</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
              {analyticsData.approvalTimeStats.average}h
            </div>
          </div>
          <div style={{ background: '#d4edda', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Fastest</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
              {analyticsData.approvalTimeStats.fastest}h
            </div>
          </div>
          <div style={{ background: '#f8d7da', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Slowest</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc3545' }}>
              {analyticsData.approvalTimeStats.slowest}h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationAnalytics;
