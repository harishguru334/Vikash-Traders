import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { apiError } from '../api/client.js';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  // The session lives in an httpOnly cookie, so the only way to know whether
  // we're signed in is to ask the server.
  const refresh = useCallback(async () => {
    try {
      const res = await api.get('/admin/me');
      setAdmin(res.data);
    } catch {
      setAdmin(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (username, password) => {
    try {
      const res = await api.post('/admin/login', { username, password });
      setAdmin(res.data);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: apiError(err, 'Sign-in failed. Try again.') };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/admin/logout');
    } finally {
      setAdmin(null);
    }
  }, []);

  const value = useMemo(() => ({ admin, checking, login, logout, refresh }), [admin, checking, login, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
