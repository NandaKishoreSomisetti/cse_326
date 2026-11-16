/**
 * AETHERIA — Curated Digital Art Marketplace
 * Initial Catalog Data & Demo Users
 */

const initialArtworks = [
  {
    id: "art-1",
    title: "Chronicles of the Astral Citadel",
    artist: {
      name: "Elena Rostova",
      handle: "@elena_3d",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Senior 3D Surrealist & Octane Lead from Zurich. Featured in Ars Electronica and Tokyo Digital Art Expo.",
      verified: true
    },
    category: "3D Renders",
    price: 3100,
    ethPrice: 0.14,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    resolution: "7680 × 4320 (8K)",
    dimensions: "7680 × 4320 px",
    format: "Blender (.blend) + 8K OpenEXR + PNG",
    fileSize: "1.4 GB",
    software: "Blender 4.2 / Octane Render / Substance 3D",
    featured: true,
    rating: 4.9,
    reviewCount: 24,
    edition: "1 of 1 Masterpiece",
    createdDate: "Oct 2026",
    description: "A monumental speculative architecture floating within an interstellar nebula. Crafted with high-density procedural geometry, physical volumetric cloud simulations, and photorealistic raytraced sub-surface scattering.",
    tags: ["3D Render", "Octane", "Sci-Fi", "Architecture", "Volumetric"],
    reviews: [
      {
        id: "rev-101",
        user: "Julian Thorne",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 days ago",
        verified: true,
        comment: "The lighting fidelity and atmospheric depth in the raw 8K OpenEXR file are utterly astonishing. Rendered flawlessly in our exhibition dome."
      },
      {
        id: "rev-102",
        user: "Kaelen Chen",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 week ago",
        verified: true,
        comment: "Incredible file organization with labeled Blender shaders and lighting rigs. Worth every penny for commercial studio usage."
      }
    ]
  },
  {
    id: "art-2",
    title: "Hyperion Nebula: Synthetic Bloom",
    artist: {
      name: "Darius Vance",
      handle: "@darius_generative",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Generative Artist & Creative Coder experimenting with custom CUDA shaders and fluid topology.",
      verified: true
    },
    category: "Abstract & Generative",
    price: 2000,
    ethPrice: 0.11,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85",
    resolution: "6000 × 4000 (6K)",
    dimensions: "6000 × 4000 px",
    format: "GLSL Source Code + SVG Vector + 6K TIFF",
    fileSize: "680 MB",
    software: "TouchDesigner / GLSL / Cinema 4D",
    featured: true,
    rating: 4.8,
    reviewCount: 19,
    edition: "Limited Series #04/25",
    createdDate: "Sep 2026",
    description: "Generative organic blooms rendered through non-linear differential equations and particle turbulence. Includes editable GLSL fragment shaders for real-time generative audio-reactive playback.",
    tags: ["Abstract", "Generative", "GLSL", "Fluid Dynamics", "Neon"],
    reviews: [
      {
        id: "rev-201",
        user: "Seraphina Lin",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "3 days ago",
        verified: true,
        comment: "The raw mathematical elegance here is pure magic. We used this as the hero visual for our interactive museum installation."
      }
    ]
  },
  {
    id: "art-3",
    title: "Neo-Kyoto Rain Echoes 2099",
    artist: {
      name: "Kenji Sato",
      handle: "@kenji_cyber",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      bio: "Concept designer and worldbuilder based in Kyoto. Collaborator on AAA cinematic universes.",
      verified: true
    },
    category: "Cyberpunk & Sci-Fi",
    price: 4100,
    ethPrice: 0.18,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85",
    resolution: "7680 × 3240 (Ultrawide 8K)",
    dimensions: "7680 × 3240 px",
    format: "PSD Multi-layer (48 Layers) + 4K PNG",
    fileSize: "2.1 GB",
    software: "Unreal Engine 5.5 / Photoshop / Megascans",
    featured: true,
    rating: 5.0,
    reviewCount: 31,
    edition: "1 of 1 Vault Edition",
    createdDate: "Nov 2026",
    description: "A neon-soaked dystopian alley in late 21st century Neo-Kyoto. Featuring cinematic volumetric rain, reflective puddles with raytraced specular dispersion, and authentic Japanese typographic signage.",
    tags: ["Cyberpunk", "Dystopia", "Neon", "Rain", "Unreal Engine 5"],
    reviews: [
      {
        id: "rev-301",
        user: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "Yesterday",
        verified: true,
        comment: "Layers are impeccably named and organized. You can isolate every neon sign, rain droplet layer, and fog volume independently."
      }
    ]
  },
  {
    id: "art-4",
    title: "Obsidian Core: Quantum Monolith",
    artist: {
      name: "Aria Thorne",
      handle: "@aria_sculpt",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "Digital sculptor and industrial designer exploring brutalism, dark matter, and crystalline structures.",
      verified: true
    },
    category: "3D Renders",
    price: 2400,
    ethPrice: 0.12,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    resolution: "4096 × 4096 (1:1 4K)",
    dimensions: "4096 × 4096 px",
    format: "Cinema 4D + Redshift + GLB (3D Interactive)",
    fileSize: "890 MB",
    software: "Cinema 4D / Redshift / ZBrush",
    featured: false,
    rating: 4.7,
    reviewCount: 15,
    edition: "Limited Drop (08/50)",
    createdDate: "Aug 2026",
    description: "A monolith forged from obsidian and gold-veined metamaterials. Emits an ambient crystalline hum and dynamic subsurface luminosity under caustic light angles.",
    tags: ["Brutalism", "Obsidian", "Redshift", "Gold Leaf", "3D Model"],
    reviews: [
      {
        id: "rev-401",
        user: "Matteo Rossi",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "5 days ago",
        verified: true,
        comment: "Spectacular displacement maps. Rendered very clean in my Redshift farm with minimal noise."
      }
    ]
  },
  {
    id: "art-5",
    title: "Prism of the Void: Chromatic Caustics",
    artist: {
      name: "Sora Takahashi",
      handle: "@sora_chroma",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      bio: "Optical physicist turned generative optical artist exploring caustic refraction and crystal prisms.",
      verified: true
    },
    category: "Abstract & Generative",
    price: 1200,
    ethPrice: 0.08,
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1600&q=85",
    resolution: "5120 × 2880 (5K iMac Pro)",
    dimensions: "5120 × 2880 px",
    format: "Lossless TIFF + 4K WebP + Vector Curves",
    fileSize: "410 MB",
    software: "Houdini 20 / Karma XPU / Affinity Photo",
    featured: false,
    rating: 4.9,
    reviewCount: 22,
    edition: "Open Edition Collector Pass",
    createdDate: "Oct 2026",
    description: "Spectral dispersion of pure white light passing through a non-Euclidean prism array. Features authentic physical wavelengths (380nm - 750nm) computed through spectral raytracing.",
    tags: ["Prism", "Caustics", "Spectral", "Houdini", "Minimal"],
    reviews: [
      {
        id: "rev-501",
        user: "Clara Oswald",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        comment: "The spectral transitions are velvety smooth. Looks breathtaking as an expansive backdrop!"
      }
    ]
  },
  {
    id: "art-6",
    title: "Valkyrie Protocol: Android Awakening",
    artist: {
      name: "Viktor Petrov",
      handle: "@viktor_concept",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      bio: "Lead character artist for AAA game titles and sci-fi graphic novels.",
      verified: true
    },
    category: "Cyberpunk & Sci-Fi",
    price: 5000,
    ethPrice: 0.21,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=85",
    resolution: "8192 × 4608 (8K Cinema)",
    dimensions: "8192 × 4608 px",
    format: "ZBrush ZTL + FBX Rigged + 8K PBR Textures",
    fileSize: "3.2 GB",
    software: "ZBrush / Marvelous Designer / Unreal 5",
    featured: false,
    rating: 5.0,
    reviewCount: 27,
    edition: "1 of 1 Genesis Drop",
    createdDate: "Nov 2026",
    description: "A biomechanical android reaching cognitive equilibrium inside a synthetic incubation chamber. Features fully rigged anatomical armature, carbon fiber textures, and translucent silicone dermis.",
    tags: ["Android", "Biomechanical", "Cyberpunk", "Rigged", "Unreal 5"],
    reviews: [
      {
        id: "rev-601",
        user: "Elijah Scott",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "4 days ago",
        verified: true,
        comment: "Rigging is AAA quality. The sub-surface scattering maps on the android's face are jaw-dropping."
      }
    ]
  },
  {
    id: "art-7",
    title: "Solitude in Vector: Solitary Wanderer",
    artist: {
      name: "Mirei Kusanagi",
      handle: "@mirei_vector",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Editorial illustrator published in Wired, The New Yorker, and Apple Design Showcase.",
      verified: true
    },
    category: "Illustrations",
    price: 1000,
    ethPrice: 0.075,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=85",
    resolution: "Infinite Vector SVG + 8K PNG",
    dimensions: "Scalable Vector (SVG / AI / PDF)",
    format: "Adobe Illustrator (.ai) + SVG + Print Ready PDF",
    fileSize: "120 MB",
    software: "Adobe Illustrator / Procreate Dreams",
    featured: false,
    rating: 4.8,
    reviewCount: 17,
    edition: "Edition of 100",
    createdDate: "Jul 2026",
    description: "An evocative, melancholic minimalist illustration of a solitary figure under a vast planetary alignment. Composed with clean geometric curves, warm duotone gradients, and grain shading.",
    tags: ["Vector", "Minimalist", "Illustration", "Scalable", "Storytelling"],
    reviews: [
      {
        id: "rev-701",
        user: "Hannah Becker",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 week ago",
        verified: true,
        comment: "Scales to any size without a single jagged pixel. Cleanest vector bezier curves I have ever inspected."
      }
    ]
  },
  {
    id: "art-8",
    title: "Atmospheric Abyss: Senja Fjord Aurora",
    artist: {
      name: "Lars Nygård",
      handle: "@lars_aurora",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      bio: "National Geographic expedition landscape photographer & Hasselblad Master 2025.",
      verified: true
    },
    category: "Photography",
    price: 3600,
    ethPrice: 0.16,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
    resolution: "11664 × 8750 (100MP Hasselblad)",
    dimensions: "11664 × 8750 px",
    format: "16-bit Hasselblad RAW (3FR) + 16-bit TIFF",
    fileSize: "1.8 GB",
    software: "Hasselblad H6D-100c / Phocus / Capture One",
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    edition: "Limited Fine-Art Archival #02/10",
    createdDate: "Oct 2026",
    description: "A 100-megapixel long-exposure capture of solar storm auroral ribbons dancing across the Senja fjords during Arctic polar night. Uncompressed medium format optical clarity.",
    tags: ["Photography", "Hasselblad", "Aurora", "Norway", "100MP"],
    reviews: [
      {
        id: "rev-801",
        user: "Dr. Robert Sterling",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "3 weeks ago",
        verified: true,
        comment: "Printed this at 2 meters wide on Hahnemühle Baryta paper. Every snow granule and aurora streamer is razor sharp."
      }
    ]
  },
  {
    id: "art-9",
    title: "Glitch Reverie XXI: Latent Drift",
    artist: {
      name: "Darius Vance",
      handle: "@darius_generative",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Generative Artist & Creative Coder experimenting with custom CUDA shaders and fluid topology.",
      verified: true
    },
    category: "Abstract & Generative",
    price: 1400,
    ethPrice: 0.09,
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=85",
    resolution: "4096 × 4096 (4K Square)",
    dimensions: "4096 × 4096 px",
    format: "Python Script + 4K PNG + MP4 Seamless Loop (60fps)",
    fileSize: "520 MB",
    software: "Python / PyTorch / ffmpeg / After Effects",
    featured: false,
    rating: 4.6,
    reviewCount: 11,
    edition: "Open Edition",
    createdDate: "Aug 2026",
    description: "Data-moshing through latent neural embeddings. An exploration of the liminal boundary where artificial memory disintegrates into chromatic RGB scanline errors.",
    tags: ["Glitch", "Neural", "Abstract", "Loop", "60fps"],
    reviews: [
      {
        id: "rev-901",
        user: "Tasha Grey",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "1 month ago",
        verified: false,
        comment: "Hypnotic loop for live VJ sets. Syncs flawlessly to 128 BPM electronic music."
      }
    ]
  },
  {
    id: "art-10",
    title: "Elysian Sanctuary: Biophilic Spire",
    artist: {
      name: "Elena Rostova",
      handle: "@elena_3d",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      bio: "Senior 3D Surrealist & Octane Lead from Zurich. Featured in Ars Electronica and Tokyo Digital Art Expo.",
      verified: true
    },
    category: "3D Renders",
    price: 3300,
    ethPrice: 0.15,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    resolution: "7680 × 4320 (8K)",
    dimensions: "7680 × 4320 px",
    format: "Blender 4.2 Scene + USDZ + 8K Renders",
    fileSize: "1.6 GB",
    software: "Blender 4.2 / Geo-Scatter / V-Ray",
    featured: false,
    rating: 4.9,
    reviewCount: 20,
    edition: "Limited Collection (03/15)",
    createdDate: "Sep 2026",
    description: "Future biophilic skyscraper designed for solar desalination and carbon sequestering. Millions of procedural fern fronds and moss systems generated through geometry nodes.",
    tags: ["Architecture", "Eco-Futurism", "Blender", "Geometry Nodes", "8K"],
    reviews: [
      {
        id: "rev-1001",
        user: "Lucas Meyer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        comment: "The geometry node setups are a masterclass in modern procedural 3D modeling."
      }
    ]
  },
  {
    id: "art-11",
    title: "Tokyo Ghost Frequency: Shibuya Rain",
    artist: {
      name: "Kenji Sato",
      handle: "@kenji_cyber",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      bio: "Concept designer and worldbuilder based in Kyoto. Collaborator on AAA cinematic universes.",
      verified: true
    },
    category: "Photography",
    price: 2700,
    ethPrice: 0.13,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
    resolution: "6000 × 4000 (Sony Alpha 1)",
    dimensions: "6000 × 4000 px",
    format: "Sony ARW RAW + Color-Graded LUT Pack",
    fileSize: "950 MB",
    software: "Sony A1 / 50mm f/1.2 GM / DaVinci Resolve",
    featured: false,
    rating: 4.8,
    reviewCount: 16,
    edition: "Numbered Series #12/50",
    createdDate: "Oct 2026",
    description: "Night street photography captured during a monsoon storm in Shibuya. Long shutter blend capturing translucent umbrellas, luminous asphalt puddles, and cinematic neon halo flares.",
    tags: ["Photography", "Street", "Tokyo", "Neon", "Rain"],
    reviews: [
      {
        id: "rev-1101",
        user: "Naomi Watts",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "5 days ago",
        verified: true,
        comment: "Comes with the exact DaVinci color grading LUTs used! That alone is worth the price."
      }
    ]
  },
  {
    id: "art-12",
    title: "Astral Odyssey: The Stargazer's Map",
    artist: {
      name: "Mirei Kusanagi",
      handle: "@mirei_vector",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      bio: "Editorial illustrator published in Wired, The New Yorker, and Apple Design Showcase.",
      verified: true
    },
    category: "Illustrations",
    price: 1500,
    ethPrice: 0.09,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85",
    resolution: "Vector SVG + 8K High-DPI PNG",
    dimensions: "Infinitely Scalable",
    format: "Layered Illustrator (.ai) + SVG + 8K PNG",
    fileSize: "140 MB",
    software: "Illustrator / Astropad / iPad Pro",
    featured: false,
    rating: 4.9,
    reviewCount: 23,
    edition: "Open Edition Collector Pass",
    createdDate: "Sep 2026",
    description: "Celestial cartography depicting mythical constellations entwined with futuristic orbital mechanics. Rendered in midnight indigo, copper leaf, and luminous teal accents.",
    tags: ["Celestial", "Constellation", "Illustration", "Vector", "Gold Leaf"],
    reviews: [
      {
        id: "rev-1201",
        user: "Gideon Cross",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "3 weeks ago",
        verified: true,
        comment: "Used in our hardback book publishing project. The vector linework is utterly immaculate."
      }
    ]
  },
  {
    id: "art-13",
    title: "Chrono-Metropolis: Orbital Spire",
    artist: {
      name: "Kenji Sato",
      handle: "@kenji_cyber",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      bio: "Concept designer and worldbuilder based in Kyoto. Collaborator on AAA cinematic universes.",
      verified: true
    },
    category: "Cyberpunk & Sci-Fi",
    price: 4500,
    ethPrice: 0.19,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85",
    resolution: "7680 × 4320 (8K)",
    dimensions: "7680 × 4320 px",
    format: "Cinema 4D + Octane + PSD Master",
    fileSize: "1.9 GB",
    software: "Cinema 4D / Octane / Photoshop",
    featured: false,
    rating: 4.9,
    reviewCount: 14,
    edition: "1 of 5 Limited",
    createdDate: "Nov 2026",
    description: "A super-tall space elevator piercing atmospheric storm clouds. Featuring procedural sci-fi paneling, glowing plasma thruster exhaust trails, and volumetric cloud layers.",
    tags: ["Cyberpunk", "Space Elevator", "Sci-Fi", "Octane", "8K"],
    reviews: [
      {
        id: "rev-1301",
        user: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 day ago",
        verified: true,
        comment: "Breathtaking scale. The lighting in the upper stratosphere level gives you literal goosebumps."
      }
    ]
  },
  {
    id: "art-14",
    title: "Quantum Entanglement: Harmonic Field",
    artist: {
      name: "Sora Takahashi",
      handle: "@sora_chroma",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      bio: "Optical physicist turned generative optical artist exploring caustic refraction and crystal prisms.",
      verified: true
    },
    category: "Abstract & Generative",
    price: 2300,
    ethPrice: 0.12,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    resolution: "5760 × 3240 (6K)",
    dimensions: "5760 × 3240 px",
    format: "WebGL Interactive File + 6K PNG",
    fileSize: "380 MB",
    software: "Houdini / TouchDesigner / WebGL",
    featured: false,
    rating: 4.8,
    reviewCount: 18,
    edition: "Genesis Series (07/20)",
    createdDate: "Oct 2026",
    description: "Visual manifestation of quantum entanglement between two paired crystalline nodes. Features dynamic forcefield lines with phosphorescent luminescence.",
    tags: ["Quantum", "Houdini", "Abstract", "Luminescence", "WebGL"],
    reviews: [
      {
        id: "rev-1401",
        user: "Vikram Mehta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "6 days ago",
        verified: true,
        comment: "Outstanding shader precision. The physics simulation adheres to actual wave-function collapse math!"
      }
    ]
  }
];

const CATEGORIES = [
  "All",
  "3D Renders",
  "Abstract & Generative",
  "Cyberpunk & Sci-Fi",
  "Illustrations",
  "Photography"
];

const DEMO_USERS = {
  collector: {
    id: "user-collector",
    name: "Alex Vance",
    email: "alex@collector.io",
    role: "collector",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    badge: "Verified Collector",
    bio: "Curating rare generative visuals and high-precision 3D architecture."
  },
  admin: {
    id: "user-admin",
    name: "Elena Ross (Curator)",
    email: "curator@aetheria.art",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    badge: "Head Curator / Admin",
    bio: "Platform Administrator & Chief Gallery Curator at AETHERIA."
  }
};
