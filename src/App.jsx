import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import FoodDetails from './pages/FoodDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import './styles/global.css';

// Seed demo account
function seedDemo() {
  const users = JSON.parse(localStorage.getItem('sk_users') || '[]');
  if (!users.find(u => u.email === 'demo@saudi.com')) {
    users.push({
      username: 'demo_chef',
      email: 'demo@saudi.com',
      password: 'demo123',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('sk_users', JSON.stringify(users));
  }
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sk_session')); } catch { return null; }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const session = JSON.parse(localStorage.getItem('sk_session'));
      if (!session) return [];
      const key = `sk_favs_${session.email}`;
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch { return []; }
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('sk_dark') === 'true');

  useEffect(() => { seedDemo(); }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('sk_dark', darkMode);
  }, [darkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
    const key = `sk_favs_${userData.email}`;
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    setFavorites(saved);
  };

  const handleLogout = () => {
    localStorage.removeItem('sk_session');
    setUser(null);
    setFavorites([]);
  };

  const handleToggleFavorite = (meal) => {
    if (!user) return;
    const key = `sk_favs_${user.email}`;
    const exists = favorites.some(f => f.idMeal === meal.idMeal);
    const updated = exists
      ? favorites.filter(f => f.idMeal !== meal.idMeal)
      : [...favorites, meal];
    setFavorites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const sharedProps = { user, favorites, onToggleFavorite: handleToggleFavorite };

  return (
    <BrowserRouter basename="/saudi-foods">
      <ScrollReset />
      <Navbar
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      />

      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/recipes" element={<Recipes {...sharedProps} />} />
        <Route path="/food/:id" element={<FoodDetails {...sharedProps} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute user={user}>
              <Favorites {...sharedProps} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile {...sharedProps} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
}
