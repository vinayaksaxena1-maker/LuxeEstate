/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ActivePage, Property, SearchFilters } from "../types";
import { PROPERTIES, BUILDERS, LOCALITIES } from "../data/properties";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Home, 
  Building2, 
  Maximize2, 
  Bed, 
  UserCheck,
  ChevronRight,
  TrendingUp,
  Star,
  Quote,
  Building,
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface HomeProps {
  onNavigate: (page: ActivePage) => void;
  onSearch: (filters: SearchFilters) => void;
  onSelectProperty: (id: string) => void;
}

export default function HomePage({ onNavigate, onSearch, onSelectProperty }: HomeProps) {
  // Search state
  const [purpose, setPurpose] = useState<"Buy" | "Rent">("Buy");
  const [city, setCity] = useState("Bangalore");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Advanced filters state
  const [budgetMax, setBudgetMax] = useState<number>(30000000); // 3 Cr
  const [bedrooms, setBedrooms] = useState("3");
  const [areaMax, setAreaMax] = useState<number>(4000);

  // Quick stats
  const stats = [
    { label: "Properties Listed", value: "15,000+" },
    { label: "Happy Homowners", value: "8,500+" },
    { label: "Elite Builders", value: "45+" },
    { label: "Cities Active", value: "6" }
  ];

  // Cities
  const cities = [
    { name: "Bangalore", count: "4,210 Listings", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=350&h=220" },
    { name: "Mumbai", count: "3,840 Listings", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=350&h=220" },
    { name: "Delhi NCR", count: "3,110 Listings", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=350&h=220" },
    { name: "Pune", count: "2,430 Listings", image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&q=80&w=350&h=220" }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      purpose,
      city,
      type: propertyType,
      budgetMin: 0,
      budgetMax,
      bedrooms,
      bathrooms: "",
      areaMin: 0,
      areaMax,
      isNewProject: false,
      isReraApproved: false
    });
    onNavigate(ActivePage.SEARCH_RESULTS);
  };

  const handleQuickCollection = (type: "Apartment" | "Villa" | "Commercial" | "Plot") => {
    onSearch({
      query: "",
      purpose: "Buy",
      city: "",
      type,
      budgetMin: 0,
      budgetMax: 500000000,
      bedrooms: "",
      bathrooms: "",
      areaMin: 0,
      areaMax: 10000,
      isNewProject: false,
      isReraApproved: false
    });
    onNavigate(ActivePage.SEARCH_RESULTS);
  };

  // Get a few properties for carousel display
  const premiumVillas = PROPERTIES.filter(p => p.type === "Villa").slice(0, 3);
  const luxuryHotspots = PROPERTIES.filter(p => p.price > 30000000).slice(0, 3);
  const recentListings = PROPERTIES.slice(6, 10);

  return (
    <div className="flex flex-col bg-slate-50/50 min-h-screen">
      
      {/* 1. Hero Container & Premium Search */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Abstract Background Accents */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400 mb-6">
            <Sparkles className="h-4.5 w-4.5 text-blue-400" />
            <span>Introducing LuxeAI Property Valuation & Matchmaking</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            The Intelligent Way <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">To Find Your Home</span>
          </h1>
          
          <p className="text-lg text-slate-300 font-medium mb-10 max-w-2xl">
            Explore 150+ ultra-realistic listings across India's premier metropolitan tech corridors with AI-driven pricing and smart ROI forecasts.
          </p>

          {/* Search Tab Panel */}
          <div className="w-full max-w-3xl bg-zinc-950/70 rounded-3xl shadow-2xl p-6 text-white border border-white/5 backdrop-blur-xl">
            <form onSubmit={handleSearchSubmit}>
              
              {/* Category tabs */}
              <div className="flex space-x-2 border-b border-white/5 pb-4 mb-4 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setPurpose("Buy")}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    purpose === "Buy" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Buy Properties
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose("Rent")}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    purpose === "Rent" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Rent Homes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPurpose("Buy");
                    setPropertyType("Commercial");
                  }}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    propertyType === "Commercial" ? "bg-blue-500/10 text-blue-400 font-semibold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Commercial Spaces
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickCollection("Plot")}
                  className="px-4 py-2 text-sm font-bold rounded-xl text-zinc-400 hover:text-white cursor-pointer"
                >
                  Residential Plots
                </button>
              </div>

              {/* Main Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 px-1">Location City</label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-2.5 text-sm font-medium focus:outline-none focus:border-blue-500 text-white appearance-none cursor-pointer"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 px-1">Property Type</label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-2.5 text-sm font-medium focus:outline-none focus:border-blue-500 text-white appearance-none cursor-pointer"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa / House</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot / Land</option>
                  </select>
                </div>

                <div className="flex flex-col text-left md:col-span-2 relative">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 px-1">Search Keywords</label>
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="e.g. Near Metro, Worli, 3 BHK, Penthouse..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl p-2.5 pl-10 text-sm font-medium focus:outline-none focus:border-blue-500 text-white"
                    />
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                  </div>
                </div>

              </div>

              {/* Advanced Collapsible Filter Drawer */}
              {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/5 animate-in fade-in duration-200">
                  
                  <div className="flex flex-col text-left">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mb-1 px-1">
                      <span>Max Budget (INR)</span>
                      <span className="text-blue-400 font-extrabold">₹{(budgetMax / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <input 
                      type="range"
                      min={5000000}
                      max={200000000}
                      step={5000000}
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 px-1">Bedrooms (BHK)</label>
                    <select 
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl p-2.5 text-sm font-medium focus:outline-none focus:border-blue-500 text-white appearance-none cursor-pointer"
                    >
                      <option value="">Any BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>

                  <div className="flex flex-col text-left">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase mb-1 px-1">
                      <span>Max Area (Sq Ft)</span>
                      <span className="text-blue-400 font-extrabold">{areaMax} Sq Ft</span>
                    </div>
                    <input 
                      type="range"
                      min={1000}
                      max={10000}
                      step={500}
                      value={areaMax}
                      onChange={(e) => setAreaMax(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                </div>
              )}

              {/* Advanced toggle & search submit */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-white/5 gap-4">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs font-bold text-zinc-400 hover:text-blue-400 flex items-center space-x-1 cursor-pointer"
                >
                  <span>{showAdvanced ? "Hide" : "Show"} Advanced AI Filters</span>
                </button>

                <div className="flex space-x-2 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
                  >
                    <Search className="h-4.5 w-4.5" />
                    <span>Search Marketplace</span>
                  </button>
                </div>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* 2. Counter Metrics Bar */}
      <section className="bg-zinc-950 border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs text-zinc-500 font-semibold uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Browse Category Collections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Premium Collections</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">Explore Curated Lifestyles</h2>
          </div>
          <button onClick={() => handleQuickCollection("Apartment")} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer">
            <span>Browse All Listings</span>
            <ChevronRight className="h-4 w-4 text-blue-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => handleQuickCollection("Apartment")}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=350&h=400" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-lg font-bold">Luxury Penthouses</h3>
              <p className="text-xs text-slate-300 font-semibold mt-1">High-rise skyscrapers</p>
            </div>
          </div>

          <div 
            onClick={() => handleQuickCollection("Villa")}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=350&h=400" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-lg font-bold">Premium Villas</h3>
              <p className="text-xs text-slate-300 font-semibold mt-1">Gated elite communities</p>
            </div>
          </div>

          <div 
            onClick={() => handleQuickCollection("Commercial")}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=350&h=400" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-lg font-bold">Grade-A Corporate Spaces</h3>
              <p className="text-xs text-slate-300 font-semibold mt-1">Modern commercial setups</p>
            </div>
          </div>

          <div 
            onClick={() => handleQuickCollection("Plot")}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=350&h=400" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-lg font-bold">Residential Plots</h3>
              <p className="text-xs text-slate-300 font-semibold mt-1">Build your own custom home</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Showcase Hotspot Listings (Featured) */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Selected Properties</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">High-Yielding Opportunities</h2>
            <p className="text-sm text-gray-500 font-medium max-w-lg mt-2">
              Our AI models rate these high-ROI listings as exceptional investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {luxuryHotspots.map((property) => (
              <div 
                key={property.id} 
                onClick={() => onSelectProperty(property.id)}
                className="group bg-slate-50 border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 w-full overflow-hidden bg-gray-200">
                  <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-lg font-extrabold text-gray-950">{property.formattedPrice}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ROI: {property.roi}%
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-2">{property.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{property.description}</p>
                  
                  <div className="mt-4 pt-3 border-t border-gray-150 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                    <span>{property.locality}, {property.city}</span>
                    <span className="text-emerald-600">AI Score: {property.investmentScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Featured Cities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center md:text-left mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active Metros</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Featured Real Estate Hubs</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((cityObj, idx) => (
            <div 
              key={idx}
              onClick={() => {
                onSearch({
                  query: "",
                  purpose: "Buy",
                  city: cityObj.name,
                  type: "",
                  budgetMin: 0,
                  budgetMax: 500000000,
                  bedrooms: "",
                  bathrooms: "",
                  areaMin: 0,
                  areaMax: 10000,
                  isNewProject: false,
                  isReraApproved: false
                });
                onNavigate(ActivePage.SEARCH_RESULTS);
              }}
              className="group relative h-52 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img src={cityObj.image} alt={cityObj.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/45 hover:bg-black/40 transition-colors flex flex-col justify-end p-5 text-white">
                <h3 className="text-lg font-bold">{cityObj.name}</h3>
                <span className="text-xs text-gray-300 font-semibold">{cityObj.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Partner Builders Spotlight */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">National Trust</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">Featured Builders & Architects</h2>
            </div>
            <button onClick={() => onNavigate(ActivePage.BUILDERS)} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 self-center cursor-pointer">
              <span>View All Builders</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {BUILDERS.map((builder) => (
              <div 
                key={builder.id}
                onClick={() => onNavigate(ActivePage.BUILDERS)}
                className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800 hover:border-emerald-500 transition-all duration-300 cursor-pointer"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-sm tracking-tight shadow-md mb-3">
                  {builder.logo}
                </div>
                <h3 className="text-xs font-bold text-white tracking-tight line-clamp-1">{builder.name}</h3>
                <span className="text-[10px] text-gray-400 mt-1 font-semibold">{builder.experience} Years Exp</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Trending Localities Bento */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Smart Spatial Indexes</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Trending Investment Localities</h2>
          </div>
          <button onClick={() => onNavigate(ActivePage.LOCALITIES)} className="text-xs font-bold text-emerald-600 hover:text-emerald-500 flex items-center space-x-1 cursor-pointer">
            <span>Explore Locality Directory</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {LOCALITIES.slice(0, 4).map((loc) => (
            <div 
              key={loc.id}
              onClick={() => {
                onSearch({
                  query: "",
                  purpose: "Buy",
                  city: loc.city,
                  type: "",
                  budgetMin: 0,
                  budgetMax: 500000000,
                  bedrooms: "",
                  bathrooms: "",
                  areaMin: 0,
                  areaMax: 10000,
                  isNewProject: false,
                  isReraApproved: false
                });
                onNavigate(ActivePage.SEARCH_RESULTS);
              }}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-extrabold text-slate-900">{loc.name}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Score: {loc.livabilityScore}/10
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-semibold uppercase">{loc.city}</p>
                <div className="mt-3 flex items-center space-x-1 text-slate-900 font-bold text-sm">
                  <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>₹{loc.avgPricePerSqFt.toLocaleString("en-IN")}/sq.ft</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 mt-4 flex justify-between items-center text-[10px] font-bold text-gray-500">
                <span>YoY Appreciation</span>
                <span className="text-emerald-600">+{loc.yoyGrowth}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Customer Reviews Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Client Trust Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 border border-gray-150 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  "LuxeEstate's AI price trend forecaster predicted the appreciation index in Whitefield perfectly. I saved nearly ₹15 Lakhs by buying early from Prestige Group."
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-150">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Sandeep Kulkarni</h4>
                  <span className="text-[10px] text-gray-400 font-semibold">IT Director, Bangalore</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-150 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  "The interface is incredibly clean — it feels like using an Apple product. The document checklist and RERA matching guarantees absolute trust. Exceptional prototype."
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-150">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  RM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Ritu Mehta</h4>
                  <span className="text-[10px] text-gray-400 font-semibold">Homeowner, Worli Mumbai</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-150 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  "Selling commercial assets has never been more fluid. LuxeEstate's developer analytics panel keeps our sales pipelines fully transparent. Highly recommend."
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-150">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Arjun Kapoor</h4>
                  <span className="text-[10px] text-gray-400 font-semibold">VP Operations, Lodha Group</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
