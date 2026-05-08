import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { SkeletonCard } from '../components/Loader';
import './Recipes.css';

export default function Recipes({ user, favorites, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || 'chicken';
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialSearch);

  const doSearch = async (q) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch {
      setError('Failed to load recipes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doSearch(query);
  }, []);

  const handleSearch = (q) => {
    const term = q || 'chicken';
    setQuery(term);
    setSearchParams({ search: term });
    doSearch(term);
  };

  return (
    <main className="recipes-page">
      <div className="recipes-header">
        <div className="container">
          <h1 className="page-title">All Recipes</h1>
          <p className="page-subtitle">Search through hundreds of authentic dishes</p>
          <SearchBar onSearch={handleSearch} defaultValue={query} />
        </div>
      </div>

      <div className="container recipes-body">
        {loading ? (
          <div className="cards-grid" aria-busy="true">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="error-state" role="alert">
            <p>⚠️ {error}</p>
            <button onClick={() => doSearch(query)}>Retry</button>
          </div>
        ) : meals.length === 0 ? (
          <div className="empty-state" role="status">
            <span>🔍</span>
            <p>No recipes found for "<strong>{query}</strong>"</p>
            <button onClick={() => handleSearch('chicken')}>Browse popular recipes</button>
          </div>
        ) : (
          <>
            <p className="results-count" aria-live="polite">{meals.length} recipe{meals.length !== 1 ? 's' : ''} found for "<strong>{query}</strong>"</p>
            <div className="cards-grid">
              {meals.map((meal, i) => (
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
          </>
        )}
      </div>
    </main>
  );
}
