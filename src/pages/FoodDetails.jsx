import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Loader from '../components/Loader';
import './FoodDetails.css';

export default function FoodDetails({ user, favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        if (data.meals) setMeal(data.meals[0]);
        else setError('Recipe not found.');
      } catch {
        setError('Failed to load recipe. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) return <div style={{ paddingTop: '80px' }}><Loader text="Loading recipe..." /></div>;
  if (error) return (
    <div className="details-error" role="alert">
      <p>⚠️ {error}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
  if (!meal) return null;

  // Parse ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing.trim(), measure: meas?.trim() || '' });
    }
  }

  const isFav = favorites?.some(f => f.idMeal === meal.idMeal);

  return (
    <main className="food-details fade-in" aria-label={`Recipe: ${meal.strMeal}`}>
      <div className="details-hero">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="details-img"
        />
        <div className="details-hero-overlay" aria-hidden="true" />
      </div>

      <div className="container details-content">
        <Link to="/recipes" className="back-link">← Back to Recipes</Link>

        <div className="details-top">
          <div className="details-meta">
            {meal.strCategory && <span className="meta-tag">{meal.strCategory}</span>}
            {meal.strArea && <span className="meta-tag meta-area">🌍 {meal.strArea}</span>}
          </div>

          <div className="details-title-row">
            <h1 className="details-title">{meal.strMeal}</h1>
            <FavoriteButton
              meal={meal}
              isFav={isFav}
              onToggle={onToggleFavorite}
              user={user}
            />
          </div>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="yt-link"
              aria-label={`Watch ${meal.strMeal} on YouTube`}
            >
              ▶ Watch on YouTube
            </a>
          )}
        </div>

        <div className="details-grid">
          <section className="details-ingredients" aria-label="Ingredients">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map(({ ingredient, measure }, i) => (
                <li key={i} className="ingredient-item">
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                    alt={ingredient}
                    className="ingredient-img"
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <div>
                    <span className="ingredient-name">{ingredient}</span>
                    {measure && <span className="ingredient-measure">{measure}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="details-instructions" aria-label="Cooking instructions">
            <h2>Instructions</h2>
            <div className="instructions-text">
              {meal.strInstructions
                ? meal.strInstructions.split('\n').filter(p => p.trim()).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                : <p>No instructions available.</p>
              }
            </div>

            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="source-link"
              >
                View original recipe →
              </a>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
