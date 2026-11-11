
import { useMemo, useState } from 'react';
import { rupees } from '../site.js';
import { assetUrl } from '../api/client.js';

export default function Products({ products, loading, error, onEnquire }) {
  const [active, setActive] = useState('All');

  const categories = useMemo(() => {
    const seen = [];

    products.forEach((p) => {
      if (!seen.includes(p.category)) {
        seen.push(p.category);
      }
    });

    return seen;
  }, [products]);

  const shown =
    active === 'All'
      ? categories
      : categories.filter((c) => c === active);

  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
      id="products"
      aria-label="Commercial Equipment Catalogue"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-slate-100 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-px w-8 bg-emerald-600" />
            Commercial Catalogue
            <span className="h-px w-8 bg-emerald-600" />
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Engineered Equipment &amp;{' '}
            <em className="font-serif font-medium not-italic text-emerald-600">
              Verified Wholesale Rates
            </em>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Prices are per piece and exclude GST. Figures below reflect the
            active catalogue in our system. Dispatched directly from our
            Lunkaransar facility.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-10 flex min-h-60 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <span
              className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold text-slate-700 sm:text-base">
              Loading commercial equipment catalogue&hellip;
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while the latest catalogue is being loaded.
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div
            className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6v4M10 13.5v.1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div>
                <p className="font-semibold">Unable to load catalogue</p>
                <p className="mt-1 text-sm leading-6 text-red-600">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 7l8-4 8 4v10l-8 4-8-4z" />
                <path d="M4 7l8 4 8-4M12 11v10" />
              </svg>
            </div>

            <p className="mt-5 text-base font-semibold text-slate-800">
              No products are currently published in the catalogue.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Call us for live rates and current stock availability.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <>
            {/* Category filters */}
            <div
              className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:mt-12 sm:p-4"
              role="tablist"
              aria-label="Product Category Filters"
            >
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  className={
                    'shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-5 ' +
                    (active === 'All'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-emerald-50 hover:text-emerald-700')
                  }
                  onClick={() => setActive('All')}
                  role="tab"
                  aria-selected={active === 'All'}
                >
                  All Categories ({products.length})
                </button>

                {categories.map((c) => {
                  const count = products.filter(
                    (p) => p.category === c
                  ).length;

                  return (
                    <button
                      type="button"
                      key={c}
                      className={
                        'shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-5 ' +
                        (active === c
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-emerald-50 hover:text-emerald-700')
                      }
                      onClick={() => setActive(c)}
                      role="tab"
                      aria-selected={active === c}
                    >
                      {c} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product category blocks */}
            <div className="mt-12 space-y-14 sm:mt-14 sm:space-y-16">
              {shown.map((category) => {
                const items = products.filter(
                  (p) => p.category === category
                );

                const prices = items.map((p) => p.price);
                const low = Math.min(...prices);
                const high = Math.max(...prices);

                return (
                  <div key={category}>
                    {/* Category heading */}
                    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="h-7 w-1 rounded-full bg-emerald-500" />

                          <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            {category}
                          </h3>
                        </div>

                        <span className="mt-2 ml-4 block text-sm text-slate-500">
                          {items.length}{' '}
                          {items.length === 1 ? 'Model' : 'Models'} Available
                        </span>
                      </div>

                      <div className="self-start rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 sm:self-auto">
                        {low === high
                          ? rupees(low)
                          : rupees(low) + ' – ' + rupees(high)}
                      </div>
                    </div>

                    {/* Products */}
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {items.map((p) => (
                        <article
                          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60"
                          key={p._id}
                        >
                          {/* Product image */}
                          <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                            {p.imageUrl ? (
                              <>
                                <img
                                  src={assetUrl(p.imageUrl)}
                                  alt={p.name}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/45 via-transparent to-transparent opacity-70"
                                />
                              </>
                            ) : (
                              <div className="flex h-full min-h-56 flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-6 text-center text-slate-500">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                                  <svg
                                    className="h-7 w-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                  >
                                    <rect
                                      x="2"
                                      y="7"
                                      width="20"
                                      height="14"
                                      rx="2"
                                      ry="2"
                                    />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                  </svg>
                                </div>

                                <span className="mt-4 text-sm font-medium">
                                  Stock Available
                                </span>

                                <span className="mt-1 text-xs text-slate-400">
                                  Photo on Request
                                </span>
                              </div>
                            )}

                            {/* Category tag */}
                            <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-full border border-white/30 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                              {p.category}
                            </span>
                          </div>

                          {/* Product body */}
                          <div className="flex flex-1 flex-col p-5 sm:p-6">
                            <h4 className="text-lg font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-emerald-700 sm:text-xl">
                              {p.name}
                            </h4>

                            {/* Pricing */}
                            <div className="mt-5 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
                              <div className="text-2xl font-bold tracking-tight text-slate-900">
                                {rupees(p.price)}
                              </div>

                              <div className="mt-1 text-xs font-medium text-slate-500">
                                per piece, excl. GST
                              </div>
                            </div>

                            {/* CTA */}
                            <button
                              type="button"
                              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/15 transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.99]"
                              onClick={() => onEnquire(p.name)}
                            >
                              <span>Ask for this Rate</span>

                              <span
                                className="transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                              >
                                &rarr;
                              </span>
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

