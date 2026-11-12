
import { BUSINESS } from '../site.js';

function Stat({ value, suffix = '', label, sub }) {
  return (
    <div
      className="
        group
        relative
        border-t
        border-slate-200
        px-1
        py-5
        transition-all
        duration-300
        sm:px-2
        lg:border-l
        lg:border-t-0
        lg:px-6
        lg:first:border-l-0
      "
    >
      <div
        className="
          text-2xl
          font-bold
          leading-none
          tracking-tight
          text-slate-950
          transition-colors
          duration-300
          group-hover:text-emerald-700
          sm:text-3xl
        "
      >
        {value}
        {suffix}
      </div>

      <div
        className="
          mt-2
          text-xs
          font-bold
          uppercase
          tracking-[0.12em]
          text-slate-600
        "
      >
        {label}
      </div>

      <div
        className="
          mt-1.5
          text-xs
          leading-5
          text-slate-400
        "
      >
        {sub}
      </div>
    </div>
  );
}

export default function Hero({ products = [] }) {
  const categoryCount = new Set(
    products.map((p) => p.category)
  ).size;

  return (
    <section
      id="top"
      aria-label="Vikash Traders Equipment Procurement"
      className="
        relative
        overflow-hidden
        bg-slate-50
        pt-28
        pb-12
        sm:pt-32
        sm:pb-16
        lg:pt-36
        lg:pb-20
      "
    >
      {/* =========================================
          BACKGROUND DETAILS
      ========================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-16
          h-80
          w-80
          rounded-full
          bg-emerald-100/50
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-28
          bottom-10
          h-72
          w-72
          rounded-full
          bg-white
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-slate-200
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================
            HERO GRID
        ========================================== */}
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12
            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-16
          "
        >
          {/* =====================================
              LEFT CONTENT
          ====================================== */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-amber-300
                bg-amber-50/90
                px-3.5
                py-2
                text-[11px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-amber-900
                shadow-xs
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-amber-500
                  shadow-[0_0_0_4px_rgba(245,158,11,0.2)]
                "
              />

              <span>
                Flagship ROADNEX™ Road Safety &amp; Municipal Sourcing
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-6
                max-w-3xl
                text-4xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-slate-950
                sm:text-5xl
                lg:text-6xl
              "
            >
              Road Safety Infrastructure &amp;{' '}
              <span className="text-emerald-600">
                Municipal Equipment Hub
              </span>
            </h1>

            {/* Lead */}
            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-slate-600
                sm:text-lg
                sm:leading-8
              "
            >
              Direct institutional supplier of <strong className="font-semibold text-slate-900">ROADNEX™ road safety equipment</strong>,
              heavy-duty HDPE waste containers, mechanized cleaning machines,
              outdoor gym stations, and site machinery with verified GST tax invoicing.
            </p>

            {/* CTAs */}
            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:flex-wrap
              "
            >
              <a
                href="#products"
                className="
                  group
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-emerald-900/10
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-emerald-700
                  hover:shadow-xl
                  hover:shadow-emerald-900/15
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2
                "
              >
                <span>Explore Catalogue &amp; Rates</span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>

              <a
                href="#contact"
                className="
                  group
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-800
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-emerald-50
                  hover:text-emerald-700
                  hover:shadow-md
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2
                "
              >
                <span>Request Official Quotation</span>

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>

            {/* Perks */}
            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
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

                <span>100% Tax Invoices with GSTIN</span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
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

                <span>Lunkaransar Stockyard Hub</span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  text-sm
                  font-medium
                  text-slate-600
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
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

                <span>Pan-Rajasthan Road Freight</span>
              </div>
            </div>
          </div>

          {/* =====================================
              RIGHT — SHOWCASE
          ====================================== */}
          <div className="relative mx-auto w-full max-w-2xl">
            {/* Outer frame */}
            <div
              aria-hidden="true"
              className="
                absolute
                -inset-3
                rounded-3xl
                border
                border-emerald-100
                bg-emerald-50/40
                lg:-inset-4
              "
            />

            {/* Main showcase */}
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                shadow-slate-900/10
              "
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src="/photos/fiable-hero-equipment.jpg"
                  alt="Vikash Traders Commercial Equipment Showcase"
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

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-slate-950/25
                    via-transparent
                    to-transparent
                  "
                />

                {/* Image badge */}
                <div
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    border
                    border-white/40
                    bg-slate-950/55
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    backdrop-blur-md
                  "
                >
                  Industrial Equipment
                </div>
              </div>

              {/* Showcase footer */}
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  border-t
                  border-slate-200
                  bg-white
                  px-4
                  py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-5
                "
              >
                <div className="min-w-0">
                  <strong
                    className="
                      block
                      text-sm
                      font-bold
                      text-slate-950
                    "
                  >
                    Lunkaransar Central Facility
                  </strong>

                  <span
                    className="
                      mt-1
                      block
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Ready for Dispatch · Verified In-Stock
                  </span>
                </div>

                <span
                  className="
                    inline-flex
                    w-fit
                    shrink-0
                    items-center
                    rounded-lg
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-emerald-800
                  "
                >
                  GSTIN: {BUSINESS.gst}
                </span>
              </div>
            </div>

            {/* Floating location label */}
            <div
              className="
                absolute
                -bottom-4
                left-4
                right-4
                sm:left-auto
                sm:right-6
                sm:max-w-xs
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-white/95
                  px-4
                  py-3
                  shadow-xl
                  shadow-slate-900/10
                  backdrop-blur-md
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    text-emerald-600
                  "
                  aria-hidden="true"
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
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>

                <div className="min-w-0">
                  <span className="block text-xs font-bold text-slate-900">
                    Central Stockyard
                  </span>

                  <span className="block text-[11px] leading-5 text-slate-500">
                    Lunkaransar · Bikaner Division
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            STATS STRIP
        ========================================== */}
        <div
          className="
            mt-12
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            sm:mt-16
            lg:mt-20
          "
          aria-label="Business Metrics"
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <Stat
              value={BUSINESS.gstYear}
              label="GST Registered Since"
              sub="Proprietor V. Kumar"
            />

            <Stat
              value={products.length || 20}
              suffix="+"
              label="Catalogue Models"
              sub="Ready in stockyard"
            />

            <Stat
              value={categoryCount || 9}
              label="Equipment Categories"
              sub="ROADNEX Road Safety, Bins &amp; Cleaners"
            />

            <Stat
              value="Bikaner Hub"
              label="Central Stockyard"
              sub="Direct road freight dispatch"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

