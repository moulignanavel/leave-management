import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const IntegrationSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const [integrationStatus, setIntegrationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchIntegrationStatus();
  }, []);

  const fetchIntegrationStatus = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get('http://localhost:5000/api/integrations/status', config);
      setIntegrationStatus(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch integration status:', error);
      setLoading(false);
    }
  };

  const connectGoogleCalendar = async () => {
    try {
      setSyncing(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get('http://localhost:5000/api/integrations/google/auth', config);
      
      // Open OAuth window
      window.open(data.authUrl, '_blank', 'width=600,height=700');
      setMessage('Please complete the authorization in the popup window');
      setSyncing(false);
    } catch (error) {
      setMessage('Failed to connect Google Calendar');
      setSyncing(false);
    }
  };

  const connectOutlookCalendar = async () => {
    try {
      setSyncing(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get('http://localhost:5000/api/integrations/outlook/auth', config);
      
      // Open OAuth window
      window.open(data.authUrl, '_blank', 'width=600,height=700');
      setMessage('Please complete the authorization in the popup window');
      setSyncing(false);
    } catch (error) {
      setMessage('Failed to connect Outlook Calendar');
      setSyncing(false);
    }
  };

  const downloadPayrollReport = async () => {
    try {
      setSyncing(true);
      const startDate = prompt('Enter start date (YYYY-MM-DD):');
      const endDate = prompt('Enter end date (YYYY-MM-DD):');
      const format = prompt('Enter format (generic/adp/gusto/quickbooks/sap):', 'generic');
      
      if (!startDate || !endDate) {
        setMessage('Start date and end date are required');
        setSyncing(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      
      const { data } = await axios.get(
        `http://localhost:5000/api/integrations/payroll/data?startDate=${startDate}&endDate=${endDate}&format=${format}`,
        config
      );
      
      // Download as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payroll-${startDate}-to-${endDate}.json`;
      a.click();
      
      setMessage('Payroll report downloaded successfully');
      setSyncing(false);
    } catch (error) {
      setMessage('Failed to download payroll report');
      setSyncing(false);
    }
  };

  if (loading) {
    return <div style={styles.container}><p>Loading...</p></div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Integration Settings</h2>
      
      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {/* Calendar Integration */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>📅 Calendar Integration</h3>
        <p style={styles.description}>
          Automatically sync approved leaves to your calendar
        </p>

        <div style={styles.integrationCard}>
          <div style={styles.integrationHeader}>
            <h4>Google Calendar</h4>
            <span style={integrationStatus?.googleCalendar?.enabled ? styles.statusEnabled : styles.statusDisabled}>
              {integrationStatus?.googleCalendar?.enabled ? '✓ Available' : '✗ Not Configured'}
            </span>
          </div>
          {integrationStatus?.googleCalendar?.enabled ? (
            <>
              <p style={styles.integrationDesc}>
                Connect your Google Calendar to automatically sync approved leaves
              </p>
              <button 
                onClick={connectGoogleCalendar} 
                style={styles.connectButton}
                disabled={syncing}
              >
                {syncing ? 'Connecting...' : 'Connect Google Calendar'}
              </button>
            </>
          ) : (
            <p style={styles.warningText}>
              Google Calendar integration requires configuration. Contact your administrator.
            </p>
          )}
        </div>

        <div style={styles.integrationCard}>
          <div style={styles.integrationHeader}>
            <h4>Outlook Calendar</h4>
            <span style={integrationStatus?.outlookCalendar?.enabled ? styles.statusEnabled : styles.statusDisabled}>
              {integrationStatus?.outlookCalendar?.enabled ? '✓ Available' : '✗ Not Configured'}
            </span>
          </div>
          {integrationStatus?.outlookCalendar?.enabled ? (
            <>
              <p style={styles.integrationDesc}>
                Connect your Outlook Calendar to automatically sync approved leaves
              </p>
              <button 
                onClick={connectOutlookCalendar} 
                style={styles.connectButton}
                disabled={syncing}
              >
                {syncing ? 'Connecting...' : 'Connect Outlook Calendar'}
              </button>
            </>
          ) : (
            <p style={styles.warningText}>
              Outlook Calendar integration requires configuration. Contact your administrator.
            </p>
          )}
        </div>

        <div style={styles.integrationCard}>
          <div style={styles.integrationHeader}>
            <h4>iCal Export</h4>
            <span style={styles.statusEnabled}>✓ Always Available</span>
          </div>
          <p style={styles.integrationDesc}>
            Download .ics files for any calendar application (Apple Calendar, etc.)
          </p>
          <p style={styles.infoText}>
            You can download iCal files from individual leave requests in "My Leaves" page
          </p>
        </div>
      </div>

      {/* Payroll Integration */}
      {(user.role === 'admin' || user.role === 'manager') && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>💰 Payroll Integration</h3>
          <p style={styles.description}>
            Export leave data for payroll processing
          </p>

          <div style={styles.integrationCard}>
            <div style={styles.integrationHeader}>
              <h4>Payroll Export</h4>
              <span style={styles.statusEnabled}>✓ Available</span>
            </div>
            <p style={styles.integrationDesc}>
              Export leave data in various formats compatible with payroll systems
            </p>
            <p style={styles.infoText}>
              Supported formats: {integrationStatus?.payroll?.supportedFormats?.join(', ')}
            </p>
            <button 
              onClick={downloadPayrollReport} 
              style={styles.exportButton}
              disabled={syncing}
            >
              {syncing ? 'Generating...' : 'Export Payroll Data'}
            </button>
          </div>
        </div>
      )}

      {/* Integration Info */}
      <div style={styles.infoSection}>
        <h4>ℹ️ About Integrations</h4>
        <ul style={styles.infoList}>
          <li>Calendar sync happens automatically when leaves are approved</li>
          <li>You can manually sync individual leaves from the "My Leaves" page</li>
          <li>Payroll data includes paid/unpaid leave calculations</li>
          <li>All integrations respect your privacy and security settings</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333'
  },
  message: {
    padding: '12px',
    backgroundColor: '#e3f2fd',
    border: '1px solid #2196f3',
    borderRadius: '4px',
    marginBottom: '20px',
    color: '#1976d2'
  },
  section: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '22px',
    marginBottom: '8px',
    color: '#444'
  },
  description: {
    color: '#666',
    marginBottom: '20px'
  },
  integrationCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  integrationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  statusEnabled: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  statusDisabled: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  integrationDesc: {
    color: '#666',
    marginBottom: '12px',
    fontSize: '14px'
  },
  infoText: {
    color: '#888',
    fontSize: '13px',
    fontStyle: 'italic',
    marginBottom: '12px'
  },
  warningText: {
    color: '#ff9800',
    fontSize: '14px',
    fontStyle: 'italic'
  },
  connectButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  exportButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  infoSection: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '30px'
  },
  infoList: {
    marginTop: '12px',
    paddingLeft: '20px',
    color: '#666',
    lineHeight: '1.8'
  }
};

export default IntegrationSettings;
