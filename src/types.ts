/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ActivePage {
  HOME = "Home",
  BUY = "Buy",
  RENT = "Rent",
  COMMERCIAL = "Commercial",
  NEW_PROJECTS = "New Projects",
  PLOTS = "Plot & Land",
  BUILDERS = "Builders",
  AGENTS = "Agents",
  LOCALITIES = "Localities",
  DETAILS = "Property Details",
  SEARCH_RESULTS = "Search Results",
  DASHBOARD = "Dashboard",
  SELLER_DASHBOARD = "Seller Dashboard",
  LOGIN = "Login",
  REGISTER = "Register",
  ABOUT = "About",
  CONTACT = "Contact",
  BLOG = "Blog",
  PRICING = "Pricing",
  FAQ = "FAQ"
}

export interface Property {
  id: string;
  title: string;
  price: number; // in INR (Rupees)
  formattedPrice: string;
  emi: string;
  type: "Apartment" | "Villa" | "Commercial" | "Plot";
  purpose: "Buy" | "Rent";
  isNewProject: boolean;
  isVerified: boolean;
  isReraApproved: boolean;
  builderName: string;
  address: string;
  locality: string;
  city: string;
  area: number; // in sq ft
  bedrooms?: number;
  bathrooms?: number;
  parking: boolean;
  furnishing: "Unfurnished" | "Semi-Furnished" | "Fully Furnished";
  images: string[];
  description: string;
  reraNumber?: string;
  postedDate: string;
  investmentScore: number; // 1-100
  roi: number; // percentage
  priceTrend: { year: number; pricePerSqFt: number }[];
  amenities: string[];
  nearbyPlaces: {
    schools: string[];
    hospitals: string[];
    metro: string[];
    malls: string[];
  };
  contact: {
    name: string;
    role: "Owner" | "Builder Agent" | "Broker";
    phone: string;
    email: string;
  };
}

export interface SearchFilters {
  query: string;
  purpose: "Buy" | "Rent";
  city: string;
  type: string;
  budgetMin: number;
  budgetMax: number;
  bedrooms: string;
  bathrooms: string;
  areaMin: number;
  areaMax: number;
  isNewProject: boolean;
  isReraApproved: boolean;
}

export interface Builder {
  id: string;
  name: string;
  logo: string;
  experience: number; // years
  projectsCount: number;
  rating: number;
  description: string;
  featuredProjects: string[];
}

export interface Agent {
  id: string;
  name: string;
  image: string;
  agency: string;
  experience: number;
  activeListings: number;
  rating: number;
  specialization: string[];
  phone: string;
  email: string;
}

export interface LocalityInfo {
  id: string;
  name: string;
  city: string;
  avgPricePerSqFt: number;
  yoyGrowth: number; // percentage
  livabilityScore: number; // 1-10
  highlights: string[];
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
