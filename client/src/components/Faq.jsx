
import { useState } from 'react';

const faqs = [
  {
    q: 'Where do you deliver?',
    a: 'Across Rajasthan. Orders in Bikaner division usually go out within the same week; other districts are dispatched by road transport, and the freight cost is shown in your quote before you confirm.',
  },
  {
    q: 'Do you provide a GST invoice?',
    a: 'Yes. Vikash Traders has been GST registered since 2022 under 08LLOPK9460L1Z0, and every order is billed with a proper tax invoice suitable for institutional and government buyers.',
  },
  {
    q: 'Are the listed prices negotiable for bulk orders?',
    a: 'The prices on this site are per-piece rates. For quantities — a full set of park equipment, or bins by the hundred — send your requirement and we will quote a bulk rate against it.',
  },
  {
    q: 'How quickly will I get a quote?',
    a: 'Enquiries received during business hours, Monday to Saturday between 9 AM and 7 PM, are quoted the same day. Anything that arrives after hours is answered the next working morning.',
  },
  {
    q: 'Can you supply against a government tender or purchase order?',
    a: 'Yes. Share the tender specification or purchase order and we will respond with item-wise rates, delivery timelines and the documentation you need.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="
        relative
        overflow-hidden
        bg-slate-50/70
        py-16
        sm:py-20
        lg:py-28
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-20
          h-72
          w-72
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
          -left-24
          bottom-0
          h-64
          w-64
          rounded-full
          bg-white
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* =========================================
            HEADER
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
              FAQ
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
            Questions buyers ask{' '}
            <span className="text-emerald-600">first</span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
            "
          >
            Quick answers to common questions about orders, quotations,
            delivery and procurement.
          </p>
        </div>

        {/* =========================================
            FAQ LIST
        ========================================== */}
        <div className="mt-10 space-y-3 sm:mt-12">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            const itemClass = isOpen
              ? 'border-emerald-200 shadow-lg shadow-slate-900/5'
              : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md';

            const iconClass = isOpen
              ? 'rotate-180 border-emerald-200 bg-emerald-50 text-emerald-600'
              : 'border-slate-200 bg-slate-50 text-slate-500';

            return (
              <div
                key={item.q}
                className={
                  'overflow-hidden rounded-2xl border bg-white transition-all duration-300 ' +
                  itemClass
                }
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={'faq-a-' + i}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-5
                      px-5
                      py-5
                      text-left
                      sm:px-6
                      sm:py-6
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-emerald-500
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-semibold
                        leading-6
                        text-slate-900
                        transition-colors
                        duration-200
                        group-hover:text-emerald-700
                        sm:text-base
                      "
                    >
                      {item.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className={
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg font-medium leading-none transition-all duration-300 ' +
                        iconClass
                      }
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>

                <div
                  id={'faq-a-' + i}
                  className={
                    'grid transition-all duration-300 ease-out ' +
                    (isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0')
                  }
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className="
                        border-t
                        border-slate-100
                        px-5
                        pb-5
                        pt-4
                        sm:px-6
                        sm:pb-6
                      "
                    >
                      <p
                        className="
                          max-w-3xl
                          text-sm
                          leading-7
                          text-slate-600
                          sm:text-base
                        "
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div
          className="
            mx-auto
            mt-8
            flex
            max-w-3xl
            items-start
            gap-3
            rounded-xl
            border
            border-emerald-100
            bg-emerald-50/70
            px-4
            py-3.5
            sm:items-center
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-1.5
              h-2.5
              w-2.5
              shrink-0
              rounded-full
              bg-emerald-500
              sm:mt-0
            "
          />

          <p
            className="
              text-xs
              leading-5
              text-emerald-900
              sm:text-sm
            "
          >
            Need a specific quotation or product detail? Use the enquiry
            form and share your requirement.
          </p>
        </div>
      </div>
    </section>
  );
}
