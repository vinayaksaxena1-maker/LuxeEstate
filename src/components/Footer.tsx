/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ActivePage } from "../types";
import { Building2, Mail, Phone, MapPin, Sparkles, Send } from "lucide-react";

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-850 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding and Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          <div className="md:col-span-1 flex flex-col space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(ActivePage.HOME)}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">LuxeEstate</span>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase mt-1">AI-Powered</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              An enterprise-grade, intelligence-driven Real Estate Marketplace prototype. Combining elite spatial design, real-time analytics, and next-generation AI interfaces.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Subscribe to LuxeMarket Newsletter</h4>
            <div className="flex max-w-md w-full bg-zinc-900 border border-white/10 rounded-xl overflow-hidden p-1">
              <input 
                type="email" 
                placeholder="Enter your enterprise email" 
                className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder-gray-500"
              />
              <button 
                onClick={() => alert("Successfully joined the LuxeEstate market briefing list.")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Join</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-12">
          
          <div className="flex flex-col space-y-3">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase">Buy & Invest</h5>
            <button onClick={() => onNavigate(ActivePage.BUY)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Buy Homes</button>
            <button onClick={() => onNavigate(ActivePage.NEW_PROJECTS)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">New Launch Projects</button>
            <button onClick={() => onNavigate(ActivePage.PLOTS)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Residential Plots</button>
            <button onClick={() => onNavigate(ActivePage.COMMERCIAL)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Commercial Buy</button>
          </div>

          <div className="flex flex-col space-y-3">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase">Rent & Lease</h5>
            <button onClick={() => onNavigate(ActivePage.RENT)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Rent Apartments</button>
            <button onClick={() => onNavigate(ActivePage.RENT)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Luxury Villas</button>
            <button onClick={() => onNavigate(ActivePage.COMMERCIAL)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Co-working Hubs</button>
            <button onClick={() => onNavigate(ActivePage.COMMERCIAL)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Office Leasing</button>
          </div>

          <div className="flex flex-col space-y-3">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase">Directories</h5>
            <button onClick={() => onNavigate(ActivePage.BUILDERS)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Leading Builders</button>
            <button onClick={() => onNavigate(ActivePage.AGENTS)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Specialist Agents</button>
            <button onClick={() => onNavigate(ActivePage.LOCALITIES)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Locality Index</button>
            <button onClick={() => onNavigate(ActivePage.DASHBOARD)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Buyer's Wishlist</button>
          </div>

          <div className="flex flex-col space-y-3">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase">Enterprise</h5>
            <button onClick={() => onNavigate(ActivePage.ABOUT)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">About LuxeEstate</button>
            <button onClick={() => onNavigate(ActivePage.BLOG)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Market Blog</button>
            <button onClick={() => onNavigate(ActivePage.PRICING)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">SaaS Plans & Pricing</button>
            <button onClick={() => onNavigate(ActivePage.FAQ)} className="text-left text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">Help Center / FAQ</button>
          </div>

          <div className="col-span-2 flex flex-col space-y-4">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase">Corporate Contact</h5>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Phone className="h-4 w-4 text-blue-500" />
              <span>+91 1800 555 9000 (Toll Free)</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Mail className="h-4 w-4 text-blue-500" />
              <span>enterprise@luxeestate.in</span>
            </div>
            <div className="flex items-start space-x-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
              <span>Luxe Towers, DLF CyberCity, Gurgaon Sector 24, Haryana, India</span>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/40 border border-blue-900/40 rounded-lg text-[11px] font-semibold text-blue-400">
                <Sparkles className="h-3 w-3" />
                <span>Next-Gen Platform Prototype</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} LuxeEstate Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">RERA Compliance Guidance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
