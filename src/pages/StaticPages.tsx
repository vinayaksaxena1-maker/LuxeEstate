/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ActivePage, FAQItem, BlogPost } from "../types";
import { BLOG_POSTS, FAQS } from "../data/properties";
import { 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  Check,
  Building,
  Lock
} from "lucide-react";

interface StaticPageProps {
  view: "login" | "register" | "about" | "contact" | "blog" | "pricing" | "faq";
  onNavigate: (page: ActivePage) => void;
}

export default function StaticPages({ view, onNavigate }: StaticPageProps) {
  
  // FAQ Collapsible Accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq1");
  
  // Contact state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert("Please fill in all details first.");
      return;
    }
    setContactStatus("Thank you! Your corporate inquiry has been recorded. Our alliance managers will call you back within 2 hours.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-center">
      
      {/* ====================================================
          1. LOGIN PAGE
          ==================================================== */}
      {view === "login" && (
        <div className="max-w-md mx-auto w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Secure Gateway</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">Sign In to LuxeEstate</h2>
            <p className="text-xs text-gray-400 font-semibold mt-1">Unlock saved wishlist matching portfolios instantly.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onNavigate(ActivePage.DASHBOARD); }} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Registered Email</label>
              <input 
                type="email" 
                defaultValue="vinayaksaxena1@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-baseline">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Secret Password</label>
                <a href="#" className="text-[9px] font-bold text-emerald-600 hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Access Secure Account
            </button>
          </form>

          <div className="pt-4 text-center border-t border-gray-50 mt-6 text-xs text-gray-500">
            <span>New to our marketplace? </span>
            <button onClick={() => onNavigate(ActivePage.REGISTER)} className="font-bold text-emerald-600 hover:underline cursor-pointer">Register Profile</button>
          </div>
        </div>
      )}

      {/* ====================================================
          2. REGISTER PAGE
          ==================================================== */}
      {view === "register" && (
        <div className="max-w-md mx-auto w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Create Profile</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">Join LuxeEstate Marketplace</h2>
            <p className="text-xs text-gray-400 font-semibold mt-1">Get custom automated alerts on spatial appraisals.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onNavigate(ActivePage.DASHBOARD); }} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Your Name</label>
              <input 
                type="text" 
                placeholder="e.g. Vinayak Saxena"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Contact Email</label>
              <input 
                type="email" 
                placeholder="vinayaksaxena1@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Choose Password</label>
              <input 
                type="password" 
                placeholder="At least 8 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Sign Up Secure
            </button>
          </form>

          <div className="pt-4 text-center border-t border-gray-50 mt-6 text-xs text-gray-500">
            <span>Have an active account? </span>
            <button onClick={() => onNavigate(ActivePage.LOGIN)} className="font-bold text-emerald-600 hover:underline cursor-pointer">Sign In</button>
          </div>
        </div>
      )}

      {/* ====================================================
          3. ABOUT PAGE
          ==================================================== */}
      {view === "about" && (
        <div className="space-y-12 animate-in fade-in duration-350 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Mission</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">Next-Gen Real Estate Brokerage</h1>
            <p className="text-sm text-gray-500 font-semibold max-w-xl mx-auto mt-3">
              We leverage advanced machine learning models to trace, evaluate, and forecast pricing models across India's premier tech clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-950 mb-3">Architectural Honesty</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                LuxeEstate was established in 2026 to bridge the transparency trust deficits within standard real estate directories. We ensure 100% RERA compliance validation on all listings, paired with active drone cinematics.
              </p>
              <div className="mt-4 flex items-center space-x-2 text-emerald-700 font-bold text-xs bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                <span>Certified National RERA Regulatory Tracker</span>
              </div>
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=300" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          4. CONTACT PAGE
          ==================================================== */}
      {view === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto animate-in fade-in duration-300">
          
          {/* Info Card */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Connect with Us</span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Corporate Headquarters</h1>
              <p className="text-xs text-gray-400 font-semibold mt-1">Ready to partner with LuxeEstate developers team?</p>
            </div>

            <div className="space-y-4 font-semibold text-xs text-gray-600">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-gray-100">
                <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">National Headquarters</h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">Luxe Towers, DLF CyberCity, Gurgaon Sector 24, Haryana, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-gray-100">
                <Mail className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Partner & Alliances</h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">enterprise@luxeestate.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-2xl border border-gray-100">
                <Phone className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Enterprise Hotline</h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">+91 1800 555 9000 (Toll Free)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase">Corporate Inquiry Form</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-3.5">
              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Your Name</label>
                <input 
                  type="text" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ramesh Iyer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Business Email</label>
                <input 
                  type="email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. ramesh@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Message Pitch</label>
                <textarea 
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Describe your property development or brokerage alliance..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Submit Inquiry
              </button>
            </form>

            {contactStatus && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-[11px] leading-relaxed font-semibold">
                {contactStatus}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ====================================================
          5. BLOG PAGE
          ==================================================== */}
      {view === "blog" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">LuxeBriefing</span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Indian Property Market Blog</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">Strategic intelligence, spatial index growth reports, and legal retrospects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="h-48 w-full overflow-hidden bg-gray-100">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-3 line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mt-2">{post.excerpt}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-50 mt-4 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                  <span>{post.author} • {post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================
          6. PRICING PAGE (SaaS Subscriptions)
          ==================================================== */}
      {view === "pricing" && (
        <div className="space-y-12 animate-in fade-in duration-300 max-w-5xl mx-auto">
          <div className="text-center max-w-md mx-auto">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">SaaS Licenses</span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">SaaS Pricing for Brokers</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">National developer teams and local agents rely on our APIs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tier 1 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Growth Agent</span>
                <div className="flex items-baseline space-x-1 mt-2">
                  <span className="text-2xl font-black text-slate-900">₹2,400</span>
                  <span className="text-xs text-gray-400 font-bold">/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-3 font-semibold leading-relaxed">Perfect for independent regional brokers starting out.</p>
                
                <ul className="space-y-2 mt-6 text-xs text-gray-600 font-semibold">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Up to 15 Gated Listings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Active VR gyroscope matching</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => alert("Subscribing to Growth Agent tier...")}
                className="mt-8 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                License Growth Plan
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-md flex flex-col justify-between relative">
              <span className="absolute top-[-12px] right-6 bg-emerald-600 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest shadow">
                Most Popular
              </span>
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Elite Developer</span>
                <div className="flex items-baseline space-x-1 mt-2">
                  <span className="text-2xl font-black text-slate-900">₹8,500</span>
                  <span className="text-xs text-gray-400 font-bold">/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-3 font-semibold leading-relaxed">National developer groups matching massive portfolios.</p>
                
                <ul className="space-y-2 mt-6 text-xs text-gray-600 font-semibold">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Unlimited Listed Properties</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Double-weighted AI match routing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Integrated 360 Drone blueprints</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => alert("Subscribing to Elite Developer tier...")}
                className="mt-8 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                License Elite Plan
              </button>
            </div>

            {/* Tier 3 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Enterprise Corp</span>
                <div className="flex items-baseline space-x-1 mt-2">
                  <span className="text-2xl font-black text-slate-900">₹18,000</span>
                  <span className="text-xs text-gray-400 font-bold">/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-3 font-semibold leading-relaxed">Dedicated regional brokerages managing team roles.</p>
                
                <ul className="space-y-2 mt-6 text-xs text-gray-600 font-semibold">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Team permissions roster (15 seatings)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Priority developer API access keys</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => alert("Subscribing to Enterprise team package...")}
                className="mt-8 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                License Corporate Plan
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================
          7. FAQ PAGE
          ==================================================== */}
      {view === "faq" && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-3xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Help Center</span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Collapsible FAQ Library</h1>
            <p className="text-xs text-gray-400 font-semibold mt-1">Search or choose category directories below.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm divide-y divide-gray-100">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-4">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex justify-between items-center text-left py-2 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 pr-4">
                      <HelpCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-gray-800">{faq.question}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-600" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="pl-7.5 pr-4 pt-2 text-xs text-gray-500 font-semibold leading-relaxed animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
