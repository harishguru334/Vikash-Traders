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

// Proprietary Flagship Brand (Applied for Trademark Registration)
export const BRAND = {
  name: 'ROADNEX',
  displayName: 'ROADNEX™',
  tagline: 'High-Performance Road Safety & Traffic Management Solutions',
  status: 'Trademark Applied (Expected in 2–3 Months)',
  isPendingRegistration: true,
  category: 'Road Safety & Traffic Control Infrastructure',
  description:
    'Our proprietary brand for engineered road safety equipment including heavy-duty traffic cones, rubber speed bumps, convex mirrors, solar road studs, spring posts, corner guards, and reflective delineators.',
};

export const WHATSAPP_LINK = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
  'Hello Vikash Traders, I would like a quote for:'
)}`;

export const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Industries', href: '#industries' },
  { label: 'Clients', href: '#clients' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const CORE_CATEGORIES = [
  'Road Safety Equipment (ROADNEX™)',
  'Plastic Dust Bins',
  'Cleaning Machines',
  'Outdoor Exercise Gym Equipment',
  'Queue Stands',
  'Concrete Mixer Machines',
  'Concrete Test Hammer',
  'Shoe Polish Machine',
  'Scrubbing & Polishing Machine',
];

export const DEFAULT_PRODUCTS = [
  {
    _id: 'roadnex-1',
    name: 'ROADNEX 750mm Heavy-Duty Rubber Traffic Cone (Reflective Sleeve)',
    category: 'Road Safety Equipment (ROADNEX™)',
    price: 650,
    unit: 'piece',
    description: 'High-density flexible virgin rubber cone with hexagonal wind-stable base and dual prismatic high-intensity 3M reflective sleeves for highway and construction safety.',
    imageUrl: '',
    badge: 'ROADNEX™ Flagship',
    isFeatured: true,
  },
  {
    _id: 'roadnex-2',
    name: 'ROADNEX Modular Heavy Rubber Speed Bump (50mm / 75mm Profile)',
    category: 'Road Safety Equipment (ROADNEX™)',
    price: 1850,
    unit: 'meter',
    description: 'Ultra-tough vulcanized modular rubber speed breaker with embedded cat-eye glass reflectors and non-skid diamond pattern for 40-ton load capacity.',
    imageUrl: '',
    badge: 'ROADNEX™ Brand',
    isFeatured: true,
  },
  {
    _id: 'roadnex-3',
    name: 'ROADNEX 800mm / 1000mm Outdoor Polycarbonate Convex Mirror',
    category: 'Road Safety Equipment (ROADNEX™)',
    price: 2450,
    unit: 'piece',
    description: 'Unbreakable wide-angle 130-degree convex safety mirror with UV-resistant ABS orange hooded backplate and heavy-duty steel mounting bracket for blind turns and gates.',
    imageUrl: '',
    badge: 'ROADNEX™ Brand',
    isFeatured: true,
  },
  {
    _id: 'roadnex-4',
    name: 'ROADNEX Solar LED Aluminium Road Stud / Cat Eye',
    category: 'Road Safety Equipment (ROADNEX™)',
    price: 480,
    unit: 'piece',
    description: 'Heavy cast-aluminium solar-powered blinking road stud with monocrystalline solar panel, super-bright dual LEDs, and 20-ton vehicular compression rating.',
    imageUrl: '',
    badge: 'ROADNEX™ Brand',
  },
  {
    _id: 'roadnex-5',
    name: 'ROADNEX 750mm Flexible PU Spring Post / Rebound Delineator',
    category: 'Road Safety Equipment (ROADNEX™)',
    price: 720,
    unit: 'piece',
    description: 'High-elasticity polyurethane warning post with 3 high-intensity reflective bands; rebounds instantly upon vehicle impact without damaging vehicles.',
    imageUrl: '',
    badge: 'ROADNEX™ Brand',
  },
  {
    _id: 'roadnex-6',
    name: 'ROADNEX Heavy-Duty Rubber Wheel Stopper / Parking Curb',
    category: 'Road Safety Equipment (ROADNEX™)',
    price: 1150,
    unit: 'piece',
    description: 'Moulded recycled rubber parking curb with high-visibility chevron yellow reflective foil, designed for commercial parking decks, docks, and transit bays.',
    imageUrl: '',
    badge: 'ROADNEX™ Brand',
  },
  {
    _id: 'bin-1',
    name: '120 Litre Commercial HDPE Wheeled Dustbin (Pedal / Non-Pedal)',
    category: 'Plastic Dust Bins',
    price: 1450,
    unit: 'piece',
    description: 'Virgin HDPE UV-stabilized two-wheel waste container compliant with EN 840 municipal hygiene standards.',
    imageUrl: '',
  },
  {
    _id: 'bin-2',
    name: '240 Litre Heavy-Duty HDPE Mobile Garbage Bin',
    category: 'Plastic Dust Bins',
    price: 2250,
    unit: 'piece',
    description: 'Large-capacity solid rubber wheelie bin with reinforced lifting trunnions for mechanized municipal tippers.',
    imageUrl: '',
  },
  {
    _id: 'clean-1',
    name: 'Commercial Wet & Dry Industrial Vacuum Cleaner (80L Triple Motor)',
    category: 'Cleaning Machines',
    price: 18500,
    unit: 'piece',
    description: 'Heavy 3000W triple-bypass suction vacuum with stainless steel tank for shop floors, depots, and public transit terminals.',
    imageUrl: '',
  },
  {
    _id: 'clean-2',
    name: 'Walk-Behind Battery Scrubber Drier Machine',
    category: 'Cleaning Machines',
    price: 95000,
    unit: 'piece',
    description: 'High-speed floor scrubber with parabolic suction squeegee for hospitals, railway platforms, and commercial atriums.',
    imageUrl: '',
  },
  {
    _id: 'gym-1',
    name: 'Institutional Double Air Walker Outdoor Gym Station',
    category: 'Outdoor Exercise Gym Equipment',
    price: 16500,
    unit: 'set',
    description: 'Heavy B-class GI pipe construction with sealed self-lubricating bearings and dual-coat PU powder finish for civic parks.',
    imageUrl: '',
  },
  {
    _id: 'queue-1',
    name: 'Stainless Steel Retractable Belt Queue Stanchion (2.5m Red/Blue Belt)',
    category: 'Queue Stands',
    price: 1350,
    unit: 'piece',
    description: 'SS 201/304 mirror finish crowd control barrier post with weighted cast-iron base for airports, metros, and banks.',
    imageUrl: '',
  },
];

export const rupees = (n) =>
  typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '—';
