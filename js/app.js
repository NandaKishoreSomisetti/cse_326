/* ArtMart — simple Digital Art Marketplace (vanilla JS) */

// ---------- Storage helpers ----------
const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
};

// ---------- State ----------
let artworks = store.get("am_artworks_v3", null) || JSON.parse(JSON.stringify(initialArtworks));
let cart = store.get("am_cart_v3", []);          // [{id, license}]
let user = store.get("am_user", null);
let users = store.get("am_users", []);
let orders = store.get("am_orders_v3", []);
let filters = { category: "All", search: "", maxPrice: 5000, sort: "featured" };

const FEE_RATE = 0.05;
const LICENSES = { personal: { label: "Personal", mult: 1 }, commercial: { label: "Commercial", mult: 2 } };

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const money = (n) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
const small = (url, w) => url.replace(/w=\d+/, "w=" + w);   // load lighter images
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const findArt = (id) => artworks.find((a) => a.id === id);

function save() {
  store.set("am_artworks_v3", artworks);
  store.set("am_cart_v3", cart);
  store.set("am_user", user);
  store.set("am_users", users);
  store.set("am_orders_v3", orders);
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.add("hidden"), 2200);
}

// ---------- Views ----------
function showView(name) {
  if (!user && name !== "about") name = "auth";     // login page comes first (About Us is public)
  if (name === "admin" && user.role !== "admin") name = "shop";
  if (name === "about") {
    $("#statArtCount").textContent = artworks.length;
    $("#statArtistCount").textContent = new Set(artworks.map((a) => a.artist.name)).size;
    $("#statCatCount").textContent = CATEGORIES.length - 1;
  }
  $$(".view").forEach((v) => v.classList.add("hidden"));
  $("#view-" + name).classList.remove("hidden");
  if (name === "admin") renderAdmin();
  window.scrollTo(0, 0);
}

function renderNav() {
  $("#authBtn").textContent = user ? t("logout") + " (" + user.name.split(" ")[0] + ")" : t("login");
  $$(".admin-only").forEach((el) => el.classList.toggle("hidden", !user || user.role !== "admin"));
  $("#cartCount").textContent = cart.length;
  updateEyeTitles();
}

// ---------- Hero ----------
function renderHero() {
  const art = artworks.find((a) => a.featured) || artworks[0];
  if (!art) { $("#hero").innerHTML = "<p class='muted'>" + t("noArt") + "</p>"; return; }
  $("#hero").innerHTML = `
    <div class="frame"><img src="${small(art.image, 900)}" alt="${esc(artTitle(art))}"></div>
    <div>
      <span class="tag">${t("spotlight")}</span>
      <h1>${esc(artTitle(art))}</h1>
      <p>${t("by")} ${esc(art.artist.name)} · ${t(art.category)}</p>
      <p>${esc(artDesc(art)).slice(0, 140)}...</p>
      <div class="price">${money(art.price)}</div>
      <div class="actions">
        <button class="btn" onclick="addToCart('${art.id}')">${t("addToCart")}</button>
        <button class="btn btn-outline" onclick="openDetail('${art.id}')">${t("preview")}</button>
      </div>
    </div>`;
}

// ---------- Catalogue ----------
function renderPills() {
  $("#pills").innerHTML = CATEGORIES.map((c) =>
    `<button class="pill ${c === filters.category ? "active" : ""}" data-cat="${c}">${t(c)}</button>`).join("");
}

