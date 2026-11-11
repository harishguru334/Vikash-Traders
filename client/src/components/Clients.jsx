const sectors = [
  {
    name: 'Municipal Corporations',
    tag: 'CIVIC SANITATION',
    desc: 'Nagar Palikas & Urban Local Bodies procuring commercial dustbins, street sweepers and tender documentation.',
  },
  {
    name: 'Infrastructure & PWD Sites',
    tag: 'CIVIL WORKS',
    desc: 'Contractors sourcing semi-automatic concrete mixers, test hammers, and site perimeter queue stanchions.',
  },
  {
    name: 'Gram Panchayats & Parks',
    tag: 'PUBLIC FITNESS',
    desc: 'Rural development and municipal councils setting up community open-gym exercise stations.',
  },
  {
    name: 'Hospitals & Healthcare Units',
    tag: 'HEALTH HYGIENE',
    desc: 'Medical centres maintaining hygiene with pedal bins, scrubber driers and sensory automatic shoe shiners.',
  },
  {
    name: 'Commercial & Facility Hubs',
    tag: 'FACILITY MANAGEMENT',
    desc: 'Hotels, colleges and malls requiring ongoing dispatch of cleaning machinery and waste stations.',
  },
];

const sectorIcons = {
  'Municipal Corporations': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20V8l8-4 8 4v12M8 20v-6h8v6M9 9h.01M15 9h.01M9 12h.01M15 12h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'Infrastructure & PWD Sites': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h16M6 17V9l6-4 6 4v8M9 17v-5h6v5M4 20l3-3m13 3-3-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'Gram Panchayats & Parks': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21V10M12 10C8 10 5 7.5 5 4c4 0 7 2.5 7 6Zm0 3c4 0 7-2.5 7-6-4 0-7 2.5-7 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'Hospitals & Healthcare Units': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.4 7-10.2C19 7.5 17 5 14.5 5 13 5 12 6 12 7.2 12 6 11 5 9.5 5 7 5 5 7.5 5 10.8 5 16.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 11h6M12 8v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  'Commercial & Facility Hubs': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h16M6 20V8h5v12M13 20V4h5v16M8 11h1M8 14h1M15 8h1M15 11h1M15 14h1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Clients() {
  const repeatedSectors = sectors.concat(sectors);

  return (
    <section
      id="clients"
      aria-label="Sectors and Client Networks"
      className="
        relative
        overflow-hidden
        bg-slate-50/70
        py-16
        sm:py-20
        lg:py-28
      "
    >
      <style>{`
        @keyframes clientsMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .clients-marquee-track {
          animation: clientsMarquee 28s linear infinite;
          width: max-content;
        }

        .clients-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          top-24
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
          bg-white
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-emerald-500 sm:w-10"
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-600
              "
            >
              Institutional Trust
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
            Procurement Networks &amp;{' '}
            <span className="text-emerald-600">
              Sectors Served
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
            Direct equipment supplies with full GST tax invoice compliance
            to public works, civic bodies, and commercial projects across
            Rajasthan.
          </p>
        </div>

        {/* =========================
            MOVING SECTOR TICKER
        ========================== */}
        <div
          className="
            relative
            my-10
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/80
            bg-white/80
            py-3
            shadow-sm
            backdrop-blur-sm
          "
        >
          {/* Left fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-10
              w-14
              bg-linear-to-r
              from-white
              to-transparent
            "
          />

          {/* Right fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-10
              w-14
              bg-linear-to-l
              from-white
              to-transparent
            "
          />

          <div className="overflow-hidden">
            <div className="clients-marquee-track flex min-w-max items-center">
              {repeatedSectors.map((sector, index) => (
                <div
                  key={`${sector.name}-${index}`}
                  className="
                    mx-1.5
                    flex
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition-all
                    duration-300
                    hover:border-emerald-200
                    hover:bg-emerald-50
                    hover:text-emerald-700
                  "
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{sector.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================
            SECTOR CARDS
        ========================== */}
        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {sectors.map((sector, index) => (
            <article
              key={sector.name}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-emerald-200
                hover:shadow-xl
                sm:p-7
              "
            >
              {/* Top accent */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-1
                  bg-linear-to-r
                  from-emerald-400
                  via-emerald-600
                  to-teal-500
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <div className="flex items-start justify-between gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-50
                    text-emerald-700
                    transition-all
                    duration-300
                    group-hover:bg-emerald-600
                    group-hover:text-white
                  "
                >
                  <div className="h-6 w-6">
                    {sectorIcons[sector.name]}
                  </div>
                </div>

                <span
                  className="
                    flex
                    h-8
                    min-w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    px-2
                    text-xs
                    font-bold
                    text-slate-500
                  "
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="mt-6">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-emerald-600
                  "
                >
                  {sector.tag}
                </p>

                <h3
                  className="
                    mt-2.5
                    text-xl
                    font-bold
                    leading-snug
                    text-slate-950
                  "
                >
                  {sector.name}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-600
                  "
                >
                  {sector.desc}
                </p>
              </div>

              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-500
                  transition-colors
                  duration-300
                  group-hover:text-emerald-700
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    transition-colors
                    duration-300
                    group-hover:bg-emerald-100
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                Institutional Supply Network
              </div>
            </article>
          ))}

          {/* Wide final information card */}
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-slate-950
              p-6
              text-white
              shadow-sm
              sm:p-7
              lg:col-span-3
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute
                -right-16
                -top-16
                h-44
                w-44
                rounded-full
                bg-emerald-500/20
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-20
                left-1/3
                h-44
                w-44
                rounded-full
                bg-teal-400/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="max-w-3xl">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-emerald-300
                  "
                >
                  Built for Institutional Procurement
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    tracking-tight
                    sm:text-3xl
                  "
                >
                  One supply network across civic, commercial and project sites.
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-300
                  "
                >
                  From sanitation and facility management to civil works,
                  public fitness and healthcare hygiene, Vikash Traders
                  supports recurring equipment procurement with practical
                  dispatch coordination.
                </p>
              </div>

              <div
                className="
                  grid
                  shrink-0
                  grid-cols-2
                  gap-3
                  sm:grid-cols-4
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >
                  <div className="text-xl font-bold text-white">05</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Sectors
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >
                  <div className="text-xl font-bold text-white">B2B</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Supply
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >
                  <div className="text-xl font-bold text-white">GST</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Billing
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >
                  <div className="text-xl font-bold text-white">RJ</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Coverage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}