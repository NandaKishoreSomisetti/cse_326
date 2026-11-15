# AETHERIA — Curated Digital Art Marketplace & Gallery

A modern, responsive, and highly interactive frontend web application built strictly using **pure HTML5, CSS3, and Vanilla JavaScript**. Designed with the aesthetic of high-end digital galleries and creative platforms (inspired by Foundation, Behance, and Apple Store)—featuring a sleek dark-first gallery mode, light mode toggle, glassmorphism, crisp typography, and vibrant violet/cyan accents.

---

## 🌟 Key Features & Implemented Workflows

### 1. Navigation Bar & Hero Showcase
- **Sticky Glassmorphic Navbar**: Frosted glass backdrop blur (`backdrop-filter: blur(20px)`), responsive brand logo, and real-time search with keyboard shortcut (`⌘K` / `Ctrl+K`).
- **Featured "Spotlight Drop" Hero**:
  - Live countdown timer actively ticking down to drop closing (`HHh : MMm : SSs`).
  - Interactive headline artwork (*"Chronicles of the Astral Citadel"* by Elena Rostova).
  - High-resolution preview with zoom overlay, edition details, technical specs, and instant **"Add to Cart"** and **"Inspect"** actions.
- **Theme Switcher**: Instant toggle between **Dark Gallery Mode** and **Light Mode** with smooth transition and icon animation.

### 2. Digital Art Catalogue (Filter, Search & Sort)
- **14+ Curated Digital Artworks**: Realistic masterworks across **3D Renders**, **Abstract & Generative**, **Cyberpunk & Sci-Fi**, **Illustrations**, and **Photography**.
- **Category Filter Pills**: Interactive pills displaying real-time artwork count per category.
- **Bi-directional Live Search**: Instant filtering across titles, artist names, artist handles, categories, software tools, and tags.
- **Price Range Slider**: Interactive range slider ($150 - $600+) with live value display.
- **Sorting Options**: Sort by *Featured Curations*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated (★)*.
- **Gallery Cards**: High-res preview with smooth hover zoom, hover quick-action floating bar (Quick Inspect, Like/Heart, Add to Bag), artist avatar, star ratings, and dual pricing in USD ($) and ETH (≈ ETH).

### 3. Artwork Detail View & Collector Reviews
- **Detailed Modal Inspection**: Full-size artwork preview, artist bio and verified badge, and technical specifications grid (*Resolution, File Formats, File Size, Software Engine, Created Date*).
- **License Terms Selector**: Switch between **Personal Exhibition License** (1.0x) and **Extended Commercial License** (2.2x price multiplier) with instant pricing calculation.
- **Interactive Review & Rating Form**:
  - Interactive 1–5 star rating picker with rating feedback descriptions.
  - Client-side validated comments (prevents empty submissions).
  - Real-time submission: newly added reviews appear immediately with a `Verified Collector` badge, update the artwork's overall star score, and persist in `localStorage`.

### 4. Slide-Over Shopping Cart & Multi-Step Checkout
- **Slide-Over Drawer**: Smooth right-to-left slide animation with backdrop blur overlay.
- **In-Bag License Adjustment**: Change license type per item directly inside the cart with dynamic price updates.
- **Dynamic Fee & Promo Engine**: Calculates 2.5% platform/provenance fee and supports promo code **`NEO2026`** (or `AETHERIA`) for a **10% collector discount**.
- **Multi-Step Checkout Workflow**:
  - **Step 1 (Billing Details)**: Collector legal name, delivery email, and country validation.
  - **Step 2 (Simulated Payment Rails)**: Select between **Credit/Debit Card**, **Instant UPI Pay (QR)**, and **Web3 Crypto Wallet (MetaMask)**.
  - **Step 3 (Digital Asset Vault & Confetti)**: Full confetti celebration burst, unique Order Receipt ID (`#AETH-XXXX`), downloadable asset vault buttons, and printable official receipt.

### 5. Admin Studio (Full CRUD Control)
- **Dedicated Curator Panel**: Accessible via the navbar or profile menu.
- **KPI Metrics Cards**: Platform Revenue, Active Artworks, Total Orders Fulfilled, and Collector Satisfaction Score.
- **Create**: Add new artworks with title, artist name, category, price, image URL (with live preview), specs, description, and "Spotlight Drop" toggle.
- **Read & Update**: Edit existing artwork prices, titles, categories, and resolution directly via modal.
- **Delete**: Remove artworks from the live catalogue with confirmation safeguard.
- **Spotlight Toggle**: In-line toggle to designate which artwork is featured in the Hero banner.
- **Restore Master Collection**: One-click reset button to restore the original 14 curated masterworks anytime.

### 6. User Authentication & Demo Account Switcher
- **1-Click Demo Profiles**: Instant toggle between **Collector / Buyer Demo** (`alex@collector.io`) and **Curator / Admin Demo** (`curator@aetheria.art`) for seamless presentations.
- **Validation Engine**: Regex email verification, live password strength meter (*Weak, Medium, Strong*), and matching confirm-password validation.

---

## 💻 Tech Stack & Structure

Strictly built using **HTML5, CSS3, and JavaScript (ES6+)**:

```
cse_326/
├── index.html          # Semantic HTML5 single-page application & modals
├── css/
│   └── style.css       # Complete dark-first design system, glassmorphism & responsive CSS
├── js/
│   ├── data.js         # Curated catalog dataset of 14 artworks & demo accounts
│   └── app.js          # Complete state management, localStorage CRUD, cart & checkout logic
└── README.md           # Documentation & feature overview
```

---

## 🚀 How to Run the Application

You can open the project in any web browser without needing to install or build anything:

### Option 1: Direct File Open
Simply double-click `index.html` or open it with your browser:
```bash
open index.html
```

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python3 -m http.server 3000
```
Or using Node.js:
```bash
npx serve .
```
Then visit: `http://localhost:3000`

---

## 🔑 Demo Shortcuts for Presentation
- **Search shortcut**: Press `⌘K` (Mac) or `Ctrl+K` (Windows) to instantly focus the search bar.
- **Promo code**: Enter `NEO2026` in the cart drawer to apply a 10% discount.
- **1-Click Admin Mode**: Click the user profile icon at the top right and select **Curator / Admin View** (or click **Admin Studio** in the navigation bar).
- **Restore Data**: If you delete or edit artworks during a live demo, click **Restore Master Collection** in the Admin Studio to instantly reset to default.
