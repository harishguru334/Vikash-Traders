import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import '../styles/admin.css';

const navGroups = [
  {
    title: 'MAIN',
    items: [
      {
        to: '/admin/dashboard',
        label: 'Dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"/>
            <rect x="14" y="3" width="7" height="5"/>
            <rect x="14" y="12" width="7" height="9"/>
            <rect x="3" y="16" width="7" height="5"/>
          </svg>
        ),
      },
      {
        to: '/admin/products',
        label: 'Products',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
            <path d="m3.3 7 8.7 5 8.7-5"/>
            <path d="M12 22V12"/>
          </svg>
        ),
      },
      {
        to: '/admin/categories',
        label: 'Categories',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
        ),
      },
      {
        to: '/admin/enquiries',
        label: 'Enquiries',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"/>
            <path d="M5.5 5.1 2 12v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>
          </svg>
        ),
      },
    ],
  },
  {
    title: 'WEBSITE CONTENT',
    items: [
      {
        to: '/admin/about',
        label: 'About Us',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
            <line x1="9" y1="22" x2="9" y2="22.01"/>
            <line x1="15" y1="22" x2="15" y2="22.01"/>
            <line x1="9" y1="6" x2="9.01" y2="6"/>
            <line x1="15" y1="6" x2="15.01" y2="6"/>
            <line x1="9" y1="10" x2="9.01" y2="10"/>
            <line x1="15" y1="10" x2="15.01" y2="10"/>
            <line x1="9" y1="14" x2="9.01" y2="14"/>
            <line x1="15" y1="14" x2="15.01" y2="14"/>
          </svg>
        ),
      },
      {
        to: '/admin/why-us',
        label: 'Why Us',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ),
      },
      {
        to: '/admin/industries',
        label: 'Industries',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20"/>
            <path d="M6 20V10l10-5v15"/>
            <path d="M16 20V4l6 3v13"/>
          </svg>
        ),
      },
      {
        to: '/admin/gallery',
        label: 'Gallery',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        ),
      },
      {
        to: '/admin/faqs',
        label: 'FAQs',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        ),
      },
      {
        to: '/admin/contact',
        label: 'Contact',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        ),
      },
      {
        to: '/admin/seo',
        label: 'SEO Settings',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        ),
      },
    ],
  },
  {
    title: 'ADMINISTRATION',
    superAdminOnly: true,
    items: [
      {
        to: '/admin/users',
        label: 'Admin Users',
        lockBadge: true,
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
      },
      {
        to: '/admin/roles',
        label: 'Roles & Permissions',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
      },
      {
        to: '/admin/settings',
        label: 'Site Settings',
        lockBadge: true,
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        ),
      },
    ],
  },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Two-Tier Role state: can toggle simulation between Super Admin and Content Admin
  const [simulatedRole, setSimulatedRole] = useState(null);
  const activeRole = simulatedRole || admin?.role || 'Super Admin';
  const isSuperAdmin = activeRole === 'Super Admin';

  async function handleLogout() {
    await logout();
    navigate('/admin/login', { replace: true });
  }

  function toggleRoleSimulation() {
    setSimulatedRole(prev => (prev === 'Content Admin' ? 'Super Admin' : 'Content Admin'));
  }

  return (
    <div className="admin">
      <aside className="admin__side">
        <div className="admin__brand">
          <div className="admin__brand-logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="#8ed6b8" strokeWidth="2" fill="#0c5e42" />
              <path d="M8 12 Q12 7 16 12 Q12 17 8 12 Z" fill="#8ed6b8" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <strong>Vikash Traders</strong>
            <span className="admin__brand-sub">Management Portal</span>
          </div>
        </div>

        {/* Role Badge and Mode Switcher */}
        <div className="admin__role-pill-bar">
          <span className={`admin-role-badge ${isSuperAdmin ? 'admin-role-badge--super' : 'admin-role-badge--content'}`}>
            {isSuperAdmin ? 'SUPER ADMIN' : 'CONTENT ADMIN'}
          </span>
          <button 
            type="button" 
            onClick={toggleRoleSimulation} 
            className="admin-role-toggle-btn"
            title="Toggle between Super Admin and Content Admin modes to test authorization permissions"
          >
            {isSuperAdmin ? 'Switch to Content Admin' : 'Switch to Super Admin'}
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="admin__nav">
          {navGroups.map((group) => (
            <div key={group.title} className="admin__nav-group">
              <span className="admin__nav-heading">{group.title}</span>
              {group.items.map((l) => {
                const isLocked = !isSuperAdmin && l.lockBadge;
                return (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) => 
                      'admin__nav-item' + 
                      (isActive ? ' is-active' : '') + 
                      (isLocked ? ' is-locked' : '')
                    }
                  >
                    <span className="admin__nav-icon">{l.icon}</span>
                    <span className="admin__nav-text">{l.label}</span>
                    {isLocked && (
                      <span className="admin__nav-lock-badge" title="Super Admin privilege required">
                        🔒
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          <div className="admin__nav-group" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="admin__nav-heading">PUBLIC LINK</span>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="admin__nav-item admin__nav-item--external"
            >
              <span className="admin__nav-icon">🌐</span>
              <span>View Public Website &rarr;</span>
            </a>
          </div>
        </nav>

        <div className="admin__foot">
          <div className="admin__user-box">
            <span className="admin__user-avatar" aria-hidden="true">
              {isSuperAdmin ? 'SA' : 'CA'}
            </span>
            <div className="admin__user-info">
              <strong>{admin?.username || 'Administrator'}</strong>
              <span style={{ fontSize: '0.72rem', color: isSuperAdmin ? '#8ed6b8' : '#cbd5e1' }}>
                {activeRole}
              </span>
            </div>
          </div>
          <button className="btn btn--logout" type="button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="admin__main">
        {!isSuperAdmin && (
          <div className="admin-banner-notice">
            <span style={{ fontSize: '1.1rem' }}>ℹ️</span>
            <div>
              <strong>Active Role: Content Admin.</strong> You have full access to manage Products, Categories, Gallery, Content, FAQs, and Quotation Enquiries. User accounts and site settings are restricted to Super Admin.
            </div>
          </div>
        )}
        <Outlet context={{ isSuperAdmin, activeRole }} />
      </main>
    </div>
  );
}
