export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  images: string[];
  salePrice: number;
  regularPrice: number;
  vehicleCompatibility: string[];
  SKU: string;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  attributes: Record<string, string>;
  shippingInfo: string;
  isNew?: boolean;
  isSale?: boolean;
  salePercentage?: number;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "hyundai-premium-leather-seat-covers",
    title: "Hyundai Premium Leather Seat Covers",
    description: "Premium quality genuine leather seat covers designed specifically for Hyundai vehicles. Provides ultimate comfort and luxury feel while protecting your original upholstery.",
    features: [
      "100% genuine leather material",
      "Custom fit for all Hyundai models",
      "Breathable design for all seasons",
      "Easy installation, no tools required",
      "Water-resistant coating",
      "5-year warranty"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Seat+Cover+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Seat+Cover+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Seat+Cover+3",
      "https://placehold.co/600x600/F8F8F8/111111?text=Seat+Cover+4"
    ],
    salePrice: 5999,
    regularPrice: 8999,
    vehicleCompatibility: ["Hyundai i10", "Hyundai i20", "Hyundai Verna", "Hyundai Creta", "Hyundai Tucson"],
    SKU: "HY-SC-001",
    stock: 45,
    category: "Interior",
    brand: "Hyundai",
    rating: 4.8,
    reviewCount: 234,
    attributes: { Material: "Genuine Leather", Color: "Black/Beige", "Installation": "Plug & Play" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 33
  },
  {
    id: "2",
    slug: "toyota-all-weather-floor-mats",
    title: "Toyota All-Weather Floor Mats",
    description: "Heavy-duty all-weather floor mats for Toyota vehicles. Designed to trap dirt, mud, and water while providing complete carpet protection.",
    features: [
      "Premium TPE material",
      "Custom molded fit for Toyota models",
      "Deep channels trap water and mud",
      "Non-slip backing",
      "Easy to clean - rinse with water",
      "UV resistant - never fades"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Floor+Mats+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Floor+Mats+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Floor+Mats+3"
    ],
    salePrice: 2499,
    regularPrice: 3499,
    vehicleCompatibility: ["Toyota Fortuner", "Toyota Innova", "Toyota Camry", "Toyota Corolla", "Toyota Glanza"],
    SKU: "TY-FM-001",
    stock: 120,
    category: "Interior",
    brand: "Toyota",
    rating: 4.6,
    reviewCount: 189,
    attributes: { Material: "TPE Rubber", Color: "Black", "Coverage": "Front & Rear" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: true,
    salePercentage: 29
  },
  {
    id: "3",
    slug: "mahindra-led-fog-lamp-kit",
    title: "Mahindra LED Fog Lamp Kit",
    description: "High-performance LED fog lamps for Mahindra vehicles. Superior brightness with a perfect beam pattern for improved visibility in foggy conditions.",
    features: [
      "Ultra-bright CREE LEDs",
      "6000K daylight white light",
      "IP68 waterproof rating",
      "Die-cast aluminum housing",
      "Universal fit for Mahindra models",
      "2-year warranty"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Fog+Lamp+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Fog+Lamp+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Fog+Lamp+3"
    ],
    salePrice: 3999,
    regularPrice: 5499,
    vehicleCompatibility: ["Mahindra Scorpio", "Mahindra XUV700", "Mahindra Thar", "Mahindra Bolero", "Mahindra XUV300"],
    SKU: "MH-LED-001",
    stock: 67,
    category: "Lighting",
    brand: "Mahindra",
    rating: 4.7,
    reviewCount: 156,
    attributes: { Type: "LED", Lumens: "4800lm", "Waterproof": "IP68" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 27
  },
  {
    id: "4",
    slug: "tata-dashboard-camera",
    title: "Tata Dashboard Camera",
    description: "Advanced dashboard camera with 4K resolution, wide-angle lens, and night vision for complete driving security.",
    features: [
      "4K Ultra HD recording",
      "170° wide-angle lens",
      "Sony STARVIS sensor",
      "Built-in GPS and Wi-Fi",
      "Parking mode with motion detection",
      "Loop recording with G-sensor"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Cam+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Cam+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Cam+3"
    ],
    salePrice: 8499,
    regularPrice: 11999,
    vehicleCompatibility: ["Tata Harrier", "Tata Safari", "Tata Nexon", "Tata Punch", "Tata Altroz"],
    SKU: "TT-DC-001",
    stock: 34,
    category: "Electronics",
    brand: "Tata",
    rating: 4.5,
    reviewCount: 198,
    attributes: { Resolution: "4K", "Field of View": "170°", "Night Vision": "Yes" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: true,
    salePercentage: 29
  },
  {
    id: "5",
    slug: "kia-chrome-door-visors",
    title: "Kia Chrome Door Visors",
    description: "Premium chrome-finished door visors for Kia vehicles. Allows fresh air circulation while keeping rain out.",
    features: [
      "High-grade acrylic material",
      "Chrome finish with UV protection",
      "Aerodynamic design reduces wind noise",
      "3M tape installation - no drilling",
      "Custom Fit for Kia models",
      "Includes all 4 doors"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Visors+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Visors+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Visors+3"
    ],
    salePrice: 2999,
    regularPrice: 3999,
    vehicleCompatibility: ["Kia Seltos", "Kia Sonet", "Kia Carnival", "Kia EV6", "Kia Carens"],
    SKU: "KI-DV-001",
    stock: 88,
    category: "Exterior",
    brand: "Kia",
    rating: 4.4,
    reviewCount: 143,
    attributes: { Material: "Acrylic", Finish: "Chrome", "Includes": "4 Door Visors" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 25
  },
  {
    id: "6",
    slug: "maruti-ergonomic-neck-pillow",
    title: "Maruti Ergonomic Neck Pillow",
    description: "Memory foam neck pillow designed for Maruti vehicles. Provides excellent neck and head support during long drives.",
    features: [
      "Premium memory foam core",
      "Breathable velour cover - removable & washable",
      "Adjustable elastic straps",
      "Ergonomic design reduces neck strain",
      "Universal fit for all Maruti models",
      "Pack of 2"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Pillow+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Pillow+2"
    ],
    salePrice: 999,
    regularPrice: 1499,
    vehicleCompatibility: ["Maruti Suzuki Swift", "Maruti Suzuki Baleno", "Maruti Suzuki Vitara Brezza", "Maruti Suzuki Dzire", "Maruti Suzuki Ertiga"],
    SKU: "MS-NP-001",
    stock: 200,
    category: "Interior",
    brand: "Maruti Suzuki",
    rating: 4.3,
    reviewCount: 312,
    attributes: { Material: "Memory Foam", Color: "Black", Pack: "2 Pillows" },
    shippingInfo: "Free shipping. Delivery in 2-3 business days.",
    isSale: true,
    salePercentage: 33
  },
  {
    id: "7",
    slug: "honda-multi-purpose-car-vacuum",
    title: "Honda Multi-Purpose Car Vacuum",
    description: "Powerful handheld vacuum cleaner designed for car interiors. 8000Pa suction power with multiple attachments.",
    features: [
      "8000Pa powerful suction",
      "Wireless - rechargeable battery",
      "HEPA filter traps allergens",
      "USB Type-C charging",
      "Includes crevice tool & brush",
      "30-minute runtime"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Vacuum+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Vacuum+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Vacuum+3"
    ],
    salePrice: 4499,
    regularPrice: 5999,
    vehicleCompatibility: ["Honda City", "Honda CR-V", "Honda Amaze", "Honda Elevate", "Honda Civic"],
    SKU: "HO-VC-001",
    stock: 56,
    category: "Cleaning",
    brand: "Honda",
    rating: 4.6,
    reviewCount: 167,
    attributes: {"Suction Power": "8000Pa", "Battery": "Rechargeable", "Runtime": "30 mins"},
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 25
  },
  {
    id: "8",
    slug: "mg-car-air-purifier",
    title: "MG Car Air Purifier",
    description: "Advanced air purification system for MG vehicles. Removes 99.97% of airborne particles including PM2.5, bacteria, and viruses.",
    features: [
      "True HEPA H13 filter",
      "Removes 99.97% of PM2.5 particles",
      "Activated carbon filter removes odors",
      "Auto mode with air quality sensor",
      "Smart app connectivity",
      "USB powered - easy installation"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Purifier+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Purifier+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Purifier+3"
    ],
    salePrice: 6999,
    regularPrice: 8999,
    vehicleCompatibility: ["MG Hector", "MG ZS EV", "MG Astor", "MG Gloster", "MG Comet"],
    SKU: "MG-AP-001",
    stock: 41,
    category: "Electronics",
    brand: "MG",
    rating: 4.7,
    reviewCount: 89,
    attributes: {"Filter": "HEPA H13", Coverage: "Up to 30 sq ft", "Smart Control": "App Enabled"},
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 22
  },
  {
    id: "9",
    slug: "skoda-alloy-wheel-set",
    title: "Skoda Diamond Cut Alloy Wheel Set",
    description: "Premium diamond-cut alloy wheels for Skoda vehicles. Lightweight design improves handling and fuel efficiency.",
    features: [
      "Diamond cut finish with gloss black inserts",
      "Lightweight aluminum alloy construction",
      "TUV and ISO certified",
      "Includes center caps and bolts",
      "Set of 4 wheels",
      "2-year structural warranty"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Wheels+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Wheels+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Wheels+3"
    ],
    salePrice: 45999,
    regularPrice: 55999,
    vehicleCompatibility: ["Skoda Octavia", "Skoda Superb", "Skoda Kushaq", "Skoda Slavia", "Skoda Kodiaq"],
    SKU: "SK-AW-001",
    stock: 15,
    category: "Exterior",
    brand: "Skoda",
    rating: 4.9,
    reviewCount: 67,
    attributes: { Size: "17 inch", Material: "Aluminum Alloy", "Set": "4 Wheels" },
    shippingInfo: "Free shipping. Delivery in 5-7 business days.",
    isSale: true,
    salePercentage: 18
  },
  {
    id: "10",
    slug: "volkswagen-led-interior-lighting-kit",
    title: "Volkswagen LED Interior Lighting Kit",
    description: "Transform your Volkswagen interior with customizable LED ambient lighting. 16 million colors with app control.",
    features: [
      "16 million color options",
      "Smartphone app & remote control",
      "Music sync mode",
      "Easy plug-and-play installation",
      "4 LED strips with adhesive backing",
      "2-year warranty"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=LED+Kit+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=LED+Kit+2",
      "https://placehold.co/600x600/ECECEC/111111?text=LED+Kit+3"
    ],
    salePrice: 2999,
    regularPrice: 4499,
    vehicleCompatibility: ["Volkswagen Virtus", "Volkswagen Taigun", "Volkswagen Tiguan", "Volkswagen Polo", "Volkswagen Passat"],
    SKU: "VW-LK-001",
    stock: 73,
    category: "Lighting",
    brand: "Volkswagen",
    rating: 4.5,
    reviewCount: 128,
    attributes: { Colors: "16 Million", Control: "App & Remote", "Includes": "4 Strips" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 33
  },
  {
    id: "11",
    slug: "hyundai-sport-steering-wheel-cover",
    title: "Hyundai Sport Steering Wheel Cover",
    description: "Premium sport-styled steering wheel cover with perforated leather grip for Hyundai vehicles.",
    features: [
      "Premium perforated leather",
      "Anti-slip silicone inner layer",
      "Sporty design with red stitching",
      "Universal fit for Hyundai models",
      "Easy installation - no tools",
      "Comfortable grip reduces fatigue"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Steering+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Steering+2"
    ],
    salePrice: 1499,
    regularPrice: 2199,
    vehicleCompatibility: ["Hyundai i10", "Hyundai i20", "Hyundai Verna", "Hyundai Creta", "Hyundai Tucson"],
    SKU: "HY-SW-001",
    stock: 92,
    category: "Interior",
    brand: "Hyundai",
    rating: 4.4,
    reviewCount: 201,
    attributes: { Material: "Perforated Leather", Color: "Black/Red", "Fit": "Universal" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "12",
    slug: "toyota-led-tail-lights",
    title: "Toyota LED Tail Light Assembly",
    description: "Premium LED tail light assembly with sequential turn signals for Toyota vehicles.",
    features: [
      "Full LED light array",
      "Sequential turn signal animation",
      "Smoked lens finish",
      "Plug-and-play installation",
      "OEM quality standards",
      "Waterproof sealed housing"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Tail+Light+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Tail+Light+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Tail+Light+3"
    ],
    salePrice: 12999,
    regularPrice: 16999,
    vehicleCompatibility: ["Toyota Fortuner", "Toyota Innova"],
    SKU: "TY-TL-001",
    stock: 23,
    category: "Lighting",
    brand: "Toyota",
    rating: 4.8,
    reviewCount: 76,
    attributes: { Type: "Full LED", Feature: "Sequential Signals", Lens: "Smoked" },
    shippingInfo: "Free shipping. Delivery in 4-6 business days.",
    isSale: true,
    salePercentage: 24
  },
  {
    id: "13",
    slug: "maruti-suzuki-alloy-pedals",
    title: "Maruti Suzuki Sport Pedal Set",
    description: "Racing-style aluminum pedal set for Maruti Suzuki vehicles. Adds sporty look with better grip.",
    features: [
      "CNC-machined aluminum",
      "Rubber grip pads for anti-slip",
      "Drill-free installation",
      "Includes accelerator, brake & clutch pedals",
      "Durable anodized finish"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Pedals+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Pedals+2"
    ],
    salePrice: 1799,
    regularPrice: 2499,
    vehicleCompatibility: ["Maruti Suzuki Swift", "Maruti Suzuki Baleno", "Maruti Suzuki Dzire"],
    SKU: "MS-PD-001",
    stock: 110,
    category: "Interior",
    brand: "Maruti Suzuki",
    rating: 4.3,
    reviewCount: 145,
    attributes: { Material: "Aluminum", "Grip": "Rubber Pads", "Set": "3 Pedals" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "14",
    slug: "honda-illuminated-door-sills",
    title: "Honda Illuminated Door Sill Plates",
    description: "Premium stainless steel door sill plates with LED illumination for Honda vehicles.",
    features: [
      "Stainless steel construction",
      "Blue LED illumination",
      "Laser-etched Honda logo",
      "Protects paint from scratches",
      "Easy installation - adhesive backing",
      "Connects to door switch for auto on/off"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Sills+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Sills+2"
    ],
    salePrice: 3499,
    regularPrice: 4999,
    vehicleCompatibility: ["Honda City", "Honda CR-V", "Honda Amaze"],
    SKU: "HO-DS-001",
    stock: 48,
    category: "Exterior",
    brand: "Honda",
    rating: 4.6,
    reviewCount: 94,
    attributes: { Material: "Stainless Steel", "Lighting": "Blue LED", "Set": "4 Door Sills" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 30
  },
  {
    id: "15",
    slug: "kia-piano-black-side-molding",
    title: "Kia Piano Black Side Molding",
    description: "Sleek piano black finish side moldings that protect your Kia's doors while adding a premium look.",
    features: [
      "ABS plastic with piano black finish",
      "Door edge protection",
      "3M adhesive tape installation",
      "Weather and UV resistant",
      "Set of 4 door protectors",
      "5-year color guarantee"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Molding+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Molding+2"
    ],
    salePrice: 2199,
    regularPrice: 2999,
    vehicleCompatibility: ["Kia Seltos", "Kia Sonet"],
    SKU: "KI-SM-001",
    stock: 65,
    category: "Exterior",
    brand: "Kia",
    rating: 4.2,
    reviewCount: 113,
    attributes: { Material: "ABS Plastic", Finish: "Piano Black", "Set": "4 Pieces" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "16",
    slug: "mahindra-heavy-duty-bumper-guard",
    title: "Mahindra Heavy Duty Bumper Guard",
    description: "Robust steel bumper guard for Mahindra SUVs. Provides maximum front-end protection for off-road adventures.",
    features: [
      "Heavy-duty steel construction",
      "Black powder-coated finish",
      "Integrated LED light mounts",
      "Towing hook compatible",
      "Bolt-on installation - no modification",
      "3-year anti-rust warranty"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Bumper+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Bumper+2",
      "https://placehold.co/600x600/ECECEC/111111?text=Bumper+3"
    ],
    salePrice: 15999,
    regularPrice: 19999,
    vehicleCompatibility: ["Mahindra Scorpio", "Mahindra Thar", "Mahindra XUV700"],
    SKU: "MH-BG-001",
    stock: 19,
    category: "Exterior",
    brand: "Mahindra",
    rating: 4.7,
    reviewCount: 82,
    attributes: { Material: "Mild Steel", Finish: "Powder Coated Black", "Weight": "12 kg" },
    shippingInfo: "Free shipping. Delivery in 5-7 business days.",
    isSale: true,
    salePercentage: 20
  },
  {
    id: "17",
    slug: "tata-smart-dash-matte-frame",
    title: "Tata Smart Dash Matte Frame",
    description: "Premium matte finish dashboard frame that eliminates glare and protects your Tata's dashboard.",
    features: [
      "Anti-glare matte finish",
      "Precision cut for perfect fit",
      "UV resistant - no fading",
      "Easy snap-on installation",
      "Reduces dashboard reflection",
      "Includes all vents and controls access"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Dash+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Dash+2"
    ],
    salePrice: 3999,
    regularPrice: 5499,
    vehicleCompatibility: ["Tata Harrier", "Tata Safari", "Tata Nexon"],
    SKU: "TT-DM-001",
    stock: 37,
    category: "Interior",
    brand: "Tata",
    rating: 4.5,
    reviewCount: 61,
    attributes: { Material: "ABS Plastic", Finish: "Matte Black", "Fit": "Custom" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "18",
    slug: "skoda-parcel-tray-cargo-liner",
    title: "Skoda Premium Parcel Tray & Cargo Liner",
    description: "Dual-function parcel tray and cargo liner combo for Skoda vehicles. Keeps trunk organized and protected.",
    features: [
      "Heavy-duty fabric construction",
      "Foldable design with cargo lip",
      "Waterproof backing",
      "Anti-slip surface",
      "Split-folding seat compatible",
      "Easy to clean"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Cargo+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Cargo+2"
    ],
    salePrice: 4499,
    regularPrice: 5999,
    vehicleCompatibility: ["Skoda Kushaq", "Skoda Slavia", "Skoda Octavia"],
    SKU: "SK-CL-001",
    stock: 29,
    category: "Interior",
    brand: "Skoda",
    rating: 4.4,
    reviewCount: 55,
    attributes: { Material: "Heavy-duty Fabric", Color: "Black", "Waterproof": "Yes" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "19",
    slug: "volkswagen-sport-exhaust-tip",
    title: "Volkswagen Sport Exhaust Tip Set",
    description: "Carbon fiber exhaust tip set for Volkswagen vehicles. Adds an aggressive sporty look to your car's rear.",
    features: [
      "Genuine carbon fiber construction",
      "TIG welded for durability",
      "Bolt-on installation",
      "Heat-resistant up to 800°C",
      "Set of 2 tips",
      "Lifetime warranty against defects"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Exhaust+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Exhaust+2"
    ],
    salePrice: 5999,
    regularPrice: 7999,
    vehicleCompatibility: ["Volkswagen Virtus", "Volkswagen Taigun", "Volkswagen Tiguan"],
    SKU: "VW-ET-001",
    stock: 42,
    category: "Exterior",
    brand: "Volkswagen",
    rating: 4.6,
    reviewCount: 73,
    attributes: { Material: "Carbon Fiber", "Set": "2 Tips", "Heat Resistance": "800°C" },
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 25
  },
  {
    id: "20",
    slug: "mg-floor-mounted-ambient-light",
    title: "MG Footwell Ambient Light Kit",
    description: "Premium footwell ambient lighting kit for MG vehicles. Creates a luxurious cabin atmosphere with multiple color modes.",
    features: [
      "4 RGB LED pods",
      "App and remote control",
      "Music sync and breathing modes",
      "Plug-and-play installation",
      "Soft touch aluminum pods",
      "2-year warranty"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Ambient+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Ambient+2"
    ],
    salePrice: 2499,
    regularPrice: 3499,
    vehicleCompatibility: ["MG Hector", "MG Astor", "MG ZS EV"],
    SKU: "MG-AL-001",
    stock: 58,
    category: "Lighting",
    brand: "MG",
    rating: 4.3,
    reviewCount: 97,
    attributes: { "Light Source": "RGB LED", Control: "App & Remote", "Number of Pods": "4" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "21",
    slug: "hyundai-soft-touch-dashboard-mat",
    title: "Hyundai Soft Touch Dashboard Mat",
    description: "Premium non-slip dashboard mat that protects your Hyundai's dashboard from UV damage and reduces glare.",
    features: [
      "High-quality felt material",
      "Anti-slip backing - no adhesive needed",
      "Reduces dashboard glare by 90%",
      "UV protection prevents cracking",
      "Custom cut for perfect fit",
      "Easy to clean with vacuum"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Dash+Mat+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Dash+Mat+2"
    ],
    salePrice: 1299,
    regularPrice: 1799,
    vehicleCompatibility: ["Hyundai Creta", "Hyundai i20", "Hyundai Verna"],
    SKU: "HY-DM-002",
    stock: 155,
    category: "Interior",
    brand: "Hyundai",
    rating: 4.2,
    reviewCount: 178,
    attributes: { Material: "Premium Felt", Color: "Black", "UV Protection": "Yes" },
    shippingInfo: "Free shipping. Delivery in 2-3 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "22",
    slug: "toyota-wireless-charging-pad",
    title: "Toyota Wireless Charging Pad",
    description: "Fast wireless charging pad designed to fit perfectly in Toyota's center console tray.",
    features: [
      "15W fast wireless charging",
      "Qi-compatible with all phones",
      "Silicone anti-slip surface",
      "LED charging indicator",
      "Overheating protection",
      "Plug-and-play - fits in cup holder tray"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Charger+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Charger+2"
    ],
    salePrice: 2499,
    regularPrice: 3499,
    vehicleCompatibility: ["Toyota Fortuner", "Toyota Innova", "Toyota Camry"],
    SKU: "TY-WC-001",
    stock: 84,
    category: "Electronics",
    brand: "Toyota",
    rating: 4.5,
    reviewCount: 134,
    attributes: {"Charging Speed": "15W", "Standard": "Qi Wireless", "Safety": "Overheat Protection"},
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "23",
    slug: "maruti-suzuki-trunk-organizer",
    title: "Maruti Suzuki Collapsible Trunk Organizer",
    description: "Versatile collapsible trunk organizer that keeps your Maruti's cargo area neat and tidy.",
    features: [
      "600D Oxford fabric construction",
      "Collapsible design when not in use",
      "Multiple compartments",
      "Reinforced bottom board",
      "Velcro straps prevent sliding",
      "20 kg load capacity"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Organizer+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Organizer+2"
    ],
    salePrice: 1799,
    regularPrice: 2499,
    vehicleCompatibility: ["Maruti Suzuki Swift", "Maruti Suzuki Baleno", "Maruti Suzuki Ertiga"],
    SKU: "MS-TO-001",
    stock: 96,
    category: "Interior",
    brand: "Maruti Suzuki",
    rating: 4.4,
    reviewCount: 89,
    attributes: { Material: "600D Oxford Fabric", Capacity: "20 kg", "Collapsible": "Yes" },
    shippingInfo: "Free shipping. Delivery in 2-4 business days.",
    isSale: false,
    salePercentage: 0
  },
  {
    id: "24",
    slug: "honda-window-sun-shades",
    title: "Honda Premium Retractable Sun Shades",
    description: "Custom-fit retractable sun shades for Honda vehicles. Keeps cabin cool and protects passengers from UV rays.",
    features: [
      "Premium mesh fabric blocks 95% UV",
      "Retractable design - easy to store",
      "Custom fit for each window",
      "Electrostatic adhesion - no clips",
      "Includes all 4 side windows",
      "Rear window shade included"
    ],
    images: [
      "https://placehold.co/600x600/ECECEC/111111?text=Shades+1",
      "https://placehold.co/600x600/F8F8F8/111111?text=Shades+2"
    ],
    salePrice: 3999,
    regularPrice: 5499,
    vehicleCompatibility: ["Honda City", "Honda CR-V", "Honda Amaze", "Honda Elevate"],
    SKU: "HO-SS-001",
    stock: 52,
    category: "Exterior",
    brand: "Honda",
    rating: 4.5,
    reviewCount: 156,
    attributes: {"UV Block": "95%", "Type": "Retractable Mesh", "Set": "5 Pieces"},
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    isSale: true,
    salePercentage: 27
  }
];

export const categories = [
  { id: "interior", name: "Interior", slug: "interior", image: "https://placehold.co/400x400/ECECEC/111111?text=Interior", count: 48 },
  { id: "exterior", name: "Exterior", slug: "exterior", image: "https://placehold.co/400x400/F8F8F8/111111?text=Exterior", count: 36 },
  { id: "lighting", name: "Lighting", slug: "lighting", image: "https://placehold.co/400x400/ECECEC/111111?text=Lighting", count: 24 },
  { id: "seat-covers", name: "Seat Covers", slug: "seat-covers", image: "https://placehold.co/400x400/F8F8F8/111111?text=Seat+Covers", count: 18 },
  { id: "floor-mats", name: "Floor Mats", slug: "floor-mats", image: "https://placehold.co/400x400/ECECEC/111111?text=Floor+Mats", count: 15 },
  { id: "cleaning", name: "Cleaning", slug: "cleaning", image: "https://placehold.co/400x400/F8F8F8/111111?text=Cleaning", count: 20 },
  { id: "electronics", name: "Electronics", slug: "electronics", image: "https://placehold.co/400x400/ECECEC/111111?text=Electronics", count: 30 },
  { id: "car-care", name: "Car Care", slug: "car-care", image: "https://placehold.co/400x400/F8F8F8/111111?text=Car+Care", count: 22 },
];

export const brands = [
  { id: "hyundai", name: "Hyundai", slug: "hyundai", logo: "https://placehold.co/200x80/ECECEC/111111?text=Hyundai" },
  { id: "toyota", name: "Toyota", slug: "toyota", logo: "https://placehold.co/200x80/F8F8F8/111111?text=Toyota" },
  { id: "maruti-suzuki", name: "Maruti Suzuki", slug: "maruti-suzuki", logo: "https://placehold.co/200x80/ECECEC/111111?text=Maruti" },
  { id: "mahindra", name: "Mahindra", slug: "mahindra", logo: "https://placehold.co/200x80/F8F8F8/111111?text=Mahindra" },
  { id: "tata", name: "Tata", slug: "tata", logo: "https://placehold.co/200x80/ECECEC/111111?text=Tata" },
  { id: "honda", name: "Honda", slug: "honda", logo: "https://placehold.co/200x80/F8F8F8/111111?text=Honda" },
  { id: "kia", name: "Kia", slug: "kia", logo: "https://placehold.co/200x80/ECECEC/111111?text=Kia" },
  { id: "mg", name: "MG", slug: "mg", logo: "https://placehold.co/200x80/F8F8F8/111111?text=MG" },
  { id: "skoda", name: "Skoda", slug: "skoda", logo: "https://placehold.co/200x80/ECECEC/111111?text=Skoda" },
  { id: "volkswagen", name: "Volkswagen", slug: "volkswagen", logo: "https://placehold.co/200x80/F8F8F8/111111?text=Volkswagen" },
];

export const vehicleData = {
  brands: [
    {
      name: "Hyundai",
      models: [
        { name: "i10", variants: ["Era", "Magna", "Sportz", "Asta"] },
        { name: "i20", variants: ["Magna", "Sportz", "Asta", "N Line"] },
        { name: "Verna", variants: ["S", "SX", "SX Turbo", "SX(O) Turbo"] },
        { name: "Creta", variants: ["E", "EX", "S", "SX", "SX Turbo", "SX(O)"] },
        { name: "Tucson", variants: ["GLS", "Platinum", "Signature"] }
      ]
    },
    {
      name: "Toyota",
      models: [
        { name: "Fortuner", variants: ["2.4 AT 4x2", "2.4 MT 4x4", "2.8 AT 4x4"] },
        { name: "Innova Crysta", variants: ["GX", "VX", "ZX", "Touring Sport"] },
        { name: "Camry", variants: ["Hybrid"] },
        { name: "Corolla", variants: ["GX", "GL", "VL"] },
        { name: "Glanza", variants: ["G", "S", "V"] }
      ]
    },
    {
      name: "Maruti Suzuki",
      models: [
        { name: "Swift", variants: ["LXi", "VXi", "ZXi", "ZXi+"] },
        { name: "Baleno", variants: ["Sigma", "Delta", "Zeta", "Alpha"] },
        { name: "Vitara Brezza", variants: ["LXi", "VXi", "ZXi", "ZXi+"] },
        { name: "Dzire", variants: ["LXi", "VXi", "ZXi", "ZXi+"] },
        { name: "Ertiga", variants: ["VXi", "ZXi", "ZXi+"] }
      ]
    },
    {
      name: "Mahindra",
      models: [
        { name: "Scorpio N", variants: ["Z2", "Z4", "Z6", "Z8"] },
        { name: "XUV700", variants: ["MX", "AX3", "AX5", "AX7"] },
        { name: "Thar", variants: ["AX 4x2", "AX 4x4", "LX 4x4"] },
        { name: "Bolero", variants: ["B4", "B6"] },
        { name: "XUV300", variants: ["W4", "W6", "W8", "W10"] }
      ]
    },
    {
      name: "Tata",
      models: [
        { name: "Harrier", variants: ["Smart", "Pure", "Adventure", "Fearless"] },
        { name: "Safari", variants: ["Smart", "Pure", "Adventure", "Fearless"] },
        { name: "Nexon", variants: ["Smart", "Smart+", "Pure", "Creative", "Fearless"] },
        { name: "Punch", variants: ["Pure", "Adventure", "Creative", "Accomplished"] },
        { name: "Altroz", variants: ["XE", "XM", "XT", "XZ"] }
      ]
    },
    {
      name: "Honda",
      models: [
        { name: "City", variants: ["SV", "V", "VX", "ZX"] },
        { name: "CR-V", variants: ["V", "VX", "ZX"] },
        { name: "Amaze", variants: ["E", "S", "V", "VX"] },
        { name: "Elevate", variants: ["SV", "V", "VX", "ZX"] },
        { name: "Civic", variants: ["V", "VX", "ZX"] }
      ]
    },
    {
      name: "Kia",
      models: [
        { name: "Seltos", variants: ["HTE", "HTK", "HTK+", "HTX", "HTX+", "GTX+"] },
        { name: "Sonet", variants: ["HTE", "HTK", "HTK+", "HTX", "GTX+"] },
        { name: "Carnival", variants: ["Premium", "Prestige", "Limousine"] },
        { name: "EV6", variants: ["Air", "Wind", "GT-Line"] },
        { name: "Carens", variants: ["Premium", "Prestige", "Luxury", "X-Line"] }
      ]
    },
    {
      name: "MG",
      models: [
        { name: "Hector", variants: ["Style", "Super", "Smart", "Sharp", "Savvy"] },
        { name: "ZS EV", variants: ["Excite", "Exclusive"] },
        { name: "Astor", variants: ["Style", "Super", "Smart", "Sharp"] },
        { name: "Gloster", variants: ["Super", "Smart", "Sharp", "Savvy"] },
        { name: "Comet", variants: ["Executive", "Excite", "Exclusive"] }
      ]
    },
    {
      name: "Skoda",
      models: [
        { name: "Octavia", variants: ["Style", "Sportline", "RS"] },
        { name: "Superb", variants: ["Style", "Sportline", "Laurin & Klement"] },
        { name: "Kushaq", variants: ["Active", "Ambition", "Style", "Monte Carlo"] },
        { name: "Slavia", variants: ["Active", "Ambition", "Style", "Monte Carlo"] },
        { name: "Kodiaq", variants: ["Style", "Sportline", "Laurin & Klement"] }
      ]
    },
    {
      name: "Volkswagen",
      models: [
        { name: "Virtus", variants: ["Dynamic", "GT", "GT Plus"] },
        { name: "Taigun", variants: ["Dynamic", "GT", "GT Plus"] },
        { name: "Tiguan", variants: ["Trendline", "Comfortline", "Highline"] },
        { name: "Polo", variants: ["Trendline", "Comfortline", "Highline", "GT"] },
        { name: "Passat", variants: ["Elegance"]

 }      ]
    }
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "Arun Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    text: "Absolutely thrilled with the quality of the seat covers I ordered for my Hyundai Creta. The leather feels premium and the fit is perfect. Installation was a breeze. Highly recommended!",
    avatar: "https://placehold.co/80x80/ECECEC/111111?text=AS"
  },
  {
    id: 2,
    name: "Priya Patel",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    text: "The floor mats for my Toyota Fortuner are amazing! They fit like a glove and the deep channels trap all the mud and water perfectly. Great quality at an affordable price.",
    avatar: "https://placehold.co/80x80/F8F8F8/111111?text=PP"
  },
  {
    id: 3,
    name: "Rahul Verma",
    city: "Delhi",
    rating: 5,
    text: "I've been looking for quality accessories for my Thar and finally found the perfect place. The LED fog lamps are incredibly bright and the build quality is outstanding.",
    avatar: "https://placehold.co/80x80/ECECEC/111111?text=RV"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    city: "Hyderabad, Telangana",
    rating: 4,
    text: "Great customer service and fast delivery! The dashboard camera for my Tata Nexon works perfectly. The 4K video quality is excellent and the night vision is impressive.",
    avatar: "https://placehold.co/80x80/F8F8F8/111111?text=SR"
  },
  {
    id: 5,
    name: "Vikram Singh",
    city: "Jaipur, Rajasthan",
    rating: 5,
    text: "Ordered chrome door visors for my Kia Seltos and they look absolutely stunning. The chrome finish is top-notch and installation took just 10 minutes. Very happy with the purchase!",
    avatar: "https://placehold.co/80x80/ECECEC/111111?text=VS"
  },
  {
    id: 6,
    name: "Ananya Gupta",
    city: "Pune, Maharashtra",
    rating: 5,
    text: "The neck pillows I bought for my Swift are so comfortable! Memory foam quality is excellent and the velour cover feels soft. Perfect for long drives. My family loves them!",
    avatar: "https://placehold.co/80x80/F8F8F8/111111?text=AG"
  },
  {
    id: 7,
    name: "Karan Mehta",
    city: "Bangalore, Karnataka",
    rating: 5,
    text: "Excellent quality car vacuum cleaner! The suction power is incredible and the wireless feature is super convenient. Perfect for keeping my Honda City's interior spotless.",
    avatar: "https://placehold.co/80x80/ECECEC/111111?text=KM"
  },
  {
    id: 8,
    name: "Neha Kapoor",
    city: "Chandigarh",
    rating: 4,
    text: "The air purifier for my MG Hector is a game-changer. The air quality in the cabin has improved noticeably. The app connectivity is a nice touch. Would definitely recommend!",
    avatar: "https://placehold.co/80x80/F8F8F8/111111?text=NK"
  },
  {
    id: 9,
    name: "Deepak Joshi",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    text: "Bought the alloy wheel set for my Skoda Octavia and the difference is remarkable. The car handles better and looks way more premium. The diamond cut finish is gorgeous!",
    avatar: "https://placehold.co/80x80/ECECEC/111111?text=DJ"
  },
  {
    id: 10,
    name: "Rohit Desai",
    city: "Surat, Gujarat",
    rating: 5,
    text: "The LED interior lighting kit transformed my Virtus completely. The app control is smooth and the music sync feature is awesome during night drives. Best purchase for my car!",
    avatar: "https://placehold.co/80x80/F8F8F8/111111?text=RD"
  }
];

export const blogPosts = [
  {
    id: 1,
    slug: "top-5-essential-car-accessories-for-monsoon",
    title: "Top 5 Essential Car Accessories for Monsoon Season",
    excerpt: "Prepare your vehicle for the rainy season with these must-have accessories that improve safety, comfort, and protection during monsoon driving.",
    image: "https://placehold.co/800x500/ECECEC/111111?text=Monsoon+Blog",
    category: "Car Care",
    date: "June 15, 2026",
    author: "AutoGuide Team"
  },
  {
    id: 2,
    slug: "how-to-choose-perfect-seat-covers-for-your-car",
    title: "How to Choose the Perfect Seat Covers for Your Car",
    excerpt: "A complete guide to selecting seat covers that match your car's interior, lifestyle needs, and budget while ensuring durability and comfort.",
    image: "https://placehold.co/800x500/F8F8F8/111111?text=Seat+Covers+Blog",
    category: "Interior",
    date: "June 8, 2026",
    author: "AutoGuide Team"
  },
  {
    id: 3,
    slug: "led-vs-halogen-headlights-which-is-better",
    title: "LED vs Halogen Headlights: Which is Better for Your Car?",
    excerpt: "Compare LED and halogen headlights to understand which lighting technology offers better performance, longevity, and value for your vehicle.",
    image: "https://placehold.co/800x500/ECECEC/111111?text=LED+Blog",
    category: "Lighting",
    date: "June 1, 2026",
    author: "AutoGuide Team"
  }
];

export const siteConfig = {
  name: "AutoPrestige",
  tagline: "Premium Car Accessories",
  description: "India's premier destination for premium car accessories. Shop at AutoPrestige for high-quality seat covers, floor mats, lighting, electronics, and more for all car brands.",
  url: "https://autoprestige.in",
  phone: "+91 1800-123-4567",
  email: "hello@autoprestige.in",
  address: "AutoPrestige, B-123, Sector 18, Noida, Uttar Pradesh 201301, India",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    twitter: "#",
    pinterest: "#"
  }
};
