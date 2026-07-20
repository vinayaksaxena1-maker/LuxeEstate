/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Builder, Agent, LocalityInfo, BlogPost, FAQItem } from "../types";

// Seeded random number generator for realistic, stable data
function createRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507) | 0;
    h = Math.imul(h ^ h >>> 13, 3266489909) | 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export const BUILDERS: Builder[] = [
  {
    id: "b1",
    name: "Godrej Properties",
    logo: "GP",
    experience: 33,
    projectsCount: 142,
    rating: 4.8,
    description: "Bringing the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry.",
    featuredProjects: ["Godrej Zenith", "Godrej Woods", "Godrej Horizon"]
  },
  {
    id: "b2",
    name: "Prestige Group",
    logo: "PG",
    experience: 37,
    projectsCount: 210,
    rating: 4.7,
    description: "One of India's leading developers, shaping the skyline of South India with premium residential and commercial structures.",
    featuredProjects: ["Prestige Jindal City", "Prestige Golfshire", "Prestige Falcon City"]
  },
  {
    id: "b3",
    name: "DLF Limited",
    logo: "DLF",
    experience: 75,
    projectsCount: 185,
    rating: 4.9,
    description: "The pioneer of modern infrastructure in Delhi NCR, delivering ultra-luxury residential complexes and corporate parks.",
    featuredProjects: ["DLF The Camellias", "DLF The Aralias", "DLF CyberCity"]
  },
  {
    id: "b4",
    name: "L&T Realty",
    logo: "LT",
    experience: 15,
    projectsCount: 48,
    rating: 4.7,
    description: "The real estate arm of Larsen & Toubro, prioritizing engineering excellence and trust-backed developments.",
    featuredProjects: ["L&T Emerald Isle", "L&T Seawoods Residences", "L&T Rejuve 360"]
  },
  {
    id: "b5",
    name: "Sobha Limited",
    logo: "SL",
    experience: 28,
    projectsCount: 118,
    rating: 4.8,
    description: "Renowned for international-quality finishes, backward integration, and meticulous attention to structural detail.",
    featuredProjects: ["Sobha Royal Pavilion", "Sobha Dream Acres", "Sobha Windsor"]
  },
  {
    id: "b6",
    name: "Lodha Group",
    logo: "LODHA",
    experience: 43,
    projectsCount: 160,
    rating: 4.6,
    description: "Delivering the world's finest developments including luxury residences, integrated townships, and grade-A offices.",
    featuredProjects: ["Lodha World Towers", "Lodha Bellissimo", "Lodha Park"]
  }
];

export const AGENTS: Agent[] = [
  {
    id: "a1",
    name: "Rajesh Sharma",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250&h=250",
    agency: "Apex Realty Solutions",
    experience: 12,
    activeListings: 24,
    rating: 4.9,
    specialization: ["Luxury Apartments", "Villas", "Bandra & Worli"],
    phone: "+91 98765 43210",
    email: "rajesh@apexrealty.in"
  },
  {
    id: "a2",
    name: "Priya Nair",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250",
    agency: "Indiranagar Estates",
    experience: 8,
    activeListings: 18,
    rating: 4.8,
    specialization: ["Premium Condos", "Commercial Leasing", "Indiranagar & HSR"],
    phone: "+91 87654 32109",
    email: "priya@indiranagarestates.com"
  },
  {
    id: "a3",
    name: "Amit Verma",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250&h=250",
    agency: "NCR Prime Properties",
    experience: 15,
    activeListings: 35,
    rating: 4.95,
    specialization: ["Golf Estates", "Penthouses", "Gurgaon DLF Phases"],
    phone: "+91 76543 21098",
    email: "amit@ncrprime.com"
  },
  {
    id: "a4",
    name: "Anjali Deshmukh",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250&h=250",
    agency: "West Pune Habitats",
    experience: 6,
    activeListings: 12,
    rating: 4.7,
    specialization: ["Affordable Homes", "New Projects", "Baner & Hinjewadi"],
    phone: "+91 95432 10987",
    email: "anjali@punehabitats.com"
  },
  {
    id: "a5",
    name: "Karthik Reddy",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250&h=250",
    agency: "Deccan Luxury Assets",
    experience: 10,
    activeListings: 29,
    rating: 4.85,
    specialization: ["High-rise Gated Communities", "Plots", "Gachibowli"],
    phone: "+91 84321 09876",
    email: "karthik@deccanassets.in"
  },
  {
    id: "a6",
    name: "Meera Krishnan",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250&h=250",
    agency: "OMR Property Advisors",
    experience: 9,
    activeListings: 20,
    rating: 4.6,
    specialization: ["Sea-facing Villas", "IT Park Offices", "Adyar & OMR"],
    phone: "+91 93210 98765",
    email: "meera@omradvisors.com"
  }
];

