import { Router } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';

import AdminUser from '../models/AdminUser.js';
import Product from '../models/Product.js';
import Enquiry from '../models/Enquiry.js';
import Category from '../models/Category.js';
import SiteContent from '../models/SiteContent.js';
import WhyUs from '../models/WhyUs.js';
import Industry from '../models/Industry.js';
import GalleryItem from '../models/GalleryItem.js';
import Faq from '../models/Faq.js';
import SiteSetting from '../models/SiteSetting.js';

import { COOKIE_NAME, cookieOptions, requireAdmin, requireSuperAdmin, signToken } from '../middleware/auth.js';

const router = Router();

/* ------------------------------ AUTH ------------------------------ */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many sign-in attempts. Wait 15 minutes and try again.' },
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Enter both username and password.' });
    }

    const admin = await AdminUser.findOne({ username: String(username).trim().toLowerCase() });
    const ok = admin && (await bcrypt.compare(String(password), admin.passwordHash));
    if (!ok) return res.status(401).json({ error: 'Username or password is incorrect.' });
    if (!admin.isActive) return res.status(403).json({ error: 'This admin account has been deactivated.' });

    admin.lastActiveAt = new Date();
    await admin.save();

    res.cookie(COOKIE_NAME, signToken(admin), cookieOptions());
    res.json({ 
      username: admin.username, 
      role: admin.role || 'Super Admin',
      email: admin.email || '' 
    });
  } catch {
    res.status(500).json({ error: 'Sign-in failed. Try again.' });
  }
});

router.post('/logout', requireAdmin, (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  res.json({ ok: true });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ 
    username: req.admin.username, 
    role: req.admin.role || 'Super Admin',
    email: req.admin.email || '' 
  });
});

/* --------------------------- DASHBOARD ---------------------------- */

router.get('/stats', requireAdmin, async (_req, res) => {
  try {
    const [
      products, 
      activeProducts, 
      categoriesCount,
      enquiries, 
      newEnquiries,
      contactedEnquiries,
      galleryCount
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Category.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ status: 'contacted' }),
      GalleryItem.countDocuments(),
    ]);

    const latest = await Enquiry.find().sort({ createdAt: -1 }).limit(6);
    res.json({ 
      products, 
      activeProducts, 
      draftProducts: products - activeProducts,
      categories: categoriesCount, 
      enquiries, 
      newEnquiries, 
      contactedEnquiries,
      galleryImages: galleryCount,
      latest 
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not load dashboard statistics.' });
  }
});

/* ----------------------------- UPLOADS ---------------------------- */

const uploadDir = path.resolve(process.cwd(), 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const safe = file.originalname.replace(/[^a-zA-Z0-9.-_]/g, '_');
      cb(null, `${Date.now()}-${safe}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|avif|svg\+xml)$/.test(file.mimetype)) return cb(null, true);
    cb(new Error('Upload a PNG, JPG, WEBP, AVIF or SVG image under 5 MB.'));
  },
});

router.post('/uploads', requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'Choose an image to upload.' });
    res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
  });
});

/* ---------------------------- PRODUCTS ---------------------------- */

router.get('/products', requireAdmin, async (_req, res) => {
  const products = await Product.find().sort({ sortOrder: 1, createdAt: 1 });
  res.json(products);
});

function productPayload(body = {}) {
  return {
    category: String(body.category || '').trim(),
    name: String(body.name || '').trim(),
    price: Number(body.price),
    imageUrl: String(body.imageUrl || '').trim(),
    sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    isActive: body.isActive !== false,
  };
}

router.post('/products', requireAdmin, async (req, res) => {
  const data = productPayload(req.body);
  if (!data.category || !data.name || !Number.isFinite(data.price)) {
    return res.status(400).json({ error: 'Category, name and price are required.' });
  }
  const product = await Product.create(data);
  res.status(201).json(product);
});

router.put('/products/:id', requireAdmin, async (req, res) => {
  const data = productPayload(req.body);
  if (!data.category || !data.name || !Number.isFinite(data.price)) {
    return res.status(400).json({ error: 'Category, name and price are required.' });
  }
  const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ error: 'That product no longer exists.' });
  res.json(product);
});

router.delete('/products/:id', requireAdmin, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: 'That product no longer exists.' });
  res.json({ ok: true });
});

/* --------------------------- CATEGORIES --------------------------- */

router.get('/categories', requireAdmin, async (_req, res) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, name: 1 });
    // Count active products in each category for deletion protection
    const productCounts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const countMap = {};
    productCounts.forEach(c => { countMap[c._id] = c.count; });

    const withCounts = categories.map(cat => ({
      ...cat.toObject(),
      productCount: countMap[cat.name] || 0
    }));

    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch categories.' });
  }
});

router.post('/categories', requireAdmin, async (req, res) => {
  try {
    const { name, slug, description, icon, displayOrder, isActive } = req.body || {};
    if (!name?.trim()) return res.status(400).json({ error: 'Category name is required.' });

    const safeSlug = (slug || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const category = await Category.create({
      name: name.trim(),
      slug: safeSlug,
      description: description?.trim() || '',
      icon: icon?.trim() || '🏷️',
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive !== false,
    });
    res.status(201).json(category);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'A category with this name or slug already exists.' });
    res.status(500).json({ error: 'Failed to create category.' });
  }
});

router.put('/categories/:id', requireAdmin, async (req, res) => {
  try {
    const { name, slug, description, icon, displayOrder, isActive } = req.body || {};
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Category not found.' });

    const oldName = cat.name;
    cat.name = name?.trim() || cat.name;
    if (slug) cat.slug = slug.trim().toLowerCase();
    if (description !== undefined) cat.description = description.trim();
    if (icon) cat.icon = icon.trim();
    if (displayOrder !== undefined) cat.displayOrder = Number(displayOrder);
    if (isActive !== undefined) cat.isActive = Boolean(isActive);

    await cat.save();

    // If name changed, optionally update references in products
    if (oldName !== cat.name) {
      await Product.updateMany({ category: oldName }, { category: cat.name });
    }

    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

// Category Deletion Protection: CANNOT delete if active products exist
router.delete('/categories/:id', requireAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found.' });

    const productCount = await Product.countDocuments({ category: category.name });
    if (productCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete category "${category.name}". There are ${productCount} active product(s) assigned to it. Reassign or delete these products first.` 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

/* --------------------------- ENQUIRIES ---------------------------- */

router.get('/enquiries', requireAdmin, async (req, res) => {
  const filter = {};
  if (['new', 'contacted', 'closed'].includes(req.query.status)) filter.status = req.query.status;
  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
  res.json(enquiries);
});

router.patch('/enquiries/:id', requireAdmin, async (req, res) => {
  const { status } = req.body || {};
  if (!['new', 'contacted', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'Status must be new, contacted or closed.' });
  }
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) return res.status(404).json({ error: 'That enquiry no longer exists.' });
  res.json(enquiry);
});

