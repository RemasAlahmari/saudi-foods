import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setGlobalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('sk_users') || '[]');
      const user = users.find(u => u.email.toLowerCase() === form.email.toLowerCase());
      if (!user) { setGlobalError('No account found with this email.'); setLoading(false); return; }
      if (user.password !== form.password) { setGlobalError('Incorrect password. Please try again.'); setLoading(false); return; }

      const session = { username: user.username, email: user.email, createdAt: user.createdAt };
      localStorage.setItem('sk_session', JSON.stringify(session));
      onLogin(session);
      navigate(from, { replace: true });
    }, 600);
  };

  return (
    <main className="auth-page" aria-label="Login page">
      <div className="auth-decoration" aria-hidden="true" />

      <div className="auth-card fade-in">
        <div className="auth-brand">
          <span>🍽</span>
          <Link to="/">مطبخنا</Link>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to access your saved recipes</p>

        {globalError && (
          <div className="auth-alert" role="alert" aria-live="assertive">
            ⚠️ {globalError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group${errors.email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span id="email-error" className="field-error" role="alert">{errors.email}</span>}
          </div>

          <div className={`form-group${errors.password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span id="password-error" className="field-error" role="alert">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        <div className="auth-demo">
          <p>Demo account:</p>
          <code>demo@saudi.com / demo123</code>
        </div>
      </div>
    </main>
  );
}