export const LOCALITIES: LocalityInfo[] = [
  {
    id: "l1",
    name: "Bandra West",
    city: "Mumbai",
    avgPricePerSqFt: 55000,
    yoyGrowth: 12.4,
    livabilityScore: 9.2,
    highlights: ["Sea-facing views", "Cafes & nightlife", "Celebrity hubs", "Premium connectivity"],
    rating: 4.8
  },
  {
    id: "l2",
    name: "Worli",
    city: "Mumbai",
    avgPricePerSqFt: 62000,
    yoyGrowth: 8.9,
    livabilityScore: 9.0,
    highlights: ["Sea Link access", "Ultra-luxury towers", "Premium offices", "Central Location"],
    rating: 4.7
  },
  {
    id: "l3",
    name: "Indiranagar",
    city: "Bangalore",
    avgPricePerSqFt: 18500,
    yoyGrowth: 15.2,
    livabilityScore: 9.5,
    highlights: ["Retail high street", "Metro connectivity", "Excellent green cover", "Elite social scene"],
    rating: 4.9
  },
  {
    id: "l4",
    name: "Whitefield",
    city: "Bangalore",
    avgPricePerSqFt: 8800,
    yoyGrowth: 14.8,
    livabilityScore: 8.5,
    highlights: ["Major IT parks", "Upcoming metro access", "Large gated townships", "International schools"],
    rating: 4.4
  },
  {
    id: "l5",
    name: "DLF Phase 5",
    city: "Delhi NCR",
    avgPricePerSqFt: 22000,
    yoyGrowth: 11.2,
    livabilityScore: 9.3,
    highlights: ["Golf course road", "Gated high security", "Top corporate offices", "Premium malls"],
    rating: 4.8
  },
  {
    id: "l6",
    name: "Koregaon Park",
    city: "Pune",
    avgPricePerSqFt: 16500,
    yoyGrowth: 9.8,
    livabilityScore: 9.4,
    highlights: ["Lush green lanes", "Osho ashram", "Premium bistros", "Upscale boutique stays"],
    rating: 4.7
  },
  {
    id: "l7",
    name: "Gachibowli",
    city: "Hyderabad",
    avgPricePerSqFt: 9200,
    yoyGrowth: 16.5,
    livabilityScore: 8.9,
    highlights: ["Financial District hub", "Outer Ring Road link", "Premium sports complexes", "Top universities"],
    rating: 4.6
  },
  {
    id: "l8",
    name: "Adyar",
    city: "Chennai",
    avgPricePerSqFt: 15000,
    yoyGrowth: 7.5,
    livabilityScore: 9.1,
    highlights: ["Historic neighborhood", "Beach proximity", "Reputed research hubs", "Quiet residential lanes"],
    rating: 4.6
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog1",
    title: "Indian Real Estate Trends: What to Expect in 2026/2027",
    excerpt: "With interest rates stabilizing and a massive surge in high-net-worth investments, India's luxury real estate is set for an unprecedented run.",
    content: "The Indian residential real estate market is undergoing a structural transition. Demand for larger spaces, particularly 3 BHK and 4 BHK premium apartments, has outpaced smaller configurations. Technology integration via smart home features, advanced security, and sustainable green buildings has shifted from a novelty to a necessity. Gurgaon, North Bangalore, and Western Pune continue to be the primary investment vectors, driven by continuous corporate expansions and infrastructure expansions such as new metro lines and expressways.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    category: "Market Trends",
    author: "Pranav Goel",
    date: "July 12, 2026",
    readTime: "5 min read"
  },
  {
    id: "blog2",
    title: "The Impact of RERA on Buyer Protection: A 10-Year Retrospective",
    excerpt: "Understanding your rights under the Real Estate Regulation Act and how it keeps builders accountable for project delays.",
    content: "RERA has fundamentally re-established trust in Indian real estate. Previously, project delays and carpet-area disputes plagued buyers. Today, builders must register every project and deposit 70% of collection funds in escrow accounts dedicated purely to construction costs. This guide breaks down what RERA numbers mean, how to verify them on state registries, and the legal recourses available to buyers in case of possession delays.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=600",
    category: "Legal & Advisory",
    author: "Adv. Meenakshi Iyer",
    date: "June 28, 2026",
    readTime: "7 min read"
  },
  {
    id: "blog3",
    title: "Co-Living vs. Standard Renting: Which yields higher ROI?",
    excerpt: "An analysis of the modern rental market for young IT professionals in Bangalore, Pune, and Hyderabad.",
    content: "The millennial and Gen Z workforce in major IT hubs is bypassing standard rental contracts for flexible co-living spaces. For property owners, transitioning standard apartments into co-living structures can boost gross rental yields from the typical 2.5-3.5% up to an impressive 6-8%. However, this comes with higher operational expenses, rapid tenant turnovers, and furnishing costs. We analyze the balance sheet to help you make an informed investment decision.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
    category: "Investment Strategy",
    author: "Rohan Kamath",
    date: "May 15, 2026",
    readTime: "4 min read"
  },
  {
    id: "blog4",
    title: "Designing the Perfect Home: Minimalism Meets Indian Vastu",
    excerpt: "How premium luxury builders are seamlessly integrating traditional Vastu principles with contemporary minimalist design philosophies.",
    content: "Can clean, Scandinavian-style minimalism align with centuries-old Vastu Shastra principles? Modern luxury projects are demonstrating that spatial layouts with open-floor concepts and neutral, warm palettes actually reinforce Vastu guidelines. Proper entry directions, placing heavy furniture in south-west sectors, and prioritizing natural air and light circulation perfectly match the functional aesthetic of upscale architectural designs today.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600",
    category: "Home Design",
    author: "Shreya Sen (Architect)",
    date: "April 02, 2026",
    readTime: "6 min read"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "What is RERA, and why is it important when buying property?",
    answer: "RERA stands for the Real Estate Regulatory Authority. Established under the Real Estate (Regulation and Development) Act, it enforces transparency, structural accountability, and timely completion in real estate projects. RERA-approved properties are strictly vetted, making sure the builder cannot divert construction funds or alter floor plans unilaterally.",
    category: "Legal"
  },
  {
    id: "faq2",
    question: "How is the EMI (Equated Monthly Installment) calculated for home loans?",
    answer: "EMI is calculated based on three factors: the principal loan amount, the annual rate of interest, and the loan tenure (in months). The standard formula is: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1], where P is Principal, r is monthly interest rate, and n is tenure in months. You can use our integrated Home Loan Mortgage Calculator to model various scenarios.",
    category: "Financial"
  },
  {
    id: "faq3",
    question: "What is the difference between carpet area, built-up area, and super built-up area?",
    answer: "Carpet area is the actual usable area inside the walls where you can lay a carpet (excluding wall thickness). Built-up area includes carpet area plus the thickness of inner/outer walls and balcony areas. Super built-up area includes built-up area plus a proportionate share of common amenities like lobbies, elevator shafts, stairs, and clubhouse areas.",
    category: "Technical"
  },
  {
    id: "faq4",
    question: "How does LuxeEstate calculate its AI Investment Score?",
    answer: "Our AI Investment Score is compiled using several real-time data inputs: historic price growth of the locality, density of nearby Class-A corporate IT parks, proximity to active/upcoming metro lines, livability ratings (air quality, school densities), and general demand liquidity index on our platform.",
    category: "AI Features"
  },
  {
    id: "faq5",
    question: "What legal documents must I verify before purchasing a resale property?",
    answer: "Essential documents include the Sale Deed, Mother Deed (to trace history), Land Allotment Certificate, Encumbrance Certificate (minimum 13-30 years history confirming no active mortgages), Building Plan Sanction, Occupancy Certificate (OC) issued by civic bodies, and up-to-date Tax Paid Receipts.",
    category: "Legal"
  },
  {
    id: "faq6",
    question: "What are the average maintenance fees in luxury gated high-rises?",
    answer: "Maintenance charges in luxury gated societies typically range from ₹3 to ₹8 per sq. ft. per month, depending on the scale of premium amenities (such as infinity swimming pools, concierge, round-the-clock power back-ups, and security automation).",
    category: "Financial"
  },
  {
    id: "faq7",
    question: "Can Non-Resident Indians (NRIs) purchase residential property in India?",
    answer: "Yes, under general permissions granted by the Reserve Bank of India (RBI), NRIs can buy residential and commercial properties in India. However, they cannot purchase agricultural land, plantation properties, or farmhouses unless specifically permitted.",
    category: "Legal"
  }
];

