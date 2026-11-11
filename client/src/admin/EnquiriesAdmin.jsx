import { useCallback, useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

const FILTERS = [
  { value: 'all', label: 'All Enquiries' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

export default function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState({ type: null, text: '' });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (value) => {
    setLoading(true);
    try {
      const res = await api.get('/admin/enquiries', {
        params: value === 'all' ? {} : { status: value },
      });
      setEnquiries(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Could not load enquiries.') });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  async function changeStatus(enquiry, value) {
    try {
      await api.patch('/admin/enquiries/' + enquiry._id, { status: value });
      setStatus({ type: 'ok', text: 'Marked ' + enquiry.name + '\'s enquiry as ' + value + '.' });
      load(filter);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Could not update status.') });
    }
  }

  async function handleDelete(enquiry) {
    if (!window.confirm('Delete the enquiry from ' + enquiry.name + '? This cannot be undone.')) return;
    try {
      await api.delete('/admin/enquiries/' + enquiry._id);
      setStatus({ type: 'ok', text: 'Enquiry deleted.' });
      load(filter);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Could not delete enquiry.') });
    }
  }

  function getWhatsAppUrl(enquiry) {
    const rawDigits = (enquiry.phone || '').replace(/\\D/g, '');
    const cleanPhone = rawDigits.length === 10 ? '91' + rawDigits : rawDigits;
    const msg = 'Namaste ' + enquiry.name + ', regarding your enquiry for ' + (enquiry.product || 'commercial equipment') + ' at Vikash Traders (Lunkaransar, Bikaner). How can we assist you with current wholesale rates and dispatch?';
    return 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent(msg);
  }

  return (
    <>
      <header className="admin__head">
        <div>
          <h1>Customer Quotation Enquiries</h1>
          <p>Real-time leads submitted via website quote forms. Reply instantly on WhatsApp or phone.</p>
        </div>
      </header>

      {status.type && (
        <p className={'formmsg formmsg--' + (status.type === 'ok' ? 'ok' : 'err')} role="status">
          {status.text}
        </p>
      )}

      {/* Filter Tabs */}
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={'filter' + (filter === f.value ? ' filter--on' : '')}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="panel">
        <div className="panel__head">
          <h2>Lead Submissions ({enquiries.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading enquiries from database…</p>
        ) : enquiries.length === 0 ? (
          <p className="empty">
            {filter === 'all'
              ? 'No customer enquiries received yet. They will automatically appear here when submitted.'
              : 'No enquiries currently marked as "' + filter + '".'}
          </p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Customer Name</th>
                  <th>Contact Details</th>
                  <th>Equipment Needed</th>
                  <th>Message / Specs</th>
                  <th>Status</th>
                  <th>Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id}>
                    <td>
                      <span className="table-date">
                        {new Date(e.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </td>
                    <td><strong>{e.name}</strong></td>
                    <td>
                      <div className="table-contact-cell">
                        <a className="table-phone-link" href={'tel:' + e.phone}>
                          📞 {e.phone}
                        </a>
                        <a
                          className="table-wa-link"
                          href={getWhatsAppUrl(e)}
                          target="_blank"
                          rel="noreferrer"
                          title="Reply directly on WhatsApp"
                        >
                          💬 WhatsApp Reply &rarr;
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className="table-product-badge">{e.product || 'General Enquiry'}</span>
                    </td>
                    <td className="cell-message">{e.message || '—'}</td>
                    <td>
                      <select
                        className={'pill-select pill--' + e.status}
                        value={e.status}
                        onChange={(ev) => changeStatus(e, ev.target.value)}
                        aria-label={'Status for ' + e.name}
                      >
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="closed">closed</option>
                      </select>
                    </td>
                    <td className="row-actions">
                      <button
                        className="linkbtn linkbtn--danger"
                        type="button"
                        onClick={() => handleDelete(e)}
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
      </section>
    </>
  );
}
