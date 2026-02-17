import React from 'react';
import { useSelector } from 'react-redux';
import EmployeeDashboard from './EmployeeDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  // Route to role-specific dashboard
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'manager') {
    return <ManagerDashboard />;
  } else {
    return <EmployeeDashboard />;
  }
}

export default Dashboard;
