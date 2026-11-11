import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import '../styles/admin.css';

export default function Login() {
  const { admin, checking, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const target = location.state?.from || '/admin/dashboard';

  useEffect(() => {
    if (!checking && admin) {
      navigate(target, { replace: true });
    }
  }, [admin, checking, navigate, target]);

  async function handleSubmit(e) {
    e.preventDefault();

    setBusy(true);
    setError('');

    const result = await login(form.username, form.password);

    setBusy(false);

    if (result.ok) {
      navigate(target, { replace: true });
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Brand */}
        <div className="login-card__brand">
          <div className="login-card__emblem" aria-hidden="true">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#0c5e42"
                strokeWidth="2"
                fill="#e8f5e9"
              />
              <path
                d="M8 12 Q12 7 16 12 Q12 17 8 12 Z"
                fill="#0c5e42"
              />
              <circle
                cx="12"
                cy="12"
                r="2.5"
                fill="#fbc02d"
              />
            </svg>
          </div>

          <h1>Vikash Traders</h1>

          <p className="login-card__sub">
            Administrative Control Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="field">
            <label htmlFor="username">
              Admin Username
            </label>

            <input
              id="username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              autoComplete="username"
              required
              autoFocus
              placeholder="e.g. admin"
            />
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="password">
              Security Password
            </label>

            <div className="password-input-wrap">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password view"
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="formmsg formmsg--err"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={busy}
          >
            {busy
              ? 'Authenticating…'
              : 'Sign in to Admin Dashboard →'}
          </button>
        </form>

        {/* Footer */}
        <div className="login-card__foot">
          <span>
            Protected Area · Authenticated Sessions Only
          </span>

          <a
            href="/"
            className="login-card__backlink"
          >
            &larr; Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}