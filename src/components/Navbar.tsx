/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ActivePage } from "../types";
import { 
  Building2, 
  Search, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Sparkles, 
  Heart, 
  Bell, 
  Briefcase 
} from "lucide-react";

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  savedCount: number;
  compareCount: number;
}

export default function Navbar({ activePage, onNavigate, savedCount, compareCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const mainNavItems = [
    { label: "Buy", page: ActivePage.BUY },
    { label: "Rent", page: ActivePage.RENT },
    { label: "Commercial", page: ActivePage.COMMERCIAL },
    { label: "Projects", page: ActivePage.NEW_PROJECTS },
    { label: "Plots", page: ActivePage.PLOTS }
  ];

  const secondaryNavItems = [
    { label: "Builders", page: ActivePage.BUILDERS },
    { label: "Agents", page: ActivePage.AGENTS },
    { label: "Localities", page: ActivePage.LOCALITIES },
    { label: "Blog", page: ActivePage.BLOG },
    { label: "FAQ", page: ActivePage.FAQ }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(ActivePage.HOME)}>
            <div className="h-10 w-10 rounded-xl bg-[#005ca8] flex items-center justify-center text-white shadow-md shadow-blue-500/10">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#005ca8] leading-none">LuxeEstate</span>
              <span className="text-[10px] font-bold text-teal-600 tracking-wider uppercase mt-1">99acres Companion</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  activePage === item.page
                    ? "bg-[#005ca8]/10 text-[#005ca8]"
                    : "text-slate-700 hover:text-[#005ca8] hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="h-4 w-px bg-slate-200 mx-2" />

            {secondaryNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === item.page
                    ? "text-[#005ca8]"
                    : "text-slate-500 hover:text-[#005ca8] hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Compare Badge */}
            {compareCount > 0 && (
              <button 
                onClick={() => onNavigate(ActivePage.DASHBOARD)}
                className="relative p-2 text-slate-600 hover:text-[#005ca8] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Compare Properties"
              >
                <div className="h-5 w-5 flex items-center justify-center text-xs font-bold border border-[#005ca8]/30 bg-[#005ca8]/10 text-[#005ca8] rounded-md">
                  {compareCount}
                </div>
              </button>
            )}

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate(ActivePage.DASHBOARD)}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Heart className="h-5 w-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-slate-600 hover:text-[#005ca8] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
              </button>
            </div>

            {/* Post Property FREE Orange Button */}
            <button 
              onClick={() => onNavigate(ActivePage.SELLER_DASHBOARD)}
              className="flex items-center space-x-1 px-3 py-2 bg-[#ff7a00] hover:bg-[#e05a00] text-white text-xs font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>Post Property</span>
              <span className="bg-white text-[#ff7a00] text-[9px] font-extrabold px-1 py-0.2 rounded uppercase">FREE</span>
            </button>

            {/* Ask AI Helper */}
            <button 
              onClick={() => {
                const chatbotToggle = document.getElementById("ai-chat-trigger");
                if (chatbotToggle) chatbotToggle.click();
              }}
              className="flex items-center space-x-1 px-3 py-2 bg-[#005ca8] hover:bg-[#004b87] text-white text-xs font-bold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
              <span>Ask AI</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-1.5 p-1 px-2 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <div className="h-7 w-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-700 font-bold text-xs">
                  VS
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">vinayaksaxena1@gmail.com</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      onNavigate(ActivePage.DASHBOARD);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#005ca8] transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    <span>Buyer Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate(ActivePage.SELLER_DASHBOARD);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#005ca8] transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <Briefcase className="h-4 w-4 text-slate-400" />
                    <span>Seller Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate(ActivePage.PRICING);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#005ca8] transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Developer API / Pricing</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      onNavigate(ActivePage.LOGIN);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden space-x-3">
            <button
              onClick={() => onNavigate(ActivePage.DASHBOARD)}
              className="relative p-2 text-gray-500"
            >
              <Heart className="h-5 w-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 hover:text-emerald-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-2 shadow-inner">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
            {mainNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-center ${
                  activePage === item.page
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {secondaryNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg block"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <button
              onClick={() => {
                onNavigate(ActivePage.DASHBOARD);
                setIsOpen(false);
              }}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>My Saved & Wishlist</span>
            </button>
            <button
              onClick={() => {
                onNavigate(ActivePage.SELLER_DASHBOARD);
                setIsOpen(false);
              }}
              className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center space-x-2"
            >
              <Briefcase className="h-4 w-4" />
              <span>Seller Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
