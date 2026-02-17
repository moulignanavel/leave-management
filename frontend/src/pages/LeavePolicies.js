import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { toast } from 'react-toastify';

function LeavePolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leaveQuotas: {
      paidLeave: 20,
      sickLeave: 10,
      casualLeave: 12,
      maternityLeave: 180,
      paternityLeave: 15
    },
    rules: {
      maxConsecutiveDays: 30,
      minAdvanceNoticeDays: 1,
      allowNegativeBalance: false,
      carryForwardEnabled: false,
      carryForwardMaxDays: 5
    },
    isActive: true
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('api/admin/policies', config);
      setPolicies(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch policies');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      if (editingPolicy) {
        await axios.put(
          `api/admin/policies/${editingPolicy._id}`,
          formData,
          config
        );
        toast.success('Policy updated successfully');
      } else {
        await axios.post('api/admin/policies', formData, config);
        toast.success('Policy created successfully');
      }
      
      setShowModal(false);
      setEditingPolicy(null);
      resetForm();
      fetchPolicies();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      leaveQuotas: {
        paidLeave: 20,
        sickLeave: 10,
        casualLeave: 12,
        maternityLeave: 180,
        paternityLeave: 15
      },
      rules: {
        maxConsecutiveDays: 30,
        minAdvanceNoticeDays: 1,
        allowNegativeBalance: false,
        carryForwardEnabled: false,
        carryForwardMaxDays: 5
      },
      isActive: true
    });
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setFormData({
      name: policy.name,
      description: policy.description || '',
      leaveQuotas: policy.leaveQuotas,
      rules: policy.rules,
      isActive: policy.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (policyId) => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`api/admin/policies/${policyId}`, config);
      toast.success('Policy deleted successfully');
      fetchPolicies();
    } catch (error) {
      toast.error('Failed to delete policy');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading policies...</p>
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
            setEditingPolicy(null);
            resetForm();
            setShowModal(true);
          }} 
          className="btn btn-primary"
        >
          + Create New Policy
        </button>
      </div>

      <h2>Leave Policies</h2>

      {/* Policies List */}
      {policies.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <p>No policies found. Create your first policy!</p>
        </div>
      ) : (
        policies.map(policy => (
          <div key={policy._id} className="card" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>{policy.name}</h3>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    background: policy.isActive ? '#28a745' : '#6c757d',
                    color: 'white'
                  }}>
                    {policy.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                
                {policy.description && (
                  <p style={{ color: '#666', marginBottom: '15px' }}>{policy.description}</p>
                )}

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  <div style={{ background: '#e3f2fd', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Paid Leave</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1976d2' }}>
                      {policy.leaveQuotas.paidLeave} days
                    </div>
                  </div>
                  <div style={{ background: '#f3e5f5', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Sick Leave</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7b1fa2' }}>
                      {policy.leaveQuotas.sickLeave} days
                    </div>
                  </div>
                  <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Casual Leave</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#388e3c' }}>
                      {policy.leaveQuotas.casualLeave} days
                    </div>
                  </div>
                  <div style={{ background: '#fce4ec', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Maternity</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#c2185b' }}>
                      {policy.leaveQuotas.maternityLeave} days
                    </div>
                  </div>
                  <div style={{ background: '#e1f5fe', padding: '10px', borderRadius: '5px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Paternity</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0277bd' }}>
                      {policy.leaveQuotas.paternityLeave} days
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <strong>Rules:</strong>
                  <ul style={{ marginTop: '10px', marginBottom: 0, paddingLeft: '20px' }}>
                    <li>Max consecutive days: {policy.rules.maxConsecutiveDays}</li>
                    <li>Min advance notice: {policy.rules.minAdvanceNoticeDays} days</li>
                    <li>Negative balance: {policy.rules.allowNegativeBalance ? 'Allowed' : 'Not allowed'}</li>
                    <li>Carry forward: {policy.rules.carryForwardEnabled ? `Yes (max ${policy.rules.carryForwardMaxDays} days)` : 'No'}</li>
                  </ul>
                </div>

                <div style={{ fontSize: '12px', color: '#999' }}>
                  Created: {new Date(policy.createdAt).toLocaleDateString()} | 
                  Updated: {new Date(policy.updatedAt).toLocaleDateString()}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                <button 
                  onClick={() => handleEdit(policy)}
                  className="btn"
                  style={{ padding: '8px 15px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(policy._id)}
                  className="btn"
                  style={{ background: '#dc3545', color: 'white', padding: '8px 15px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}

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
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3>{editingPolicy ? 'Edit Policy' : 'Create New Policy'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Policy Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              <h4>Leave Quotas (Days)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Paid Leave</label>
                  <input
                    type="number"
                    value={formData.leaveQuotas.paidLeave}
                    onChange={(e) => setFormData({
                      ...formData,
                      leaveQuotas: { ...formData.leaveQuotas, paidLeave: parseInt(e.target.value) }
                    })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Sick Leave</label>
                  <input
                    type="number"
                    value={formData.leaveQuotas.sickLeave}
                    onChange={(e) => setFormData({
                      ...formData,
                      leaveQuotas: { ...formData.leaveQuotas, sickLeave: parseInt(e.target.value) }
                    })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Casual Leave</label>
                  <input
                    type="number"
                    value={formData.leaveQuotas.casualLeave}
                    onChange={(e) => setFormData({
                      ...formData,
                      leaveQuotas: { ...formData.leaveQuotas, casualLeave: parseInt(e.target.value) }
                    })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Maternity Leave</label>
                  <input
                    type="number"
                    value={formData.leaveQuotas.maternityLeave}
                    onChange={(e) => setFormData({
                      ...formData,
                      leaveQuotas: { ...formData.leaveQuotas, maternityLeave: parseInt(e.target.value) }
                    })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Paternity Leave</label>
                  <input
                    type="number"
                    value={formData.leaveQuotas.paternityLeave}
                    onChange={(e) => setFormData({
                      ...formData,
                      leaveQuotas: { ...formData.leaveQuotas, paternityLeave: parseInt(e.target.value) }
                    })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
              </div>

              <h4>Rules</h4>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Max Consecutive Days</label>
                <input
                  type="number"
                  value={formData.rules.maxConsecutiveDays}
                  onChange={(e) => setFormData({
                    ...formData,
                    rules: { ...formData.rules, maxConsecutiveDays: parseInt(e.target.value) }
                  })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Min Advance Notice (Days)</label>
                <input
                  type="number"
                  value={formData.rules.minAdvanceNoticeDays}
                  onChange={(e) => setFormData({
                    ...formData,
                    rules: { ...formData.rules, minAdvanceNoticeDays: parseInt(e.target.value) }
                  })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.rules.allowNegativeBalance}
                    onChange={(e) => setFormData({
                      ...formData,
                      rules: { ...formData.rules, allowNegativeBalance: e.target.checked }
                    })}
                  />
                  Allow Negative Balance
                </label>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.rules.carryForwardEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      rules: { ...formData.rules, carryForwardEnabled: e.target.checked }
                    })}
                  />
                  Enable Carry Forward
                </label>
              </div>

              {formData.rules.carryForwardEnabled && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Max Carry Forward Days</label>
                  <input
                    type="number"
                    value={formData.rules.carryForwardMaxDays}
                    onChange={(e) => setFormData({
                      ...formData,
                      rules: { ...formData.rules, carryForwardMaxDays: parseInt(e.target.value) }
                    })}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active Policy
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingPolicy ? 'Update' : 'Create'}
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

export default LeavePolicies;
