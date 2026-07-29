import React from 'react';
import { Star, ShieldCheck, ShoppingCart, Scale, Heart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, includeProtection: boolean) => void;
  onQuickView: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
  highlightTestIDs: boolean;
  isDark?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSave,
  highlightTestIDs,
  isDark
}) => {
  const [includeProtection, setIncludeProtection] = React.useState(false);
  const discountAmount = product.originalPrice - product.price;

  return (
    <div
      id={`product-card-${product.id}`}
      data-testid={`product-card-${product.id}`}
      className={`rounded-xl border p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-200 group relative ${
        isDark
          ? 'bg-[#121826] text-white border-purple-900/40 hover:border-pink-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-white text-gray-900 border-gray-200'
      } ${highlightTestIDs ? 'outline-2 outline-cyan-400 outline-offset-2' : ''}`}
    >
      {/* Top Badges & Actions */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Badge List */}
          <div className="flex flex-wrap gap-1">
            {product.badges.map((badge, idx) => (
              <span
                key={idx}
                id={`badge-${product.id}-${idx}`}
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  badge.includes('Top Deal') || badge.includes('Save')
                    ? 'bg-red-600 text-white'
                    : badge.includes('Member')
                    ? isDark
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#0046be] text-white'
                    : isDark
                    ? 'bg-teal-950 text-teal-300 border border-teal-500/40'
                    : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Save / Bookmark Button */}
          <button
            id={`save-btn-${product.id}`}
            onClick={() => onToggleSave(product)}
            data-testid={`save-btn-${product.id}`}
            className={`p-1.5 rounded-full transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-pink-400 hover:bg-slate-800'
                : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save for later'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <div
          id={`product-image-container-${product.id}`}
          onClick={() => onQuickView(product)}
          className={`relative w-full h-48 mb-3 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center p-2 transition-colors ${
            isDark ? 'bg-[#0a0e17] group-hover:bg-purple-950/20' : 'bg-gray-50 group-hover:bg-blue-50/30'
          }`}
        >
          <img
            id={`product-img-${product.id}`}
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span
              id={`quick-view-badge-${product.id}`}
              className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 ${
                isDark ? 'bg-slate-900 text-teal-300 border border-teal-500/40' : 'bg-white text-gray-900'
              }`}
            >
              <Eye className={`w-3.5 h-3.5 ${isDark ? 'text-pink-400' : 'text-[#0046be]'}`} /> Quick View
            </span>
          </div>
        </div>

        {/* SKU & Model */}
        <div className="text-[11px] text-gray-400 font-mono mb-1">
          <span id={`model-number-${product.id}`}>Model: {product.modelNumber}</span>
          <span className="mx-1 font-bold">|</span>
          <span id={`sku-${product.id}`}>SKU: {product.sku}</span>
        </div>

        {/* Title */}
        <h3
          id={`product-title-${product.id}`}
          onClick={() => onQuickView(product)}
          data-testid={`product-title-${product.id}`}
          className={`text-sm font-bold line-clamp-2 cursor-pointer mb-2 leading-snug transition-colors ${
            isDark ? 'text-white hover:text-teal-300' : 'text-gray-900 hover:text-[#0046be]'
          }`}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3" id={`rating-container-${product.id}`}>
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : isDark
                    ? 'text-gray-700'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className={`text-xs font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price & Savings */}
        <div className="mb-3" id={`price-container-${product.id}`}>
          <div className="flex items-baseline gap-2">
            <span
              id={`product-price-${product.id}`}
              data-testid={`product-price-${product.id}`}
              className={`text-xl font-black font-sans ${isDark ? 'text-teal-300' : 'text-gray-900'}`}
            >
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {discountAmount > 0 && (
              <span id={`product-original-price-${product.id}`} className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          {discountAmount > 0 && (
            <div id={`product-savings-${product.id}`} className="text-xs font-bold text-pink-500 mt-0.5">
              Save ${discountAmount.toFixed(2)}
            </div>
          )}
        </div>

        {/* Geek Squad Warranty Checkbox */}
        <div className={`rounded-lg p-2.5 mb-4 border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-gray-50 border-gray-200'
        }`}>
          <label className="flex items-start gap-2 cursor-pointer text-xs">
            <input
              id={`geeksquad-toggle-${product.id}`}
              type="checkbox"
              checked={includeProtection}
              onChange={(e) => setIncludeProtection(e.target.checked)}
              data-testid={`geeksquad-toggle-${product.id}`}
              className={`mt-0.5 rounded cursor-pointer ${isDark ? 'accent-teal-400' : 'accent-[#0046be]'}`}
            />
            <div className="flex-1 leading-tight">
              <span className={`font-bold flex items-center gap-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
                2-Yr Geek Squad Protection
              </span>
              <span className="text-[11px] text-gray-400 block font-mono mt-0.5">
                +${product.geekSquadProtectionPrice.toFixed(2)} (Accidental Coverage)
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <button
          id={`add-to-cart-btn-${product.id}`}
          onClick={() => onAddToCart(product, includeProtection)}
          data-testid={`add-to-cart-btn-${product.id}`}
          className={`w-full font-extrabold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm ${
            isDark
              ? 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-black shadow-[0_0_12px_rgba(0,245,212,0.4)]'
              : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
          }`}
        >
          <ShoppingCart className="w-4 h-4 text-black" />
          <span>Add to Cart</span>
        </button>

        <div className="flex items-center justify-between text-xs pt-1">
          {/* Compare checkbox */}
          <label className={`flex items-center gap-1.5 cursor-pointer font-medium ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}>
            <input
              id={`compare-checkbox-${product.id}`}
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(product)}
              data-testid={`compare-checkbox-${product.id}`}
              className={`rounded ${isDark ? 'accent-pink-500' : 'accent-[#0046be]'}`}
            />
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-gray-400" /> Compare
            </span>
          </label>

          {/* Fulfillment badge */}
          <span
            id={`fulfillment-badge-${product.id}`}
            className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
              isDark
                ? 'text-teal-300 bg-teal-950/60 border-teal-500/40'
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}
          >
            {product.freeShipping ? 'Free Shipping' : 'Store Pickup'}
          </span>
        </div>
      </div>
    </div>
  );
};

