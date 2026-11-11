import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Product from '../models/Product.js';
import Enquiry from '../models/Enquiry.js';
import Category from '../models/Category.js';
import SiteContent from '../models/SiteContent.js';
import WhyUs from '../models/WhyUs.js';
import Industry from '../models/Industry.js';
import GalleryItem from '../models/GalleryItem.js';
import Faq from '../models/Faq.js';
import SiteSetting from '../models/SiteSetting.js';

const router = Router();

// Public catalogue — active products only, ordered for display.
router.get('/products', async (_req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .select('category name price imageUrl sortOrder');
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Could not load products. Try again in a moment.' });
  }
});

// Public categories
router.get('/categories', async (_req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(categories);
  } catch {
    res.status(500).json({ error: 'Could not load categories.' });
  }
});

// Public CMS Content (About, Contact, SEO)
router.get('/content/:key', async (req, res) => {
  try {
    const content = await SiteContent.findOne({ key: req.params.key, status: 'Published' });
    res.json(content ? content.data : {});
  } catch {
    res.status(500).json({ error: 'Could not load content.' });
  }
});

// Public Why Us
router.get('/why-us', async (_req, res) => {
  try {
    const items = await WhyUs.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Could not load Why Us items.' });
  }
});

// Public Industries
router.get('/industries', async (_req, res) => {
  try {
    const items = await Industry.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Could not load industries.' });
  }
});

// Public Gallery
router.get('/gallery', async (_req, res) => {
  try {
    const items = await GalleryItem.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Could not load gallery items.' });
  }
});

// Public FAQs
router.get('/faqs', async (_req, res) => {
  try {
    const items = await Faq.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Could not load FAQs.' });
  }
});

// Public Settings (e.g. maintenance mode)
router.get('/settings/public', async (_req, res) => {
  try {
    const maintenance = await SiteSetting.findOne({ key: 'maintenanceMode' });
    res.json({ maintenanceMode: Boolean(maintenance?.value) });
  } catch {
    res.json({ maintenanceMode: false });
  }
});

const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiries from this device. Try again in a few minutes.' },
});

router.post('/enquiries', enquiryLimiter, async (req, res) => {
  try {
    const { name, phone, product, message } = req.body || {};

    if (!name?.trim()) return res.status(400).json({ error: 'Enter your name.' });
    if (!/^[0-9+\-\s()]{7,20}$/.test(String(phone || '').trim())) {
      return res.status(400).json({ error: 'Enter a valid phone number.' });
    }

    await Enquiry.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      product: String(product || '').trim(),
      message: String(message || '').trim(),
    });

    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Could not send your enquiry. Call +91 80478 26899 instead.' });
  }
});

export default router;
