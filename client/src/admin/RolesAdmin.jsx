export default function RolesAdmin() {
  const permissions = [
    { section: 'Dashboard & Metrics', contentAdmin: 'View only', superAdmin: 'Full access' },
    { section: 'Products Catalogue', contentAdmin: 'Create, Edit, Delete, Publish, Sort', superAdmin: 'Full access' },
    { section: 'Categories Management', contentAdmin: 'Create, Edit, Delete (safe-check)', superAdmin: 'Full access' },
    { section: 'Quotation Leads & Enquiries', contentAdmin: 'View, Contact, Status Triage', superAdmin: 'Full access + Delete' },
    { section: 'Website Content (About, Why Us)', contentAdmin: 'Full editing & publishing', superAdmin: 'Full access' },
    { section: 'Industries & Gallery', contentAdmin: 'Upload media, manage photos', superAdmin: 'Full access' },
    { section: 'FAQs & Contact Information', contentAdmin: 'Update questions & contact info', superAdmin: 'Full access' },
    { section: 'SEO Settings', contentAdmin: 'Edit meta tags & preview SERP', superAdmin: 'Full access' },
    { section: 'Admin Users Management', contentAdmin: '❌ Access Denied (HTTP 403)', superAdmin: '✅ Create, edit, disable, delete' },
    { section: 'Roles & Permission Matrix', contentAdmin: 'View only', superAdmin: '✅ Full governance' },
    { section: 'Site Settings & System Security', contentAdmin: '❌ Access Denied (HTTP 403)', superAdmin: '✅ Maintenance toggle, session config' },
  ];

  return (
    <div className="admin-page">
      <header className="admin__head">
        <h1>Roles & Permissions Matrix</h1>
        <p>Two-tier role-based access control (RBAC) governance for Vikash Traders website administration.</p>
      </header>

      <div className="panel" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 8 }}>Role Definitions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="badge badge--content">Content Admin</span>
              <strong>Catalogue & Content Manager</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
              Permitted to manage catalogue products, wholesale rates, machinery photos, customer inquiries, FAQs, and public marketing content. Blocked from user administration and system settings.
            </p>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="badge badge--super">Super Admin</span>
              <strong>System Owner & Master Controller</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#14532d', lineHeight: 1.45, margin: 0 }}>
              Full administrative privileges across the entire application, including user provisioning, password resets, system maintenance mode, API controls, and database integrity.
            </p>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2>Capability Matrix</h2>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>System Management Section</th>
                <th>Content Admin Privilege</th>
                <th>Super Admin Privilege</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, idx) => (
                <tr key={idx}>
                  <td><strong>{p.section}</strong></td>
                  <td style={{ color: p.contentAdmin.includes('❌') ? '#dc2626' : '#334155' }}>
                    {p.contentAdmin}
                  </td>
                  <td style={{ color: '#0c5e42', fontWeight: 600 }}>
                    {p.superAdmin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
