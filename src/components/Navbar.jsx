import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ user, onLogout, darkMode, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Saudi Traditional Foods - Home">
          <span className="brand-icon">🍽</span>
          <div className="brand-text">
            <span className="brand-main">مطبخنا</span>
            <span className="brand-sub">Saudi Kitchen</span>
          </div>
        </Link>

        <nav className={`nav-links${menuOpen ? ' open' : ''}`} role="navigation" aria-label="Main navigation">
          <NavLink to="/" onClick={() => setMenuOpen(false)} end>Home</NavLink>
          <NavLink to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</NavLink>
          {user && <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>Favorites</NavLink>}
          {user && <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={onToggleDark}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-avatar" aria-label="Profile">
                {user.username.charAt(0).toUpperCase()}
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}

          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </header>
  );
}
