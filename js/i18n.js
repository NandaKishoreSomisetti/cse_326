/* ArtMart — language translations (English, Hindi, Telugu) */
const LANGS = { en: "English", hi: "हिन्दी", te: "తెలుగు" };

const TEXT = {
  en: {
    showPw: "Show password", hidePw: "Hide password",
    vaGreet: "Hi! How can I help you?",
    vaTitle: "Voice Assistant", vaHello: "Hi! I'm your ArtMart assistant. Tap 🎤 and speak, or type a command below.", vaTry: "Try saying:", vaPh: "Type a command...", vaListening: "Listening… speak now", vaUnsupported: "Voice input is not supported in this browser (use Chrome, Edge or Safari). You can type a command instead.", vaNotUnderstood: "Sorry, I didn't understand. Say \"help\" to hear what I can do.", vaHelp: "You can say: show photography, search Kenji, under 3000, sort cheapest, top rated, open cart, add to cart, checkout, about us, dark mode, or change language to Hindi.", vaShowing: "Showing", vaSearching: "Searching for", vaCartOpen: "Opening your cart", vaCheckout: "Starting checkout", vaSorted: "Sorted by", vaAbout: "Opening About Us", vaShop: "Opening the gallery", vaAdmin: "Opening the Admin Dashboard", vaNoAdmin: "The Admin Dashboard is only for admin accounts.", vaLang: "Language changed to English.", vaDark: "Dark mode is on.", vaLight: "Light mode is on.", vaUnder: "Showing artworks under", vaSpotlight: "Today's spotlight is", vaClosed: "Closed.", vaLoginFirst: "Please log in first.", vaMicBlocked: "Microphone access is blocked. Please allow the microphone in your browser, or type a command.", vaNoSpeech: "I didn't hear anything. Tap 🎤 and try again.",
    startPrice: "Starting price",
    about: "About Us", aboutTitle: "About ArtMart", aboutIntro: "ArtMart is an online gallery where independent digital artists sell their work, and art lovers discover, collect and download original digital art.", storyTitle: "Our Story", storyText: "ArtMart started as a CSE 326 web project with a simple idea: digital artists deserve a clean, fair and easy place to sell their work, and buyers deserve a gallery that feels like a real museum.", missionTitle: "Our Mission", missionText: "To make original digital art affordable for everyone — starting at just ₹1,000 — while helping artists earn from their creativity.", offerTitle: "What We Offer", o1T: "Curated Collection", o1D: "Hand-picked 3D renders, abstract art, illustrations and photography.", o2T: "Simple Licensing", o2D: "Choose a Personal or Commercial license for every artwork.", o3T: "Secure Checkout", o3D: "Pay with Card, UPI or Crypto Wallet and download instantly.", o4T: "Your Language", o4D: "Use the website in English, Hindi or Telugu.", statArt: "Artworks", statArtists: "Artists", statCats: "Categories", contactTitle: "Contact Us", contactText: "Have a question or want to sell your art on ArtMart? Write to us at", startShopping: "Start Exploring",
    noArt: "No artworks yet.", licVal: "Personal / Commercial", justNow: "Just now", newArtist: "New artist on ArtMart.",
    language: "Language", errRequired: "This field is required.", errEmail: "Enter a valid email.", errEmailReq: "Email is required.", errPassReq: "Password is required.", errWrong: "Wrong email or password.", errName: "Enter your name.", errExists: "This email is already registered.", errStrong: "Min 8 chars with uppercase, lowercase and a number.", errMatch: "Passwords do not match.", errLoginReview: "Please log in to write a review.", errStar: "Please select a star rating.", errReviewLen: "Review must be at least 5 characters.", errCard: "Card number must be 16 digits.", errUpi: "Enter a valid UPI ID (e.g. name@upi).", errWallet: "Enter a valid wallet address starting with 0x.", errTitle: "Title must be at least 3 characters.", errArtist: "Artist name is required.", errPrice: "Enter a price greater than 0.", errImg: "Enter a valid image URL (http/https).", errDesc: "Description must be at least 10 characters.", tAlready: "Already in your cart", tAdded: "Added to cart", tReview: "Review added. Thank you!", tRemoved: "Removed from cart", tLoggedOut: "Logged out", tUpdated: "Artwork updated", tArtAdded: "Artwork added", tDeleted: "Artwork deleted", tReset: "Catalogue reset to default", tFeatured: "Marked as featured", tUnfeatured: "Removed from featured", tDownload: "Download started (demo)", delTitle: "Delete artwork?", delSure: "Are you sure you want to delete", delNote: "This cannot be undone.", delYes: "Yes, delete", cancel: "Cancel", editArt: "Edit Artwork", newArt: "Add New Artwork", saveChanges: "Save Changes", addArtBtn: "Add Artwork", fTitle: "Title", fArtist: "Artist", fPrice: "Price (₹)", fImg: "Image URL", fDesc: "Description", fFeat: "Featured artwork",
    collection: "The Collection", collectionSub: "Hand-picked digital artworks from independent artists", welcome: "Welcome to", welcomeSub: "Discover, collect and own original digital art.",
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
    showPw: "पासवर्ड दिखाएँ", hidePw: "पासवर्ड छिपाएँ",
    vaGreet: "नमस्ते! मैं आपकी क्या मदद करूँ?",
    vaTitle: "वॉइस असिस्टेंट", vaHello: "नमस्ते! मैं आपका ArtMart असिस्टेंट हूँ। 🎤 दबाकर बोलें, या नीचे कमांड लिखें।", vaTry: "ऐसे बोलकर देखें:", vaPh: "कमांड लिखें...", vaListening: "सुन रहा हूँ… अब बोलें", vaUnsupported: "इस ब्राउज़र में वॉइस इनपुट नहीं चलता (Chrome, Edge या Safari इस्तेमाल करें)। आप कमांड लिख भी सकते हैं।", vaNotUnderstood: "माफ़ कीजिए, मैं समझ नहीं पाया। \"मदद\" बोलकर मेरे कमांड सुनें।", vaHelp: "आप बोल सकते हैं: फोटोग्राफी दिखाओ, Kenji खोजें, 3000 से कम, सबसे सस्ता, रेटिंग, कार्ट खोलो, कार्ट में डालो, चेकआउट, हमारे बारे में, डार्क मोड, या भाषा तेलुगु।", vaShowing: "दिखा रहा हूँ:", vaSearching: "खोज रहा हूँ:", vaCartOpen: "आपका कार्ट खोल रहा हूँ", vaCheckout: "चेकआउट शुरू कर रहा हूँ", vaSorted: "क्रम बदला गया", vaAbout: "हमारे बारे में खोल रहा हूँ", vaShop: "गैलरी खोल रहा हूँ", vaAdmin: "एडमिन डैशबोर्ड खोल रहा हूँ", vaNoAdmin: "एडमिन डैशबोर्ड सिर्फ़ एडमिन खातों के लिए है।", vaLang: "भाषा हिन्दी कर दी गई है।", vaDark: "डार्क मोड चालू है।", vaLight: "लाइट मोड चालू है।", vaUnder: "इतने से कम की कलाकृतियाँ:", vaSpotlight: "आज का स्पॉटलाइट है", vaClosed: "बंद कर दिया।", vaLoginFirst: "कृपया पहले लॉगिन करें।", vaMicBlocked: "माइक्रोफ़ोन की अनुमति बंद है। ब्राउज़र में माइक्रोफ़ोन की अनुमति दें, या कमांड लिखें।", vaNoSpeech: "मुझे कुछ सुनाई नहीं दिया। 🎤 दबाकर फिर से बोलें।",
    startPrice: "शुरुआती मूल्य",
    about: "हमारे बारे में", aboutTitle: "ArtMart के बारे में", aboutIntro: "ArtMart एक ऑनलाइन गैलरी है जहाँ स्वतंत्र डिजिटल कलाकार अपनी कला बेचते हैं, और कला प्रेमी मौलिक डिजिटल कला खोजते, संग्रह करते और डाउनलोड करते हैं।", storyTitle: "हमारी कहानी", storyText: "ArtMart की शुरुआत CSE 326 वेब प्रोजेक्ट के रूप में एक सरल विचार से हुई: डिजिटल कलाकारों को अपनी कला बेचने के लिए एक साफ़, निष्पक्ष और आसान जगह मिलनी चाहिए, और खरीदारों को असली संग्रहालय जैसी गैलरी।", missionTitle: "हमारा उद्देश्य", missionText: "मौलिक डिजिटल कला को सभी के लिए किफ़ायती बनाना — सिर्फ़ ₹1,000 से शुरू — और कलाकारों को उनकी रचनात्मकता से कमाने में मदद करना।", offerTitle: "हम क्या देते हैं", o1T: "चुना हुआ संग्रह", o1D: "चुने हुए 3D रेंडर, एब्स्ट्रैक्ट कला, चित्रण और फ़ोटोग्राफ़ी।", o2T: "आसान लाइसेंस", o2D: "हर कलाकृति के लिए व्यक्तिगत या व्यावसायिक लाइसेंस चुनें।", o3T: "सुरक्षित भुगतान", o3D: "कार्ड, UPI या क्रिप्टो वॉलेट से भुगतान करें और तुरंत डाउनलोड करें।", o4T: "आपकी भाषा", o4D: "वेबसाइट को अंग्रेज़ी, हिन्दी या तेलुगु में इस्तेमाल करें।", statArt: "कलाकृतियाँ", statArtists: "कलाकार", statCats: "श्रेणियाँ", contactTitle: "संपर्क करें", contactText: "कोई सवाल है या ArtMart पर अपनी कला बेचना चाहते हैं? हमें यहाँ लिखें:", startShopping: "कला देखें",
    noArt: "अभी कोई कलाकृति नहीं।", licVal: "व्यक्तिगत / व्यावसायिक", justNow: "अभी-अभी", newArtist: "ArtMart पर नए कलाकार।",
    language: "भाषा", errRequired: "यह फ़ील्ड ज़रूरी है।", errEmail: "सही ईमेल डालें।", errEmailReq: "ईमेल ज़रूरी है।", errPassReq: "पासवर्ड ज़रूरी है।", errWrong: "ईमेल या पासवर्ड गलत है।", errName: "अपना नाम डालें।", errExists: "यह ईमेल पहले से रजिस्टर है।", errStrong: "कम से कम 8 अक्षर, बड़ा अक्षर, छोटा अक्षर और एक अंक।", errMatch: "पासवर्ड मेल नहीं खाते।", errLoginReview: "समीक्षा लिखने के लिए लॉगिन करें।", errStar: "कृपया स्टार रेटिंग चुनें।", errReviewLen: "समीक्षा कम से कम 5 अक्षर की हो।", errCard: "कार्ड नंबर 16 अंकों का होना चाहिए।", errUpi: "सही UPI ID डालें (जैसे name@upi)।", errWallet: "0x से शुरू होने वाला सही वॉलेट पता डालें।", errTitle: "शीर्षक कम से कम 3 अक्षर का हो।", errArtist: "कलाकार का नाम ज़रूरी है।", errPrice: "0 से ज़्यादा मूल्य डालें।", errImg: "सही इमेज URL डालें (http/https)।", errDesc: "विवरण कम से कम 10 अक्षर का हो।", tAlready: "पहले से कार्ट में है", tAdded: "कार्ट में जोड़ा गया", tReview: "समीक्षा जोड़ी गई। धन्यवाद!", tRemoved: "कार्ट से हटाया गया", tLoggedOut: "लॉगआउट हो गया", tUpdated: "कलाकृति अपडेट हुई", tArtAdded: "कलाकृति जोड़ी गई", tDeleted: "कलाकृति हटाई गई", tReset: "कैटलॉग पहले जैसा किया गया", tFeatured: "विशेष बनाया गया", tUnfeatured: "विशेष से हटाया गया", tDownload: "डाउनलोड शुरू (डेमो)", delTitle: "कलाकृति हटाएँ?", delSure: "क्या आप सच में हटाना चाहते हैं", delNote: "इसे वापस नहीं किया जा सकता।", delYes: "हाँ, हटाएँ", cancel: "रद्द करें", editArt: "कलाकृति बदलें", newArt: "नई कलाकृति जोड़ें", saveChanges: "बदलाव सहेजें", addArtBtn: "कलाकृति जोड़ें", fTitle: "शीर्षक", fArtist: "कलाकार", fPrice: "मूल्य (₹)", fImg: "इमेज URL", fDesc: "विवरण", fFeat: "विशेष कलाकृति",
    collection: "संग्रह", collectionSub: "स्वतंत्र कलाकारों की चुनी हुई डिजिटल कलाकृतियाँ", welcome: "स्वागत है", welcomeSub: "मौलिक डिजिटल कला खोजें, संग्रह करें और अपनाएँ।",
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
    showPw: "పాస్‌వర్డ్ చూపించు", hidePw: "పాస్‌వర్డ్ దాచు",
    vaGreet: "నమస్తే! నేను మీకు ఎలా సహాయం చేయగలను?",
    vaTitle: "వాయిస్ అసిస్టెంట్", vaHello: "నమస్తే! నేను మీ ArtMart అసిస్టెంట్‌ని. 🎤 నొక్కి మాట్లాడండి, లేదా కింద కమాండ్ టైప్ చేయండి.", vaTry: "ఇలా చెప్పి చూడండి:", vaPh: "కమాండ్ టైప్ చేయండి...", vaListening: "వింటున్నాను… ఇప్పుడు మాట్లాడండి", vaUnsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ పనిచేయదు (Chrome, Edge లేదా Safari వాడండి). మీరు కమాండ్ టైప్ కూడా చేయవచ్చు.", vaNotUnderstood: "క్షమించండి, నాకు అర్థం కాలేదు. నా కమాండ్లు వినడానికి \"సహాయం\" అని చెప్పండి.", vaHelp: "మీరు ఇలా చెప్పవచ్చు: ఫోటోగ్రఫీ చూపించు, Kenji వెతుకు, 3000 కంటే తక్కువ, తక్కువ ధర, రేటింగ్, కార్ట్ తెరువు, కార్ట్‌కు జోడించు, చెక్అవుట్, మా గురించి, డార్క్ మోడ్, లేదా భాష హిందీ.", vaShowing: "చూపిస్తున్నాను:", vaSearching: "వెతుకుతున్నాను:", vaCartOpen: "మీ కార్ట్ తెరుస్తున్నాను", vaCheckout: "చెక్అవుట్ ప్రారంభిస్తున్నాను", vaSorted: "క్రమం మార్చబడింది", vaAbout: "మా గురించి పేజీ తెరుస్తున్నాను", vaShop: "గ్యాలరీ తెరుస్తున్నాను", vaAdmin: "అడ్మిన్ డాష్‌బోర్డ్ తెరుస్తున్నాను", vaNoAdmin: "అడ్మిన్ డాష్‌బోర్డ్ అడ్మిన్ ఖాతాలకు మాత్రమే.", vaLang: "భాష తెలుగుకు మార్చబడింది.", vaDark: "డార్క్ మోడ్ ఆన్ అయింది.", vaLight: "లైట్ మోడ్ ఆన్ అయింది.", vaUnder: "ఈ ధర లోపు కళాఖండాలు:", vaSpotlight: "నేటి స్పాట్‌లైట్", vaClosed: "మూసివేశాను.", vaLoginFirst: "దయచేసి ముందుగా లాగిన్ అవ్వండి.", vaMicBlocked: "మైక్రోఫోన్ అనుమతి లేదు. బ్రౌజర్‌లో మైక్రోఫోన్‌ను అనుమతించండి, లేదా కమాండ్ టైప్ చేయండి.", vaNoSpeech: "నాకు ఏమీ వినిపించలేదు. 🎤 నొక్కి మళ్ళీ ప్రయత్నించండి.",
    startPrice: "ప్రారంభ ధర",
    about: "మా గురించి", aboutTitle: "ArtMart గురించి", aboutIntro: "ArtMart ఒక ఆన్‌లైన్ గ్యాలరీ, ఇక్కడ స్వతంత్ర డిజిటల్ కళాకారులు తమ కళను అమ్ముతారు, కళాభిమానులు అసలైన డిజిటల్ కళను కనుగొని, సేకరించి, డౌన్‌లోడ్ చేసుకుంటారు.", storyTitle: "మా కథ", storyText: "ArtMart ఒక సరళమైన ఆలోచనతో CSE 326 వెబ్ ప్రాజెక్ట్‌గా ప్రారంభమైంది: డిజిటల్ కళాకారులకు తమ కళను అమ్మడానికి శుభ్రమైన, న్యాయమైన, సులభమైన స్థలం ఉండాలి, కొనుగోలుదారులకు నిజమైన మ్యూజియం లాంటి గ్యాలరీ ఉండాలి.", missionTitle: "మా లక్ష్యం", missionText: "అసలైన డిజిటల్ కళను అందరికీ అందుబాటులోకి తేవడం — కేవలం ₹1,000 నుండి — మరియు కళాకారులు తమ సృజనాత్మకతతో సంపాదించడానికి సహాయం చేయడం.", offerTitle: "మేము అందించేవి", o1T: "ఎంపిక చేసిన సేకరణ", o1D: "ఎంపిక చేసిన 3D రెండర్లు, అబ్‌స్ట్రాక్ట్ కళ, చిత్రాలు మరియు ఫోటోగ్రఫీ.", o2T: "సులభమైన లైసెన్స్", o2D: "ప్రతి కళాఖండానికి వ్యక్తిగత లేదా వాణిజ్య లైసెన్స్ ఎంచుకోండి.", o3T: "సురక్షిత చెల్లింపు", o3D: "కార్డ్, UPI లేదా క్రిప్టో వాలెట్‌తో చెల్లించి వెంటనే డౌన్‌లోడ్ చేసుకోండి.", o4T: "మీ భాష", o4D: "వెబ్‌సైట్‌ను ఇంగ్లీష్, హిందీ లేదా తెలుగులో ఉపయోగించండి.", statArt: "కళాఖండాలు", statArtists: "కళాకారులు", statCats: "వర్గాలు", contactTitle: "మమ్మల్ని సంప్రదించండి", contactText: "ఏదైనా ప్రశ్న ఉందా లేదా ArtMart లో మీ కళను అమ్మాలనుకుంటున్నారా? మాకు ఇక్కడ రాయండి:", startShopping: "కళను చూడండి",
    noArt: "ఇంకా కళాఖండాలు లేవు.", licVal: "వ్యక్తిగత / వాణిజ్య", justNow: "ఇప్పుడే", newArtist: "ArtMart లో కొత్త కళాకారుడు.",
    language: "భాష", errRequired: "ఈ ఫీల్డ్ తప్పనిసరి.", errEmail: "సరైన ఈమెయిల్ ఇవ్వండి.", errEmailReq: "ఈమెయిల్ తప్పనిసరి.", errPassReq: "పాస్‌వర్డ్ తప్పనిసరి.", errWrong: "ఈమెయిల్ లేదా పాస్‌వర్డ్ తప్పు.", errName: "మీ పేరు ఇవ్వండి.", errExists: "ఈ ఈమెయిల్ ఇప్పటికే నమోదైంది.", errStrong: "కనీసం 8 అక్షరాలు, పెద్ద అక్షరం, చిన్న అక్షరం మరియు ఒక సంఖ్య.", errMatch: "పాస్‌వర్డ్‌లు సరిపోలలేదు.", errLoginReview: "సమీక్ష రాయడానికి లాగిన్ అవ్వండి.", errStar: "దయచేసి స్టార్ రేటింగ్ ఎంచుకోండి.", errReviewLen: "సమీక్ష కనీసం 5 అక్షరాలు ఉండాలి.", errCard: "కార్డ్ నంబర్ 16 అంకెలు ఉండాలి.", errUpi: "సరైన UPI ID ఇవ్వండి (ఉదా. name@upi).", errWallet: "0x తో మొదలయ్యే సరైన వాలెట్ చిరునామా ఇవ్వండి.", errTitle: "శీర్షిక కనీసం 3 అక్షరాలు ఉండాలి.", errArtist: "కళాకారుని పేరు తప్పనిసరి.", errPrice: "0 కంటే ఎక్కువ ధర ఇవ్వండి.", errImg: "సరైన ఇమేజ్ URL ఇవ్వండి (http/https).", errDesc: "వివరణ కనీసం 10 అక్షరాలు ఉండాలి.", tAlready: "ఇప్పటికే కార్ట్‌లో ఉంది", tAdded: "కార్ట్‌కు జోడించబడింది", tReview: "సమీక్ష జోడించబడింది. ధన్యవాదాలు!", tRemoved: "కార్ట్ నుండి తొలగించబడింది", tLoggedOut: "లాగౌట్ అయ్యారు", tUpdated: "కళాఖండం నవీకరించబడింది", tArtAdded: "కళాఖండం జోడించబడింది", tDeleted: "కళాఖండం తొలగించబడింది", tReset: "కేటలాగ్ రీసెట్ చేయబడింది", tFeatured: "ప్రత్యేకంగా గుర్తించబడింది", tUnfeatured: "ప్రత్యేకం నుండి తొలగించబడింది", tDownload: "డౌన్‌లోడ్ మొదలైంది (డెమో)", delTitle: "కళాఖండం తొలగించాలా?", delSure: "మీరు నిజంగా తొలగించాలనుకుంటున్నారా", delNote: "దీన్ని రద్దు చేయలేరు.", delYes: "అవును, తొలగించు", cancel: "రద్దు", editArt: "కళాఖండం సవరించు", newArt: "కొత్త కళాఖండం జోడించు", saveChanges: "మార్పులు సేవ్ చేయి", addArtBtn: "కళాఖండం జోడించు", fTitle: "శీర్షిక", fArtist: "కళాకారుడు", fPrice: "ధర (₹)", fImg: "ఇమేజ్ URL", fDesc: "వివరణ", fFeat: "ప్రత్యేక కళాఖండం",
    collection: "సేకరణ", collectionSub: "స్వతంత్ర కళాకారుల ఎంపిక చేసిన డిజిటల్ కళాఖండాలు", welcome: "స్వాగతం", welcomeSub: "అసలైన డిజిటల్ కళను కనుగొనండి, సేకరించండి, సొంతం చేసుకోండి.",
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
