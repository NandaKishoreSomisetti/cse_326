/* ArtMart — Voice Assistant (Web Speech API: speech recognition + speech synthesis)
   Works in English, Hindi and Telugu. Commands can also be typed. */

const VA_LOCALE = { en: "en-IN", hi: "hi-IN", te: "te-IN" };
const VA_EXAMPLES = {
  en: ["help", "show photography", "search Kenji", "under 3000", "sort cheapest", "open cart", "about us", "change language to Hindi"],
  hi: ["मदद", "फोटोग्राफी दिखाओ", "Kenji खोजें", "3000 से कम", "सबसे सस्ता", "कार्ट खोलो", "हमारे बारे में", "भाषा तेलुगु"],
  te: ["సహాయం", "ఫోటోగ్రఫీ చూపించు", "Kenji వెతుకు", "3000 కంటే తక్కువ", "తక్కువ ధర", "కార్ట్ తెరువు", "మా గురించి", "భాష ఇంగ్లీష్"]
};

// Keywords for each command (text is lower-cased and normalised first)
const VA_WORDS = {
  help: ["help", "what can you do", "commands", "मदद", "सहायता", "సహాయం", "సహాయము"],
  close: ["close", "बंद", "మూసివేయి", "మూసివేయండి", "మూసేయి"],
  logout: ["logout", "log out", "sign out", "लॉगआउट", "लोगआउट", "లాగౌట్"],
  checkout: ["checkout", "check out", "pay now", "चेकआउट", "चेक आउट", "చెక్అవుట్", "చెక్ అవుట్"],
  add: ["add", "buy", "डालो", "डालें", "डाल", "जोडो", "जोडें", "खरीद", "జోడించు", "జోడించండి", "కొను", "కొనండి"],
  cart: ["cart", "bag", "कार्ट", "కార్ట్"],
  search: ["search for", "search", "find", "look for", "खोजें", "खोजो", "खोज", "ढूंढो", "ढूंढें", "వెతుకు", "వెతకండి", "వెతుకుము"],
  under: ["under", "below", "less than", "cheaper than", "से कम", "कम", "కంటే తక్కువ", "లోపు"],
  low: ["cheapest", "low to high", "lowest", "cheap", "सबसे सस्ता", "सस्ता", "सस्ते", "తక్కువ ధర", "చౌక"],
  high: ["most expensive", "high to low", "highest price", "expensive", "महंगा", "महंगे", "ఎక్కువ ధర", "ఖరీదైన"],
  rating: ["top rated", "highest rated", "best rated", "rating", "best", "रेटिंग", "सबसे अच्छा", "రేటింగ్", "ఉత్తమ"],
  about: ["about", "बारे", "గురించి"],
  admin: ["admin", "dashboard", "एडमिन", "डैशबोर्ड", "అడ్మిన్", "డాష్‌బోర్డ్", "డాష్బోర్డ్"],
  shop: ["shop", "home", "gallery", "दुकान", "होम", "గ్యాలరీ", "షాప్", "హోమ్"],
  dark: ["dark", "night", "डार्क", "रात", "డార్క్", "రాత్రి"],
  light: ["light", "day mode", "लाइट", "లైట్"],
  spotlight: ["spotlight", "featured", "what's new", "read", "स्पॉटलाइट", "विशेष", "पढ़ो", "స్పాట్‌లైట్", "స్పాట్లైట్", "చదువు"],
  hi: ["hindi", "हिन्दी", "हिंदी", "హిందీ"],
  te: ["telugu", "तेलुगु", "तेलगु", "తెలుగు"],
  en: ["english", "अंग्रेजी", "इंग्लिश", "ఇంగ్లీష్", "ఆంగ్లం"]
};

const VA_CATS = [
  ["3D Renders", ["3d", "3 d", "थ्री डी", "త్రీ డీ"]],
  ["Abstract & Generative", ["abstract", "generative", "एब्स्ट्रैक्ट", "अमूर्त", "అబ్స్ట్రాక్ట్", "జనరేటివ్"]],
  ["Cyberpunk & Sci-Fi", ["cyberpunk", "cyber", "sci-fi", "sci fi", "science fiction", "साइबर", "సైబర్"]],
  ["Illustrations", ["illustration", "drawing", "चित्रण", "चित्र", "చిత్రాలు", "చిత్రం", "బొమ్మ"]],
  ["Photography", ["photography", "photo", "फोटो", "ఫోటో"]],
  ["All", ["all", "everything", "सभी", "सब कुछ", "అన్నీ", "అన్ని", "అంతా"]]
];

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let vaRec = null, vaListening = false;
let vaMuted = false;
try { vaMuted = localStorage.getItem("am_va_muted") === "1"; } catch (e) {}

