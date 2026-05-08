import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import './Favorites.css';

export default function Favorites({ user, favorites, onToggleFavorite }) {
  return (
    <main className="favorites-page fade-in" aria-label="Favorites page">
      <div className="fav-header">
        <div className="container">
          <h1 className="page-title">My Favorites</h1>
          <p className="page-subtitle">
            {favorites.length === 0
              ? 'You haven\'t saved any recipes yet'
              : `${favorites.length} recipe${favorites.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
      </div>

      <div className="container fav-body">
        {favorites.length === 0 ? (
          <div className="fav-empty" role="status">
            <span className="empty-icon" aria-hidden="true">🍽</span>
            <h2>No favorites yet</h2>
            <p>Browse our recipes and tap the heart icon to save your favorites here.</p>
            <Link to="/recipes" className="fav-explore-btn">Explore Recipes</Link>
          </div>
        ) : (
          <div className="cards-grid">
            {favorites.map((meal, i) => (
              <FoodCard
                key={meal.idMeal}
                meal={meal}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                user={user}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
