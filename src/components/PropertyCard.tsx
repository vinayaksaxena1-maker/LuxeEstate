/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Property, ActivePage } from "../types";
import { 
  Heart, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Maximize, 
  BedDouble, 
  Bath, 
  Car, 
  ArrowLeftRight, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

interface PropertyCardProps {
  key?: string;
  property: Property;
  onSelect: (propertyId: string) => void;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  isCompared: boolean;
  onToggleCompare: (e: React.MouseEvent, property: Property) => void;
}

export default function PropertyCard({ 
  property, 
  onSelect, 
  isSaved, 
  onToggleSave,
  isCompared,
  onToggleCompare
}: PropertyCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/property/${property.id}`);
    alert(`Copied link for "${property.title}" to clipboard!`);
  };

  return (
    <div 
      onClick={() => onSelect(property.id)}
      className="group relative bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:border-[#005ca8] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      
      {/* Top Media Gallery */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        
        {/* Dynamic Image */}
        <img 
          src={property.images[currentImgIndex]} 
          alt={property.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
 
        {/* Carousel Buttons (Overlay on hover) */}
        <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={handlePrevImg}
            className="p-1.5 rounded-full bg-black/70 text-white hover:bg-black shadow-md transition-all border border-white/10"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button 
            onClick={handleNextImg}
            className="p-1.5 rounded-full bg-black/70 text-white hover:bg-black shadow-md transition-all border border-white/10"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
 
        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
          {property.images.map((_, idx) => (
            <span 
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentImgIndex ? "w-3 bg-[#005ca8]" : "w-1.5 bg-white/70"
              }`}
            />
          ))}
        </div>
 
        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
          {property.isVerified && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#005ca8] text-white text-[10px] font-bold rounded-lg shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
              <span>Verified</span>
            </span>
          )}
          {property.isReraApproved && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
              <span>RERA Registered</span>
            </span>
          )}
        </div>
 
        {/* Right Floating Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Heart button */}
          <button 
            onClick={(e) => onToggleSave(e, property.id)}
            className={`p-2 rounded-full border border-slate-200/50 transition-transform active:scale-90 shadow-md ${
              isSaved 
                ? "bg-rose-500 text-white hover:bg-rose-600" 
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart className="h-4 w-4 fill-current" style={{ fill: isSaved ? "currentColor" : "none" }} />
          </button>
 
          {/* Compare Toggle */}
          <button 
            onClick={(e) => onToggleCompare(e, property)}
            className={`p-2 rounded-full border border-slate-200/50 transition-transform active:scale-90 shadow-md ${
              isCompared 
                ? "bg-[#005ca8] text-white hover:bg-[#004b87]" 
                : "bg-white/90 text-slate-700 hover:bg-white hover:text-[#005ca8]"
            }`}
            title="Compare Property"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
 
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:text-[#005ca8] border border-slate-200/50 transition-transform active:scale-90 shadow-md"
            title="Copy Property Link"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
 
        {/* Builder watermark */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/75 text-white text-[10px] font-bold rounded shadow-sm border border-white/10">
          {property.builderName}
        </div>
      </div>
 
      {/* Card Information */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Pricing Segment */}
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xl font-extrabold text-[#005ca8] tracking-tight">
            {property.formattedPrice}
          </span>
          {property.emi !== "Rentals" && (
            <span className="text-[11px] text-slate-500 font-medium">
              EMI starting: <span className="font-bold text-slate-800">{property.emi}</span>
            </span>
          )}
          {property.emi === "Rentals" && (
            <span className="text-[11px] text-[#005ca8] font-bold uppercase tracking-wider bg-[#005ca8]/10 px-2 py-0.5 rounded border border-[#005ca8]/10">
              Rental Asset
            </span>
          )}
        </div>
 
        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1 group-hover:text-[#005ca8] transition-colors">
          {property.title}
        </h3>
 
        {/* Address */}
        <div className="flex items-center text-xs text-slate-500 space-x-1 mb-3">
          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>
 
        <div className="border-t border-slate-200/60 my-2" />
 
        {/* Spec Grid */}
        <div className="grid grid-cols-3 gap-2 py-1.5 text-center bg-slate-50 border border-slate-100 rounded-xl mb-3">
          
          <div className="flex flex-col items-center justify-center p-1">
            <div className="flex items-center space-x-1 text-slate-800 text-xs font-bold">
              <Maximize className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>{property.area}</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase font-bold">Sq Ft</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-1 border-x border-slate-200/60">
            <div className="flex items-center space-x-1 text-slate-800 text-xs font-bold">
              <BedDouble className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>{property.bedrooms || "N/A"}</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase font-bold">Beds</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-1">
            <div className="flex items-center space-x-1 text-slate-800 text-xs font-bold">
              <Bath className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>{property.bathrooms || "N/A"}</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase font-bold">Baths</span>
          </div>
 
        </div>
 
        {/* Footing Details */}
        <div className="mt-auto pt-2 flex justify-between items-center text-[10px] text-slate-500 font-bold border-t border-slate-200/60">
          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded uppercase tracking-wider border border-slate-200">
            {property.furnishing}
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 bg-[#005ca8] rounded-full" />
            <span>Investment Index: {property.investmentScore}%</span>
          </div>
        </div>
 
      </div>
 
    </div>
  );
}
