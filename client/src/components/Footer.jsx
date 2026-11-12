
import { BUSINESS, NAV, CORE_CATEGORIES } from '../site.js';

export default function Footer({ products = [] }) {
  const categories =
    products.length > 0
      ? Array.from(new Set(products.map((p) => p.category)))
      : CORE_CATEGORIES;

  return (
    <footer
      aria-label="Site Footer"
      className="
        relative
        overflow-hidden
        border-t
        border-slate-800
        bg-linear-to-b
        from-slate-900
        to-slate-950
        pt-14
        pb-8
        text-slate-300
        sm:pt-16
        lg:pt-20
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
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-emerald-500/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-24
          h-72
          w-72
          rounded-full
          bg-emerald-950/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================
            MAIN FOOTER GRID
        ========================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-10
            sm:grid-cols-2
            lg:grid-cols-[1.25fr_0.75fr_1fr_1fr]
            lg:gap-12
          "
        >
          {/* =====================================
              COLUMN 1 — BRAND
          ====================================== */}
          <div className="max-w-md">
            <a
              href="#top"
              aria-label="Vikash Traders Home"
              className="
                group
                inline-flex
                items-center
                gap-3
                no-underline
                transition-opacity
                duration-300
                hover:opacity-90
              "
            >
              <span
                aria-hidden="true"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  text-emerald-400
                  transition-all
                  duration-300
                  group-hover:border-emerald-400/40
                  group-hover:bg-emerald-400/15
                  group-hover:scale-105
                "
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
                    className="
                      fill-emerald-500
                      transition-colors
                      duration-300
                      group-hover:fill-emerald-400
                    "
                  />

                  <path
                    d="M9.5 12l2 2 3.5-3.5"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Vikash{' '}
                <span className="text-emerald-400">
                  Traders
                </span>
              </span>
            </a>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-slate-400
              "
            >
              Direct supplier and stockyard of ROADNEX™ road safety solutions,
              commercial plastic dustbins, cleaning machines, open-gym stations,
              and project equipment across India.
            </p>

            {/* GST badge */}
            <div
              className="
                mt-5
                inline-flex
                max-w-full
                flex-wrap
                items-center
                gap-x-2
                gap-y-1.5
                rounded-xl
                border
                border-slate-700
                bg-slate-800/50
                px-3.5
                py-2.5
                text-xs
                font-medium
                text-slate-300
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_2px_rgba(52,211,153,0.35)]
                "
              />

              <span>
                GSTIN: {BUSINESS.gst}
              </span>

              <span className="text-slate-600">•</span>

              <span>
                Active Since {BUSINESS.gstYear}
              </span>
            </div>
          </div>

          {/* =====================================
              COLUMN 2 — NAVIGATION
          ====================================== */}
          <div>
            <h4
              className="
                mb-4
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-slate-200
              "
            >
              Quick Navigation
            </h4>

            <ul className="space-y-2.5 text-sm">
              {NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-slate-400
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:text-emerald-300
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        h-px
                        w-0
                        bg-emerald-400
                        transition-all
                        duration-200
                        group-hover:w-3
                      "
                    />

                    <span>{link.label}</span>
                  </a>
                </li>
              ))}

              <li>
                <a
                  href="#certifications"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-slate-400
                    transition-all
                    duration-200
                    hover:translate-x-1
                    hover:text-emerald-300
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-px
                      w-0
                      bg-emerald-400
                      transition-all
                      duration-200
                      group-hover:w-3
                    "
                  />

                  <span>Certifications</span>
                </a>
              </li>

              <li>
                <a
                  href="#newsroom"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-slate-400
                    transition-all
                    duration-200
                    hover:translate-x-1
                    hover:text-emerald-300
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-px
                      w-0
                      bg-emerald-400
                      transition-all
                      duration-200
                      group-hover:w-3
                    "
                  />

                  <span>News &amp; Field Updates</span>
                </a>
              </li>
            </ul>
          </div>

          {/* =====================================
              COLUMN 3 — EQUIPMENT
          ====================================== */}
          <div>
            <h4
              className="
                mb-4
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-slate-200
              "
            >
              Core Equipment
            </h4>

            <ul className="space-y-2.5 text-sm">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#products"
                    className="
                      group
                      inline-flex
                      items-start
                      gap-2
                      text-slate-400
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:text-emerald-300
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mt-2
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-slate-600
                        transition-all
                        duration-200
                        group-hover:bg-emerald-400
                        group-hover:scale-125
                      "
                    />

                    <span>{category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================
              COLUMN 4 — CONTACT
          ====================================== */}
          <div>
            <h4
              className="
                mb-4
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-slate-200
              "
            >
              Stockyard Facility
            </h4>

            <address
              className="
                space-y-3
                text-sm
                not-italic
                text-slate-400
              "
            >
              <p className="font-semibold text-slate-100">
                {BUSINESS.name}
              </p>

              <p>
                Proprietor: {BUSINESS.proprietor}
              </p>

              <p className="leading-6">
                {BUSINESS.address}
              </p>

              <p>
                Hours: {BUSINESS.hours}
              </p>

              <p>
                Phone:{' '}
                <a
                  href={'tel:' + BUSINESS.phoneDial}
                  className="
                    font-medium
                    text-slate-300
                    underline-offset-4
                    transition-colors
                    duration-200
                    hover:text-emerald-300
                    hover:underline
                  "
                >
                  {BUSINESS.phone}
                </a>
              </p>
            </address>

            {/* Contact indicator */}
            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-emerald-400/15
                bg-emerald-400/5
                px-3
                py-2
                text-xs
                font-medium
                text-emerald-300
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "
              />

              Direct business contact
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM BAR
        ========================================== */}
        <div
          className="
            mt-12
            border-t
            border-slate-800
            pt-6
            lg:mt-14
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                max-w-2xl
                text-xs
                leading-5
                text-slate-500
              "
            >
              &copy; {new Date().getFullYear()} {BUSINESS.name}.
              All rights reserved. GST Registered Proprietorship.
            </p>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                text-xs
              "
            >
              <a
                href="#top"
                className="
                  text-slate-400
                  transition-colors
                  duration-200
                  hover:text-emerald-300
                "
              >
                Back to Top ↑
              </a>

              <span
                aria-hidden="true"
                className="h-3 w-px bg-slate-700"
              />

              <a
                href="/admin/login"
                className="
                  text-slate-400
                  transition-colors
                  duration-200
                  hover:text-emerald-300
                "
              >
                Admin Access
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
