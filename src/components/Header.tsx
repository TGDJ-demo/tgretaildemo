import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  MapPin,
  Sparkles,
  Scale,
  Menu,
  ChevronDown,
  PackageCheck,
  Tag,
  Code,
  Palette,
  Check
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ThemeMode } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  cartCount: number;
  savedCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenOrderTracking: () => void;
  onOpenPromptStudio: () => void;
  highlightTestIDs: boolean;
  onToggleHighlightTestIDs: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  cartCount,
  savedCount,
  compareCount,
  onOpenCart,
  onOpenCompare,
  onOpenOrderTracking,
  onOpenPromptStudio,
  theme,
  onThemeChange
}) => {
  const [storeLocation] = useState('Minnetonka, MN (Store #521)');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const isDark = theme === 'cyber-dark';

  return (
    <header
      id="main-app-header"
      data-testid="main-app-header"
      className={`w-full shadow-md sticky top-0 z-40 transition-colors ${
        isDark
          ? 'bg-[#0d111d] text-white border-b border-cyan-500/30'
          : 'bg-[#0046be] text-white'
      }`}
    >
      {/* Top Utility Announcement Bar */}
      <div
        id="header-announcement-bar"
        data-testid="header-announcement-bar"
        className={`text-xs py-1.5 px-4 text-gray-200 border-b transition-colors ${
          isDark ? 'bg-[#060911] border-cyan-900/40' : 'bg-[#040c1e] border-blue-900/40'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span
              id="header-demo-mode-badge"
              data-testid="header-demo-mode-badge"
              className={`inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded border text-xs ${
                isDark
                  ? 'bg-purple-950/80 text-cyan-300 border-teal-500/40'
                  : 'bg-blue-950/80 text-[#ffe000] border-yellow-500/30'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-teal-400' : 'text-[#ffe000]'}`} />
              Demo Platform Mode
            </span>
            <span className="hidden md:inline text-gray-300">
              Mock Payment Gateway active — Safe for Prospect Demos & Automated QA Tests
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                id="header-theme-selector-btn"
                data-testid="header-theme-selector-btn"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all border ${
                  isDark
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400/50 hover:brightness-110 shadow-[0_0_12px_rgba(255,0,127,0.4)]'
                    : 'bg-blue-800/80 hover:bg-blue-700 text-[#fff200] border-yellow-400/40'
                }`}
                title="Switch UI Theme Mode"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Theme: {isDark ? 'Cyber Dark' : 'Classic Blue'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isThemeMenuOpen && (
                <div
                  id="theme-menu-dropdown"
                  data-testid="theme-menu-dropdown"
                  className={`absolute right-0 top-full mt-1.5 w-64 rounded-xl shadow-2xl border p-2 z-50 transition-all ${
                    isDark
                      ? 'bg-[#121826] text-white border-purple-500/40 shadow-[0_0_20px_rgba(123,44,191,0.5)]'
                      : 'bg-white text-gray-900 border-gray-200'
                  }`}
                >
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-700/40 mb-1">
                    Select Design Theme
                  </div>

                  <button
                    id="theme-opt-classic"
                    data-testid="theme-opt-classic"
                    onClick={() => {
                      onThemeChange('classic');
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                      theme === 'classic'
                        ? 'bg-blue-600 text-white'
                        : isDark
                        ? 'hover:bg-slate-800 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#0046be] border border-yellow-400 flex items-center justify-center text-[9px] font-black text-yellow-300">
                        B
                      </div>
                      <div>
                        <div>Classic Polish (Demo Buy)</div>
                        <div className="text-[10px] opacity-75 font-normal">Blue & Yellow Store Standard</div>
                      </div>
                    </div>
                    {theme === 'classic' && <Check className="w-4 h-4 text-yellow-300" />}
                  </button>

                  <button
                    id="theme-opt-cyber-dark"
                    data-testid="theme-opt-cyber-dark"
                    onClick={() => {
                      onThemeChange('cyber-dark');
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-colors mt-1 ${
                      theme === 'cyber-dark'
                        ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white shadow-md'
                        : isDark
                        ? 'hover:bg-slate-800 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#0d111d] border border-pink-500 flex items-center justify-center text-[9px] font-bold text-teal-300">
                        ⚡
                      </div>
                      <div>
                        <div className="text-pink-300 font-extrabold">Cyber Dark (Teal/Pink/Purple)</div>
                        <div className="text-[10px] opacity-75 font-normal text-cyan-200">Dark Mode with Vibrant Neon Accents</div>
                      </div>
                    </div>
                    {theme === 'cyber-dark' && <Check className="w-4 h-4 text-teal-300" />}
                  </button>
                </div>
              )}
            </div>

            <span className="text-gray-600">|</span>

            <button
              id="header-prompt-studio-btn"
              data-testid="header-prompt-studio-btn"
              onClick={onOpenPromptStudio}
              className={`flex items-center gap-1.5 font-bold hover:underline ${
                isDark ? 'text-pink-400' : 'text-[#ffe000]'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              AI Prompt Studio
            </button>
            <span className="text-gray-600">|</span>
            <button
              id="header-track-order-btn"
              data-testid="header-track-order-btn"
              onClick={onOpenOrderTracking}
              className={`flex items-center gap-1 transition-colors ${
                isDark ? 'hover:text-teal-300 text-cyan-300' : 'hover:text-yellow-300'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              Track Recent Order
            </button>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-gray-300">
              <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-pink-400' : 'text-yellow-400'}`} />
              <span id="header-store-location">{storeLocation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Category Selector */}
          <div className="flex items-center gap-4">
            <a
              id="header-Demobuy-logo"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect('All Categories');
                onSearchChange('');
              }}
              data-testid="Demobuy-logo"
              className="flex items-center gap-1 group"
            >
              <div
                className={`font-black px-2.5 py-1 text-2xl tracking-tighter uppercase rounded-sm shadow-sm group-hover:scale-105 transition-transform ${
                  isDark
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-black shadow-[0_0_15px_rgba(255,0,127,0.5)]'
                    : 'bg-[#fff200] text-[#0046be]'
                }`}
              >
                {isDark ? 'TESTGRID' : 'Demo BUY'}
              </div>
              <div className={`hidden lg:flex flex-col text-[10px] uppercase font-bold leading-none tracking-widest pl-1 ${
                isDark ? 'text-teal-300' : 'text-yellow-300'
              }`}>
                <span>DEMO</span>
                <span>STORE</span>
              </div>
            </a>

            {/* Category Dropdown Toggle */}
            <div className="relative hidden md:block">
              <button
                id="header-category-menu-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                data-testid="header-category-menu-btn"
                className={`flex items-center gap-2 font-medium text-sm px-3 py-2 rounded-md transition-colors border ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-200 border-teal-500/30'
                    : 'bg-blue-700/60 hover:bg-blue-700 text-white border-blue-400/30'
                }`}
              >
                <Menu className="w-4 h-4" />
                <span>Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div
                  id="category-dropdown-menu"
                  data-testid="category-dropdown-menu"
                  className={`absolute left-0 top-full mt-2 w-64 rounded-lg shadow-2xl border py-2 z-50 ${
                    isDark
                      ? 'bg-[#121826] text-white border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                      : 'bg-white text-gray-900 border-gray-200'
                  }`}
                >
                  <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800">
                    Departments
                  </div>
                  {CATEGORIES.map((cat) => {
                    const catSlug = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
                    return (
                      <button
                        key={cat}
                        id={`category-nav-${catSlug}`}
                        data-testid={`category-option-${catSlug}`}
                        onClick={() => {
                          onCategorySelect(cat);
                          setIsCategoryMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between font-medium transition-colors ${
                          selectedCategory === cat
                            ? isDark
                              ? 'bg-teal-950/60 text-teal-300 font-bold border-l-4 border-teal-400'
                              : 'bg-blue-50 text-[#0046be] font-bold'
                            : isDark
                            ? 'hover:bg-slate-800 text-gray-300'
                            : 'hover:bg-blue-50 hover:text-[#0046be]'
                        }`}
                      >
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                id="header-search-input"
                data-testid="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search TVs, Laptops, Headphones, PS5..."
                className={`w-full rounded-md py-2.5 pl-4 pr-12 text-sm focus:outline-none font-medium shadow-inner transition-all ${
                  isDark
                    ? 'bg-[#182032] text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 border border-slate-700'
                    : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400'
                }`}
              />
              <button
                id="header-search-submit-btn"
                data-testid="header-search-submit-btn"
                type="button"
                className={`absolute right-1 p-2 rounded-md transition-colors ${
                  isDark ? 'text-teal-400 hover:bg-slate-800' : 'text-[#0046be] hover:bg-gray-100'
                }`}
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions Bar (Compare, Saved, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Compare Drawer Toggle */}
            <button
              id="header-compare-btn"
              data-testid="header-compare-btn"
              onClick={onOpenCompare}
              className={`relative p-2 rounded-md transition-colors flex flex-col items-center text-xs ${
                isDark ? 'hover:bg-slate-800 text-cyan-200' : 'hover:bg-blue-700/60 text-white'
              }`}
              title="Compare Products"
            >
              <div className="relative">
                <Scale className="w-5 h-5" />
                {compareCount > 0 && (
                  <span
                    id="header-compare-badge-count"
                    data-testid="compare-badge-count"
                    className={`absolute -top-1.5 -right-2 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-pink-500 text-white' : 'bg-[#ffe000] text-black'
                    }`}
                  >
                    {compareCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[11px] mt-0.5 font-medium">Compare</span>
            </button>

            {/* Saved Items */}
            <div
              id="header-saved-indicator"
              data-testid="header-saved-indicator"
              className="relative p-2 text-white flex flex-col items-center text-xs opacity-80 cursor-default"
            >
              <div className="relative">
                <Heart className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-white'}`} />
                {savedCount > 0 && (
                  <span
                    id="header-saved-badge-count"
                    data-testid="saved-badge-count"
                    className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {savedCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[11px] mt-0.5 font-medium">Saved</span>
            </div>

            {/* Cart Drawer Toggle */}
            <button
              id="header-cart-btn"
              data-testid="header-cart-btn"
              onClick={onOpenCart}
              className={`relative flex items-center gap-2 font-extrabold px-3.5 py-2 rounded-md transition-all shadow-md active:scale-95 ${
                isDark
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-black shadow-[0_0_15px_rgba(0,245,212,0.4)]'
                  : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
              }`}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-black" />
                {cartCount > 0 && (
                  <span
                    id="cart-badge-count"
                    data-testid="cart-badge-count"
                    className={`absolute -top-2 -right-2.5 text-[11px] font-black px-1.5 py-0.2 rounded-full border ${
                      isDark ? 'bg-pink-600 text-white border-pink-300' : 'bg-blue-700 text-white border-white'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-sm">Cart</span>
            </button>
          </div>
        </div>

        {/* Secondary Quick Categories Bar */}
        <div
          id="header-quick-categories-bar"
          data-testid="header-quick-categories-bar"
          className={`mt-2.5 pt-2 border-t flex items-center gap-4 overflow-x-auto text-xs font-semibold whitespace-nowrap scrollbar-none ${
            isDark ? 'border-slate-800' : 'border-blue-500/30'
          }`}
        >
          <span className={`flex items-center gap-1 font-bold ${isDark ? 'text-pink-400' : 'text-yellow-300'}`}>
            <Tag className="w-3.5 h-3.5" /> Quick Filter:
          </span>
          {CATEGORIES.map((cat) => {
            const catSlug = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            return (
              <button
                key={cat}
                id={`quick-filter-${catSlug}`}
                data-testid={`quick-filter-${catSlug}`}
                onClick={() => onCategorySelect(cat)}
                className={`py-1 px-2.5 rounded-full transition-all ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold shadow-[0_0_10px_rgba(255,0,127,0.5)]'
                      : 'bg-[#ffe000] text-black font-extrabold'
                    : isDark
                    ? 'text-cyan-200 hover:bg-slate-800 hover:text-white'
                    : 'text-blue-100 hover:bg-blue-700/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