function renderGrid() {
  const q = filters.search.toLowerCase();
  let list = artworks.filter((a) =>
    (filters.category === "All" || a.category === filters.category) &&
    a.price <= filters.maxPrice &&
    (a.title.toLowerCase().includes(q) || artTitle(a).toLowerCase().includes(q) || a.artist.name.toLowerCase().includes(q)));

  if (filters.sort === "low") list.sort((a, b) => a.price - b.price);
  if (filters.sort === "high") list.sort((a, b) => b.price - a.price);
  if (filters.sort === "rating") list.sort((a, b) => b.rating - a.rating);
  if (filters.sort === "featured") list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  $("#resultCount").textContent = list.length + " " + t("found");
  $("#grid").innerHTML = list.length ? list.map((a) => `
    <div class="card art-card" onclick="openDetail('${a.id}')">
      <div class="art-img">
        <img src="${small(a.image, 500)}" alt="${esc(artTitle(a))}" loading="lazy">
        <span class="cat-badge">${t(a.category)}</span>
        <div class="quick">
          <button onclick="event.stopPropagation(); openDetail('${a.id}')">${t("view")}</button>
          <button onclick="event.stopPropagation(); addToCart('${a.id}')">+ Cart</button>
        </div>
      </div>
      <div class="art-body">
        <h4>${esc(artTitle(a))}</h4>
        <div class="artist"><img src="${small(a.artist.avatar, 60)}" alt="">${esc(a.artist.name)}</div>
        <div class="art-foot">
          <span class="stars">${stars(a.rating)} <span class="muted">${a.rating.toFixed(1)}</span></span>
          <span class="price">${money(a.price)}</span>
        </div>
      </div>
    </div>`).join("") : `<div class="empty">${t("noMatch")}</div>`;
}

function renderShop() { renderHero(); renderPills(); renderGrid(); }

// ---------- Modal ----------
function openModal(html) {
  $("#modalBody").innerHTML = html;
  $("#modal").classList.remove("hidden");
}
function closeModal() { $("#modal").classList.add("hidden"); }

// ---------- Detail + reviews ----------
let pickedRating = 0;

function openDetail(id) {
  const a = findArt(id);
  if (!a) return;
  pickedRating = 0;
  openModal(`
    <div class="detail">
      <div>
        <div class="frame"><img src="${small(a.image, 900)}" alt="${esc(artTitle(a))}"></div>
        <div class="bio"><strong>${esc(a.artist.name)}</strong><br>${esc(artBio(a))}</div>
      </div>
      <div>
        <span class="muted">${t(a.category)}</span>
        <h2>${esc(artTitle(a))}</h2>
        <div class="stars">${stars(a.rating)} <span class="muted">${a.rating.toFixed(1)} (${a.reviewCount} ${t("reviewWord")})</span></div>
        <p style="margin-top:10px">${esc(artDesc(a))}</p>
        <div class="specs">
          <div><b>${t("resolution")}</b>${esc(a.resolution || "-")}</div>
          <div><b>${t("fileSize")}</b>${esc(a.fileSize || "-")}</div>
          <div><b>${t("format")}</b>${esc(a.format || "-")}</div>
          <div><b>${t("license")}</b>${t("licVal")}</div>
        </div>
        <h2>${money(a.price)}</h2>
        <button class="btn full" onclick="addToCart('${a.id}')">${t("addToCart")}</button>
      </div>
    </div>
    <div class="reviews">
      <h3>${t("reviews")}</h3>
      <div id="reviewList">${renderReviews(a)}</div>
      <h4 style="margin-top:16px">${t("writeReview")}</h4>
      <div class="star-pick" id="starPick">${[1, 2, 3, 4, 5].map((n) => `<span data-n="${n}">★</span>`).join("")}</div>
      <textarea id="reviewText" rows="3" placeholder="${t("reviewPh")}"></textarea>
      <small class="error" id="reviewErr"></small>
      <button class="btn" onclick="submitReview('${a.id}')">${t("submitReview")}</button>
    </div>`);

  $$("#starPick span").forEach((s) => s.addEventListener("click", () => {
    pickedRating = +s.dataset.n;
    $$("#starPick span").forEach((x) => x.classList.toggle("on", +x.dataset.n <= pickedRating));
  }));
}

function renderReviews(a) {
  if (!a.reviews || !a.reviews.length) return "<p class='muted'>" + t("noReviews") + "</p>";
  return a.reviews.map((r) => `
    <div class="review">
      <strong>${esc(r.user)}</strong><span class="stars">${stars(r.rating)}</span>
      <span class="muted"> · ${esc(r.date)}</span>
      <p>${esc(r.comment)}</p>
    </div>`).join("");
}

