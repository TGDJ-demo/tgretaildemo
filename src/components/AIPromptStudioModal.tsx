import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Sparkles,
  Layers,
  Terminal,
  Bot,
  ExternalLink
} from 'lucide-react';
import { PROMPT_TEMPLATES, PromptTemplate } from '../data/prompts';
import { AIPromptConfig } from '../types';

interface AIPromptStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const AIPromptStudioModal: React.FC<AIPromptStudioModalProps> = ({
  isOpen,
  onClose,
  isDark
}) => {
  if (!isOpen) return null;

  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(PROMPT_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState<AIPromptConfig>({
    targetModel: 'google_ai_studio',
    framework: 'react_vite_tailwind',
    includeMockPayment: true,
    includeTestIDs: true,
    includeGeekSquad: true,
    includeCompareTool: true,
    includeOrderTracking: true,
    includeTestScriptGenerator: true,
    customRequirements: ''
  });

  // Dynamic Prompt Construction based on customization
  const generateCustomPrompt = () => {
    let base = selectedTemplate.content;

    const modelNameMap = {
      google_ai_studio: 'Google AI Studio (Gemini 2.0 / 1.5 Pro)',
      deepseek_r1: 'DeepSeek R1 / V3',
      chatgpt_4o: 'ChatGPT GPT-4o',
      claude_35: 'Claude 3.5 Sonnet'
    };

    const frameworkMap = {
      react_vite_tailwind: 'React 18 + Vite + Tailwind CSS v4',
      nextjs_app_router: 'Next.js 14 App Router + Tailwind CSS',
      vue_pinia: 'Vue 3 + Vite + Pinia + Tailwind CSS'
    };

    let customizationHeader = `[OPTIMIZED FOR ${modelNameMap[config.targetModel].toUpperCase()}]\n`;
    customizationHeader += `[FRAMEWORK: ${frameworkMap[config.framework]}]\n\n`;

    let customNotes = '\n\n### Custom Prospect Demo Requirements:\n';
    if (config.includeTestIDs) customNotes += '- Enforce \`data-testid\` attributes on every interactive button, input, and modal for automated QA testing.\n';
    if (config.includeMockPayment) customNotes += '- Provide mock credit card pre-fill buttons for pass/fail payment gateway testing.\n';
    if (config.includeGeekSquad) customNotes += '- Include Geek Squad warranty coverage add-ons on cards, modals, and cart.\n';
    if (config.includeCompareTool) customNotes += '- Add side-by-side product comparison drawer for up to 4 items.\n';
    if (config.includeTestScriptGenerator) customNotes += '- Include live Playwright / Cypress automation code generator toolbar.\n';
    if (config.customRequirements.trim()) customNotes += `- Additional Note: ${config.customRequirements.trim()}\n`;

    return customizationHeader + base + customNotes;
  };

  const finalPromptText = generateCustomPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([finalPromptText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bestbuy_clone_ai_prompt_${config.targetModel}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="ai-prompt-studio-overlay" className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div
        id="ai-prompt-studio-modal"
        data-testid="ai-prompt-studio-modal"
        className={`rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl relative border my-4 overflow-hidden transition-colors ${
          isDark ? 'bg-[#121826] text-white border-purple-900/50' : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Modal Header */}
        <div
          id="ai-prompt-studio-header"
          className={`px-6 py-4 flex items-center justify-between border-b ${
            isDark
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-purple-800/40 text-white'
              : 'bg-[#040c1e] text-white border-blue-900/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-sm ${
              isDark ? 'bg-gradient-to-br from-teal-400 to-cyan-500 text-black' : 'bg-[#ffe000] text-black'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>AI Prompt Studio</span>
                <span className={`text-xs px-2.5 py-0.5 rounded border ${
                  isDark ? 'bg-purple-950 text-teal-300 border-teal-500/30' : 'bg-yellow-400/20 text-[#ffe000] border-yellow-500/30'
                }`}>
                  For Google AI Studio & DeepSeek
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Generate, customize, and copy system prompts for building functional Best Buy clones.
              </p>
            </div>
          </div>

          <button
            id="prompt-studio-close-btn"
            onClick={onClose}
            data-testid="prompt-studio-close-btn"
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-gray-50">
          {/* Left Column: Preset Templates & Controls (5 Cols) */}
          <div className={`lg:col-span-5 p-5 border-r overflow-y-auto space-y-6 ${
            isDark ? 'bg-[#0d111d] border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            {/* Select Prompt Template */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                1. Select Master Template
              </label>
              <div className="space-y-2">
                {PROMPT_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    id={`prompt-template-btn-${tmpl.id}`}
                    onClick={() => setSelectedTemplate(tmpl)}
                    data-testid={`prompt-template-btn-${tmpl.id}`}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer ${
                      selectedTemplate.id === tmpl.id
                        ? isDark
                          ? 'border-teal-400 bg-teal-950/60 text-teal-300 font-bold shadow-xs'
                          : 'border-[#0046be] bg-blue-50/70 text-[#0046be] font-bold shadow-xs'
                        : isDark
                        ? 'border-slate-800 hover:bg-slate-800/80 text-gray-300'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>{tmpl.title}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{tmpl.targetPlatform.split('/')[0]}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-normal line-clamp-2">
                      {tmpl.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                2. Configure Prompt Parameters
              </label>

              {/* Target AI Engine */}
              <div>
                <label className="text-xs font-bold block mb-1.5 flex items-center gap-1.5">
                  <Bot className={`w-3.5 h-3.5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} /> Target AI Model
                </label>
                <select
                  id="prompt-target-model-select"
                  value={config.targetModel}
                  onChange={(e) => setConfig({ ...config, targetModel: e.target.value as any })}
                  data-testid="prompt-target-model-select"
                  className={`w-full border rounded-lg p-2 text-xs font-bold focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  <option value="google_ai_studio">Google AI Studio (Gemini 2.0 / Flash)</option>
                  <option value="deepseek_r1">DeepSeek R1 / V3</option>
                  <option value="chatgpt_4o">ChatGPT (GPT-4o)</option>
                  <option value="claude_35">Claude 3.5 Sonnet</option>
                </select>
              </div>

              {/* Framework Selection */}
              <div>
                <label className="text-xs font-bold block mb-1.5 flex items-center gap-1.5">
                  <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-teal-400' : 'text-[#0046be]'}`} /> Tech Framework
                </label>
                <select
                  id="prompt-framework-select"
                  value={config.framework}
                  onChange={(e) => setConfig({ ...config, framework: e.target.value as any })}
                  data-testid="prompt-framework-select"
                  className={`w-full border rounded-lg p-2 text-xs font-bold focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                  }`}
                >
                  <option value="react_vite_tailwind">React 18 + Vite + Tailwind CSS</option>
                  <option value="nextjs_app_router">Next.js 14 App Router</option>
                  <option value="vue_pinia">Vue 3 + Vite + Pinia</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 text-xs font-medium">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="chk-prompt-testids"
                    type="checkbox"
                    checked={config.includeTestIDs}
                    onChange={(e) => setConfig({ ...config, includeTestIDs: e.target.checked })}
                    className="rounded accent-teal-400 cursor-pointer"
                  />
                  <span>Include QA <code className="bg-slate-800 px-1 rounded font-mono text-teal-300">data-testid</code> attributes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="chk-prompt-mockpayment"
                    type="checkbox"
                    checked={config.includeMockPayment}
                    onChange={(e) => setConfig({ ...config, includeMockPayment: e.target.checked })}
                    className="rounded accent-teal-400 cursor-pointer"
                  />
                  <span>Include Dummy Payment Gateway simulation</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="chk-prompt-geeksquad"
                    type="checkbox"
                    checked={config.includeGeekSquad}
                    onChange={(e) => setConfig({ ...config, includeGeekSquad: e.target.checked })}
                    className="rounded accent-teal-400 cursor-pointer"
                  />
                  <span>Include Geek Squad Warranty add-on logic</span>
                </label>
              </div>

              {/* Additional Notes Input */}
              <div>
                <label className="text-xs font-bold block mb-1">
                  Custom Prospect Demo Instructions
                </label>
                <textarea
                  id="prompt-custom-reqs-input"
                  value={config.customRequirements}
                  onChange={(e) => setConfig({ ...config, customRequirements: e.target.value })}
                  placeholder="e.g. Add custom banner for TestGrid automation demo..."
                  rows={2}
                  className={`w-full border rounded-lg p-2 text-xs font-medium focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-teal-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Code Viewer & Actions (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col bg-[#090d16] text-gray-200">
            {/* Viewer Top Action Bar */}
            <div className="bg-[#0f172a] px-5 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span>bestbuy_clone_prompt.md</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="prompt-download-btn"
                  onClick={handleDownload}
                  data-testid="prompt-download-btn"
                  className="bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>

                <button
                  id="prompt-copy-btn"
                  onClick={handleCopy}
                  data-testid="prompt-copy-btn"
                  className={`font-extrabold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-extrabold'
                      : 'bg-[#ffe000] hover:bg-yellow-300 text-black'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                  <span>{copied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>
            </div>

            {/* Prompt Content Preview Box */}
            <div
              id="prompt-text-preview"
              data-testid="prompt-text-preview"
              className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap selection:bg-blue-600 selection:text-white"
            >
              {finalPromptText}
            </div>

            {/* AI Studio External Link Callout */}
            <div className="p-3 bg-[#0f172a] border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Ready to generate? Paste directly into Google AI Studio or DeepSeek chat.</span>
              <a
                id="external-ai-studio-link"
                href="https://aistudio.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#ffe000] hover:underline flex items-center gap-1 font-bold"
              >
                Open Google AI Studio <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

