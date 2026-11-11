import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import AdminUser from './models/AdminUser.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import SiteContent from './models/SiteContent.js';
import WhyUs from './models/WhyUs.js';
import Industry from './models/Industry.js';
import GalleryItem from './models/GalleryItem.js';
import Faq from './models/Faq.js';
import SiteSetting from './models/SiteSetting.js';

dotenv.config();

const INITIAL_CATEGORIES = [
  { name: 'Outdoor Exercise Gym Equipment', slug: 'outdoor-exercise-gym-equipment', description: 'Institutional outdoor park fitness stations, double air walkers, waist twisters, and shoulder builders.', icon: '🏋️', displayOrder: 1 },
  { name: 'Plastic Dust Bins', slug: 'plastic-dust-bins', description: 'Commercial HDPE wheelie bins (60L, 100L, 120L, 240L, 1100L) with heavy UV-stabilized virgin polymer.', icon: '🗑️', displayOrder: 2 },
  { name: 'Cleaning Machines', slug: 'cleaning-machines', description: 'Heavy-duty industrial wet & dry vacuum machines and commercial high-pressure washers.', icon: '🧹', displayOrder: 3 },
  { name: 'Queue Stands', slug: 'queue-stands', description: 'Stainless steel retractable belt stanchions, velvet rope posts, and crowd guidance barriers.', icon: '🚧', displayOrder: 4 },
  { name: 'Concrete Mixer Machines', slug: 'concrete-mixer-machines', description: '10/7 CFT heavy drum concrete mixers with diesel engine and electric motor options.', icon: '⚙️', displayOrder: 5 },
  { name: 'Concrete Test Hammer', slug: 'concrete-test-hammer', description: 'Non-destructive rebound test hammers for on-site concrete compressive strength verification.', icon: '🔨', displayOrder: 6 },
  { name: 'Shoe Polish Machine', slug: 'shoe-polish-machine', description: 'Infrared auto-sensor commercial shoe shining stations for hotels, corporate towers, and airports.', icon: '👞', displayOrder: 7 },
  { name: 'Scrubbing & Polishing Machine', slug: 'scrubbing-polishing-machine', description: 'Single-disc high torque floor scrubbers and burnishers for marble, granite, and epoxy flooring.', icon: '✨', displayOrder: 8 },
];

const INITIAL_WHY_US = [
  { title: '100% Direct Factory Sourcing', description: 'Eliminate middlemen commissions. Equipment is sourced directly from certified manufacturing lines with transparent wholesale rates.', icon: 'Factory', displayOrder: 1 },
  { title: 'Tax-Compliant Invoicing & GSTIN', description: 'Every shipment is backed by verified commercial tax invoices, E-way bill generation, and full GST input tax credit eligibility.', icon: 'Receipt', displayOrder: 2 },
  { title: 'Rigorous On-Site Quality Control', description: 'Heavy-gauge steel fabrication, powder-coat finishes, and motor load benchmarks tested before freight loading.', icon: 'ShieldCheck', displayOrder: 3 },
  { title: 'Pan-India Freight Logistics', description: 'Direct logistics dispatch across all major industrial transit corridors with insured pallet transport.', icon: 'Truck', displayOrder: 4 },
];

const INITIAL_INDUSTRIES = [
  { name: 'Municipalities & Smart Cities', description: 'Public park gyms, solid waste segregation containers, and civic sanitation equipment.', image: 'assets/hero-equipment-showcase.svg', displayOrder: 1 },
  { name: 'Infrastructure & Construction', description: 'Heavy concrete mixers, rebound test hammers, and structural site machinery.', image: 'assets/hero-equipment-showcase.svg', displayOrder: 2 },
  { name: 'Commercial Complexes & Malls', description: 'Pedestrian crowd queue stands, automatic shoe polish machines, and waste bins.', image: 'assets/hero-equipment-showcase.svg', displayOrder: 3 },
  { name: 'Hospitality & Healthcare', description: 'High-power floor scrubbers, sanitization machinery, and institutional maintenance equipment.', image: 'assets/hero-equipment-showcase.svg', displayOrder: 4 },
];

const INITIAL_FAQS = [
  { question: 'Do you provide full GST tax invoices for commercial purchases?', answer: 'Yes. Every dispatch is accompanied by an official tax invoice containing your organization GSTIN, HSN codes, and verified GST breakups eligible for 100% input tax credit.', category: 'Invoicing & Tax', displayOrder: 1 },
  { question: 'What are the minimum order quantities (MOQ) for wholesale rates?', answer: 'Wholesale prices are structured for bulk procurement and commercial contractors. Individual unit samples can be arranged upon commercial verification.', category: 'Procurement', displayOrder: 2 },
  { question: 'How is nationwide transport and dispatch handled?', answer: 'We coordinate with insured national surface freight carriers. Consignments are packed with wooden crating or palletizing and tracked via E-way bill.', category: 'Freight & Logistics', displayOrder: 3 },
  { question: 'What warranty is offered on outdoor fitness gym equipment?', answer: 'Heavy-gauge outdoor gym equipment carries a standard 12-month structural weld and bearing warranty against manufacturing defects under normal civic use.', category: 'Warranty & Support', displayOrder: 4 },
];

