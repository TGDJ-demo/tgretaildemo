import React from 'react';
import { X, Scale, Trash2, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: Product, includeProtection: boolean) => void;
  isDark?: boolean;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart,
  isDark
}) => {
  if (!isOpen) return null;

  // Extract all unique spec keys across compared items
  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div id="compare-modal-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        id="compare-modal-container"
        data-testid="compare-modal-container"
        className={`rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border my-8 transition-colors ${
          isDark ? 'bg-[#121826] text-white border-purple-900/50' : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Header */}
        <div
          id="compare-modal-header"
          className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between backdrop-blur ${
            isDark ? 'bg-[#121826]/95 border-gray-800' : 'bg-white/95 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Scale className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
            <h3 className="text-lg font-bold">Side-by-Side Product Comparison</h3>
            <span
              id="compare-count-badge"
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isDark ? 'bg-teal-950 text-teal-300 border border-teal-500/30' : 'bg-blue-50 text-[#0046be]'
              }`}
            >
              {compareList.length} / 4 products
            </span>
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                id="clear-all-compare-btn"
                onClick={onClearCompare}
                data-testid="clear-all-compare-btn"
                className="text-xs text-gray-400 hover:text-rose-400 font-medium cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              id="compare-close-btn"
              onClick={onClose}
              data-testid="compare-close-btn"
              className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-6">
          {compareList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className={`p-3 w-48 text-xs font-bold uppercase rounded-l-lg border-b ${
                      isDark ? 'text-gray-400 bg-slate-900/60 border-slate-800' : 'text-gray-400 bg-gray-50 border-gray-200'
                    }`}>
                      Product Overview
                    </th>
                    {compareList.map((product) => (
                      <th
                        key={product.id}
                        className={`p-3 w-64 align-top border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}
                      >
                        <div className="space-y-2 relative">
                          <button
                            id={`remove-compare-${product.id}`}
                            onClick={() => onRemoveFromCompare(product.id)}
                            data-testid={`remove-compare-${product.id}`}
                            className="absolute -top-1 -right-1 text-gray-400 hover:text-rose-500 p-1 cursor-pointer"
                            title="Remove from compare"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className={`h-32 rounded-lg p-2 flex items-center justify-center ${
                            isDark ? 'bg-slate-900' : 'bg-gray-50'
                          }`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <h4 className="text-xs font-bold line-clamp-2">
                            {product.name}
                          </h4>

                          <div className={`text-sm font-black font-mono ${isDark ? 'text-teal-300' : 'text-[#0046be]'}`}>
                            ${product.price.toFixed(2)}
                          </div>

                          <button
                            id={`add-to-cart-compare-${product.id}`}
                            onClick={() => onAddToCart(product, false)}
                            data-testid={`add-to-cart-compare-${product.id}`}
                            className={`w-full text-black text-xs font-extrabold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                              isDark
                                ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-pink-500 hover:brightness-110'
                                : 'bg-[#ffe000] hover:bg-yellow-300'
                            }`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5 text-black" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y text-xs ${
                  isDark ? 'divide-slate-800 text-gray-300' : 'divide-gray-100 text-gray-700'
                }`}>
                  {/* Rating row */}
                  <tr>
                    <td className={`p-3 font-bold ${isDark ? 'text-gray-400 bg-slate-900/40' : 'text-gray-500 bg-gray-50/50'}`}>Customer Rating</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{p.rating}</span>
                          <span className="text-gray-400">({p.reviewCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Brand row */}
                  <tr>
                    <td className={`p-3 font-bold ${isDark ? 'text-gray-400 bg-slate-900/40' : 'text-gray-500 bg-gray-50/50'}`}>Brand</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 font-bold">
                        {p.brand}
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Specs Rows */}
                  {allSpecKeys.map((specKey) => (
                    <tr key={specKey}>
                      <td className={`p-3 font-semibold ${isDark ? 'text-gray-400 bg-slate-900/40' : 'text-gray-500 bg-gray-50/50'}`}>{specKey}</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3 font-medium">
                          {p.specs[specKey as keyof typeof p.specs] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Scale className="w-12 h-12 text-gray-400 mx-auto" />
              <h4 className="font-bold">No products selected for comparison</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Check the "Compare" box on any product card in the catalog to compare specifications side-by-side.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

