import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function FaqsAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: null, text: '' });
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [form, setForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    displayOrder: 0,
    isActive: true,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/admin/faqs');
      setFaqs(res.data);
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to load FAQs.') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingFaq(null);
    setForm({
      question: '',
      answer: '',
      category: 'General',
      displayOrder: faqs.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  }

  function openEdit(faq) {
    setEditingFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      displayOrder: faq.displayOrder || 0,
      isActive: faq.isActive !== false,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingFaq) {
        await api.put(`/admin/faqs/${editingFaq._id}`, form);
        setStatus({ type: 'ok', text: 'FAQ updated successfully.' });
      } else {
        await api.post('/admin/faqs', form);
        setStatus({ type: 'ok', text: 'New FAQ added.' });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to save FAQ.') });
    }
  }

  async function handleDelete(faq) {
    if (!window.confirm(`Delete FAQ "${faq.question}"?`)) return;
    try {
      await api.delete(`/admin/faqs/${faq._id}`);
      setStatus({ type: 'ok', text: 'FAQ deleted.' });
      load();
    } catch (err) {
      setStatus({ type: 'err', text: apiError(err, 'Failed to delete FAQ.') });
    }
  }

  return (
    <div className="admin-page">
      <header className="admin__head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Frequently Asked Questions (FAQs)</h1>
          <p>Commercial questions on GST input tax credit, minimum order quantities, freight dispatch, and equipment warranty.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAdd}>
          + Add FAQ
        </button>
      </header>

      {status.text && (
        <div className={`formmsg formmsg--${status.type}`} style={{ marginBottom: 16 }}>
          {status.text}
        </div>
      )}

      <div className="panel">
        <div className="panel__head">
          <h2>Published Questions ({faqs.length})</h2>
        </div>

        {loading ? (
          <p className="admin-boot">Loading FAQs…</p>
        ) : faqs.length === 0 ? (
          <p className="empty">No FAQs configured yet. Click + Add FAQ to create your first question.</p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Order</th>
                  <th>Category</th>
                  <th style={{ width: '32%' }}>Question</th>
                  <th>Answer</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((f) => (
                  <tr key={f._id}>
                    <td><strong>{f.displayOrder}</strong></td>
                    <td><span className="badge badge--neutral">{f.category}</span></td>
                    <td><strong>{f.question}</strong></td>
                    <td style={{ fontSize: '0.85rem', color: '#475569' }}>{f.answer}</td>
                    <td>
                      <span className={`pill ${f.isActive ? 'pill--active' : 'pill--draft'}`}>
                        {f.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="btn btn--ghost btn--sm" onClick={() => openEdit(f)}>Edit</button>
                      <button type="button" className="btn btn--danger-ghost btn--sm" style={{ marginLeft: 6 }} onClick={() => handleDelete(f)}>Delete</button>
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
              <h3>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal__body">
              <div className="form-group">
                <label>Question *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={form.question} 
                  onChange={(e) => setForm({ ...form, question: e.target.value })} 
                  placeholder="e.g. Do you provide full GST tax invoices for commercial purchases?" 
                  required 
                />
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Category Tag</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value })} 
                    placeholder="e.g. Invoicing & Tax, Freight, Warranty" 
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
                <label>Factual Answer *</label>
                <textarea 
                  className="textarea" 
                  rows="4" 
                  value={form.answer} 
                  onChange={(e) => setForm({ ...form, answer: e.target.value })} 
                  placeholder="Detailed, accurate operational response..." 
                  required 
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  id="faqActiveCheck" 
                  checked={form.isActive} 
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })} 
                />
                <label htmlFor="faqActiveCheck" style={{ margin: 0, cursor: 'pointer' }}>
                  FAQ is published and visible on the website
                </label>
              </div>

              <div className="admin-modal__foot" style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn--ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary">{editingFaq ? 'Save Changes' : 'Create FAQ'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
