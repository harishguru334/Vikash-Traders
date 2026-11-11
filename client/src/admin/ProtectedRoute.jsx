import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

/**
 * Convenience guard only. The real gate is the JWT check in the Express
 * auth middleware, which runs on every protected API route.
 */
export default function ProtectedRoute({ children }) {
  const { admin, checking } = useAuth();
  const location = useLocation();

  if (checking) return <div className="admin-boot">Checking your session…</div>;
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return children;
}
