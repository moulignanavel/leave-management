import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    department: '',
    managerId: ''
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/admin/users', config);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      if (editingUser) {
        // Update user
        await axios.put(
          `http://localhost:5000/api/admin/users/${editingUser._id}`,
          formData,
          config
        );
        toast.success('User updated successfully');
      } else {
        // Create user
        await axios.post('http://localhost:5000/api/admin/users', formData, config);
        toast.success('User created successfully');
      }
      
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'employee',
        department: '',
        managerId: ''
      });
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      department: user.department || '',
      managerId: user.managerId?._id || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, config);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const managers = users.filter(u => u.role === 'manager');

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/dashboard')} className="btn">← Back to Dashboard</button>
        <button 
          onClick={() => {
            setEditingUser(null);
            setFormData({
              name: '',
              email: '',
              password: '',
              role: 'employee',
              department: '',
              managerId: ''
            });
            setShowModal(true);
          }} 
          className="btn btn-primary"
        >
          + Add New User
        </button>
      </div>

      <h2>Manage Users & Roles</h2>

      {/* Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div className="card" style={{ background: '#e3f2fd', textAlign: 'center' }}>
          <h4>Total Users</h4>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1976d2' }}>
            {users.length}
          </div>
        </div>
        <div className="card" style={{ background: '#f3e5f5', textAlign: 'center' }}>
          <h4>Employees</h4>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7b1fa2' }}>
            {users.filter(u => u.role === 'employee').length}
          </div>
        </div>
        <div className="card" style={{ background: '#e8f5e9', textAlign: 'center' }}>
          <h4>Managers</h4>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#388e3c' }}>
            {users.filter(u => u.role === 'manager').length}
          </div>
        </div>
        <div className="card" style={{ background: '#fff3e0', textAlign: 'center' }}>
          <h4>Admins</h4>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f57c00' }}>
            {users.filter(u => u.role === 'admin').length}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <h3>All Users</h3>
        <div style={{ overflowX: 'auto', marginTop: '15px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Manager</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{u.name}</td>
                  <td style={{ padding: '12px' }}>{u.email}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      background: u.role === 'admin' ? '#ffc107' :
                        u.role === 'manager' ? '#28a745' : '#007bff',
                      color: 'white'
                    }}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{u.department || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>{u.managerId?.name || 'N/A'}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleEdit(u)}
                      className="btn"
                      style={{ marginRight: '5px', padding: '5px 10px', fontSize: '12px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(u._id)}
                      className="btn"
                      style={{ background: '#dc3545', color: 'white', padding: '5px 10px', fontSize: '12px' }}
                      disabled={u._id === user._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              {!editingUser && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              {formData.role === 'employee' && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Manager</label>
                  <select
                    value={formData.managerId}
                    onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  >
                    <option value="">No Manager</option>
                    {managers.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingUser ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="btn"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
