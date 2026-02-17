import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      // Fetch user's leaves for notifications
      const { data } = await axios.get('http://localhost:5000/api/leaves/my-leaves', config);
      
      // Get recent status changes (last 7 days)
      const recentLeaves = data.filter(leave => {
        const updatedAt = new Date(leave.updatedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return updatedAt >= weekAgo;
      });

      const notifs = recentLeaves.map(leave => ({
        id: leave._id,
        type: leave.status,
        message: getNotificationMessage(leave),
        date: leave.updatedAt,
        read: false
      }));

      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  const getNotificationMessage = (leave) => {
    const leaveTypes = {
      paidLeave: 'Paid Leave',
      sickLeave: 'Sick Leave',
      casualLeave: 'Casual Leave',
      maternityLeave: 'Maternity Leave',
      paternityLeave: 'Paternity Leave'
    };

    const messages = {
      pending: `Your ${leaveTypes[leave.leaveType]} request is pending approval`,
      managerApproved: `Your ${leaveTypes[leave.leaveType]} request was approved by manager`,
      approved: `Your ${leaveTypes[leave.leaveType]} request was approved!`,
      rejected: `Your ${leaveTypes[leave.leaveType]} request was rejected`
    };

    return messages[leave.status] || 'Leave status updated';
  };

  const getNotificationIcon = (type) => {
    const icons = {
      pending: '⏳',
      managerApproved: '✓',
      approved: '✅',
      rejected: '❌'
    };
    return icons[type] || '📋';
  };

  const getNotificationColor = (type) => {
    const colors = {
      pending: '#ffc107',
      managerApproved: '#17a2b8',
      approved: '#28a745',
      rejected: '#dc3545'
    };
    return colors[type] || '#6c757d';
  };

  const markAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
          if (!showDropdown) markAsRead();
        }}
        style={{
          background: 'white',
          border: '2px solid #ddd',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          position: 'relative',
          fontSize: '20px'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '55px',
          right: '0',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          width: '350px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          <div style={{
            padding: '15px',
            borderBottom: '1px solid #ddd',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Notifications</span>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
              {notifications.length} total
            </span>
          </div>

          {notifications.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>
              No recent notifications
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} style={{
                padding: '15px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                background: notif.read ? 'white' : '#f8f9fa'
              }}
              onClick={() => window.location.href = '/my-leaves'}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{
                    fontSize: '24px',
                    minWidth: '30px'
                  }}>
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '5px' }}>{notif.message}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {new Date(notif.date).toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getNotificationColor(notif.type),
                    marginTop: '5px'
                  }}></div>
                </div>
              </div>
            ))
          )}

          <div style={{
            padding: '10px',
            textAlign: 'center',
            borderTop: '1px solid #ddd'
          }}>
            <a href="/my-leaves" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
              View All Leaves →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
