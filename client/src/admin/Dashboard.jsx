import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { apiError } from '../api/client.js';
import { rupees } from '../site.js';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/admin/stats')
      .then((res) => setStats(res.data))
      .catch((err) => setError(apiError(err, 'Could not load the dashboard.')));
  }, []);

  if (error) return <p className="formmsg formmsg--err">{error}</p>;
  if (!stats) return <p className="admin-boot">Loading…</p>;

  const cards = [
    { label: 'Products published', value: stats.activeProducts, note: `${stats.products} total in the catalogue` },
    { label: 'Categories', value: stats.categories, note: 'Shown as filter tabs on the website' },
    { label: 'Enquiries received', value: stats.enquiries, note: 'All time' },
    { label: 'Waiting for a reply', value: stats.newEnquiries, note: 'Still marked new' },
  ];

  return (
    <>
      <header className="admin__head">
        <h1>Dashboard</h1>
        <p>Everything the website is currently showing, and what is waiting on you.</p>
      </header>

      <div className="tiles">
        {cards.map((c) => (
          <div className="tile" key={c.label}>
            <div className="tile__value">{c.value}</div>
            <div className="tile__label">{c.label}</div>
            <div className="tile__note">{c.note}</div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel__head">
          <h2>Latest enquiries</h2>
          <Link className="btn btn--ghost" to="/admin/enquiries">Open all enquiries</Link>
        </div>

        {stats.latest.length === 0 ? (
          <p className="empty">No enquiries yet. They appear here as soon as the contact form is used.</p>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Phone</th><th>Product</th><th>Status</th><th>Received</th></tr>
            </thead>
            <tbody>
              {stats.latest.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td><a href={`tel:${e.phone}`}>{e.phone}</a></td>
                  <td>{e.product || '—'}</td>
                  <td><span className={`pill pill--${e.status}`}>{e.status}</span></td>
                  <td>{new Date(e.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <p className="hint">
        Rates shown on the website come straight from the products table — edit a price there and the
        public page updates on its next load. Example format: {rupees(12500)}.
      </p>
    </>
  );
}
