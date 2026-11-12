import { useState } from 'react';
import { BUSINESS, BRAND } from '../site.js';

const clientOrganizations = [
  {
    name: 'Indian Army',
    subname: 'भारतीय सेना',
    dept: 'Ministry of Defence · Govt. of India',
    tag: 'ARMED FORCES',
    logo: '/clients/indian-army.jpg',
    supplies: 'ROADNEX™ Road Safety, Site Barriers & Heavy-Duty Waste Systems',
  },
  {
    name: 'DRDO',
    subname: 'Defence Research & Development Organisation',
    dept: 'Department of Defence R&D · Ministry of Defence',
    tag: 'DEFENCE & STRATEGIC',
    logo: '/clients/drdo.jpg',
    supplies: 'Traffic Control Safety, Institutional Hygiene & Queue Management',
  },
  {
    name: 'Indian Railways',
    subname: 'Ministry of Railways · भारतीय रेल',
    dept: 'Government of India',
    tag: 'RAIL TRANSIT',
    logo: '/clients/indian-railways.jpg',
    supplies: 'Station Waste Containers, Road Safety Items & Cleaning Solutions',
  },
  {
    name: 'DMRC',
    subname: 'Delhi Metro Rail Corporation',
    dept: 'Urban Mass Rapid Transit System',
    tag: 'METRO TRANSIT',
    logo: '/clients/dmrc.jpg',
    supplies: 'Passenger Queue Stanchions, Commercial Bins & Safety Markers',
  },
  {
    name: 'ISRO',
    subname: 'Indian Space Research Organisation',
    dept: 'Department of Space · Govt. of India',
    tag: 'SPACE RESEARCH',
    logo: '/clients/isro.jpg',
    supplies: 'Campus Sanitation, Waste Segregation & Specialized Maintenance',
  },
  {
    name: 'NSG',
    subname: 'National Security Guard (सर्वत्र सर्वोत्तम सुरक्षा)',
    dept: 'Ministry of Home Affairs · Govt. of India',
    tag: 'ELITE SECURITY',
    logo: '/clients/nsg.jpg',
    supplies: 'Perimeter Security Stanchions, Road Safety & Facility Equipment',
  },
  {
    name: 'Indian Ordnance Factories',
    subname: 'भारतीय आयुध निर्माणियाँ',
    dept: 'Defence Production · Govt. of India',
    tag: 'DEFENCE PRODUCTION',
    logo: '/clients/ordnance-factories.jpg',
    supplies: 'Industrial Scrubbing Machines, Dustbins & Safety Infrastructure',
  },
  {
    name: 'NTPC Limited',
    subname: 'National Thermal Power Corporation',
    dept: 'Maharatna PSU · Ministry of Power',
    tag: 'ENERGY & PSU',
    logo: '/clients/ntpc.jpg',
    supplies: 'Plant Traffic Safety, Heavy-Duty Bins & Sanitation Infrastructure',
  },
  {
    name: 'Municipal Corporation Panchkula',
    subname: 'नगर निगम पंचकूला',
    dept: 'Urban Local Bodies · Haryana',
    tag: 'CIVIC ADMINISTRATION',
    logo: '/clients/mc-panchkula.jpg',
    supplies: 'Solid Waste Management Bins, Road Safety & Park Fitness Stations',
  },
  {
    name: 'Department of Fisheries',
    subname: 'Andaman & Nicobar Administration',
    dept: 'Union Territory Administration · Govt. of India',
    tag: 'GOVERNMENT DEPT',
    logo: '/clients/andaman-fisheries.jpg',
    supplies: 'Institutional Hygiene Machinery & Environmental Waste Solutions',
  },
];

