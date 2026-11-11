
import { WHATSAPP_LINK } from '../site.js';
import { IconWhatsApp } from './Icons.jsx';

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {/* Pulse ring */}
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30"
      />

      {/* WhatsApp button */}
      <a
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 ring-4 ring-white transition-all duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-900/25 sm:h-16 sm:w-16"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Vikash Traders on WhatsApp"
      >
        <span className="transition-transform duration-200 group-hover:scale-110">
          <IconWhatsApp
            aria-hidden="true"
            width={30}
            height={30}
          />
        </span>
      </a>
    </div>
  );
}