// ---------- Helpers ----------
function vaNorm(s) {
  return s.toLowerCase()
    .replace(/[़‌‍]/g, "")                                   // nukta, zero-width joiners
    .replace(/[०-९]/g, (d) => d.charCodeAt(0) - 0x0966)           // Devanagari digits
    .replace(/[౦-౯]/g, (d) => d.charCodeAt(0) - 0x0C66)           // Telugu digits
    .replace(/(\d),(\d)/g, "$1$2")
    .replace(/[.?!।]+$/g, "")
    .trim();
}
function vaHas(text, key) {
  return VA_WORDS[key].some((w) => /^[a-z0-9 '-]+$/.test(w)
    ? new RegExp("(^|[^a-z])" + w + "($|[^a-z])").test(text)   // whole English words
    : text.includes(vaNorm(w)));
}
function vaStrip(text, key) {
  let out = " " + text + " ";
  VA_WORDS[key].forEach((w) => { out = out.split(vaNorm(w)).join(" "); });
  return out.replace(/\b(for|the|a|an|me|please|artwork|art)\b/g, " ").replace(/\s+/g, " ").trim();
}

function vaSay(msg) {
  vaLog(msg, "bot");
  if (vaMuted || !window.speechSynthesis) return;
  try {
    speechSynthesis.cancel();
    const text = msg.replace(/₹/g, "rupees ").replace(/[🎤🔊]/gu, "");
    const parts = text.match(/[^.!?।:]+[.!?।:]*/g) || [text];
    const v = vaSoftVoice();
    clearTimeout(vaSay.timer);
    vaSay.timer = setTimeout(() => {
      parts.forEach((part) => {
        if (!part.trim()) return;
        const u = new SpeechSynthesisUtterance(part.trim());
        u.lang = VA_LOCALE[lang];
        if (v) u.voice = v;
        // Soft, calm delivery
        u.volume = 0.7;   // quieter (0–1)
        u.rate = 1.0;     // normal speed (no drag)
        u.pitch = 1.05;   // slightly gentle tone
        speechSynthesis.speak(u);
      });
    }, 60);
  } catch (e) {}
}

// Pick a soft-sounding voice for the current language when the device has one
const VA_SOFT_VOICES = ["female", "samantha", "karen", "moira", "tessa", "veena", "lekha", "heera", "kalpana",
  "swara", "shruti", "neerja", "aditi", "raveena", "google हिन्दी", "google తెలుగు", "zira", "aria", "jenny"];
const vaVoiceCache = {};
if (window.speechSynthesis) speechSynthesis.addEventListener("voiceschanged", () => { for (const k in vaVoiceCache) delete vaVoiceCache[k]; });
function vaSoftVoice() {
  if (vaVoiceCache[lang]) return vaVoiceCache[lang];
  const voices = speechSynthesis.getVoices().filter((x) => x.lang && x.lang.replace("_", "-").toLowerCase().startsWith(lang));
  if (!voices.length) return null;
  const locale = VA_LOCALE[lang].toLowerCase();
  const score = (x) => {
    const name = x.name.toLowerCase();
    let sc = 0;
    if (VA_SOFT_VOICES.some((w) => name.includes(w))) sc += 2;
    if (x.lang.replace("_", "-").toLowerCase() === locale) sc += 1;   // Indian accent first
    if (x.localService) sc += 4;                                      // on-device voice = no network lag
    return sc;
  };
  return (vaVoiceCache[lang] = voices.slice().sort((a, b) => score(b) - score(a))[0]);
}

function vaLog(msg, who) {
  const div = document.createElement("div");
  div.className = "va-msg " + who;
  div.textContent = msg;
  $("#vaLog").appendChild(div);
  $("#vaLog").scrollTop = $("#vaLog").scrollHeight;
}

function vaNeedLogin() {
  if (user) return false;
  showView("auth");
  vaSay(t("vaLoginFirst"));
  return true;
}

function vaFindArt(text) {
  let best = null, bestScore = 0;
  artworks.forEach((a) => {
    let score = 0;
    const words = (a.title + " " + artTitle(a)).toLowerCase().split(/[\s:,-]+/).filter((w) => w.length > 3);
    words.forEach((w) => { if (text.includes(vaNorm(w))) score++; });
    if (score > bestScore) { best = a; bestScore = score; }
  });
  return best;
}

function vaGoShop(toTop) {
  closeModal(); closeCart();
  if ($("#view-shop").classList.contains("hidden")) showView("shop");
  setTimeout(() => {
    if (toTop) window.scrollTo({ top: 0, behavior: "smooth" });
    else $(".filters").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

// ---------- Command handler ----------
function vaHandle(raw) {
  const text = vaNorm(raw);
  if (!text) return;
  vaLog(raw, "user");

  if (vaHas(text, "help")) return vaSay(t("vaHelp"));

  // Language change
  for (const code of ["hi", "te", "en"]) {
    if (vaHas(text, code)) {
      if (code !== lang) {
        $("#langSel").value = code;
        $("#langSel").dispatchEvent(new Event("change"));
      }
      return vaSay(t("vaLang"));
    }
  }

  if (vaHas(text, "close")) { closeModal(); closeCart(); return vaSay(t("vaClosed")); }

  if (vaHas(text, "dark")) {
    if (!document.body.classList.contains("dark")) $("#themeBtn").click();
    return vaSay(t("vaDark"));
  }
  if (vaHas(text, "light")) {
    if (document.body.classList.contains("dark")) $("#themeBtn").click();
    return vaSay(t("vaLight"));
  }

  if (vaHas(text, "about")) { closeModal(); closeCart(); showView("about"); return vaSay(t("vaAbout")); }

  if (vaHas(text, "logout")) {
    if (user) { $("#authBtn").click(); return vaSay(t("tLoggedOut")); }
    return vaSay(t("vaLoginFirst"));
  }

  if (vaHas(text, "admin")) {
    if (vaNeedLogin()) return;
    if (user.role !== "admin") return vaSay(t("vaNoAdmin"));
    closeModal(); closeCart(); showView("admin");
    return vaSay(t("vaAdmin"));
  }

  if (vaHas(text, "checkout")) {
    if (vaNeedLogin()) return;
    if (!cart.length) return vaSay(t("emptyCart"));
    startCheckout();
    return vaSay(t("vaCheckout"));
  }

  // Add an artwork to the cart (by name, the one that is open, or the spotlight)
  if (vaHas(text, "add")) {
    if (vaNeedLogin()) return;
    const a = vaFindArt(text) || findArt(vaCurrentArt) || artworks.find((x) => x.featured) || artworks[0];
    if (!a) return vaSay(t("noArt"));
    const already = cart.some((c) => c.id === a.id);
    addToCart(a.id);
    return vaSay(already ? t("tAlready") : artTitle(a) + " — " + t("tAdded"));
  }

  if (vaHas(text, "cart")) {
    if (vaNeedLogin()) return;
    closeModal(); openCart();
    return vaSay(cart.length ? t("vaCartOpen") + " (" + cart.length + ")" : t("emptyCart"));
  }

  // Price limit: "under 3000"
  const num = text.match(/\d{3,6}/);
  if (num && vaHas(text, "under")) {
    if (vaNeedLogin()) return;
    const n = Math.max(1000, Math.min(5000, +num[0]));
    filters.maxPrice = n;
    $("#priceRange").value = n;
    $("#priceLabel").textContent = money(n);
    vaGoShop(); renderGrid();
    return vaSay(t("vaUnder") + " " + money(n));
  }

  // Sorting
  for (const key of ["low", "high", "rating"]) {
    if (vaHas(text, key)) {
      if (vaNeedLogin()) return;
      filters.sort = key;
      $("#sort").value = key;
      vaGoShop(); renderGrid();
      return vaSay(t("vaSorted") + ": " + t(key));
    }
  }

  // Search
  if (vaHas(text, "search")) {
    if (vaNeedLogin()) return;
    const q = vaStrip(text, "search");
    filters.search = q;
    $("#search").value = q;
    filters.category = "All"; renderPills();               // search the whole collection
    filters.maxPrice = 5000; $("#priceRange").value = 5000; $("#priceLabel").textContent = money(5000);
    vaGoShop(); renderGrid();
    const n = $$("#grid .art-card").length;
    return vaSay(t("vaSearching") + " \"" + q + "\" — " + n + " " + t("found"));
  }

  // Category
  for (const [cat, words] of VA_CATS) {
    if (words.some((w) => (/^[a-z0-9 -]+$/.test(w) ? new RegExp("(^|[^a-z])" + w + "($|[^a-z])").test(text) : text.includes(vaNorm(w))))) {
      if (vaNeedLogin()) return;
      filters.category = cat;
      filters.search = ""; $("#search").value = "";
      renderPills();
      vaGoShop(); renderGrid();
      const n = $$("#grid .art-card").length;
      return vaSay(t("vaShowing") + " " + t(cat) + " — " + n + " " + t("found"));
    }
  }

  if (vaHas(text, "spotlight")) {
    const a = artworks.find((x) => x.featured) || artworks[0];
    if (!a) return vaSay(t("noArt"));
    return vaSay(t("vaSpotlight") + " " + artTitle(a) + ", " + t("by") + " " + a.artist.name + ", " + money(a.price));
  }

  if (vaHas(text, "shop")) {
    if (vaNeedLogin()) return;
    vaGoShop(true);
    return vaSay(t("vaShop"));
  }

  // Last try: an artwork name → open its details
  const a = vaFindArt(text);
  if (a) {
    if (vaNeedLogin()) return;
    vaGoShop(); openDetail(a.id);
    return vaSay(artTitle(a) + " — " + money(a.price));
  }

  vaSay(t("vaNotUnderstood"));
}

// Remember which artwork is open so "add to cart" works on it
let vaCurrentArt = null;
const vaOrigOpenDetail = openDetail;
openDetail = function (id) { vaCurrentArt = id; vaOrigOpenDetail(id); };

// ---------- Microphone ----------
function vaStartListening() {
  if (!SR) { vaSay(t("vaUnsupported")); $("#vaInput").focus(); return; }
  if (vaListening) { vaRec.stop(); return; }
  try { speechSynthesis.cancel(); } catch (e) {}
  vaRec = new SR();
  vaRec.lang = VA_LOCALE[lang];
  vaRec.interimResults = true;
  vaRec.maxAlternatives = 1;
  vaRec.onstart = () => { vaListening = true; vaSetListening(true); };
  let done = false, quietTimer = null;
  const finish = (text) => {
    if (done) return;
    done = true;
    clearTimeout(quietTimer);
    $("#vaInput").value = "";
    try { vaRec.abort(); } catch (err) {}
    vaHandle(text);
  };
  vaRec.onresult = (e) => {
    const r = e.results[e.results.length - 1];
    const text = r[0].transcript;
    $("#vaInput").value = text;
    if (r.isFinal) return finish(text);
    clearTimeout(quietTimer);
    quietTimer = setTimeout(() => finish(text), 800);   // user paused → respond right away
  };
  vaRec.onerror = (e) => {
    if (done || e.error === "aborted") return;
    vaSay(e.error === "not-allowed" || e.error === "service-not-allowed" ? t("vaMicBlocked") :
          e.error === "no-speech" ? t("vaNoSpeech") : t("vaNotUnderstood"));
  };
  vaRec.onend = () => { vaListening = false; vaSetListening(false); };
  vaRec.start();
}

function vaSetListening(on) {
  $("#vaMic").classList.toggle("listening", on);
  $("#vaBtn").classList.toggle("listening", on);
  $("#vaStatus").textContent = on ? t("vaListening") : "";
}

// ---------- Panel ----------
function vaRenderChips() {
  $("#vaChips").innerHTML = VA_EXAMPLES[lang].map((x) => `<button type="button" class="va-chip">${x}</button>`).join("");
}

function vaWarmUp() {
  if (vaWarmUp.done || !window.speechSynthesis) return;
  vaWarmUp.done = true;
  try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); vaSoftVoice(); } catch (e) {}
}

function vaClosePanel() {
  const p = $("#vaPanel");
  if (p.classList.contains("hidden")) return;
  p.classList.add("closing");
  setTimeout(() => { p.classList.add("hidden"); p.classList.remove("closing"); }, 200);
  if (vaListening) vaRec.abort();
}

function vaOpen() {
  vaWarmUp();
  $("#vaPanel").classList.remove("hidden", "closing");
  if (!$("#vaLog").children.length) vaLog(t("vaHello"), "bot");
}

function vaSetup() {
  vaRenderChips();
  $("#vaMute").textContent = vaMuted ? "🔇" : "🔊";
  $("#vaBtn").addEventListener("click", () => {
    if ($("#vaPanel").classList.contains("hidden")) { vaOpen(); vaStartListening(); }
    else vaClosePanel();
  });
  $("#vaClose").addEventListener("click", vaClosePanel);
  $("#vaMic").addEventListener("click", vaStartListening);
  $("#vaMute").addEventListener("click", () => {
    vaMuted = !vaMuted;
    $("#vaMute").textContent = vaMuted ? "🔇" : "🔊";
    try { localStorage.setItem("am_va_muted", vaMuted ? "1" : "0"); speechSynthesis.cancel(); } catch (e) {}
  });
  $("#vaForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $("#vaInput").value;
    $("#vaInput").value = "";
    vaHandle(v);
  });
  $("#vaChips").addEventListener("click", (e) => { if (e.target.classList.contains("va-chip")) vaHandle(e.target.textContent); });
  $("#langSel").addEventListener("change", vaRenderChips);
  if (window.speechSynthesis) speechSynthesis.getVoices();   // pre-load voices
}
vaSetup();
