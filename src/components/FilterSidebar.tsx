import React from 'react';
import { Filter, RotateCcw, Star, Check, Tag } from 'lucide-react';
import { CATEGORIES, BRANDS } from '../data/products';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  isDark?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isDark
}) => {
  return (
    <aside
      id="filter-sidebar"
      data-testid="filter-sidebar"
      className={`w-full lg:w-64 p-4 rounded-xl border shadow-sm space-y-6 self-start transition-colors ${
        isDark
          ? 'bg-[#121826] text-white border-purple-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-white text-gray-900 border-gray-200'
      }`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2 font-bold text-base">
          <Filter className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
          <span>Filters</span>
          <span
            id="filter-item-count-badge"
            data-testid="filter-item-count-badge"
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isDark ? 'bg-teal-950 text-teal-300 border border-teal-500/30' : 'bg-blue-50 text-[#0046be]'
            }`}
          >
            {totalResults} items
          </span>
        </div>

        <button
          id="filter-reset-btn"
          onClick={onResetFilters}
          data-testid="filter-reset-btn"
          className={`text-xs flex items-center gap-1 transition-colors font-medium ${
            isDark ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-[#0046be]'
          }`}
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            const catSlug = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            return (
              <button
                key={cat}
                id={`filter-category-${catSlug}`}
                onClick={() => onFilterChange({ category: cat })}
                data-testid={`filter-category-${catSlug}`}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? isDark
                      ? 'bg-teal-950/80 text-teal-300 font-bold border border-teal-500/40'
                      : 'bg-blue-50 text-[#0046be] font-bold'
                    : isDark
                    ? 'text-gray-300 hover:bg-slate-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
          Brand
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const isSelected = filters.brand === brand;
            const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]/g, '-');
            return (
              <button
                key={brand}
                id={`filter-brand-${brandSlug}`}
                onClick={() => onFilterChange({ brand })}
                data-testid={`filter-brand-${brandSlug}`}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? isDark
                      ? 'bg-purple-950/80 text-purple-300 font-bold border border-purple-500/40'
                      : 'bg-blue-50 text-[#0046be] font-bold'
                    : isDark
                    ? 'text-gray-300 hover:bg-slate-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{brand}</span>
                {isSelected && <Check className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-[#0046be]'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Max Price
          </h4>
          <span
            id="filter-price-display-val"
            className={`text-xs font-extrabold font-mono ${isDark ? 'text-teal-300' : 'text-gray-900'}`}
          >
            ${filters.maxPrice}
          </span>
        </div>
        <input
          id="filter-price-slider"
          type="range"
          min="100"
          max="3500"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          data-testid="filter-price-slider"
          className={`w-full cursor-pointer ${isDark ? 'accent-teal-400' : 'accent-[#0046be]'}`}
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
          <span>$100</span>
          <span>$1,500</span>
          <span>$3,500</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Minimum Rating
        </h4>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5, 0].map((rating) => {
            const isSelected = filters.minRating === rating;
            const ratingId = String(rating).replace('.', '_');
            return (
              <button
                key={rating}
                id={`filter-rating-${ratingId}`}
                onClick={() => onFilterChange({ minRating: rating })}
                data-testid={`filter-rating-${rating}`}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 font-bold border border-amber-500/40'
                      : 'bg-yellow-50 text-yellow-900 font-bold border border-yellow-200'
                    : isDark
                    ? 'text-gray-300 hover:bg-slate-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>{rating === 0 ? 'All Ratings' : `${rating}★ & Above`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className={`pt-4 border-t space-y-3 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Deals & Offers
        </h4>

        {/* On Sale */}
        <label className={`flex items-center justify-between text-xs font-medium cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-pink-500" />
            On Sale / Deals Only
          </span>
          <input
            id="filter-onsale-checkbox"
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) => onFilterChange({ onSaleOnly: e.target.checked })}
            data-testid="filter-onsale-toggle"
            className={`w-4 h-4 rounded cursor-pointer ${isDark ? 'accent-pink-500' : 'accent-[#0046be]'}`}
          />
        </label>

        {/* Free Shipping */}
        <label className={`flex items-center justify-between text-xs font-medium cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span>Free Shipping</span>
          <input
            id="filter-freeshipping-checkbox"
            type="checkbox"
            checked={filters.freeShippingOnly}
            onChange={(e) => onFilterChange({ freeShippingOnly: e.target.checked })}
            data-testid="filter-freeshipping-toggle"
            className={`w-4 h-4 rounded cursor-pointer ${isDark ? 'accent-teal-400' : 'accent-[#0046be]'}`}
          />
        </label>

        {/* In Stock */}
        <label className={`flex items-center justify-between text-xs font-medium cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span>In Stock Online</span>
          <input
            id="filter-instock-checkbox"
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            data-testid="filter-instock-toggle"
            className={`w-4 h-4 rounded cursor-pointer ${isDark ? 'accent-teal-400' : 'accent-[#0046be]'}`}
          />
        </label>
      </div>
    </aside>
  );
};

