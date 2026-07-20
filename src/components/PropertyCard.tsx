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
      className="group relative bg-zinc-950 border border-white/5 rounded-2xl shadow-md hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      
      {/* Top Media Gallery */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
        
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
            className="p-1.5 rounded-full bg-black/75 text-white hover:bg-black shadow-md transition-all border border-white/10"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button 
            onClick={handleNextImg}
            className="p-1.5 rounded-full bg-black/75 text-white hover:bg-black shadow-md transition-all border border-white/10"
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
                idx === currentImgIndex ? "w-3 bg-blue-500" : "w-1.5 bg-white/70"
              }`}
            />
          ))}
        </div>
 
        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
          {property.isVerified && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-600/90 text-white text-[10px] font-bold rounded-lg backdrop-blur-sm shadow-sm">
              <ShieldCheck className="h-3 w-3 text-white" />
              <span>Verified</span>
            </span>
          )}
          {property.isReraApproved && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-indigo-600/90 text-white text-[10px] font-bold rounded-lg backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="h-3 w-3 text-white" />
              <span>RERA Registered</span>
            </span>
          )}
        </div>
 
        {/* Right Floating Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Heart button */}
          <button 
            onClick={(e) => onToggleSave(e, property.id)}
            className={`p-2 rounded-full border border-white/10 transition-transform active:scale-90 shadow-md ${
              isSaved 
                ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" 
                : "bg-black/60 text-zinc-300 hover:bg-black hover:text-rose-400"
            }`}
          >
            <Heart className="h-4 w-4 fill-current" style={{ fill: isSaved ? "currentColor" : "none" }} />
          </button>
 
          {/* Compare Toggle */}
          <button 
            onClick={(e) => onToggleCompare(e, property)}
            className={`p-2 rounded-full border border-white/10 transition-transform active:scale-90 shadow-md ${
              isCompared 
                ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" 
                : "bg-black/60 text-zinc-300 hover:bg-black hover:text-blue-400"
            }`}
            title="Compare Property"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
 
          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-black/60 text-zinc-300 hover:bg-black hover:text-blue-400 border border-white/10 transition-transform active:scale-90 shadow-md"
            title="Copy Property Link"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
 
        {/* Builder watermark */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 text-white text-[10px] font-medium rounded backdrop-blur-sm border border-white/5">
          {property.builderName}
        </div>
      </div>
 
      {/* Card Information */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Pricing Segment */}
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xl font-extrabold text-white tracking-tight">
            {property.formattedPrice}
          </span>
          {property.emi !== "Rentals" && (
            <span className="text-[11px] text-zinc-400 font-medium">
              EMI starting: <span className="font-semibold text-zinc-200">{property.emi}</span>
            </span>
          )}
          {property.emi === "Rentals" && (
            <span className="text-[11px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/10">
              Rental Asset
            </span>
          )}
        </div>
 
        {/* Title */}
        <h3 className="text-sm font-bold text-white line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">
          {property.title}
        </h3>
 
        {/* Address */}
        <div className="flex items-center text-xs text-zinc-400 space-x-1 mb-3">
          <MapPin className="h-3 w-3 text-zinc-500 shrink-0" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>
 
        <div className="border-t border-white/5 my-2" />
 
        {/* Spec Grid */}
        <div className="grid grid-cols-3 gap-2 py-1 text-center bg-zinc-900/40 border border-white/5 rounded-xl mb-3">
          
          <div className="flex flex-col items-center justify-center p-1">
            <div className="flex items-center space-x-1 text-zinc-300 text-xs font-semibold">
              <Maximize className="h-3.5 w-3.5 text-blue-400" />
              <span>{property.area}</span>
            </div>
            <span className="text-[9px] text-zinc-500 uppercase font-medium">Sq Ft</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-1 border-x border-white/5">
            <div className="flex items-center space-x-1 text-zinc-300 text-xs font-semibold">
              <BedDouble className="h-3.5 w-3.5 text-blue-400" />
              <span>{property.bedrooms || "N/A"}</span>
            </div>
            <span className="text-[9px] text-zinc-500 uppercase font-medium">Beds</span>
          </div>
 
          <div className="flex flex-col items-center justify-center p-1">
            <div className="flex items-center space-x-1 text-zinc-300 text-xs font-semibold">
              <Bath className="h-3.5 w-3.5 text-blue-400" />
              <span>{property.bathrooms || "N/A"}</span>
            </div>
            <span className="text-[9px] text-zinc-500 uppercase font-medium">Baths</span>
          </div>
 
        </div>
 
        {/* Footing Details */}
        <div className="mt-auto pt-2 flex justify-between items-center text-[10px] text-zinc-400 font-semibold border-t border-white/5">
          <span className="bg-zinc-900 text-zinc-300 px-2 py-1 rounded uppercase tracking-wider border border-white/5">
            {property.furnishing}
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
            <span>Investment Index: {property.investmentScore}%</span>
          </div>
        </div>
 
      </div>
 
    </div>
  );
}
