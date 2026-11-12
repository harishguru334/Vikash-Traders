
const industries = [
  {
    title: 'Highways, Roads & Traffic Authorities',
    badge: 'ROADNEX™ Road Safety',
    icon: 'roadsafety',
    body: 'Highway developers, smart cities, and traffic divisions procuring ROADNEX™ cones, speed humps, convex mirrors, solar road studs, and delineators.',
  },
  {
    title: 'Municipal Corporations & Civic Bodies',
    badge: 'Civic Hygiene',
    icon: 'building',
    body: 'Sanitation departments buying commercial bins, street sweepers and scrubbers in volume with verified tender paperwork.',
  },
  {
    title: 'Construction Sites & Civil Projects',
    badge: 'Heavy Duty',
    icon: 'construction',
    body: 'Contractors sourcing semi-automatic concrete mixers, compressive test hammers and queue stanchions for active sites.',
  },
  {
    title: 'Hospitals & Medical Facilities',
    badge: 'Sanitation',
    icon: 'hospital',
    body: 'Healthcare institutions requiring colour-coded biomedical waste bins, wet & dry vacuums and automatic shoe polishers.',
  },
  {
    title: 'Public Parks & Sports Grounds',
    badge: 'Civic Amenity',
    icon: 'park',
    body: 'Gram panchayats and municipal councils installing outdoor open-gym air walkers, waist twisters and robust public park equipment.',
  },
  {
    title: 'Commercial Complexes & Malls',
    badge: 'Facility Care',
    icon: 'mall',
    body: 'Property managers deploying floor scrubber driers, entrance queue stands, and automatic shoe shiners for daily operations.',
  },
  {
    title: 'Educational Institutions & Campuses',
    badge: 'Campus Care',
    icon: 'education',
    body: 'Colleges and residential schools ordering high-capacity open-top dustbins, campus sweepers and outdoor fitness stations.',
  },
];

function IndustryIcon({ type }) {
  const iconProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (type === 'roadsafety') {
    return (
      <svg {...iconProps}>
        <polygon points="4 20 20 20 18 17 6 17" />
        <polygon points="8 17 16 17 14 4 10 4" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9.5" y1="8" x2="14.5" y2="8" />
      </svg>
    );
  }

  if (type === 'building') {
    return (
      <svg {...iconProps}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="9" y1="22" x2="9" y2="2" />
        <line x1="8" y1="6" x2="8.01" y2="6" />
        <line x1="16" y1="6" x2="16.01" y2="6" />
        <line x1="8" y1="11" x2="8.01" y2="11" />
        <line x1="16" y1="11" x2="16.01" y2="11" />
      </svg>
    );
  }

  if (type === 'construction') {
    return (
      <svg {...iconProps}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }

  if (type === 'hospital') {
    return (
      <svg {...iconProps}>
        <path d="M12 6v12M6 12h12" />
        <rect x="3" y="3" width="18" height="18" rx="4" />
      </svg>
    );
  }

  if (type === 'park') {
    return (
      <svg {...iconProps}>
        <path d="M12 22v-7" />
        <path d="M17 15c1.66 0 3-1.34 3-3 0-1.3-.84-2.4-2-2.82V9a5 5 0 0 0-10 0v.18C6.84 9.6 6 10.7 6 12c0 1.66 1.34 3 3 3" />
      </svg>
    );
  }

  if (type === 'mall') {
    return (
      <svg {...iconProps}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export default function Industries() {
  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28"
      id="industries"
      aria-label="Industries We Serve"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-16 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-slate-200/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-px w-8 bg-emerald-600" />
            Sectors We Supply
            <span className="h-px w-8 bg-emerald-600" />
          </span>
        </div>

        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Serving Key Sectors Across{' '}
            <em className="font-serif font-medium not-italic text-emerald-600">
              Rajasthan
            </em>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            From municipal public hygiene tenders to corporate facility
            maintenance and civil infrastructure, our inventory supports
            diverse institutional procurement needs.
          </p>
        </div>

        {/* Industry cards */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((ind, index) => (
            <article
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
              key={ind.title}
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                  <IndustryIcon type={ind.icon} />
                </div>

                <span className="inline-flex shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors duration-300 group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  {ind.badge}
                </span>
              </div>

              {/* Card index */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  0{index + 1}
                </span>

                <span className="h-px flex-1 bg-slate-100" />
              </div>

              {/* Content */}
              <h3 className="mt-5 text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                {ind.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {ind.body}
              </p>

              {/* Bottom detail */}
              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <span>Institutional Supply</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h11M11 6l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
