
import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../site.js';

const PRODUCT_FAMILIES = [
  {
    name: 'Plastic Dust Bins',
    desc: '5L to 100L open-top, pedal & wheeled heavy bins',
    icon: '/icons/cat-dustbins.svg',
    target: 'Plastic Dust Bins',
  },
  {
    name: 'Cleaning Machines',
    desc: 'Scrubber driers, sweepers & wet/dry vacuums',
    icon: '/icons/cat-cleaning.svg',
    target: 'Cleaning Machines',
  },
  {
    name: 'Outdoor Gym Equipment',
    desc: 'Waist twisters, air walkers & park stations',
    icon: '/icons/cat-gym.svg',
    target: 'Outdoor Exercise Gym Equipment',
  },
  {
    name: 'Queue Stands',
    desc: 'Stainless steel stanchions with retractable belts',
    icon: '/icons/cat-queuestands.svg',
    target: 'Queue Stands',
  },
  {
    name: 'Concrete Mixer Machines',
    desc: 'Portable & semi-automatic construction mixers',
    icon: '/icons/cat-concretemixer.svg',
    target: 'Concrete Mixer Machines',
  },
  {
    name: 'Concrete Test Hammer',
    desc: 'Schmidt rebound hammer for compressive strength',
    icon: '/icons/cat-testhammer.svg',
    target: 'Concrete Test Hammer',
  },
  {
    name: 'Shoe Polish Machine',
    desc: 'Dual-buffer sensor automatic commercial shiner',
    icon: '/icons/cat-shoepolish.svg',
    target: 'Shoe Polish Machine',
  },
  {
    name: 'Scrubbing & Polishing Machine',
    desc: 'Single-disc heavy floor scrubber & polisher',
    icon: '/icons/cat-scrubber.svg',
    target: 'Scrubbing & Polishing Machine',
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const productsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setProductsOpen(false);
        setAboutOpen(false);
      }
    };

    const onClickOutside = (event) => {
      if (
        productsRef.current &&
        !productsRef.current.contains(event.target)
      ) {
        setProductsOpen(false);
      }

      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target)
      ) {
        setAboutOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setProductsOpen(false);
    setAboutOpen(false);
  };

  return (
    <>
      {/* Desktop / Mobile Header */}
      <div
        className={
          'fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ' +
          (scrolled
            ? 'shadow-md shadow-slate-900/10'
            : 'border-b border-slate-200/80')
        }
      >
        <header>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-18 items-center gap-4 lg:gap-5">
              {/* Logo */}
              <a
                className="group flex shrink-0 items-center gap-2.5"
                href="#top"
                onClick={closeAll}
                aria-label="Vikash Traders Homepage"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200 transition-colors duration-200 group-hover:bg-emerald-100"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45-9-12V7l-9-5z"
                      className="fill-emerald-600"
                    />
                    <path
                      d="M12 6l-5 3v3.5c0 3.3 2.1 6.3 5 7.2 2.9-.9 5-3.9 5-7.2V9l-5-3z"
                      className="fill-emerald-400"
                    />
                    <path
                      d="M9.5 12l2 2 3.5-3.5"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className="flex min-w-0 flex-col">
                  <span className="whitespace-nowrap text-base font-bold tracking-tight text-slate-900">
                    vikash <span className="text-emerald-600">Traders</span>
                  </span>

                  <span className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 sm:block">
                    Civic &amp; Commercial Equipment
                  </span>
                </span>
              </a>

              {/* Desktop Navigation */}
              <nav
                className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 xl:flex"
                aria-label="Main Navigation"
              >
                <a
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-emerald-600"
                  href="#top"
                  onClick={closeAll}
                >
                  Home
                </a>

                {/* About */}
                <div
                  className="relative"
                  ref={aboutRef}
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <button
                    type="button"
                    className={
                      'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150 ' +
                      (aboutOpen
                        ? 'bg-slate-50 text-emerald-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600')
                    }
                    onClick={() => setAboutOpen(!aboutOpen)}
                    aria-expanded={aboutOpen}
                    aria-haspopup="true"
                  >
                    About
                    <svg
                      className={
                        'h-3.5 w-3.5 transition-transform duration-200 ' +
                        (aboutOpen ? 'rotate-180' : '')
                      }
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className={
                      'absolute left-0 top-full mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 transition-all duration-200 ' +
                      (aboutOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-2 opacity-0')
                    }
                    role="menu"
                  >
                    <a
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                      href="#about"
                      onClick={closeAll}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>

                      <div>
                        <strong className="block text-sm font-semibold text-slate-900">
                          Company Overview
                        </strong>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Our foundation, stockyard infrastructure &amp;
                          capabilities since {BUSINESS.gstYear}.
                        </p>
                      </div>
                    </a>

                    <a
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                      href="#certifications"
                      onClick={closeAll}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="8" r="7" />
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                      </div>

                      <div>
                        <strong className="block text-sm font-semibold text-slate-900">
                          Certifications &amp; Standards
                        </strong>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Business credentials, GST information and applicable
                          standards.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Products */}
                <div
                  className="relative"
                  ref={productsRef}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    type="button"
                    className={
                      'inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150 ' +
                      (productsOpen
                        ? 'bg-slate-50 text-emerald-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600')
                    }
                    onClick={() => setProductsOpen(!productsOpen)}
                    aria-expanded={productsOpen}
                    aria-haspopup="true"
                  >
                    Products
                    <svg
                      className={
                        'h-3.5 w-3.5 transition-transform duration-200 ' +
                        (productsOpen ? 'rotate-180' : '')
                      }
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className={
                      'absolute left-1/2 top-full mt-2 w-175 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 transition-all duration-200 ' +
                      (productsOpen
                        ? 'pointer-events-auto translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-y-2 opacity-0')
                    }
                    role="region"
                    aria-label="Product Families Menu"
                  >
                    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Equipment Families
                      </span>

                      <a
                        className="text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                        href="#products"
                        onClick={closeAll}
                      >
                        Browse Catalogue →
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCT_FAMILIES.map((family) => (
                        <a
                          key={family.name}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                          href="#products"
                          onClick={closeAll}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-inset ring-emerald-100">
                            <img
                              src={family.icon}
                              alt=""
                              loading="lazy"
                              className="h-6 w-6 object-contain"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-sm font-semibold leading-5 text-slate-900">
                                {family.name}
                              </span>

                              <span
                                className="shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-600"
                                aria-hidden="true"
                              >
                                →
                              </span>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {family.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-emerald-600"
                  href="#why"
                  onClick={closeAll}
                >
                  Why Us
                </a>

                <a
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-emerald-600"
                  href="#industries"
                  onClick={closeAll}
                >
                  Industries
                </a>

                <a
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-emerald-600"
                  href="#gallery"
                  onClick={closeAll}
                >
                  Gallery
                </a>

                <a
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-emerald-600"
                  href="#contact"
                  onClick={closeAll}
                >
                  Contact
                </a>
              </nav>

              {/* Right Actions */}
              <div className="ml-auto flex shrink-0 items-center gap-3">
                <a
                  className="hidden whitespace-nowrap items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-600 xl:inline-flex"
                  href={'tel:' + BUSINESS.phoneDial}
                  aria-label={'Call ' + BUSINESS.phone}
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>

                  <span>{BUSINESS.phone}</span>
                </a>

                <a
                  href="#contact"
                  onClick={closeAll}
                  className="hidden items-center justify-center whitespace-nowrap rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-900/15 lg:inline-flex"
                >
                  Request Quote
                </a>

                {/* Mobile menu button */}
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
                  aria-expanded={open}
                  aria-controls="mobile-drawer"
                  aria-label={open ? 'Close navigation' : 'Open navigation'}
                  onClick={() => setOpen(!open)}
                >
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={
                        'block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ' +
                        (open ? 'translate-y-2 rotate-45' : '')
                      }
                    />
                    <span
                      className={
                        'block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ' +
                        (open ? 'opacity-0' : 'opacity-100')
                      }
                    />
                    <span
                      className={
                        'block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ' +
                        (open ? '-translate-y-2 -rotate-45' : '')
                      }
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      <aside
        id="mobile-drawer"
        className={
          'fixed inset-y-0 left-0 z-60 flex w-80 max-w-full flex-col bg-white shadow-2xl transition-transform duration-300 ' +
          (open ? 'translate-x-0' : '-translate-x-full')
        }
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="text-base font-bold tracking-tight text-slate-900">
            vikash <span className="text-emerald-600">Traders</span>
          </span>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <a
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#top"
            onClick={closeAll}
          >
            Home
          </a>

          <a
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#about"
            onClick={closeAll}
          >
            About
          </a>

          <div className="mt-3 border-t border-slate-100 pt-4">
            <span className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Equipment Families
            </span>

            <div className="mt-2 space-y-1">
              {PRODUCT_FAMILIES.map((family) => (
                <a
                  key={family.name}
                  className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  href="#products"
                  onClick={closeAll}
                >
                  {family.name}
                </a>
              ))}
            </div>
          </div>

          <a
            className="mt-2 block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#why"
            onClick={closeAll}
          >
            Why Us
          </a>

          <a
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#industries"
            onClick={closeAll}
          >
            Industries
          </a>

          <a
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#gallery"
            onClick={closeAll}
          >
            Gallery
          </a>

          <a
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#contact"
            onClick={closeAll}
          >
            Contact
          </a>

          <a
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            href="#certifications"
            onClick={closeAll}
          >
            Certifications
          </a>
        </div>

        <div className="border-t border-slate-200 p-4">
          <a
            href="#contact"
            onClick={closeAll}
            className="block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-emerald-700"
          >
            Request Quote
          </a>

          <a
            className="mt-3 block text-center text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600"
            href={'tel:' + BUSINESS.phoneDial}
          >
            Call {BUSINESS.phone}
          </a>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      <div
        className={
          'fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ' +
          (open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0')
        }
        onClick={closeAll}
        aria-hidden="true"
      />
    </>
  );
}
