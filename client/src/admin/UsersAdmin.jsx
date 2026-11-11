import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import api, { apiError } from '../api/client.js';

export default function UsersAdmin() {
  const { isSuperAdmin } = useOutletContext() || {};
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Content Admin',
    isActive: true,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to load admin accounts.') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSuperAdmin) load();
    else setLoading(false);
  }, [isSuperAdmin]);

  // Authorization Shield
  if (!isSuperAdmin) {
    return (
      <div className="admin-page">
        <div className="panel" style={{ padding: 40, textAlign: 'center', maxWidth: 600, margin: '40px auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🛡️</div>
          <h2>Super Admin Privilege Required</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
            User account management is strictly restricted to Super Administrators. Content Admins can manage products, categories, gallery, and website content.
          </p>
          <div style={{ marginTop: 20 }}>
            <span className="badge badge--warning">HTTP 403 Forbidden Access</span>
          </div>
        </div>
      </div>
    );
  }

  function openAdd() {
    setEditingUser(null);
    setForm({
      username: '',
      email: '',
      password: '',
      role: 'Content Admin',
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(u) {
    setEditingUser(u);
    setForm({
      username: u.username,
      email: u.email || '',
      password: '',
      role: u.role || 'Content Admin',
      isActive: u.isActive !== false,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.put(`/admin/users/${editingUser._id}`, form);
        setStatus({ type: 'ok', text: 'Admin account updated successfully.' });
      } else {
        await api.post('/admin/users', form);
        setStatus({ type: 'ok', text: 'New administrator created.' });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save admin user.') });
    }
  }

  async function handleDelete(u) {
    if (!window.confirm(`Permanently delete admin account "${u.username}"?`)) return;
    try {
      await api.delete(`/admin/users/${u._id}`);
      setStatus({ type: 'ok', text: 'Admin account deleted.' });
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to delete account.') });
    }
  }

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Admin Users & Account Management</h1>
          <p>Super Admin control: Provision administrator accounts, configure roles, and toggle access.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAdd}>
          + Create Admin Account
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel">
        <div className="panel__head">
          <h2>Registered Administrators ({users.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading admin users…</p>
        ) : users.length === 0 ? (
          <p className="empty">No additional admin accounts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Assigned Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td><strong>{u.username}</strong></td>
                    <td style={{ color: '#475569' }}>{u.email || '—'}</td>
                    <td>
                      <span className={`badge ${u.role === 'Super Admin' ? 'badge--super' : 'badge--content'}`}>
                        {u.role || 'Super Admin'}
                      </span>
                    </td>
                    <td>
                      <span className={`pill ${u.isActive ? 'pill--active' : 'pill--draft'}`}>
                        {u.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleString('en-IN') : 'Recent'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(u)}>Edit</button>
                      <button type="button" className="btn btn--danger-ghost btn--sm" style={{ marginLeft: 6 }} onClick={() => handleDelete(u)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__head">
              <h3>{editingUser ? 'Edit Admin User' : 'Create Admin Account'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal__body">
              <div className="form-group">
                <label>Username *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.username} 
                  onChange={(e) => setForm({ ...form, username: e.target.value })} 
                  disabled={Boolean(editingUser)}
                  placeholder="e.g. content_lead" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="input" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  placeholder="e.g. team@vikashtraders.com" 
                />
              </div>

              <div className="form-group">
                <label>{editingUser ? 'New Password (leave blank to keep current)' : 'Password *'}</label>
                <input 
                  type="password" 
                  className="input" 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                  placeholder="Minimum 6 characters" 
                  required={!editingUser} 
                />
              </div>

              <div className="form-group">
                <label>Role Privilege *</label>
                <select 
                  className="select" 
                  value={form.role} 
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="Content Admin">Content Admin (Products, Categories, Content, FAQs)</option>
                  <option value="Super Admin">Super Admin (Full Access: Users, Roles, Site Settings)</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  id="userActiveCheck" 
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <label htmlFor="userActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Account is active and permitted to sign in
                </label>
              </div>

              <div className="admin-modal__foot" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">{editingUser ? 'Save Account' : 'Create Account'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
