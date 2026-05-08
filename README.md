# 🍽 مطبخنا — Saudi Kitchen

> A modern React web application celebrating the rich flavors and traditions of Saudi Arabian cuisine.

---

## 📖 Project Description

**Saudi Kitchen** is a fully responsive, frontend-only React application showcasing authentic Saudi dishes: Kabsa, Jareesh, Mandi, Mutabbaq, Saleeg, and more. Browse recipes, search for meals, view cooking instructions, and save your favorites — all without any backend or database.

---

## 🚀 Live Demo

> Deploy to GitHub Pages: `https://YOUR_USERNAME.github.io/saudi-foods`

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, logout using LocalStorage only
- 🔒 **Protected Routes** — Favorites & Profile require login
- 🔍 **Recipe Search** — Powered by TheMealDB API
- 🍛 **Category Filters** — Browse by food category  
- 📋 **Recipe Details** — Ingredients, instructions, YouTube links
- ❤️ **Favorites System** — Per-user favorites saved in LocalStorage
- 👤 **Profile Page** — Username, email, favorites count
- 🌙 **Dark Mode** — Toggle light/dark theme
- 📱 **Fully Responsive** — Mobile-first design
- ♿ **Accessible** — Semantic HTML, alt texts, keyboard navigation

---

## 🛠 Tech Stack

- **React 18 + Vite** — Frontend framework & build tool
- **React Router DOM v6** — Client-side routing & protected routes
- **CSS3** — Custom responsive styles (no CSS framework)
- **LocalStorage** — Authentication & favorites persistence
- **TheMealDB API** — Free recipe data
- **GitHub Pages + gh-pages** — Deployment

---

## 📂 Folder Structure

```
src/
├── components/     # Navbar, Footer, FoodCard, SearchBar, Loader, FavoriteButton, ScrollToTop
├── pages/          # Home, Recipes, FoodDetails, Login, Register, Profile, Favorites, NotFound
├── routes/         # ProtectedRoute
├── styles/         # global.css design system
├── App.jsx         # Router, global state, auth logic
└── main.jsx        # Entry point
```

---

## 🏁 Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/saudi-foods.git
cd saudi-foods

# Install dependencies
npm install

# Run locally
npm run dev
# Open: http://localhost:5173/saudi-foods/
```

---

## 🚢 Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

The `predeploy` script builds automatically before deploying.

> Make sure `vite.config.js` `base` and `App.jsx` `basename` match your repo name.

---

## 🔐 Authentication (LocalStorage)

| Key | Content |
|---|---|
| `sk_users` | Array of registered users |
| `sk_session` | Current logged-in user |
| `sk_favs_<email>` | Per-user favorites |

### Demo Account
- Email: `demo@saudi.com`  
- Password: `demo123`

---

## 🌐 API Used

[TheMealDB Free API](https://www.themealdb.com/api.php)

- Search: `/search.php?s={name}`
- Lookup: `/lookup.php?i={id}`  
- Category: `/filter.php?c={category}`

---

## 🎨 Color Palette

Saudi-inspired warm tones:
- **Cream** `#F5EFE0` — Background
- **Gold** `#C9A84C` — Accents  
- **Deep Red** `#8B1A1A` — Primary
- **Brown** `#4A2D14` — Dark elements
- **Beige** `#E8D9BC` — Cards & borders

---

## 📄 License

MIT — Free to use and modify.

*Built with ❤️ and Saudi pride 🇸🇦*