// Helper images to use dynamically
const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", // Luxe Modern
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", // Villa
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800", // High rise
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800", // Modern interior
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800", // Premium bathrooms/interior
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", // Commercial building
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800", // Plot / land green
  "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&q=80&w=800", // Plot scenic
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", // Premium Office
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800", // Elegant desk
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800", // Gated high rise
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"  // Luxury villa pool
];

const LOCALITY_POOL: Record<string, string[]> = {
  "Mumbai": ["Bandra West", "Worli", "Juhu", "Thane West", "Andheri East"],
  "Bangalore": ["Indiranagar", "Whitefield", "HSR Layout", "Koramangala", "Yelahanka"],
  "Delhi NCR": ["Gurgaon Phase 5", "Noida Sector 62", "Vasant Kunj", "Dwarka"],
  "Pune": ["Koregaon Park", "Baner", "Hinjewadi", "Wakad"],
  "Hyderabad": ["Gachibowli", "Jubilee Hills", "Madhapur", "Kondapur"],
  "Chennai": ["Adyar", "OMR", "Anna Nagar", "Velachery"]
};

const AMENITY_POOL = [
  "Infinity Swimming Pool", "State-of-the-art Gym", "24x7 High Security with CCTV", 
  "100% Power Backup", "Clubhouse with Lounge", "Children's Play Zone", 
  "Vastu Compliant Design", "Tennis & Squash Courts", "Rainwater Harvesting",
  "High Speed Elevators", "Dedicated Pet Park", "Jogging & Cycling Track",
  "EV Charging Stations", "Amphitheatre", "Spa & Wellness Center", "Banquets Hall"
];

