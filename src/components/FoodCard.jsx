import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import './FoodCard.css';

export default function FoodCard({ meal, favorites, onToggleFavorite, user, style }) {
  const isFav = favorites?.some(f => f.idMeal === meal.idMeal);

  return (
    <article className="food-card fade-in" style={style} aria-label={meal.strMeal}>
      <Link to={`/food/${meal.idMeal}`} className="card-img-wrap">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="card-img"
        />
        <div className="card-overlay">
          <span>View Recipe →</span>
        </div>
        {meal.strArea && (
          <span className="card-badge">{meal.strArea}</span>
        )}
      </Link>

      <div className="card-body">
        <div className="card-meta">
          {meal.strCategory && <span className="card-category">{meal.strCategory}</span>}
          <FavoriteButton
            meal={meal}
            isFav={isFav}
            onToggle={onToggleFavorite}
            user={user}
          />
        </div>
        <h3 className="card-title">
          <Link to={`/food/${meal.idMeal}`}>{meal.strMeal}</Link>
        </h3>
      </div>
    </article>
  );
}