router.delete('/enquiries/:id', requireAdmin, async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) return res.status(404).json({ error: 'That enquiry no longer exists.' });
  res.json({ ok: true });
});

/* --------------------------- CMS CONTENT -------------------------- */

// Generic site content: about, contact, seo
router.get('/content/:key', requireAdmin, async (req, res) => {
  try {
    const content = await SiteContent.findOne({ key: req.params.key });
    res.json(content ? content.data : {});
  } catch {
    res.status(500).json({ error: 'Failed to load content.' });
  }
});

router.post('/content/:key', requireAdmin, async (req, res) => {
  try {
    const { data, status } = req.body || {};
    const content = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { 
        data: data || {}, 
        status: status || 'Published',
        updatedBy: req.admin.username 
      },
      { upsert: true, new: true }
    );
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content.' });
  }
});

/* ----------------------------- WHY US ----------------------------- */

router.get('/why-us', requireAdmin, async (_req, res) => {
  const items = await WhyUs.find().sort({ displayOrder: 1 });
  res.json(items);
});

router.post('/why-us', requireAdmin, async (req, res) => {
  try {
    const { title, description, icon, displayOrder, isActive } = req.body || {};
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
    const item = await WhyUs.create({
      title: title.trim(),
      description: description.trim(),
      icon: icon?.trim() || 'Shield',
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive !== false,
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Failed to create Why Us item.' });
  }
});

router.put('/why-us/:id', requireAdmin, async (req, res) => {
  try {
    const item = await WhyUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    res.json(item);
  } catch {
    res.status(500).json({ error: 'Failed to update Why Us item.' });
  }
});

router.delete('/why-us/:id', requireAdmin, async (req, res) => {
  const item = await WhyUs.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found.' });
  res.json({ ok: true });
});

/* --------------------------- INDUSTRIES --------------------------- */

router.get('/industries', requireAdmin, async (_req, res) => {
  const items = await Industry.find().sort({ displayOrder: 1 });
  res.json(items);
});

router.post('/industries', requireAdmin, async (req, res) => {
  try {
    const { name, description, image, displayOrder, isActive } = req.body || {};
    if (!name?.trim() || !description?.trim()) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }
    const item = await Industry.create({
      name: name.trim(),
      description: description.trim(),
      image: image?.trim() || 'assets/hero-equipment-showcase.svg',
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive !== false,
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Failed to create industry.' });
  }
});

router.put('/industries/:id', requireAdmin, async (req, res) => {
  try {
    const item = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Industry not found.' });
    res.json(item);
  } catch {
    res.status(500).json({ error: 'Failed to update industry.' });
  }
});

router.delete('/industries/:id', requireAdmin, async (req, res) => {
  const item = await Industry.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Industry not found.' });
  res.json({ ok: true });
});

/* ---------------------------- GALLERY ----------------------------- */

router.get('/gallery', requireAdmin, async (_req, res) => {
  const items = await GalleryItem.find().sort({ displayOrder: 1, createdAt: -1 });
  res.json(items);
});

router.post('/gallery', requireAdmin, async (req, res) => {
  try {
    const { title, caption, image, tag, displayOrder, isActive } = req.body || {};
    if (!title?.trim() || !image?.trim()) {
      return res.status(400).json({ error: 'Title and image are required.' });
    }
    const item = await GalleryItem.create({
      title: title.trim(),
      caption: caption?.trim() || '',
      image: image.trim(),
      tag: tag?.trim() || 'Installation',
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive !== false,
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Failed to add gallery item.' });
  }
});

router.put('/gallery/:id', requireAdmin, async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Gallery item not found.' });
    res.json(item);
  } catch {
    res.status(500).json({ error: 'Failed to update gallery item.' });
  }
});

router.delete('/gallery/:id', requireAdmin, async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'Gallery item not found.' });
  res.json({ ok: true });
});

