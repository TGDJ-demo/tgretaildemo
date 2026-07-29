import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag, ArrowRight, Tag, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onToggleProtection: (productId: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
  isDark?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleProtection,
  onProceedToCheckout,
  discountCode,
  discountAmount,
  onApplyCoupon,
  isDark
}) => {
  if (!isOpen) return null;

  const [inputCoupon, setInputCoupon] = useState(discountCode);
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    const warrantyTotal = item.hasProtectionPlan ? item.protectionPrice * item.quantity : 0;
    return acc + itemTotal + warrantyTotal;
  }, 0);

  const appliedDiscount = (subtotal * discountAmount) / 100;
  const estimatedTax = (subtotal - appliedDiscount) * 0.07; // 7% tax rate
  const grandTotal = subtotal - appliedDiscount + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = onApplyCoupon(inputCoupon);
    if (success) {
      setCouponMsg({ type: 'success', text: `Coupon "${inputCoupon.toUpperCase()}" applied!` });
    } else {
      setCouponMsg({ type: 'error', text: 'Invalid coupon code. Try DEMO10 or TESTGRID' });
    }
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div
        id="cart-drawer-panel"
        data-testid="cart-drawer-panel"
        className={`w-full max-w-lg h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-200 ${
          isDark ? 'bg-[#0d111d] text-white border-l border-purple-900/50' : 'bg-white text-gray-900'
        }`}
      >
        {/* Cart Drawer Header */}
        <div
          id="cart-drawer-header"
          className={`p-4 flex items-center justify-between shadow-md ${
            isDark
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border-b border-purple-800/40'
              : 'bg-[#0046be] text-white'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag className={`w-5 h-5 ${isDark ? 'text-teal-300' : 'text-[#ffe000]'}`} />
            <span>Your Shopping Cart</span>
            <span
              id="cart-count-badge"
              data-testid="cart-count-badge"
              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                isDark
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-[0_0_10px_rgba(0,245,212,0.5)]'
                  : 'bg-[#ffe000] text-black'
              }`}
            >
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            id="cart-close-btn"
            onClick={onClose}
            data-testid="cart-close-btn"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-100'}`}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const itemSub = (item.product.price + (item.hasProtectionPlan ? item.protectionPrice : 0)) * item.quantity;

              return (
                <div key={item.product.id} id={`cart-row-${item.product.id}`} className="pt-4 first:pt-0 space-y-3">
                  <div className="flex gap-3">
                    {/* Item Thumbnail */}
                    <div className={`w-20 h-20 rounded-lg border p-1 flex-shrink-0 flex items-center justify-center ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <img
                        id={`cart-item-img-${item.product.id}`}
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 space-y-1">
                      <h4 id={`cart-item-name-${item.product.id}`} className="text-xs font-bold line-clamp-2 leading-snug">
                        {item.product.name}
                      </h4>

                      <div className="text-[10px] text-gray-400 font-mono">
                        SKU: {item.product.sku}
                      </div>

                      <div className={`text-xs font-black ${isDark ? 'text-teal-300' : 'text-gray-900'}`}>
                        ${item.product.price.toFixed(2)} each
                      </div>
                    </div>

                    {/* Remove Item */}
                    <button
                      id={`cart-remove-btn-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      data-testid={`cart-remove-btn-${item.product.id}`}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Protection Plan Toggle */}
                  <div className={`border rounded-lg p-2.5 flex items-center justify-between text-xs ${
                    isDark ? 'bg-purple-950/40 border-purple-800/40' : 'bg-blue-50/70 border-blue-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
                      <div>
                        <span className="font-bold">2-Yr Protection</span>
                        <span className="text-[10px] text-gray-400 block font-mono">
                          +${item.protectionPrice.toFixed(2)} / item
                        </span>
                      </div>
                    </div>

                    <button
                      id={`cart-toggle-protection-${item.product.id}`}
                      onClick={() => onToggleProtection(item.product.id)}
                      data-testid={`cart-toggle-protection-${item.product.id}`}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                        item.hasProtectionPlan
                          ? isDark
                            ? 'bg-teal-400 text-black border-teal-400 font-black'
                            : 'bg-[#0046be] text-white border-[#0046be]'
                          : isDark
                          ? 'bg-slate-900 text-gray-300 border-slate-700 hover:bg-slate-800'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {item.hasProtectionPlan ? 'Covered ✓' : 'Add Coverage'}
                    </button>
                  </div>

                  {/* Quantity Counter & Subtotal */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className={`flex items-center border rounded-lg overflow-hidden ${
                      isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
                    }`}>
                      <button
                        id={`cart-minus-qty-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        data-testid={`cart-minus-qty-${item.product.id}`}
                        className="p-1.5 hover:bg-slate-800 text-gray-300 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span
                        id={`cart-qty-${item.product.id}`}
                        data-testid={`cart-qty-${item.product.id}`}
                        className="px-3 font-bold"
                      >
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-plus-qty-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        data-testid={`cart-plus-qty-${item.product.id}`}
                        className="p-1.5 hover:bg-slate-800 text-gray-300 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400">Total: </span>
                      <span
                        id={`cart-item-total-${item.product.id}`}
                        data-testid={`cart-item-total-${item.product.id}`}
                        className={`text-sm font-black font-mono ${isDark ? 'text-teal-300' : 'text-gray-900'}`}
                      >
                        ${itemSub.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                isDark ? 'bg-purple-950 text-teal-300' : 'bg-blue-50 text-[#0046be]'
              }`}>
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base">Your cart is currently empty</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our tech deals, 4K TVs, and laptops to add demo items.
              </p>
            </div>
          )}
        </div>

        {/* Cart Drawer Footer & Summary */}
        {cartItems.length > 0 && (
          <div className={`p-4 border-t space-y-3 ${isDark ? 'bg-[#121826] border-purple-900/50' : 'bg-gray-50 border-gray-200'}`}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="cart-promo-input"
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Promo Code (DEMO10 or TESTGRID)"
                  data-testid="cart-promo-input"
                  className={`w-full border rounded-lg py-1.5 px-3 text-xs uppercase font-mono font-bold focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-purple-800/50 text-white focus:ring-2 focus:ring-teal-400'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                  }`}
                />
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5" />
              </div>
              <button
                id="cart-apply-promo-btn"
                type="submit"
                data-testid="cart-apply-promo-btn"
                className={`font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90'
                    : 'bg-blue-900 hover:bg-blue-950 text-white'
                }`}
              >
                Apply
              </button>
            </form>

            {couponMsg && (
              <div
                id="coupon-message"
                className={`text-[11px] font-bold flex items-center gap-1 ${
                  couponMsg.type === 'success' ? 'text-teal-400' : 'text-pink-500'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{couponMsg.text}</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className={`space-y-1.5 text-xs pt-2 border-t ${
              isDark ? 'text-gray-300 border-gray-800' : 'text-gray-600 border-gray-200'
            }`}>
              <div className="flex justify-between">
                <span>Items & Warranties Subtotal</span>
                <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className={`flex justify-between font-bold ${isDark ? 'text-teal-300' : 'text-emerald-600'}`}>
                  <span>Promo Discount ({discountAmount}%)</span>
                  <span className="font-mono">-${appliedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Sales Tax (7%)</span>
                <span className="font-mono font-medium">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping & Store Pickup</span>
                <span className={`font-bold ${isDark ? 'text-teal-300' : 'text-emerald-600'}`}>FREE</span>
              </div>

              <div className={`flex justify-between text-base font-black pt-2 border-t ${
                isDark ? 'border-gray-800 text-white' : 'border-gray-300 text-gray-900'
              }`}>
                <span>Estimated Total</span>
                <span
                  id="cart-grand-total"
                  data-testid="cart-grand-total"
                  className={`font-mono ${isDark ? 'text-teal-300' : 'text-[#0046be]'}`}
                >
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-btn"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              data-testid="cart-checkout-btn"
              className={`w-full font-extrabold text-base py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-pink-500 text-black shadow-[0_0_15px_rgba(0,245,212,0.5)]'
                  : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
              }`}
            >
              <span>Proceed to Mock Checkout</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

