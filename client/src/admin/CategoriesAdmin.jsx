import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '🏷️',
    displayOrder: 0,
    isActive: true,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/admin/categories');
      setCategories(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to load categories.') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingCat(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      icon: '🏷️',
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(cat) {
    setEditingCat(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      icon: cat.icon || '🏷️',
      displayOrder: cat.displayOrder || 0,
      isActive: cat.isActive !== false,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: null, text: '' });

    if (!form.name.trim()) {
      setStatus({ type: 'err', text: 'Category name is required.' });
      return;
    }

    try {
      if (editingCat) {
        await api.put(`/admin/categories/${editingCat._id}`, form);
        setStatus({ type: 'ok', text: 'Category updated successfully.' });
      } else {
        await api.post('/admin/categories', form);
        setStatus({ type: 'ok', text: 'New category created successfully.' });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save category.') });
    }
  }

  async function handleDelete(cat) {
    if (cat.productCount > 0) {
      alert(`CANNOT DELETE: This category contains ${cat.productCount} active product(s). Please reassign or delete the products first to maintain catalogue integrity.`);
      return;
    }

    if (!window.confirm(`Are you sure you want to permanently delete category "${cat.name}"?`)) {
      return;
    }

    try {
      await api.delete(`/admin/categories/${cat._id}`);
      setStatus({ type: 'ok', text: `Category "${cat.name}" deleted.` });
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to delete category.') });
    }
  }

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Equipment Categories</h1>
          <p>Organize products into industrial equipment sectors. Deletion is protected when products are actively assigned.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAdd}>
          + Add Category
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel">
        <div className="panel__head">
          <h2>All Categories ({categories.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading categories…</p>
        ) : categories.length === 0 ? (
          <p className="empty">No categories found. Click Add Category to create your first category.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Order</th>
                  <th style={{ width: 60 }}>Icon</th>
                  <th>Category Name</th>
                  <th>URL Slug</th>
                  <th>Description</th>
                  <th>Assigned Products</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td><strong>{c.displayOrder}</strong></td>
                    <td style={{ fontSize: '1.25rem' }}>{c.icon || '🏷️'}</td>
                    <td><strong>{c.name}</strong></td>
                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}><code>{c.slug}</code></td>
                    <td style={{ fontSize: '0.85rem', color: '#475569', maxWidth: 260 }}>{c.description || '—'}</td>
                    <td>
                      <span className={`badge ${c.productCount > 0 ? 'badge--info' : 'badge--empty'}`}>
                        {c.productCount || 0} product(s)
                      </span>
                    </td>
                    <td>
                      <span className={`pill ${c.isActive ? 'pill--active' : 'pill--draft'}`}>
                        {c.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(c)}>
                        Edit
                      </button>
                      <button 
                        type="button" 
                        className="btn btn--danger-ghost btn--sm" 
                        style={{ marginLeft: 6 }}
                        onClick={() => handleDelete(c)}
                        title={c.productCount > 0 ? 'Cannot delete: Products currently assigned' : 'Delete category'}
                      >
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

      {/* Modal dialog */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal__head">
              <h3>{editingCat ? 'Edit Category' : 'Add New Category'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal__body">
              <div className="form-group">
                <label>Category Name *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  placeholder="e.g. Commercial Waste Bins" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>URL Slug (optional, auto-generated)</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.slug} 
                  onChange={(e) => setForm({ ...form, slug: e.target.value })} 
                  placeholder="e.g. commercial-waste-bins" 
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Icon Emoji</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={form.icon} 
                    onChange={(e) => setForm({ ...form, icon: e.target.value })} 
                    placeholder="e.g. 🗑️, 🏋️, 🧹" 
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
                <label>Description (Equipment specifications & scope)</label>
                <textarea 
                  className="textarea" 
                  rows="3" 
                  value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                  placeholder="Brief summary of machinery and products in this category..."
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <input 
                  type="checkbox" 
                  id="catActiveCheck" 
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <label htmlFor="catActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  Category is active and visible in public website filters
                </label>
              </div>

              <div className="admin-modal__foot" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {editingCat ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