const sectors = [
  {
    name: 'Highways & Traffic Authorities',
    tag: 'ROADNEX™ ROAD SAFETY',
    isPrimary: true,
    desc: 'National & state highway contractors, smart cities, and traffic police procuring ROADNEX™ cones, speed bumps, convex mirrors, solar road studs, and delineators.',
  },
  {
    name: 'Defence & Armed Forces',
    tag: 'DEFENCE & SECURITY',
    desc: 'Strategic military depots, DRDO centres, NSG campuses, and ordnance factories requiring heavy-duty security stanchions, traffic barricades, and waste solutions.',
  },
  {
    name: 'Railways & Metro Corporations',
    tag: 'TRANSIT INFRASTRUCTURE',
    desc: 'Indian Railways divisions and metro networks procuring station dustbins, floor scrubbers, passenger queue management, and transit safety accessories.',
  },
  {
    name: 'Municipal Corporations & ULBs',
    tag: 'CIVIC SANITATION',
    desc: 'Nagar Palikas & Urban Local Bodies procuring commercial HDPE dustbins, street sweepers, community open-gym equipment, and tender documentation.',
  },
  {
    name: 'Hospitals & Medical Facilities',
    tag: 'HEALTH HYGIENE',
    desc: 'Healthcare centres maintaining sterile hygiene with biomedical pedal bins, scrubber driers, wet/dry vacuums, and sensory automatic shoe shiners.',
  },
  {
    name: 'Industrial Plants & Mega Facilities',
    tag: 'FACILITY & SAFETY',
    desc: 'PSUs, manufacturing plants, hotels, and IT parks requiring ongoing bulk dispatch of cleaning machinery, waste stations, and perimeter safety equipment.',
  },
];

