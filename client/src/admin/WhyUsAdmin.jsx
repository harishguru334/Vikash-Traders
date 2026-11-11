import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function WhyUsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: 'Shield',
    displayOrder: 0,
    isActive: true,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/admin/why-us');
      setItems(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to load Why Us items.') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingItem(null);
    setForm({
      title: '',
      description: '',
      icon: 'Shield',
      displayOrder: items.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon || 'Shield',
      displayOrder: item.displayOrder || 0,
      isActive: item.isActive !== false,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/admin/why-us/${editingItem._id}`, form);
        setStatus({ type: 'ok', text: 'Why Us pillar updated successfully.' });
      } else {
        await api.post('/admin/why-us', form);
        setStatus({ type: 'ok', text: 'New Why Us pillar created.' });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save Why Us item.') });
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete Why Us pillar "${item.title}"?`)) return;
    try {
      await api.delete(`/admin/why-us/${item._id}`);
      setStatus({ type: 'ok', text: 'Item deleted.' });
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to delete item.') });
    }
  }

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Why Us Value Pillars (3 to 6 Reasons)</h1>
          <p>The core business reasons commercial contractors and procurement officers choose Vikash Traders.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAdd}>
          + Add Value Pillar
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel">
        <div className="panel__head">
          <h2>Active Pillars ({items.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading Why Us pillars…</p>
        ) : items.length === 0 ? (
          <p className="empty">No pillars configured yet. Click Add Value Pillar to start.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Order</th>
                  <th style={{ width: 80 }}>Icon</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it._id}>
                    <td><strong>{it.displayOrder}</strong></td>
                    <td><code>{it.icon}</code></td>
                    <td><strong>{it.title}</strong></td>
                    <td style={{ fontSize: '0.85rem', color: '#475569' }}>{it.description}</td>
                    <td>
                      <span className={`pill ${it.isActive ? 'pill--active' : 'pill--draft'}`}>
                        {it.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(it)}>
                        Edit
                      </button>
                      <button type="button" className="btn btn--danger-ghost btn--sm" style={{ marginLeft: 6 }} onClick={() => handleDelete(it)}>
                        Delete
                      </button>
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
              <h3>{editingItem ? 'Edit Value Pillar' : 'Add Value Pillar'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal__body">
              <div className="form-group">
                <label>Pillar Title *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  placeholder="e.g. 100% Direct Factory Sourcing" 
                  required 
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Icon Identifier</label>
                  <select 
                    className="select" 
                    value={form.icon} 
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  >
                    <option value="Factory">Factory</option>
                    <option value="Receipt">Receipt / Tax</option>
                    <option value="ShieldCheck">ShieldCheck</option>
                    <option value="Truck">Truck / Logistics</option>
                    <option value="Award">Award</option>
                    <option value="Wrench">Wrench / Service</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Display Sort Order</label>
                  <input 
                    type="number" 
                    className="input" 
                    value={form.displayOrder} 
                    onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Detailed Explanation *</label>
                <textarea 
                  className="textarea" 
                  rows="3" 
                  value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                  placeholder="Factual commercial benefit to the customer..."
                  required 
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  id="whyActiveCheck" 
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <label htmlFor="whyActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Pillar is active and displayed in Why Choose Us section
                </label>
              </div>

              <div className="admin-modal__foot" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">{editingItem ? 'Save Changes' : 'Create Pillar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