const INITIAL_ABOUT = {
  heading: 'Direct B2B Industrial Equipment Sourcing Without Middlemen',
  intro: 'Vikash Traders supplies institutional-grade machinery, civic fitness stations, and commercial sanitation solutions directly to contractors, infrastructure developers, and institutions across India.',
  description: 'Founded on transparency and verified procurement standards, we supply verified machinery with authentic factory-direct pricing, official tax compliance, and reliable freight dispatch.',
  highlights: [
    '100% Tax Invoiced with official GSTIN and HSN classifications',
    'Factory-direct wholesale rates without trader markups',
    'Tested commercial specifications engineered for heavy-duty cycle',
    'Coordinated road freight across all Indian states and Union territories'
  ],
  image: 'assets/hero-equipment-showcase.svg'
};

const INITIAL_CONTACT = {
  phone: '+91 80478 26899',
  whatsapp: '+91 98765 43210',
  email: 'sales@vikashtraders.com',
  hours: 'Monday – Saturday: 9:30 AM to 7:00 PM IST',
  address: 'Commercial Equipment Facility & Central Dispatch Warehouse, India',
  mapsUrl: 'https://maps.google.com/?q=Commercial+Hub+India',
  linkedin: 'https://linkedin.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
};

const INITIAL_SEO = {
  title: 'Vikash Traders — Commercial & Industrial Equipment Sourcing',
  metaDescription: 'Direct B2B supplier of commercial cleaning machines, outdoor exercise gym equipment, HDPE plastic dustbins, queue stands, and concrete testing machinery with official GST tax invoicing.',
  keywords: 'commercial equipment, outdoor gym equipment, plastic dustbins, 240L wheelie bins, queue stands, concrete mixer, floor scrubber India',
  ogTitle: 'Vikash Traders — Commercial & Industrial B2B Equipment',
  ogDescription: 'Direct B2B supplier of heavy-duty municipal, infrastructure, and commercial sanitation equipment across India.',
  ogImage: 'assets/hero-equipment-showcase.svg',
  favicon: 'assets/hero-equipment-showcase.svg',
};

async function seed() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to DB for seeding.');

    // 1. Ensure Super Admin User exists with role: 'Super Admin'
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await AdminUser.findOneAndUpdate(
      { username: adminUsername.toLowerCase() },
      { 
        username: adminUsername.toLowerCase(),
        email: 'admin@vikashtraders.com',
        passwordHash,
        role: 'Super Admin',
        isActive: true,
      },
      { upsert: true }
    );
    console.log('✓ Master Super Admin verified.');

    // 2. Ensure Categories seeded
    for (const cat of INITIAL_CATEGORIES) {
      await Category.findOneAndUpdate({ name: cat.name }, cat, { upsert: true });
    }
    console.log('✓ Categories seeded.');

    // 3. Ensure Content seeded
    await SiteContent.findOneAndUpdate({ key: 'about' }, { key: 'about', data: INITIAL_ABOUT, status: 'Published' }, { upsert: true });
    await SiteContent.findOneAndUpdate({ key: 'contact' }, { key: 'contact', data: INITIAL_CONTACT, status: 'Published' }, { upsert: true });
    await SiteContent.findOneAndUpdate({ key: 'seo' }, { key: 'seo', data: INITIAL_SEO, status: 'Published' }, { upsert: true });
    console.log('✓ Site content (About, Contact, SEO) seeded.');

    // 4. Ensure Why Us seeded
    for (const item of INITIAL_WHY_US) {
      await WhyUs.findOneAndUpdate({ title: item.title }, item, { upsert: true });
    }
    console.log('✓ Why Us pillars seeded.');

    // 5. Ensure Industries seeded
    for (const item of INITIAL_INDUSTRIES) {
      await Industry.findOneAndUpdate({ name: item.name }, item, { upsert: true });
    }
    console.log('✓ Industries seeded.');

    // 6. Ensure FAQs seeded
    for (const item of INITIAL_FAQS) {
      await Faq.findOneAndUpdate({ question: item.question }, item, { upsert: true });
    }
    console.log('✓ FAQs seeded.');

    // 7. Ensure Site Settings seeded
    await SiteSetting.findOneAndUpdate({ key: 'maintenanceMode' }, { key: 'maintenanceMode', value: false, description: 'Maintenance mode toggle' }, { upsert: true });
    await SiteSetting.findOneAndUpdate({ key: 'notificationEmail' }, { key: 'notificationEmail', value: 'sales@vikashtraders.com', description: 'Quotation leads email alert' }, { upsert: true });
    console.log('✓ Site settings seeded.');

    console.log('Seeding finished successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
