import axios from 'axios';

// In dev, VITE_API_URL is blank and Vite proxies /api to the Express server.
// In production, set VITE_API_URL to the deployed API origin.
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  withCredentials: true, // sends the httpOnly admin cookie
});

export function apiError(err, fallback = 'Something went wrong. Try again.') {
  return err?.response?.data?.error || fallback;
}

// Image paths returned by the upload endpoint are server-relative.
export function assetUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${import.meta.env.VITE_API_URL || ''}${url}`;
}

export default api;