function submitReview(id) {
  const a = findArt(id);
  const text = $("#reviewText").value.trim();
  const err = $("#reviewErr");
  if (!user) { err.textContent = t("errLoginReview"); return; }
  if (!pickedRating) { err.textContent = t("errStar"); return; }
  if (text.length < 5) { err.textContent = t("errReviewLen"); return; }

  a.reviews = a.reviews || [];
  a.reviews.unshift({ id: "rev-" + Date.now(), user: user.name, rating: pickedRating, date: t("justNow"), comment: text });
  a.rating = (a.rating * a.reviewCount + pickedRating) / (a.reviewCount + 1);
  a.reviewCount += 1;
  save();
  toast(t("tReview"));
  openDetail(id);
  renderGrid();
}

// ---------- Cart ----------
function addToCart(id) {
  if (cart.some((c) => c.id === id)) { toast(t("tAlready")); return; }
  cart.push({ id, license: "personal" });
  save();
  renderNav();
  toast(t("tAdded"));
}

function cartTotals() {
  const subtotal = cart.reduce((sum, c) => {
    const a = findArt(c.id);
    return a ? sum + a.price * LICENSES[c.license].mult : sum;
  }, 0);
  const fee = subtotal * FEE_RATE;
  return { subtotal, fee, total: subtotal + fee };
}

function renderCart() {
  cart = cart.filter((c) => findArt(c.id));     // drop deleted artworks
  if (!cart.length) {
    $("#cartItems").innerHTML = "<p class='muted' style='padding:20px 0'>" + t("emptyCart") + "</p>";
    $("#cartSummary").innerHTML = "";
    renderNav();
    return;
  }
  $("#cartItems").innerHTML = cart.map((c, i) => {
    const a = findArt(c.id);
    return `
      <div class="cart-item">
        <img src="${small(a.image, 150)}" alt="">
        <div class="info">
          <strong>${esc(artTitle(a))}</strong>
          <div class="muted">${esc(a.artist.name)}</div>
          <select onchange="setLicense(${i}, this.value)">
            <option value="personal" ${c.license === "personal" ? "selected" : ""}>${t("personalLic")}</option>
            <option value="commercial" ${c.license === "commercial" ? "selected" : ""}>${t("commercialLic")}</option>
          </select>
          <div class="row"><span>${money(a.price * LICENSES[c.license].mult)}</span>
            <button class="remove" onclick="removeFromCart(${i})">${t("remove")}</button></div>
        </div>
      </div>`;
  }).join("");
  const tot = cartTotals();
  $("#cartSummary").innerHTML = `
    <div class="row"><span>${t("subtotal")}</span><span>${money(tot.subtotal)}</span></div>
    <div class="row"><span>${t("fee")}</span><span>${money(tot.fee)}</span></div>
    <div class="row total"><span>${t("total")}</span><span>${money(tot.total)}</span></div>
    <button class="btn full" onclick="startCheckout()">${t("checkout")}</button>`;
  renderNav();
}

function setLicense(i, value) { cart[i].license = value; save(); renderCart(); }
function removeFromCart(i) { cart.splice(i, 1); save(); renderCart(); toast(t("tRemoved")); }
function openCart() { renderCart(); $("#cartOverlay").classList.remove("hidden"); }
function closeCart() { $("#cartOverlay").classList.add("hidden"); }

// ---------- Checkout ----------
let billing = {};
let payMethod = "Card";

function stepsBar(n) {
  return `<div class="steps">${[t("billing"), t("payment"), t("receipt")]
    .map((s, i) => `<span class="${i + 1 === n ? "active" : ""}">${s}</span>`).join("")}</div>`;
}

function startCheckout() {
  closeCart();
  openModal(`
    <h2>${t("checkout")}</h2><br>${stepsBar(1)}
    <form id="billingForm" novalidate>
      <div class="form-grid">
        <div><label>${t("fullName")} <input id="bName" value="${esc(user ? user.name : "")}"></label><small class="error" id="bNameErr"></small></div>
        <div><label>${t("email")} <input id="bEmail" type="email" value="${esc(user ? user.email : "")}"></label><small class="error" id="bEmailErr"></small></div>
        <div class="wide"><label>${t("address")} <input id="bAddr"></label><small class="error" id="bAddrErr"></small></div>
        <div><label>${t("city")} <input id="bCity"></label><small class="error" id="bCityErr"></small></div>
        <div><label>${t("country")} <input id="bCountry" value="India"></label><small class="error" id="bCountryErr"></small></div>
      </div>
      <button class="btn full" type="submit">${t("continuePay")}</button>
    </form>`);

  $("#billingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = { bName: $("#bName").value.trim(), bEmail: $("#bEmail").value.trim(), bAddr: $("#bAddr").value.trim(),
                bCity: $("#bCity").value.trim(), bCountry: $("#bCountry").value.trim() };
    let ok = true;
    for (const k in f) {
      let msg = f[k] ? "" : t("errRequired");
      if (k === "bEmail" && f[k] && !EMAIL_RE.test(f[k])) msg = t("errEmail");
      $("#" + k + "Err").textContent = msg;
      if (msg) ok = false;
    }
    if (ok) { billing = f; paymentStep(); }
  });
}