const sectorIcons = {
  'Highways & Traffic Authorities': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="4 20 20 20 18 17 6 17" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <polygon points="8 17 16 17 14 4 10 4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  'Defence & Armed Forces': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Railways & Metro Corporations': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="4" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="15" r="1.5" fill="currentColor" />
      <circle cx="16" cy="15" r="1.5" fill="currentColor" />
      <path d="M7 18l-3 3M17 18l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  'Municipal Corporations & ULBs': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V8l8-4 8 4v12M8 20v-6h8v6M9 9h.01M15 9h.01M9 12h.01M15 12h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Hospitals & Medical Facilities': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-4.4 7-10.2C19 7.5 17 5 14.5 5 13 5 12 6 12 7.2 12 6 11 5 9.5 5 7 5 5 7.5 5 10.8 5 16.6 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 11h6M12 8v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  'Industrial Plants & Mega Facilities': (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h16M6 20V8h5v12M13 20V4h5v16M8 11h1M8 14h1M15 8h1M15 11h1M15 14h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Clients() {
  const [filter, setFilter] = useState('All');
  const repeatedClients = clientOrganizations.concat(clientOrganizations);

  return (
    <section
      id="clients"
      aria-label="Our Clients & Institutional Partners"
      className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-20 lg:py-28"
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
          animation: clientsMarquee 34s linear infinite;
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
        className="pointer-events-none absolute -left-28 top-24 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/3 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 -bottom-24 h-80 w-80 rounded-full bg-slate-200/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================================
            SECTION HEADER
        ========================================== */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 shadow-xs">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
              Our Clients · Institutional Trust
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Trusted By Leading{' '}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
              Organizations Across India
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We proudly partner with leading government departments, defence establishments,
            railways, metro corporations, municipal bodies, hospitals, and private industries by delivering premium{' '}
            <strong className="font-semibold text-slate-900">ROADNEX™ Road Safety Solutions</strong>,
            institutional waste management systems, and commercial cleaning equipment.
          </p>
        </div>

        {/* =========================================
            ROADNEX FLAGSHIP BRAND SPOTLIGHT BANNER
        ========================================== */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-amber-200/80 bg-linear-to-br from-amber-500/10 via-white to-emerald-500/10 p-6 shadow-md backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-black tracking-wider text-white shadow-xs">
                  FLAGSHIP BRAND
                </span>
                <span className="rounded-full border border-amber-300 bg-amber-100/70 px-3 py-1 text-xs font-bold text-amber-900">
                  {BRAND.status}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <h3 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  {BRAND.displayName}
                </h3>
                <span className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                  by {BUSINESS.name}
                </span>
              </div>

              <p className="mt-3 text-base leading-7 text-slate-700 sm:text-lg">
                Engineered with highest priority for national highways, defense sites, urban metro zones, and smart cities.
                Specialized in heavy-duty road safety and traffic infrastructure.
              </p>

              {/* Road safety product pills */}
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                  <span className="text-amber-500">🚧</span> Traffic Cones (Reflective)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                  <span className="text-amber-500">🛑</span> Rubber Speed Bumps
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                  <span className="text-amber-500">🔍</span> Convex Traffic Mirrors
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                  <span className="text-amber-500">💡</span> Solar LED Road Studs
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                  <span className="text-amber-500">🛡️</span> Spring Posts &amp; Delineators
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                  <span className="text-amber-500">🧱</span> Wheel Stoppers &amp; Corner Guards
                </span>
              </div>
            </div>

            {/* Right side CTA card */}
            <div className="rounded-2xl border border-amber-200/70 bg-white/95 p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Direct Bulk &amp; Tender Inquiries
              </div>
              <div className="mt-2 text-xl font-bold text-slate-950">
                Procure ROADNEX™ Safety Infrastructure
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
                Complete compliance with MoRTH, municipal and institutional safety norms with GST tax invoicing and E-Way bills.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-amber-700 hover:shadow-md"
                >
                  <span>Request ROADNEX Quote</span>
                  <span>→</span>
                </a>
                <a
                  href={`tel:${BUSINESS.phoneDial}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100"
                >
                  <span>Call {BUSINESS.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            CLIENTS MARQUEE TICKER RIBBON
        ========================================== */}
        <div className="relative my-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-4 shadow-sm backdrop-blur-sm">
          {/* Left fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white to-transparent"
          />
          {/* Right fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white to-transparent"
          />

          <div className="overflow-hidden">
            <div className="clients-marquee-track flex min-w-max items-center">
              {repeatedClients.map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="mx-3 flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-xs ring-1 ring-slate-200">
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {client.name}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      {client.subname}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            FEATURED CLIENT ORGANIZATIONS GRID
        ========================================== */}
        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Institutional Portfolio
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                National Departments &amp; Government Bodies
              </h3>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Direct B2B &amp; Government Tender Fulfillment
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {clientOrganizations.map((client) => (
              <div
                key={client.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  {/* Logo Container */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 shadow-xs transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={client.logo}
                        alt={`${client.name} official emblem`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600">
                      {client.tag}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="mt-4">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700">
                      {client.name}
                    </h4>
                    <p className="mt-0.5 text-xs font-medium text-slate-500 line-clamp-1">
                      {client.subname}
                    </p>
                    <p className="mt-2 text-[11px] leading-4 text-slate-400">
                      {client.dept}
                    </p>
                  </div>
                </div>

                {/* Scope & Verified tag */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="text-[11px] font-medium leading-4 text-slate-600">
                    <span className="font-semibold text-slate-800">Supply Scope:</span> {client.supplies}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified Client</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            SECTOR CARDS
        ========================================== */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Procurement Networks
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Sectors &amp; Industries Supplied
            </h3>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              From high-weightage ROADNEX™ road safety infrastructure to commercial sanitation and civil project sites.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, index) => (
              <article
                key={sector.name}
                className={`group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${
                  sector.isPrimary
                    ? 'border-amber-300 ring-2 ring-amber-400/20'
                    : 'border-slate-200 hover:border-emerald-200'
                }`}
              >
                {/* Top accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 ${
                    sector.isPrimary
                      ? 'bg-linear-to-r from-amber-500 to-orange-500'
                      : 'bg-linear-to-r from-emerald-400 via-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                      sector.isPrimary
                        ? 'bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
                        : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                    }`}
                  >
                    <div className="h-6 w-6">{sectorIcons[sector.name]}</div>
                  </div>

                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-bold text-slate-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-6">
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.16em] ${
                      sector.isPrimary ? 'text-amber-700' : 'text-emerald-600'
                    }`}
                  >
                    {sector.tag}
                  </p>

                  <h4 className="mt-2 text-xl font-bold leading-snug text-slate-950">
                    {sector.name}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {sector.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors duration-300 group-hover:text-emerald-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-emerald-100">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Institutional Supply Network
                </div>
              </article>
            ))}

            {/* Wide final information card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-sm sm:p-8 lg:col-span-3">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl"
              />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                    Built for National &amp; Institutional Procurement
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    One Unified Supply Network Across Defence, Transit, Civic &amp; Road Infrastructure
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    From our flagship <strong className="text-white">ROADNEX™ road safety equipment</strong> (traffic cones, speed bumps, convex mirrors, solar studs)
                    to municipal solid waste containers, heavy cleaning machines, and site equipment — Vikash Traders delivers
                    direct factory-dispatched supplies with 100% tax invoice compliance and E-Way bills across India.
                  </p>
                </div>

                <div className="grid shrink-0 grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-xl font-bold text-amber-400">ROADNEX™</div>
                    <div className="mt-1 text-xs text-slate-400">Flagship Brand</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-xl font-bold text-white">10+</div>
                    <div className="mt-1 text-xs text-slate-400">National PSUs</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-xl font-bold text-white">GST</div>
                    <div className="mt-1 text-xs text-slate-400">100% Billing</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-xl font-bold text-emerald-400">Pan-India</div>
                    <div className="mt-1 text-xs text-slate-400">Logistics</div>
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
