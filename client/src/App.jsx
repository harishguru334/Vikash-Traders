import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';

import AuthProvider from './admin/AuthContext.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import Login from './admin/Login.jsx';

import Dashboard from './admin/Dashboard.jsx';
import ProductsAdmin from './admin/ProductsAdmin.jsx';
import CategoriesAdmin from './admin/CategoriesAdmin.jsx';
import EnquiriesAdmin from './admin/EnquiriesAdmin.jsx';

import AboutAdmin from './admin/AboutAdmin.jsx';
import WhyUsAdmin from './admin/WhyUsAdmin.jsx';
import IndustriesAdmin from './admin/IndustriesAdmin.jsx';
import GalleryAdmin from './admin/GalleryAdmin.jsx';
import FaqsAdmin from './admin/FaqsAdmin.jsx';
import ContactAdmin from './admin/ContactAdmin.jsx';
import SeoAdmin from './admin/SeoAdmin.jsx';

import UsersAdmin from './admin/UsersAdmin.jsx';
import RolesAdmin from './admin/RolesAdmin.jsx';
import SettingsAdmin from './admin/SettingsAdmin.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Admin Panel with full multi-section CMS routing */}
      <Route
        path="/admin/*"
        element={
          <AuthProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                {/* 1. Main */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="categories" element={<CategoriesAdmin />} />
                <Route path="enquiries" element={<EnquiriesAdmin />} />

                {/* 2. Website Content */}
                <Route path="about" element={<AboutAdmin />} />
                <Route path="why-us" element={<WhyUsAdmin />} />
                <Route path="industries" element={<IndustriesAdmin />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="faqs" element={<FaqsAdmin />} />
                <Route path="contact" element={<ContactAdmin />} />
                <Route path="seo" element={<SeoAdmin />} />

                {/* 3. Administration */}
                <Route path="users" element={<UsersAdmin />} />
                <Route path="roles" element={<RolesAdmin />} />
                <Route path="settings" element={<SettingsAdmin />} />
              </Route>
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
