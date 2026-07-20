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
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate(ActivePage.HOME)}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/15">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">LuxeEstate</span>
              <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase mt-1">AI-Powered</span>
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
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activePage === item.page
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-900/60"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="h-4 w-px bg-white/10 mx-2" />

            {secondaryNavItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activePage === item.page
                    ? "text-blue-400"
                    : "text-zinc-500 hover:text-blue-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Compare Badge */}
            {compareCount > 0 && (
              <button 
                onClick={() => onNavigate(ActivePage.DASHBOARD)}
                className="relative p-2 text-zinc-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Compare Properties"
              >
                <div className="h-5 w-5 flex items-center justify-center text-xs font-bold border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-md">
                  {compareCount}
                </div>
              </button>
            )}

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate(ActivePage.DASHBOARD)}
              className="relative p-2 text-zinc-400 hover:text-rose-500 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
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
              <button className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              </button>
            </div>

            {/* Quick AI Search Shortcut */}
            <button 
              onClick={() => {
                const chatbotToggle = document.getElementById("ai-chat-trigger");
                if (chatbotToggle) chatbotToggle.click();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-500/15 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-1.5 p-1 px-2 hover:bg-white/5 rounded-xl border border-white/5 transition-colors cursor-pointer"
              >
                <div className="h-7 w-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                  VS
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-white/5 rounded-xl shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-white/5">
                    <p className="text-xs text-zinc-500 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">vinayaksaxena1@gmail.com</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      onNavigate(ActivePage.DASHBOARD);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <User className="h-4 w-4 text-zinc-400" />
                    <span>Buyer Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate(ActivePage.SELLER_DASHBOARD);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <Briefcase className="h-4 w-4 text-zinc-400" />
                    <span>Seller Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate(ActivePage.PRICING);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Developer API / Pricing</span>
                  </button>

                  <div className="border-t border-white/5 my-1" />

                  <button
                    onClick={() => {
                      onNavigate(ActivePage.LOGIN);
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
