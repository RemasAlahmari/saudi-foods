import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile({ user, favorites, onLogout }) {
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <main className="profile-page fade-in" aria-label="User profile">
      <div className="profile-banner" aria-hidden="true">
        <div className="banner-pattern" />
      </div>

      <div className="container profile-content">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar" aria-label={`Avatar for ${user?.username}`}>
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-info">
            <h1 className="profile-name">{user?.username}</h1>
            <p className="profile-email">📧 {user?.email}</p>
            <p className="profile-since">Member since {memberSince}</p>
          </div>

          <div className="profile-stats" role="list" aria-label="Profile statistics">
            <div className="stat-card" role="listitem">
              <strong>{favorites?.length || 0}</strong>
              <span>Saved Recipes</span>
            </div>
            <div className="stat-card" role="listitem">
              <strong>🇸🇦</strong>
              <span>Saudi Kitchen</span>
            </div>
            <div className="stat-card" role="listitem">
              <strong>Active</strong>
              <span>Status</span>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/favorites" className="profile-btn primary">
              ♥ My Favorites ({favorites?.length || 0})
            </Link>
            <Link to="/recipes" className="profile-btn outline">
              Explore Recipes
            </Link>
            <button className="profile-btn danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {favorites?.length > 0 && (
          <section className="profile-favs" aria-label="Recent favorites">
            <h2>Recent Favorites</h2>
            <div className="profile-favs-grid">
              {favorites.slice(0, 4).map(meal => (
                <Link key={meal.idMeal} to={`/food/${meal.idMeal}`} className="mini-card" aria-label={meal.strMeal}>
                  <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
                  <span>{meal.strMeal}</span>
                </Link>
              ))}
            </div>
            {favorites.length > 4 && (
              <Link to="/favorites" className="see-all-link">View all {favorites.length} favorites →</Link>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
