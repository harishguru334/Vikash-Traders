import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export const COOKIE_NAME = 'vt_admin';

export function signToken(admin) {
  return jwt.sign(
    { 
      sub: admin._id.toString(), 
      username: admin.username,
      role: admin.role || 'Super Admin'
    }, 
    process.env.JWT_SECRET || 'vikash-traders-secret-key-2026', 
    { expiresIn: '7d' }
  );
}

export function cookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,                    // HTTPS only in production
    sameSite: isProd ? 'none' : 'lax', // 'none' lets the deployed client on another domain send it
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };
}

// Verifies the JWT server-side on every protected route.
export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ error: 'Sign in to continue.' });

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'vikash-traders-secret-key-2026');
    const admin = await AdminUser.findById(payload.sub).select('_id username role isActive');
    if (!admin) return res.status(401).json({ error: 'This account no longer exists.' });
    if (!admin.isActive) return res.status(403).json({ error: 'This account is deactivated.' });

    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ error: 'Your session expired. Sign in again.' });
  }
}

// Two-Tier Authorization: Restricts action strictly to Super Admin
export function requireSuperAdmin(req, res, next) {
  if (!req.admin || req.admin.role !== 'Super Admin') {
    return res.status(403).json({ 
      error: 'Super Admin authorization required. Content Admins cannot access this management section.' 
    });
  }
  next();
}
