export interface PromptTemplate {
  id: string;
  title: string;
  targetPlatform: string;
  description: string;
  tags: string[];
  content: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'prompt-master-bestbuy',
    title: 'Complete Best Buy E-Commerce Clone with Mock Checkout',
    targetPlatform: 'Google AI Studio / DeepSeek R1 / Claude 3.5 / ChatGPT',
    description: 'Master system prompt for generating a pixel-perfect, fully interactive Best Buy clone featuring product search, filter sidebar, cart drawer, Geek Squad add-ons, mock payment gateway, order tracking, and test automation attributes.',
    tags: ['Google AI Studio', 'DeepSeek', 'E-Commerce', 'Mock Payment', 'Testing Platform'],
    content: `You are an expert Full-Stack Lead Engineer and UI Designer. Build a production-ready, fully functional e-commerce clone of Best Buy designed specifically for internal sales demos and QA test automation platform benchmarking.

### Core Architectural Requirements & Intent
1. **Visual Branding & Aesthetic**:
   - Use iconic Best Buy color palette: Deep Blue (\`#0046be\`), Bright Accent Yellow (\`#ffe000\`), Dark Navy (\`#040c1e\`), Light Gray background (\`#f4f6f9\`), and crisp white card containers.
   - Typography: Clean sans-serif hierarchy, high contrast badges ("Top Deal", "Member Savings", "Save $200", "Free Next-Day Shipping").
   - Layout: Desktop-first header with search bar, store selector, category navigation, deals bar, filter sidebar, responsive product grid, cart slide-over drawer, and multi-step checkout modal.

2. **Product Catalog & E-Commerce Flow**:
   - Include realistic electronics categories: TVs & Home Theater, Laptops & Computers, Audio & Headphones, Cell Phones, Video Games, Smart Home.
   - Filter & Sort system: Filter by Category, Brand (Samsung, Apple, Sony, LG, Asus), Price Range, Minimum Rating (4★+), On Sale, and In Stock.
   - Product Details View/Modal: Gallery thumbnail switcher, specification grid, key features, customer rating distribution, SKU & Model Numbers, and Geek Squad Protection Plan toggle.
   - Side-by-Side Product Comparison drawer (compare up to 4 products).

3. **Cart & Mock Payment Gateway**:
   - Slide-over Cart with live quantity adjustments, Geek Squad warranty add-ons, coupon code entry (\`DEMO10\`), subtotal, estimated tax, and free shipping calculation.
   - Multi-Step Checkout Modal:
     - Step 1: Contact & Shipping Address / Store Pickup selection.
     - Step 2: Dummy Payment Gateway (Credit Card, Apple Pay, PayPal, Best Buy Card) with pre-fill test buttons:
       - [Pass - Test Card Approved] (Simulates successful payment response)
       - [Fail - Card Declined] (Simulates payment gateway decline error)
       - [Fail - Network Timeout] (Simulates gateway 504 error)
     - Step 3: Order Processing animation with simulated network latency.
     - Step 4: Order Confirmation receipt with order ID (\`#BBY-2026-XXXX\`), item breakdown, tracking timeline, and printable summary.

4. **Test Automation Platform Features**:
   - Add explicit \`data-testid\` attributes on all interactive controls (e.g. \`data-testid="search-input"\`, \`data-testid="product-card-{id}"\`, \`data-testid="add-to-cart-btn"\`, \`data-testid="checkout-submit-btn"\`, \`data-testid="credit-card-input"\`).
   - Include a toggleable "QA Demo Helper Toolbar" that can highlight test targets, trigger simulated network delays, generate live Playwright/Cypress automation code snippets, and reset demo data.

5. **Technology Stack**:
   - React 18+ with TypeScript
   - Vite + Tailwind CSS v4
   - Lucide React Icons
   - Motion for layout transitions

Ensure all code is written in a modular, clean structure with full component decomposition and zero placeholders.`
  },
  {
    id: 'prompt-test-automation-gen',
    title: 'Playwright & Cypress E2E Automation Generator Prompt',
    targetPlatform: 'Google AI Studio / DeepSeek',
    description: 'Prompt to generate end-to-end automated test scripts for verifying e-commerce user journeys (search, cart, checkout, payment pass/fail) against this Best Buy demo platform.',
    tags: ['Test Automation', 'Playwright', 'Cypress', 'QA Testing', 'Selenium'],
    content: `You are a Principal Test Automation Engineer. Write a comprehensive Playwright / Cypress E2E test suite in TypeScript for testing an e-commerce website (Best Buy clone).

### Test Objectives
1. **Catalog Navigation & Search**:
   - Verify searching for "OLED TV" returns filtered results containing Samsung and LG.
   - Verify applying the "Save $500" discount filter updates the product grid correctly.

2. **Cart & Protection Plan Logic**:
   - Verify adding an Apple MacBook Pro to cart increases the cart badge counter to 1.
   - Verify adding Geek Squad Protection Plan ($299.99) dynamically recalculates the cart subtotal.

3. **Mock Checkout & Payment Scenarios**:
   - Test Positive Case: Enter valid test card details and verify redirected to Order Confirmation page with Order ID starting with "#BBY-".
   - Test Negative Case: Enter declined test card details and verify alert box appears with "Payment Declined: Invalid CVV or Insufficient Funds".
   - Test Error Handling: Simulate network failure during payment submission and assert retry UI state.

### Implementation Requirements
- Use target element selectors using \`data-testid\` attributes (\`page.getByTestId('checkout-submit-btn')\`).
- Include page object models (POM) for ProductPage, CartDrawer, and CheckoutModal.
- Add assertions for network payloads and local storage persistence.`
  },
  {
    id: 'prompt-mock-backend-express',
    title: 'Node.js Express E-Commerce Mock Backend API Prompt',
    targetPlatform: 'Google AI Studio / DeepSeek',
    description: 'Prompt to generate a full Node.js Express backend server with mock REST endpoints for products, cart management, coupon validation, and payment gateway webhooks.',
    tags: ['Express', 'Mock API', 'Node.js', 'REST API', 'Webhooks'],
    content: `Create a standalone Node.js Express server (\`server.ts\`) providing REST API endpoints to back an e-commerce Best Buy demo application.

### Endpoints Required:
1. \`GET /api/products\`: Query parameters for \`category\`, \`brand\`, \`minPrice\`, \`maxPrice\`, \`search\`, and \`sort\`.
2. \`GET /api/products/:id\`: Detailed product information including specifications and related items.
3. \`POST /api/cart/validate-coupon\`: Accepts \`couponCode\` and returns discount percentage (e.g. \`DEMO10\` = 10% off).
4. \`POST /api/checkout/process-payment\`:
   - Accepts \`cardNumber\`, \`expiry\`, \`cvv\`, \`amount\`, and \`simulateStatus\` (\`approved\` | \`declined\` | \`timeout\`).
   - Introduces an artificial 1500ms delay to simulate real payment gateway roundtrips.
   - Returns transaction reference, timestamp, and status.

5. \`GET /api/orders/:orderId\`: Fetches order status, tracking updates, and delivery estimate.

Ensure proper CORS headers, error handling, JSON schema validation, and logging for test automation inspections.`
  }
];