function paymentStep() {
  const tot = cartTotals();
  openModal(`
    <h2>${t("checkout")}</h2><br>${stepsBar(2)}
    <p class="muted">${t("chooseMethod")}</p>
    <div class="pay-options">
      ${["Card", "UPI", "Crypto Wallet"].map((m) =>
        `<button class="pay-opt ${m === payMethod ? "active" : ""}" data-pay="${m}">${m === "Card" ? "💳" : m === "UPI" ? "📱" : "🪙"} ${m}</button>`).join("")}
    </div>
    <div id="payFields"></div>
    <small class="error" id="payErr"></small>
    <div class="row total"><span>${t("totalToPay")}</span><span>${money(tot.total)}</span></div>
    <button class="btn full" id="payBtn">${t("pay")} ${money(tot.total)}</button>`);

  const fields = () => {
    $("#payFields").innerHTML =
      payMethod === "Card" ? `<label>Card number <input id="payInput" maxlength="19" placeholder="4242 4242 4242 4242"></label>` :
      payMethod === "UPI" ? `<label>UPI ID <input id="payInput" placeholder="name@upi"></label>` :
      `<label>Wallet address <input id="payInput" placeholder="0x..."></label>`;
  };
  fields();
  $$(".pay-opt").forEach((b) => b.addEventListener("click", () => {
    payMethod = b.dataset.pay;
    $$(".pay-opt").forEach((x) => x.classList.toggle("active", x === b));
    fields();
    $("#payErr").textContent = "";
  }));
  $("#payBtn").addEventListener("click", () => {
    const v = $("#payInput").value.trim();
    let msg = "";
    if (payMethod === "Card" && v.replace(/\s/g, "").length !== 16) msg = t("errCard");
    if (payMethod === "UPI" && !/^[\w.-]+@[\w]+$/.test(v)) msg = t("errUpi");
    if (payMethod === "Crypto Wallet" && !/^0x[a-fA-F0-9]{8,}$/.test(v)) msg = t("errWallet");
    $("#payErr").textContent = msg;
    if (!msg) placeOrder();
  });
}

function placeOrder() {
  const tot = cartTotals();
  const order = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleString(),
    items: cart.map((c) => ({ title: artTitle(findArt(c.id)), license: LICENSES[c.license].label, price: findArt(c.id).price * LICENSES[c.license].mult })),
    total: tot.total, method: payMethod, name: billing.bName, email: billing.bEmail
  };
  orders.push(order);
  cart = [];
  save();
  renderNav();
  openModal(`
    ${stepsBar(3)}
    <div class="receipt">
      <div class="ok">✔</div>
      <h2>${t("orderConfirmed")}</h2>
      <p class="muted">Order ${order.id} · ${order.date}</p>
      <p class="muted">Receipt sent to ${esc(order.email)} · Paid by ${order.method}</p>
      <table>
        <tr><th>Artwork</th><th>License</th><th>Price</th><th></th></tr>
        ${order.items.map((i) => `<tr><td>${esc(i.title)}</td><td>${i.license}</td><td>${money(i.price)}</td>
          <td><button class="btn btn-outline" onclick="toast(t('tDownload'))">${t("download")}</button></td></tr>`).join("")}
        <tr><td colspan="2"><strong>${t("totalPaid")}</strong></td><td colspan="2"><strong>${money(order.total)}</strong></td></tr>
      </table>
      <br><button class="btn" onclick="window.print()">${t("print")}</button>
      <button class="btn btn-outline" data-close>${t("continueShop")}</button>
    </div>`);
}

