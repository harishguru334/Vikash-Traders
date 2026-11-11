import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import api, { apiError } from '../api/client.js';

export default function SettingsAdmin() {
  const { isSuperAdmin } = useOutletContext() || {};
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    notificationEmail: 'sales@vikashtraders.com',
    sessionTimeoutMinutes: 60,
    enablePublicPricing: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });

  useEffect(() => {
    async function load() {
      if (!isSuperAdmin) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/admin/settings');
        if (res.data) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        setStatus({ type: 'err', text: apiError(err, 'Failed to load site settings.') });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isSuperAdmin]);

  // Shield
  if (!isSuperAdmin) {
    return (
      <div className="admin-page">
        <div className="panel" style={{ padding: 40, textAlign: 'center', maxWidth: 600, margin: '40px auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔒</div>
          <h2>Super Admin Privilege Required</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
            System configuration and site settings are strictly restricted to Super Administrators.
          </p>
          <div style={{ marginTop: 20 }}>
            <span className="badge badge--warning">HTTP 403 Forbidden Access</span>
          </div>
        </div>
      </div>
    );
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, text: '' });

    try {
      await api.post('/admin/settings', settings);
      setStatus({ type: 'ok', text: 'Site settings updated successfully.' });
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save settings.') });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="admin-boot">Loading site settings…</p>;

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Site Settings & System Security</h1>
          <p>Super Admin control: Application maintenance mode, lead alerts, session controls, and security parameters.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Site Settings'}
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel" style={{ padding: 24, maxWidth: 740 }}>
        <form onSubmit={handleSave}>
          <div className="form-group" style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong>Maintenance Mode</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  When enabled, shows a temporary maintenance notice to public visitors while allowing administrators to work.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.maintenanceMode} 
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} 
                style={{ width: 20, height: 20, cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Inbound Quotation Lead Alert Email</label>
            <input 
              type="email" 
              className="input" 
              value={settings.notificationEmail} 
              onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })} 
              placeholder="sales@vikashtraders.com" 
            />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Every new RFQ received will notify this email address.</span>
          </div>

          <div className="form-group">
            <label>Session Timeout (Minutes)</label>
            <input 
              type="number" 
              className="input" 
              value={settings.sessionTimeoutMinutes} 
              onChange={(e) => setSettings({ ...settings, sessionTimeoutMinutes: Number(e.target.value) })} 
            />
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Duration of inactivity before re-authentication is required.</span>
          </div>

          <div className="form-group" style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong>Show Public Wholesale Pricing</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  Display indicative ₹ rates directly on public catalogue cards.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.enablePublicPricing} 
                onChange={(e) => setSettings({ ...settings, enablePublicPricing: e.target.checked })} 
                style={{ width: 20, height: 20, cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ marginTop: 24, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Saving Changes…' : 'Save Site Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
