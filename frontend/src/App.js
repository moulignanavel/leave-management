import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyLeaves from './pages/MyLeaves';
import PendingLeaves from './pages/PendingLeaves';
import Profile from './pages/Profile';
import TeamCalendar from './pages/TeamCalendar';
import Reports from './pages/Reports';
import TeamAnalytics from './pages/TeamAnalytics';
import OrganizationAnalytics from './pages/OrganizationAnalytics';
import ManageUsers from './pages/ManageUsers';
import LeavePolicies from './pages/LeavePolicies';
import AuditLogs from './pages/AuditLogs';
import IntegrationSettings from './pages/IntegrationSettings';
import NotificationBell from './components/NotificationBell';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <ToastContainer />
      {user && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          zIndex: 1000 
        }}>
          <NotificationBell />
        </div>
      )}
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password" element={!user ? <ResetPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/apply-leave" element={user ? <ApplyLeave /> : <Navigate to="/login" />} />
        <Route path="/my-leaves" element={user ? <MyLeaves /> : <Navigate to="/login" />} />
        <Route path="/pending-leaves" element={user ? <PendingLeaves /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/team-calendar" element={user ? <TeamCalendar /> : <Navigate to="/login" />} />
        <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/team-analytics" element={user ? <TeamAnalytics /> : <Navigate to="/login" />} />
        <Route path="/organization-analytics" element={user ? <OrganizationAnalytics /> : <Navigate to="/login" />} />
        <Route path="/manage-users" element={user ? <ManageUsers /> : <Navigate to="/login" />} />
        <Route path="/leave-policies" element={user ? <LeavePolicies /> : <Navigate to="/login" />} />
        <Route path="/audit-logs" element={user ? <AuditLogs /> : <Navigate to="/login" />} />
        <Route path="/integrations" element={user ? <IntegrationSettings /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
