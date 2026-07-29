import React from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onAddToCart: (product: Product, includeProtection: boolean) => void;
  onQuickView: (product: Product) => void;
  compareList: Product[];
  onToggleCompare: (product: Product) => void;
  savedList: Product[];
  onToggleSave: (product: Product) => void;
  highlightTestIDs: boolean;
  isDark?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filters,
  onFilterChange,
  onAddToCart,
  onQuickView,
  compareList,
  onToggleCompare,
  savedList,
  onToggleSave,
  highlightTestIDs,
  isDark
}) => {
  const activeChips: { label: string; key: keyof FilterState; defaultValue: any }[] = [];

  if (filters.category !== 'All Categories') {
    activeChips.push({ label: `Category: ${filters.category}`, key: 'category', defaultValue: 'All Categories' });
  }
  if (filters.brand !== 'All Brands') {
    activeChips.push({ label: `Brand: ${filters.brand}`, key: 'brand', defaultValue: 'All Brands' });
  }
  if (filters.maxPrice < 3500) {
    activeChips.push({ label: `Under $${filters.maxPrice}`, key: 'maxPrice', defaultValue: 3500 });
  }
  if (filters.minRating > 0) {
    activeChips.push({ label: `${filters.minRating}★ & Up`, key: 'minRating', defaultValue: 0 });
  }
  if (filters.onSaleOnly) {
    activeChips.push({ label: 'On Sale Only', key: 'onSaleOnly', defaultValue: false });
  }
  if (filters.searchQuery) {
    activeChips.push({ label: `Search: "${filters.searchQuery}"`, key: 'searchQuery', defaultValue: '' });
  }

  return (
    <div id="product-grid-container" className="flex-1 space-y-4">
      {/* Grid Top Toolbar (Active Filters & Sort) */}
      <div
        id="product-grid-toolbar"
        className={`p-4 rounded-xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-colors ${
          isDark
            ? 'bg-[#121826] text-white border-purple-900/40'
            : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span id="catalog-heading">Product Catalog</span>
            <span id="catalog-count-badge" className={`text-xs font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              ({products.length} {products.length === 1 ? 'item' : 'items'} found)
            </span>
          </h2>

          {/* Active Filter Chips */}
          {activeChips.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-2">
              <span className="text-xs text-gray-400 font-medium">Active Filters:</span>
              {activeChips.map((chip, idx) => (
                <span
                  key={idx}
                  id={`filter-chip-${idx}`}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                    isDark
                      ? 'bg-purple-950 text-pink-300 border-purple-500/40'
                      : 'bg-blue-50 text-[#0046be] border-blue-200'
                  }`}
                >
                  {chip.label}
                  <button
                    id={`remove-chip-btn-${idx}`}
                    onClick={() => onFilterChange({ [chip.key]: chip.defaultValue })}
                    className="hover:text-red-500 ml-0.5 cursor-pointer"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <label className={`text-xs font-bold flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
            <SlidersHorizontal className={`w-3.5 h-3.5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
            Sort By:
          </label>
          <select
            id="sort-by-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            data-testid="sort-by-select"
            className={`text-xs rounded-lg p-2 font-medium focus:outline-none cursor-pointer border ${
              isDark
                ? 'bg-slate-900 border-purple-900/50 text-white focus:ring-2 focus:ring-teal-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
            }`}
          >
            <option value="featured">Featured Deals</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Savings</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {products.length > 0 ? (
        <div id="product-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isCompared={compareList.some((p) => p.id === product.id)}
              onToggleCompare={onToggleCompare}
              isSaved={savedList.some((p) => p.id === product.id)}
              onToggleSave={onToggleSave}
              highlightTestIDs={highlightTestIDs}
              isDark={isDark}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="no-products-found-card"
          className={`rounded-xl border p-12 text-center space-y-4 my-8 ${
            isDark ? 'bg-[#121826] border-purple-900/40 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
            isDark ? 'bg-purple-950 text-teal-300' : 'bg-blue-50 text-[#0046be]'
          }`}>
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold">No matching products found</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Try adjusting your search keywords, price limits, or clearing active filters to see more Best Buy items.
          </p>
          <button
            id="clear-all-filters-btn"
            data-testid="clear-all-filters-btn"
            onClick={() =>
              onFilterChange({
                category: 'All Categories',
                brand: 'All Brands',
                maxPrice: 3500,
                minRating: 0,
                onSaleOnly: false,
                searchQuery: ''
              })
            }
            className={`font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm ${
              isDark
                ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-extrabold hover:from-teal-300 hover:to-cyan-400'
                : 'bg-[#0046be] hover:bg-blue-700 text-white'
            }`}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

