import React from 'react';
import { X, PackageCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
  isDark?: boolean;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  isDark
}) => {
  if (!isOpen) return null;

  const currentOrder = recentOrders[0];

  return (
    <div id="order-tracking-modal-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        id="order-tracking-modal-container"
        data-testid="order-tracking-modal-container"
        className={`rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border my-8 transition-colors ${
          isDark ? 'bg-[#121826] text-white border-purple-900/50' : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Header */}
        <div
          id="order-tracking-header"
          className={`px-6 py-4 flex items-center justify-between ${
            isDark
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border-b border-purple-800/40'
              : 'bg-[#0046be] text-white'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-lg">
            <PackageCheck className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-[#ffe000]'}`} />
            <span>Order Tracker & Status</span>
          </div>

          <button
            id="tracking-close-btn"
            onClick={onClose}
            data-testid="tracking-close-btn"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {currentOrder ? (
            <div className="space-y-6">
              {/* Order Meta Header */}
              <div className={`border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                <div>
                  <div className="text-gray-400 uppercase font-mono">Order Number</div>
                  <div id="tracked-order-id" className={`text-base font-black font-mono ${isDark ? 'text-teal-300' : 'text-gray-900'}`}>
                    {currentOrder.orderId}
                  </div>
                  <div className="text-gray-400">Placed on {currentOrder.date}</div>
                </div>

                <div className="text-right">
                  <div className="text-gray-400 uppercase font-mono">Est. Delivery</div>
                  <div className="text-sm font-bold text-emerald-400">{currentOrder.estimatedDelivery}</div>
                  <div className="text-gray-400 font-mono text-[11px]">Carrier: UPS Next Day Air</div>
                </div>
              </div>

              {/* Delivery Progress Bar Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipment Timeline</h4>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="space-y-1">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm font-bold text-xs">
                      ✓
                    </div>
                    <div className="font-bold text-emerald-400">Placed</div>
                    <div className="text-[10px] text-gray-400">Order Confirmed</div>
                  </div>

                  <div className="space-y-1">
                    <div className={`w-8 h-8 text-black font-extrabold rounded-full flex items-center justify-center mx-auto shadow-sm text-xs animate-pulse ${
                      isDark ? 'bg-teal-400' : 'bg-[#0046be] text-white'
                    }`}>
                      2
                    </div>
                    <div className={`font-bold ${isDark ? 'text-teal-300' : 'text-[#0046be]'}`}>Preparing</div>
                    <div className="text-[10px] text-gray-400">At Minnetonka Hub</div>
                  </div>

                  <div className="space-y-1 opacity-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold text-xs ${
                      isDark ? 'bg-slate-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                    }`}>
                      3
                    </div>
                    <div className="font-bold text-gray-400">Shipped</div>
                    <div className="text-[10px] text-gray-400">Out for Delivery</div>
                  </div>

                  <div className="space-y-1 opacity-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold text-xs ${
                      isDark ? 'bg-slate-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                    }`}>
                      4
                    </div>
                    <div className="font-bold text-gray-400">Delivered</div>
                    <div className="text-[10px] text-gray-400">Front Door</div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className={`border rounded-xl overflow-hidden divide-y text-xs ${
                isDark ? 'border-slate-800 divide-slate-800' : 'border-gray-200 divide-gray-100'
              }`}>
                <div className={`px-4 py-2 font-bold ${isDark ? 'bg-slate-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                  Items in this Package
                </div>
                {currentOrder.items.map((item) => (
                  <div key={item.product.id} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt="Item" referrerPolicy="no-referrer" className="w-10 h-10 object-contain" />
                      <div>
                        <div className="font-bold">{item.product.name}</div>
                        <div className="text-gray-400 text-[10px]">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className={`font-mono font-bold ${isDark ? 'text-teal-300' : 'text-gray-900'}`}>
                      ${((item.product.price + (item.hasProtectionPlan ? item.protectionPrice : 0)) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <PackageCheck className="w-12 h-12 text-gray-400 mx-auto" />
              <h4 className="font-bold">No recent demo orders found</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Place an order using the mock checkout to see live order tracking and shipping simulation here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

