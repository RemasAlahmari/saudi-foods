import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found fade-in" aria-label="404 Page not found">
      <div className="not-found-content">
        <div className="nf-icon" aria-hidden="true">🍽</div>
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Recipe Not Found</h2>
        <p className="nf-desc">
          Looks like this dish isn't on our menu. The page you're looking for may have been moved or doesn't exist.
        </p>
        <div className="nf-actions">
          <Link to="/" className="nf-btn primary">Go Home</Link>
          <Link to="/recipes" className="nf-btn outline">Browse Recipes</Link>
        </div>
      </div>
    </main>
  );
}
