import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = 'Username is required.';
    else if (form.username.trim().length < 3) errs.username = 'Username must be at least 3 characters.';
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) errs.username = 'Only letters, numbers, and underscores.';

    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address.';

    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';

    if (!form.confirm) errs.confirm = 'Please confirm your password.';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.';

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
      if (users.find(u => u.email.toLowerCase() === form.email.toLowerCase())) {
        setGlobalError('An account with this email already exists.');
        setLoading(false);
        return;
      }

      const newUser = {
        username: form.username.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem('sk_users', JSON.stringify(users));

      const session = { username: newUser.username, email: newUser.email, createdAt: newUser.createdAt };
      localStorage.setItem('sk_session', JSON.stringify(session));
      onLogin(session);
      navigate('/');
    }, 600);
  };

  return (
    <main className="auth-page" aria-label="Register page">
      <div className="auth-decoration" aria-hidden="true" />

      <div className="auth-card fade-in">
        <div className="auth-brand">
          <span>🍽</span>
          <Link to="/">مطبخنا</Link>
        </div>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join us and start saving your favorite Saudi recipes</p>

        {globalError && (
          <div className="auth-alert" role="alert" aria-live="assertive">
            ⚠️ {globalError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group${errors.username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. chef_abdullah"
              autoComplete="username"
              aria-describedby={errors.username ? 'username-error' : undefined}
              aria-invalid={!!errors.username}
            />
            {errors.username && <span id="username-error" className="field-error" role="alert">{errors.username}</span>}
          </div>

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
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span id="password-error" className="field-error" role="alert">{errors.password}</span>}
          </div>

          <div className={`form-group${errors.confirm ? ' has-error' : ''}`}>
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              aria-describedby={errors.confirm ? 'confirm-error' : undefined}
              aria-invalid={!!errors.confirm}
            />
            {errors.confirm && <span id="confirm-error" className="field-error" role="alert">{errors.confirm}</span>}
          </div>

          <button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
            {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
