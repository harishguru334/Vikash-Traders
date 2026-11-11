
import { WHATSAPP_LINK } from '../site.js';

export default function CtaBand() {
  return (
    <section
      aria-label="Quotation Call to Action"
      className="
        relative
        overflow-hidden
        bg-emerald-700
        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* Background decoration */}
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
          bg-emerald-400/20
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
          bg-emerald-950/20
          blur-3xl
        "
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.06]
          bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          bg-size-[32px_32px]
        "
      />

      <div
        className="
          relative
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-8
          px-4
          sm:px-6
          lg:flex-row
          lg:items-center
          lg:justify-between
          lg:gap-12
          lg:px-8
        "
      >
        {/* =========================================
            LEFT CONTENT
        ========================================== */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                bg-emerald-200
                sm:w-9
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-100
                sm:text-[11px]
              "
            >
              Ready to Order or Need a Formal Quote?
            </span>
          </div>

          <h2
            className="
              mt-4
              max-w-2xl
              text-2xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-3xl
              lg:text-4xl
          "
          >
            Tell Us What You Need &amp; We'll Prepare Your Rate Sheet
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-emerald-50/80
              sm:text-base
              sm:leading-7
            "
          >
            Direct dispatch from Lunkaransar stockyard. 100% GST tax
            invoices, official quotations, and verified delivery timelines.
          </p>
        </div>

        {/* =========================================
            ACTIONS
        ========================================== */}
        <div
          className="
            flex
            w-full
            shrink-0
            flex-col
            gap-3
            sm:flex-row
            lg:w-auto
          "
        >
          {/* Quote */}
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
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-emerald-800
              shadow-lg
              shadow-emerald-950/10
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-emerald-50
              hover:shadow-xl
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-emerald-700
            "
          >
            <span>Request Formal Quote</span>

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
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="
              group
              inline-flex
              min-h-12
              items-center
              justify-center
              gap-2.5
              rounded-xl
              border
              border-white/25
              bg-white/10
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-white/40
              hover:bg-white/15
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-emerald-700
            "
          >
            {/* WhatsApp icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <path d="M20.52 3.48A11.77 11.77 0 0 0 12.05 0C5.56 0 .28 5.28.28 11.77c0 2.07.54 4.09 1.56 5.87L.17 24l6.52-1.71a11.72 11.72 0 0 0 5.35 1.29h.01c6.49 0 11.77-5.28 11.77-11.77 0-3.14-1.22-6.09-3.3-8.33ZM12.05 21.6h-.01a9.77 9.77 0 0 1-4.98-1.36l-.36-.21-3.87 1.02 1.03-3.77-.23-.39a9.82 9.82 0 0 1-1.5-5.12c0-5.43 4.42-9.85 9.86-9.85a9.8 9.8 0 0 1 6.98 2.9 9.81 9.81 0 0 1 2.89 6.98c0 5.43-4.42 9.85-9.81 9.85Zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.88.11.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>

            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}