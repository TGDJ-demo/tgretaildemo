import React, { useState } from 'react';
import {
  Eye,
  Clock,
  Code2,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';

interface TestingPlatformToolbarProps {
  highlightTestIDs: boolean;
  onToggleHighlightTestIDs: () => void;
  simulatedLatency: number;
  onLatencyChange: (ms: number) => void;
  onResetDemoData: () => void;
  cartCount: number;
  isDark?: boolean;
}

export const TestingPlatformToolbar: React.FC<TestingPlatformToolbarProps> = ({
  highlightTestIDs,
  onToggleHighlightTestIDs,
  simulatedLatency,
  onLatencyChange,
  onResetDemoData,
  isDark
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [scriptFramework, setScriptFramework] = useState<'playwright' | 'cypress' | 'selenium'>('selenium');

  const generateLiveScript = () => {
    if (scriptFramework === 'selenium') {
      return `// Selenium WebDriver (JavaScript / Node.js)
const { Builder, By, until } = require('selenium-webdriver');

async function runSeleniumTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. Open Best Buy Demo Web App
    await driver.get('https://demo.bestbuy-clone.testgrid.io');

    // 2. Search for TV by locator id
    await driver.findElement(By.id('header-search-input')).sendKeys('Samsung OLED');
    await driver.findElement(By.id('header-search-submit-btn')).click();

    // 3. Add first item to cart
    await driver.findElement(By.id('add-to-cart-btn-prod-001')).click();

    // 4. Open Cart Drawer & Check Out
    await driver.findElement(By.id('header-cart-btn')).click();
    await driver.findElement(By.id('cart-checkout-btn')).click();

    // 5. Complete Shipping & Mock Payment
    await driver.findElement(By.id('shipping-next-btn')).click();
    await driver.findElement(By.id('test-card-approved-btn')).click();
    await driver.findElement(By.id('payment-submit-btn')).click();

    console.log("Selenium Automated Test Execution Passed!");
  } finally {
    await driver.quit();
  }
}
runSeleniumTest();`;
    }

    if (scriptFramework === 'playwright') {
      return `import { test, expect } from '@playwright/test';

test('Best Buy Demo - End to End Purchase Flow', async ({ page }) => {
  // 1. Navigate to Best Buy Demo App
  await page.goto('https://demo.bestbuy-clone.testgrid.io');

  // 2. Search for 4K Smart TV
  await page.getByTestId('header-search-input').fill('Samsung OLED');
  await page.getByTestId('header-search-submit-btn').click();

  // 3. Add TV to Cart with Geek Squad Protection
  await page.getByTestId('geeksquad-toggle-prod-001').check();
  await page.getByTestId('add-to-cart-btn-prod-001').click();

  // 4. Open Cart & Verify Items Count
  await page.getByTestId('header-cart-btn').click();
  await expect(page.getByTestId('cart-badge-count')).toHaveText('1');

  // 5. Apply Demo Coupon Code
  await page.getByTestId('cart-promo-input').fill('TESTGRID10');
  await page.getByTestId('cart-apply-promo-btn').click();

  // 6. Proceed to Mock Checkout & Fill Test Card
  await page.getByTestId('cart-checkout-btn').click();
  await page.getByTestId('shipping-next-btn').click();
  await page.getByTestId('test-card-approved-btn').click();

  // 7. Authorize Order & Assert Confirmation
  await page.getByTestId('payment-submit-btn').click();
  await expect(page.getByTestId('confirmed-order-id')).toBeVisible();
});`;
    }

    return `describe('Best Buy Clone - TestGrid Automation Suite', () => {
  it('completes mock checkout with valid test card', () => {
    cy.visit('/');
    cy.get('[data-testid="header-search-input"]').type('PlayStation 5');
    cy.get('[data-testid="header-search-submit-btn"]').click();
    cy.get('[data-testid="add-to-cart-btn-prod-004"]').click();
    cy.get('[data-testid="header-cart-btn"]').click();
    cy.get('[data-testid="cart-checkout-btn"]').click();
    cy.get('[data-testid="shipping-next-btn"]').click();
    cy.get('[data-testid="test-card-approved-btn"]').click();
    cy.get('[data-testid="payment-submit-btn"]').click();
    cy.get('[data-testid="confirmed-order-id"]').should('be.visible');
  });
});`;
  };

  const copyScript = () => {
    navigator.clipboard.writeText(generateLiveScript());
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <>
      {/* Sticky Bottom QA Demo Bar */}
      <div
        id="qa-testing-toolbar-container"
        data-testid="qa-testing-toolbar-container"
        className={`fixed bottom-4 right-4 z-40 text-white rounded-2xl border shadow-2xl transition-all overflow-hidden max-w-md w-full ${
          isDark
            ? 'bg-[#121826] border-purple-800/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[#040c1e] border-blue-900/60'
        }`}
      >
        {/* Header Toggle Bar */}
        <button
          id="qa-toolbar-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="qa-toolbar-toggle"
          className={`w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
            isDark
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 hover:brightness-110 text-white'
              : 'bg-blue-950/80 hover:bg-blue-900 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
            </span>
            <span className={`uppercase tracking-wider font-extrabold ${isDark ? 'text-teal-300' : 'text-[#ffe000]'}`}>
              Selenium QA Toolbar
            </span>
            <span className="text-gray-400 font-mono text-[10px] hidden sm:inline">(Sales Demo & QA)</span>
          </div>

          <div className="flex items-center gap-1 text-gray-300">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* Collapsible Helper Panel */}
        {isExpanded && (
          <div className={`p-4 space-y-3 text-xs ${isDark ? 'bg-[#0d111d]' : 'bg-[#090d16]'}`}>
            {/* Row 1: Highlight Test IDs Toggle */}
            <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-bold text-gray-200">Highlight Selenium Locators (<code className="text-teal-300 font-mono">id</code> / <code className="text-cyan-400 font-mono">data-testid</code>)</div>
                  <div className="text-[10px] text-gray-400">Draws cyan outlines around all testable elements</div>
                </div>
              </div>

              <button
                id="toggle-highlight-testids-btn"
                onClick={onToggleHighlightTestIDs}
                data-testid="toggle-highlight-testids-btn"
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  highlightTestIDs
                    ? isDark ? 'bg-gradient-to-r from-pink-500 to-teal-400 text-black font-extrabold' : 'bg-cyan-500 text-black'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {highlightTestIDs ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Row 2: Network Latency Slider */}
            <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  Simulated Gateway Latency:
                </span>
                <span className="font-mono text-yellow-400 font-extrabold">{simulatedLatency}ms</span>
              </div>
              <input
                id="latency-slider"
                type="range"
                min="0"
                max="3000"
                step="500"
                value={simulatedLatency}
                onChange={(e) => onLatencyChange(Number(e.target.value))}
                data-testid="latency-slider"
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>0ms (Instant)</span>
                <span>1500ms (Real)</span>
                <span>3000ms (Slow)</span>
              </div>
            </div>

            {/* Row 3: Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="open-script-generator-btn"
                onClick={() => setShowScriptModal(true)}
                data-testid="open-script-generator-btn"
                className={`font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-extrabold'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Selenium / E2E Script</span>
              </button>

              <button
                id="reset-demo-state-btn"
                onClick={onResetDemoData}
                data-testid="reset-demo-state-btn"
                className="bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Script Generator Modal */}
      {showScriptModal && (
        <div id="script-generator-modal-overlay" className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div
            id="script-generator-modal"
            data-testid="script-generator-modal"
            className="bg-[#090d16] text-gray-200 rounded-2xl max-w-2xl w-full border border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">Selenium & Automated QA Script Generator</h3>
              </div>
              <button
                id="script-modal-close-btn"
                onClick={() => setShowScriptModal(false)}
                className="p-1 text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Framework Switcher */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-gray-400">Framework:</span>
              {(['selenium', 'playwright', 'cypress'] as const).map((fw) => (
                <button
                  key={fw}
                  id={`script-framework-btn-${fw}`}
                  onClick={() => setScriptFramework(fw)}
                  data-testid={`script-framework-btn-${fw}`}
                  className={`px-3 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                    scriptFramework === fw
                      ? isDark ? 'bg-teal-400 text-black font-extrabold' : 'bg-[#ffe000] text-black font-extrabold'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>

            {/* Script Box */}
            <div
              id="generated-script-code-box"
              data-testid="generated-script-code-box"
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 max-h-80 overflow-y-auto whitespace-pre leading-relaxed"
            >
              {generateLiveScript()}
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-mono">Targets element unique IDs and data-testid attributes for Selenium.</span>
              <button
                id="copy-generated-script-btn"
                onClick={copyScript}
                data-testid="copy-generated-script-btn"
                className={`font-extrabold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer ${
                  isDark ? 'bg-teal-400 text-black' : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
                }`}
              >
                {copiedScript ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                <span>{copiedScript ? 'Copied Code!' : 'Copy Script'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

