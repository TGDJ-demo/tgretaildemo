import React from 'react';
import { Flame, Clock, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

interface DealsBannerProps {
  isDark?: boolean;
}

export const DealsBanner: React.FC<DealsBannerProps> = ({ onOpenPromptStudio, isDark }) => {
  return (
    <div
      id="deals-banner-container"
      data-testid="deals-banner-container"
      className={`py-3 px-4 shadow-inner transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border-b border-purple-900/50'
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-[#0046be] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Deal of the Day Highlight */}
        <div className="flex items-center gap-3">
          <div
            id="deals-badge-top-tech"
            data-testid="deals-badge-top-tech"
            className={`p-2 rounded-lg font-black flex items-center gap-1.5 shadow-sm text-xs uppercase tracking-tight ${
              isDark
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_12px_rgba(255,0,127,0.5)]'
                : 'bg-[#ffe000] text-black'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Top Tech Deals</span>
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-2">
              <span id="deals-banner-headline">Save up to $600 on 4K OLED TVs, MacBooks & Gaming Laptops</span>
              <span
                id="deals-banner-timer"
                data-testid="deals-banner-timer"
                className={`hidden lg:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-mono ${
                  isDark
                    ? 'text-teal-300 bg-slate-950/80 border-teal-500/30'
                    : 'text-yellow-300 bg-blue-950/60 border-yellow-500/20'
                }`}
              >
                <Clock className="w-3 h-3" /> Ends in 08h 24m 12s
              </span>
            </div>
            <p className="text-xs text-blue-200 opacity-90">
              Free Store Pickup in as little as 45 minutes & Free Next-Day Shipping on orders $35+
            </p>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="flex items-center gap-4 text-xs font-medium text-blue-100 flex-wrap justify-center">
          <div id="badge-geek-squad" className="flex items-center gap-1.5">
            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-yellow-400'}`} />
            <span>Geek Squad Warranty</span>
          </div>
          <div id="badge-next-day-delivery" className="flex items-center gap-1.5">
            <Truck className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-yellow-400'}`} />
            <span>Free Next-Day Delivery</span>
          </div>
          <div id="badge-[#returns" className="flex items-center gap-1.5">
            <RotateCcw className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-yellow-400'}`} />
            <span>15-Day Free Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