const SCHOOL_POOL = ["Delhi Public School", "The International School Bangalore", "Oakridge International", "Dhirubhai Ambani International", "Podar International School"];
const HOSPITAL_POOL = ["Apollo Hospitals", "Fortis Healthcare", "Manipal Hospital", "Max Super Speciality", "Kokilaben Dhirubhai Ambani Hospital"];
const METRO_POOL = ["Metro Station - 500m", "Central Metro Junction - 1km", "Metro Station - 1.2km", "Rapid Metro Line - 800m"];
const MALL_POOL = ["Phoenix Marketcity", "Inorbit Mall", "DLF Emporio", "Nexus Mall", "Orion Mall", "High Street Phoenix"];

const ADJECTIVES = ["Premium", "Elegant", "Luxe", "Grand", "Royal", "Scenic", "Imperial", "Elite", "Signature", "Vibrant", "Smart", "Green"];
const TYPES_NOUNS = {
  "Apartment": ["Residences", "Suites", "Heights", "Penthouses", "Estates", "Towers", "Spires"],
  "Villa": ["Manor", "Enclave", "Villas", "Bungalows", "Sanctuary", "Retreat", "Estates"],
  "Commercial": ["Business Park", "Cyber Plaza", "Trade Center", "Corporate Tower", "Offices"],
  "Plot": ["Meadows", "Enclave", "Green Acres", "Plaza Plots", "County", "Eco Farms"]
};

