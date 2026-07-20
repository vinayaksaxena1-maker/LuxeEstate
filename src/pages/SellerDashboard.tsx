/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ActivePage, Property } from "../types";
import { PROPERTIES } from "../data/properties";
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  CalendarClock, 
  PlusCircle, 
  Building2, 
  ChevronRight, 
  CreditCard, 
  TrendingUp, 
  Sparkles,
  Search,
  CheckCircle2,
  Trash2
} from "lucide-react";

interface SellerDashboardProps {
  onNavigate: (page: ActivePage) => void;
  onSelectProperty: (id: string) => void;
}

export default function SellerDashboardPage({ onNavigate, onSelectProperty }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "leads" | "properties" | "subscription">("analytics");

  // Sample Leads
  const [leads, setLeads] = useState([
    { id: "l1", name: "Ramesh Iyer", email: "ramesh@gmail.com", phone: "+91 98840 21321", property: "Prestige Golfshire Mansion", status: "Hot Match", date: "Today, 09:12 AM" },
    { id: "l2", name: "Dr. Shalini Sen", email: "shalini@outlook.com", phone: "+91 94432 00192", property: "The Celestial Penthouse", status: "Scheduled Tour", date: "Yesterday, 02:40 PM" },
    { id: "l3", name: "Siddharth Goel", email: "sid@techpartners.com", phone: "+91 88720 15423", property: "Godrej Zenith Smart Office", status: "Offer Proposed", date: "July 16, 2026" }
  ]);

  // Sample Appointments
  const appointments = [
    { name: "Ritu Mehta", type: "In-Person Site Tour", date: "Tomorrow, 11:30 AM", property: "The Celestial Penthouse" },
    { name: "Pranav Goel", type: "HD Video VR Review", date: "July 24, 03:00 PM", property: "Indiranagar Boulevard Townhouse" }
  ];

  // Listed properties (sliced from mock)
  const myListedProperties = PROPERTIES.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-screen">
      
      {/* Header Panel */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Enterprise Seller Space</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Developer & Broker Workspace</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Manage active listings, analyze buyer traffic spikes, and optimize conversions.</p>
        </div>

        <button 
          onClick={() => {
            alert("This prototype supports 150 programmatic listings. Adding new custom property schemas can be integrated using actual database setups.");
          }}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <PlusCircle className="h-4.5 w-4.5" />
          <span>Post New Listing</span>
        </button>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-1 col-span-1">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "analytics" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <BarChart3 className="h-4 w-4" />
              <span>Sellers Analytics</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "leads" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Users className="h-4 w-4" />
              <span>Buyer Lead Pipelines</span>
            </div>
            <span className="bg-emerald-100/50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-extrabold">{leads.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "properties" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Building2 className="h-4 w-4" />
              <span>My Gated Listings</span>
            </div>
            <span className="bg-emerald-100/50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-extrabold">{myListedProperties.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("subscription")}
            className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl flex items-center justify-between transition-all cursor-pointer ${
              activeTab === "subscription" ? "bg-emerald-50 text-emerald-700 font-black" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <CreditCard className="h-4 w-4" />
              <span>SaaS Subscriptions</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </aside>

        {/* Core dynamic pane */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: Analytics graphs & active logs */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Weekly Visitors</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-2xl font-extrabold text-slate-900">4,210</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      +12.4%
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Matched Leads</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-2xl font-extrabold text-slate-900">142</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      +18.5%
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Pending Inquiries</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-2xl font-extrabold text-slate-900">18</span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      Steady
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Traffic Chart (SVG) */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Traffic & Engagement Volume Index</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Comparing organic search spikes against direct buyer callbacks</p>
                </div>

                <div className="h-48 w-full mt-6 relative flex items-end">
                  {/* Stripe style bar chart */}
                  <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-between px-4">
                    {[35, 45, 60, 40, 75, 90, 85, 65, 95, 110, 105, 120].map((h, i) => (
                      <div key={i} className="flex flex-col items-center space-y-2 w-full max-w-[20px] group">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-6 bg-slate-950 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {h} visits
                        </div>
                        <div 
                          className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-lg group-hover:from-emerald-500 transition-all duration-300"
                          style={{ height: `${h * 1.1}px` }}
                        />
                        <span className="text-[9px] text-gray-400 font-semibold uppercase">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Appointment Agenda List */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">Inspection Appointments Agenda</h3>
                <div className="space-y-3.5">
                  {appointments.map((appt, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-100 transition-colors">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{appt.name}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">Asset: {appt.property} • Format: <span className="font-semibold text-emerald-600">{appt.type}</span></p>
                      </div>
                      <span className="self-start sm:self-center bg-slate-200 text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shrink-0">
                        {appt.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Buyer leads list */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Active Buyer Leads Pipeline</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Inquiries captured through custom VR portals and Mortgage calculators.</p>
              </div>

              <div className="bg-white border border-gray-150 rounded-2xl shadow-sm divide-y divide-gray-150">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="flex items-center space-x-2.5">
                        <h4 className="text-sm font-bold text-slate-900">{lead.name}</h4>
                        <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-semibold mt-1">Listed Property: {lead.property}</p>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">Logged: {lead.date} • Phone: {lead.phone} • Email: {lead.email}</p>
                    </div>

                    <div className="flex space-x-2 shrink-0">
                      <a 
                        href={`mailto:${lead.email}`}
                        className="px-3.5 py-2 bg-slate-50 border border-gray-200 text-gray-700 hover:bg-slate-100 text-[10px] font-bold rounded-xl cursor-pointer"
                      >
                        Contact Email
                      </a>
                      <button 
                        onClick={() => alert(`Direct calling lead "${lead.name}" at ${lead.phone}...`)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        Call Buyer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Registered Listed Properties list */}
          {activeTab === "properties" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">My Registered Listed Properties</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Control pricing metrics, descriptions, and structural blueprint schemas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myListedProperties.map((p) => (
                  <div key={p.id} className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
                        <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-1 rounded">
                          {p.type}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{p.title}</h3>
                        <p className="text-xs text-emerald-600 font-bold mt-1">{p.formattedPrice}</p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">{p.locality}, {p.city}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-gray-50 flex space-x-2">
                      <button 
                        onClick={() => onSelectProperty(p.id)}
                        className="flex-1 py-2 bg-slate-50 border border-gray-200 hover:bg-slate-100 text-gray-700 text-[10px] font-bold rounded-xl cursor-pointer"
                      >
                        Review Client View
                      </button>
                      <button 
                        onClick={() => alert(`Property details modifications for "${p.title}" requires full-stack db integration.`)}
                        className="flex-1 py-2 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-bold rounded-xl cursor-pointer"
                      >
                        Edit Specs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Subscription Package Plans */}
          {activeTab === "subscription" && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Active Broker SaaS Subscription</h2>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Control pricing tiers, developer APIs, and lead routing models.</p>
              </div>

              <div className="p-5 bg-slate-950 text-white rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold rounded-lg uppercase tracking-widest">
                    Elite Developer Tier
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight mt-2">Unlimited Gated Listings & AI Matches</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Renewal Scheduled: July 20, 2027 • Standard rate card: ₹8,500/mo</p>
                </div>

                <div className="px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg relative z-10 shrink-0">
                  Active Account
                </div>
              </div>

              {/* Transactions History */}
              <div className="space-y-3 pt-4 border-t border-gray-150">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Recent Payment Logs</h4>
                
                <div className="divide-y divide-gray-100 border border-gray-150 rounded-2xl overflow-hidden text-xs">
                  {[
                    { id: "tx301", item: "LuxeEstate Developer SaaS Renewal", value: "₹8,500", date: "June 20, 2026", status: "Completed" },
                    { id: "tx299", item: "Premium Listing Booster Pack (Worli)", value: "₹2,400", date: "June 12, 2026", status: "Completed" }
                  ].map((tx, i) => (
                    <div key={i} className="p-4 flex justify-between items-center bg-slate-50/50">
                      <div>
                        <h5 className="font-bold text-gray-800">{tx.item}</h5>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Invoice: {tx.id} • Method: Card ending 4012</p>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 block">{tx.value}</span>
                        <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">{tx.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
