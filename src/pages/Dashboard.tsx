/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Property, ActivePage } from "../types";
import { PROPERTIES } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import { 
  Heart, 
  ArrowLeftRight, 
  Search, 
  Settings, 
  User, 
  Trash2, 
  ChevronRight, 
  AlertCircle,
  BellRing,
  Sparkles
} from "lucide-react";

interface DashboardProps {
  savedIds: string[];
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  comparedProperties: Property[];
  onToggleCompare: (e: React.MouseEvent, property: Property) => void;
  onSelectProperty: (id: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export default function DashboardPage({
  savedIds,
  onToggleSave,
  comparedProperties,
  onToggleCompare,
  onSelectProperty,
  onNavigate
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"wishlist" | "compare" | "history" | "profile">("wishlist");

  // Filter saved properties
  const savedProperties = PROPERTIES.filter((p) => savedIds.includes(p.id));

  // Dummy search history
  const [history, setHistory] = useState([
    { query: "3 BHK Apartment in Worli, Mumbai", date: "Today, 10:24 AM", budget: "Under ₹15 Cr" },
    { query: "Premium Gated Villa in Nandi Hills, Bangalore", date: "Yesterday, 04:15 PM", budget: "Under ₹20 Cr" },
    { query: "Grade-A Commercial Leasing near Gachibowli", date: "July 15, 2026", budget: "Under ₹5 Lac/mo" }
  ]);

  // Profile data
  const [username, setUsername] = useState("Vinayak Saxena");
  const [userEmail, setUserEmail] = useState("vinayaksaxena1@gmail.com");
  const [userPhone, setUserPhone] = useState("+91 99120 54321");
  const [cityPref, setCityPref] = useState("Bangalore");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen">
      
      {/* Upper Panel Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 mb-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center space-x-4 relative z-10">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-extrabold text-2xl">
            VS
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">{username}</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">Luxe Client Since 2026 • Premium Buyer Account</p>
          </div>
        </div>

        <div className="flex space-x-3 z-10">
          <button 
            onClick={() => setActiveTab("profile")}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Manage Credentials
          </button>
          <button 
            onClick={() => onNavigate(ActivePage.SELLER_DASHBOARD)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-lg cursor-pointer"
          >
            Switch to Seller Panel
          </button>
        </div>
      </div>

      {/* Main Panel grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 items-start">
        
        {/* Navigation Sidebar controls */}
        <aside className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-1 col-span-1">
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "wishlist" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Heart className="h-4 w-4" />
              <span>My Saved Wishlist</span>
            </div>
            <span className="bg-emerald-100/50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-extrabold">{savedIds.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("compare")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "compare" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <ArrowLeftRight className="h-4 w-4" />
              <span>Property Comparer</span>
            </div>
            <span className="bg-emerald-100/50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-extrabold">{comparedProperties.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "history" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Search className="h-4 w-4" />
              <span>Search Metrics History</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "profile" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <User className="h-4 w-4" />
              <span>Profile Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </aside>

        {/* Dynamic Detail Body panels */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: Saved properties */}
          {activeTab === "wishlist" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Your Saved Properties ({savedProperties.length})</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Properties you marked as favorite will remain preserved here.</p>
              </div>

              {savedProperties.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                  <Heart className="h-10 w-10 text-gray-300" />
                  <h4 className="text-sm font-bold text-gray-800">Your Wishlist is Empty</h4>
                  <p className="text-xs text-gray-400 font-semibold max-w-sm leading-relaxed">
                    Browse our live marketplace directory and click the heart icon on cards to save listings here.
                  </p>
                  <button 
                    onClick={() => onNavigate(ActivePage.BUY)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Go to Listings Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={onSelectProperty}
                      isSaved={savedIds.includes(property.id)}
                      onToggleSave={onToggleSave}
                      isCompared={comparedProperties.some(c => c.id === property.id)}
                      onToggleCompare={onToggleCompare}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Compare Properties Matrix */}
          {activeTab === "compare" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Enterprise Specification Matcher</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Select up to 4 listings to match structural blueprints, prices, and ROI metrics side-by-side.</p>
              </div>

              {comparedProperties.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-inner">
                  <ArrowLeftRight className="h-10 w-10 text-gray-300" />
                  <h4 className="text-sm font-bold text-gray-800">No Comparison Queue Found</h4>
                  <p className="text-xs text-gray-400 font-semibold max-w-sm leading-relaxed">
                    Click the comparison toggle icon (two-way arrow) on any property card to queue specs here.
                  </p>
                  <button 
                    onClick={() => onNavigate(ActivePage.BUY)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Explore Real Estate Catalog
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-gray-150 rounded-2xl shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-100">
                        <th className="p-4 font-bold text-gray-500 uppercase tracking-wider w-40">Specification</th>
                        {comparedProperties.map((p) => (
                          <th key={p.id} className="p-4 font-extrabold text-slate-900 text-center border-l border-gray-100 w-52 min-w-[180px]">
                            <div className="flex flex-col items-center space-y-2">
                              <span className="line-clamp-1">{p.title}</span>
                              <button 
                                onClick={(e) => onToggleCompare(e, p)}
                                className="text-[10px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                      <tr>
                        <td className="p-4 bg-slate-50/50">Market Price</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100 text-sm font-black text-emerald-600">{p.formattedPrice}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 bg-slate-50/50">Property Type</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100">{p.type}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 bg-slate-50/50">Bedrooms (BHK)</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100">{p.bedrooms ? `${p.bedrooms} BHK` : "Commercial/Plot"}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 bg-slate-50/50">Super Area</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100">{p.area} Sq Ft</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 bg-slate-50/50">Furnishing</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100">{p.furnishing}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 bg-slate-50/50">Appreciation ROI</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100 text-emerald-600">+{p.roi}% Yield</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 bg-slate-50/50">LuxeAI Score</td>
                        {comparedProperties.map((p) => (
                          <td key={p.id} className="p-4 text-center border-l border-gray-100">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-lg">
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>{p.investmentScore}%</span>
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Search history log */}
          {activeTab === "history" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Saved Search Logs</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Quickly retrieve properties from your historical query pathways.</p>
              </div>

              <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-100">
                {history.map((hist, index) => (
                  <div key={index} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">{hist.query}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 font-semibold">Logged: {hist.date} • Constraints: {hist.budget}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Relaunching historical search path: "${hist.query}"`)}
                      className="self-start sm:self-center px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                    >
                      Rerun Search
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Profile credentials */}
          {activeTab === "profile" && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Profile Credentials</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Manage details for instant scheduling callbacks and document checks.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Profile updated successfully!"); }} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">User Name</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Contact Number</label>
                    <input
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Preferred City Region</label>
                    <select
                      value={cityPref}
                      onChange={(e) => setCityPref(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save Account Updates
                </button>

              </form>

              {/* Alert Segment */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed text-emerald-800 font-semibold">
                <BellRing className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <h4 className="font-bold">LuxeAI Notification Hub Activated</h4>
                  <p className="text-[11px] text-emerald-700/80 mt-0.5">
                    We will ping your registered contact on WhatsApp/SMS whenever our intelligence models identify listings appreciating faster than 12% YoY in {cityPref}.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
