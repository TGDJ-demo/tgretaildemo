export type ThemeMode = 'classic' | 'cyber-dark';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages?: string[];
  specs: Record<string, string>;
  badges: string[];
  description: string;
  features: string[];
  inStock: boolean;
  modelNumber: string;
  sku: string;
  geekSquadProtectionPrice: number;
  freeShipping: boolean;
  storePickupAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  hasProtectionPlan: boolean;
  protectionPrice: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  fulfillmentType: 'shipping' | 'store_pickup';
  storeLocation?: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  paymentType: 'credit_card' | 'apple_pay' | 'paypal' | 'bestbuy_card';
  saveCardForFuture: boolean;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  shipping: ShippingDetails;
  payment: {
    paymentType: string;
    lastFourDigits: string;
  };
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Order Placed' | 'Preparing for Shipment' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onSaleOnly: boolean;
  inStockOnly: boolean;
  freeShippingOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'discount';
}

export interface AIPromptConfig {
  targetModel: 'google_ai_studio' | 'deepseek_r1' | 'chatgpt_4o' | 'claude_35';
  framework: 'react_vite_tailwind' | 'nextjs_app_router' | 'vue_pinia';
  includeMockPayment: boolean;
  includeTestIDs: boolean;
  includeGeekSquad: boolean;
  includeCompareTool: boolean;
  includeOrderTracking: boolean;
  includeTestScriptGenerator: boolean;
  customRequirements: string;
}

export interface TestAutomationAction {
  id: string;
  timestamp: string;
  actionType: 'click' | 'input' | 'select' | 'assert';
  testId: string;
  selector: string;
  value?: string;
  description: string;
}
