
import { BUSINESS } from '../site.js';

export default function WhyChooseUs() {
  const pillars = [
    {
      title: 'Premium Industrial Build',
      desc: 'High-grade virgin polymers, heavy-duty bearings, and robust steel alloys engineered for maximum service longevity.',
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
    {
      title: 'Desert Climate Durability',
      desc: 'Engineered specifically for extreme weather: high summer heat, wind-borne desert dust, and intensive civic usage.',
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
          />
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
          />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
        </svg>
      ),
    },
    {
      title: 'ROADNEX™ Road Safety & EN-840 Standards',
      desc: 'MoRTH compliant road safety products under our ROADNEX™ brand alongside EN-840 certified HDPE bins and equipment matching national standards.',
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
    },
    {
      title: 'GST Verified & Direct Stockyard',
      desc: `GSTIN: ${BUSINESS.gst} verified commercial firm. Direct freight dispatch from central stockyard with official tax invoices.`,
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
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
      ),
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
      id="why"
      aria-label="Why Choose Vikash Traders"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-emerald-50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-slate-100 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-px w-8 bg-emerald-600" />
            Commercial Advantages
            <span className="h-px w-8 bg-emerald-600" />
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Procurement Teams Choose{' '}
            <em className="font-serif font-medium not-italic text-emerald-600">
              Vikash Traders
            </em>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Durable, certified, and cost-effective commercial equipment
            solutions trusted by contractors, infrastructure developers, and
            municipal institutions across Rajasthan.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, idx) => (
            <article
              key={idx}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />

              {/* Icon */}
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                  {p.icon}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  0{idx + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-7 text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                {p.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                {p.desc}
              </p>

              {/* Bottom marker */}
              <div className="mt-7 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-125" />
                <span className="h-px flex-1 bg-slate-100 transition-colors duration-300 group-hover:bg-emerald-100" />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Advantage
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Credential Strip */}
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm">
              <svg
                className="h-5.5 w-5.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>

            {/* Content */}
            <div className="min-w-0">
              <strong className="block text-base font-bold text-slate-900 sm:text-lg">
                Verified Direct Procurement Partner
              </strong>

              <p className="mt-1.5 text-sm leading-6 text-slate-600 sm:text-base">
                Holding physical inventory in our central Lunkaransar
                stockyard enables same-day dispatch and zero speculative
                middle-tier markups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

