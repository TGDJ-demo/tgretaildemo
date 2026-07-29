import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, Order, ThemeMode } from './types';
import { Header } from './components/Header';
import { DealsBanner } from './components/DealsBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CompareModal } from './components/CompareModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AIPromptStudioModal } from './components/AIPromptStudioModal';
import { TestingPlatformToolbar } from './components/TestingPlatformToolbar';
import { Code, CheckCircle } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState<ThemeMode>('classic');
  const isDark = theme === 'cyber-dark';

  // State
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Pre-populate with Samsung 65" TV for fast demo
      quantity: 1,
      hasProtectionPlan: true,
      protectionPrice: PRODUCTS[0].geekSquadProtectionPrice
    }
  ]);
  const [savedList, setSavedList] = useState<Product[]>([PRODUCTS[1]]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'All Categories',
    brand: 'All Brands',
    minPrice: 0,
    maxPrice: 3500,
    minRating: 0,
    onSaleOnly: false,
    inStockOnly: false,
    freeShippingOnly: false,
    searchQuery: '',
    sortBy: 'featured'
  });

  // Coupon State
  const [discountCode, setDiscountCode] = useState('TESTGRID10');
  const [discountAmount, setDiscountAmount] = useState(10); // 10% off default demo discount

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isPromptStudioOpen, setIsPromptStudioOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // QA & Demo Toolbar State
  const [highlightTestIDs, setHighlightTestIDs] = useState(false);
  const [simulatedLatency, setSimulatedLatency] = useState(500);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filters.category !== 'All Categories' && p.category !== filters.category) return false;
        if (filters.brand !== 'All Brands' && p.brand !== filters.brand) return false;
        if (p.price > filters.maxPrice) return false;
        if (filters.minRating > 0 && p.rating < filters.minRating) return false;
        if (filters.onSaleOnly && p.originalPrice <= p.price) return false;
        if (filters.inStockOnly && !p.inStock) return false;
        if (filters.freeShippingOnly && !p.freeShipping) return false;
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesBrand = p.brand.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          const matchesSpecs = Object.values(p.specs).some((val) => String(val).toLowerCase().includes(q));
          if (!matchesName && !matchesBrand && !matchesCategory && !matchesSpecs) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price_low') return a.price - b.price;
        if (filters.sortBy === 'price_high') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'discount') return (b.originalPrice - b.price) - (a.originalPrice - a.price);
        return 0; // 'featured'
      });
  }, [products, filters]);

  // Cart Handlers
  const handleAddToCart = (product: Product, includeProtection: boolean) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                hasProtectionPlan: includeProtection || item.hasProtectionPlan
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          hasProtectionPlan: includeProtection,
          protectionPrice: product.geekSquadProtectionPrice
        }
      ];
    });

    showToast(`Added "${product.name.slice(0, 32)}..." to cart`);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleProtectionInCart = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, hasProtectionPlan: !item.hasProtectionPlan } : item
      )
    );
  };

  // Coupon Handler
  const handleApplyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DEMO10' || clean === 'TESTGRID' || clean === 'TESTGRID10') {
      setDiscountCode(clean);
      setDiscountAmount(15);
      return true;
    }
    if (clean === 'VIP20') {
      setDiscountCode(clean);
      setDiscountAmount(20);
      return true;
    }
    return false;
  };

  // Compare List Handlers
  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 items can be compared at once.');
        return prev;
      }
      showToast(`Added "${product.name.slice(0, 24)}..." to compare list`);
      return [...prev, product];
    });
  };

  // Saved List Handlers
  const handleToggleSave = (product: Product) => {
    setSavedList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        showToast('Removed from Saved Items');
        return prev.filter((p) => p.id !== product.id);
      }
      showToast('Saved for later');
      return [...prev, product];
    });
  };

  // Order Completed
  const handleOrderCompleted = (order: Order) => {
    setRecentOrders((prev) => [order, ...prev]);
    setCart([]); // Clear cart
  };

  // Reset Demo State
  const handleResetDemoData = () => {
    setCart([
      {
        product: PRODUCTS[0],
        quantity: 1,
        hasProtectionPlan: true,
        protectionPrice: PRODUCTS[0].geekSquadProtectionPrice
      }
    ]);
    setFilters({
      category: 'All Categories',
      brand: 'All Brands',
      minPrice: 0,
      maxPrice: 3500,
      minRating: 0,
      onSaleOnly: false,
      inStockOnly: false,
      freeShippingOnly: false,
      searchQuery: '',
      sortBy: 'featured'
    });
    setDiscountCode('TESTGRID10');
    setDiscountAmount(10);
    showToast('Demo State Reset to Initial Benchmark');
  };

  return (
    <div
      id="app-root-container"
      data-testid="app-root-container"
      className={`min-h-screen font-sans flex flex-col antialiased transition-colors duration-300 ${
        isDark
          ? 'bg-[#090d16] text-gray-100 selection:bg-pink-500 selection:text-white'
          : 'bg-[#f4f6f9] text-gray-900 selection:bg-[#ffe000] selection:text-black'
      }`}
    >
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div
          id="toast-notification-banner"
          data-testid="toast-notification-banner"
          className="fixed top-16 right-4 z-50 bg-gray-900 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-in slide-in-from-top duration-200"
        >
          <CheckCircle className="w-4 h-4 text-[#ffe000]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        selectedCategory={filters.category}
        onCategorySelect={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        savedCount={savedList.length}
        compareCount={compareList.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        highlightTestIDs={highlightTestIDs}
        onToggleHighlightTestIDs={() => setHighlightTestIDs(!highlightTestIDs)}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Deals & AI Prompt Banner */}
      <DealsBanner onOpenPromptStudio={() => setIsPromptStudioOpen(true)} isDark={isDark} />

      {/* Main Body Container */}
      <main id="main-content-layout" className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar Filters */}
        <FilterSidebar
          filters={filters}
          onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
          onResetFilters={() =>
            setFilters({
              category: 'All Categories',
              brand: 'All Brands',
              minPrice: 0,
              maxPrice: 3500,
              minRating: 0,
              onSaleOnly: false,
              inStockOnly: false,
              freeShippingOnly: false,
              searchQuery: '',
              sortBy: 'featured'
            })
          }
          totalResults={filteredProducts.length}
          isDark={isDark}
        />

        {/* Right Main Product Catalog Grid */}
        <ProductGrid
          products={filteredProducts}
          filters={filters}
          onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProductForModal(p)}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
          savedList={savedList}
          onToggleSave={handleToggleSave}
          highlightTestIDs={highlightTestIDs}
          isDark={isDark}
        />
      </main>

      {/* Footer */}
      <footer
        id="app-footer"
        data-testid="app-footer"
        className={`text-xs pt-8 border-t mt-12 transition-colors ${
          isDark
            ? 'bg-[#060911] text-gray-400 border-purple-900/40'
            : 'bg-[#040c1e] text-gray-400 border-blue-900/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className={`font-black px-2.5 py-1 text-lg uppercase tracking-tight rounded-sm ${
                isDark
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-black'
                  : 'bg-[#fff200] text-[#0046be]'
              }`}>
                {isDark ? 'TESTGRID' : 'BEST BUY'}
              </div>
              <span className="text-white font-bold text-sm">Demo Platform Edition</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                id="footer-prompt-studio-btn"
                data-testid="footer-prompt-studio-btn"
                onClick={() => setIsPromptStudioOpen(true)}
                className={`font-bold flex items-center gap-1 cursor-pointer hover:underline ${
                  isDark ? 'text-teal-300' : 'text-[#fff200]'
                }`}
              >
                <Code className="w-4 h-4" /> AI Prompt Studio (Google AI Studio & DeepSeek)
              </button>
              <span>|</span>
              <button
                id="footer-track-order-btn"
                data-testid="footer-track-order-btn"
                onClick={() => setIsOrderTrackingOpen(true)}
                className="hover:text-white cursor-pointer"
              >
                Track Recent Order
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between text-[11px] text-gray-500 gap-2">
            <p>
              This is a functional demo clone of Best Buy built for automated QA testing platform demonstrations and prospect trials. All checkout transactions use dummy simulated payment gateways.
            </p>
            <p>© 2026 Best Buy Demo Platform. All rights reserved.</p>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`px-6 py-2 flex flex-col sm:flex-row justify-between items-center text-[11px] font-medium gap-2 border-t ${
          isDark
            ? 'bg-[#04060c] text-gray-400 border-slate-800'
            : 'bg-gray-100 text-gray-600 border-gray-300'
        }`}>
          <div className="flex space-x-4 items-center">
            <span className="flex items-center"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span> API Sandbox: Online</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span> Database Mirror: Syncing</span>
          </div>
          <div>
            Property of <span className={`${isDark ? 'text-teal-300' : 'text-gray-900'} font-bold`}>TestGrid Systems</span> &copy; 2026 • Internal Sales Demo Environment v2.4.1
          </div>
        </div>
      </footer>

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        isCompared={selectedProductForModal ? compareList.some((p) => p.id === selectedProductForModal.id) : false}
        onToggleCompare={handleToggleCompare}
        isSaved={selectedProductForModal ? savedList.some((p) => p.id === selectedProductForModal.id) : false}
        onToggleSave={handleToggleSave}
        isDark={isDark}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onToggleProtection={handleToggleProtectionInCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountCode={discountCode}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        isDark={isDark}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discountAmount={discountAmount}
        onOrderCompleted={handleOrderCompleted}
        simulatedLatency={simulatedLatency}
        isDark={isDark}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClearCompare={() => setCompareList([])}
        onAddToCart={handleAddToCart}
        isDark={isDark}
      />

      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        recentOrders={recentOrders}
        isDark={isDark}
      />

      <AIPromptStudioModal
        isOpen={isPromptStudioOpen}
        onClose={() => setIsPromptStudioOpen(false)}
        isDark={isDark}
      />

      {/* Sticky QA Test Automation Toolbar */}
      <TestingPlatformToolbar
        highlightTestIDs={highlightTestIDs}
        onToggleHighlightTestIDs={() => setHighlightTestIDs(!highlightTestIDs)}
        simulatedLatency={simulatedLatency}
        onLatencyChange={(ms) => setSimulatedLatency(ms)}
        onResetDemoData={handleResetDemoData}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        isDark={isDark}
      />
    </div>
  );
}

