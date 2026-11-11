
import { BUSINESS } from '../site.js';
import {
  IconCertificate,
  IconUser,
  IconTruck,
  IconClock,
} from './Icons.jsx';

const items = [
  {
    Icon: IconCertificate,
    title: 'GST Registered Invoicing',
    note: `Tax invoice (GSTIN ${BUSINESS.gst}) compliant for audits and institutional tenders`,
  },
  {
    Icon: IconUser,
    title: 'Direct Owner Accountability',
    note: `Speak directly with proprietor ${BUSINESS.proprietor} — no intermediaries or call centres`,
  },
  {
    Icon: IconTruck,
    title: 'Statewide Transport Dispatch',
    note: 'Fast delivery from Lunkaransar stockyard to municipal wards and project sites',
  },
  {
    Icon: IconClock,
    title: 'Same-Day Written Quotes',
    note: 'Inquiries before 7 PM received itemized rates and freight estimates the same day',
  },
];

export default function TrustStrip() {
  return (
    <section
      className="relative overflow-hidden border-y border-slate-200 bg-white"
      aria-label="Verified Business Credentials"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-emerald-300 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {items.map(({ Icon, title, note }) => (
            <div
              className="group flex items-start gap-4 px-1 py-6 sm:p-6 lg:p-7"
              key={title}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600">
                <Icon width={22} height={22} />
              </div>

              <div className="min-w-0">
                <strong className="block text-sm font-bold leading-5 text-slate-900 transition-colors duration-200 group-hover:text-emerald-700">
                  {title}
                </strong>

                <span className="mt-1.5 block wrap-break-word text-sm leading-6 text-slate-500">
                  {note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
