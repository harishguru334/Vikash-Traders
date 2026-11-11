
const steps = [
  {
    n: '01',
    tag: 'Step 01 · Inquiry',
    title: 'Submit Your Requirement',
    body: 'Reach out by phone, WhatsApp, or through the online enquiry form. Specify the product model, quantity required, and your delivery pin code or town.',
  },
  {
    n: '02',
    tag: 'Step 02 · Quotation',
    title: 'Receive Written Quote',
    body: 'Receive a formal written quotation with per-piece unit rates, applicable GST, transport freight estimate, and expected delivery timeline the same working day.',
  },
  {
    n: '03',
    tag: 'Step 03 · Dispatch',
    title: 'Order Approval & Invoicing',
    body: 'Upon quote approval, we generate the compliant GST tax invoice, verify consignee details, and load the order at our Kankarwala stockyard.',
  },
  {
    n: '04',
    tag: 'Step 04 · Handover',
    title: 'Site Delivery & Demonstration',
    body: 'Consignment arrives safely at your site across Rajasthan. Machine demonstration and operational guidance provided for floor scrubbers and sweepers.',
  },
];

export default function ProcessSteps() {
  return (
    <section
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28"
      id="process"
      aria-label="How an Order Works"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <span className="h-px w-8 bg-emerald-600" />
            Procurement Workflow
            <span className="h-px w-8 bg-emerald-600" />
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Clear &amp; Direct{' '}
            <em className="font-serif font-medium not-italic text-emerald-600">
              4-Step Order Process
            </em>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            No unnecessary intermediaries or delays: a streamlined procurement
            sequence from initial inquiry to verified site delivery.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 sm:mt-16">
          {/* Desktop connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-slate-200 lg:block"
          />

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-4">
            {steps.map((s, index) => (
              <article
                key={s.n}
                className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7"
              >
                {/* Step number */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-lg font-bold text-emerald-700 transition-all duration-300 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
                    {s.n}
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                {/* Tag */}
                <div className="mt-6">
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors duration-300 group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                    {s.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-5 text-xl font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                  {s.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                  {s.body}
                </p>

                {/* Bottom marker */}
                <div className="mt-7 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-150" />
                  <span className="h-px flex-1 bg-slate-100 transition-colors duration-300 group-hover:bg-emerald-100" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

