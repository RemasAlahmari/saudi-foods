import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder = 'Search Saudi dishes...', defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Search for recipes">
      <label htmlFor="search-input" className="sr-only">Search for Saudi recipes</label>
      <div className="search-inner">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="search-input"
          type="search"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => { setValue(''); onSearch(''); }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}
