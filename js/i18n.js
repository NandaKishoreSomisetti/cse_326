/* ArtMart — language translations (English, Hindi, Telugu) */
const LANGS = { en: "English", hi: "हिन्दी", te: "తెలుగు" };

const TEXT = {
  en: {
    shop: "Shop", admin: "Admin", cart: "Cart", login: "Login", logout: "Logout", register: "Register",
    search: "Search art or artist...", spotlight: "Spotlight Drop", addToCart: "Add to Cart",
    preview: "Quick Preview", view: "View", by: "by", maxPrice: "Max price",
    featured: "Featured", low: "Price: Low to High", high: "Price: High to Low", rating: "Highest Rated",
    found: "artwork(s) found", noMatch: "No artworks match your filters.",
    "All": "All", "3D Renders": "3D Renders", "Abstract & Generative": "Abstract & Generative",
    "Cyberpunk & Sci-Fi": "Cyberpunk & Sci-Fi", "Illustrations": "Illustrations", "Photography": "Photography",
    email: "Email", password: "Password", fullName: "Full name", confirmPass: "Confirm password", role: "Role",
    collectorRole: "Collector / Buyer", adminRole: "Admin / Curator", createAccount: "Create account",
    demoLogin: "Quick demo login:", collectorDemo: "Collector demo", adminDemo: "Admin demo",
    adminDash: "Admin Dashboard", resetData: "Reset data", addArt: "+ Add artwork",
    revenue: "Total Revenue", activeArt: "Active Artworks", totalOrders: "Total Orders",
    thArt: "Artwork", thCat: "Category", thPrice: "Price", thActions: "Actions", edit: "Edit", delete: "Delete",
    reviews: "Reviews", writeReview: "Write a review", submitReview: "Submit Review", noReviews: "No reviews yet.",
    reviewPh: "Share your thoughts...", reviewWord: "reviews",
    resolution: "Resolution", fileSize: "File Size", format: "Format", license: "License",
    yourCart: "Your Cart", emptyCart: "Your cart is empty.", subtotal: "Subtotal", fee: "Platform fee (5%)",
    total: "Total", checkout: "Checkout", remove: "Remove",
    personalLic: "Personal License (1x)", commercialLic: "Commercial License (2x)",
    billing: "1. Billing", payment: "2. Payment", receipt: "3. Receipt", continuePay: "Continue to Payment",
    address: "Address", city: "City", country: "Country", chooseMethod: "Choose a payment method (simulated):",
    totalToPay: "Total to pay", pay: "Pay", orderConfirmed: "Order Confirmed!", totalPaid: "Total paid",
    download: "Download", print: "Print Receipt", continueShop: "Continue Shopping",
    footer: "© 2026 ArtMart · CSE 326 Project · HTML, CSS & JavaScript"
  },
  hi: {
    shop: "दुकान", admin: "एडमिन", cart: "कार्ट", login: "लॉगिन", logout: "लॉगआउट", register: "रजिस्टर",
    search: "कला या कलाकार खोजें...", spotlight: "स्पॉटलाइट ड्रॉप", addToCart: "कार्ट में डालें",
    preview: "झलक देखें", view: "देखें", by: "द्वारा", maxPrice: "अधिकतम मूल्य",
    featured: "विशेष", low: "मूल्य: कम से ज़्यादा", high: "मूल्य: ज़्यादा से कम", rating: "सर्वोच्च रेटिंग",
    found: "कलाकृतियाँ मिलीं", noMatch: "आपके फ़िल्टर से कोई कलाकृति नहीं मिली।",
    "All": "सभी", "3D Renders": "3D रेंडर", "Abstract & Generative": "एब्स्ट्रैक्ट और जनरेटिव",
    "Cyberpunk & Sci-Fi": "साइबरपंक और साइ-फ़ाई", "Illustrations": "चित्रण", "Photography": "फ़ोटोग्राफ़ी",
    email: "ईमेल", password: "पासवर्ड", fullName: "पूरा नाम", confirmPass: "पासवर्ड की पुष्टि करें", role: "भूमिका",
    collectorRole: "संग्राहक / खरीदार", adminRole: "एडमिन / क्यूरेटर", createAccount: "खाता बनाएँ",
    demoLogin: "डेमो लॉगिन:", collectorDemo: "संग्राहक डेमो", adminDemo: "एडमिन डेमो",
    adminDash: "एडमिन डैशबोर्ड", resetData: "डेटा रीसेट करें", addArt: "+ कलाकृति जोड़ें",
    revenue: "कुल आय", activeArt: "सक्रिय कलाकृतियाँ", totalOrders: "कुल ऑर्डर",
    thArt: "कलाकृति", thCat: "श्रेणी", thPrice: "मूल्य", thActions: "कार्य", edit: "बदलें", delete: "हटाएँ",
    reviews: "समीक्षाएँ", writeReview: "समीक्षा लिखें", submitReview: "समीक्षा भेजें", noReviews: "अभी कोई समीक्षा नहीं।",
    reviewPh: "अपने विचार लिखें...", reviewWord: "समीक्षाएँ",
    resolution: "रिज़ॉल्यूशन", fileSize: "फ़ाइल आकार", format: "फ़ॉर्मेट", license: "लाइसेंस",
    yourCart: "आपका कार्ट", emptyCart: "आपका कार्ट खाली है।", subtotal: "उप-योग", fee: "प्लेटफ़ॉर्म शुल्क (5%)",
    total: "कुल", checkout: "चेकआउट", remove: "हटाएँ",
    personalLic: "व्यक्तिगत लाइसेंस (1x)", commercialLic: "व्यावसायिक लाइसेंस (2x)",
    billing: "1. बिलिंग", payment: "2. भुगतान", receipt: "3. रसीद", continuePay: "भुगतान पर जाएँ",
    address: "पता", city: "शहर", country: "देश", chooseMethod: "भुगतान का तरीका चुनें (डेमो):",
    totalToPay: "कुल देय राशि", pay: "भुगतान करें", orderConfirmed: "ऑर्डर पक्का हुआ!", totalPaid: "कुल भुगतान",
    download: "डाउनलोड", print: "रसीद प्रिंट करें", continueShop: "खरीदारी जारी रखें",
    footer: "© 2026 ArtMart · CSE 326 प्रोजेक्ट · HTML, CSS और JavaScript"
  },
  te: {
    shop: "షాప్", admin: "అడ్మిన్", cart: "కార్ట్", login: "లాగిన్", logout: "లాగౌట్", register: "నమోదు",
    search: "కళ లేదా కళాకారుని వెతకండి...", spotlight: "స్పాట్‌లైట్ డ్రాప్", addToCart: "కార్ట్‌కు జోడించు",
    preview: "త్వరిత వీక్షణ", view: "చూడు", by: "రచన", maxPrice: "గరిష్ఠ ధర",
    featured: "ప్రత్యేకం", low: "ధర: తక్కువ నుండి ఎక్కువ", high: "ధర: ఎక్కువ నుండి తక్కువ", rating: "అత్యధిక రేటింగ్",
    found: "కళాఖండాలు దొరికాయి", noMatch: "మీ ఫిల్టర్లకు సరిపోయే కళాఖండాలు లేవు.",
    "All": "అన్నీ", "3D Renders": "3D రెండర్లు", "Abstract & Generative": "అబ్‌స్ట్రాక్ట్ & జనరేటివ్",
    "Cyberpunk & Sci-Fi": "సైబర్‌పంక్ & సై-ఫై", "Illustrations": "చిత్రాలు", "Photography": "ఫోటోగ్రఫీ",
    email: "ఈమెయిల్", password: "పాస్‌వర్డ్", fullName: "పూర్తి పేరు", confirmPass: "పాస్‌వర్డ్ నిర్ధారించండి", role: "పాత్ర",
    collectorRole: "సేకర్త / కొనుగోలుదారు", adminRole: "అడ్మిన్ / క్యూరేటర్", createAccount: "ఖాతా సృష్టించు",
    demoLogin: "డెమో లాగిన్:", collectorDemo: "సేకర్త డెమో", adminDemo: "అడ్మిన్ డెమో",
    adminDash: "అడ్మిన్ డాష్‌బోర్డ్", resetData: "డేటా రీసెట్", addArt: "+ కళాఖండం జోడించు",
    revenue: "మొత్తం ఆదాయం", activeArt: "క్రియాశీల కళాఖండాలు", totalOrders: "మొత్తం ఆర్డర్లు",
    thArt: "కళాఖండం", thCat: "వర్గం", thPrice: "ధర", thActions: "చర్యలు", edit: "సవరించు", delete: "తొలగించు",
    reviews: "సమీక్షలు", writeReview: "సమీక్ష రాయండి", submitReview: "సమీక్ష పంపండి", noReviews: "ఇంకా సమీక్షలు లేవు.",
    reviewPh: "మీ అభిప్రాయం రాయండి...", reviewWord: "సమీక్షలు",
    resolution: "రిజల్యూషన్", fileSize: "ఫైల్ పరిమాణం", format: "ఫార్మాట్", license: "లైసెన్స్",
    yourCart: "మీ కార్ట్", emptyCart: "మీ కార్ట్ ఖాళీగా ఉంది.", subtotal: "ఉప మొత్తం", fee: "ప్లాట్‌ఫారమ్ రుసుము (5%)",
    total: "మొత్తం", checkout: "చెక్అవుట్", remove: "తొలగించు",
    personalLic: "వ్యక్తిగత లైసెన్స్ (1x)", commercialLic: "వాణిజ్య లైసెన్స్ (2x)",
    billing: "1. బిల్లింగ్", payment: "2. చెల్లింపు", receipt: "3. రసీదు", continuePay: "చెల్లింపుకు కొనసాగండి",
    address: "చిరునామా", city: "నగరం", country: "దేశం", chooseMethod: "చెల్లింపు పద్ధతి ఎంచుకోండి (డెమో):",
    totalToPay: "చెల్లించాల్సిన మొత్తం", pay: "చెల్లించు", orderConfirmed: "ఆర్డర్ నిర్ధారించబడింది!", totalPaid: "చెల్లించిన మొత్తం",
    download: "డౌన్‌లోడ్", print: "రసీదు ప్రింట్", continueShop: "షాపింగ్ కొనసాగించండి",
    footer: "© 2026 ArtMart · CSE 326 ప్రాజెక్ట్ · HTML, CSS & JavaScript"
  }
};

let lang = "en";
try { lang = localStorage.getItem("am_lang") || "en"; } catch (e) {}
if (!TEXT[lang]) lang = "en";

function t(key) { return (TEXT[lang] && TEXT[lang][key]) || TEXT.en[key] || key; }

// Translate static page text marked with data-i18n / data-i18n-ph
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
}
