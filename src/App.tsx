/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ActivePage, Property, SearchFilters } from "./types";
import { PROPERTIES } from "./data/properties";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot";

// Import Pages
import HomePage from "./pages/Home";
import SearchResultsPage from "./pages/SearchResults";
import PropertyDetailsPage from "./pages/PropertyDetails";
import DashboardPage from "./pages/Dashboard";
import SellerDashboardPage from "./pages/SellerDashboard";
import BuildersAgentsPage from "./pages/BuildersAgents";
import StaticPages from "./pages/StaticPages";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>(ActivePage.HOME);
  
  // Shared States
  const [savedIds, setSavedIds] = useState<string[]>(["p1", "p4"]); // pre-populate some saved properties for client display
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Search Filters state
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: "",
    purpose: "Buy",
    city: "Bangalore",
    type: "",
    budgetMin: 0,
    budgetMax: 300000000,
    bedrooms: "",
    bathrooms: "",
    areaMin: 0,
    areaMax: 10000,
    isNewProject: false,
    isReraApproved: false
  });

  // Navigation controller
  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Selector for specific detailed view
  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    handleNavigate(ActivePage.DETAILS);
  };

  // Saved Properties Favorites Toggle
  const handleToggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Compare properties Toggle
  const handleToggleCompare = (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();
    setComparedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      } else {
        if (prev.length >= 4) {
          alert("Comparison limit reached! You can compare a maximum of 4 properties side-by-side.");
          return prev;
        }
        return [...prev, property];
      }
    });
  };

  // Search execution handler
  const handleSearchUpdate = (filters: SearchFilters) => {
    setSearchFilters(filters);
    handleNavigate(ActivePage.SEARCH_RESULTS);
  };

  // Retrieve selected property object
  const activeProperty = PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Global Navigation Hub */}
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        savedCount={savedIds.length}
        compareCount={comparedProperties.length}
      />

      {/* 2. Primary Page Router */}
      <main className="flex-1 flex flex-col">
        {(() => {
          switch (activePage) {
            case ActivePage.HOME:
              return (
                <HomePage 
                  onNavigate={handleNavigate} 
                  onSearch={handleSearchUpdate} 
                  onSelectProperty={handleSelectProperty}
                />
              );
            
            case ActivePage.SEARCH_RESULTS:
              return (
                <SearchResultsPage 
                  filters={searchFilters}
                  onUpdateFilters={setSearchFilters}
                  onSelectProperty={handleSelectProperty}
                  savedIds={savedIds}
                  onToggleSave={handleToggleSave}
                  comparedProperties={comparedProperties}
                  onToggleCompare={handleToggleCompare}
                  onNavigate={handleNavigate}
                />
              );

            case ActivePage.DETAILS:
              return (
                <PropertyDetailsPage 
                  property={activeProperty}
                  onBack={() => handleNavigate(ActivePage.SEARCH_RESULTS)}
                  isSaved={savedIds.includes(activeProperty.id)}
                  onToggleSave={handleToggleSave}
                  onNavigate={handleNavigate}
                />
              );

            case ActivePage.DASHBOARD:
              return (
                <DashboardPage 
                  savedIds={savedIds}
                  onToggleSave={handleToggleSave}
                  comparedProperties={comparedProperties}
                  onToggleCompare={handleToggleCompare}
                  onSelectProperty={handleSelectProperty}
                  onNavigate={handleNavigate}
                />
              );

            case ActivePage.SELLER_DASHBOARD:
              return (
                <SellerDashboardPage 
                  onNavigate={handleNavigate}
                  onSelectProperty={handleSelectProperty}
                />
              );

            case ActivePage.BUILDERS:
              return (
                <BuildersAgentsPage 
                  initialTab="builders"
                  onNavigate={handleNavigate}
                  onSearch={handleSearchUpdate}
                />
              );

            case ActivePage.AGENTS:
              return (
                <BuildersAgentsPage 
                  initialTab="agents"
                  onNavigate={handleNavigate}
                  onSearch={handleSearchUpdate}
                />
              );

            case ActivePage.LOCALITIES:
              return (
                <BuildersAgentsPage 
                  initialTab="localities"
                  onNavigate={handleNavigate}
                  onSearch={handleSearchUpdate}
                />
              );

            // Static Page Mappings
            case ActivePage.LOGIN:
              return <StaticPages view="login" onNavigate={handleNavigate} />;
            case ActivePage.REGISTER:
              return <StaticPages view="register" onNavigate={handleNavigate} />;
            case ActivePage.ABOUT:
              return <StaticPages view="about" onNavigate={handleNavigate} />;
            case ActivePage.CONTACT:
              return <StaticPages view="contact" onNavigate={handleNavigate} />;
            case ActivePage.BLOG:
              return <StaticPages view="blog" onNavigate={handleNavigate} />;
            case ActivePage.PRICING:
              return <StaticPages view="pricing" onNavigate={handleNavigate} />;
            case ActivePage.FAQ:
              return <StaticPages view="faq" onNavigate={handleNavigate} />;

            default:
              return (
                <HomePage 
                  onNavigate={handleNavigate} 
                  onSearch={handleSearchUpdate} 
                  onSelectProperty={handleSelectProperty}
                />
              );
          }
        })()}
      </main>

      {/* 3. Global AI Assistant Advisor Widget */}
      <AIChatBot />

      {/* 4. Deep Footer columns */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
