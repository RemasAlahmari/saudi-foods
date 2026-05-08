import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-mark">🍽</div>
          <h2 className="footer-title">مطبخنا</h2>
          <p className="footer-tagline">Celebrating the rich flavors of Saudi Arabia — one recipe at a time.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-col">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/recipes">All Recipes</Link>
          </div>
          <div className="footer-col">
            <h3>Account</h3>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
          <div className="footer-col">
            <h3>Popular</h3>
            <Link to="/recipes?search=kabsa">Kabsa</Link>
            <Link to="/recipes?search=mandi">Mandi</Link>
            <Link to="/recipes?search=jareesh">Jareesh</Link>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Saudi Kitchen — Built with React & love 🇸🇦</p>
        <p className="footer-api">Powered by <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB API</a></p>
      </div>
    </footer>
  );
}
