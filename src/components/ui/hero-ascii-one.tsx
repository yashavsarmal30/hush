'use client';

import React, { useEffect, useState } from 'react';
import { Download, Terminal, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

declare global {
  interface Window {
    UnicornStudio?: any;
  }
}

interface HeroAsciiProps {
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  downloadUrl?: string;
  githubUrl?: string;
}

export default function HeroAsciiOne({
  headline = "Speak freely. Type anywhere with 100% offline AI.",
  subheadline = "The unbound edge-native voice engine. Runs OpenAI Whisper locally on your CPU via Intel OpenVINO int8 quantization. Injects keystrokes directly at your active cursor with zero cloud streaming, zero accounts, and zero telemetry.",
  eyebrow = "HUSH — EDGE-NATIVE VOICE ENGINE",
  downloadUrl = "https://github.com/yashavsarmal30/hush/releases/latest",
  githubUrl = "https://github.com/yashavsarmal30/hush"
}: HeroAsciiProps) {
  const [copied, setCopied] = useState(false);
  const gitCommand = "git clone https://github.com/yashavsarmal30/hush.git && cd hush && just run";

  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    // CSS to crop canvas and cleanly hide any third-party watermarks
    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]'
      ];
      
      selectors.forEach(selector => {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            const text = (el.textContent || '').toLowerCase();
            const title = (el.getAttribute('title') || '').toLowerCase();
            const href = (el.getAttribute('href') || '').toLowerCase();
            
            if (
              text.includes('made with') || 
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              const htmlEl = el as HTMLElement;
              htmlEl.style.display = 'none';
              htmlEl.style.visibility = 'hidden';
              htmlEl.style.opacity = '0';
              htmlEl.style.pointerEvents = 'none';
              htmlEl.style.position = 'absolute';
              htmlEl.style.left = '-9999px';
              htmlEl.style.top = '-9999px';
              try { el.remove(); } catch(e) {}
            }
          });
        });
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 80);
    
    const timeouts = [
      setTimeout(hideBranding, 500),
      setTimeout(hideBranding, 1000),
      setTimeout(hideBranding, 2000),
      setTimeout(hideBranding, 5000)
    ];

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
      if (document.head.contains(embedScript)) document.head.removeChild(embedScript);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(gitCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-white selection:text-black flex flex-col justify-between font-sans">
      {/* Background Interactive ASCII Canvas */}
      <div className="absolute inset-0 w-full h-full hidden lg:block opacity-70 pointer-events-auto">
        <div 
          data-us-project="OMzqyUv6M3kSnv0JeAtC" 
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Mobile stars fallback */}
      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg opacity-30 pointer-events-none"></div>

      {/* Subtle monochrome ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />

      {/* Top Header Navigation - Strict Black-and-White Minimal Duet */}
      <header className="relative z-30 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          {/* Brand & Eyebrow Chip */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white">
              HUSH
            </span>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono tracking-wider text-neutral-300">
              v1.0.0
            </span>
          </div>

          {/* Minimal Specs Pills */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-neutral-400">
              <span>MODEL: OPENVINO INT8</span>
              <span className="text-white/30">•</span>
              <span>100% OFFLINE</span>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Corner Geometric Frame Accents (Pure monochrome 16px radius hints) */}
      <div className="absolute top-20 left-6 w-8 h-8 border-t border-l border-white/20 pointer-events-none z-20"></div>
      <div className="absolute top-20 right-6 w-8 h-8 border-t border-r border-white/20 pointer-events-none z-20"></div>
      <div className="absolute bottom-20 left-6 w-8 h-8 border-b border-l border-white/20 pointer-events-none z-20"></div>
      <div className="absolute bottom-20 right-6 w-8 h-8 border-b border-r border-white/20 pointer-events-none z-20"></div>

      {/* Main Hero Body - Single Black & White Conversion Anchor */}
      <section className="relative z-20 flex flex-1 items-center justify-end px-6 sm:px-12 lg:px-20 py-16">
        <div className="w-full lg:w-3/5 max-w-2xl lg:ml-auto text-left">
          
          {/* Eyebrow tag in uppercase */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-white/40"></div>
            <span className="text-white/70 text-xs font-mono tracking-widest uppercase">
              {eyebrow}
            </span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Display Headline in sentence-case, weight 700 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            {headline}
          </h1>

          {/* Engineering-grade body text in muted grayscale */}
          <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed mb-8 max-w-xl">
            {subheadline}
          </p>

          {/* Primary & Secondary CTAs - Strict {rounded.pill} 999px geometry */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            {/* Primary conversion CTA pill (white with black text) */}
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-all hover:bg-[#e2e2e2] active:scale-[0.98] shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </a>

            {/* Secondary CTA pill */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/40 active:scale-[0.98]"
            >
              <span>Explore Architecture</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </a>
          </div>

          {/* Developer Quick-Start Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-neutral-300">
            <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-400 truncate max-w-[280px] sm:max-w-none">
              {gitCommand}
            </span>
            <button
              onClick={handleCopy}
              className="ml-2 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Hotkey signature indicator */}
          <div className="mt-8 flex items-center gap-3 text-[11px] font-mono text-neutral-500">
            <span className="text-neutral-400 font-semibold">[Ctrl+Win]</span>
            <span>Hold to Talk</span>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-400 font-semibold">[Ctrl+Alt+D]</span>
            <span>Hands-Free</span>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-400">English + Hindi</span>
          </div>

        </div>
      </section>

      {/* Bottom Status Bar - Strict Minimal Monochrome Footer */}
      <footer className="relative z-30 w-full border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between font-mono text-[11px] text-neutral-500">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-neutral-400">HUSH.SYS // 127.0.0.1:4874</span>
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>LOCAL OPEN-VINO ENGINE READY</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">TELEMETRY: 0 KB</span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-neutral-400">MIT LICENSE</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
