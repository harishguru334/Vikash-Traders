
import { BUSINESS } from '../site.js';

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Vikash Traders"
      className="
        relative overflow-hidden
        bg-white
        py-16 sm:py-20 lg:py-28
      "
    >
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-24 top-20
          h-72 w-72
          rounded-full
          bg-emerald-100/40
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-24 bottom-0
          h-64 w-64
          rounded-full
          bg-slate-100/70
          blur-3xl
        "
      />

      {/* Subtle year watermark */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-2 top-0
          select-none
          text-[7rem] font-black leading-none
          tracking-[-0.08em]
          text-slate-100/80
          sm:right-6 sm:text-[10rem]
          lg:right-12 lg:text-[14rem]
        "
      >
        {BUSINESS.gstYear}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* =========================================
              LEFT — CONTENT
          ========================================== */}
          <div className="max-w-2xl">

            {/* Section label */}
            <div className="mb-5 inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="
                  h-px w-8
                  bg-emerald-500
                  sm:w-10
                "
              />

              <span
                className="
                  text-[11px] font-bold uppercase
                  tracking-[0.22em]
                  text-emerald-600
                "
              >
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-xl
                text-3xl font-bold leading-[1.08]
                tracking-[-0.03em]
                text-slate-950
                sm:text-4xl
                lg:text-[3.15rem]
              "
            >
              About{' '}
              <span className="text-emerald-600">
                Vikash Traders
              </span>
            </h2>

            {/* Accent line */}
            <div
              aria-hidden="true"
              className="
                mt-5 h-1 w-16
                rounded-full
                bg-emerald-500
                transition-all duration-500
                hover:w-24
              "
            />

            {/* Main paragraph */}
            <p
              className="
                mt-7
                text-base leading-7
                text-slate-600
                sm:text-lg sm:leading-8
              "
            >
              Since {BUSINESS.gstYear}, Vikash Traders has been a trusted supplier of
              high-performance commercial equipment. Today, we are proud to introduce
              our flagship road safety division under our applied proprietary brand{' '}
              <strong className="font-semibold text-slate-900">ROADNEX™</strong>, alongside
              premium commercial plastic dustbins, mechanized floor cleaning machines,
              open-gym fitness stations, and civil infrastructure equipment.
            </p>

            {/* Secondary paragraph */}
            <p
              className="
                mt-5
                text-sm leading-7
                text-slate-500
                sm:text-base sm:leading-7
              "
            >
              Based in Kankarwala, Lunkaransar (Bikaner division) under the direct
              leadership of proprietor V. Kumar, we eliminate speculative middle
              tiers by holding physical inventory in our central stockyard. With our brand
              ROADNEX™ applied for trademark registration (expected in 2–3 months), we supply verified
              traffic safety products and civic machinery directly to defence institutions,
              railways, municipal councils, hospitals, and national infrastructure contractors.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

              {/* Primary CTA */}
              <a
                href="#products"
                className="
                  group
                  inline-flex min-h-12
                  items-center justify-center gap-2
                  rounded-lg
                  bg-emerald-600
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  shadow-[0_10px_25px_-12px_rgba(5,150,105,0.65)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-emerald-700
                  hover:shadow-[0_16px_30px_-12px_rgba(5,150,105,0.55)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2
                "
              >
                <span>Our Products Range</span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="
                  group
                  inline-flex min-h-12
                  items-center gap-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  px-4 py-2.5
                  text-left
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-emerald-50/50
                  hover:shadow-md
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-emerald-50
                    text-emerald-600
                    transition-all duration-300
                    group-hover:bg-emerald-600
                    group-hover:text-white
                    group-hover:scale-105
                  "
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>

                <span>
                  <strong className="block text-sm font-semibold text-slate-900">
                    Contact Our Team
                  </strong>

                  <span className="mt-0.5 block text-xs text-slate-500">
                    Get procurement assistance
                  </span>
                </span>
              </a>
            </div>

            {/* Key facts */}
            <div
              className="
                mt-9
                grid grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >
              {/* Fact 1 */}
              <div
                className="
                  group
                  rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  px-4 py-3.5
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                <strong className="block text-sm font-semibold text-slate-900">
                  Est. {BUSINESS.gstYear}
                </strong>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Proprietorship Active
                </span>
              </div>

              {/* Fact 2 */}
              <div
                className="
                  group
                  rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  px-4 py-3.5
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                <strong className="block text-sm font-semibold text-slate-900">
                  GSTIN Verified
                </strong>

                <span className="mt-1 block break-all text-xs leading-5 text-slate-500">
                  {BUSINESS.gst}
                </span>
              </div>

              {/* Fact 3 */}
              <div
                className="
                  group
                  rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  px-4 py-3.5
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-white
                  hover:shadow-sm
                "
              >
                <strong className="block text-sm font-semibold text-slate-900">
                  Bikaner Hub
                </strong>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Kankarwala Stockyard
                </span>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT — IMAGE
          ========================================== */}
          <div className="relative mx-auto w-full max-w-xl">

            {/* Decorative frame */}
            <div
              aria-hidden="true"
              className="
                absolute
                -inset-3
                rounded-4x1
                border border-emerald-100
                bg-emerald-50/30
                opacity-70
                transition-transform duration-700
                lg:-inset-5
                lg:rotate-2
              "
            />

            {/* Main image container */}
            <div
              className="
                group
                relative
                aspect-square
                overflow-hidden
                rounded-[1.75rem]
                bg-slate-100
                shadow-[0_25px_70px_-30px_rgba(15,23,42,0.35)]
              "
            >
              <img
                src="/photos/about-facility-stockyard.jpg"
                alt="Vikash Traders Central Facility & Equipment Stockyard"
                className="
                  h-full w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.035]
                "
              />

              {/* Soft image overlay */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-linear-to-t
                  from-slate-950/15
                  via-transparent
                  to-white/5
                "
              />

              {/* Image frame */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-3
                  rounded-[1.35rem]
                  border border-white/40
                "
              />
            </div>

            {/* Compliance badge */}
            <div
              className="
                absolute
                -bottom-5 left-4
                right-4
                sm:left-auto sm:right-5
                sm:max-w-[85%]
                lg:-bottom-6
              "
            >
              <div
                className="
                  flex items-center gap-3
                  rounded-xl
                  border border-slate-200
                  bg-white/95
                  px-4 py-3
                  shadow-[0_14px_35px_-18px_rgba(15,23,42,0.35)]
                  backdrop-blur-md
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span className="text-xs font-semibold leading-5 text-slate-700 sm:text-sm">
                  Swachh Bharat &amp; Municipal Standards Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

