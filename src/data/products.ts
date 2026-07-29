import { Product } from '../types';

export const CATEGORIES = [
  'All Categories',
  'TVs & Home Theater',
  'Laptops & Computers',
  'Audio & Headphones',
  'Cell Phones & Wearables',
  'Video Games & VR',
  'Smart Home & Appliances'
];

export const BRANDS = [
  'All Brands',
  'Samsung',
  'Apple',
  'Sony',
  'LG',
  'Asus',
  'Bose',
  'Dyson',
  'Microsoft',
  'Google'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Samsung 65" Class S90C OLED 4K Smart Tizen TV (2024)',
    category: 'TVs & Home Theater',
    brand: 'Samsung',
    price: 1599.99,
    originalPrice: 2099.99,
    rating: 4.8,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Screen Size': '65 Inches',
      'Display Technology': 'OLED',
      'Refresh Rate': '120Hz (Up to 144Hz)',
      'Resolution': '4K (2160p)',
      'High Dynamic Range (HDR)': 'Quantum HDR OLED+',
      'Smart Platform': 'Tizen',
      'HDMI Inputs': '4 x HDMI 2.1'
    },
    badges: ['Top Deal', 'Save $500', 'Member Price', 'Free Next-Day Delivery'],
    description: 'Experience deep blacks, incredible brightness, and pure color contrast with the Samsung S90C OLED TV powered by Quantum Dot technology.',
    features: [
      'Neural Quantum Processor 4K for AI upscale',
      'Motion Xcelerator Turbo+ 144Hz for silky ultra-fluid gaming',
      'Dolby Atmos and Object Tracking Sound Lite for 3D spatial audio',
      'LaserSlim Design that blends seamlessly with wall'
    ],
    inStock: true,
    modelNumber: 'QN65S90CAFXZA',
    sku: '6536328',
    geekSquadProtectionPrice: 199.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-002',
    name: 'Apple MacBook Pro 16" Laptop - M3 Max Chip - 36GB Memory - 1TB SSD - Space Black',
    category: 'Laptops & Computers',
    brand: 'Apple',
    price: 3299.00,
    originalPrice: 3499.00,
    rating: 4.9,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Processor': 'Apple M3 Max (16-core CPU)',
      'GPU': '40-core GPU',
      'Unified Memory': '36GB',
      'Storage': '1TB NVMe SSD',
      'Display': '16.2" Liquid Retina XDR (3456 x 2234)',
      'Battery Life': 'Up to 22 hours',
      'Weight': '4.8 lbs'
    },
    badges: ['Best Seller', 'Apple Savings', 'Free Shipping'],
    description: 'The 16-inch MacBook Pro with M3 Max takes power and performance to extreme levels for developers, video editors, and 3D animators.',
    features: [
      'Mind-blowing M3 Max architecture with Hardware-Accelerated Ray Tracing',
      'Liquid Retina XDR screen with 1600 nits peak brightness',
      'Studio-quality 6-speaker sound system with Spatial Audio',
      'Three Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3'
    ],
    inStock: true,
    modelNumber: 'MUW63LL/A',
    sku: '6534640',
    geekSquadProtectionPrice: 299.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-003',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Over-the-Ear Headphones - Silver',
    category: 'Audio & Headphones',
    brand: 'Sony',
    price: 329.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviewCount: 3210,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Headphone Type': 'Over-Ear Wireless',
      'Noise Canceling': 'Industry Leading Active Noise Canceling (Integrated Processor V1)',
      'Battery Life': 'Up to 30 Hours (Quick charge 3 mins = 3 hours)',
      'Microphone': '4 beamforming mics with AI noise isolation',
      'Bluetooth Version': '5.2 with LDAC High Resolution Audio'
    },
    badges: ['Top Deal', 'Save $70', 'Free Shipping'],
    description: 'Distraction-free listening with industry-leading noise canceling and ultra-comfortable lightweight design.',
    features: [
      'Auto NC Optimizer automatically adjusts cancellation based on environment',
      'Magnificent sound engineered with precision 30mm driver unit',
      'Speak-to-Chat automatically pauses music when you start talking',
      'Multipoint connection pairs with two Bluetooth devices simultaneously'
    ],
    inStock: true,
    modelNumber: 'WH1000XM5/S',
    sku: '6505727',
    geekSquadProtectionPrice: 49.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-004',
    name: 'PlayStation 5 Console - Slim Digital Edition - White',
    category: 'Video Games & VR',
    brand: 'Sony',
    price: 449.99,
    originalPrice: 449.99,
    rating: 4.9,
    reviewCount: 5410,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      'Storage': '1TB Custom High-Speed NVMe SSD',
      'Max Resolution': '4K @ 120 FPS, 8K Output Support',
      'Audio': 'Tempest 3D AudioTech',
      'Controller Included': 'DualSense Wireless Controller with Haptic Feedback',
      'Optical Drive': 'Digital Only (Optional Disc Drive Add-on)'
    },
    badges: ['In Stock', 'Includes ASTRO Bot', 'Ready for Store Pickup'],
    description: 'Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
    features: [
      'Slim design with over 30% reduction in volume',
      'Ultra-high speed SSD maximizes play sessions with instant loading',
      'Ray Tracing introduces unprecedented level of realism with realistic shadows',
      'HDR technology displays unbelievable vibrant range of colors'
    ],
    inStock: true,
    modelNumber: 'CFI-2000B01',
    sku: '6562054',
    geekSquadProtectionPrice: 69.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-005',
    name: 'LG 77" Class C3 Series OLED 4K UHD Smart webOS TV',
    category: 'TVs & Home Theater',
    brand: 'LG',
    price: 2299.99,
    originalPrice: 2899.99,
    rating: 4.9,
    reviewCount: 1890,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Screen Size': '77 Inches',
      'Display Technology': 'OLED evo',
      'Processor': 'a9 AI Processor Gen6',
      'Refresh Rate': '120Hz Native',
      'G-Sync & FreeSync': 'Yes, Certified Nvidia G-Sync & AMD FreeSync Premium',
      'HDMI Ports': '4 x HDMI 2.1 (48Gbps)'
    },
    badges: ['Top Deal', 'Save $600', 'Free Delivery & Mounting Option'],
    description: 'The ultimate TV for cinema enthusiasts and hardcore gamers alike with LG OLED evo self-lit pixels.',
    features: [
      'Brightness Booster algorithm delivers up to 30% brighter picture',
      'Game Optimizer dashboard with 0.1ms response time',
      'Dolby Vision, Dolby Atmos, and Filmmaker Mode for authentic theatrical experience',
      'webOS 23 with Quick Cards for instant streaming access'
    ],
    inStock: true,
    modelNumber: 'OLED77C3PUA',
    sku: '6535937',
    geekSquadProtectionPrice: 249.99,
    freeShipping: true,
    storePickupAvailable: false
  },
  {
    id: 'prod-006',
    name: 'Asus ROG Zephyrus G16 16" OLED 240Hz Gaming Laptop - Intel Core Ultra 9 - 32GB RAM - RTX 4080 - 1TB SSD',
    category: 'Laptops & Computers',
    brand: 'Asus',
    price: 2499.99,
    originalPrice: 2899.99,
    rating: 4.8,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Processor': 'Intel Core Ultra 9 185H (16-core)',
      'Graphics': 'NVIDIA GeForce RTX 4080 12GB GDDR6',
      'Display': '16" ROG Nebula OLED 2.5K 240Hz 0.2ms',
      'RAM': '32GB LPDDR5X',
      'Storage': '1TB PCIe 4.0 NVMe SSD',
      'Weight': '4.29 lbs'
    },
    badges: ['Top Gamer Pick', 'Save $400', 'Free Shipping'],
    description: 'Precision CNC-machined aluminum chassis housing cutting-edge AI Intel processors and OLED 240Hz gaming display.',
    features: [
      'World-first ROG Nebula OLED gaming screen with VESA DisplayHDR True Black 500',
      'Tri-Fan thermal cooling tech with Liquid Metal thermal compound',
      'Custom Slash Lighting array on aluminum lid',
      'Dolby Atmos 6-speaker sound system with dual force-canceling woofers'
    ],
    inStock: true,
    modelNumber: 'GU605MZ-WS96',
    sku: '6570223',
    geekSquadProtectionPrice: 219.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-007',
    name: 'Apple iPhone 15 Pro Max 256GB - Natural Titanium (Unlocked)',
    category: 'Cell Phones & Wearables',
    brand: 'Apple',
    price: 1199.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: 4210,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Display': '6.7" Super Retina XDR with ProMotion 120Hz',
      'Chipset': 'A17 Pro Chip with 6-core GPU',
      'Main Camera': '48MP Main | 12MP Ultra Wide | 12MP 5x Telephoto',
      'Frame Material': 'Grade 5 Aerospace Titanium',
      'Connector': 'USB-C (USB 3 speeds up to 10Gbps)'
    },
    badges: ['Trade-In Eligible', 'Member Deal', 'Free Store Pickup'],
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    features: [
      'Titanium design with textured matte glass back',
      'Action Button for instant shortcut access to camera, flashlight, or voice memo',
      '5x Optical Zoom with 120mm focal lens for super crisp telephoto shots',
      'Roadside Assistance via satellite and Emergency SOS'
    ],
    inStock: true,
    modelNumber: 'MU683LL/A',
    sku: '6553123',
    geekSquadProtectionPrice: 179.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-008',
    name: 'Bose QuietComfort Ultra Wireless Noise Canceling Headphones - Black',
    category: 'Audio & Headphones',
    brand: 'Bose',
    price: 379.00,
    originalPrice: 429.00,
    rating: 4.6,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Spatial Audio': 'Bose Immersive Audio',
      'Noise Cancellation': 'CustomTune Technology',
      'Battery Life': 'Up to 24 Hours',
      'Bluetooth': '5.3 Snapdragon Sound',
      'Controls': 'Touch controls and physical shortcut button'
    },
    badges: ['Top Deal', 'Save $50', 'Free Shipping'],
    description: 'Groundbreaking spatialized audio for more immersive listening. World-class noise cancellation quieter than ever before.',
    features: [
      'Bose Immersive Audio pushes sound boundaries by taking what you hear out of your head',
      'Quiet, Aware, and Immersion modes tailored for any environment',
      'CustomTune technology analyzes ears and adapts sound & noise cancellation to match',
      'Luxurious leather cushions for all-day continuous wear'
    ],
    inStock: true,
    modelNumber: '880066-0010',
    sku: '6553835',
    geekSquadProtectionPrice: 59.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-009',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner - Yellow/Nickel',
    category: 'Smart Home & Appliances',
    brand: 'Dyson',
    price: 649.99,
    originalPrice: 749.99,
    rating: 4.7,
    reviewCount: 2840,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Suction Power': '230 AW (Air Watts)',
      'Run Time': 'Up to 60 Minutes',
      'Bin Volume': '0.2 Gallons',
      'Weight': '6.83 lbs',
      'Filter': 'Whole-machine HEPA filtration capturing 99.99% of particles'
    },
    badges: ['Top Deal', 'Save $100', 'Free Shipping'],
    description: 'Dyson’s most powerful, intelligent cordless vacuum with laser illumination that reveals microscopic dust invisible on hard floors.',
    features: [
      'Illuminated Fluffy cleaner head reveals hidden dust on hard floors',
      'Piezo sensor counts and measures size of dust particles in real-time on LCD screen',
      'Digital Motorbar cleaner head with de-tangling vanes clears wrapped hair',
      'Converts easily to handheld vacuum for cars and tight spaces'
    ],
    inStock: true,
    modelNumber: '368340-01',
    sku: '6457319',
    geekSquadProtectionPrice: 89.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-010',
    name: 'Samsung Galaxy S24 Ultra 512GB - Titanium Black (Unlocked)',
    category: 'Cell Phones & Wearables',
    brand: 'Samsung',
    price: 1299.99,
    originalPrice: 1419.99,
    rating: 4.8,
    reviewCount: 1950,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Display': '6.8" Dynamic AMOLED 2X QHD+ 120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Camera': '200MP Main + 50MP 5x Zoom + 12MP Ultrawide + 10MP 3x Zoom',
      'Built-in Stylus': 'S Pen Included',
      'Battery': '5000mAh with 45W Fast Charging'
    },
    badges: ['Galaxy AI Powered', 'Save $120', 'Free Shipping'],
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra, unleash whole new levels of creativity, productivity and possibility.',
    features: [
      'Circle to Search with Google - draw a circle over anything on screen to search instantly',
      'Live Translate provides real-time voice and text translation during phone calls',
      '200MP camera with ProVisual Engine for stunning nightography shots',
      'Titanium shield exterior with Corning Gorilla Armor glass'
    ],
    inStock: true,
    modelNumber: 'SM-S928UZKEXAA',
    sku: '6570302',
    geekSquadProtectionPrice: 169.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-011',
    name: 'Nintendo Switch - OLED Model w/ White Joy-Con',
    category: 'Video Games & VR',
    brand: 'Nintendo',
    price: 349.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviewCount: 12400,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Screen': '7-inch Vibrant OLED Display',
      'Internal Storage': '64GB',
      'Audio': 'Enhanced Onboard Speakers',
      'Dock Ports': 'Wired LAN Port + HDMI + USB',
      'Modes': 'TV Mode, Tabletop Mode, Handheld Mode'
    },
    badges: ['Best Seller', 'Free Same-Day Store Pickup'],
    description: 'Feast your eyes on vivid colors and crisp contrast when you play on-the-go with the 7-inch OLED screen Nintendo Switch.',
    features: [
      '7-inch OLED screen displays vivid colors in handheld gaming',
      'Wide adjustable stand for comfortable viewing in tabletop mode',
      'Wired LAN port built into the dock for stable online play',
      'Supports all Joy-Con controllers and Nintendo Switch library'
    ],
    inStock: true,
    modelNumber: 'HEGSKAAAA',
    sku: '6470680',
    geekSquadProtectionPrice: 49.99,
    freeShipping: true,
    storePickupAvailable: true
  },
  {
    id: 'prod-012',
    name: 'Google Nest Learning Thermostat (3rd Gen) - Stainless Steel',
    category: 'Smart Home & Appliances',
    brand: 'Google',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 8900,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Compatibility': '95% of heating & cooling 24V systems',
      'Connectivity': 'Wi-Fi 802.11b/g/n, Bluetooth LE',
      'Display': '24-bit color LCD (480 x 480 resolution)',
      'Energy Star Certified': 'Yes'
    },
    badges: ['Energy Saver', 'Save $50', 'Rebate Eligible'],
    description: 'Learns the temperatures you like and creates an automatic schedule to save energy while keeping your home comfortable.',
    features: [
      'Auto-Schedule programs itself based on your temperature adjustments',
      'Home/Away Assist turns down heat/AC when you leave to prevent heating empty house',
      'Farsight lights up to show temperature, weather or clock across the room',
      'Remote control via Google Home App on smartphone or tablet'
    ],
    inStock: true,
    modelNumber: 'T3007ES',
    sku: '4346501',
    geekSquadProtectionPrice: 29.99,
    freeShipping: true,
    storePickupAvailable: true
  }
];
