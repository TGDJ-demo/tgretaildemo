import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingCart, Truck, Store, Check, Scale, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, includeProtection: boolean) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  isSaved: boolean;
  onToggleSave: (product: Product) => void;
  isDark?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSave,
  isDark
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [includeProtection, setIncludeProtection] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  const gallery = product.galleryImages || [product.image];
  const discount = product.originalPrice - product.price;

  return (
    <div id="product-detail-modal-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        id="product-detail-modal-container"
        data-testid="product-detail-modal-container"
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border my-8 transition-colors ${
          isDark ? 'bg-[#121826] text-white border-purple-900/50' : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Sticky Close Button Header */}
        <div className={`sticky top-0 backdrop-blur z-10 px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'bg-[#121826]/95 border-slate-800' : 'bg-white/95 border-gray-100'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase ${
              isDark ? 'bg-teal-400 text-black' : 'bg-[#0046be] text-white'
            }`}>
              {product.category}
            </span>
            <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            data-testid="modal-close-btn"
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className={`w-full h-80 rounded-xl overflow-hidden p-4 flex items-center justify-center border relative ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-200'
            }`}>
              <img
                id="product-detail-main-img"
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow-sm">
                  SAVE ${discount.toFixed(2)}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  id={`gallery-thumb-btn-${idx}`}
                  data-testid={`gallery-thumb-btn-${idx}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-lg border-2 p-1 flex-shrink-0 overflow-hidden cursor-pointer ${
                    isDark ? 'bg-slate-900' : 'bg-gray-50'
                  } ${
                    selectedImage === img
                      ? isDark ? 'border-teal-400' : 'border-[#0046be]'
                      : 'border-gray-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Fulfillment Capabilities */}
            <div className={`border rounded-xl p-4 space-y-2 text-xs ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-gray-300' : 'bg-blue-50/60 border-blue-100 text-gray-900'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                <Truck className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
                <span>Free Next-Day Shipping Available</span>
              </div>
              <p className="text-gray-400 pl-6">Order within 3 hrs 20 mins to get it delivered tomorrow.</p>

              <div className="flex items-center gap-2 font-bold pt-1">
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Ready for Store Pickup Today</span>
              </div>
              <p className="text-gray-400 pl-6">Available at Minnetonka, MN (Store #521) in 45 minutes.</p>
            </div>
          </div>

          {/* Right Column: Buying Information */}
          <div className="space-y-5">
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? 'text-pink-400' : 'text-[#0046be]'
              }`}>
                {product.brand}
              </div>
              <h1 id="product-detail-title" className="text-xl font-bold leading-snug mb-2">
                {product.name}
              </h1>

              {/* Model / SKU info */}
              <div className="text-xs text-gray-400 font-mono mb-3">
                Model: {product.modelNumber} | SKU: {product.sku}
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-baseline gap-3">
                <span id="product-detail-price" className={`text-3xl font-black font-sans ${isDark ? 'text-teal-300' : 'text-gray-900'}`}>
                  ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <div className="text-xs font-bold text-red-500 mt-1">
                  Save ${discount.toFixed(2)} — Was ${product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            {/* Geek Squad Protection Addon */}
            <div className={`p-4 rounded-xl shadow-sm space-y-2 border ${
              isDark
                ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-purple-800/40 text-white'
                : 'bg-blue-900 text-white border-blue-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-teal-300' : 'text-yellow-400'}`} />
                <span>Geek Squad Complete Protection</span>
              </div>
              <p className="text-xs text-blue-200">
                Covers power surges, drops, spills, hardware failures, and 24/7 technical support with $0 deductible.
              </p>
              <label className="flex items-center gap-2 bg-black/40 p-2.5 rounded-lg border border-white/20 cursor-pointer mt-2 text-xs font-medium">
                <input
                  id="modal-geeksquad-checkbox"
                  type="checkbox"
                  checked={includeProtection}
                  onChange={(e) => setIncludeProtection(e.target.checked)}
                  data-testid="modal-geeksquad-checkbox"
                  className="rounded text-yellow-400 accent-teal-400 cursor-pointer"
                />
                <span className="flex-1">
                  Add 2-Year Geek Squad Plan (+${product.geekSquadProtectionPrice.toFixed(2)})
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  onAddToCart(product, includeProtection);
                  onClose();
                }}
                data-testid="modal-add-to-cart-btn"
                className={`w-full font-extrabold text-base py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-black shadow-[0_0_15px_rgba(0,245,212,0.4)]'
                    : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
                }`}
              >
                <ShoppingCart className="w-5 h-5 text-black" />
                <span>Add to Cart - ${(product.price + (includeProtection ? product.geekSquadProtectionPrice : 0)).toFixed(2)}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <button
                  id="modal-toggle-compare-btn"
                  onClick={() => onToggleCompare(product)}
                  data-testid="modal-toggle-compare-btn"
                  className={`p-2.5 rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isCompared
                      ? isDark ? 'bg-teal-950 border-teal-400 text-teal-300 font-bold' : 'bg-blue-50 border-blue-300 text-[#0046be] font-bold'
                      : isDark ? 'border-slate-800 text-gray-300 hover:bg-slate-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
                </button>

                <button
                  id="modal-toggle-save-btn"
                  onClick={() => onToggleSave(product)}
                  data-testid="modal-toggle-save-btn"
                  className={`p-2.5 rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-rose-950/80 border-rose-500 text-rose-400 font-bold'
                      : isDark ? 'border-slate-800 text-gray-300 hover:bg-slate-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isSaved ? 'Saved Item' : 'Save for Later'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Section (Overview, Specs, Customer Reviews) */}
        <div className={`border-t px-6 py-4 ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'}`}>
          <div className="flex border-b border-gray-700/50 gap-6 text-sm font-bold">
            <button
              id="detail-tab-overview"
              onClick={() => setActiveTab('overview')}
              data-testid="detail-tab-overview"
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? isDark ? 'text-teal-300 border-b-2 border-teal-400' : 'text-[#0046be] border-b-2 border-[#0046be]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Key Features
            </button>
            <button
              id="detail-tab-specs"
              onClick={() => setActiveTab('specs')}
              data-testid="detail-tab-specs"
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? isDark ? 'text-teal-300 border-b-2 border-teal-400' : 'text-[#0046be] border-b-2 border-[#0046be]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Full Specifications
            </button>
            <button
              id="detail-tab-reviews"
              onClick={() => setActiveTab('reviews')}
              data-testid="detail-tab-reviews"
              className={`pb-3 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? isDark ? 'text-teal-300 border-b-2 border-teal-400' : 'text-[#0046be] border-b-2 border-[#0046be]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-4 text-sm">
            {activeTab === 'overview' && (
              <div className="space-y-3">
                <p className="font-medium">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className={`p-3 rounded-lg border flex justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
                  }`}>
                    <span className="font-semibold text-gray-400">{key}</span>
                    <span className="font-bold text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
                }`}>
                  <div>
                    <div className="text-3xl font-black">{product.rating} / 5.0</div>
                    <div className="text-xs text-gray-400">Based on {product.reviewCount} verified buyer reviews</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                      96% of customers recommend this product
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

