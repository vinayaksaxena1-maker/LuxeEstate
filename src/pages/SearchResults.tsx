/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Property, SearchFilters, ActivePage } from "../types";
import { PROPERTIES } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import { 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Map, 
  CheckCircle2, 
  Building2, 
  Info, 
  X, 
  ArrowLeftRight,
  ShieldAlert
} from "lucide-react";

interface SearchResultsProps {
  filters: SearchFilters;
  onUpdateFilters: (filters: SearchFilters) => void;
  onSelectProperty: (id: string) => void;
  savedIds: string[];
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  comparedProperties: Property[];
  onToggleCompare: (e: React.MouseEvent, property: Property) => void;
  onNavigate: (page: ActivePage) => void;
}

export default function SearchResultsPage({
  filters,
  onUpdateFilters,
  onSelectProperty,
  savedIds,
  onToggleSave,
  comparedProperties,
  onToggleCompare,
  onNavigate
}: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "score_desc" | "roi_desc">("score_desc");

  // Local sync values for filters
  const [localCity, setLocalCity] = useState(filters.city || "");
  const [localType, setLocalType] = useState(filters.type || "");
  const [localBudget, setLocalBudget] = useState(filters.budgetMax || 300000000);
  const [localBhk, setLocalBhk] = useState(filters.bedrooms || "");
  const [localVerified, setLocalVerified] = useState(false);
  const [localRera, setLocalRera] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.query || "");

  // Apply filters to PROPERTIES dataset (of 150 items)
  const filteredListings = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // 1. Text Query Matching (searches title, description, address, locality, builder)
      if (localSearchQuery) {
        const q = localSearchQuery.toLowerCase();
        const matchesQuery = 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.builderName.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. City
      if (localCity && p.city.toLowerCase() !== localCity.toLowerCase()) {
        return false;
      }

      // 3. Property Type
      if (localType && p.type !== localType) {
        return false;
      }

      // 4. Purpose
      if (filters.purpose && p.purpose !== filters.purpose) {
        return false;
      }

      // 5. Budget Cap
      if (p.price > localBudget) {
        return false;
      }

      // 6. BHK Configuration
      if (localBhk) {
        if (!p.bedrooms || p.bedrooms.toString() !== localBhk) {
          return false;
        }
      }

      // 7. Verified Badge
      if (localVerified && !p.isVerified) {
        return false;
      }

      // 8. RERA Registration status
      if (localRera && !p.isReraApproved) {
        return false;
      }

      return true;
    });
  }, [localSearchQuery, localCity, localType, filters.purpose, localBudget, localBhk, localVerified, localRera]);

  // Sort filtered outcome
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "score_desc") {
      list.sort((a, b) => b.investmentScore - a.investmentScore);
    } else if (sortBy === "roi_desc") {
      list.sort((a, b) => b.roi - a.roi);
    }
    return list;
  }, [filteredListings, sortBy]);

  const resetAllFilters = () => {
    setLocalCity("");
    setLocalType("");
    setLocalBudget(300000000);
    setLocalBhk("");
    setLocalVerified(false);
    setLocalRera(false);
    setLocalSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen relative">
      
      {/* Title Segment */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live Search Engine</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            LuxeEstate Property Catalog
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            Found <span className="text-emerald-600 font-bold">{sortedListings.length} properties</span> matching your search configuration out of 150 items.
          </p>
        </div>

        {/* View Mode controls & map trigger */}
        <div className="flex items-center space-x-2">
          {/* Sorting Select */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none"
          >
            <option value="score_desc">AI Investment Score (High)</option>
            <option value="roi_desc">ROI Rental Yield (High)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>

          {/* Map toggle */}
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer ${
              showMap 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-50"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Map className="h-4 w-4" />
            <span>{showMap ? "Hide Map" : "Show Map"}</span>
          </button>

          {/* Layout switches */}
          <div className="hidden sm:flex border border-gray-200 rounded-xl bg-white overflow-hidden p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-emerald-50 text-emerald-700" : "text-gray-400"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "list" ? "bg-emerald-50 text-emerald-700" : "text-gray-400"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        
        {/* Left Search Sidebar Filters */}
        <aside className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm lg:col-span-1 h-fit space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-1.5 text-gray-800 font-bold text-sm">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span>Search Filters</span>
            </div>
            <button 
              onClick={resetAllFilters}
              className="text-[10px] font-extrabold text-gray-400 hover:text-emerald-600 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Keywords Search */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Search Keywords</label>
            <input 
              type="text"
              placeholder="e.g. Near Metro, Worli..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Active Purpose Selection */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Transaction Intent</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateFilters({ ...filters, purpose: "Buy" })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  filters.purpose === "Buy"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-500 font-extrabold"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Buy Properties
              </button>
              <button
                onClick={() => onUpdateFilters({ ...filters, purpose: "Rent" })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  filters.purpose === "Rent"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-500 font-extrabold"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Rent Homes
              </button>
            </div>
          </div>

          {/* City Selection */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Select Metros</label>
            <select
              value={localCity}
              onChange={(e) => setLocalCity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none text-gray-700"
            >
              <option value="">All Indian Metros</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Property Category Type */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Property Category</label>
            <select
              value={localType}
              onChange={(e) => setLocalType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none text-gray-700"
            >
              <option value="">All Categories</option>
              <option value="Apartment">Apartment / Flats</option>
              <option value="Villa">Premium Villa</option>
              <option value="Commercial">Commercial Spaces</option>
              <option value="Plot">Residential Plots</option>
            </select>
          </div>

          {/* Dynamic Budget Slider */}
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
              <span>Budget Ceiling</span>
              <span className="text-emerald-600 font-black">
                {localBudget >= 10000000 
                  ? `₹${(localBudget / 10000000).toFixed(2)} Cr` 
                  : `₹${(localBudget / 100000).toFixed(0)} Lac`}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={300000000}
              step={1000000}
              value={localBudget}
              onChange={(e) => setLocalBudget(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-bold">
              <span>₹10 Lac</span>
              <span>₹30 Cr</span>
            </div>
          </div>

          {/* BHK Beds Config */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Bedrooms (BHK)</label>
            <div className="grid grid-cols-4 gap-1">
              {["1", "2", "3", "4"].map((bhkVal) => (
                <button
                  key={bhkVal}
                  type="button"
                  onClick={() => setLocalBhk(localBhk === bhkVal ? "" : bhkVal)}
                  className={`py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    localBhk === bhkVal
                      ? "bg-emerald-500 text-white border-emerald-500 font-extrabold"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {bhkVal} BHK
                </button>
              ))}
            </div>
          </div>

          {/* Trust Checkboxes */}
          <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
            
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={localVerified}
                onChange={(e) => setLocalVerified(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 h-4.5 w-4.5 accent-emerald-600"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800">Verified Listings Only</span>
                <span className="text-[10px] text-gray-400 font-semibold">Vetted by LuxeEstate</span>
              </div>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={localRera}
                onChange={(e) => setLocalRera(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 h-4.5 w-4.5 accent-emerald-600"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800">RERA Registered Only</span>
                <span className="text-[10px] text-gray-400 font-semibold">100% legal compliance</span>
              </div>
            </label>

          </div>

          {/* Prompt banner to use AI */}
          <div className="bg-emerald-950 text-emerald-400 rounded-xl p-4 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-800/20 rounded-full blur-xl pointer-events-none" />
            <h4 className="text-xs font-extrabold text-white flex items-center justify-center space-x-1">
              <span>LuxeAI Assistant Advisor</span>
            </h4>
            <p className="text-[10px] text-emerald-300 font-medium leading-relaxed mt-1">
              Get personalized smart recommendations instantly. Ask LuxeAI about yield optimizations.
            </p>
            <button 
              onClick={() => {
                const trigger = document.getElementById("ai-chat-trigger");
                if (trigger) trigger.click();
              }}
              className="mt-3 w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              Launch AI Chat Agent
            </button>
          </div>

        </aside>

        {/* Right Search Outcome Core */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          
          {/* Map Overlay Option */}
          {showMap && (
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden p-3 shadow-md animate-in slide-in-from-top-4 duration-300 relative">
              <div className="h-64 w-full bg-slate-100 rounded-xl relative flex items-center justify-center overflow-hidden border border-gray-200">
                {/* Simulated SVG Interactive Map */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Layout map vector mock */}
                <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,20 Q30,50 60,10 T100,40" fill="none" stroke="#059669" strokeWidth="2" />
                  <path d="M10,90 Q40,40 80,80 T100,60" fill="none" stroke="#059669" strokeWidth="1" />
                  <line x1="30" y1="0" x2="30" y2="100" stroke="#cccccc" strokeDasharray="2" />
                  <line x1="70" y1="0" x2="70" y2="100" stroke="#cccccc" strokeDasharray="2" />
                </svg>

                {/* Plot points on Map */}
                {sortedListings.slice(0, 8).map((prop, idx) => {
                  const xValues = [15, 35, 55, 75, 25, 45, 65, 85];
                  const yValues = [30, 65, 25, 50, 75, 40, 85, 20];
                  return (
                    <div 
                      key={prop.id}
                      onClick={() => onSelectProperty(prop.id)}
                      className="absolute group/pin cursor-pointer"
                      style={{ left: `${xValues[idx % xValues.length]}%`, top: `${yValues[idx % yValues.length]}%` }}
                    >
                      <div className="h-3 w-3 bg-emerald-600 border-2 border-white rounded-full shadow-md animate-pulse relative z-10" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 scale-0 group-hover/pin:scale-100 bg-slate-900 text-white text-[10px] font-bold p-2 rounded-lg whitespace-nowrap shadow-xl transition-all duration-200 z-50">
                        <p>{prop.title}</p>
                        <p className="text-emerald-400 mt-0.5">{prop.formattedPrice}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center space-x-1 backdrop-blur-sm shadow-md">
                  <Map className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Geospatial Layout (Simulated Plot Pins)</span>
                </div>
              </div>
            </div>
          )}

          {/* Properties Grid View vs List View */}
          {sortedListings.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">No Listings Match Filters</h3>
              <p className="text-xs text-gray-400 font-semibold max-w-sm leading-relaxed">
                Try widening your budget ceilings, turning off Verified requirements, or choosing a broader BHK limit. We have 150 items indexed.
              </p>
              <button 
                onClick={resetAllFilters}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Reset Search Matrices
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedListings.map((property) => (
                <div key={property.id} className={viewMode === "list" ? "md:flex md:h-56 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer" : ""}>
                  {viewMode === "list" ? (
                    // Row Layout for List Mode
                    <>
                      <div className="md:w-72 relative h-full bg-gray-100 overflow-hidden shrink-0" onClick={() => onSelectProperty(property.id)}>
                        <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        {property.isVerified && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-extrabold rounded">Verified</span>
                        )}
                      </div>
                      <div className="p-5 flex flex-col justify-between flex-1" onClick={() => onSelectProperty(property.id)}>
                        <div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-xl font-extrabold text-slate-900">{property.formattedPrice}</span>
                            <span className="text-xs text-emerald-600 font-bold">ROI: {property.roi}%</span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-800 mt-1 line-clamp-1">{property.title}</h3>
                          <p className="text-xs text-gray-400 font-semibold mt-1">{property.address}, {property.city}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-2">{property.description}</p>
                        </div>
                        <div className="pt-3 border-t border-gray-50 mt-4 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                          <span>{property.area} Sq Ft • {property.bedrooms || "N/A"} BHK</span>
                          <span className="text-emerald-600">AI Score: {property.investmentScore}%</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Grid Mode standard card
                    <PropertyCard
                      property={property}
                      onSelect={onSelectProperty}
                      isSaved={savedIds.includes(property.id)}
                      onToggleSave={onToggleSave}
                      isCompared={comparedProperties.some(c => c.id === property.id)}
                      onToggleCompare={onToggleCompare}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Dynamic Slide-Up Comparison Tray */}
      {comparedProperties.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 text-white p-4 shadow-2xl border-t border-slate-800 animate-in slide-in-from-bottom-20 duration-350">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600 rounded-xl">
                <ArrowLeftRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Property Comparison Deck</h4>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">
                  You have <span className="text-emerald-400 font-bold">{comparedProperties.length}</span> properties queued for cross-spec analysis.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto py-1">
              {comparedProperties.map((p) => (
                <div key={p.id} className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 space-x-2 shrink-0">
                  <span className="text-xs font-bold text-white line-clamp-1 max-w-[120px]">{p.title}</span>
                  <button 
                    onClick={(e) => onToggleCompare(e, p)}
                    className="p-0.5 text-gray-400 hover:text-rose-500 rounded-full cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate(ActivePage.DASHBOARD)}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer text-center"
            >
              Analyze Specs Side-by-Side
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
