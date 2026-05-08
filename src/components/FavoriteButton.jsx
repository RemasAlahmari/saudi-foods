import { Link } from 'react-router-dom';
import './FavoriteButton.css';

export default function FavoriteButton({ meal, isFav, onToggle, user }) {
  if (!user) {
    return (
      <Link to="/login" className="fav-btn" title="Login to save favorites" aria-label="Login to save favorites">
        ♡
      </Link>
    );
  }

  return (
    <button
      className={`fav-btn${isFav ? ' active' : ''}`}
      onClick={(e) => { e.preventDefault(); onToggle(meal); }}
      aria-label={isFav ? `Remove ${meal.strMeal} from favorites` : `Add ${meal.strMeal} to favorites`}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFav ? '♥' : '♡'}
    </button>
  );
}
