import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function TeamCalendar() {
  const [leaves, setLeaves] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchTeamLeaves();
  }, []);

  useEffect(() => {
    generateCalendar();
  }, [currentMonth, leaves]);

  const fetchTeamLeaves = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      let endpoint = 'http://localhost:5000/api/leaves/all';
      
      // Managers see only their team, admins see all
      if (user.role === 'manager') {
        endpoint = 'http://localhost:5000/api/leaves/pending';
      }
      
      const response = await axios.get(endpoint, config);
      // Filter only approved leaves for calendar
      const approvedLeaves = response.data.filter(l => 
        l.status === 'approved' || l.status === 'managerApproved' || l.status === 'pending'
      );
      setLeaves(approvedLeaves);
    } catch (error) {
      toast.error('Failed to fetch team leaves');
    }
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const leavesOnDay = leaves.filter(leave => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        return date >= start && date <= end;
      });
      
      days.push({
        date: day,
        fullDate: date,
        leaves: leavesOnDay
      });
    }
    
    setCalendarDays(days);
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const leaveTypes = {
    paidLeave: { label: 'Paid', color: '#007bff' },
    sickLeave: { label: 'Sick', color: '#dc3545' },
    casualLeave: { label: 'Casual', color: '#28a745' },
    maternityLeave: { label: 'Maternity', color: '#e83e8c' },
    paternityLeave: { label: 'Paternity', color: '#6f42c1' }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="container">
      <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Team Leave Calendar</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => changeMonth(-1)} className="btn">← Previous</button>
          <h3 style={{ margin: '0 20px' }}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button onClick={() => changeMonth(1)} className="btn">Next →</button>
        </div>
      </div>

      {/* Legend */}
      <div className="card" style={{ marginBottom: '20px', padding: '15px' }}>
        <strong>Leave Types:</strong>
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
          {Object.entries(leaveTypes).map(([key, { label, color }]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: color, 
                borderRadius: '3px' 
              }}></div>
              <span>{label} Leave</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="card" style={{ padding: '20px' }}>
        {/* Week day headers */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '5px',
          marginBottom: '10px'
        }}>
          {weekDays.map(day => (
            <div key={day} style={{ 
              textAlign: 'center', 
              fontWeight: 'bold', 
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '5px'
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '5px'
        }}>
          {calendarDays.map((day, index) => (
            <div key={index} style={{ 
              minHeight: '100px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '5px',
              background: day ? 'white' : '#f8f9fa',
              position: 'relative'
            }}>
              {day && (
                <>
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '5px',
                    color: day.fullDate.toDateString() === new Date().toDateString() ? '#007bff' : '#333'
                  }}>
                    {day.date}
                  </div>
                  
                  {day.leaves.length > 0 && (
                    <div style={{ fontSize: '11px' }}>
                      {day.leaves.slice(0, 3).map((leave, idx) => (
                        <div key={idx} style={{ 
                          background: leaveTypes[leave.leaveType].color,
                          color: 'white',
                          padding: '2px 5px',
                          borderRadius: '3px',
                          marginBottom: '2px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer'
                        }}
                        title={`${leave.userId?.name} - ${leaveTypes[leave.leaveType].label} Leave`}
                        >
                          {leave.userId?.name?.split(' ')[0]}
                        </div>
                      ))}
                      {day.leaves.length > 3 && (
                        <div style={{ 
                          fontSize: '10px', 
                          color: '#666',
                          marginTop: '2px'
                        }}>
                          +{day.leaves.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Leaves List */}
      <div style={{ marginTop: '30px' }}>
        <h3>Upcoming Leaves</h3>
        {leaves
          .filter(leave => new Date(leave.startDate) >= new Date())
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
          .slice(0, 10)
          .map(leave => (
            <div key={leave._id} className="card" style={{ marginBottom: '10px', padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{leave.userId?.name}</strong>
                  <span style={{ 
                    marginLeft: '10px',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: leaveTypes[leave.leaveType].color,
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {leaveTypes[leave.leaveType].label}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {leave.duration} {leave.duration > 1 ? 'days' : 'day'}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TeamCalendar;