// ---------- Auth ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STRONG_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function setErr(id, msg) { $("#" + id).textContent = msg; return !msg; }

function login(u) {
  hideAllPasswords();
  user = { name: u.name, email: u.email, role: u.role };
  save();
  renderNav();
  playSplash(t("welcome") + ", " + user.name + "!", () => showView(user.role === "admin" ? "admin" : "shop"));
}

// Logo animation shown when moving from the login page to the main page
function playSplash(message, onSwitch) {
  const sp = $("#splash");
  $("#splashMsg").textContent = message;
  sp.classList.remove("hidden", "leaving");
  void sp.offsetWidth;                          // restart CSS animations
  sp.classList.add("playing");
  setTimeout(onSwitch, 650);                    // switch page behind the splash
  setTimeout(() => sp.classList.add("leaving"), 950);
  setTimeout(() => sp.classList.add("hidden"), 1300);
}

// ---------- Show / hide password (animated eye) ----------
const EYE_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path class="eye-shape" d="M2 12 C 5 6.5, 19 6.5, 22 12 C 19 17.5, 5 17.5, 2 12 Z"/>
  <g class="eye-ball"><circle class="iris" cx="12" cy="12" r="3.6"/><circle class="pupil" cx="12" cy="12" r="1.6"/><circle class="glint" cx="13.2" cy="10.8" r=".6"/></g>
  <path class="lid" d="M2 12 C 5 17.5, 19 17.5, 22 12"/>
  <g class="lashes"><path d="M5 15.2 L3.6 17"/><path d="M9 16.6 L8.4 18.8"/><path d="M15 16.6 L15.6 18.8"/><path d="M19 15.2 L20.4 17"/></g>
