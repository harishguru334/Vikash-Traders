import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function IndustriesAdmin() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: 'assets/hero-equipment-showcase.svg',
    displayOrder: 0,
    isActive: true,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/admin/industries');
      setIndustries(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to load industries.') });
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
      name: '',
      description: '',
      image: 'assets/hero-equipment-showcase.svg',
      displayOrder: industries.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      image: item.image || 'assets/hero-equipment-showcase.svg',
      displayOrder: item.displayOrder || 0,
      isActive: item.isActive !== false,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/admin/industries/${editingItem._id}`, form);
        setStatus({ type: 'ok', text: 'Industry sector updated.' });
      } else {
        await api.post('/admin/industries', form);
        setStatus({ type: 'ok', text: 'New industry sector created.' });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save industry.') });
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete industry sector "${item.name}"?`)) return;
    try {
      await api.delete(`/admin/industries/${item._id}`);
      setStatus({ type: 'ok', text: 'Sector deleted.' });
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to delete sector.') });
    }
  }

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Industries & Sectors Served</h1>
          <p>Approved client verticals: Municipalities, Infrastructure, Commercial Complexes, and Hospitality.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAdd}>
          + Add Industry
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel">
        <div className="panel__head">
          <h2>Market Sectors ({industries.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading industries…</p>
        ) : industries.length === 0 ? (
          <p className="empty">No industries configured yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Order</th>
                  <th>Sector Name</th>
                  <th>Description</th>
                  <th>Image Asset</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {industries.map((ind) => (
                  <tr key={ind._id}>
                    <td><strong>{ind.displayOrder}</strong></td>
                    <td><strong>{ind.name}</strong></td>
                    <td style={{ fontSize: '0.85rem', color: '#475569' }}>{ind.description}</td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}><code>{ind.image}</code></td>
                    <td>
                      <span className={`pill ${ind.isActive ? 'pill--active' : 'pill--draft'}`}>
                        {ind.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(ind)}>Edit</button>
                      <button type="button" className="btn btn--danger-ghost btn--sm" style={{ marginLeft: 6 }} onClick={() => handleDelete(ind)}>Delete</button>
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
              <h3>{editingItem ? 'Edit Sector' : 'Add Industry Sector'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal__body">
              <div className="form-group">
                <label>Industry Name *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  placeholder="e.g. Municipalities & Smart Cities" 
                  required 
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12 }}>
                <div className="form-group">
                  <label>Image Asset Path</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={form.image} 
                    onChange={(e) => setForm({ ...form, image: e.target.value })} 
                    placeholder="assets/hero-equipment-showcase.svg" 
                  />
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
                <label>Sector Scope & Machinery *</label>
                <textarea 
                  className="textarea" 
                  rows="3" 
                  value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                  placeholder="Public park gyms, waste segregation containers, and civic sanitation..." 
                  required 
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  id="indActiveCheck" 
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <label htmlFor="indActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Sector is active and visible on the website
                </label>
              </div>

              <div className="admin-modal__foot" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">{editingItem ? 'Save Changes' : 'Create Industry'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
