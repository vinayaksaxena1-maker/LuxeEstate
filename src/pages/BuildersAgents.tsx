/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ActivePage, Builder, Agent, LocalityInfo, SearchFilters } from "../types";
import { BUILDERS, AGENTS, LOCALITIES } from "../data/properties";
import { 
  Building2, 
  UserCheck, 
  MapPin, 
  Star, 
  Award, 
  TrendingUp, 
  Phone, 
  Mail, 
  Sparkles,
  Search,
  BookOpen,
  ChevronRight
} from "lucide-react";

interface DirectoriesProps {
  initialTab?: "builders" | "agents" | "localities";
  onNavigate: (page: ActivePage) => void;
  onSearch: (filters: SearchFilters) => void;
}

export default function BuildersAgentsPage({
  initialTab = "builders",
  onNavigate,
  onSearch
}: DirectoriesProps) {
  const [activeTab, setActiveTab] = useState<"builders" | "agents" | "localities">(initialTab);
  const [query, setQuery] = useState("");

  const filteredBuilders = BUILDERS.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
  const filteredAgents = AGENTS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.specialization.some(s => s.toLowerCase().includes(query.toLowerCase())));
  const filteredLocalities = LOCALITIES.filter(l => l.name.toLowerCase().includes(query.toLowerCase()) || l.city.toLowerCase().includes(query.toLowerCase()));

  const handleLocalitySearch = (loc: LocalityInfo) => {
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen">
      
      {/* Search Header Segment */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Industry Indexes</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">LuxeEstate Directory Indexes</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Sourcing national builders, local brokers, and spatial livability trends.</p>
        </div>

        {/* Segmented controls and query inputs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => { setActiveTab("builders"); setQuery(""); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "builders" ? "bg-white text-slate-950 shadow-sm" : "text-gray-500"
              }`}
            >
              Builders
            </button>
            <button
              onClick={() => { setActiveTab("agents"); setQuery(""); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "agents" ? "bg-white text-slate-950 shadow-sm" : "text-gray-500"
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => { setActiveTab("localities"); setQuery(""); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "localities" ? "bg-white text-slate-950 shadow-sm" : "text-gray-500"
              }`}
            >
              Localities
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white border border-gray-250 rounded-xl py-2 px-3 pl-9 text-xs focus:outline-none focus:border-emerald-500 w-full sm:w-52 font-semibold"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Core Lists */}
      <div className="flex-1">
        
        {/* Tab A: Builders */}
        {activeTab === "builders" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
            {filteredBuilders.map((builder) => (
              <div key={builder.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-base shadow-md">
                      {builder.logo}
                    </div>
                    <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{builder.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-950">{builder.name}</h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">{builder.experience} Years National Trust</p>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed font-semibold">{builder.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-6 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                  <span>Projects: {builder.projectsCount} Delivered</span>
                  <button 
                    onClick={() => {
                      alert(`Showing premium project launches for ${builder.name}.`);
                    }}
                    className="text-emerald-600 hover:text-emerald-500 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Browse Projects</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab B: Agents List */}
        {activeTab === "agents" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-200">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={agent.image} alt={agent.name} className="h-12 w-12 rounded-xl object-cover border" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-950">{agent.name}</h3>
                      <p className="text-[10px] text-gray-400 font-semibold">{agent.agency}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mb-4">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Exp: {agent.experience} Years
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center space-x-0.5">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{agent.rating}</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Specialization Zone</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.specialization.map((spec, i) => (
                        <span key={i} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-6 grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => alert(`Calling agent ${agent.name} at ${agent.phone}...`)}
                    className="py-2 bg-slate-50 border border-gray-200 hover:bg-slate-100 text-gray-700 text-[10px] font-bold rounded-xl text-center cursor-pointer"
                  >
                    Call Broker
                  </button>
                  <a 
                    href={`mailto:${agent.email}`}
                    className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-xl text-center cursor-pointer"
                  >
                    Email Broker
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab C: Localities Index */}
        {activeTab === "localities" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-200">
            {filteredLocalities.map((loc) => (
              <div key={loc.id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-slate-900">{loc.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Livability: {loc.livabilityScore}/10
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{loc.city}</p>

                  <div className="mt-4 flex items-center space-x-1 text-slate-950 font-black text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span>₹{loc.avgPricePerSqFt.toLocaleString("en-IN")}/sq.ft</span>
                  </div>

                  <div className="space-y-1.5 mt-4 pt-3 border-t border-gray-50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Livability Highlights</p>
                    <ul className="space-y-1">
                      {loc.highlights.slice(0, 2).map((hl, i) => (
                        <li key={i} className="text-[10px] text-gray-500 font-semibold list-disc list-inside truncate">{hl}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => handleLocalitySearch(loc)}
                  className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded-xl text-center transition-colors cursor-pointer"
                >
                  Browse Locality Properties
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
