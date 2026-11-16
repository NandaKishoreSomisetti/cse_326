# ArtMart — Digital Art Marketplace

A simple, clean digital art marketplace built with **plain HTML, CSS and JavaScript** (no frameworks).
Theme: light black background with dark yellow accents (optional light mode).

## 🌐 Live Link
👉 **https://massive-housewares-wiki-warcraft.trycloudflare.com**

## Features
- **Login page first** — Login / Register with validation (email format, strong password, matching confirm password) and one-click **Collector demo** / **Admin demo** buttons.
- **Language switch** — English, हिन्दी (Hindi), తెలుగు (Telugu).
- **Spotlight Drop** banner with Add to Cart and Quick Preview.
- **Catalogue** — 14 artworks, category pills, live search (title or artist), max-price slider, sort (Featured, Price Low→High, High→Low, Highest Rated).
- **Artwork details** — large preview, artist bio, specs (resolution, file size, format, license) and **reviews** (1–5 stars + comment; empty reviews blocked).
- **Cart drawer** — Personal (1x) / Commercial (2x) license, subtotal, 5% platform fee, remove items.
- **Checkout** — 3 steps: billing details (validated) → payment (Card / UPI / Crypto Wallet, validated) → order receipt with download & print.
- **Admin dashboard** — Revenue, Active Artworks, Total Orders; add, edit, delete (with confirmation) artworks, toggle featured, reset data.
- Everything (users, cart, orders, reviews, admin changes, theme, language) is saved in **localStorage**.

## Files
```
index.html      page structure
css/style.css   styles (theme colors at the top)
js/data.js      artwork data and demo users
js/i18n.js      translations (English, Hindi, Telugu)
js/app.js       all app logic
```

## Run locally
```bash
python3 -m http.server 3000
```
Then open http://localhost:3000
