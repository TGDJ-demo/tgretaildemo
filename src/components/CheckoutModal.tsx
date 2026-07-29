import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Truck,
  Store,
  Copy,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { CartItem, ShippingDetails, PaymentDetails, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onOrderCompleted: (order: Order) => void;
  simulatedLatency: number; // in ms
  isDark?: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onOrderCompleted,
  simulatedLatency,
  isDark
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: 'Jane Prospect',
    email: 'jane.prospect@demo-corp.com',
    phone: '(555) 234-5678',
    address: '1000 Best Buy Way',
    city: 'Minnetonka',
    state: 'MN',
    zipCode: '55343',
    fulfillmentType: 'shipping',
    storeLocation: 'Minnetonka, MN (Store #521)'
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '4111 2222 3333 4444',
    cardHolder: 'JANE PROSPECT',
    expiryDate: '12/28',
    cvv: '123',
    paymentType: 'credit_card',
    saveCardForFuture: false
  });

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'approved' | 'declined' | 'network_error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const itemTotal = item.product.price * item.quantity;
    const warrantyTotal = item.hasProtectionPlan ? item.protectionPrice * item.quantity : 0;
    return acc + itemTotal + warrantyTotal;
  }, 0);

  const appliedDiscount = (subtotal * discountAmount) / 100;
  const estimatedTax = (subtotal - appliedDiscount) * 0.07;
  const grandTotal = subtotal - appliedDiscount + estimatedTax;

  // Pre-fill Test Cards for QA & Sales Demo
  const fillApprovedCard = () => {
    setPayment({
      cardNumber: '4000 1234 5678 9010',
      cardHolder: 'APPROVED TEST CARD',
      expiryDate: '08/29',
      cvv: '888',
      paymentType: 'credit_card',
      saveCardForFuture: false
    });
    setErrorMessage(null);
  };

  const fillDeclinedCard = () => {
    setPayment({
      cardNumber: '4000 0000 0000 0002',
      cardHolder: 'DECLINED TEST CARD',
      expiryDate: '01/22',
      cvv: '000',
      paymentType: 'credit_card',
      saveCardForFuture: false
    });
    setErrorMessage(null);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    setPaymentStatus('processing');
    setErrorMessage(null);

    const totalDelay = Math.max(1200, simulatedLatency);

    setTimeout(() => {
      // Logic: if card ends in '0002', simulate declined payment
      if (payment.cardNumber.replaceAll(' ', '').endsWith('0002')) {
        setPaymentStatus('declined');
        setErrorMessage('Payment Declined: Invalid card expiry or insufficient demo funds. Try Approved Card button.');
        setStep(2);
      } else if (payment.cardNumber.replaceAll(' ', '').endsWith('9999')) {
        setPaymentStatus('network_error');
        setErrorMessage('Gateway Error 504: Connection timeout from Mock Payment Processor. Retrying recommended.');
        setStep(2);
      } else {
        // Success
        setPaymentStatus('approved');
        const orderId = `BBY-2026-${Math.floor(100000 + Math.random() * 900000)}`;
        const trackingNum = `1Z99999999${Math.floor(10000000 + Math.random() * 90000000)}`;

        const newOrder: Order = {
          orderId,
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          items: cartItems,
          shipping,
          payment: {
            paymentType: payment.paymentType,
            lastFourDigits: payment.cardNumber.slice(-4) || '4444'
          },
          subtotal,
          tax: estimatedTax,
          shippingFee: 0,
          discount: appliedDiscount,
          total: grandTotal,
          status: 'Order Placed',
          trackingNumber: trackingNum,
          estimatedDelivery: 'Tomorrow by 8:00 PM'
        };

        setCompletedOrder(newOrder);
        onOrderCompleted(newOrder);
        setStep(4);
      }
    }, totalDelay);
  };

  const copyReceiptJson = () => {
    if (!completedOrder) return;
    navigator.clipboard.writeText(JSON.stringify(completedOrder, null, 2));
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div
        id="checkout-modal-container"
        data-testid="checkout-modal-container"
        className={`rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden relative border my-8 transition-colors ${
          isDark ? 'bg-[#121826] text-white border-purple-900/50' : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Header */}
        <div
          id="checkout-modal-header"
          className={`px-6 py-4 flex items-center justify-between ${
            isDark
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white border-b border-purple-800/40'
              : 'bg-[#0046be] text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              id="checkout-brand-badge"
              className={`text-xs font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                isDark ? 'bg-teal-400 text-black font-black' : 'bg-[#ffe000] text-black'
              }`}
            >
              BEST BUY
            </div>
            <span className="font-bold text-base">Checkout (Mock Payment Gateway)</span>
          </div>

          <button
            id="checkout-close-btn"
            onClick={onClose}
            data-testid="checkout-close-btn"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Progress Stepper */}
        <div className={`border-b px-6 py-3 flex items-center justify-between text-xs font-bold ${
          isDark ? 'bg-[#0d111d] border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
        }`}>
          <div className={`flex items-center gap-1.5 ${step >= 1 ? (isDark ? 'text-teal-300' : 'text-[#0046be]') : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 1 ? (isDark ? 'bg-teal-400 text-black font-black' : 'bg-[#0046be] text-white') : (isDark ? 'bg-slate-800' : 'bg-gray-200')
            }`}>1</span>
            <span>Shipping</span>
          </div>
          <div className={`h-0.5 w-8 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? (isDark ? 'text-teal-300' : 'text-[#0046be]') : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 2 ? (isDark ? 'bg-teal-400 text-black font-black' : 'bg-[#0046be] text-white') : (isDark ? 'bg-slate-800' : 'bg-gray-200')
            }`}>2</span>
            <span>Dummy Payment</span>
          </div>
          <div className={`h-0.5 w-8 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-pink-400' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 4 ? 'bg-pink-500 text-white' : (isDark ? 'bg-slate-800' : 'bg-gray-200')
            }`}>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* STEP 1: Shipping / Fulfillment */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Step 1: Fulfillment & Shipping Address
              </h3>

              {/* Fulfillment Type Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="fulfillment-shipping-btn"
                  type="button"
                  onClick={() => setShipping({ ...shipping, fulfillmentType: 'shipping' })}
                  data-testid="fulfillment-shipping-btn"
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                    shipping.fulfillmentType === 'shipping'
                      ? isDark
                        ? 'border-teal-400 bg-teal-950/40 text-teal-300 font-bold'
                        : 'border-[#0046be] bg-blue-50/60 text-[#0046be] font-bold'
                      : isDark
                      ? 'border-slate-800 hover:bg-slate-800 text-gray-300'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Truck className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
                  <div>
                    <div className="text-xs">Free Delivery</div>
                    <div className="text-[10px] text-gray-400 font-normal">Arrives Tomorrow</div>
                  </div>
                </button>

                <button
                  id="fulfillment-pickup-btn"
                  type="button"
                  onClick={() => setShipping({ ...shipping, fulfillmentType: 'store_pickup' })}
                  data-testid="fulfillment-pickup-btn"
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                    shipping.fulfillmentType === 'store_pickup'
                      ? isDark
                        ? 'border-teal-400 bg-teal-950/40 text-teal-300 font-bold'
                        : 'border-[#0046be] bg-blue-50/60 text-[#0046be] font-bold'
                      : isDark
                      ? 'border-slate-800 hover:bg-slate-800 text-gray-300'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Store className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="text-xs">Store Pickup</div>
                    <div className="text-[10px] text-gray-400 font-normal">Ready in 45 Mins</div>
                  </div>
                </button>
              </div>

              {/* Address Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Full Name</label>
                  <input
                    id="shipping-fullname-input"
                    type="text"
                    value={shipping.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    data-testid="shipping-fullname-input"
                    className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Email Address</label>
                  <input
                    id="shipping-email-input"
                    type="email"
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    data-testid="shipping-email-input"
                    className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-400 block mb-1">Street Address</label>
                  <input
                    id="shipping-address-input"
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    data-testid="shipping-address-input"
                    className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">City</label>
                  <input
                    id="shipping-city-input"
                    type="text"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    data-testid="shipping-city-input"
                    className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">State</label>
                    <input
                      id="shipping-state-input"
                      type="text"
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      data-testid="shipping-state-input"
                      className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Zip Code</label>
                    <input
                      id="shipping-zip-input"
                      type="text"
                      value={shipping.zipCode}
                      onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                      data-testid="shipping-zip-input"
                      className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="shipping-next-btn"
                  type="button"
                  onClick={() => setStep(2)}
                  data-testid="shipping-next-btn"
                  className={`font-bold text-sm py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-sm cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-extrabold hover:from-teal-300 hover:to-cyan-400'
                      : 'bg-[#0046be] hover:bg-blue-700 text-white'
                  }`}
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dummy Payment Gateway */}
          {step === 2 && (
            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Step 2: Dummy Payment Gateway
                </h3>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  Demo Mode — No real charge
                </span>
              </div>

              {/* Demo Test Card Quick-Inject Helper */}
              <div className={`rounded-xl p-3 space-y-2 border ${
                isDark ? 'bg-slate-900 border-purple-900/50' : 'bg-yellow-50 border-yellow-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-teal-300' : 'text-yellow-900'}`}>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    QA & Prospect Demo Quick Test Fillers:
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <button
                    id="test-card-approved-btn"
                    type="button"
                    onClick={fillApprovedCard}
                    data-testid="test-card-approved-btn"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded shadow-xs cursor-pointer"
                  >
                    ✓ Pass Test Card (Approved)
                  </button>
                  <button
                    id="test-card-declined-btn"
                    type="button"
                    onClick={fillDeclinedCard}
                    data-testid="test-card-declined-btn"
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded shadow-xs cursor-pointer"
                  >
                    ✕ Fail Test Card (Declined)
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-950/80 border border-rose-500/50 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-200 font-medium">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['credit_card', 'apple_pay', 'paypal', 'bestbuy_card'] as const).map((type) => (
                  <button
                    key={type}
                    id={`payment-type-${type}`}
                    type="button"
                    onClick={() => setPayment({ ...payment, paymentType: type })}
                    data-testid={`payment-type-${type}`}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold capitalize transition-colors cursor-pointer ${
                      payment.paymentType === type
                        ? isDark
                          ? 'border-teal-400 bg-teal-950/60 text-teal-300'
                          : 'border-[#0046be] bg-blue-50 text-[#0046be]'
                        : isDark
                        ? 'border-slate-800 hover:bg-slate-800 text-gray-300'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Card Inputs */}
              <div className={`space-y-3 p-4 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-200'
              }`}>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Credit Card Number</label>
                  <div className="relative">
                    <input
                      id="payment-cardnumber-input"
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      data-testid="payment-cardnumber-input"
                      placeholder="4000 1234 5678 9010"
                      className={`w-full border rounded-lg py-2 pl-3 pr-10 text-xs font-mono font-bold focus:outline-none ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                      }`}
                    />
                    <CreditCard className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">Expiration Date</label>
                    <input
                      id="payment-expiry-input"
                      type="text"
                      value={payment.expiryDate}
                      onChange={(e) => setPayment({ ...payment, expiryDate: e.target.value })}
                      data-testid="payment-expiry-input"
                      placeholder="MM/YY"
                      className={`w-full border rounded-lg p-2 text-xs font-mono font-bold focus:outline-none ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-1">CVV / Security Code</label>
                    <input
                      id="payment-cvv-input"
                      type="password"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      data-testid="payment-cvv-input"
                      placeholder="123"
                      className={`w-full border rounded-lg p-2 text-xs font-mono font-bold focus:outline-none ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Order Total Review */}
              <div className={`p-3 rounded-xl flex items-center justify-between text-xs font-bold ${
                isDark ? 'bg-slate-900 text-gray-200' : 'bg-gray-100 text-gray-800'
              }`}>
                <span>Total Amount to Authorize:</span>
                <span
                  id="checkout-total-amount"
                  data-testid="checkout-total-amount"
                  className={`text-base font-black font-mono ${isDark ? 'text-teal-300' : 'text-[#0046be]'}`}
                >
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  id="payment-back-btn"
                  type="button"
                  onClick={() => setStep(1)}
                  data-testid="payment-back-btn"
                  className="text-xs text-gray-400 hover:text-white font-bold cursor-pointer"
                >
                  ← Back to Shipping
                </button>

                <button
                  id="payment-submit-btn"
                  type="submit"
                  data-testid="payment-submit-btn"
                  className={`font-extrabold text-sm py-3 px-6 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-pink-500 text-black shadow-[0_0_15px_rgba(0,245,212,0.5)]'
                      : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Place Demo Order (${grandTotal.toFixed(2)})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Processing Simulation */}
          {step === 3 && (
            <div id="checkout-processing-view" className="py-12 text-center space-y-4">
              <div className="relative inline-block">
                <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto ${
                  isDark ? 'border-purple-900 border-t-teal-400' : 'border-blue-200 border-t-[#0046be]'
                }`} />
                <ShieldCheck className={`w-6 h-6 absolute inset-0 m-auto ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} />
              </div>
              <h3 className="text-lg font-bold">Authorizing Mock Transaction...</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto font-mono">
                Communicating with Best Buy Mock Payment Server... (Simulated Latency: {simulatedLatency}ms)
              </p>
            </div>
          )}

          {/* STEP 4: Order Confirmation Receipt */}
          {step === 4 && completedOrder && (
            <div id="checkout-confirmation-view" className="space-y-5 animate-in fade-in duration-300">
              <div className={`text-center rounded-2xl p-6 space-y-2 border ${
                isDark ? 'bg-teal-950/40 border-teal-500/40 text-teal-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="w-12 h-12 bg-teal-400 text-black font-black rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold">Order Placed Successfully!</h3>
                <p className="text-xs">
                  Confirmation # <span id="confirmed-order-id" data-testid="confirmed-order-id" className="font-mono font-bold">{completedOrder.orderId}</span>
                </p>
                <div className="text-[11px] text-gray-400 font-mono pt-1">
                  Tracking #: {completedOrder.trackingNumber} | Delivery: {completedOrder.estimatedDelivery}
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className={`rounded-xl p-4 border text-xs space-y-2 ${
                isDark ? 'bg-slate-900 border-slate-800 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                <div className={`font-bold uppercase border-b pb-2 flex justify-between ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                  <span>Purchased Items ({completedOrder.items.length})</span>
                  <span>Total Paid: ${completedOrder.total.toFixed(2)}</span>
                </div>
                {completedOrder.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-1">
                    <span className="line-clamp-1 flex-1 font-medium">
                      {item.quantity}x {item.product.name} {item.hasProtectionPlan && '(+2-Yr Protection)'}
                    </span>
                    <span className="font-mono font-bold ml-2">
                      ${((item.product.price + (item.hasProtectionPlan ? item.protectionPrice : 0)) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions for Sales Demo & QA Inspection */}
              <div className="flex items-center justify-between gap-3 text-xs pt-2">
                <button
                  id="copy-receipt-json-btn"
                  onClick={copyReceiptJson}
                  data-testid="copy-receipt-json-btn"
                  className={`font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {copiedReceipt ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedReceipt ? 'Copied Receipt JSON!' : 'Copy Receipt Payload JSON'}</span>
                </button>

                <button
                  id="continue-shopping-btn"
                  onClick={() => {
                    setStep(1);
                    onClose();
                  }}
                  data-testid="continue-shopping-btn"
                  className={`font-bold px-5 py-2.5 rounded-xl shadow-sm cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-extrabold'
                      : 'bg-[#0046be] hover:bg-blue-700 text-white'
                  }`}
                >
                  Done / New Demo Transaction
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

