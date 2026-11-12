
import { useState } from 'react';

const galleryPhotos = [
  {
    src: '/photos/roadnex-traffic-cones.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Prismatic Reflective Traffic Cones',
    caption:
      'High-density virgin rubber 750mm and 1000mm traffic cones with dual prismatic 3M reflective sleeves staged for highway procurement.',
    badge: 'ROADNEX™ Flagship',
  },
  {
    src: '/photos/roadnex-speed-bump.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Heavy Modular Speed Bumps',
    caption:
      '40-ton axle load capacity vulcanized rubber speed breakers with integrated cat-eye glass reflectors and non-skid diamond traction.',
    badge: '40-Ton Rated',
  },
  {
    src: '/photos/roadnex-hero-infrastructure.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Toll & Entrance Infrastructure',
    caption:
      'Entrance security setup with heavy rubber speed bump, boom barrier, and high-visibility yellow caution flashers.',
    badge: 'Infrastructure',
  },
  {
    src: '/photos/roadnex-convex-mirror.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Polycarbonate Convex Safety Mirrors',
    caption:
      'Unbreakable wide-angle 130° convex traffic mirrors with UV-resistant orange hooded backplates and heavy steel mounting brackets.',
    badge: 'Wide-Angle 130°',
  },
  {
    src: '/photos/roadnex-solar-stud.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Solar LED Aluminium Road Studs',
    caption:
      'Heavy cast-aluminium solar cat eyes with monocrystalline panels, dual ultra-bright LEDs, and 20-ton vehicular compression.',
    badge: 'Solar Powered',
  },
  {
    src: '/photos/roadnex-wheel-stopper.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Rubber Wheel Stoppers & Curbs',
    caption:
      'Heavy-duty vulcanized rubber parking curbs with high-visibility chevron yellow reflective panels for commercial bays.',
    badge: 'Parking Safety',
  },
  {
    src: '/photos/roadnex-road-barrier.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Water-Filled Safety Road Barriers',
    caption:
      'UV-stabilized virgin HDPE interlocking red/white water or sand-filled road dividers for highway diversions.',
    badge: 'HDPE Barriers',
  },
  {
    src: '/photos/roadnex-police-barricade.jpg',
    category: 'Road Safety (ROADNEX™)',
    title: 'ROADNEX™ Heavy Mobile Steel Police Barricades',
    caption:
      'Galvanized tubular steel security barricades on wheels with interlocking hooks and reflective caution signs.',
    badge: 'Heavy Steel',
  },
  {
    src: '/photos/about-facility-stockyard.jpg',
    category: 'Stockyard',
    title: 'Central Stockyard Facility',
    caption:
      'Warehouse logistics base in Lunkaransar storing ready inventory for rapid dispatch.',
  },
  {
    src: '/photos/why-yellow-bin.jpg',
    category: 'Bins',
    title: 'Heavy-Duty UV Stabilized HDPE Bins',
    caption:
      'Virgin HDPE commercial waste bins designed for extreme climate resistance and public municipal durability.',
  },
  {
    src: '/photos/open-gym-park.svg',
    category: 'Gym',
    title: 'Public Park Fitness Stations',
    caption:
      'Outdoor gym air walkers and waist twisters installed in civic park facilities.',
  },
  {
    src: '/photos/concrete-mixer-dispatch.svg',
    category: 'Construction',
    title: 'Civil Construction Machinery',
    caption:
      'Portable and semi-automatic concrete mixers ready for road and construction transport.',
  },
  {
    src: '/photos/ride-on-scrubber.svg',
    category: 'Equipment',
    title: 'Industrial Floor Cleaning Fleet',
    caption:
      'Mechanized scrubbers and wet & dry vacuums for corporate and hospital maintenance.',
  },
];

const categories = [
  'All',
  'Road Safety (ROADNEX™)',
  'Stockyard',
  'Bins',
  'Equipment',
  'Gym',
  'Construction',
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeTab);

  return (
    <section
      id="gallery"
      aria-label="Visual Stockyard and Operations Gallery"
      className="
        relative
        overflow-hidden
        bg-white
        py-16
        sm:py-20
        lg:py-28
      "
    >
      {/* =========================================
          BACKGROUND DECORATION
      ========================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          top-20
          h-72
          w-72
          rounded-full
          bg-emerald-100/40
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-28
          bottom-10
          h-80
          w-80
          rounded-full
          bg-slate-100/80
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================
            SECTION HEADER
        ========================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-emerald-500 sm:w-10"
            />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-emerald-600
              "
            >
              Verified Operations
            </span>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-emerald-500 sm:w-10"
            />
          </div>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-slate-950
              sm:text-4xl
              lg:text-5xl
            "
          >
            Stockyard Inventory &amp;{' '}
            <span className="text-emerald-600">
              Dispatched Equipment
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
            "
          >
            Real visuals from our central stockyard in Lunkaransar and
            operational machinery deployed across Rajasthan.
          </p>
        </div>

        {/* =========================================
            FILTER TABS
        ========================================== */}
        <div
          className="
            mt-9
            flex
            gap-2
            overflow-x-auto
            pb-2
            scrollbar-none
            sm:mt-10
            sm:flex-wrap
            sm:justify-center
            sm:overflow-visible
            sm:pb-0
          "
          role="tablist"
          aria-label="Gallery Filters"
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat;

            const tabClass = isActive
              ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-900/10'
              : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700';

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat)}
                className={
                  'shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ' +
                  tabClass
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* =========================================
            GALLERY GRID
        ========================================== */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {filtered.map((item, idx) => (
            <article
              key={item.src + '-' + idx}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-400
                hover:-translate-y-1
                hover:border-slate-300
                hover:shadow-xl
                hover:shadow-slate-900/10
              "
            >
              {/* Image */}
             <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Image overlay */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-slate-950/35
                    via-transparent
                    to-transparent
                    opacity-70
                  "
                />

                {/* Category & Feature badge */}
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur-md ${
                      item.category.includes('ROADNEX')
                        ? 'border-amber-300 bg-amber-500 text-white shadow-xs'
                        : 'border-white/40 bg-slate-950/60 text-white'
                    }`}
                  >
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="hidden rounded-full border border-white/30 bg-slate-950/60 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-white backdrop-blur-md sm:inline-block">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Hover icon */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    text-slate-800
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                    translate-y-2
                  "
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className="
                        text-lg
                        font-bold
                        leading-snug
                        tracking-tight
                        text-slate-950
                        transition-colors
                        duration-300
                        group-hover:text-emerald-700
                      "
                    >
                      {item.title}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-50
                      text-xs
                      font-bold
                      text-slate-400
                      transition-all
                      duration-300
                      group-hover:bg-emerald-50
                      group-hover:text-emerald-600
                    "
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  {item.caption}
                </p>

                <div
                  aria-hidden="true"
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-slate-400
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-emerald-600
                  "
                >
                  <span>View operation</span>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            className="
              mt-8
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-slate-50
              px-6
              py-12
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white
                text-slate-400
                shadow-sm
              "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              No gallery images in this category.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try another category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
