import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: '',
    startDate: '',
    endDate: '',
    limit: 100
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    try {
      const config = { 
        headers: { Authorization: `Bearer ${user.token}` },
        params: filters
      };
      const { data } = await axios.get('http://localhost:5000/api/admin/audit-logs', config);
      setLogs(data.logs);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch audit logs');
      setLoading(false);
    }
  };

  const actionColors = {
    USER_CREATED: '#28a745',
    USER_UPDATED: '#17a2b8',
    USER_DELETED: '#dc3545',
    LEAVE_CREATED: '#007bff',
    LEAVE_APPROVED: '#28a745',
    LEAVE_REJECTED: '#dc3545',
    POLICY_CREATED: '#6f42c1',
    POLICY_UPDATED: '#6f42c1',
    ROLE_CHANGED: '#ffc107',
    BALANCE_ADJUSTED: '#fd7e14'
  };

  const actionIcons = {
    USER_CREATED: '👤+',
    USER_UPDATED: '✏️',
    USER_DELETED: '🗑️',
    LEAVE_CREATED: '📝',
    LEAVE_APPROVED: '✅',
    LEAVE_REJECTED: '❌',
    POLICY_CREATED: '📋+',
    POLICY_UPDATED: '📋✏️',
    ROLE_CHANGED: '🔄',
    BALANCE_ADJUSTED: '⚖️'
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading audit logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn" style={{ marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>

      <h2>System Audit Logs</h2>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h4>Filters</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Action Type</label>
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              <option value="">All Actions</option>
              <option value="USER_CREATED">User Created</option>
              <option value="USER_UPDATED">User Updated</option>
              <option value="USER_DELETED">User Deleted</option>
              <option value="LEAVE_CREATED">Leave Created</option>
              <option value="LEAVE_APPROVED">Leave Approved</option>
              <option value="LEAVE_REJECTED">Leave Rejected</option>
              <option value="POLICY_CREATED">Policy Created</option>
              <option value="POLICY_UPDATED">Policy Updated</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Limit</label>
            <select
              value={filters.limit}
              onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="card" style={{ marginBottom: '20px', background: '#e7f3ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Total Logs:</strong> {total}
          </div>
          <div>
            <strong>Showing:</strong> {logs.length} records
          </div>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="card">
        <h3>Activity Timeline</h3>
        <div style={{ marginTop: '20px' }}>
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
              No audit logs found
            </div>
          ) : (
            logs.map(log => (
              <div key={log._id} style={{
                padding: '15px',
                borderLeft: `4px solid ${actionColors[log.action] || '#6c757d'}`,
                background: '#f8f9fa',
                borderRadius: '5px',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{actionIcons[log.action] || '📌'}</span>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        background: actionColors[log.action] || '#6c757d',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Performed by:</strong> {log.performedBy?.name} ({log.performedBy?.email})
                      {log.performedBy?.role && (
                        <span style={{ 
                          marginLeft: '10px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          background: '#e9ecef'
                        }}>
                          {log.performedBy.role}
                        </span>
                      )}
                    </div>

                    {log.targetUser && (
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Target:</strong> {log.targetUser.name} ({log.targetUser.email})
                      </div>
                    )}

                    {log.details && Object.keys(log.details).length > 0 && (
                      <div style={{ 
                        marginTop: '10px',
                        padding: '10px',
                        background: 'white',
                        borderRadius: '5px',
                        fontSize: '13px'
                      }}>
                        <strong>Details:</strong>
                        <pre style={{ 
                          marginTop: '5px',
                          marginBottom: 0,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}>
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                      {new Date(log.createdAt).toLocaleString()} | IP: {log.ipAddress || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;
