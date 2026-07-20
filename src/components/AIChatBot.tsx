/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Send, 
  Brain, 
  Calculator, 
  TrendingUp, 
  CheckSquare, 
  BadgeHelp,
  Building,
  ArrowRight
} from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  type?: "price" | "roi" | "locality" | "loan" | "doc" | "text";
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am LuxeAI, your real estate strategist. Ask me about property prices, yield calculations, locality growth, legal checklists, or home loan plans. How can I guide you today?",
      timestamp: "Just Now",
      type: "text"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuickCommand = (commandType: "price" | "locality" | "roi" | "loan" | "doc") => {
    let promptText = "";
    let aiResponseText = "";

    switch (commandType) {
      case "price":
        promptText = "AI Price Prediction: Bangalore & Mumbai 2027 Outlook";
        aiResponseText = `### LuxeAI Price Prediction Matrix (2026 - 2028)
• **Bangalore (Outer Ring Road / Whitefield)**: Current average is ₹8,800/sq.ft. Projected to reach **₹10,500/sq.ft.** by Q4 2027 (+19.3% total rise) driven by tech corridor extensions.
• **Mumbai (Worli / Bandra West)**: Current average ₹58,000/sq.ft. Projected to hit **₹65,000/sq.ft.** by mid 2027 (+12% growth) due to premium oceanview luxury demand.
• **Pune (Baner / Hinjewadi)**: Projected growth of **+14.5% YoY** as IT hubs sprawl westward.

**Verdict**: Neutral-to-Bullish. Lock in current developer pricing before festive hikes.`;
        break;
      case "locality":
        promptText = "AI Locality Livability & Infrastructure Analysis";
        aiResponseText = `### Locality Smart Score Breakdown
• **Indiranagar, Bangalore (Score: 9.5/10)**: Exceptional walkability, established green avenues, elite school networks. Commercial noise is a slight negative.
• **Worli, Mumbai (Score: 9.0/10)**: Superb premium connectivity (Bandra-Worli Sea Link), central commute index, premium views. Higher congestion during rush hours.
• **Gachibowli, Hyderabad (Score: 8.9/10)**: Hyper-modern layout, direct Outer Ring Road linkage, dense IT park concentrations. Water management is progressing.

**LuxeAI recommendation**: High livability scores directly correlate with rental liquidities. Seek out Indiranagar & Gachibowli.`;
        break;
      case "roi":
        promptText = "Calculate Investment Score & ROI Yield Matrix";
        aiResponseText = `### ROI Yield Formula & Smart Investment Score
• **Standard Rental Yield (Residential)**: Typically **2.8% to 3.8%** in premium suburbs (Mumbai: ~3%, Bangalore: ~3.5%).
• **Co-Living conversion yield**: Up to **6.5% - 8.0%** in micro-markets (HSR Layout, Gachibowli).
• **Commercial Yields (Grade-A Offices)**: Steady at **8.2% to 10.2%** with corporate multi-year tenancies.

**AI Score Logic**: LuxeAI scoring rewards developments within 1km of upcoming metro junctions + developer RERA compliance.`;
        break;
      case "loan":
        promptText = "AI Home Loan Mortages and Interest Advisor";
        aiResponseText = `### AI Loan Advisor (FY 2026/2027 Policy)
• **Current Benchmark Interest Rates**: Floating rates range between **8.35% and 8.95%** from leading Tier-1 public and private sector banks.
• **Average Tenure Strategy**: 20-Year amortization balance maximizes tax breaks under Section 24(b) while keeping EMIs moderate.
• **LuxeAI Pro Tip**: Opt for dual floating rates or check pre-payment penalties. A 1% pre-payment annually can save up to ₹24 Lakhs on a ₹1 Crore principal over 20 years.`;
        break;
      case "doc":
        promptText = "Verify Essential Property Transaction Checklist";
        aiResponseText = `### AI Property Legal Clearance Checklist
Before signing, make sure you possess:
1. **Title Mother Deed**: Establishing unbroken ownership lineage for the past 30 years.
2. **Encumbrance Certificate (Form 15)**: Proof that the asset has zero active collateral mortgages.
3. **Occupancy Certificate (OC)**: Mandatory civic approval showing layout matches safety blueprints.
4. **RERA Registry Number**: Verification on the state web portal to secure against structural defects.
5. **Tax Paid Receipts**: Confirming all municipal dues are cleared to date.`;
        break;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: promptText, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), type: commandType }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiResponseText, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), type: commandType }
      ]);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText;
    setInputText("");
    
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    ]);

    setIsTyping(true);

    // Natural Language processing simulator
    setTimeout(() => {
      setIsTyping(false);
      let reply = "I've logged your request regarding properties. Let me cross-analyze our 150 live Indian market listings. Most builders like Godrej, DLF, and Prestige in Mumbai and Bangalore match your premium intent. Is there a specific budget or bedroom count you are targeting?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("mumbai") || lower.includes("worli") || lower.includes("bandra")) {
        reply = "Our listings in Mumbai showcase strong appreciation. Bandra West and Worli averages ₹55,000 - ₹62,000/sq.ft. If you look at 'The Celestial Penthouse & Sky-Suites', it is currently listed at ₹12.50 Cr with high ROI (7.2%). I recommend Scheduling a Virtual 360 Tour.";
      } else if (lower.includes("bangalore") || lower.includes("indiranagar") || lower.includes("whitefield")) {
        reply = "Bangalore presents high rental yields. Indiranagar yields are close to 8.4% for townhouses, while Whitefield has premium gated high-rises starting at ₹8,800/sq.ft. Would you like me to filter our search results for Bangalore residential properties?";
      } else if (lower.includes("loan") || lower.includes("emi") || lower.includes("calculator")) {
        reply = "Floating interest rates are currently standing at ~8.45%. For a premium ₹3 Crore apartment with a 20-year tenure, the monthly EMI would be approximately ₹1.5 Lac. You can utilize the Mortgage Calculator directly on our Property Details page.";
      } else if (lower.includes("commercial") || lower.includes("office") || lower.includes("rent")) {
        reply = "We have high-end commercial spaces inside Gachibowli (Hyderabad) and OMR (Chennai) yielding up to 9.1% ROI. Let's redirect our core search results tab to the Commercial category for your detailed review.";
      } else if (lower.includes("rera") || lower.includes("legal") || lower.includes("document")) {
        reply = "All projects under LuxeEstate are verified for safety. Builders like Prestige, Lodha, and Godrej are fully RERA-registered. When purchasing resale, please ensure you check the Encumbrance Certificate (EC) for the last 30 years.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Trigger Button */}
      <button
        id="ai-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-[#005ca8] to-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative border border-white/10"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Sparkles className="h-6 w-6 text-white animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </span>
        )}
      </button>

      {/* Main Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)] h-[540px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 z-50">
          
          {/* Glowing Header */}
          <div className="bg-[#005ca8] p-4 text-white flex items-center justify-between border-b border-[#004b87]">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h4 className="text-sm font-bold text-white">LuxeAI Strategist</h4>
                  <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
                </div>
                <p className="text-[9px] text-blue-100 font-extrabold uppercase tracking-wider">Enterprise Advisor</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Actions Ribbon */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 overflow-x-auto whitespace-nowrap scrollbar-none flex space-x-1.5 shrink-0">
            <button 
              onClick={() => handleQuickCommand("price")}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-[#005ca8] hover:text-[#005ca8] transition-all cursor-pointer shadow-sm"
            >
              <TrendingUp className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>Price Prediction</span>
            </button>
            <button 
              onClick={() => handleQuickCommand("locality")}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-[#005ca8] hover:text-[#005ca8] transition-all cursor-pointer shadow-sm"
            >
              <Building className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>Locality Score</span>
            </button>
            <button 
              onClick={() => handleQuickCommand("roi")}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-[#005ca8] hover:text-[#005ca8] transition-all cursor-pointer shadow-sm"
            >
              <Calculator className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>Investment Score</span>
            </button>
            <button 
              onClick={() => handleQuickCommand("loan")}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-[#005ca8] hover:text-[#005ca8] transition-all cursor-pointer shadow-sm"
            >
              <BadgeHelp className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>Loan Advisor</span>
            </button>
            <button 
              onClick={() => handleQuickCommand("doc")}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-[#005ca8] hover:text-[#005ca8] transition-all cursor-pointer shadow-sm"
            >
              <CheckSquare className="h-3.5 w-3.5 text-[#005ca8]" />
              <span>Doc Checklist</span>
            </button>
          </div>

          {/* Messages Body */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div 
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-[#005ca8] text-white rounded-tr-none shadow-sm" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm whitespace-pre-wrap"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 font-bold mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 mr-auto bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                <span className="h-1.5 w-1.5 bg-[#005ca8] rounded-full animate-bounce" />
                <span className="h-1.5 w-1.5 bg-[#005ca8] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 bg-[#005ca8] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Interactive Footer Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask about Worli prices, ROI rules..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#005ca8] focus:bg-white text-slate-800 placeholder-slate-400"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-[#005ca8] hover:bg-[#004b87] text-white rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