// Seeded property generator to build exactly 150 items
function generate150Properties(): Property[] {
  const propertiesList: Property[] = [];
  const rng = createRandom("LuxeEstateRealEstateAIEngineSeed2026");

  // Hardcode 6 ultra-luxury featured properties first to guarantee perfect visuals
  const featured: Property[] = [
    {
      id: "p1",
      title: "The Celestial Penthouse & Sky-Suites",
      price: 125000000, // 12.5 Cr
      formattedPrice: "₹12.50 Cr",
      emi: "₹6.15 Lac/mo",
      type: "Apartment",
      purpose: "Buy",
      isNewProject: true,
      isVerified: true,
      isReraApproved: true,
      builderName: "Lodha Group",
      address: "Tower A, Lodha World Towers, Worli",
      locality: "Worli",
      city: "Mumbai",
      area: 4800,
      bedrooms: 4,
      bathrooms: 5,
      parking: true,
      furnishing: "Fully Furnished",
      images: [PROPERTY_IMAGES[0], PROPERTY_IMAGES[3], PROPERTY_IMAGES[4], PROPERTY_IMAGES[11]],
      description: "Perched on the 82nd floor, this architectural masterpiece overlooks the Arabian Sea with panoramic 360-degree views. Boasting full custom Italian marble, smart automation, private elevator access, and a custom plunge pool.",
      reraNumber: "PRM/MUM/RERA/2026/0401",
      postedDate: "2026-07-15",
      investmentScore: 94,
      roi: 7.2,
      priceTrend: [
        { year: 2022, pricePerSqFt: 21000 },
        { year: 2023, pricePerSqFt: 22800 },
        { year: 2024, pricePerSqFt: 24500 },
        { year: 2025, pricePerSqFt: 25500 },
        { year: 2026, pricePerSqFt: 26041 }
      ],
      amenities: ["Infinity Swimming Pool", "State-of-the-art Gym", "24x7 High Security with CCTV", "100% Power Backup", "Clubhouse with Lounge", "EV Charging Stations"],
      nearbyPlaces: {
        schools: ["Dhirubhai Ambani International", "Podar International School"],
        hospitals: ["Kokilaben Dhirubhai Ambani Hospital", "Apollo Hospitals"],
        metro: ["Central Metro Junction - 1km"],
        malls: ["High Street Phoenix", "Phoenix Marketcity"]
      },
      contact: {
        name: "Rajesh Sharma",
        role: "Broker",
        phone: "+91 98765 43210",
        email: "rajesh@apexrealty.in"
      }
    },
    {
      id: "p2",
      title: "Prestige Golfshire Signature Mansion",
      price: 180000000, // 18 Cr
      formattedPrice: "₹18.00 Cr",
      emi: "₹8.85 Lac/mo",
      type: "Villa",
      purpose: "Buy",
      isNewProject: false,
      isVerified: true,
      isReraApproved: true,
      builderName: "Prestige Group",
      address: "Villa 42, Prestige Golfshire, Nandi Hills Road",
      locality: "Yelahanka",
      city: "Bangalore",
      area: 8200,
      bedrooms: 5,
      bathrooms: 6,
      parking: true,
      furnishing: "Fully Furnished",
      images: [PROPERTY_IMAGES[1], PROPERTY_IMAGES[11], PROPERTY_IMAGES[3], PROPERTY_IMAGES[4]],
      description: "Set inside Bangalore's premier golf course community, this super-villa is framed by serene rolling greens. Features an private 18-hole golf view terrace, personal spa deck, private temperature-controlled pool, and triple garage.",
      reraNumber: "PRM/KA/RERA/1251/0045",
      postedDate: "2026-07-10",
      investmentScore: 89,
      roi: 6.8,
      priceTrend: [
        { year: 2022, pricePerSqFt: 17500 },
        { year: 2023, pricePerSqFt: 18900 },
        { year: 2024, pricePerSqFt: 20100 },
        { year: 2025, pricePerSqFt: 21500 },
        { year: 2026, pricePerSqFt: 21951 }
      ],
      amenities: ["Infinity Swimming Pool", "State-of-the-art Gym", "Tennis & Squash Courts", "Spa & Wellness Center", "EV Charging Stations", "Amphitheatre"],
      nearbyPlaces: {
        schools: ["The International School Bangalore"],
        hospitals: ["Manipal Hospital", "Aster CMI"],
        metro: ["Yelahanka Metro - 3km"],
        malls: ["Nexus Mall", "Orion Mall"]
      },
      contact: {
        name: "Priya Nair",
        role: "Builder Agent",
        phone: "+91 87654 32109",
        email: "priya@indiranagarestates.com"
      }
    },
    {
      id: "p3",
      title: "Godrej Zenith Tech-Smart Office Suites",
      price: 240000, // 2.4 Lac/mo rent
      formattedPrice: "₹2.40 Lac/mo",
      emi: "Rentals",
      type: "Commercial",
      purpose: "Rent",
      isNewProject: true,
      isVerified: true,
      isReraApproved: true,
      builderName: "Godrej Properties",
      address: "Floor 12, Godrej Zenith Business Plaza, Gachibowli",
      locality: "Gachibowli",
      city: "Hyderabad",
      area: 3400,
      parking: true,
      furnishing: "Fully Furnished",
      images: [PROPERTY_IMAGES[5], PROPERTY_IMAGES[8], PROPERTY_IMAGES[9], PROPERTY_IMAGES[3]],
      description: "Modern tech-enabled co-working or custom corporate suite setup in Hyderabad's premier IT corridor. Includes robust double-redundant fiber backup, biometric security corridors, boardrooms, private cabins, and an dynamic pantry space.",
      reraNumber: "PRM/TS/RERA/2401/0188",
      postedDate: "2026-07-18",
      investmentScore: 92,
      roi: 9.1,
      priceTrend: [
        { year: 2022, pricePerSqFt: 60 },
        { year: 2023, pricePerSqFt: 65 },
        { year: 2024, pricePerSqFt: 68 },
        { year: 2025, pricePerSqFt: 70 },
        { year: 2026, pricePerSqFt: 71 }
      ],
      amenities: ["24x7 High Security with CCTV", "100% Power Backup", "Clubhouse with Lounge", "EV Charging Stations", "High Speed Elevators", "Banquets Hall"],
      nearbyPlaces: {
        schools: ["Oakridge International"],
        hospitals: ["Apollo Hospitals", "Continental Hospitals"],
        metro: ["Gachibowli Metro Link - 200m"],
        malls: ["Inorbit Mall", "IKEA Hyderabad"]
      },
      contact: {
        name: "Karthik Reddy",
        role: "Broker",
        phone: "+91 84321 09876",
        email: "karthik@deccanassets.in"
      }
    },
    {
      id: "p4",
      title: "The Camellias Ultra Luxury Estate",
      price: 420000000, // 42 Cr
      formattedPrice: "₹42.00 Cr",
      emi: "₹20.65 Lac/mo",
      type: "Apartment",
      purpose: "Buy",
      isNewProject: false,
      isVerified: true,
      isReraApproved: true,
      builderName: "DLF Limited",
      address: "DLF Golf Course Road, DLF Phase 5",
      locality: "Gurgaon Phase 5",
      city: "Delhi NCR",
      area: 7400,
      bedrooms: 4,
      bathrooms: 6,
      parking: true,
      furnishing: "Semi-Furnished",
      images: [PROPERTY_IMAGES[2], PROPERTY_IMAGES[3], PROPERTY_IMAGES[4], PROPERTY_IMAGES[0]],
      description: "Recognized as India's most prestigious luxury address. Offers unmatched high-volume ceilings, master layout designs by international award-winning architects, customized service staff quarters, and gold-level golf course rights.",
      reraNumber: "PRM/HR/RERA/0012/0350",
      postedDate: "2026-07-01",
      investmentScore: 98,
      roi: 6.5,
      priceTrend: [
        { year: 2022, pricePerSqFt: 42000 },
        { year: 2023, pricePerSqFt: 46000 },
        { year: 2024, pricePerSqFt: 51000 },
        { year: 2025, pricePerSqFt: 54000 },
        { year: 2026, pricePerSqFt: 56756 }
      ],
      amenities: ["Infinity Swimming Pool", "State-of-the-art Gym", "Clubhouse with Lounge", "Tennis & Squash Courts", "Spa & Wellness Center", "Amphitheatre"],
      nearbyPlaces: {
        schools: ["Delhi Public School"],
        hospitals: ["Max Super Speciality", "Medanta The Medicity"],
        metro: ["Rapid Metro Line - 800m"],
        malls: ["DLF Emporio", "Horizon Center Galleries"]
      },
      contact: {
        name: "Amit Verma",
        role: "Builder Agent",
        phone: "+91 76543 21098",
        email: "amit@ncrprime.com"
      }
    },
    {
      id: "p5",
      title: "Indiranagar Boulevard Luxury Townhouse",
      price: 45000000, // 4.5 Cr
      formattedPrice: "₹4.50 Cr",
      emi: "₹2.21 Lac/mo",
      type: "Villa",
      purpose: "Buy",
      isNewProject: true,
      isVerified: true,
      isReraApproved: true,
      builderName: "Sobha Limited",
      address: "Sobha Windsor, Indiranagar High Streets",
      locality: "Indiranagar",
      city: "Bangalore",
      area: 3600,
      bedrooms: 3,
      bathrooms: 4,
      parking: true,
      furnishing: "Fully Furnished",
      images: [PROPERTY_IMAGES[11], PROPERTY_IMAGES[0], PROPERTY_IMAGES[3], PROPERTY_IMAGES[1]],
      description: "A rare boutique luxury townhouse set inside quiet residential Indiranagar lanes. Showcases full brick-facade aesthetic, modern smart automated control hubs, multi-tier rooftop gardening terraces, and elegant sun-roof corridors.",
      reraNumber: "PRM/KA/RERA/1544/0091",
      postedDate: "2026-07-11",
      investmentScore: 95,
      roi: 8.4,
      priceTrend: [
        { year: 2022, pricePerSqFt: 10000 },
        { year: 2023, pricePerSqFt: 11200 },
        { year: 2024, pricePerSqFt: 11900 },
        { year: 2025, pricePerSqFt: 12300 },
        { year: 2026, pricePerSqFt: 12500 }
      ],
      amenities: ["State-of-the-art Gym", "24x7 High Security with CCTV", "100% Power Backup", "Clubhouse with Lounge", "Dedicated Pet Park", "Jogging & Cycling Track"],
      nearbyPlaces: {
        schools: ["Frank Anthony Public School"],
        hospitals: ["Manipal Hospital"],
        metro: ["Indiranagar Metro - 400m"],
        malls: ["100 Feet Road Shopping Hub"]
      },
      contact: {
        name: "Priya Nair",
        role: "Owner",
        phone: "+91 87654 32109",
        email: "priya@indiranagarestates.com"
      }
    },
    {
      id: "p6",
      title: "Koregaon Park Estate Plots",
      price: 28000000, // 2.8 Cr
      formattedPrice: "₹2.80 Cr",
      emi: "₹1.38 Lac/mo",
      type: "Plot",
      purpose: "Buy",
      isNewProject: true,
      isVerified: true,
      isReraApproved: true,
      builderName: "L&T Realty",
      address: "Lane 5, Koregaon Park near Osho Ashram",
      locality: "Koregaon Park",
      city: "Pune",
      area: 2400,
      parking: false,
      furnishing: "Unfurnished",
      images: [PROPERTY_IMAGES[6], PROPERTY_IMAGES[7], PROPERTY_IMAGES[1], PROPERTY_IMAGES[11]],
      description: "Extremely scarce fully gated residential plot ready for high-spec custom villa construction inside prestigious Koregaon Park Lane 5. Features fully set electrical conduits, private water pipelines, black-topped approach lanes.",
      reraNumber: "PRM/PUNE/RERA/0119/2026",
      postedDate: "2026-07-05",
      investmentScore: 91,
      roi: 7.9,
      priceTrend: [
        { year: 2022, pricePerSqFt: 9200 },
        { year: 2023, pricePerSqFt: 10100 },
        { year: 2024, pricePerSqFt: 10900 },
        { year: 2025, pricePerSqFt: 11300 },
        { year: 2026, pricePerSqFt: 11666 }
      ],
      amenities: ["24x7 High Security with CCTV", "Rainwater Harvesting", "Dedicated Pet Park", "Jogging & Cycling Track"],
      nearbyPlaces: {
        schools: ["St. Mary's School Pune"],
        hospitals: ["Inlaks & Budhrani Hospital"],
        metro: ["Bund Garden Metro Station - 1.5km"],
        malls: ["Nitesh Hub Mall"]
      },
      contact: {
        name: "Anjali Deshmukh",
        role: "Broker",
        phone: "+91 95432 10987",
        email: "anjali@punehabitats.com"
      }
    }
  ];

  // Add the initial 6
  propertiesList.push(...featured);

  // Programmatically generate remaining 144 items to hit exactly 150
  const cities = ["Mumbai", "Bangalore", "Delhi NCR", "Pune", "Hyderabad", "Chennai"];
  const types = ["Apartment", "Villa", "Commercial", "Plot"] as const;
  const purposes = ["Buy", "Rent"] as const;
  const furnishings = ["Unfurnished", "Semi-Furnished", "Fully Furnished"] as const;

  for (let i = 7; i <= 150; i++) {
    const city = cities[Math.floor(rng() * cities.length)];
    const cityLocalities = LOCALITY_POOL[city] || ["Central Hub"];
    const locality = cityLocalities[Math.floor(rng() * cityLocalities.length)];
    const type = types[Math.floor(rng() * types.length)];
    
    // Plots are always 'Buy'
    const purpose = type === "Plot" ? "Buy" : purposes[rng() > 0.35 ? 0 : 1];
    
    const isNewProject = rng() > 0.6;
    const isVerified = rng() > 0.2;
    const isReraApproved = rng() > 0.15;
    
    const builder = BUILDERS[Math.floor(rng() * BUILDERS.length)];
    const agent = AGENTS[Math.floor(rng() * AGENTS.length)];

    // Generate price and area based on category
    let price = 0;
    let area = 1000 + Math.floor(rng() * 4000); // 1000 - 5000 sq ft
    
    if (purpose === "Buy") {
      if (type === "Apartment") {
        price = 6000000 + Math.floor(rng() * 44000000); // 60 Lacs to 5 Cr
      } else if (type === "Villa") {
        price = 15000000 + Math.floor(rng() * 135000000); // 1.5 Cr to 15 Cr
        area = 2500 + Math.floor(rng() * 5500);
      } else if (type === "Commercial") {
        price = 20000000 + Math.floor(rng() * 180000000); // 2 Cr to 20 Cr
        area = 1500 + Math.floor(rng() * 8000);
      } else { // Plot
        price = 3000000 + Math.floor(rng() * 47000000); // 30 Lacs to 5 Cr
        area = 1200 + Math.floor(rng() * 3800);
      }
    } else { // Rent
      if (type === "Apartment") {
        price = 18000 + Math.floor(rng() * 132000); // 18k to 1.5L / mo
      } else if (type === "Villa") {
        price = 50000 + Math.floor(rng() * 350000); // 50k to 4L / mo
        area = 2200 + Math.floor(rng() * 3800);
      } else { // Commercial
        price = 45000 + Math.floor(rng() * 755000); // 45k to 8L / mo
        area = 1000 + Math.floor(rng() * 6000);
      }
    }

    // Bedrooms and Bathrooms
    let bedrooms: number | undefined = undefined;
    let bathrooms: number | undefined = undefined;
    
    if (type === "Apartment" || type === "Villa") {
      bedrooms = 1 + Math.floor(rng() * 4); // 1, 2, 3, 4, 5
      if (type === "Villa") bedrooms += 1; // Villas have more
      bathrooms = bedrooms + (rng() > 0.5 ? 1 : 0);
    }

    // Formatted prices
    let formattedPrice = "";
    let emi = "";
    if (purpose === "Buy") {
      if (price >= 10000000) {
        formattedPrice = `₹${(price / 10000000).toFixed(2)} Cr`;
      } else {
        formattedPrice = `₹${(price / 100000).toFixed(0)} Lac`;
      }
      const rawEmi = Math.round(price * 0.0053);
      emi = rawEmi >= 100000 ? `₹${(rawEmi / 100000).toFixed(2)} Lac/mo` : `₹${rawEmi.toLocaleString("en-IN")}/mo`;
    } else {
      if (price >= 100000) {
        formattedPrice = `₹${(price / 100000).toFixed(2)} Lac/mo`;
      } else {
        formattedPrice = `₹${price.toLocaleString("en-IN")}/mo`;
      }
      emi = "Rentals";
    }

    const furnishing = furnishings[Math.floor(rng() * furnishings.length)];
    
    // Choose images based on type
    let imgs: string[] = [];
    if (type === "Apartment") {
      imgs = [PROPERTY_IMAGES[2], PROPERTY_IMAGES[10], PROPERTY_IMAGES[3], PROPERTY_IMAGES[4]];
    } else if (type === "Villa") {
      imgs = [PROPERTY_IMAGES[1], PROPERTY_IMAGES[11], PROPERTY_IMAGES[0], PROPERTY_IMAGES[3]];
    } else if (type === "Commercial") {
      imgs = [PROPERTY_IMAGES[5], PROPERTY_IMAGES[8], PROPERTY_IMAGES[9], PROPERTY_IMAGES[3]];
    } else { // Plot
      imgs = [PROPERTY_IMAGES[6], PROPERTY_IMAGES[7], PROPERTY_IMAGES[1], PROPERTY_IMAGES[0]];
    }

    // Rotate and scramble images slightly to make individual cards look diverse
    const rot = i % imgs.length;
    const scrambledImgs = [...imgs.slice(rot), ...imgs.slice(0, rot)];

    const adj = ADJECTIVES[Math.floor(rng() * ADJECTIVES.length)];
    const nouns = TYPES_NOUNS[type];
    const noun = nouns[Math.floor(rng() * nouns.length)];
    const title = `${adj} ${builder.name.split(" ")[0]} ${noun} - Phase ${Math.floor(i / 10) + 1}`;

    const investmentScore = 65 + Math.floor(rng() * 32); // 65 to 97
    const roi = parseFloat((4.5 + rng() * 6).toFixed(1)); // 4.5% to 10.5%
    
    // Build price trends
    const avgPricePerSqFt = Math.round(price / area);
    const priceTrend = [
      { year: 2022, pricePerSqFt: Math.round(avgPricePerSqFt * 0.8) },
      { year: 2023, pricePerSqFt: Math.round(avgPricePerSqFt * 0.88) },
      { year: 2024, pricePerSqFt: Math.round(avgPricePerSqFt * 0.93) },
      { year: 2025, pricePerSqFt: Math.round(avgPricePerSqFt * 0.97) },
      { year: 2026, pricePerSqFt: avgPricePerSqFt }
    ];

    // Select custom amenities
    const numAm = 4 + Math.floor(rng() * 4);
    const amenitiesSet = new Set<string>();
    while (amenitiesSet.size < numAm) {
      amenitiesSet.add(AMENITY_POOL[Math.floor(rng() * AMENITY_POOL.length)]);
    }

    // Nearby spaces
    const nearbyPlaces = {
      schools: [SCHOOL_POOL[Math.floor(rng() * SCHOOL_POOL.length)]],
      hospitals: [HOSPITAL_POOL[Math.floor(rng() * HOSPITAL_POOL.length)]],
      metro: [METRO_POOL[Math.floor(rng() * METRO_POOL.length)]],
      malls: [MALL_POOL[Math.floor(rng() * MALL_POOL.length)]]
    };

    propertiesList.push({
      id: `p${i}`,
      title,
      price,
      formattedPrice,
      emi,
      type,
      purpose,
      isNewProject,
      isVerified,
      isReraApproved,
      builderName: builder.name,
      address: `${adj} Heights Road, Near High Street, ${locality}`,
      locality,
      city,
      area,
      bedrooms,
      bathrooms,
      parking: rng() > 0.3,
      furnishing,
      images: scrambledImgs,
      description: `Introducing ${title} in the prestigious locality of ${locality}, ${city}. Developed by ${builder.name}, this ${type.toLowerCase()} offers high lifestyle luxury coupled with excellent connectivity. Perfect choice for investment or modern families.`,
      reraNumber: isReraApproved ? `PRM/${city.slice(0, 3).toUpperCase()}/RERA/${1000 + i}/2026` : undefined,
      postedDate: `2026-07-${Math.max(1, 20 - (i % 20))}`,
      investmentScore,
      roi,
      priceTrend,
      amenities: Array.from(amenitiesSet),
      nearbyPlaces,
      contact: {
        name: agent.name,
        role: rng() > 0.5 ? "Broker" : "Builder Agent",
        phone: agent.phone,
        email: agent.email
      }
    });
  }

  return propertiesList;
}

export const PROPERTIES = generate150Properties();
