/**
 * AETHERIA — Curated Digital Art Marketplace
 * Full Vanilla JavaScript Application Controller
 * Handles State, LocalStorage Persistence, CRUD, Cart, Checkout, Reviews & Auth
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Application State & LocalStorage Synchronization
  // =========================================================================

  const State = {
    theme: localStorage.getItem('aetheria_theme') || 'dark',
    user: null,
    artworks: [],
    cart: [],
    likes: [],
    orders: [],
    activeView: 'gallery', // 'gallery' | 'admin' | 'favorites'
    selectedCategory: 'All',
    searchQuery: '',
    priceRange: 600,
    sortBy: 'featured',
    promoCodeApplied: false,
    discountPercent: 0,
    selectedArtworkId: null,
    selectedLicenseType: 'personal', // 'personal' | 'commercial'
    deleteTargetId: null,
    editingArtworkId: null,
    activeCheckoutStep: 1,
    selectedPaymentMethod: 'card'
  };

  // Initialize and load saved state from localStorage
  function initLocalStorageState() {
    // 1. User
    const savedUser = localStorage.getItem('aetheria_user');
    if (savedUser) {
      try {
        State.user = JSON.parse(savedUser);
      } catch (e) {
        State.user = DEMO_USERS.collector;
      }
    } else {
      State.user = DEMO_USERS.collector; // Default logged in for instant demo
      localStorage.setItem('aetheria_user', JSON.stringify(State.user));
    }

    // 2. Artworks Catalogue (CRUD items persist)
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

    // 3. Shopping Cart
    const savedCart = localStorage.getItem('aetheria_cart');
    if (savedCart) {
      try {
        State.cart = JSON.parse(savedCart);
      } catch (e) {
        State.cart = [];
      }
    }

    // 4. Favorites / Likes
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

    // 5. Orders History
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
          date: "Nov 12, 2026, 04:32 PM",
          collectorName: "Alex Vance",
          paymentMethod: "Credit Card (•••• 4242)",
          total: 266,
          items: [
            {
              title: "Hyperion Nebula: Synthetic Bloom",
              artist: "Darius Vance",
              price: 260,
              license: "Personal License",
              format: "GLSL Source Code + SVG Vector + 6K TIFF",
              image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80"
            }
          ]
        }
      ];
      localStorage.setItem('aetheria_orders', JSON.stringify(State.orders));
    }
  }

  // Save specific slices to localStorage
  function saveArtworksToStorage() {
    localStorage.setItem('aetheria_artworks', JSON.stringify(State.artworks));
  }

  function saveCartToStorage() {
    localStorage.setItem('aetheria_cart', JSON.stringify(State.cart));
  }

  function saveLikesToStorage() {
    localStorage.setItem('aetheria_likes', JSON.stringify(State.likes));
  }

  function saveOrdersToStorage() {
    localStorage.setItem('aetheria_orders', JSON.stringify(State.orders));
  }

  function saveUserToStorage() {
    localStorage.setItem('aetheria_user', JSON.stringify(State.user));
  }

  // =========================================================================
  // 2. DOM Elements Cache
  // =========================================================================

  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIconSlot: document.getElementById('theme-icon-slot'),
    
    // Navbar
    brandHomeBtn: document.getElementById('brand-home-btn'),
    globalSearchInput: document.getElementById('global-search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    navGalleryBtn: document.getElementById('nav-gallery-btn'),
    navFavoritesBtn: document.getElementById('nav-favorites-btn'),
    navFavCount: document.getElementById('nav-fav-count'),
    navAdminBtn: document.getElementById('nav-admin-btn'),
    ordersTriggerBtn: document.getElementById('orders-trigger-btn'),
    cartTriggerBtn: document.getElementById('cart-trigger-btn'),
    cartBadgeCount: document.getElementById('cart-badge-count'),
    userProfileBtn: document.getElementById('user-profile-btn'),
    navUserAvatar: document.getElementById('nav-user-avatar'),
    navUserName: document.getElementById('nav-user-name'),
    navUserRole: document.getElementById('nav-user-role'),
    userDropdownMenu: document.getElementById('user-dropdown-menu'),
    dropdownUserName: document.getElementById('dropdown-user-name'),
    dropdownUserEmail: document.getElementById('dropdown-user-email'),
    dropdownUserBadge: document.getElementById('dropdown-user-badge'),
    switchRoleCollector: document.getElementById('switch-role-collector'),
    switchRoleAdmin: document.getElementById('switch-role-admin'),
    roleDotCollector: document.getElementById('role-dot-collector'),
    roleDotAdmin: document.getElementById('role-dot-admin'),
    dropdownOrdersBtn: document.getElementById('dropdown-orders-btn'),
    dropdownAdminBtn: document.getElementById('dropdown-admin-btn'),
    dropdownLogoutBtn: document.getElementById('dropdown-logout-btn'),

    // Hero Showcase
    heroSection: document.getElementById('hero-section'),
    heroCountdown: document.getElementById('hero-countdown'),
    heroTitle: document.getElementById('hero-title'),
    heroDesc: document.getElementById('hero-desc'),
    heroArtistAvatar: document.getElementById('hero-artist-avatar'),
    heroArtistName: document.getElementById('hero-artist-name'),
    heroArtistHandle: document.getElementById('hero-artist-handle'),
    heroCategoryTag: document.getElementById('hero-category-tag'),
    heroEditionTag: document.getElementById('hero-edition-tag'),
    heroResSpec: document.getElementById('hero-res-spec'),
    heroFormatSpec: document.getElementById('hero-format-spec'),
    heroSoftwareSpec: document.getElementById('hero-software-spec'),
    heroPriceUsd: document.getElementById('hero-price-usd'),
    heroPriceEth: document.getElementById('hero-price-eth'),
    heroAddCartBtn: document.getElementById('hero-add-cart-btn'),
    heroInspectBtn: document.getElementById('hero-inspect-btn'),
    heroMediaBox: document.getElementById('hero-media-box'),
    heroArtImg: document.getElementById('hero-art-img'),
    heroRatingBadge: document.getElementById('hero-rating-badge'),
    heroOverlayTitle: document.getElementById('hero-overlay-title'),
    heroOverlayFormat: document.getElementById('hero-overlay-format'),

    // Catalogue & Filters
    categoryPillsBar: document.getElementById('category-pills-bar'),
    catalogueSearchInput: document.getElementById('catalogue-search-input'),
    priceRangeSlider: document.getElementById('price-range-slider'),
    priceSliderLabel: document.getElementById('price-slider-label'),
    sortDropdown: document.getElementById('sort-dropdown'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    displayResultsCount: document.getElementById('display-results-count'),
    artworksGrid: document.getElementById('artworks-grid'),
    emptyStateBox: document.getElementById('empty-state-box'),
    emptyResetBtn: document.getElementById('empty-reset-btn'),

    // Admin Studio
    adminSection: document.getElementById('admin-section'),
    statRevenue: document.getElementById('stat-revenue'),
    statActiveArtworks: document.getElementById('stat-active-artworks'),
    statTotalOrders: document.getElementById('stat-total-orders'),
    statAvgRating: document.getElementById('stat-avg-rating'),
    adminResetCatalogueBtn: document.getElementById('admin-reset-catalogue-btn'),
    adminAddArtBtn: document.getElementById('admin-add-art-btn'),
    adminTableBody: document.getElementById('admin-table-body'),

    // Favorites
    favoritesSection: document.getElementById('favorites-section'),
    favoritesGrid: document.getElementById('favorites-grid'),
    emptyFavoritesBox: document.getElementById('empty-favorites-box'),
    favBrowseBtn: document.getElementById('fav-browse-btn'),

    // Cart Drawer
    cartOverlay: document.getElementById('cart-overlay'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartHeaderCount: document.getElementById('cart-header-count'),
    cartCloseBtn: document.getElementById('cart-close-btn'),
    cartItemsList: document.getElementById('cart-items-list'),
    cartEmptyView: document.getElementById('cart-empty-view'),
    cartEmptyExploreBtn: document.getElementById('cart-empty-explore-btn'),
    cartFooterBox: document.getElementById('cart-footer-box'),
    promoCodeInput: document.getElementById('promo-code-input'),
    promoApplyBtn: document.getElementById('promo-apply-btn'),
    promoStatusMsg: document.getElementById('promo-status-msg'),
    cartSubtotalVal: document.getElementById('cart-subtotal-val'),
    cartDiscountRow: document.getElementById('cart-discount-row'),
    cartDiscountVal: document.getElementById('cart-discount-val'),
    cartFeeVal: document.getElementById('cart-fee-val'),
    cartTotalVal: document.getElementById('cart-total-val'),
    cartCheckoutBtn: document.getElementById('cart-checkout-btn'),

    // Detail Modal
    detailModal: document.getElementById('detail-modal'),
    detailModalClose: document.getElementById('detail-modal-close'),
    modalArtImg: document.getElementById('modal-art-img'),
    modalCategoryBadge: document.getElementById('modal-category-badge'),
    modalRatingPill: document.getElementById('modal-rating-pill'),
    modalEditionTag: document.getElementById('modal-edition-tag'),
    modalCreatedDate: document.getElementById('modal-created-date'),
    modalArtTitle: document.getElementById('modal-art-title'),
    modalArtistAvatar: document.getElementById('modal-artist-avatar'),
    modalArtistName: document.getElementById('modal-artist-name'),
    modalArtistHandle: document.getElementById('modal-artist-handle'),
    modalArtistBio: document.getElementById('modal-artist-bio'),
    modalArtDesc: document.getElementById('modal-art-desc'),
    modalSpecRes: document.getElementById('modal-spec-res'),
    modalSpecFormat: document.getElementById('modal-spec-format'),
    modalSpecSize: document.getElementById('modal-spec-size'),
    modalSpecSoftware: document.getElementById('modal-spec-software'),
    modalLicPersonal: document.getElementById('modal-lic-personal'),
    modalLicCommercial: document.getElementById('modal-lic-commercial'),
    modalCalculatedPrice: document.getElementById('modal-calculated-price'),
    modalCalculatedEth: document.getElementById('modal-calculated-eth'),
    modalAddCartBtn: document.getElementById('modal-add-cart-btn'),
    modalAvgRatingVal: document.getElementById('modal-avg-rating-val'),
    modalReviewCount: document.getElementById('modal-review-count'),
    reviewSubmitForm: document.getElementById('review-submit-form'),
    starRatingPicker: document.getElementById('star-rating-picker'),
    starRatingText: document.getElementById('star-rating-text'),
    selectedRatingVal: document.getElementById('selected-rating-val'),
    reviewCommentInput: document.getElementById('review-comment-input'),
    reviewErrorMsg: document.getElementById('review-error-msg'),
    reviewPosterName: document.getElementById('review-poster-name'),
    modalReviewsList: document.getElementById('modal-reviews-list'),

    // Checkout Modal
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutModalClose: document.getElementById('checkout-modal-close'),
    stepIndicator1: document.getElementById('step-indicator-1'),
    stepIndicator2: document.getElementById('step-indicator-2'),
    stepIndicator3: document.getElementById('step-indicator-3'),
    checkoutStep1Form: document.getElementById('checkout-step-1-form'),
    checkoutName: document.getElementById('checkout-name'),
    checkoutEmail: document.getElementById('checkout-email'),
    checkoutCountry: document.getElementById('checkout-country'),
    checkoutWallet: document.getElementById('checkout-wallet'),
    checkoutStep1Total: document.getElementById('checkout-step1-total'),
    checkoutStep2Form: document.getElementById('checkout-step-2-form'),
    checkoutBackStep1: document.getElementById('checkout-back-step1'),
    checkoutPayBtn: document.getElementById('checkout-pay-btn'),
    checkoutStep3Confirmation: document.getElementById('checkout-step-3-confirmation'),
    receiptOrderId: document.getElementById('receipt-order-id'),
    receiptDownloadList: document.getElementById('receipt-download-list'),
    receiptPrintBtn: document.getElementById('receipt-print-btn'),
    receiptDoneBtn: document.getElementById('receipt-done-btn'),

    // Admin Add/Edit Modal
    adminArtModal: document.getElementById('admin-art-modal'),
    adminArtModalClose: document.getElementById('admin-art-modal-close'),
    adminModalTitle: document.getElementById('admin-modal-title'),
    adminArtworkForm: document.getElementById('admin-artwork-form'),
    adminFormArtId: document.getElementById('admin-form-art-id'),
    adminArtTitle: document.getElementById('admin-art-title'),
    adminArtistName: document.getElementById('admin-artist-name'),
    adminArtistHandle: document.getElementById('admin-artist-handle'),
    adminArtCategory: document.getElementById('admin-art-category'),
    adminArtPrice: document.getElementById('admin-art-price'),
    adminArtImage: document.getElementById('admin-art-image'),
    adminImgPreviewBox: document.getElementById('admin-img-preview-box'),
    adminImgPreview: document.getElementById('admin-img-preview'),
    adminArtResolution: document.getElementById('admin-art-resolution'),
    adminArtFormat: document.getElementById('admin-art-format'),
    adminArtDesc: document.getElementById('admin-art-desc'),
    adminArtFeatured: document.getElementById('admin-art-featured'),
    adminCancelBtn: document.getElementById('admin-cancel-btn'),
    adminSubmitBtnText: document.getElementById('admin-submit-btn-text'),

    // Delete Modal
    deleteConfirmModal: document.getElementById('delete-confirm-modal'),
    deleteTargetTitle: document.getElementById('delete-target-title'),
    deleteCancelBtn: document.getElementById('delete-cancel-btn'),
    deleteConfirmBtn: document.getElementById('delete-confirm-btn'),

    // Auth Modal
    authModal: document.getElementById('auth-modal'),
    authModalClose: document.getElementById('auth-modal-close'),
    authTabSignin: document.getElementById('auth-tab-signin'),
    authTabSignup: document.getElementById('auth-tab-signup'),
    signinForm: document.getElementById('signin-form'),
    signinEmail: document.getElementById('signin-email'),
    signinPassword: document.getElementById('signin-password'),
    signupForm: document.getElementById('signup-form'),
    signupName: document.getElementById('signup-name'),
    signupEmail: document.getElementById('signup-email'),
    signupRole: document.getElementById('signup-role'),
    signupPassword: document.getElementById('signup-password'),
    signupConfirmPassword: document.getElementById('signup-confirm-password'),
    pwdStrengthLabel: document.getElementById('pwd-strength-label'),
    demoLoginCollectorBtn: document.getElementById('demo-login-collector-btn'),
    demoLoginAdminBtn: document.getElementById('demo-login-admin-btn'),

    // Orders History Modal
    ordersModal: document.getElementById('orders-modal'),
    ordersModalClose: document.getElementById('orders-modal-close'),
    ordersListContainer: document.getElementById('orders-list-container'),
    ordersEmptyState: document.getElementById('orders-empty-state'),

    // Toast Container
    toastContainer: document.getElementById('toast-container'),

    // Footer Links
    footerAdminLink: document.getElementById('footer-admin-link'),
    footerOrdersLink: document.getElementById('footer-orders-link'),
    footerLoginLink: document.getElementById('footer-login-link'),
    footerResetLink: document.getElementById('footer-reset-link'),
    newsletterSubmitBtn: document.getElementById('newsletter-submit-btn'),
    newsletterEmail: document.getElementById('newsletter-email')
  };

  // =========================================================================
  // 3. UI Notification Toasts
  // =========================================================================

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = '✦';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `
      <span style="font-size: 1.1rem; line-height: 1;">${icon}</span>
      <span style="flex: 1;">${message}</span>
      <button style="background: none; border: none; color: inherit; cursor: pointer; padding: 0 4px; font-size: 0.9rem;" title="Dismiss">✕</button>
    `;

    toast.querySelector('button').addEventListener('click', () => {
      toast.remove();
    });

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4200);
  }

  // =========================================================================
  // 4. Theme & Appearance (Dark / Light Mode)
  // =========================================================================

  function applyTheme(theme) {
    State.theme = theme;
    DOM.html.setAttribute('data-theme', theme);
    localStorage.setItem('aetheria_theme', theme);

    if (theme === 'dark') {
      DOM.themeIconSlot.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      DOM.themeToggleBtn.title = "Switch to Light Mode";
    } else {
      DOM.themeIconSlot.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      DOM.themeToggleBtn.title = "Switch to Dark Mode";
    }
  }

  function toggleTheme() {
    const nextTheme = State.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Sleek Dark Gallery' : 'Curated Light'} Mode`, 'info');
  }

  // =========================================================================
  // 5. User Profile, Role Switching & Auth Validation
  // =========================================================================

  function renderUserUI() {
    if (!State.user) {
      DOM.navUserName.textContent = "Sign In";
      DOM.navUserRole.textContent = "Guest";
      DOM.navUserAvatar.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
      return;
    }

    DOM.navUserName.textContent = State.user.name;
    DOM.navUserRole.textContent = State.user.role === 'admin' ? "Curator / Admin" : "Collector";
    DOM.navUserAvatar.src = State.user.avatar;

    DOM.dropdownUserName.textContent = State.user.name;
    DOM.dropdownUserEmail.textContent = State.user.email;
    DOM.dropdownUserBadge.textContent = State.user.badge || (State.user.role === 'admin' ? "Admin / Curator" : "Verified Collector");

    // Dot indicators in dropdown
    if (State.user.role === 'collector') {
      DOM.roleDotCollector.style.background = "var(--brand-violet)";
      DOM.roleDotAdmin.style.background = "transparent";
    } else {
      DOM.roleDotCollector.style.background = "transparent";
      DOM.roleDotAdmin.style.background = "var(--brand-cyan)";
    }

    DOM.reviewPosterName.textContent = State.user.name;
  }

  function switchRole(role) {
    if (role === 'admin') {
      State.user = { ...DEMO_USERS.admin };
      saveUserToStorage();
      renderUserUI();
      switchView('admin');
      showToast("Signed in as Curator / Admin. Full CRUD unlocked!", 'success');
    } else {
      State.user = { ...DEMO_USERS.collector };
      saveUserToStorage();
      renderUserUI();
      switchView('gallery');
      showToast("Signed in as Buyer / Collector Demo", 'info');
    }
    closeUserDropdown();
  }

  function closeUserDropdown() {
    DOM.userDropdownMenu.classList.remove('open');
  }

  // Auth Modal Controls
  function openAuthModal(initialTab = 'signin') {
    DOM.authModal.classList.add('open');
    if (initialTab === 'signin') {
      DOM.authTabSignin.classList.add('active');
      DOM.authTabSignup.classList.remove('active');
      DOM.signinForm.style.display = 'block';
      DOM.signupForm.style.display = 'none';
    } else {
      DOM.authTabSignup.classList.add('active');
      DOM.authTabSignin.classList.remove('active');
      DOM.signupForm.style.display = 'block';
      DOM.signinForm.style.display = 'none';
    }
  }

  function closeAuthModal() {
    DOM.authModal.classList.remove('open');
  }

  // =========================================================================
  // 6. Navigation Views Switching
  // =========================================================================

  function switchView(viewName) {
    State.activeView = viewName;

    // Reset active buttons
    DOM.navGalleryBtn.classList.remove('active');
    DOM.navFavoritesBtn.classList.remove('active');
    DOM.navAdminBtn.classList.remove('active');

    // Hide all view containers
    DOM.heroSection.style.display = 'none';
    DOM.adminSection.style.display = 'none';
    DOM.favoritesSection.style.display = 'none';
    document.querySelector('.filter-section').style.display = 'none';
    DOM.artworksGrid.style.display = 'none';
    DOM.emptyStateBox.style.display = 'none';

    if (viewName === 'gallery') {
      DOM.navGalleryBtn.classList.add('active');
      DOM.heroSection.style.display = 'block';
      document.querySelector('.filter-section').style.display = 'block';
      DOM.artworksGrid.style.display = 'grid';
      renderGallery();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'admin') {
      DOM.navAdminBtn.classList.add('active');
      DOM.adminSection.style.display = 'block';
      renderAdminDashboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'favorites') {
      DOM.navFavoritesBtn.classList.add('active');
      DOM.favoritesSection.style.display = 'block';
      renderFavorites();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // =========================================================================
  // 7. Hero Showcase (Spotlight Drop)
  // =========================================================================

  function renderHero() {
    const spotlightArt = State.artworks.find(a => a.featured) || State.artworks[0];
    if (!spotlightArt) return;

    DOM.heroTitle.textContent = spotlightArt.title;
    DOM.heroDesc.textContent = spotlightArt.description;
    DOM.heroArtistAvatar.src = spotlightArt.artist.avatar;
    DOM.heroArtistName.textContent = spotlightArt.artist.name;
    DOM.heroArtistHandle.textContent = spotlightArt.artist.handle;
    DOM.heroCategoryTag.textContent = spotlightArt.category;
    DOM.heroEditionTag.textContent = spotlightArt.edition;
    DOM.heroResSpec.textContent = spotlightArt.resolution;
    DOM.heroFormatSpec.textContent = spotlightArt.format.split('+')[0].trim();
    DOM.heroSoftwareSpec.textContent = spotlightArt.software.split('/')[0].trim();
    DOM.heroPriceUsd.textContent = `$${spotlightArt.price}`;
    DOM.heroPriceEth.textContent = `≈ ${spotlightArt.ethPrice} ETH`;
    DOM.heroArtImg.src = spotlightArt.image;
    DOM.heroRatingBadge.textContent = `★ ${spotlightArt.rating}`;
    DOM.heroOverlayTitle.textContent = spotlightArt.title;
    DOM.heroOverlayFormat.textContent = spotlightArt.format;

    // Check if in cart
    const inCart = State.cart.some(item => item.artworkId === spotlightArt.id);
    if (inCart) {
      DOM.heroAddCartBtn.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Item in Bag</span>
      `;
      DOM.heroAddCartBtn.style.background = "rgba(16, 185, 129, 0.25)";
      DOM.heroAddCartBtn.style.borderColor = "var(--brand-emerald)";
      DOM.heroAddCartBtn.style.color = "#34d399";
    } else {
      DOM.heroAddCartBtn.innerHTML = `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span>Instant Add to Cart</span>
      `;
      DOM.heroAddCartBtn.style.background = "";
      DOM.heroAddCartBtn.style.borderColor = "";
      DOM.heroAddCartBtn.style.color = "";
    }

    // Hero action listeners
    DOM.heroAddCartBtn.onclick = () => {
      addToCart(spotlightArt.id, 'personal');
      renderHero();
    };

    DOM.heroInspectBtn.onclick = () => {
      openArtworkDetail(spotlightArt.id);
    };

    DOM.heroMediaBox.onclick = () => {
      openArtworkDetail(spotlightArt.id);
    };
  }

  // Live countdown timer for the spotlight drop
  let countdownTimer = null;
  function startHeroCountdown() {
    let secondsLeft = 14 * 3600 + 28 * 60 + 45;
    if (countdownTimer) clearInterval(countdownTimer);

    countdownTimer = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        const h = Math.floor(secondsLeft / 3600);
        const m = Math.floor((secondsLeft % 3600) / 60);
        const s = secondsLeft % 60;
        DOM.heroCountdown.textContent = `${String(h).padStart(2, '0')}h : ${String(m).padStart(2, '0')}m : ${String(s).padStart(2, '0')}s`;
      } else {
        DOM.heroCountdown.textContent = "00h : 00m : 00s";
        clearInterval(countdownTimer);
      }
    }, 1000);
  }

  // =========================================================================
  // 8. Category Filter Pills, Search, Sort & Range Controls
  // =========================================================================

  function renderCategoryPills() {
    DOM.categoryPillsBar.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cat-pill ${State.selectedCategory === cat ? 'active' : ''}`;

      const count = cat === 'All' 
        ? State.artworks.length 
        : State.artworks.filter(a => a.category === cat).length;

      btn.innerHTML = `
        <span>${cat}</span>
        <span class="cat-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        State.selectedCategory = cat;
        renderCategoryPills();
        renderGallery();
      });

      DOM.categoryPillsBar.appendChild(btn);
    });
  }

  function getFilteredArtworks() {
    return State.artworks.filter(art => {
      // Category filter
      if (State.selectedCategory !== 'All' && art.category !== State.selectedCategory) {
        return false;
      }

      // Price slider filter
      if (art.price > State.priceRange) {
        return false;
      }

      // Search term filter
      if (State.searchQuery.trim() !== '') {
        const query = State.searchQuery.toLowerCase().trim();
        const inTitle = art.title.toLowerCase().includes(query);
        const inArtist = art.artist.name.toLowerCase().includes(query) || art.artist.handle.toLowerCase().includes(query);
        const inCategory = art.category.toLowerCase().includes(query);
        const inDesc = art.description.toLowerCase().includes(query);
        const inTags = art.tags.some(t => t.toLowerCase().includes(query));

        if (!inTitle && !inArtist && !inCategory && !inDesc && !inTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (State.sortBy === 'price-asc') return a.price - b.price;
      if (State.sortBy === 'price-desc') return b.price - a.price;
      if (State.sortBy === 'rating') return b.rating - a.rating;
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  // =========================================================================
  // 9. Artworks Catalogue Rendering & Cards
  // =========================================================================

  function renderGallery() {
    const list = getFilteredArtworks();
    DOM.displayResultsCount.textContent = list.length;

    // Show/hide reset filter button
    const isFiltered = State.selectedCategory !== 'All' || State.priceRange < 600 || State.searchQuery !== '' || State.sortBy !== 'featured';
    DOM.resetFiltersBtn.style.display = isFiltered ? 'inline-flex' : 'none';

    if (list.length === 0) {
      DOM.artworksGrid.style.display = 'none';
      DOM.emptyStateBox.style.display = 'block';
      return;
    }

    DOM.artworksGrid.style.display = 'grid';
    DOM.emptyStateBox.style.display = 'none';
    DOM.artworksGrid.innerHTML = '';

    list.forEach(art => {
      const card = createArtworkCard(art);
      DOM.artworksGrid.appendChild(card);
    });
  }

  function createArtworkCard(art) {
    const isLiked = State.likes.includes(art.id);
    const inCart = State.cart.some(item => item.artworkId === art.id);

    const card = document.createElement('article');
    card.className = 'artwork-card';
    card.setAttribute('data-id', art.id);

    card.innerHTML = `
      <div class="card-media-wrapper">
        <img src="${art.image}" alt="${art.title}" class="card-img" loading="lazy" />
        
        <!-- Hover Reveal Actions -->
        <div class="card-hover-actions">
          <button class="card-action-btn inspect-btn" title="Inspect Full Specs & Reviews">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          
          <button class="card-action-btn like-btn ${isLiked ? 'liked' : ''}" title="${isLiked ? 'Remove from Favorites' : 'Add to Favorites'}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <span class="card-cat-badge">${art.category}</span>
      </div>

      <div class="card-body">
        <div class="card-header-row">
          <h3 class="card-title font-heading">${art.title}</h3>
          <div class="card-rating">
            <span>★</span>
            <span>${art.rating}</span>
            <span style="font-size: 0.65rem; color: var(--text-muted);">(${art.reviewCount || 0})</span>
          </div>
        </div>

        <div class="card-artist">
          <img src="${art.artist.avatar}" alt="${art.artist.name}" class="card-artist-avatar" />
          <div style="flex: 1; min-width: 0;">
            <div class="card-artist-name truncate">${art.artist.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${art.artist.handle}</div>
          </div>
        </div>

        <div class="card-tech-specs">
          <span>${art.format.split('+')[0].trim()}</span>
          <span>•</span>
          <span>${art.resolution.split('(')[0].trim()}</span>
        </div>

        <div class="card-footer">
          <div class="card-price-box">
            <span>Reserve</span>
            <strong>$${art.price}<span class="eth">≈ ${art.ethPrice} ETH</span></strong>
          </div>

          <button class="btn-card-cart ${inCart ? 'in-bag' : ''}">
            ${inCart ? `
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>In Bag</span>
            ` : `
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Add to Bag</span>
            `}
          </button>
        </div>
      </div>
    `;

    // Click card image or title -> open detail
    card.querySelector('.card-media-wrapper').addEventListener('click', (e) => {
      if (e.target.closest('.card-action-btn')) return;
      openArtworkDetail(art.id);
    });

    card.querySelector('.card-title').addEventListener('click', () => {
      openArtworkDetail(art.id);
    });

    // Inspect Action
    card.querySelector('.inspect-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openArtworkDetail(art.id);
    });

    // Like Action
    card.querySelector('.like-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(art.id);
    });

    // Add to Cart Action
    card.querySelector('.btn-card-cart').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(art.id, 'personal');
    });

    return card;
  }

  // =========================================================================
  // 10. Favorites / Wishlist View
  // =========================================================================

  function toggleLike(artworkId) {
    const idx = State.likes.indexOf(artworkId);
    if (idx > -1) {
      State.likes.splice(idx, 1);
      showToast("Removed from your saved favorites", 'info');
    } else {
      State.likes.push(artworkId);
      showToast("Saved to your favorites collection", 'success');
    }
    saveLikesToStorage();
    updateFavoritesBadge();

    // Re-render relevant view
    if (State.activeView === 'favorites') {
      renderFavorites();
    } else if (State.activeView === 'gallery') {
      renderGallery();
    }
  }

  function updateFavoritesBadge() {
    DOM.navFavCount.textContent = State.likes.length;
  }

  function renderFavorites() {
    const likedArtworks = State.artworks.filter(a => State.likes.includes(a.id));
    
    if (likedArtworks.length === 0) {
      DOM.favoritesGrid.style.display = 'none';
      DOM.emptyFavoritesBox.style.display = 'block';
    } else {
      DOM.favoritesGrid.style.display = 'grid';
      DOM.emptyFavoritesBox.style.display = 'none';
      DOM.favoritesGrid.innerHTML = '';
      likedArtworks.forEach(art => {
        const card = createArtworkCard(art);
        DOM.favoritesGrid.appendChild(card);
      });
    }
  }

  // =========================================================================
  // 11. Artwork Detail View & Reviews / Ratings Modal
  // =========================================================================

  function openArtworkDetail(artworkId) {
    const art = State.artworks.find(a => a.id === artworkId);
    if (!art) return;

    State.selectedArtworkId = artworkId;
    State.selectedLicenseType = 'personal';
    DOM.modalLicPersonal.checked = true;

    DOM.modalArtImg.src = art.image;
    DOM.modalCategoryBadge.textContent = art.category;
    DOM.modalRatingPill.textContent = `★ ${art.rating}`;
    DOM.modalEditionTag.textContent = art.edition;
    DOM.modalCreatedDate.textContent = `Created ${art.createdDate}`;
    DOM.modalArtTitle.textContent = art.title;
    DOM.modalArtistAvatar.src = art.artist.avatar;
    DOM.modalArtistName.textContent = art.artist.name;
    DOM.modalArtistHandle.textContent = art.artist.handle;
    DOM.modalArtistBio.textContent = art.artist.bio;
    DOM.modalArtDesc.textContent = art.description;
    DOM.modalSpecRes.textContent = art.resolution;
    DOM.modalSpecFormat.textContent = art.format;
    DOM.modalSpecSize.textContent = art.fileSize;
    DOM.modalSpecSoftware.textContent = art.software;

    updateModalPricing(art);

    // Render Reviews
    DOM.modalAvgRatingVal.textContent = art.rating;
    DOM.modalReviewCount.textContent = (art.reviews || []).length;
    renderReviewsList(art.reviews || []);

    // Reset review form
    DOM.reviewCommentInput.value = '';
    DOM.reviewErrorMsg.style.display = 'none';
    setPickerRating(5);

    DOM.detailModal.classList.add('open');
  }

  function closeArtworkDetail() {
    DOM.detailModal.classList.remove('open');
  }

  function updateModalPricing(art) {
    const multiplier = State.selectedLicenseType === 'commercial' ? 2.2 : 1;
    const finalPrice = Math.round(art.price * multiplier);
    const finalEth = (art.ethPrice * multiplier).toFixed(3);

    DOM.modalCalculatedPrice.textContent = `$${finalPrice}`;
    DOM.modalCalculatedEth.textContent = `≈ ${finalEth} ETH`;
  }

  // Star Rating Picker
  function setPickerRating(rating) {
    DOM.selectedRatingVal.value = rating;
    const stars = DOM.starRatingPicker.querySelectorAll('.star-pick-btn');
    stars.forEach(s => {
      const r = Number(s.getAttribute('data-rating'));
      if (r <= rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    const labels = {
      1: "1 Star (Needs Improvement)",
      2: "2 Stars (Fair Concept)",
      3: "3 Stars (Good Execution)",
      4: "4 Stars (High Quality)",
      5: "5 Stars (Masterpiece)"
    };
    DOM.starRatingText.textContent = labels[rating] || `${rating} Stars`;
  }

  function renderReviewsList(reviews) {
    DOM.modalReviewsList.innerHTML = '';

    if (!reviews || reviews.length === 0) {
      DOM.modalReviewsList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 1.5rem;">
          No collector reviews recorded yet. Be the first to leave an evaluation!
        </div>
      `;
      return;
    }

    reviews.forEach(r => {
      const item = document.createElement('div');
      item.className = 'review-item';
      item.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <img src="${r.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}" alt="${r.user}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
            <div>
              <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.4rem;">
                <span>${r.user}</span>
                ${r.verified ? '<span class="brand-tag" style="font-size: 0.6rem; padding: 0.1rem 0.35rem;">Verified Collector</span>' : ''}
              </div>
              <div style="font-size: 0.7rem; color: var(--text-muted);">${r.date || 'Recently'}</div>
            </div>
          </div>

          <div style="color: var(--brand-gold); font-size: 0.85rem; font-weight: 700;">
            ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
          </div>
        </div>

        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
          ${r.comment}
        </p>
      `;
      DOM.modalReviewsList.appendChild(item);
    });
  }

  // =========================================================================
  // 12. Slide-Over Shopping Cart & License Multiplier
  // =========================================================================

  function addToCart(artworkId, license = 'personal') {
    const exists = State.cart.find(i => i.artworkId === artworkId);
    if (exists) {
      showToast("Artwork is already in your collector bag", 'info');
      openCart();
      return;
    }

    State.cart.push({
      artworkId,
      license,
      addedAt: Date.now()
    });

    saveCartToStorage();
    updateCartUI();
    showToast("Added to collector bag!", 'success');
  }

  function removeFromCart(artworkId) {
    State.cart = State.cart.filter(i => i.artworkId !== artworkId);
    saveCartToStorage();
    updateCartUI();
    renderGallery(); // update button state
    showToast("Item removed from bag", 'info');
  }

  function updateItemLicense(artworkId, license) {
    const item = State.cart.find(i => i.artworkId === artworkId);
    if (item) {
      item.license = license;
      saveCartToStorage();
      updateCartUI();
    }
  }

  function updateCartUI() {
    const count = State.cart.length;
    DOM.cartBadgeCount.textContent = count;
    DOM.cartHeaderCount.textContent = count;

    if (count === 0) {
      DOM.cartItemsList.style.display = 'none';
      DOM.cartFooterBox.style.display = 'none';
      DOM.cartEmptyView.style.display = 'block';
      return;
    }

    DOM.cartItemsList.style.display = 'flex';
    DOM.cartFooterBox.style.display = 'flex';
    DOM.cartEmptyView.style.display = 'none';

    // Render Items
    DOM.cartItemsList.innerHTML = '';
    let subtotal = 0;

    State.cart.forEach(item => {
      const art = State.artworks.find(a => a.id === item.artworkId);
      if (!art) return;

      const multiplier = item.license === 'commercial' ? 2.2 : 1;
      const price = Math.round(art.price * multiplier);
      subtotal += price;

      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <img src="${art.image}" alt="${art.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-title truncate">${art.title}</div>
          <div class="cart-item-artist">${art.artist.name} • ${art.category}</div>
          
          <div class="license-toggle-box">
            <button class="license-btn ${item.license === 'personal' ? 'active' : ''}" data-lic="personal">Personal</button>
            <button class="license-btn ${item.license === 'commercial' ? 'active' : ''}" data-lic="commercial">Commercial (2.2x)</button>
          </div>

          <div class="cart-item-price">$${price}</div>
        </div>

        <button class="cart-item-remove" title="Remove Item">✕</button>
      `;

      // License toggle buttons
      cartItemEl.querySelectorAll('.license-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const lic = btn.getAttribute('data-lic');
          updateItemLicense(art.id, lic);
        });
      });

      // Remove button
      cartItemEl.querySelector('.cart-item-remove').addEventListener('click', () => {
        removeFromCart(art.id);
      });

      DOM.cartItemsList.appendChild(cartItemEl);
    });

    // Breakdown Calculations
    const discount = State.promoCodeApplied ? Math.round(subtotal * 0.10) : 0;
    const fee = Math.round((subtotal - discount) * 0.025); // 2.5% platform fee
    const total = subtotal - discount + fee;

    DOM.cartSubtotalVal.textContent = `$${subtotal}`;
    if (State.promoCodeApplied) {
      DOM.cartDiscountRow.style.display = 'flex';
      DOM.cartDiscountVal.textContent = `-$${discount}`;
    } else {
      DOM.cartDiscountRow.style.display = 'none';
    }
    DOM.cartFeeVal.textContent = `$${fee}`;
    DOM.cartTotalVal.textContent = `$${total}`;
  }

  function openCart() {
    updateCartUI();
    DOM.cartOverlay.classList.add('open');
  }

  function closeCart() {
    DOM.cartOverlay.classList.remove('open');
  }

  // =========================================================================
  // 13. Multi-Step Checkout Workflow & Confetti Confirmation
  // =========================================================================

  function openCheckout() {
    if (State.cart.length === 0) {
      showToast("Your cart is empty. Choose an artwork first!", 'error');
      return;
    }

    closeCart();
    State.activeCheckoutStep = 1;
    updateCheckoutStepUI();

    // Pre-fill user details if logged in
    if (State.user) {
      DOM.checkoutName.value = State.user.name;
      DOM.checkoutEmail.value = State.user.email;
    }

    // Set step 1 total
    DOM.checkoutStep1Total.textContent = DOM.cartTotalVal.textContent;
    DOM.checkoutModal.classList.add('open');
  }

  function closeCheckout() {
    DOM.checkoutModal.classList.remove('open');
  }

  function updateCheckoutStepUI() {
    // Reset indicators
    DOM.stepIndicator1.classList.remove('active');
    DOM.stepIndicator2.classList.remove('active');
    DOM.stepIndicator3.classList.remove('active');

    DOM.checkoutStep1Form.style.display = 'none';
    DOM.checkoutStep2Form.style.display = 'none';
    DOM.checkoutStep3Confirmation.style.display = 'none';

    if (State.activeCheckoutStep === 1) {
      DOM.stepIndicator1.classList.add('active');
      DOM.checkoutStep1Form.style.display = 'block';
    } else if (State.activeCheckoutStep === 2) {
      DOM.stepIndicator1.classList.add('active');
      DOM.stepIndicator2.classList.add('active');
      DOM.checkoutStep2Form.style.display = 'block';
    } else if (State.activeCheckoutStep === 3) {
      DOM.stepIndicator1.classList.add('active');
      DOM.stepIndicator2.classList.add('active');
      DOM.stepIndicator3.classList.add('active');
      DOM.checkoutStep3Confirmation.style.display = 'block';
    }
  }

  function executePaymentSuccess() {
    // Confetti celebration
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    const orderId = `AETH-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    DOM.receiptOrderId.textContent = `#${orderId}`;

    // Collect purchased items info
    const purchasedItems = State.cart.map(item => {
      const art = State.artworks.find(a => a.id === item.artworkId);
      const multiplier = item.license === 'commercial' ? 2.2 : 1;
      return {
        title: art ? art.title : "Digital Asset",
        artist: art ? art.artist.name : "Curated Artist",
        price: art ? Math.round(art.price * multiplier) : 0,
        license: item.license === 'commercial' ? 'Extended Commercial License' : 'Personal Exhibition License',
        format: art ? art.format : '8K Master Archive',
        image: art ? art.image : ''
      };
    });

    // Populate receipt download vault list
    DOM.receiptDownloadList.innerHTML = '';
    purchasedItems.forEach(item => {
      const row = document.createElement('div');
      row.className = 'download-vault-item';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;" />
          <div>
            <div style="font-weight: 700; font-size: 0.85rem;">${item.title}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${item.format} • ${item.license}</div>
          </div>
        </div>

        <button class="btn-primary" style="padding: 0.45rem 0.95rem; font-size: 0.75rem; background: var(--brand-violet);" onclick="alert('Simulated high-speed download initiated: ${item.title.replace(/'/g, "")}_Master_Archive.zip')">
          ↓ Download Vault
        </button>
      `;
      DOM.receiptDownloadList.appendChild(row);
    });

    // Add order to history
    const newOrder = {
      orderId,
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      collectorName: DOM.checkoutName.value.trim(),
      paymentMethod: State.selectedPaymentMethod === 'card' ? 'Credit Card (•••• 4242)' : State.selectedPaymentMethod === 'upi' ? 'Instant UPI Pay' : 'MetaMask Crypto',
      total: DOM.cartTotalVal.textContent.replace('$', ''),
      items: purchasedItems
    };

    State.orders.unshift(newOrder);
    saveOrdersToStorage();

    // Clear cart
    State.cart = [];
    saveCartToStorage();
    updateCartUI();
    renderGallery();

    State.activeCheckoutStep = 3;
    updateCheckoutStepUI();
    showToast("Acquisition confirmed! Asset files unlocked in your vault.", 'success');
  }

  // =========================================================================
  // 14. Admin Studio Dashboard (Full CRUD Operations)
  // =========================================================================

  function renderAdminDashboard() {
    // Update Stats
    const totalRev = State.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 14200);
    DOM.statRevenue.textContent = `$${totalRev.toLocaleString()}`;
    DOM.statActiveArtworks.textContent = State.artworks.length;
    DOM.statTotalOrders.textContent = State.orders.length + 27;

    const avgScore = (State.artworks.reduce((s, a) => s + (a.rating || 4.8), 0) / State.artworks.length).toFixed(1);
    DOM.statAvgRating.textContent = `${avgScore} ★`;

    // Populate Table
    DOM.adminTableBody.innerHTML = '';
    State.artworks.forEach(art => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="table-art-preview">
            <img src="${art.image}" alt="${art.title}" class="table-art-img" />
            <div>
              <div style="font-weight: 700; font-size: 0.9rem;">${art.title}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${art.resolution}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 600;">${art.artist.name}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${art.artist.handle}</div>
        </td>
        <td>
          <span class="cat-pill" style="font-size: 0.72rem; padding: 0.25rem 0.6rem;">${art.category}</span>
        </td>
        <td>
          <div style="font-weight: 800;">$${art.price}</div>
          <div style="font-size: 0.72rem; color: var(--brand-cyan);">≈ ${art.ethPrice} ETH</div>
        </td>
        <td>
          <span style="color: var(--brand-gold); font-weight: 700;">★ ${art.rating}</span>
        </td>
        <td>
          <button class="toggle-spotlight-btn btn-secondary" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; border-color: ${art.featured ? 'var(--brand-violet)' : 'var(--border-subtle)'}; color: ${art.featured ? 'var(--brand-violet)' : 'var(--text-muted)'};">
            ${art.featured ? '★ Spotlight Drop' : 'Standard'}
          </button>
        </td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="admin-edit-btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;" title="Edit Artwork">
              Edit
            </button>
            <button class="admin-delete-btn btn-danger" style="padding: 0.35rem 0.7rem; font-size: 0.75rem; border-radius: var(--radius-sm);" title="Delete Artwork">
              Delete
            </button>
          </div>
        </td>
      `;

      // Spotlight toggle
      tr.querySelector('.toggle-spotlight-btn').addEventListener('click', () => {
        art.featured = !art.featured;
        saveArtworksToStorage();
        renderAdminDashboard();
        renderHero();
        showToast(`Spotlight Drop status updated for "${art.title}"`, 'info');
      });

      // Edit artwork
      tr.querySelector('.admin-edit-btn').addEventListener('click', () => {
        openAdminModal('edit', art);
      });

      // Delete artwork
      tr.querySelector('.admin-delete-btn').addEventListener('click', () => {
        openDeleteConfirm(art.id, art.title);
      });

      DOM.adminTableBody.appendChild(tr);
    });
  }

  // Admin Modal: Create or Edit
  function openAdminModal(mode = 'create', artwork = null) {
    if (mode === 'create') {
      State.editingArtworkId = null;
      DOM.adminModalTitle.textContent = "Add New Digital Artwork";
      DOM.adminSubmitBtnText.textContent = "Save Artwork to Catalogue";
      DOM.adminFormArtId.value = "";
      DOM.adminArtTitle.value = "";
      DOM.adminArtistName.value = State.user ? State.user.name : "Elena Rostova";
      DOM.adminArtistHandle.value = "@studio_creative";
      DOM.adminArtCategory.value = "3D Renders";
      DOM.adminArtPrice.value = "320";
      DOM.adminArtImage.value = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85";
      DOM.adminArtResolution.value = "7680 × 4320 (8K)";
      DOM.adminArtFormat.value = "Blender 4.2 + 8K OpenEXR";
      DOM.adminArtDesc.value = "Monumental 3D speculative architecture sculpted with procedural geometry and real-time volumetric raytracing.";
      DOM.adminArtFeatured.checked = false;
      DOM.adminImgPreviewBox.style.display = 'block';
      DOM.adminImgPreview.src = DOM.adminArtImage.value;
    } else {
      State.editingArtworkId = artwork.id;
      DOM.adminModalTitle.textContent = `Edit "${artwork.title}"`;
      DOM.adminSubmitBtnText.textContent = "Update Artwork Details";
      DOM.adminFormArtId.value = artwork.id;
      DOM.adminArtTitle.value = artwork.title;
      DOM.adminArtistName.value = artwork.artist.name;
      DOM.adminArtistHandle.value = artwork.artist.handle;
      DOM.adminArtCategory.value = artwork.category;
      DOM.adminArtPrice.value = artwork.price;
      DOM.adminArtImage.value = artwork.image;
      DOM.adminArtResolution.value = artwork.resolution;
      DOM.adminArtFormat.value = artwork.format;
      DOM.adminArtDesc.value = artwork.description;
      DOM.adminArtFeatured.checked = artwork.featured;
      DOM.adminImgPreviewBox.style.display = 'block';
      DOM.adminImgPreview.src = artwork.image;
    }

    DOM.adminArtModal.classList.add('open');
  }

  function closeAdminModal() {
    DOM.adminArtModal.classList.remove('open');
  }

  function openDeleteConfirm(artworkId, title) {
    State.deleteTargetId = artworkId;
    DOM.deleteTargetTitle.textContent = `"${title}"`;
    DOM.deleteConfirmModal.classList.add('open');
  }

  function closeDeleteConfirm() {
    DOM.deleteConfirmModal.classList.remove('open');
    State.deleteTargetId = null;
  }

  function executeDeleteArtwork() {
    if (!State.deleteTargetId) return;

    State.artworks = State.artworks.filter(a => a.id !== State.deleteTargetId);
    State.cart = State.cart.filter(item => item.artworkId !== State.deleteTargetId);
    State.likes = State.likes.filter(id => id !== State.deleteTargetId);

    saveArtworksToStorage();
    saveCartToStorage();
    saveLikesToStorage();

    closeDeleteConfirm();
    renderAdminDashboard();
    renderGallery();
    renderHero();
    updateCartUI();
    showToast("Artwork removed from catalogue", 'info');
  }

  // =========================================================================
  // 15. Orders History & Vault Modal
  // =========================================================================

  function openOrdersModal() {
    closeUserDropdown();
    DOM.ordersListContainer.innerHTML = '';

    if (State.orders.length === 0) {
      DOM.ordersEmptyState.style.display = 'block';
    } else {
      DOM.ordersEmptyState.style.display = 'none';

      State.orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'glass';
        orderCard.style.padding = '1.25rem';
        orderCard.style.borderRadius = 'var(--radius-md)';
        orderCard.style.marginBottom = '1rem';

        let itemsHtml = order.items.map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <img src="${item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80'}" style="width: 36px; height: 36px; border-radius: 6px; object-fit: cover;" />
              <div>
                <div style="font-weight: 700; font-size: 0.82rem;">${item.title}</div>
                <div style="font-size: 0.68rem; color: var(--text-muted);">${item.license} • ${item.format}</div>
              </div>
            </div>
            <button class="btn-secondary" style="padding: 0.3rem 0.65rem; font-size: 0.72rem;" onclick="alert('Re-downloading raw files for: ${item.title.replace(/'/g, "")}')">
              Download File
            </button>
          </div>
        `).join('');

        orderCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div>
              <span style="font-family: monospace; font-weight: 800; font-size: 0.9rem; color: var(--brand-cyan);">${order.orderId}</span>
              <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.5rem;">${order.date}</span>
            </div>
            <div style="font-weight: 800; font-size: 1rem; color: var(--text-primary);">$${order.total}</div>
          </div>
          <div>${itemsHtml}</div>
        `;

        DOM.ordersListContainer.appendChild(orderCard);
      });
    }

    DOM.ordersModal.classList.add('open');
  }

  function closeOrdersModal() {
    DOM.ordersModal.classList.remove('open');
  }

  // =========================================================================
  // 16. Event Listeners Setup
  // =========================================================================

  function setupEventListeners() {
    // Theme toggle
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    // Global navigation
    DOM.brandHomeBtn.addEventListener('click', () => switchView('gallery'));
    DOM.navGalleryBtn.addEventListener('click', () => switchView('gallery'));
    DOM.navFavoritesBtn.addEventListener('click', () => switchView('favorites'));
    DOM.navAdminBtn.addEventListener('click', () => switchView('admin'));

    // Search bar
    DOM.globalSearchInput.addEventListener('input', (e) => {
      State.searchQuery = e.target.value;
      DOM.catalogueSearchInput.value = State.searchQuery;
      DOM.searchClearBtn.classList.toggle('visible', State.searchQuery.length > 0);
      if (State.activeView !== 'gallery') switchView('gallery');
      renderGallery();
    });

    DOM.searchClearBtn.addEventListener('click', () => {
      State.searchQuery = '';
      DOM.globalSearchInput.value = '';
      DOM.catalogueSearchInput.value = '';
      DOM.searchClearBtn.classList.remove('visible');
      renderGallery();
    });

    DOM.catalogueSearchInput.addEventListener('input', (e) => {
      State.searchQuery = e.target.value;
      DOM.globalSearchInput.value = State.searchQuery;
      DOM.searchClearBtn.classList.toggle('visible', State.searchQuery.length > 0);
      renderGallery();
    });

    // Keyboard shortcut cmd+k / ctrl+k for search
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        DOM.globalSearchInput.focus();
      }
    });

    // Price range slider
    DOM.priceRangeSlider.addEventListener('input', (e) => {
      State.priceRange = Number(e.target.value);
      DOM.priceSliderLabel.textContent = `$${State.priceRange}`;
      renderGallery();
    });

    // Sort dropdown
    DOM.sortDropdown.addEventListener('change', (e) => {
      State.sortBy = e.target.value;
      renderGallery();
    });

    // Reset filters
    const handleResetFilters = () => {
      State.selectedCategory = 'All';
      State.priceRange = 600;
      State.searchQuery = '';
      State.sortBy = 'featured';
      DOM.globalSearchInput.value = '';
      DOM.catalogueSearchInput.value = '';
      DOM.priceRangeSlider.value = '600';
      DOM.priceSliderLabel.textContent = '$600';
      DOM.sortDropdown.value = 'featured';
      DOM.searchClearBtn.classList.remove('visible');
      renderCategoryPills();
      renderGallery();
      showToast("Filters restored to show all artworks", 'info');
    };

    DOM.resetFiltersBtn.addEventListener('click', handleResetFilters);
    DOM.emptyResetBtn.addEventListener('click', handleResetFilters);
    DOM.favBrowseBtn.addEventListener('click', () => switchView('gallery'));

    // Cart drawer interactions
    DOM.cartTriggerBtn.addEventListener('click', openCart);
    DOM.cartCloseBtn.addEventListener('click', closeCart);
    DOM.cartOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.cartOverlay) closeCart();
    });
    DOM.cartEmptyExploreBtn.addEventListener('click', () => {
      closeCart();
      switchView('gallery');
    });

    // Promo code apply
    DOM.promoApplyBtn.addEventListener('click', () => {
      const code = DOM.promoCodeInput.value.trim().toUpperCase();
      if (code === 'NEO2026' || code === 'AETHERIA') {
        State.promoCodeApplied = true;
        DOM.promoStatusMsg.style.display = 'block';
        updateCartUI();
        showToast("Promo Code NEO2026 Applied: 10% Discount!", 'success');
      } else {
        showToast("Invalid code. Try 'NEO2026' or 'AETHERIA'", 'error');
      }
    });

    // Checkout modal triggers
    DOM.cartCheckoutBtn.addEventListener('click', openCheckout);
    DOM.checkoutModalClose.addEventListener('click', closeCheckout);
    DOM.checkoutModal.addEventListener('click', (e) => {
      if (e.target === DOM.checkoutModal) closeCheckout();
    });

    // Checkout Step 1 Form
    DOM.checkoutStep1Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = DOM.checkoutName.value.trim();
      const email = DOM.checkoutEmail.value.trim();

      if (!name) {
        document.getElementById('err-checkout-name').style.display = 'block';
        return;
      }
      if (!email || !email.includes('@')) {
        document.getElementById('err-checkout-email').style.display = 'block';
        return;
      }

      State.activeCheckoutStep = 2;
      updateCheckoutStepUI();
    });

    DOM.checkoutBackStep1.addEventListener('click', () => {
      State.activeCheckoutStep = 1;
      updateCheckoutStepUI();
    });

    // Payment Method selector tabs
    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.payment-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const method = btn.getAttribute('data-method');
        State.selectedPaymentMethod = method;

        document.getElementById('payment-view-card').style.display = method === 'card' ? 'block' : 'none';
        document.getElementById('payment-view-upi').style.display = method === 'upi' ? 'block' : 'none';
        document.getElementById('payment-view-crypto').style.display = method === 'crypto' ? 'block' : 'none';
      });
    });

    // Checkout Step 2 Payment submit
    DOM.checkoutStep2Form.addEventListener('submit', (e) => {
      e.preventDefault();
      executePaymentSuccess();
    });

    DOM.receiptDoneBtn.addEventListener('click', () => {
      closeCheckout();
      switchView('gallery');
    });

    DOM.receiptPrintBtn.addEventListener('click', () => {
      window.print();
    });

    // User profile dropdown toggle
    DOM.userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.userDropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!DOM.userDropdownMenu.contains(e.target) && !DOM.userProfileBtn.contains(e.target)) {
        closeUserDropdown();
      }
    });

    // Switch demo roles
    DOM.switchRoleCollector.addEventListener('click', () => switchRole('collector'));
    DOM.switchRoleAdmin.addEventListener('click', () => switchRole('admin'));
    DOM.dropdownOrdersBtn.addEventListener('click', openOrdersModal);
    DOM.dropdownAdminBtn.addEventListener('click', () => {
      closeUserDropdown();
      switchView('admin');
    });
    DOM.dropdownLogoutBtn.addEventListener('click', () => {
      closeUserDropdown();
      openAuthModal('signin');
    });

    DOM.ordersTriggerBtn.addEventListener('click', openOrdersModal);
    DOM.ordersModalClose.addEventListener('click', closeOrdersModal);

    // Detail Modal
    DOM.detailModalClose.addEventListener('click', closeArtworkDetail);
    DOM.detailModal.addEventListener('click', (e) => {
      if (e.target === DOM.detailModal) closeArtworkDetail();
    });

    // Detail Modal license radio toggle
    DOM.modalLicPersonal.addEventListener('change', () => {
      State.selectedLicenseType = 'personal';
      const art = State.artworks.find(a => a.id === State.selectedArtworkId);
      if (art) updateModalPricing(art);
    });

    DOM.modalLicCommercial.addEventListener('change', () => {
      State.selectedLicenseType = 'commercial';
      const art = State.artworks.find(a => a.id === State.selectedArtworkId);
      if (art) updateModalPricing(art);
    });

    // Detail Modal Add to Cart
    DOM.modalAddCartBtn.addEventListener('click', () => {
      if (State.selectedArtworkId) {
        addToCart(State.selectedArtworkId, State.selectedLicenseType);
      }
    });

    // Star Rating Picker
    DOM.starRatingPicker.querySelectorAll('.star-pick-btn').forEach(star => {
      star.addEventListener('click', () => {
        const r = Number(star.getAttribute('data-rating'));
        setPickerRating(r);
      });
    });

    // Review Submit Form
    DOM.reviewSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const comment = DOM.reviewCommentInput.value.trim();
      const rating = Number(DOM.selectedRatingVal.value);

      if (!comment) {
        DOM.reviewErrorMsg.style.display = 'block';
        return;
      }
      DOM.reviewErrorMsg.style.display = 'none';

      const art = State.artworks.find(a => a.id === State.selectedArtworkId);
      if (!art) return;

      const newReview = {
        id: `rev-${Date.now()}`,
        user: State.user ? State.user.name : "Verified Collector",
        avatar: State.user ? State.user.avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        rating,
        date: "Just now",
        verified: true,
        comment
      };

      art.reviews = [newReview, ...(art.reviews || [])];
      art.reviewCount = art.reviews.length;
      const sum = art.reviews.reduce((acc, r) => acc + r.rating, 0);
      art.rating = Number((sum / art.reviews.length).toFixed(1));

      saveArtworksToStorage();
      renderReviewsList(art.reviews);
      DOM.modalAvgRatingVal.textContent = art.rating;
      DOM.modalReviewCount.textContent = art.reviewCount;
      DOM.modalRatingPill.textContent = `★ ${art.rating}`;

      DOM.reviewCommentInput.value = '';
      showToast("Collector review published successfully!", 'success');
      renderGallery(); // update card score
    });

    // Admin Add New Artwork
    DOM.adminAddArtBtn.addEventListener('click', () => {
      openAdminModal('create');
    });

    DOM.adminArtModalClose.addEventListener('click', closeAdminModal);
    DOM.adminCancelBtn.addEventListener('click', closeAdminModal);

    // Live preview of image URL in admin form
    DOM.adminArtImage.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url.startsWith('http')) {
        DOM.adminImgPreviewBox.style.display = 'block';
        DOM.adminImgPreview.src = url;
      }
    });

    // Admin Artwork Form Submit (Create or Update)
    DOM.adminArtworkForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = DOM.adminArtTitle.value.trim();
      const artistName = DOM.adminArtistName.value.trim();
      const artistHandle = DOM.adminArtistHandle.value.trim();
      const category = DOM.adminArtCategory.value;
      const price = Number(DOM.adminArtPrice.value);
      const image = DOM.adminArtImage.value.trim();
      const resolution = DOM.adminArtResolution.value.trim();
      const format = DOM.adminArtFormat.value.trim();
      const description = DOM.adminArtDesc.value.trim();
      const featured = DOM.adminArtFeatured.checked;

      if (!title || !artistName || !image || !price) {
        showToast("Please fill out all required fields", 'error');
        return;
      }

      if (featured) {
        // Unfeature others if this one is featured
        State.artworks.forEach(a => { a.featured = false; });
      }

      if (State.editingArtworkId) {
        // UPDATE existing
        const art = State.artworks.find(a => a.id === State.editingArtworkId);
        if (art) {
          art.title = title;
          art.artist.name = artistName;
          art.artist.handle = artistHandle;
          art.category = category;
          art.price = price;
          art.ethPrice = Number((price / 2400).toFixed(3));
          art.image = image;
          art.resolution = resolution;
          art.format = format;
          art.description = description;
          art.featured = featured;
          showToast(`"${art.title}" updated successfully`, 'success');
        }
      } else {
        // CREATE new artwork
        const newArt = {
          id: `art-${Date.now()}`,
          title,
          artist: {
            name: artistName,
            handle: artistHandle,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            bio: "Curated digital artist with verifiable provenance on Aetheria.",
            verified: true
          },
          category,
          price,
          ethPrice: Number((price / 2400).toFixed(3)),
          image,
          resolution,
          dimensions: "7680 × 4320 px",
          format,
          fileSize: "1.2 GB",
          software: "Blender 4.2 / Cycles",
          featured,
          rating: 5.0,
          reviewCount: 0,
          edition: "1 of 1 Masterpiece",
          createdDate: "Just Now",
          description,
          tags: ["Digital Art", category, "4K", "Curated"],
          reviews: []
        };
        State.artworks.unshift(newArt);
        showToast(`"${newArt.title}" published to live gallery catalogue!`, 'success');
      }

      saveArtworksToStorage();
      closeAdminModal();
      renderAdminDashboard();
      renderGallery();
      renderHero();
    });

    // Restore Default Catalogue
    DOM.adminResetCatalogueBtn.addEventListener('click', () => {
      if (confirm("Restore the gallery to the original 14 curated masterworks? Custom changes will be reset.")) {
        State.artworks = JSON.parse(JSON.stringify(initialArtworks));
        saveArtworksToStorage();
        renderAdminDashboard();
        renderCategoryPills();
        renderGallery();
        renderHero();
        showToast("Gallery catalogue restored to original master collection", 'info');
      }
    });

    // Delete Confirmation
    DOM.deleteCancelBtn.addEventListener('click', closeDeleteConfirm);
    DOM.deleteConfirmBtn.addEventListener('click', executeDeleteArtwork);

    // Auth Modal Forms
    DOM.authModalClose.addEventListener('click', closeAuthModal);
    DOM.authTabSignin.addEventListener('click', () => openAuthModal('signin'));
    DOM.authTabSignup.addEventListener('click', () => openAuthModal('signup'));

    DOM.signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = DOM.signinEmail.value.trim().toLowerCase();
      if (!email.includes('@')) {
        document.getElementById('err-signin-email').style.display = 'block';
        return;
      }
      document.getElementById('err-signin-email').style.display = 'none';

      State.user = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role: email.includes('admin') || email.includes('curator') ? 'admin' : 'collector',
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        badge: "Verified Collector"
      };

      saveUserToStorage();
      renderUserUI();
      closeAuthModal();
      showToast(`Welcome back, ${State.user.name}!`, 'success');
    });

    DOM.signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = DOM.signupName.value.trim();
      const email = DOM.signupEmail.value.trim().toLowerCase();
      const role = DOM.signupRole.value;
      const pwd = DOM.signupPassword.value;
      const confirmPwd = DOM.signupConfirmPassword.value;

      if (!name) {
        document.getElementById('err-signup-name').style.display = 'block';
        return;
      }
      if (!email.includes('@')) {
        document.getElementById('err-signup-email').style.display = 'block';
        return;
      }
      if (pwd.length < 6) {
        document.getElementById('err-signup-password').style.display = 'block';
        return;
      }
      if (pwd !== confirmPwd) {
        document.getElementById('err-signup-confirm').style.display = 'block';
        return;
      }

      State.user = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        badge: role === 'admin' ? "Curator / Admin" : "Verified Collector"
      };

      saveUserToStorage();
      renderUserUI();
      closeAuthModal();
      showToast(`Account created! Welcome to Aetheria, ${State.user.name}`, 'success');
      if (role === 'admin') switchView('admin');
    });

    // Password strength meter
    DOM.signupPassword.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.length === 0) {
        DOM.pwdStrengthLabel.textContent = "None";
        DOM.pwdStrengthLabel.style.color = "var(--text-muted)";
      } else if (val.length < 6) {
        DOM.pwdStrengthLabel.textContent = "Weak (min 6 chars)";
        DOM.pwdStrengthLabel.style.color = "var(--brand-rose)";
      } else if (val.length < 10) {
        DOM.pwdStrengthLabel.textContent = "Medium";
        DOM.pwdStrengthLabel.style.color = "var(--brand-gold)";
      } else {
        DOM.pwdStrengthLabel.textContent = "Strong (Optimal)";
        DOM.pwdStrengthLabel.style.color = "var(--brand-emerald)";
      }
    });

    // 1-Click Demo Login buttons in Auth Modal
    DOM.demoLoginCollectorBtn.addEventListener('click', () => {
      switchRole('collector');
      closeAuthModal();
    });

    DOM.demoLoginAdminBtn.addEventListener('click', () => {
      switchRole('admin');
      closeAuthModal();
    });

    // Footer Quick Links
    DOM.footerAdminLink.addEventListener('click', () => switchView('admin'));
    DOM.footerOrdersLink.addEventListener('click', openOrdersModal);
    DOM.footerLoginLink.addEventListener('click', () => openAuthModal('signin'));
    DOM.footerResetLink.addEventListener('click', () => DOM.adminResetCatalogueBtn.click());

    document.querySelectorAll('.footer-cat-link').forEach(link => {
      link.addEventListener('click', () => {
        const cat = link.getAttribute('data-cat');
        State.selectedCategory = cat;
        switchView('gallery');
        renderCategoryPills();
        renderGallery();
      });
    });

    // Newsletter submit
    DOM.newsletterSubmitBtn.addEventListener('click', () => {
      const email = DOM.newsletterEmail.value.trim();
      if (email.includes('@')) {
        DOM.newsletterEmail.value = '';
        showToast("Subscribed to curated drop dispatches!", 'success');
      } else {
        showToast("Please enter a valid email address", 'error');
      }
    });
  }

  // =========================================================================
  // 17. Application Initialization
  // =========================================================================

  function init() {
    initLocalStorageState();
    applyTheme(State.theme);
    renderUserUI();
    renderHero();
    startHeroCountdown();
    renderCategoryPills();
    renderGallery();
    updateFavoritesBadge();
    updateCartUI();
    setupEventListeners();
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
