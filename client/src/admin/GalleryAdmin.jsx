import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [uploading, setUploading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: '',
    caption: '',
    image: '',
    tag: 'Installation',
    displayOrder: 0,
    isActive: true,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/admin/gallery');
      setItems(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to load gallery items.') });
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
      caption: '',
      image: 'assets/hero-equipment-showcase.svg',
      tag: 'Installation',
      displayOrder: items.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setForm({
      title: item.title,
      caption: item.caption || '',
      image: item.image,
      tag: item.tag || 'Installation',
      displayOrder: item.displayOrder || 0,
      isActive: item.isActive !== false,
    });
    setModalOpen(true);
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('image', file);
    setUploading(true);

    try {
      const res = await api.post('/admin/uploads', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((f) => ({ ...f, image: res.data.imageUrl }));
      setStatus({ type: 'ok', text: 'Media image uploaded successfully.' });
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Image upload failed.') });
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.image.trim()) {
      setStatus({ type: 'err', text: 'Title and image are required.' });
      return;
    }

    try {
      if (editingItem) {
        await api.put(`/admin/gallery/${editingItem._id}`, form);
        setStatus({ type: 'ok', text: 'Gallery item updated.' });
      } else {
        await api.post('/admin/gallery', form);
        setStatus({ type: 'ok', text: 'New gallery item published.' });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save gallery item.') });
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete gallery photo "${item.title}"?`)) return;
    try {
      await api.delete(`/admin/gallery/${item._id}`);
      setStatus({ type: 'ok', text: 'Gallery item removed.' });
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to delete gallery item.') });
    }
  }

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Media & Equipment Gallery Manager</h1>
          <p>Real warehouse staging, park installations, freight dispatch palletizing, and machine QA testing photos.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAdd}>
          + Upload / Add Media
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel" style={{ padding: 20 }}>
        <div className="panel__head" style={{ padding: 0, marginBottom: 16 }}>
          <h2>Gallery Photos ({items.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading gallery photos…</p>
        ) : items.length === 0 ? (
          <p className="empty">No photos in the gallery yet. Click + Upload / Add Media to start.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {items.map((it) => (
              <div key={it._id} className="gallery-admin-card" style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 150, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  <img src={it.image} alt={it.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.65)', color: '#ffffff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 4 }}>
                    {it.tag}
                  </span>
                  <span style={{ position: 'absolute', top: 8, right: 8, background: it.isActive ? '#0c5e42' : '#64748b', color: '#ffffff', fontSize: '0.68rem', padding: '2px 6px', borderRadius: 4 }}>
                    {it.isActive ? 'Active' : 'Draft'}
                  </span>
                </div>
                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: 4 }}>{it.title}</strong>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, flex: 1 }}>{it.caption || 'No caption'}</p>
                  <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Order: {it.displayOrder}</span>
                    <div>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(it)}>Edit</button>
                      <button type="button" className="btn btn--danger-ghost btn--sm" style={{ marginLeft: 4 }} onClick={() => handleDelete(it)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__head">
              <h3>{editingItem ? 'Edit Media Photo' : 'Upload / Add Photo'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal__body">
              <div className="form-group">
                <label>Media Title *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  placeholder="e.g. Park Gym Double Air Walker Installation" 
                  required 
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Category Tag</label>
                  <select 
                    className="select" 
                    value={form.tag} 
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  >
                    <option value="Installation">Installation</option>
                    <option value="Warehouse">Warehouse Staging</option>
                    <option value="Logistics">Freight & Dispatch</option>
                    <option value="Manufacturing">Manufacturing Line</option>
                    <option value="QA Test">QA Testing</option>
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
                <label>Caption / Location Details</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.caption} 
                  onChange={(e) => setForm({ ...form, caption: e.target.value })} 
                  placeholder="e.g. Civic Park installation site, verified bearing tolerance" 
                />
              </div>

              <div className="form-group">
                <label>Image Source (Upload or URL) *</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input 
                    type="text" 
                    className="input" 
                    value={form.image} 
                    onChange={(e) => setForm({ ...form, image: e.target.value })} 
                    placeholder="assets/hero-equipment-showcase.svg or /uploads/..." 
                    required 
                  />
                </div>
                <div>
                  <label className="btn btn--ghost btn--sm" style={{ cursor: 'pointer', display: 'inline-block' }}>
                    {uploading ? 'Uploading…' : '📁 Upload New File'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
                {form.image && (
                  <div style={{ marginTop: 8, padding: 8, background: '#f8fafc', borderRadius: 4, textAlign: 'center' }}>
                    <img src={form.image} alt="Preview" style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                )}
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  id="galActiveCheck" 
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <label htmlFor="galActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Photo is published and visible on the website
                </label>
              </div>

              <div className="admin-modal__foot" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">{editingItem ? 'Save Changes' : 'Publish Photo'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
