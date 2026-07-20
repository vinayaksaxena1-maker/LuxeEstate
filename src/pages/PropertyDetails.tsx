/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Property, ActivePage } from "../types";
import { 
  ArrowLeft, 
  MapPin, 
  Compass, 
  Maximize2, 
  Layers, 
  Coins, 
  Calendar, 
  Mail, 
  Phone, 
  Download, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Share2, 
  Heart,
  Video,
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export default function PropertyDetailsPage({
  property,
  onBack,
  isSaved,
  onToggleSave,
  onNavigate
}: PropertyDetailsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "amenities" | "nearby" | "floor">("desc");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("11:00 AM");
  const [scheduleType, setScheduleType] = useState<"In-Person" | "Video">("In-Person");
  const [scheduleStatus, setScheduleStatus] = useState("");

  // Mortgage Calculator state
  const [principal, setPrincipal] = useState<number>(property.price * 0.8); // 80% default
  const [interestRate, setInterestRate] = useState<number>(8.55); // average Indian mortgage rate
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Mortgage Formula
  const monthlyEmi = React.useMemo(() => {
    if (property.emi === "Rentals") return 0;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    const emiVal = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emiVal) ? 0 : Math.round(emiVal);
  }, [principal, interestRate, tenureYears]);

  const totalPayment = monthlyEmi * tenureYears * 12;
  const interestPayable = totalPayment - principal;

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleDate) {
      alert("Please select a valid inspection date first.");
      return;
    }
    setScheduleStatus(`Successfully requested an ${scheduleType} tour on ${scheduleDate} at ${scheduleTime}. The coordinator will call you back.`);
  };

  const handleBrochureDownload = () => {
    alert(`Brochure generated & downloaded for "${property.title}". (Includes certified structural plans and RERA compliance data).`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen">
      
      {/* Back navigation & Share bar */}
      <div className="mb-6 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="flex space-x-2">
          <button 
            onClick={(e) => onToggleSave(e, property.id)}
            className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer ${
              isSaved 
                ? "bg-rose-50 border-rose-200 text-rose-600 font-extrabold"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>{isSaved ? "Saved" : "Save Property"}</span>
          </button>
        </div>
      </div>

      {/* Hero Gallery Grid (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        
        {/* Main large image */}
        <div className="md:col-span-2 h-96 rounded-2xl overflow-hidden relative shadow-sm border border-gray-150">
          <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          <span className="absolute bottom-4 left-4 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg backdrop-blur-sm shadow-md">
            Main Façade Blueprint
          </span>
        </div>

        {/* Secondary Grid */}
        <div className="md:col-span-1 grid grid-rows-2 gap-4 h-96">
          <div className="rounded-2xl overflow-hidden relative shadow-sm border border-gray-150 h-full">
            <img src={property.images[1] || property.images[0]} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            <span className="absolute bottom-3 left-3 bg-black/50 text-white text-[9px] font-medium px-2 py-1 rounded">Interior Vista</span>
          </div>
          <div className="rounded-2xl overflow-hidden relative shadow-sm border border-gray-150 h-full">
            <img src={property.images[2] || property.images[0]} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            <span className="absolute bottom-3 left-3 bg-black/50 text-white text-[9px] font-medium px-2 py-1 rounded">Architectural Deck</span>
          </div>
        </div>

        {/* Virtual 360 Tour View Overlay Card */}
        <div className="md:col-span-1 rounded-2xl overflow-hidden relative shadow-sm border border-emerald-100 bg-gradient-to-tr from-emerald-950 to-teal-900 text-white p-6 flex flex-col justify-between h-96">
          <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <span className="inline-flex items-center space-x-1.5 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded-lg uppercase tracking-wider mb-4">
              <Sparkles className="h-3 w-3" />
              <span>Interactive VR Tour</span>
            </span>
            <h3 className="text-lg font-extrabold tracking-tight">Virtual 360° Property Sphere</h3>
            <p className="text-xs text-emerald-300 font-semibold leading-relaxed mt-2">
              Embark on a high-definition immersive gyroscope walk-through. Stream dimensions in real-time.
            </p>
          </div>

          <div className="space-y-2 mt-6">
            <button 
              onClick={() => alert("Launching LuxeEstate 360 Spatial Gyroscope viewer in modal...")}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Compass className="h-4 w-4" />
              <span>Enter 360 Tour</span>
            </button>
            <button 
              onClick={() => alert("Playing HD Drone Cinematic tour sequence...")}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5"
            >
              <Video className="h-4 w-4" />
              <span>Watch Video Flythrough</span>
            </button>
          </div>
        </div>

      </section>

      {/* Core Specification Grid & Sidebar Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Specific specs details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Title segment */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{property.title}</h1>
                <div className="flex items-center space-x-1 text-xs text-gray-500 font-medium mt-2">
                  <MapPin className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                  <span>{property.address}</span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-3xl font-black text-emerald-600 tracking-tight">{property.formattedPrice}</span>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">RERA: {property.reraNumber || "Approved Resale"}</p>
              </div>
            </div>

            {/* Quick Specs Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="text-center p-2 border-r border-gray-200/50 last:border-r-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Super Area</span>
                <span className="text-sm font-extrabold text-slate-900">{property.area} Sq Ft</span>
              </div>
              <div className="text-center p-2 border-r border-gray-200/50 last:border-r-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">BHK Style</span>
                <span className="text-sm font-extrabold text-slate-900">{property.bedrooms ? `${property.bedrooms} BHK` : "Commercial/Plot"}</span>
              </div>
              <div className="text-center p-2 border-r border-gray-200/50 last:border-r-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Furnishing</span>
                <span className="text-sm font-extrabold text-slate-900">{property.furnishing}</span>
              </div>
              <div className="text-center p-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Parking Slot</span>
                <span className="text-sm font-extrabold text-slate-900">{property.parking ? "Allocated" : "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Interactive Detailed Segment Tabs */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            
            {/* Tabs Trigger */}
            <div className="flex border-b border-gray-100 bg-slate-50/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab("desc")}
                className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 text-center whitespace-nowrap cursor-pointer ${
                  activeTab === "desc" ? "border-emerald-600 text-emerald-700 font-black bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                Property Description
              </button>
              <button
                onClick={() => setActiveTab("amenities")}
                className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 text-center whitespace-nowrap cursor-pointer ${
                  activeTab === "amenities" ? "border-emerald-600 text-emerald-700 font-black bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                Amenities ({property.amenities.length})
              </button>
              <button
                onClick={() => setActiveTab("nearby")}
                className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 text-center whitespace-nowrap cursor-pointer ${
                  activeTab === "nearby" ? "border-emerald-600 text-emerald-700 font-black bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                Transit & Neighborhood
              </button>
              <button
                onClick={() => setActiveTab("floor")}
                className={`flex-1 py-3 px-4 text-xs font-bold border-b-2 text-center whitespace-nowrap cursor-pointer ${
                  activeTab === "floor" ? "border-emerald-600 text-emerald-700 font-black bg-white" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                Floor Blueprint Plans
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              
              {activeTab === "desc" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-sm font-bold text-gray-800 uppercase">Executive Summary</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    {property.description}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Designed for ultra-modern convenience under the trusted banner of {property.builderName}. Positioned close to secondary IT hubs and expressways, ensuring long-term liquidities and asset appreciations. Certified by standard structural engineering agencies.
                  </p>
                </div>
              )}

              {activeTab === "amenities" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
                  {property.amenities.map((am, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-gray-700">{am}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "nearby" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Primary Academies</h4>
                      <ul className="space-y-2">
                        {property.nearbyPlaces.schools.map((sc, i) => (
                          <li key={i} className="text-xs text-gray-700 font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-100">{sc}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Tier-1 Healthcare</h4>
                      <ul className="space-y-2">
                        {property.nearbyPlaces.hospitals.map((hosp, i) => (
                          <li key={i} className="text-xs text-gray-700 font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-100">{hosp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Transit Points (Metro)</h4>
                      <ul className="space-y-2">
                        {property.nearbyPlaces.metro.map((m, i) => (
                          <li key={i} className="text-xs text-gray-700 font-semibold bg-emerald-50 text-emerald-950 p-2.5 rounded-lg border border-emerald-100">{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">High-Street Shopping Malls</h4>
                      <ul className="space-y-2">
                        {property.nearbyPlaces.malls.map((mall, i) => (
                          <li key={i} className="text-xs text-gray-700 font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-100">{mall}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "floor" && (
                <div className="text-center py-6 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-200">
                  <div className="border border-dashed border-gray-200 p-8 rounded-2xl bg-gray-50/50 w-full max-w-md">
                    <Layers className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-slate-800">Standard {property.bedrooms || 3} BHK Super-Layout Blueprint</h4>
                    <p className="text-[11px] text-gray-400 mt-1 font-semibold">Carpet Area: {Math.round(property.area * 0.82)} Sq Ft (82% Efficiency Index)</p>
                    <div className="h-px bg-gray-200 my-4" />
                    <button 
                      onClick={handleBrochureDownload}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Download Full CAD Blueprint PDF
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Custom Price History Trend Map (SVG visualization) */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">AI Price Trend Analytics</h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">Locality Price Growth index (Worli vs City Median)</p>
              </div>
              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded-lg">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>CAGR Growth: +{property.roi}%</span>
              </div>
            </div>

            {/* Custom SVG Price Trend Graph */}
            <div className="h-44 w-full relative flex items-end pt-4">
              <svg className="h-full w-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal mesh lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />

                {/* Plot line */}
                <path 
                  d="M 20,130 L 120,105 L 220,95 L 320,70 L 420,40 L 480,25" 
                  fill="none" 
                  stroke="#059669" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                {/* Gradient area under line */}
                <path 
                  d="M 20,130 L 120,105 L 220,95 L 320,70 L 420,40 L 480,25 L 480,150 L 20,150 Z" 
                  fill="url(#chartGrad)" 
                />

                {/* Plot Dots */}
                {[
                  { x: 20, val: "2022" },
                  { x: 120, val: "2023" },
                  { x: 220, val: "2024" },
                  { x: 320, val: "2025" },
                  { x: 420, val: "2026" },
                  { x: 480, val: "2027" }
                ].map((pt, index) => (
                  <circle key={index} cx={pt.x} cy={[130, 105, 95, 70, 40, 25][index]} r="4" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                ))}
              </svg>

              {/* X Axis Labels */}
              <div className="absolute bottom-[-24px] inset-x-0 flex justify-between text-[10px] text-gray-400 font-bold px-2">
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
                <span>2025</span>
                <span>2026</span>
                <span>2027 (AI Projection)</span>
              </div>
            </div>

            <div className="border-t border-gray-150 pt-4 mt-10 text-[10px] text-gray-400 font-bold flex items-center space-x-1 bg-slate-50 p-3 rounded-xl border">
              <Info className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
              <span>Projected compounding price hikes are verified using standard localized indices on developer histories.</span>
            </div>
          </div>

          {/* Interactive Mortgage Loan Calculator */}
          {property.emi !== "Rentals" && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Interactive Loan Mortgage Engine</h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">Configure interest, loan terms, and downpayment ratios instantly.</p>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                    <span>Principal Loan</span>
                    <span className="text-emerald-600 font-extrabold">₹{(principal / 100000).toFixed(0)} Lac</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={property.price}
                    step={500000}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <span className="text-[9px] text-gray-400 font-semibold">Max: {property.formattedPrice}</span>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                    <span>Interest Rate</span>
                    <span className="text-emerald-600 font-extrabold">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={7}
                    max={14}
                    step={0.15}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <span className="text-[9px] text-gray-400 font-semibold">Tier-1 Banks: 8.35% - 9.15%</span>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                    <span>Tenure Limit</span>
                    <span className="text-emerald-600 font-extrabold">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <span className="text-[9px] text-gray-400 font-semibold">Standard: 20 Years</span>
                </div>

              </div>

              {/* Yield Output panel */}
              <div className="p-4 bg-slate-950 text-white rounded-2xl grid grid-cols-3 gap-4 text-center items-center">
                <div className="border-r border-slate-800 last:border-none p-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Equated EMI</span>
                  <span className="text-base font-extrabold text-emerald-400">₹{monthlyEmi.toLocaleString("en-IN")}/mo</span>
                </div>
                <div className="border-r border-slate-800 last:border-none p-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Interest Payable</span>
                  <span className="text-xs font-bold">₹{Math.round(interestPayable / 100000).toFixed(0)} Lac</span>
                </div>
                <div className="p-1">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">Total Outlay</span>
                  <span className="text-xs font-bold">₹{Math.round(totalPayment / 100000).toFixed(0)} Lac</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Contact Coordinator form & Brochure */}
        <div className="space-y-6">
          
          {/* Schedule Visit Board */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Coordinate Visit</h3>
            
            <form onSubmit={handleScheduleVisit} className="space-y-3.5">
              
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setScheduleType("In-Person")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    scheduleType === "In-Person" ? "bg-white text-slate-950 shadow-sm" : "text-gray-500"
                  }`}
                >
                  On-site Inspection
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleType("Video")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    scheduleType === "Video" ? "bg-white text-slate-950 shadow-sm" : "text-gray-500"
                  }`}
                >
                  HD Video Tour
                </button>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Inspection Date</label>
                <input 
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-emerald-500 text-gray-700"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Preferred Hour Slot</label>
                <select 
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-emerald-500 text-gray-700"
                >
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="11:30 AM">11:30 AM (Midday)</option>
                  <option value="03:00 PM">03:00 PM (Afternoon)</option>
                  <option value="05:30 PM">05:30 PM (Evening)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Schedule Visit Slot
              </button>

            </form>

            {scheduleStatus && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 leading-relaxed font-semibold">
                {scheduleStatus}
              </div>
            )}
          </div>

          {/* Contact Agent Profile Board */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Luxe Agent Representative</h3>
            
            <div className="flex items-center space-x-3.5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-emerald-100 to-teal-50 flex items-center justify-center text-emerald-800 font-extrabold text-sm border">
                {property.contact.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{property.contact.name}</h4>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{property.contact.role}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-50 text-xs">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                <span>{property.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="truncate">{property.contact.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a 
                href={`mailto:${property.contact.email}`}
                className="py-2 bg-slate-50 border border-gray-200 hover:bg-slate-100 text-gray-700 text-[11px] font-bold rounded-xl text-center cursor-pointer"
              >
                Send Email
              </a>
              <button 
                onClick={() => alert(`Calling ${property.contact.name} at ${property.contact.phone}...`)}
                className="py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-xl text-center cursor-pointer"
              >
                Call Instant
              </button>
            </div>
          </div>

          {/* Download Brochure Board */}
          <button 
            onClick={handleBrochureDownload}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-gray-200 rounded-2xl py-3 px-4 flex items-center justify-between font-bold text-xs shadow-sm cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-emerald-600" />
              <span>Property Brochure PDF</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

        </div>

      </div>

    </div>
  );
}