</svg>`;

function setupPasswordEyes() {
  $$("#view-auth input[type=password]").forEach((input) => {
    const wrap = document.createElement("span");
    wrap.className = "pw-wrap";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pw-eye";
    btn.innerHTML = EYE_SVG;
    wrap.appendChild(btn);

    const look = () => {   // pupil follows the typing (moves right as the password grows)
      const n = Math.min(input.value.length, 16);
      btn.style.setProperty("--look", (n / 16 * 6 - 3).toFixed(2) + "px");
    };
    input.addEventListener("input", look);
    look();

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.classList.toggle("open", show);
      updateEyeTitles();
      input.focus();
      const end = input.value.length;
      try { input.setSelectionRange(end, end); } catch (err) {}
    });
  });
  updateEyeTitles();
}

function updateEyeTitles() {
  $$(".pw-eye").forEach((b) => {
    const open = b.classList.contains("open");
    const label = open ? t("hidePw") : t("showPw");
    b.title = label;
    b.setAttribute("aria-label", label);
    b.setAttribute("aria-pressed", open);
  });
}

function hideAllPasswords() {
  $$(".pw-eye.open").forEach((b) => {
    b.classList.remove("open");
    b.parentNode.querySelector("input").type = "password";
  });
  updateEyeTitles();
}

function setupAuth() {
  setupPasswordEyes();
  $$(".tab").forEach((t) => t.addEventListener("click", () => {
    $$(".tab").forEach((x) => x.classList.toggle("active", x === t));
    $("#loginForm").classList.toggle("hidden", t.dataset.tab !== "login");
    $("#registerForm").classList.toggle("hidden", t.dataset.tab !== "register");
  }));

  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim().toLowerCase();
    const pass = $("#loginPass").value;
    let ok = setErr("loginEmailErr", !email ? t("errEmailReq") : !EMAIL_RE.test(email) ? t("errEmail") : "");
    ok = setErr("loginPassErr", pass ? "" : t("errPassReq")) && ok;
    if (!ok) return;
    const found = users.find((u) => u.email === email);
    if (!found || found.password !== pass) { setErr("loginPassErr", t("errWrong")); return; }
    e.target.reset();
    login(found);
  });

  $("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#regName").value.trim();
    const email = $("#regEmail").value.trim().toLowerCase();
    const pass = $("#regPass").value;
    const confirm = $("#regConfirm").value;
    let ok = setErr("regNameErr", name.length < 2 ? t("errName") : "");
    ok = setErr("regEmailErr", !EMAIL_RE.test(email) ? t("errEmail") :
      users.some((u) => u.email === email) ? t("errExists") : "") && ok;
    ok = setErr("regPassErr", STRONG_RE.test(pass) ? "" : t("errStrong")) && ok;
    ok = setErr("regConfirmErr", confirm && confirm === pass ? "" : t("errMatch")) && ok;
    if (!ok) return;
    const u = { name, email, password: pass, role: $("#regRole").value };
    users.push(u);
    e.target.reset();
    login(u);
  });

  $$("[data-demo]").forEach((b) => b.addEventListener("click", () => login(DEMO_USERS[b.dataset.demo])));
}

// ---------- Admin ----------
function renderAdmin() {
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  $("#stats").innerHTML = `
    <div class="card stat"><span class="muted">${t("revenue")}</span><b>${money(revenue)}</b></div>
    <div class="card stat"><span class="muted">${t("activeArt")}</span><b>${artworks.length}</b></div>
    <div class="card stat"><span class="muted">${t("totalOrders")}</span><b>${orders.length}</b></div>`;
  $("#adminTable").innerHTML = artworks.map((a) => `
    <tr>
      <td><img src="${small(a.image, 100)}" alt="">${esc(artTitle(a))}<div class="muted">${esc(a.artist.name)}</div></td>
      <td>${t(a.category)}</td>
      <td>${money(a.price)}</td>
      <td><input type="checkbox" style="width:auto" ${a.featured ? "checked" : ""} onchange="toggleFeatured('${a.id}', this.checked)"></td>
      <td>
        <button class="btn btn-outline" onclick="artForm('${a.id}')">${t("edit")}</button>
        <button class="btn btn-danger" onclick="confirmDelete('${a.id}')">${t("delete")}</button>
      </td>
    </tr>`).join("");
}

function toggleFeatured(id, value) {
  findArt(id).featured = value;
  save();
  renderShop();
  toast(value ? t("tFeatured") : t("tUnfeatured"));
}

function artForm(id) {
  const a = id ? findArt(id) : null;
  const cats = CATEGORIES.filter((c) => c !== "All");
  openModal(`
    <h2>${a ? t("editArt") : t("newArt")}</h2>
    <form id="artForm" novalidate>
      <div class="form-grid">
        <div><label>${t("fTitle")} <input id="fTitle" value="${a ? esc(a.title) : ""}"></label><small class="error" id="fTitleErr"></small></div>
        <div><label>${t("fArtist")} <input id="fArtist" value="${a ? esc(a.artist.name) : ""}"></label><small class="error" id="fArtistErr"></small></div>
        <div><label>${t("thCat")} <select id="fCat">${cats.map((c) => `<option value="${c}" ${a && a.category === c ? "selected" : ""}>${t(c)}</option>`).join("")}</select></label></div>
        <div><label>${t("fPrice")} <input id="fPrice" type="number" min="1" value="${a ? a.price : ""}"></label><small class="error" id="fPriceErr"></small></div>
        <div class="wide"><label>${t("fImg")} <input id="fImg" value="${a ? esc(a.image) : ""}" placeholder="https://..."></label><small class="error" id="fImgErr"></small></div>
        <div class="wide"><label>${t("fDesc")} <textarea id="fDesc" rows="3">${a ? esc(a.description) : ""}</textarea></label><small class="error" id="fDescErr"></small></div>
        <div class="wide"><label><input type="checkbox" id="fFeat" style="width:auto" ${a && a.featured ? "checked" : ""}> ${t("fFeat")}</label></div>
      </div>
      <button class="btn full" type="submit">${a ? t("saveChanges") : t("addArtBtn")}</button>
    </form>`);

  $("#artForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("#fTitle").value.trim(), artist = $("#fArtist").value.trim();
    const price = parseFloat($("#fPrice").value), img = $("#fImg").value.trim(), desc = $("#fDesc").value.trim();
    let ok = setErr("fTitleErr", title.length < 3 ? t("errTitle") : "");
    ok = setErr("fArtistErr", artist ? "" : t("errArtist")) && ok;
    ok = setErr("fPriceErr", price > 0 ? "" : t("errPrice")) && ok;
    ok = setErr("fImgErr", /^https?:\/\/.+/.test(img) ? "" : t("errImg")) && ok;
    ok = setErr("fDescErr", desc.length < 10 ? t("errDesc") : "") && ok;
    if (!ok) return;

    const data = { title, category: $("#fCat").value, price, image: img, description: desc, featured: $("#fFeat").checked };
    if (a) {
      Object.assign(a, data);
      a.edited = true;
      a.artist.name = artist;
      toast(t("tUpdated"));
    } else {
      artworks.unshift({
        id: "art-" + Date.now(), ...data,
        artist: { name: artist, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80", bio: "New artist on ArtMart." },
        resolution: "3840 × 2160 (4K)", format: "PNG", fileSize: "25 MB",
        rating: 0, reviewCount: 0, reviews: []
      });
      toast(t("tArtAdded"));
    }
    save();
    closeModal();
    renderAdmin();
    renderShop();
  });
}

function confirmDelete(id) {
  const a = findArt(id);
  openModal(`
    <h2>${t("delTitle")}</h2>
    <p style="margin:12px 0">${t("delSure")} <strong>${esc(artTitle(a))}</strong>? ${t("delNote")}</p>
    <button class="btn btn-danger" onclick="deleteArt('${id}')">${t("delYes")}</button>
    <button class="btn btn-outline" data-close>${t("cancel")}</button>`);
}

function deleteArt(id) {
  artworks = artworks.filter((a) => a.id !== id);
  cart = cart.filter((c) => c.id !== id);
  save();
  closeModal();
  renderAdmin();
  renderShop();
  renderNav();
  toast(t("tDeleted"));
}

// ---------- Events ----------
function setupEvents() {
  $$("[data-view]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); showView(b.dataset.view); }));

  $("#authBtn").addEventListener("click", () => {
    if (user) { user = null; save(); renderNav(); toast(t("tLoggedOut")); }
    showView("auth");
  });

  $("#search").addEventListener("input", (e) => { filters.search = e.target.value; showView("shop"); renderGrid(); });
  $("#priceRange").addEventListener("input", (e) => { filters.maxPrice = +e.target.value; $("#priceLabel").textContent = money(+e.target.value); renderGrid(); });
  $("#sort").addEventListener("change", (e) => { filters.sort = e.target.value; renderGrid(); });
  $("#pills").addEventListener("click", (e) => {
    if (!e.target.dataset.cat) return;
    filters.category = e.target.dataset.cat;
    renderPills();
    renderGrid();
  });

  $("#cartBtn").addEventListener("click", () => { if (!user) return showView("auth"); openCart(); });
  $("#cartOverlay").addEventListener("click", (e) => { if (e.target.id === "cartOverlay" || e.target.hasAttribute("data-close-cart")) closeCart(); });
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal" || e.target.hasAttribute("data-close")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeCart(); } });

  $("#addArtBtn").addEventListener("click", () => artForm(null));
  $("#resetBtn").addEventListener("click", () => {
    artworks = JSON.parse(JSON.stringify(initialArtworks));
    save();
    renderAdmin();
    renderShop();
    toast(t("tReset"));
  });

  $("#themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    $("#themeBtn").textContent = dark ? "☀️" : "🌙";
    store.set("am_theme", dark ? "dark" : "light");
  });
}

// ---------- Init ----------
function init() {
  if (store.get("am_theme", "light") === "dark") { document.body.classList.add("dark"); $("#themeBtn").textContent = "☀️"; }
  $("#langSel").innerHTML = Object.keys(LANGS).map((k) => `<option value="${k}" ${k === lang ? "selected" : ""}>${LANGS[k]}</option>`).join("");
  $("#langSel").addEventListener("change", (e) => {
    lang = e.target.value;
    $$(".error").forEach((el) => (el.textContent = ""));
    try { localStorage.setItem("am_lang", lang); } catch (err) {}
    applyLang();
    closeModal();
    renderNav();
    renderShop();
    if (!$("#cartOverlay").classList.contains("hidden")) renderCart();
    if (user && user.role === "admin") renderAdmin();
  });
  applyLang();
  setupAuth();
  setupEvents();
  renderNav();
  renderShop();
  showView("shop");   // redirects to login page when not logged in
}
init();
