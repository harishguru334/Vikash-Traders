import { BUSINESS } from '../site.js';

const commitments = [
  {
    title: '100% Tax Compliant Documentation',
    desc:
      'Every dispatch is accompanied by an itemized GST tax invoice (GSTIN: ' +
      BUSINESS.gst +
      ') and transport challan, ensuring smooth institutional audit clearance.',
  },
  {
    title: 'Accurate Specifications & Handover',
    desc:
      'What you order is what is dispatched: verified liter capacities for bins, gauge thickness for outdoor gym steel, and tested electric motors for machines.',
  },
  {
    title: 'Direct Stockyard Transparency',
    desc:
      'We operate from our dedicated warehouse in Lunkaransar, Bikaner division. No speculative broker chains or surprise lead times.',
  },
];

export default function Testimonials() {
  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28"
      id="testimonials"
      aria-label="Procurement Assurance"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-slate-200/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-px w-8 bg-emerald-600" />
            Procurement Integrity
            <span className="h-px w-8 bg-emerald-600" />
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            The Vikash Traders{' '}
            <em className="font-serif font-medium not-italic text-emerald-600">
              Supply Assurance
            </em>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Institutional buyers, civil contractors and facility managers
            choose us for straightforward dealings, transparent rates, and
            complete statutory integrity.
          </p>
        </div>

        {/* Assurance cards */}
        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3">
          {commitments.map((c, idx) => (
            <article
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
              key={idx}
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />

              {/* Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  0{idx + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-7 text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 sm:text-2xl">
                {c.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                {c.desc}
              </p>

              {/* Bottom indicator */}
              <div className="mt-7 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-125" />
                <span className="h-px flex-1 bg-slate-100 transition-colors duration-300 group-hover:bg-emerald-100" />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Assurance footer */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* GST */}
            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M8 7h8M8 11h8M8 15h4" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <strong className="block text-sm font-semibold text-slate-900">
                    Active GSTIN
                  </strong>

                  <span className="mt-1 block break-all text-sm leading-6 text-slate-500">
                    {BUSINESS.gst}
                  </span>
                </div>
              </div>
            </div>

            {/* Facility */}
            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 21V5l9-3 9 3v16" />
                    <path d="M7 21v-7h10v7M8 8h.01M12 8h.01M16 8h.01" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <strong className="block text-sm font-semibold text-slate-900">
                    Operating Facility
                  </strong>

                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                    Lunkaransar, Bikaner Division
                  </span>
                </div>
              </div>
            </div>

            {/* Customer service */}
            <div className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2C10.6 20.3 3.7 13.4 3 5.2A2 2 0 0 1 5 3z" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <strong className="block text-sm font-semibold text-slate-900">
                    Customer Service
                  </strong>

                  <span className="mt-1 block wrap-break-word text-sm leading-6 text-slate-500">
                    {BUSINESS.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}