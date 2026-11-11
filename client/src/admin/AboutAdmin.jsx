import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';

export default function AboutAdmin() {
  const [data, setData] = useState({
    heading: '',
    intro: '',
    description: '',
    highlights: [],
    image: 'assets/hero-equipment-showcase.svg',
  });

  const [statusText, setStatusText] = useState('Published');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({
    type: null,
    text: '',
  });

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await api.get('/admin/content/about');

        if (res.data && Object.keys(res.data).length > 0) {
          setData(res.data);
          setHighlightsInput(
            (res.data.highlights || []).join('\n')
          );
        }
      } catch (err) {
        setFeedback({
          type: 'err',
          text: apiError(
            err,
            'Failed to load About Us content.'
          ),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  async function handleSave(e) {
    e.preventDefault();

    setSaving(true);
    setFeedback({
      type: null,
      text: '',
    });

    const highlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const payload = {
      ...data,
      highlights,
    };

    try {
      await api.post('/admin/content/about', {
        data: payload,
        status: statusText,
      });

      setFeedback({
        type: 'ok',
        text:
          'About Us section saved & synced to live website successfully.',
      });
    } catch (err) {
      setFeedback({
        type: 'err',
        text: apiError(
          err,
          'Failed to save About Us content.'
        ),
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="admin-boot p-6 text-sm text-slate-500">
        Loading About Us editor…
      </p>
    );
  }

  return (
    <div className="admin-page min-w-0">
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <header className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            About Us Content Editor
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Verified factual company information. Updates appear instantly
            on the public website About section.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              'pill ' +
              (statusText === 'Published'
                ? 'pill--active'
                : 'pill--draft')
            }
          >
            {statusText}
          </span>

          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() =>
              setStatusText((s) =>
                s === 'Published' ? 'Draft' : 'Published'
              )
            }
          >
            {statusText === 'Published'
              ? 'Set as Draft'
              : 'Set as Published'}
          </button>

          <button
            type="button"
            className="btn btn--primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save & Publish'}
          </button>
        </div>
      </header>

      {/* =========================================================
          FEEDBACK
      ========================================================== */}
      {feedback.text && (
        <div
          className={
            'formmsg formmsg--' +
            feedback.type +
            ' mb-5'
          }
        >
          {feedback.text}
        </div>
      )}

      {/* =========================================================
          MAIN GRID
      ========================================================== */}
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        {/* =======================================================
            EDITOR FORM
        ======================================================== */}
        <div className="panel overflow-visible p-5 sm:p-6">
          {/* Heading */}
          <div className="form-group">
            <label>Section Heading *</label>

            <input
              type="text"
              className="input"
              value={data.heading}
              onChange={(e) =>
                setData({
                  ...data,
                  heading: e.target.value,
                })
              }
              placeholder="e.g. Direct B2B Industrial Equipment Sourcing Without Middlemen"
              required
            />
          </div>

          {/* Introduction */}
          <div className="form-group">
            <label>Company Introduction *</label>

            <textarea
              className="textarea min-h-24"
              rows="3"
              value={data.intro}
              onChange={(e) =>
                setData({
                  ...data,
                  intro: e.target.value,
                })
              }
              placeholder="High-level commercial intro of Vikash Traders..."
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>
              Full Procurement &amp; Sourcing Description *
            </label>

            <textarea
              className="textarea min-h-36"
              rows="5"
              value={data.description}
              onChange={(e) =>
                setData({
                  ...data,
                  description: e.target.value,
                })
              }
              placeholder="Details on factory lines, verified quality benchmarks, logistics..."
              required
            />
          </div>

          {/* Highlights */}
          <div className="form-group">
            <label>
              Key Value Highlights (One per line)
            </label>

            <textarea
              className="textarea min-h-32"
              rows="4"
              value={highlightsInput}
              onChange={(e) =>
                setHighlightsInput(e.target.value)
              }
              placeholder={`100% Tax Invoiced with official GSTIN
Factory-direct wholesale rates
Field-tested commercial specifications`}
            />

            <span className="mt-1 block text-xs leading-5 text-slate-500">
              Separate each highlight bullet by pressing Enter.
            </span>
          </div>

          {/* Image */}
          <div className="form-group mb-0">
            <label>Section Image Asset Path</label>

            <input
              type="text"
              className="input"
              value={data.image}
              onChange={(e) =>
                setData({
                  ...data,
                  image: e.target.value,
                })
              }
              placeholder="assets/hero-equipment-showcase.svg"
            />
          </div>
        </div>

        {/* =======================================================
            LIVE PREVIEW
        ======================================================== */}
        <div className="min-w-0">
          <div className="panel p-5 sm:p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Website Preview
            </span>

            <div className="mt-3 border-t border-slate-200 pt-4">
              <h3 className="text-xl font-bold leading-snug text-slate-900">
                {data.heading ||
                  'Direct B2B Industrial Equipment Sourcing'}
              </h3>

              <p className="mt-2 text-sm font-semibold leading-6 text-emerald-700">
                {data.intro || 'Intro summary...'}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {data.description || 'Full description...'}
              </p>

              {/* Key Assurances */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <strong className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                  Key Assurances
                </strong>

                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-5 text-slate-600">
                  {highlightsInput
                    .split('\n')
                    .filter((h) => h.trim())
                    .map((h, i) => (
                      <li key={i}>{h.trim()}</li>
                    ))}
                </ul>
              </div>

              {/* Image Preview */}
              {data.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-4">
                  <div className="flex min-h-40 items-center justify-center">
                    <img
                      src={data.image}
                      alt="About section preview"
                      className="max-h-36 max-w-full object-contain"
                    />
                  </div>

                  <p className="mt-3 break-all text-xs text-slate-400">
                    {data.image}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}