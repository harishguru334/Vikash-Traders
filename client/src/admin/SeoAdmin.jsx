import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function SeoAdmin() {
  const [form, setForm] = useState({
    title: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: 'assets/hero-equipment-showcase.svg',
    favicon: 'assets/hero-equipment-showcase.svg',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/admin/content/seo');
        if (res.data && Object.keys(res.data).length > 0) {
          setForm(res.data);
        }
      } catch (err) {
        setStatus({ type: 'err', text: apiError(err, 'Failed to load SEO settings.') });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, text: '' });

    try {
      await api.post('/admin/content/seo', { data: form, status: 'Published' });
      setStatus({ type: 'ok', text: 'SEO metadata saved and applied to website headers.' });
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save SEO settings.') });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="admin-boot">Loading SEO settings…</p>;

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Search Engine Optimization (SEO) & Social Graph</h1>
          <p>Meta tags, search title hierarchy, social preview cards, and live Google SERP simulator.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save SEO Settings'}
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20 }}>
        {/* Settings Form */}
        <div className="panel" style={{ padding: 24 }}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Website Title Tag *</label>
              <input 
                type="text" 
                className="input" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                placeholder="Vikash Traders — Commercial & Industrial Equipment Sourcing" 
                required 
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Recommended length: 50–60 characters ({form.title.length} chars)</span>
            </div>

            <div className="form-group">
              <label>Meta Description *</label>
              <textarea 
                className="textarea" 
                rows="3" 
                value={form.metaDescription} 
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} 
                placeholder="Direct B2B supplier of commercial cleaning machines, outdoor exercise gym equipment, HDPE plastic dustbins..." 
                required 
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Recommended length: 150–160 characters ({form.metaDescription.length} chars)</span>
            </div>

            <div className="form-group">
              <label>Target Keywords (comma-separated)</label>
              <input 
                type="text" 
                className="input" 
                value={form.keywords} 
                onChange={(e) => setForm({ ...form, keywords: e.target.value })} 
                placeholder="outdoor gym equipment, plastic dustbins, queue stands, concrete mixer" 
              />
            </div>

            <div className="form-group">
              <label>Open Graph (OG) Social Title</label>
              <input 
                type="text" 
                className="input" 
                value={form.ogTitle} 
                onChange={(e) => setForm({ ...form, ogTitle: e.target.value })} 
                placeholder="Vikash Traders — Commercial & Industrial B2B Equipment" 
              />
            </div>

            <div className="form-group">
              <label>Open Graph (OG) Social Description</label>
              <textarea 
                className="textarea" 
                rows="2" 
                value={form.ogDescription} 
                onChange={(e) => setForm({ ...form, ogDescription: e.target.value })} 
                placeholder="Official supplier of institutional fitness stations and municipal equipment..." 
              />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>OG Image Asset Path</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.ogImage} 
                  onChange={(e) => setForm({ ...form, ogImage: e.target.value })} 
                />
              </div>
              <div className="form-group">
                <label>Favicon Asset Path</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.favicon} 
                  onChange={(e) => setForm({ ...form, favicon: e.target.value })} 
                />
              </div>
            </div>
          </form>
        </div>

        {/* Live Google Search Result Simulator */}
        <div>
          <div className="panel" style={{ padding: 20 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', color: '#64748b', textTransform: 'uppercase' }}>
              Google Search Result Simulator
            </span>
            <div style={{ marginTop: 12, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: '0.78rem', color: '#202124', marginBottom: 2 }}>
                https://vikashtraders.com
              </div>
              <div style={{ color: '#1a0dab', fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.3, marginBottom: 4, cursor: 'pointer' }}>
                {form.title || 'Vikash Traders — Commercial & Industrial Equipment Sourcing'}
              </div>
              <div style={{ color: '#4d5156', fontSize: '0.82rem', lineHeight: 1.45 }}>
                {form.metaDescription || 'Direct B2B supplier of commercial cleaning machines, outdoor exercise gym equipment...'}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', color: '#64748b', textTransform: 'uppercase' }}>
                Social Share Preview
              </span>
              <div style={{ marginTop: 8, border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ height: 120, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {form.ogImage && <img src={form.ogImage} alt="OG" style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain' }} />}
                </div>
                <div style={{ padding: 12, background: '#ffffff' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>vikashtraders.com</div>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block', margin: '2px 0 4px' }}>
                    {form.ogTitle || form.title}
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>
                    {form.ogDescription || form.metaDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