/* ------------------------------ FAQS ------------------------------ */

router.get('/faqs', requireAdmin, async (_req, res) => {
  const items = await Faq.find().sort({ displayOrder: 1 });
  res.json(items);
});

router.post('/faqs', requireAdmin, async (req, res) => {
  try {
    const { question, answer, category, displayOrder, isActive } = req.body || {};
    if (!question?.trim() || !answer?.trim()) {
      return res.status(400).json({ error: 'Question and answer are required.' });
    }
    const item = await Faq.create({
      question: question.trim(),
      answer: answer.trim(),
      category: category?.trim() || 'General',
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive !== false,
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Failed to create FAQ.' });
  }
});

router.put('/faqs/:id', requireAdmin, async (req, res) => {
  try {
    const item = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'FAQ not found.' });
    res.json(item);
  } catch {
    res.status(500).json({ error: 'Failed to update FAQ.' });
  }
});

router.delete('/faqs/:id', requireAdmin, async (req, res) => {
  const item = await Faq.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: 'FAQ not found.' });
  res.json({ ok: true });
});

/* -------------------- SUPER ADMIN: ADMIN USERS -------------------- */

// All endpoints in this block strictly require Super Admin privilege
router.get('/users', requireAdmin, requireSuperAdmin, async (_req, res) => {
  const users = await AdminUser.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
});

router.post('/users', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body || {};
    if (!username?.trim() || !password) {
      return res.status(400).json({ error: 'Username and initial password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(String(password), salt);

    const user = await AdminUser.create({
      username: String(username).trim().toLowerCase(),
      email: String(email || '').trim().toLowerCase(),
      passwordHash,
      role: role === 'Content Admin' ? 'Content Admin' : 'Super Admin',
      isActive: true,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'An admin with this username already exists.' });
    res.status(500).json({ error: 'Failed to create admin user.' });
  }
});

router.put('/users/:id', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const { email, role, isActive, password } = req.body || {};
    const user = await AdminUser.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Admin user not found.' });

    if (email !== undefined) user.email = String(email).trim().toLowerCase();
    if (role && ['Super Admin', 'Content Admin'].includes(role)) user.role = role;
    if (isActive !== undefined) user.isActive = Boolean(isActive);

    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(String(password).trim(), salt);
    }

    await user.save();
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
  } catch {
    res.status(500).json({ error: 'Failed to update admin user.' });
  }
});

router.delete('/users/:id', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    if (req.params.id === req.admin._id.toString()) {
      return res.status(400).json({ error: 'You cannot delete your own active administrator account.' });
    }
    const user = await AdminUser.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Admin user not found.' });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete admin user.' });
  }
});

/* ------------------- SUPER ADMIN: SITE SETTINGS ------------------- */

router.get('/settings', requireAdmin, requireSuperAdmin, async (_req, res) => {
  try {
    const settings = await SiteSetting.find();
    const config = {};
    settings.forEach(s => { config[s.key] = s.value; });
    res.json(config);
  } catch {
    res.status(500).json({ error: 'Failed to load site settings.' });
  }
});

router.post('/settings', requireAdmin, requireSuperAdmin, async (req, res) => {
  try {
    const settingsObj = req.body || {};
    const updates = Object.keys(settingsObj).map(key => 
      SiteSetting.findOneAndUpdate(
        { key }, 
        { key, value: settingsObj[key] }, 
        { upsert: true, new: true }
      )
    );
    await Promise.all(updates);
    res.json({ ok: true, settings: settingsObj });
  } catch {
    res.status(500).json({ error: 'Failed to save site settings.' });
  }
});

export default router;
