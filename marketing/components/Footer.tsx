'use client';

import React from "react";
import { Github, Heart, ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-neutral-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-bold tracking-wider text-white">HUSH</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">
                v1.0.0
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Unbound Edge-Native Voice Engine. A fast, private, 100% offline alternative to cloud dictation tools. No telemetry, no accounts, no subscriptions.
            </p>
            <div className="flex items-center gap-4 text-neutral-400 text-xs font-mono pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                100% Offline
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Cpu className="w-4 h-4" />
                OpenVINO int8
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#interactive-demo" className="hover:text-white transition-colors">Interactive Demo</a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">System Architecture</a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">Comparison</a>
              </li>
              <li>
                <a href="#download" className="hover:text-white transition-colors">Download Installer</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Open Source */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-white tracking-wider uppercase">Open Source</h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a 
                  href="https://github.com/yashavsarmal30/hush" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yashavsarmal30/hush/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Releases &amp; Changelog
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yashavsarmal30/hush/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/yashavsarmal30/hush/blob/main/LICENSE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Hush. Released under the MIT License.</p>
          <p className="flex items-center gap-1">
            Built for developers with extreme focus &amp; zero compromises.
          </p>
        </div>
      </div>
    </footer>
  );
}
