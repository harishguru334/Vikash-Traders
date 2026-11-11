import { useEffect, useState, useMemo } from 'react';
import api, { apiError, assetUrl } from '../api/client.js';
import { rupees } from '../site.js';

const CATEGORIES = [
  'Outdoor Exercise Gym Equipment',
  'Plastic Dust Bins',
  'Cleaning Machines',
  'Queue Stands',
  'Concrete Mixer Machines',
  'Concrete Test Hammer',
  'Shoe Polish Machine',
  'Scrubbing & Polishing Machine',
];

const BLANK = {
  category: CATEGORIES[0],
  name: '',
  price: '',
  imageUrl: '',
  sortOrder: 0,
  isActive: true,
};

export default function ProductsAdmin() {
  const [dynCategories, setDynCategories] = useState(CATEGORIES);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: null, text: '' });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Search & Filter state
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  async function load() {
    try {
      const res = await api.get('/admin/products');
      setProducts(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Could not load products.') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    api.get('/admin/categories')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setDynCategories(res.data.map(c => c.name));
        }
      })
      .catch(() => {});
  }, []);

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      category: product.category,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || '',
      sortOrder: product.sortOrder || 0,
      isActive: product.isActive !== false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(BLANK);
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus({ type: null, text: '' });
    try {
      const data = new FormData();
      data.append('image', file);
      const res = await api.post('/admin/uploads', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((f) => ({ ...f, imageUrl: res.data.imageUrl }));
      setStatus({ type: 'ok', text: 'Image successfully uploaded and attached.' });
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Upload failed. Ensure image is PNG, JPG or WEBP under 4MB.') });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setStatus({ type: 'err', text: 'Product name cannot be empty.' });
      return;
    }
    const payload = {
      ...form,
      price: Number(form.price),
      sortOrder: Number(form.sortOrder || 0),
    };
    try {
      if (editingId) {
        await api.put('/admin/products/' + editingId, payload);
        setStatus({ type: 'ok', text: 'Product successfully updated.' });
      } else {
        await api.post('/admin/products', payload);
        setStatus({ type: 'ok', text: 'New product added to catalogue.' });
      }
      cancelEdit();
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Could not save product.') });
    }
  }

  async function handleDelete(product) {
    if (!window.confirm('Delete "' + product.name + '"? This will remove it from the public catalogue.')) return;
    try {
      await api.delete('/admin/products/' + product._id);
      setStatus({ type: 'ok', text: 'Product deleted.' });
      if (editingId === product._id) cancelEdit();
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Could not delete product.') });
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchSearch = !searchTerm.trim() || p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, categoryFilter, searchTerm]);

  return (
    <>
      <header className="admin__head">
        <div>
          <h1>Product Management &amp; Catalogue</h1>
          <p>Add new products, upload real machinery photos, change wholesale rates in ₹, and toggle visibility.</p>
        </div>
      </header>

      {status.type && (
        <p className={'formmsg formmsg--' + (status.type === 'ok' ? 'ok' : 'err')} role="status">
          {status.text}
        </p>
      )}

      {/* Product Creation / Editing Panel */}
      <section className="panel">
        <div className="panel__head">
          <div>
            <h2>{editingId ? 'Edit Product Details' : 'Add New Commercial Product'}</h2>
            <p className="panel__sub">Live rates and photos will automatically sync with the public catalogue.</p>
          </div>
          {editingId && (
            <button className="btn btn--ghost" type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>

        <form className="grid-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="p-category">Category *</label>
            <select id="p-category" value={form.category} onChange={update('category')} required>
              {dynCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="p-name">Product Name *</label>
            <input
              id="p-name"
              value={form.name}
              onChange={update('name')}
              required
              placeholder="e.g. 100 Litre HDPE Heavy Wheeled Dustbin"
            />
          </div>

          <div className="field">
            <label htmlFor="p-price">Wholesale Price (₹) per piece, excl. GST *</label>
            <input
              id="p-price"
              type="number"
              min="0"
              step="1"
              value={form.price}
              onChange={update('price')}
              required
              placeholder="e.g. 1850"
            />
          </div>

          <div className="field">
            <label htmlFor="p-sort">Display Sort Order</label>
            <input
              id="p-sort"
              type="number"
              value={form.sortOrder}
              onChange={update('sortOrder')}
              placeholder="0 (Lower numbers appear first)"
            />
          </div>

          {/* Image Upload & Live Thumbnail Preview */}
          <div className="field field--wide">
            <label htmlFor="p-image">Product Photo (Upload Image File or Paste URL)</label>
            
            <div className="image-upload-row">
              {form.imageUrl && (
                <div className="image-preview-box">
                  <img
                    src={assetUrl(form.imageUrl)}
                    alt="Preview"
                    className="image-preview-thumb"
                  />
                  <button
                    type="button"
                    className="image-preview-remove"
                    onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                    title="Remove Image"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="image-inputs">
                <input
                  id="p-image"
                  value={form.imageUrl}
                  onChange={update('imageUrl')}
                  placeholder="https://… or /uploads/…"
                />
                
                <div className="file-picker-wrapper">
                  <label htmlFor="file-upload-input" className="file-upload-btn">
                    <span>📁 Choose Image File to Upload</span>
                    <input
                      id="file-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      disabled={uploading}
                    />
                  </label>
                  {uploading && <span className="upload-spinner">Uploading image…</span>}
                </div>
                <span className="field-hint">Supports PNG, JPG, WEBP or AVIF up to 4MB. Auto-saved to server.</span>
              </div>
            </div>
          </div>

          <label className="checkbox">
            <input type="checkbox" checked={form.isActive} onChange={update('isActive')} />
            <strong>Published on Website</strong> (Checked = visible in public catalogue; Unchecked = draft/hidden)
          </label>

          <button className="btn btn--primary" type="submit">
            {editingId ? 'Save & Update Product Rate →' : '+ Add Product to Catalogue →'}
          </button>
        </form>
      </section>

      {/* Products Table with Search & Category Filters */}
      <section className="panel">
        <div className="panel__head">
          <div>
            <h2>Current Inventory Catalogue ({products.length} Models)</h2>
            <p className="panel__sub">Live database records from MongoDB.</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="table-controls">
          <div className="control-group">
            <label htmlFor="cat-filter">Filter by Category:</label>
            <select
              id="cat-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories ({products.length})</option>
              {dynCategories.map((c) => {
                const count = products.filter((p) => p.category === c).length;
                return (
                  <option key={c} value={c}>{c} ({count})</option>
                );
              })}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="search-input">Search Product Name:</label>
            <input
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
            />
          </div>
        </div>

        {loading ? (
          <p className="admin-boot">Loading products from database…</p>
        ) : filteredProducts.length === 0 ? (
          <p className="empty">No products match the selected criteria.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Category</th>
                  <th>Product Name</th>
                  <th>Rate per piece</th>
                  <th>Sort</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="table-thumb-wrap">
                        {p.imageUrl ? (
                          <img
                            src={assetUrl(p.imageUrl)}
                            alt={p.name}
                            className="table-thumb-img"
                            loading="lazy"
                          />
                        ) : (
                          <span className="table-thumb-empty" title="No photo uploaded">📦</span>
                        )}
                      </div>
                    </td>
                    <td><span className="table-category-tag">{p.category}</span></td>
                    <td><strong>{p.name}</strong></td>
                    <td className="table-price-cell">{rupees(p.price)}</td>
                    <td>{p.sortOrder}</td>
                    <td>
                      <span className={'pill pill--' + (p.isActive ? 'contacted' : 'closed')}>
                        {p.isActive ? 'published' : 'hidden'}
                      </span>
                    </td>
                    <td className="row-actions">
                      <button className="linkbtn" type="button" onClick={() => startEdit(p)}>
                        Edit
                      </button>
                      <button className="linkbtn linkbtn--danger" type="button" onClick={() => handleDelete(p)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
