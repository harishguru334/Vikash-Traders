// Single source of truth for the business's real details.
export const BUSINESS = {
  name: 'Vikash Traders',
  proprietor: 'V. Kumar',
  type: 'Proprietorship — Trader & Retailer',
  gst: '08LLOPK9460L1Z0',
  gstYear: 2022,
  phone: '+91 80478 26899',
  phoneDial: '+918047826899',
  whatsapp: '918047826899',
  address: 'Kankarwala, Lunkaransar, Bikaner, Rajasthan',
  hours: 'Monday to Saturday, 9:00 AM – 7:00 PM',
};

export const WHATSAPP_LINK = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
  'Hello Vikash Traders, I would like a quote for:'
)}`;

export const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Industries', href: '#industries' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const CORE_CATEGORIES = [
  'Outdoor Exercise Gym Equipment',
  'Plastic Dust Bins',
  'Cleaning Machines',
  'Queue Stands',
  'Concrete Mixer Machines',
  'Concrete Test Hammer',
  'Shoe Polish Machine',
  'Scrubbing & Polishing Machine',
];

export const rupees = (n) =>
  typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '—';
