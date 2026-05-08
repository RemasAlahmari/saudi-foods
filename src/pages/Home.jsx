import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { SkeletonCard } from '../components/Loader';
import './Home.css';

const SAUDI_DISHES = ['Kabsa', 'Mandi', 'Jareesh', 'Mutabbaq', 'Saleeg', 'Harees', 'Madfoon', 'Margoog'];
const CATEGORIES = ['Chicken', 'Lamb', 'Beef', 'Seafood', 'Dessert', 'Vegetarian'];

async function fetchMeal(name) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

async function fetchByCategory(cat) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
  const data = await res.json();
  return data.meals ? data.meals.slice(0, 4) : [];
}

export default function Home({ user, favorites, onToggleFavorite }) {
  const [featured, setFeatured] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      setError(null);
      try {
        const promises = SAUDI_DISHES.map(name => fetchMeal(name));
        const results = await Promise.all(promises);
        setFeatured(results.filter(Boolean));
      } catch {
        setError('Failed to load recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const handleSearch = async (query) => {
    if (!query) { setSearchResults(null); setSearchQuery(''); return; }
    setSearchQuery(query);
    setSearching(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setSearchResults(data.meals || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleCategory = async (cat) => {
    if (activeCategory === cat) { setActiveCategory(''); setSearchResults(null); return; }
    setActiveCategory(cat);
    setCatLoading(true);
    setSearchResults(null);
    try {
      const meals = await fetchByCategory(cat);
      setSearchResults(meals);
    } catch {
      setSearchResults([]);
    } finally {
      setCatLoading(false);
    }
  };

  const displayMeals = searchResults !== null ? searchResults : featured;

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero" aria-label="Welcome hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-pattern" />
          <div className="hero-glow" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge">🇸🇦 Authentic Saudi Cuisine</div>
          <h1 className="hero-title">
            Discover the<br />
            <em>Heart of Saudi</em><br />
            <span>Kitchen</span>
          </h1>
          <p className="hero-desc">
            Explore centuries-old recipes, rich spices, and the warm traditions of Saudi Arabian cuisine — from Kabsa to Mandi and beyond.
          </p>
          <div className="hero-search">
            <SearchBar onSearch={handleSearch} placeholder="Search Kabsa, Mandi, Jareesh..." />
          </div>
          <div className="hero-stats" aria-label="Site statistics">
            <div className="stat"><strong>200+</strong><span>Recipes</span></div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat"><strong>15+</strong><span>Categories</span></div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat"><strong>Free</strong><span>Always</span></div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>↓</span>
        </div>
      </section>

      {/* Saudi dishes quick links */}
      <section className="quick-dishes container" aria-label="Saudi traditional dishes">
        <h2 className="section-eyebrow">Traditional Saudi Dishes</h2>
        <div className="dish-pills">
          {SAUDI_DISHES.map(dish => (
            <button
              key={dish}
              className="dish-pill"
              onClick={() => handleSearch(dish)}
              aria-label={`Search for ${dish}`}
            >
              {dish}
            </button>
          ))}
        </div>
      </section>

      {/* Category filter */}
      <section className="categories-section container" aria-label="Filter by category">
        <div className="cat-filter" role="group" aria-label="Food categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => handleCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results / Featured */}
      <section className="meals-section container" aria-label={searchResults !== null ? 'Search results' : 'Featured recipes'}>
        <div className="section-header">
          <div>
            {searchResults !== null ? (
              <>
                <h2 className="section-title">
                  {searchResults.length === 0 ? 'No results found' : `Results for "${searchQuery || activeCategory}"`}
                </h2>
                <button
                  className="clear-results"
                  onClick={() => { setSearchResults(null); setSearchQuery(''); setActiveCategory(''); }}
                >
                  ← Back to featured
                </button>
              </>
            ) : (
              <h2 className="section-title">Featured Saudi Recipes</h2>
            )}
          </div>
        </div>

        {(loading || searching || catLoading) ? (
          <div className="cards-grid" aria-busy="true" aria-label="Loading recipes">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="error-state" role="alert">
            <p>⚠️ {error}</p>
            <button className="btn-retry" onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : displayMeals.length === 0 ? (
          <div className="empty-state" role="status">
            <span className="empty-icon">🍽</span>
            <p>No dishes found. Try another search!</p>
          </div>
        ) : (
          <div className="cards-grid">
            {displayMeals.map((meal, i) => (
              <FoodCard
                key={meal.idMeal}
                meal={meal}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
                user={user}
                style={{ animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA banner */}
      {!user && (
        <section className="cta-section container" aria-label="Join us banner">
          <div className="cta-card">
            <div className="cta-text">
              <h2>Save Your Favorite Recipes</h2>
              <p>Create a free account to bookmark dishes and build your personal cookbook.</p>
            </div>
            <div className="cta-actions">
              <Link to="/register" className="cta-btn primary">Get Started</Link>
              <Link to="/login" className="cta-btn outline">Login</Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
