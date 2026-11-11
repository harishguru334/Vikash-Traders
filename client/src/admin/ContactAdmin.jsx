import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function ContactAdmin() {
  const [form, setForm] = useState({
    phone: '',
    whatsapp: '',
    email: '',
    hours: '',
    address: '',
    mapsUrl: '',
    linkedin: '',
    facebook: '',
    youtube: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/admin/content/contact');
        if (res.data && Object.keys(res.data).length > 0) {
          setForm(res.data);
        }
      } catch (err) {
        setStatus({ type: 'err', text: apiError(err, 'Failed to load contact settings.') });
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
      await api.post('/admin/content/contact', { data: form, status: 'Published' });
      setStatus({ type: 'ok', text: 'Central contact information saved. Header, footer, and contact section updated.' });
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save contact settings.') });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="admin-boot">Loading contact settings…</p>;

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Central Contact Information</h1>
          <p>The single source of truth for business contact details across headers, footers, and direct enquiry forms.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Contact Settings'}
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel" style={{ padding: 24, maxWidth: 840 }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Business Phone Number *</label>
              <input 
                type="text" 
                className="input" 
                value={form.phone} 
                onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                placeholder="+91 80478 26899" 
                required 
              />
            </div>

            <div className="form-group">
              <label>WhatsApp Sales Number *</label>
              <input 
                type="text" 
                className="input" 
                value={form.whatsapp} 
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} 
                placeholder="+91 98765 43210" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Official Commercial Email *</label>
              <input 
                type="email" 
                className="input" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                placeholder="sales@vikashtraders.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Business Operating Hours *</label>
              <input 
                type="text" 
                className="input" 
                value={form.hours} 
                onChange={(e) => setForm({ ...form, hours: e.target.value })} 
                placeholder="Monday – Saturday: 9:30 AM to 7:00 PM IST" 
                required 
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Facility & Warehouse Dispatch Address *</label>
              <input 
                type="text" 
                className="input" 
                value={form.address} 
                onChange={(e) => setForm({ ...form, address: e.target.value })} 
                placeholder="Commercial Equipment Facility & Central Dispatch Warehouse, India" 
                required 
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Google Maps Directions URL</label>
              <input 
                type="url" 
                className="input" 
                value={form.mapsUrl} 
                onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} 
                placeholder="https://maps.google.com/?q=..." 
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Company URL</label>
              <input 
                type="url" 
                className="input" 
                value={form.linkedin} 
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })} 
                placeholder="https://linkedin.com/company/..." 
              />
            </div>

            <div className="form-group">
              <label>Facebook Page URL</label>
              <input 
                type="url" 
                className="input" 
                value={form.facebook} 
                onChange={(e) => setForm({ ...form, facebook: e.target.value })} 
                placeholder="https://facebook.com/..." 
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>YouTube Channel URL</label>
              <input 
                type="url" 
                className="input" 
                value={form.youtube} 
                onChange={(e) => setForm({ ...form, youtube: e.target.value })} 
                placeholder="https://youtube.com/@..." 
              />
            </div>
          </div>

          <div style={{ marginTop: 24, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Saving Changes…' : 'Save Contact Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
