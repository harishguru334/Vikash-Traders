
const updates = [
  {
    tag: 'CIVIC DISPATCH',
    num: '01',
    img: '/photos/why-yellow-bin.jpg',
    date: 'OCTOBER 2026',
    title: 'Bulk Commercial Waste Bins Dispatched for Municipal Sanitation Upgrades',
    desc: 'Supply of heavy-duty 50L to 100L HDPE pedal and wheeled bins with Swachh Bharat color-coding and full GST audit paperwork.',
  },
  {
    tag: 'COMMERCIAL HANDOVER',
    num: '02',
    img: '/photos/fiable-hero-equipment.jpg',
    date: 'SEPTEMBER 2026',
    title: 'Mechanized Floor Scrubbers & Wet/Dry Vacuums Deployed to Commercial Complexes',
    desc: 'Industrial cleaning machines dispatched to facilities in Bikaner and surrounding districts for large-area mechanized floor care.',
  },
  {
    tag: 'PUBLIC INFRASTRUCTURE',
    num: '03',
    img: '/photos/about-facility-stockyard.jpg',
    date: 'AUGUST 2026',
    title: 'Outdoor Gym Exercise Stations Delivered to Public Parks & Gram Panchayats',
    desc: 'Installed all-weather air walkers, waist twisters and pull-down stations designed for open civic community parks.',
  },
];

export default function Newsroom() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
      id="newsroom"
      aria-label="Operations & Newsroom"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-slate-100 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-px w-8 bg-emerald-600" />
            Dispatches &amp; Updates
            <span className="h-px w-8 bg-emerald-600" />
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Latest News &amp;{' '}
            <em className="font-serif font-medium not-italic text-emerald-600">
              Field Deployments
            </em>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Stay updated with recent equipment dispatches, institutional
            supplies, and civic sanitation installations across Rajasthan.
          </p>
        </div>

        {/* News cards */}
        <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-3">
          {updates.map((item) => (
            <article
              key={item.num}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/65 via-slate-950/5 to-transparent" />

                {/* Number */}
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-sm font-bold text-white backdrop-blur-sm">
                  {item.num}
                </span>

                {/* Tag */}
                <span className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] rounded-full border border-white/20 bg-slate-950/65 px-3 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 sm:text-2xl">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {item.desc}
                </p>

                {/* CTA */}
                <div className="mt-auto pt-7">
                  <a
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors duration-200 hover:text-emerald-800"
                    href="#contact"
                  >
                    <span>Enquire about similar supply</span>

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
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
