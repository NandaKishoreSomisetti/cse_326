/**
 * AETHERIA — Classic Curated Digital Art Marketplace
 * Simple, Clean Vanilla JavaScript Controller
 * Handles State, LocalStorage Persistence, Classic Views, Cart, Checkout, Reviews & Admin CRUD
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. State Management & LocalStorage
  // =========================================================================

  const State = {
    theme: localStorage.getItem('aetheria_theme') || 'light', // Default classic light mode
    user: null,
    artworks: [],
    cart: [],
    likes: [],
    orders: [],
    activeView: 'gallery', // 'gallery' | 'admin' | 'orders' | 'auth'
    selectedCategory: 'All',
    searchQuery: '',
    priceRange: 600,
    sortBy: 'featured',
    promoApplied: false,
    selectedArtworkId: null,
    selectedLicense: 'personal',
    activeCheckoutStep: 1,
    selectedPaymentMethod: 'card'
  };

  function initStorage() {
    // 1. User
    const savedUser = localStorage.getItem('aetheria_user');
    if (savedUser) {
      try {
        State.user = JSON.parse(savedUser);
      } catch (e) {
        State.user = DEMO_USERS.collector;
      }
    } else {
      State.user = DEMO_USERS.collector; // Default logged in as Collector for demo
      localStorage.setItem('aetheria_user', JSON.stringify(State.user));
    }

    // 2. Artworks
    const savedArtworks = localStorage.getItem('aetheria_artworks');
    if (savedArtworks) {
      try {
        State.artworks = JSON.parse(savedArtworks);
      } catch (e) {
        State.artworks = [...initialArtworks];
      }
    } else {
      State.artworks = [...initialArtworks];
      localStorage.setItem('aetheria_artworks', JSON.stringify(State.artworks));
    }

    // 3. Cart
    const savedCart = localStorage.getItem('aetheria_cart');
    if (savedCart) {
      try {
        State.cart = JSON.parse(savedCart);
      } catch (e) {
        State.cart = [];
      }
    }

    // 4. Likes
    const savedLikes = localStorage.getItem('aetheria_likes');
    if (savedLikes) {
      try {
        State.likes = JSON.parse(savedLikes);
      } catch (e) {
        State.likes = ['art-1', 'art-3'];
      }
    } else {
      State.likes = ['art-1', 'art-3'];
      localStorage.setItem('aetheria_likes', JSON.stringify(State.likes));
    }

    // 5. Orders
    const savedOrders = localStorage.getItem('aetheria_orders');
    if (savedOrders) {
      try {
        State.orders = JSON.parse(savedOrders);
      } catch (e) {
        State.orders = [];
      }
    } else {
      State.orders = [
        {
          orderId: "AETH-8921-X",
          date: "Nov 14, 2026, 02:45 PM",
          collectorName: "Alex Vance",
          total: 266,
          items: [
            {
              title: "Hyperion Nebula: Synthetic Bloom",
              artist: "Darius Vance",
              price: 260,
              license: "Personal License",
              format: "GLSL Source + 6K TIFF",
              image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80"
            }
          ]
        }
      ];
      localStorage.setItem('aetheria_orders', JSON.stringify(State.orders));
    }
  }

  function saveArtworks() {
    localStorage.setItem('aetheria_artworks', JSON.stringify(State.artworks));
  }

  function saveCart() {
    localStorage.setItem('aetheria_cart', JSON.stringify(State.cart));
  }

  function saveLikes() {
    localStorage.setItem('aetheria_likes', JSON.stringify(State.likes));
  }

  function saveOrders() {
    localStorage.setItem('aetheria_orders', JSON.stringify(State.orders));
  }

  function saveUser() {
    localStorage.setItem('aetheria_user', JSON.stringify(State.user));
  }

  // =========================================================================
  // 2. DOM Elements Cache
  // =========================================================================

  const DOM = {
    // Navbar
    navBrandBtn: document.getElementById('nav-brand-btn'),
    tabGalleryBtn: document.getElementById('tab-gallery-btn'),
    tabHeroBtn: document.getElementById('tab-hero-btn'),
    tabAdminBtn: document.getElementById('tab-admin-btn'),
    tabOrdersBtn: document.getElementById('tab-orders-btn'),
    tabAuthBtn: document.getElementById('tab-auth-btn'),
    themeBtn: document.getElementById('theme-btn'),
    themeIcon: document.getElementById('theme-icon'),
    cartOpenBtn: document.getElementById('cart-open-btn'),
    cartCountBadge: document.getElementById('cart-count-badge'),
    userStatusChip: document.getElementById('user-status-chip'),
    userDisplayName: document.getElementById('user-display-name'),

    // Views
    viewGallery: document.getElementById('view-gallery'),
    viewAuth: document.getElementById('view-auth'),
    viewAdmin: document.getElementById('view-admin'),
    viewOrders: document.getElementById('view-orders'),

    // Hero Showcase
    heroTimer: document.getElementById('hero-timer'),
    heroTitle: document.getElementById('hero-title'),
    heroDesc: document.getElementById('hero-desc'),
    heroArtistAvatar: document.getElementById('hero-artist-avatar'),
    heroArtistName: document.getElementById('hero-artist-name'),
    heroArtistHandle: document.getElementById('hero-artist-handle'),
    heroCategoryLabel: document.getElementById('hero-category-label'),
    heroEditionBadge: document.getElementById('hero-edition-badge'),
    heroRes: document.getElementById('hero-res'),
    heroFmt: document.getElementById('hero-fmt'),
    heroSoft: document.getElementById('hero-soft'),
    heroPriceVal: document.getElementById('hero-price-val'),
    heroEthVal: document.getElementById('hero-eth-val'),
    heroAddBagBtn: document.getElementById('hero-add-bag-btn'),
    heroInspectModalBtn: document.getElementById('hero-inspect-modal-btn'),
    heroMediaPreview: document.getElementById('hero-media-preview'),
    heroImage: document.getElementById('hero-image'),

    // Catalogue
    categoryPills: document.getElementById('category-pills'),
    catalogueSearchBox: document.getElementById('catalogue-search-box'),
    priceFilterSlider: document.getElementById('price-filter-slider'),
    priceSliderDisplay: document.getElementById('price-slider-display'),
    catalogueSortSelect: document.getElementById('catalogue-sort-select'),
    catalogueResetFiltersBtn: document.getElementById('catalogue-reset-filters-btn'),
    artworksCatalogueGrid: document.getElementById('artworks-catalogue-grid'),
    artworksCountNum: document.getElementById('artworks-count-num'),
    emptyCatalogueMessage: document.getElementById('empty-catalogue-message'),
    emptyStateResetBtn: document.getElementById('empty-state-reset-btn'),

    // Auth View
    tabLogin: document.getElementById('tab-login'),
    tabRegister: document.getElementById('tab-register'),
    loginForm: document.getElementById('login-form'),
    loginEmail: document.getElementById('login-email'),
    loginPassword: document.getElementById('login-password'),
    errLoginEmail: document.getElementById('err-login-email'),
    registerForm: document.getElementById('register-form'),
    regName: document.getElementById('reg-name'),
    regEmail: document.getElementById('reg-email'),
    regRole: document.getElementById('reg-role'),
    regPassword: document.getElementById('reg-password'),
    regConfirmPassword: document.getElementById('reg-confirm-password'),
    passwordStrengthLabel: document.getElementById('password-strength-label'),
    errRegName: document.getElementById('err-reg-name'),
    errRegEmail: document.getElementById('err-reg-email'),
    errRegPassword: document.getElementById('err-reg-password'),
    errRegConfirm: document.getElementById('err-reg-confirm'),
    demoCollectorBtn: document.getElementById('demo-collector-btn'),
    demoAdminBtn: document.getElementById('demo-admin-btn'),

    // Admin View
    statRevVal: document.getElementById('stat-rev-val'),
    statArtCount: document.getElementById('stat-art-count'),
    statOrderCount: document.getElementById('stat-order-count'),
    statRatingVal: document.getElementById('stat-rating-val'),
    adminRestoreBtn: document.getElementById('admin-restore-btn'),
    adminCreateArtBtn: document.getElementById('admin-create-art-btn'),
    adminArtworksTbody: document.getElementById('admin-artworks-tbody'),

    // Orders View
    ordersHistoryList: document.getElementById('orders-history-list'),

    // Cart Drawer
    cartDrawerBackdrop: document.getElementById('cart-drawer-backdrop'),
    cartDrawerCount: document.getElementById('cart-drawer-count'),
    cartCloseBtn: document.getElementById('cart-close-btn'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartEmptyMsg: document.getElementById('cart-empty-msg'),
    cartExploreBtn: document.getElementById('cart-explore-btn'),
    cartSummaryFooter: document.getElementById('cart-summary-footer'),
    cartPromoInput: document.getElementById('cart-promo-input'),
    cartApplyPromoBtn: document.getElementById('cart-apply-promo-btn'),
    cartPromoFeedback: document.getElementById('cart-promo-feedback'),
    cartSubtotalText: document.getElementById('cart-subtotal-text'),
    cartDiscountLine: document.getElementById('cart-discount-line'),
    cartDiscountText: document.getElementById('cart-discount-text'),
    cartFeeText: document.getElementById('cart-fee-text'),
    cartTotalText: document.getElementById('cart-total-text'),
    cartCheckoutProceedBtn: document.getElementById('cart-checkout-proceed-btn'),

    // Detail Modal
    detailModal: document.getElementById('detail-modal'),
    detailModalCloseBtn: document.getElementById('detail-modal-close-btn'),
    detailImg: document.getElementById('detail-img'),
    detailEditionTag: document.getElementById('detail-edition-tag'),
    detailTitle: document.getElementById('detail-title'),
    detailArtistAvatar: document.getElementById('detail-artist-avatar'),
    detailArtistName: document.getElementById('detail-artist-name'),
    detailArtistHandle: document.getElementById('detail-artist-handle'),
    detailDesc: document.getElementById('detail-desc'),
    detailRes: document.getElementById('detail-res'),
    detailFmt: document.getElementById('detail-fmt'),
    detailSize: document.getElementById('detail-size'),
    detailSoft: document.getElementById('detail-soft'),
    licPersonal: document.getElementById('lic-personal'),
    licCommercial: document.getElementById('lic-commercial'),
    detailPriceText: document.getElementById('detail-price-text'),
    detailAddBagBtn: document.getElementById('detail-add-bag-btn'),
    detailRatingSummary: document.getElementById('detail-rating-summary'),
    starPicker: document.getElementById('star-picker'),
    starScoreText: document.getElementById('star-score-text'),
    reviewTextInput: document.getElementById('review-text-input'),
    errReview: document.getElementById('err-review'),
    reviewSubmitBtn: document.getElementById('review-submit-btn'),
    detailReviewsList: document.getElementById('detail-reviews-list'),

    // Checkout Modal
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutCloseBtn: document.getElementById('checkout-close-btn'),
    checkoutStep1: document.getElementById('checkout-step-1'),
    checkoutBillingForm: document.getElementById('checkout-billing-form'),
    chName: document.getElementById('ch-name'),
    chEmail: document.getElementById('ch-email'),
    chCountry: document.getElementById('ch-country'),
    chTotalPreview: document.getElementById('ch-total-preview'),
    checkoutStep2: document.getElementById('checkout-step-2'),
    checkoutPaymentForm: document.getElementById('checkout-payment-form'),
    payCardSection: document.getElementById('pay-card-section'),
    payUpiSection: document.getElementById('pay-upi-section'),
    payCryptoSection: document.getElementById('pay-crypto-section'),
    payBackBtn: document.getElementById('pay-back-btn'),
    checkoutStep3: document.getElementById('checkout-step-3'),
    receiptIdText: document.getElementById('receipt-id-text'),
    receiptItemsList: document.getElementById('receipt-items-list'),
    receiptDoneBtn: document.getElementById('receipt-done-btn'),

    // Admin Add/Edit Modal
    adminModal: document.getElementById('admin-modal'),
    adminModalCloseBtn: document.getElementById('admin-modal-close-btn'),
    adminModalHeading: document.getElementById('admin-modal-heading'),
    adminArtForm: document.getElementById('admin-art-form'),
    adminArtId: document.getElementById('admin-art-id'),
    admTitle: document.getElementById('adm-title'),
    admArtist: document.getElementById('adm-artist'),
    admHandle: document.getElementById('adm-handle'),
    admCategory: document.getElementById('adm-category'),
    admPrice: document.getElementById('adm-price'),
    admImg: document.getElementById('adm-img'),
    admDesc: document.getElementById('adm-desc'),
    admFeatured: document.getElementById('adm-featured'),
    adminModalCancel: document.getElementById('admin-modal-cancel'),
    adminModalSaveBtn: document.getElementById('admin-modal-save-btn'),

    // Toast Wrap
    toastWrap: document.getElementById('toast-wrap')
  };

  // =========================================================================
  // 3. Simple Toast Notifications
  // =========================================================================

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '✦'}</span> <span>${message}</span>`;
    DOM.toastWrap.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // =========================================================================
  // 4. Classic Theme Toggle (Light / Dark)
  // =========================================================================

  function applyTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aetheria_theme', theme);
    DOM.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const next = State.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Classic Dark' : 'Classic Light'} mode`);
  }

  // =========================================================================
  // 5. Classic View Switching
  // =========================================================================

  function switchView(viewName) {
    State.activeView = viewName;

    // Reset active nav buttons
    DOM.tabGalleryBtn.classList.remove('active');
    DOM.tabHeroBtn.classList.remove('active');
    DOM.tabAdminBtn.classList.remove('active');
    DOM.tabOrdersBtn.classList.remove('active');
    DOM.tabAuthBtn.classList.remove('active');

    // Hide all view containers
    DOM.viewGallery.style.display = 'none';
    DOM.viewAuth.style.display = 'none';
    DOM.viewAdmin.style.display = 'none';
    DOM.viewOrders.style.display = 'none';

    if (viewName === 'gallery') {
      DOM.tabGalleryBtn.classList.add('active');
      DOM.viewGallery.style.display = 'block';
      renderGallery();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'hero') {
      DOM.tabHeroBtn.classList.add('active');
      DOM.viewGallery.style.display = 'block';
      renderHero();
      document.getElementById('spotlight-hero-anchor').scrollIntoView({ behavior: 'smooth' });
    } else if (viewName === 'admin') {
      DOM.tabAdminBtn.classList.add('active');
      DOM.viewAdmin.style.display = 'block';
      renderAdminView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'orders') {
      DOM.tabOrdersBtn.classList.add('active');
      DOM.viewOrders.style.display = 'block';
      renderOrdersView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'auth') {
      DOM.tabAuthBtn.classList.add('active');
      DOM.viewAuth.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // =========================================================================
  // 6. User Profile & Demo Switchers
  // =========================================================================

  function renderUserUI() {
    if (!State.user) {
      DOM.userDisplayName.textContent = "Sign In";
      return;
    }
    DOM.userDisplayName.textContent = `${State.user.name} (${State.user.role === 'admin' ? 'Admin' : 'Collector'})`;
  }

  function setDemoUser(role) {
    if (role === 'admin') {
      State.user = { ...DEMO_USERS.admin };
      saveUser();
      renderUserUI();
      switchView('admin');
      showToast("Signed in as Gallery Curator / Admin", 'success');
    } else {
      State.user = { ...DEMO_USERS.collector };
      saveUser();
      renderUserUI();
      switchView('gallery');
      showToast("Signed in as Demo Collector / Buyer", 'success');
    }
  }

  // =========================================================================
  // 7. Hero Showcase (Spotlight Drop)
  // =========================================================================

  function renderHero() {
    const art = State.artworks.find(a => a.featured) || State.artworks[0];
    if (!art) return;

    DOM.heroTitle.textContent = art.title;
    DOM.heroDesc.textContent = art.description;
    DOM.heroArtistAvatar.src = art.artist.avatar;
    DOM.heroArtistName.textContent = art.artist.name;
    DOM.heroArtistHandle.textContent = art.artist.handle;
    DOM.heroCategoryLabel.textContent = art.category;
    DOM.heroEditionBadge.textContent = art.edition;
    DOM.heroRes.textContent = art.resolution;
    DOM.heroFmt.textContent = art.format.split('+')[0].trim();
    DOM.heroSoft.textContent = art.software.split('/')[0].trim();
    DOM.heroPriceVal.textContent = `$${art.price}`;
    DOM.heroEthVal.textContent = `≈ ${art.ethPrice} ETH`;
    DOM.heroImage.src = art.image;

    DOM.heroAddBagBtn.onclick = () => {
      addToCart(art.id, 'personal');
    };

    DOM.heroInspectModalBtn.onclick = () => {
      openDetailModal(art.id);
    };

    DOM.heroMediaPreview.onclick = () => {
      openDetailModal(art.id);
    };
  }

  let timerInterval = null;
  function startHeroTimer() {
    let sec = 14 * 3600 + 28 * 60 + 45;
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      if (sec > 0) {
        sec--;
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;
        DOM.heroTimer.textContent = `${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
      } else {
        DOM.heroTimer.textContent = "00h : 00m : 00s";
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  // =========================================================================
  // 8. Catalogue Filtering, Search & Sorting
  // =========================================================================

  function renderCategoryPills() {
    DOM.categoryPills.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cat-btn ${State.selectedCategory === cat ? 'active' : ''}`;
      
      const count = cat === 'All' 
        ? State.artworks.length 
        : State.artworks.filter(a => a.category === cat).length;

      btn.textContent = `${cat} (${count})`;

      btn.addEventListener('click', () => {
        State.selectedCategory = cat;
        renderCategoryPills();
        renderGallery();
      });

      DOM.categoryPills.appendChild(btn);
    });
  }

  function getFilteredArtworks() {
    return State.artworks.filter(art => {
      if (State.selectedCategory !== 'All' && art.category !== State.selectedCategory) return false;
      if (art.price > State.priceRange) return false;

      if (State.searchQuery.trim() !== '') {
        const q = State.searchQuery.toLowerCase().trim();
        const inTitle = art.title.toLowerCase().includes(q);
        const inArtist = art.artist.name.toLowerCase().includes(q) || art.artist.handle.toLowerCase().includes(q);
        const inCat = art.category.toLowerCase().includes(q);
        const inDesc = art.description.toLowerCase().includes(q);
        if (!inTitle && !inArtist && !inCat && !inDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (State.sortBy === 'price-asc') return a.price - b.price;
      if (State.sortBy === 'price-desc') return b.price - a.price;
      if (State.sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  function renderGallery() {
    const list = getFilteredArtworks();
    DOM.artworksCountNum.textContent = list.length;

    const isFiltered = State.selectedCategory !== 'All' || State.priceRange < 600 || State.searchQuery !== '' || State.sortBy !== 'featured';
    DOM.catalogueResetFiltersBtn.style.display = isFiltered ? 'inline-block' : 'none';

    if (list.length === 0) {
      DOM.artworksCatalogueGrid.style.display = 'none';
      DOM.emptyCatalogueMessage.style.display = 'block';
      return;
    }

    DOM.artworksCatalogueGrid.style.display = 'grid';
    DOM.emptyCatalogueMessage.style.display = 'none';
    DOM.artworksCatalogueGrid.innerHTML = '';

    list.forEach(art => {
      const isLiked = State.likes.includes(art.id);
      const inCart = State.cart.some(item => item.artworkId === art.id);

      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-media">
          <img src="${art.image}" alt="${art.title}" class="card-img" loading="lazy" />
          <span class="card-tag">${art.category}</span>
          <button class="card-favorite-btn ${isLiked ? 'liked' : ''}" title="Favorite">
            ${isLiked ? '♥' : '♡'}
          </button>
        </div>

        <div class="card-body">
          <h3 class="card-title">${art.title}</h3>
          
          <div class="card-artist">
            <img src="${art.artist.avatar}" alt="${art.artist.name}" />
            <span>${art.artist.name}</span>
            <span style="margin-left: auto; color: var(--gold); font-weight: 700;">★ ${art.rating}</span>
          </div>

          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.85rem;">
            ${art.format.split('+')[0].trim()} • ${art.resolution.split('(')[0].trim()}
          </div>

          <div class="card-footer">
            <div class="card-price">
              <span>Price</span>
              <strong>$${art.price}</strong>
            </div>

            <button class="btn ${inCart ? 'btn-secondary' : 'btn-primary'} btn-sm card-bag-btn">
              ${inCart ? '✓ In Bag' : 'Add to Bag'}
            </button>
          </div>
        </div>
      `;

      card.querySelector('.card-media').addEventListener('click', (e) => {
        if (e.target.closest('.card-favorite-btn')) return;
        openDetailModal(art.id);
      });

      card.querySelector('.card-title').addEventListener('click', () => {
        openDetailModal(art.id);
      });

      card.querySelector('.card-favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(art.id);
      });

      card.querySelector('.card-bag-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(art.id, 'personal');
      });

      DOM.artworksCatalogueGrid.appendChild(card);
    });
  }

  function toggleFavorite(id) {
    const idx = State.likes.indexOf(id);
    if (idx > -1) {
      State.likes.splice(idx, 1);
      showToast("Removed from favorites");
    } else {
      State.likes.push(id);
      showToast("Saved to favorites", 'success');
    }
    saveLikes();
    renderGallery();
  }

  // =========================================================================
  // 9. Artwork Detail Modal & Reviews
  // =========================================================================

  let currentReviewRating = 5;

  function openDetailModal(id) {
    const art = State.artworks.find(a => a.id === id);
    if (!art) return;

    State.selectedArtworkId = id;
    State.selectedLicense = 'personal';
    DOM.licPersonal.checked = true;

    DOM.detailImg.src = art.image;
    DOM.detailEditionTag.textContent = art.edition;
    DOM.detailTitle.textContent = art.title;
    DOM.detailArtistAvatar.src = art.artist.avatar;
    DOM.detailArtistName.textContent = art.artist.name;
    DOM.detailArtistHandle.textContent = art.artist.handle;
    DOM.detailDesc.textContent = art.description;
    DOM.detailRes.textContent = art.resolution;
    DOM.detailFmt.textContent = art.format;
    DOM.detailSize.textContent = art.fileSize;
    DOM.detailSoft.textContent = art.software;

    updateModalPrice(art);
    renderReviews(art);

    // Reset review form
    DOM.reviewTextInput.value = '';
    DOM.errReview.style.display = 'none';
    setPickerScore(5);

    DOM.detailModal.classList.add('open');
  }

  function updateModalPrice(art) {
    const mul = State.selectedLicense === 'commercial' ? 2.2 : 1;
    const finalPrice = Math.round(art.price * mul);
    DOM.detailPriceText.textContent = `$${finalPrice}`;
  }

  function setPickerScore(score) {
    currentReviewRating = score;
    DOM.starScoreText.textContent = `${score} Stars`;
    DOM.starPicker.querySelectorAll('.star').forEach(s => {
      const v = Number(s.getAttribute('data-v'));
      s.classList.toggle('active', v <= score);
    });
  }

  function renderReviews(art) {
    DOM.detailRatingSummary.textContent = `★ ${art.rating} (${(art.reviews || []).length} Reviews)`;
    DOM.detailReviewsList.innerHTML = '';

    if (!art.reviews || art.reviews.length === 0) {
      DOM.detailReviewsList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1rem;">No reviews yet. Be the first collector to review!</div>`;
      return;
    }

    art.reviews.forEach(r => {
      const item = document.createElement('div');
      item.className = 'review-item';
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <div style="font-weight: 700; font-size: 0.82rem;">${r.user} <span class="badge" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">Verified</span></div>
          <div style="color: var(--gold); font-size: 0.8rem; font-weight: 700;">${'★'.repeat(r.rating)}</div>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted);">${r.comment}</p>
      `;
      DOM.detailReviewsList.appendChild(item);
    });
  }

  // =========================================================================
  // 10. Shopping Cart & Drawer
  // =========================================================================

  function addToCart(artworkId, license = 'personal') {
    const existing = State.cart.find(i => i.artworkId === artworkId);
    if (existing) {
      showToast("Item is already in your bag", 'info');
      openCart();
      return;
    }

    State.cart.push({ artworkId, license });
    saveCart();
    updateCartUI();
    renderGallery();
    showToast("Added to your collector bag!", 'success');
  }

  function removeFromCart(artworkId) {
    State.cart = State.cart.filter(i => i.artworkId !== artworkId);
    saveCart();
    updateCartUI();
    renderGallery();
    showToast("Item removed from bag");
  }

  function updateCartUI() {
    const count = State.cart.length;
    DOM.cartCountBadge.textContent = count;
    DOM.cartDrawerCount.textContent = count;

    if (count === 0) {
      DOM.cartItemsContainer.style.display = 'none';
      DOM.cartSummaryFooter.style.display = 'none';
      DOM.cartEmptyMsg.style.display = 'block';
      return;
    }

    DOM.cartItemsContainer.style.display = 'flex';
    DOM.cartSummaryFooter.style.display = 'block';
    DOM.cartEmptyMsg.style.display = 'none';
    DOM.cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    State.cart.forEach(item => {
      const art = State.artworks.find(a => a.id === item.artworkId);
      if (!art) return;

      const mul = item.license === 'commercial' ? 2.2 : 1;
      const price = Math.round(art.price * mul);
      subtotal += price;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${art.image}" alt="${art.title}" />
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; font-size: 0.85rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${art.title}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${art.artist.name}</div>
          
          <div style="margin: 0.35rem 0;">
            <select class="form-input lic-select" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;">
              <option value="personal" ${item.license === 'personal' ? 'selected' : ''}>Personal</option>
              <option value="commercial" ${item.license === 'commercial' ? 'selected' : ''}>Commercial (2.2x)</option>
            </select>
          </div>

          <div style="font-weight: 800; font-size: 0.95rem; color: var(--primary);">$${price}</div>
        </div>

        <button class="remove-btn btn btn-sm" style="align-self: flex-start; color: var(--rose);">✕</button>
      `;

      row.querySelector('.lic-select').addEventListener('change', (e) => {
        item.license = e.target.value;
        saveCart();
        updateCartUI();
      });

      row.querySelector('.remove-btn').addEventListener('click', () => {
        removeFromCart(art.id);
      });

      DOM.cartItemsContainer.appendChild(row);
    });

    const discount = State.promoApplied ? Math.round(subtotal * 0.10) : 0;
    const fee = Math.round((subtotal - discount) * 0.025);
    const total = subtotal - discount + fee;

    DOM.cartSubtotalText.textContent = `$${subtotal}`;
    if (State.promoApplied) {
      DOM.cartDiscountLine.style.display = 'flex';
      DOM.cartDiscountText.textContent = `-$${discount}`;
    } else {
      DOM.cartDiscountLine.style.display = 'none';
    }
    DOM.cartFeeText.textContent = `$${fee}`;
    DOM.cartTotalText.textContent = `$${total}`;
  }

  function openCart() {
    updateCartUI();
    DOM.cartDrawerBackdrop.classList.add('open');
  }

  function closeCart() {
    DOM.cartDrawerBackdrop.classList.remove('open');
  }

  // =========================================================================
  // 11. Multi-Step Checkout Workflow
  // =========================================================================

  function openCheckout() {
    if (State.cart.length === 0) {
      showToast("Your bag is empty", 'error');
      return;
    }
    closeCart();
    State.activeCheckoutStep = 1;
    showCheckoutStep(1);

    if (State.user) {
      DOM.chName.value = State.user.name;
      DOM.chEmail.value = State.user.email;
    }

    DOM.chTotalPreview.textContent = DOM.cartTotalText.textContent;
    DOM.checkoutModal.classList.add('open');
  }

  function showCheckoutStep(step) {
    State.activeCheckoutStep = step;
    DOM.checkoutStep1.style.display = step === 1 ? 'block' : 'none';
    DOM.checkoutStep2.style.display = step === 2 ? 'block' : 'none';
    DOM.checkoutStep3.style.display = step === 3 ? 'block' : 'none';
  }

  function completeOrder() {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    const orderId = `AETH-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    DOM.receiptIdText.textContent = `Receipt: #${orderId}`;

    const purchased = State.cart.map(item => {
      const art = State.artworks.find(a => a.id === item.artworkId);
      const mul = item.license === 'commercial' ? 2.2 : 1;
      return {
        title: art ? art.title : "Digital Asset",
        artist: art ? art.artist.name : "Artist",
        price: art ? Math.round(art.price * mul) : 0,
        license: item.license === 'commercial' ? 'Commercial License' : 'Personal License',
        format: art ? art.format : '8K Master Archive',
        image: art ? art.image : ''
      };
    });

    DOM.receiptItemsList.innerHTML = '';
    purchased.forEach(item => {
      const d = document.createElement('div');
      d.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:var(--bg-subtle); padding:0.65rem 0.85rem; border-radius:6px; border:1px solid var(--border);';
      d.innerHTML = `
        <div style="font-size:0.82rem; font-weight:600;">${item.title} <span style="font-size:0.72rem; color:var(--text-muted);">(${item.license})</span></div>
        <button class="btn btn-primary btn-sm" onclick="alert('Simulated download started: ${item.title.replace(/'/g, "")}.zip')">Download</button>
      `;
      DOM.receiptItemsList.appendChild(d);
    });

    const newOrder = {
      orderId,
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      collectorName: DOM.chName.value.trim(),
      total: DOM.cartTotalText.textContent.replace('$', ''),
      items: purchased
    };

    State.orders.unshift(newOrder);
    saveOrders();

    State.cart = [];
    saveCart();
    updateCartUI();
    renderGallery();

    showCheckoutStep(3);
    showToast("Acquisition confirmed!", 'success');
  }

  // =========================================================================
  // 12. Admin Studio (Full CRUD)
  // =========================================================================

  function renderAdminView() {
    const totalRev = State.orders.reduce((s, o) => s + (Number(o.total) || 0), 14200);
    DOM.statRevVal.textContent = `$${totalRev.toLocaleString()}`;
    DOM.statArtCount.textContent = State.artworks.length;
    DOM.statOrderCount.textContent = State.orders.length + 27;

    const avg = (State.artworks.reduce((s, a) => s + (a.rating || 4.8), 0) / State.artworks.length).toFixed(1);
    DOM.statRatingVal.textContent = `${avg} ★`;

    DOM.adminArtworksTbody.innerHTML = '';
    State.artworks.forEach(art => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <img src="${art.image}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover;" />
            <strong style="font-size: 0.85rem;">${art.title}</strong>
          </div>
        </td>
        <td>${art.artist.name}</td>
        <td><span class="badge">${art.category}</span></td>
        <td><strong>$${art.price}</strong></td>
        <td style="color: var(--gold); font-weight: 700;">★ ${art.rating}</td>
        <td>
          <button class="btn btn-sm btn-secondary toggle-feat-btn" style="color: ${art.featured ? 'var(--primary)' : 'var(--text-muted)'};">
            ${art.featured ? '★ Spotlight' : 'Standard'}
          </button>
        </td>
        <td>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-sm btn-secondary edit-btn">Edit</button>
            <button class="btn btn-sm btn-danger del-btn">Delete</button>
          </div>
        </td>
      `;

      tr.querySelector('.toggle-feat-btn').addEventListener('click', () => {
        art.featured = !art.featured;
        saveArtworks();
        renderAdminView();
        renderHero();
        showToast("Spotlight status updated");
      });

      tr.querySelector('.edit-btn').addEventListener('click', () => {
        openAdminModal('edit', art);
      });

      tr.querySelector('.del-btn').addEventListener('click', () => {
        if (confirm(`Remove "${art.title}" from the catalogue?`)) {
          State.artworks = State.artworks.filter(a => a.id !== art.id);
          State.cart = State.cart.filter(c => c.artworkId !== art.id);
          saveArtworks();
          saveCart();
          renderAdminView();
          renderGallery();
          renderHero();
          showToast("Artwork deleted", 'info');
        }
      });

      DOM.adminArtworksTbody.appendChild(tr);
    });
  }

  function openAdminModal(mode = 'create', artwork = null) {
    if (mode === 'create') {
      DOM.adminModalHeading.textContent = "Add New Artwork";
      DOM.adminModalSaveBtn.textContent = "Save to Catalogue";
      DOM.adminArtId.value = "";
      DOM.admTitle.value = "";
      DOM.admArtist.value = State.user ? State.user.name : "Elena Rostova";
      DOM.admHandle.value = "@studio_art";
      DOM.admCategory.value = "3D Renders";
      DOM.admPrice.value = "320";
      DOM.admImg.value = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85";
      DOM.admDesc.value = "High-fidelity digital render crafted with raytraced lighting.";
      DOM.admFeatured.checked = false;
    } else {
      DOM.adminModalHeading.textContent = `Edit "${artwork.title}"`;
      DOM.adminModalSaveBtn.textContent = "Update Artwork";
      DOM.adminArtId.value = artwork.id;
      DOM.admTitle.value = artwork.title;
      DOM.admArtist.value = artwork.artist.name;
      DOM.admHandle.value = artwork.artist.handle;
      DOM.admCategory.value = artwork.category;
      DOM.admPrice.value = artwork.price;
      DOM.admImg.value = artwork.image;
      DOM.admDesc.value = artwork.description;
      DOM.admFeatured.checked = artwork.featured;
    }
    DOM.adminModal.classList.add('open');
  }

  function closeAdminModal() {
    DOM.adminModal.classList.remove('open');
  }

  // =========================================================================
  // 13. Orders History View
  // =========================================================================

  function renderOrdersView() {
    DOM.ordersHistoryList.innerHTML = '';

    if (State.orders.length === 0) {
      DOM.ordersHistoryList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 3rem;">No past orders yet.</div>`;
      return;
    }

    State.orders.forEach(o => {
      const card = document.createElement('div');
      card.style.cssText = 'background:var(--bg-surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;';
      
      const itemsHtml = o.items.map(it => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--border);">
          <div style="display:flex; align-items:center; gap:0.65rem;">
            <img src="${it.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80'}" style="width:36px; height:36px; border-radius:4px; object-fit:cover;" />
            <div>
              <div style="font-weight:700; font-size:0.85rem;">${it.title}</div>
              <div style="font-size:0.7rem; color:var(--text-muted);">${it.license} • ${it.format}</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="alert('Downloading master file for: ${it.title.replace(/'/g, "")}')">Download File</button>
        </div>
      `).join('');

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <div>
            <strong style="font-family:monospace; color:var(--primary);">${o.orderId}</strong>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:0.5rem;">${o.date}</span>
          </div>
          <div style="font-weight:800; font-size:1.1rem; color:var(--text-main);">$${o.total}</div>
        </div>
        <div>${itemsHtml}</div>
      `;

      DOM.ordersHistoryList.appendChild(card);
    });
  }

  // =========================================================================
  // 14. Event Listeners Setup
  // =========================================================================

  function setupEvents() {
    // Nav view switches
    DOM.navBrandBtn.addEventListener('click', () => switchView('gallery'));
    DOM.tabGalleryBtn.addEventListener('click', () => switchView('gallery'));
    DOM.tabHeroBtn.addEventListener('click', () => switchView('hero'));
    DOM.tabAdminBtn.addEventListener('click', () => switchView('admin'));
    DOM.tabOrdersBtn.addEventListener('click', () => switchView('orders'));
    DOM.tabAuthBtn.addEventListener('click', () => switchView('auth'));
    DOM.userStatusChip.addEventListener('click', () => switchView('auth'));

    // Theme toggle
    DOM.themeBtn.addEventListener('click', toggleTheme);

    // Cart Open / Close
    DOM.cartOpenBtn.addEventListener('click', openCart);
    DOM.cartCloseBtn.addEventListener('click', closeCart);
    DOM.cartExploreBtn.addEventListener('click', () => {
      closeCart();
      switchView('gallery');
    });

    // Promo Code
    DOM.cartApplyPromoBtn.addEventListener('click', () => {
      const code = DOM.cartPromoInput.value.trim().toUpperCase();
      if (code === 'NEO2026' || code === 'AETHERIA') {
        State.promoApplied = true;
        DOM.cartPromoFeedback.style.display = 'block';
        updateCartUI();
        showToast("Promo Code NEO2026 applied: 10% Discount!", 'success');
      } else {
        showToast("Invalid promo code. Try 'NEO2026'", 'info');
      }
    });

    // Checkout Modal
    DOM.cartCheckoutProceedBtn.addEventListener('click', openCheckout);
    DOM.checkoutCloseBtn.addEventListener('click', () => DOM.checkoutModal.classList.remove('open'));

    DOM.checkoutBillingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showCheckoutStep(2);
    });

    DOM.payBackBtn.addEventListener('click', () => showCheckoutStep(1));

    document.querySelectorAll('.pay-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pay-tab-btn').forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-secondary');
        });
        btn.classList.add('btn-primary', 'active');
        btn.classList.remove('btn-secondary');

        const m = btn.getAttribute('data-m');
        DOM.payCardSection.style.display = m === 'card' ? 'block' : 'none';
        DOM.payUpiSection.style.display = m === 'upi' ? 'block' : 'none';
        DOM.payCryptoSection.style.display = m === 'crypto' ? 'block' : 'none';
      });
    });

    DOM.checkoutPaymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      completeOrder();
    });

    DOM.receiptDoneBtn.addEventListener('click', () => {
      DOM.checkoutModal.classList.remove('open');
      switchView('gallery');
    });

    // Catalogue Filters
    DOM.catalogueSearchBox.addEventListener('input', (e) => {
      State.searchQuery = e.target.value;
      renderGallery();
    });

    DOM.priceFilterSlider.addEventListener('input', (e) => {
      State.priceRange = Number(e.target.value);
      DOM.priceSliderDisplay.textContent = `$${State.priceRange}`;
      renderGallery();
    });

    DOM.catalogueSortSelect.addEventListener('change', (e) => {
      State.sortBy = e.target.value;
      renderGallery();
    });

    const resetFilters = () => {
      State.selectedCategory = 'All';
      State.priceRange = 600;
      State.searchQuery = '';
      State.sortBy = 'featured';
      DOM.catalogueSearchBox.value = '';
      DOM.priceFilterSlider.value = '600';
      DOM.priceSliderDisplay.textContent = '$600';
      DOM.catalogueSortSelect.value = 'featured';
      renderCategoryPills();
      renderGallery();
      showToast("Filters reset");
    };

    DOM.catalogueResetFiltersBtn.addEventListener('click', resetFilters);
    DOM.emptyStateResetBtn.addEventListener('click', resetFilters);

    // Detail Modal
    DOM.detailModalCloseBtn.addEventListener('click', () => DOM.detailModal.classList.remove('open'));
    DOM.licPersonal.addEventListener('change', () => {
      State.selectedLicense = 'personal';
      const art = State.artworks.find(a => a.id === State.selectedArtworkId);
      if (art) updateModalPrice(art);
    });
    DOM.licCommercial.addEventListener('change', () => {
      State.selectedLicense = 'commercial';
      const art = State.artworks.find(a => a.id === State.selectedArtworkId);
      if (art) updateModalPrice(art);
    });

    DOM.detailAddBagBtn.addEventListener('click', () => {
      if (State.selectedArtworkId) {
        addToCart(State.selectedArtworkId, State.selectedLicense);
      }
    });

    // Star Picker
    DOM.starPicker.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', () => {
        const v = Number(star.getAttribute('data-v'));
        setPickerScore(v);
      });
    });

    // Review Submit
    DOM.reviewSubmitBtn.addEventListener('click', () => {
      const comment = DOM.reviewTextInput.value.trim();
      if (!comment) {
        DOM.errReview.style.display = 'block';
        return;
      }
      DOM.errReview.style.display = 'none';

      const art = State.artworks.find(a => a.id === State.selectedArtworkId);
      if (!art) return;

      const newReview = {
        id: `rev-${Date.now()}`,
        user: State.user ? State.user.name : "Collector",
        rating: currentReviewRating,
        comment
      };

      art.reviews = [newReview, ...(art.reviews || [])];
      art.reviewCount = art.reviews.length;
      const total = art.reviews.reduce((s, r) => s + r.rating, 0);
      art.rating = Number((total / art.reviews.length).toFixed(1));

      saveArtworks();
      renderReviews(art);
      renderGallery();
      DOM.reviewTextInput.value = '';
      showToast("Review submitted successfully!", 'success');
    });

    // Auth View Switchers
    DOM.tabLogin.addEventListener('click', () => {
      DOM.tabLogin.classList.add('active');
      DOM.tabRegister.classList.remove('active');
      DOM.loginForm.style.display = 'block';
      DOM.registerForm.style.display = 'none';
    });

    DOM.tabRegister.addEventListener('click', () => {
      DOM.tabRegister.classList.add('active');
      DOM.tabLogin.classList.remove('active');
      DOM.registerForm.style.display = 'block';
      DOM.loginForm.style.display = 'none';
    });

    // Demo Logins
    DOM.demoCollectorBtn.addEventListener('click', () => setDemoUser('collector'));
    DOM.demoAdminBtn.addEventListener('click', () => setDemoUser('admin'));

    // Login Form Submit
    DOM.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = DOM.loginEmail.value.trim();
      if (!email.includes('@')) {
        DOM.errLoginEmail.style.display = 'block';
        return;
      }
      DOM.errLoginEmail.style.display = 'none';

      const role = email.includes('admin') || email.includes('curator') ? 'admin' : 'collector';
      State.user = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
      };

      saveUser();
      renderUserUI();
      switchView(role === 'admin' ? 'admin' : 'gallery');
      showToast(`Welcome back, ${State.user.name}!`, 'success');
    });

    // Password strength check
    DOM.regPassword.addEventListener('input', (e) => {
      const len = e.target.value.length;
      if (len === 0) DOM.passwordStrengthLabel.textContent = "Strength: None";
      else if (len < 6) DOM.passwordStrengthLabel.textContent = "Strength: Weak (min 6 chars)";
      else if (len < 10) DOM.passwordStrengthLabel.textContent = "Strength: Good";
      else DOM.passwordStrengthLabel.textContent = "Strength: Strong (Optimal)";
    });

    // Register Form Submit
    DOM.registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = DOM.regName.value.trim();
      const email = DOM.regEmail.value.trim();
      const role = DOM.regRole.value;
      const pwd = DOM.regPassword.value;
      const conf = DOM.regConfirmPassword.value;

      if (!name) { DOM.errRegName.style.display = 'block'; return; }
      if (!email.includes('@')) { DOM.errRegEmail.style.display = 'block'; return; }
      if (pwd.length < 6) { DOM.errRegPassword.style.display = 'block'; return; }
      if (pwd !== conf) { DOM.errRegConfirm.style.display = 'block'; return; }

      State.user = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      };

      saveUser();
      renderUserUI();
      switchView(role === 'admin' ? 'admin' : 'gallery');
      showToast(`Account created! Welcome, ${State.user.name}`, 'success');
    });

    // Admin Add New Artwork
    DOM.adminCreateArtBtn.addEventListener('click', () => {
      openAdminModal('create');
    });

    DOM.adminModalCloseBtn.addEventListener('click', closeAdminModal);
    DOM.adminModalCancel.addEventListener('click', closeAdminModal);

    DOM.adminArtForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = DOM.adminArtId.value;
      const title = DOM.admTitle.value.trim();
      const artist = DOM.admArtist.value.trim();
      const handle = DOM.admHandle.value.trim();
      const category = DOM.admCategory.value;
      const price = Number(DOM.admPrice.value);
      const image = DOM.admImg.value.trim();
      const desc = DOM.admDesc.value.trim();
      const featured = DOM.admFeatured.checked;

      if (featured) {
        State.artworks.forEach(a => a.featured = false);
      }

      if (id) {
        // Edit existing
        const item = State.artworks.find(a => a.id === id);
        if (item) {
          item.title = title;
          item.artist.name = artist;
          item.artist.handle = handle;
          item.category = category;
          item.price = price;
          item.ethPrice = Number((price / 2400).toFixed(3));
          item.image = image;
          item.description = desc;
          item.featured = featured;
          showToast(`Updated "${item.title}"`, 'success');
        }
      } else {
        // Create new
        const newArt = {
          id: `art-${Date.now()}`,
          title,
          artist: {
            name: artist,
            handle,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
            bio: "Curated digital artist.",
            verified: true
          },
          category,
          price,
          ethPrice: Number((price / 2400).toFixed(3)),
          image,
          resolution: "4K (3840 × 2160)",
          dimensions: "3840 x 2160 px",
          format: "PNG + TIFF Archive",
          fileSize: "680 MB",
          software: "Blender 4.2 / Photoshop",
          featured,
          rating: 5.0,
          reviewCount: 0,
          edition: "1 of 1 Masterpiece",
          createdDate: "Just Now",
          description: desc,
          tags: ["Digital Art", category],
          reviews: []
        };
        State.artworks.unshift(newArt);
        showToast(`Published "${newArt.title}"!`, 'success');
      }

      saveArtworks();
      closeAdminModal();
      renderAdminView();
      renderGallery();
      renderHero();
    });

    // Restore Catalog
    DOM.adminRestoreBtn.addEventListener('click', () => {
      if (confirm("Restore the catalog to original masterworks?")) {
        State.artworks = JSON.parse(JSON.stringify(initialArtworks));
        saveArtworks();
        renderAdminView();
        renderCategoryPills();
        renderGallery();
        renderHero();
        showToast("Restored master collection", 'info');
      }
    });
  }

  // =========================================================================
  // 15. App Initialization
  // =========================================================================

  function init() {
    initStorage();
    applyTheme(State.theme);
    renderUserUI();
    renderHero();
    startHeroTimer();
    renderCategoryPills();
    renderGallery();
    updateCartUI();
    setupEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
