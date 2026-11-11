
import { useEffect, useState } from 'react';
import api, { apiError } from '../api/client.js';
import { BUSINESS, WHATSAPP_LINK } from '../site.js';
import { IconWhatsApp } from './Icons.jsx';

const EMPTY = {
  name: '',
  phone: '',
  product: '',
  message: '',
};

export default function Contact({
  products = [],
  presetProduct,
  onPresetUsed,
}) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({
    state: 'idle',
    message: '',
  });

  useEffect(() => {
    if (presetProduct) {
      setForm((prev) => ({
        ...prev,
        product: presetProduct,
      }));

      onPresetUsed?.();
    }
  }, [presetProduct, onPresetUsed]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus({
        state: 'error',
        message: 'Please enter your name and contact phone number.',
      });
      return;
    }

    setStatus({
      state: 'busy',
      message: 'Sending your quote request...',
    });

    try {
      await api.post('/enquiries', form);

      setStatus({
        state: 'success',
        message:
          'Thank you! Your quote request has been received. Our team will contact you shortly.',
      });

      setForm(EMPTY);
    } catch (err) {
      setStatus({
        state: 'error',
        message: apiError(
          err,
          'Failed to send request. Please call or WhatsApp us directly.'
        ),
      });
    }
  };

  const statusClass =
    status.state === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : status.state === 'error'
        ? 'border-red-200 bg-red-50 text-red-700'
        : 'border-slate-200 bg-slate-50 text-slate-600';

  const statusDotClass =
    status.state === 'success'
      ? 'bg-emerald-500'
      : status.state === 'error'
        ? 'bg-red-500'
        : 'animate-pulse bg-slate-400';

  return (
    <section
      id="contact"
      aria-label="Contact Vikash Traders"
      className="
        relative
        overflow-hidden
        bg-white
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
          -left-32
          top-16
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
          -right-28
          bottom-0
          h-80
          w-80
          rounded-full
          bg-slate-100/80
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
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
              Get In Touch
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
            Request a Formal Quotation or{' '}
            <span className="text-emerald-600">
              Visit Our Stockyard
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
            "
          >
            Whether you need a single piece or bulk municipal supply, fill
            in your requirements below for same-day rates.
          </p>
        </div>

        {/* Main contact layout */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-8
          "
        >
          {/* =====================================
              LEFT — QUOTE FORM
          ====================================== */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-xl
              shadow-slate-900/5
              transition-all
              duration-300
              hover:border-slate-300
              hover:shadow-2xl
              hover:shadow-slate-900/10
              sm:p-7
              lg:p-8
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-1
                w-20
                bg-emerald-500
                transition-all
                duration-500
                group-hover:w-full
              "
            />

            <span
              className="
                inline-flex
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-emerald-700
              "
            >
              Quote Request
            </span>

            <h3
              className="
                mt-4
                text-2xl
                font-bold
                tracking-tight
                text-slate-950
              "
            >
              Request Equipment Quotation
            </h3>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Fill in your requirements and we will send an itemized GST
              rate sheet.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  Full Name or Organisation{' '}
                  <span className="text-emerald-600">*</span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. R. K. Sharma (Sharma Construction)"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/70
                    px-4
                    text-sm
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-emerald-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  Phone / WhatsApp Number{' '}
                  <span className="text-emerald-600">*</span>
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 98290 XXXXX"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/70
                    px-4
                    text-sm
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-emerald-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              {/* Product */}
              <div>
                <label
                  htmlFor="contact-product"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  Equipment of Interest
                </label>

                <div className="relative">
                  <select
                    id="contact-product"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50/70
                      px-4
                      pr-11
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200
                      focus:border-emerald-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-emerald-500/10
                    "
                  >
                    <option value="">
                      Select equipment or general enquiry...
                    </option>

                    {products.map((p) => (
                      <option key={p._id} value={p.name}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>

                  <svg
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  Requirements &amp; Quantity Needed
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="State quantity, required delivery location in Rajasthan, and any technical specifications..."
                  className="
                    min-h-32
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/70
                    px-4
                    py-3.5
                    text-sm
                    leading-6
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-emerald-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              {/* Status message */}
              {status.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={
                    'rounded-xl border px-4 py-3 text-sm leading-6 ' +
                    statusClass
                  }
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={
                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full ' +
                        statusDotClass
                      }
                    />

                    <span>{status.message}</span>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status.state === 'busy'}
                className="
                  group
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-emerald-600
                  px-5
                  py-3.5
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {status.state === 'busy' ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Request</span>

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
                  </>
                )}
              </button>
            </form>
          </div>

          {/* =====================================
              RIGHT — BUSINESS INFORMATION
          ====================================== */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-slate-950
              p-5
              shadow-2xl
              shadow-slate-900/20
              sm:p-7
              lg:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-64
                w-64
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
                bottom-0
                left-0
                h-40
                w-40
                rounded-full
                bg-emerald-400/5
                blur-3xl
              "
            />

            <div className="relative">
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-emerald-300
                "
              >
                Direct Contact
              </span>

              <h3
                className="
                  mt-4
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Direct Contact &amp; Facility Details
              </h3>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                Verified business information from our registered statutory
                profile.
              </p>

              <div className="mt-8 divide-y divide-white/10">
                {/* Phone */}
                <div className="group flex gap-4 py-5 first:pt-0">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-300
                      transition-all
                      duration-300
                      group-hover:bg-emerald-400
                      group-hover:text-slate-950
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <strong className="block text-sm font-semibold text-white">
                      Phone Support
                    </strong>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      <a
                        href={'tel:' + BUSINESS.phoneDial}
                        className="
                          transition-colors
                          hover:text-emerald-300
                        "
                      >
                        {BUSINESS.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="group flex gap-4 py-5">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-300
                      transition-all
                      duration-300
                      group-hover:bg-emerald-400
                      group-hover:text-slate-950
                    "
                  >
                    <IconWhatsApp width="19" height="19" />
                  </div>

                  <div className="min-w-0">
                    <strong className="block text-sm font-semibold text-white">
                      Direct WhatsApp
                    </strong>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          font-medium
                          text-emerald-300
                          transition-colors
                          hover:text-emerald-200
                        "
                      >
                        Message directly on WhatsApp →
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="group flex gap-4 py-5">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-300
                      transition-all
                      duration-300
                      group-hover:bg-emerald-400
                      group-hover:text-slate-950
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <strong className="block text-sm font-semibold text-white">
                      Operating Stockyard Base
                    </strong>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {BUSINESS.address}
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="group flex gap-4 py-5">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-300
                      transition-all
                      duration-300
                      group-hover:bg-emerald-400
                      group-hover:text-slate-950
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <strong className="block text-sm font-semibold text-white">
                      Working Hours
                    </strong>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {BUSINESS.hours}
                    </p>
                  </div>
                </div>

                {/* GST */}
                <div className="group flex gap-4 py-5 last:pb-0">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-300
                      transition-all
                      duration-300
                      group-hover:bg-emerald-400
                      group-hover:text-slate-950
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <strong className="block text-sm font-semibold text-white">
                      GSTIN &amp; Firm Entity
                    </strong>

                    <p className="mt-1 wrap-break-word text-sm leading-6 text-slate-400">
                      {BUSINESS.name} · GSTIN: {BUSINESS.gst}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom helper */}
              <div
                className="
                  mt-7
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="
                      mt-1
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-emerald-400
                    "
                  />

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Need a quick response?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Call or message us directly for product availability
                      and quotation assistance.
                    </p>
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
