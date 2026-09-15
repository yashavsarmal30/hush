'use client';

import React, { useState } from "react";
import { Download, Terminal, Check, Copy, Laptop, Shield, Github, ArrowRight, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function DownloadsCTA() {
  const [copied, setCopied] = useState(false);
  const gitCommand = "git clone https://github.com/yashavsarmal30/hush.git && cd hush && just run";

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(gitCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <section id="download" className="py-24 sm:py-32 bg-gradient-to-b from-black to-[#07070b] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/15 bg-neutral-950/90 p-8 sm:p-14 shadow-2xl backdrop-blur-2xl text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono mb-6">
            <span>GET STARTED IN SECONDS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-mono mb-4">
            Take Back Your Voice.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
            Free, open-source, and private forever. No account required. Download the Windows installer or build from source in minutes.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://github.com/yashavsarmal30/hush/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownloadClick}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-95 group"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Download Hush for Windows</span>
              <span className="text-xs text-neutral-500 font-mono">v1.0.0</span>
            </a>

            <a
              href="https://github.com/yashavsarmal30/hush"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-medium text-sm hover:bg-white/10 hover:border-white/30 transition-all active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>
          </div>

          {/* Quick Terminal Command */}
          <div className="max-w-xl mx-auto rounded-xl border border-white/10 bg-black/60 p-3 flex items-center justify-between gap-3 text-left font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-2 truncate">
              <Terminal className="w-4 h-4 text-neutral-500 shrink-0" />
              <span className="truncate">{gitCommand}</span>
            </div>
            <button
              onClick={handleCopyCommand}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-mono transition-colors shrink-0 flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* System Specs Badges */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono text-xs text-neutral-400">
            <div>
              <div className="text-neutral-500 text-[10px]">PLATFORM</div>
              <div className="text-white font-medium mt-0.5">Windows 10 / 11</div>
            </div>
            <div>
              <div className="text-neutral-500 text-[10px]">PROCESSOR</div>
              <div className="text-white font-medium mt-0.5">x86_64 CPU (No GPU)</div>
            </div>
            <div>
              <div className="text-neutral-500 text-[10px]">MEMORY</div>
              <div className="text-white font-medium mt-0.5">~450MB Working RAM</div>
            </div>
            <div>
              <div className="text-neutral-500 text-[10px]">LICENSE</div>
              <div className="text-emerald-400 font-medium mt-0.5">MIT (Open Source)</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
