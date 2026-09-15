'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Download, Sparkles, Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-white/15 p-1.5 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <div className="w-5 h-5 relative">
              <img
                src="/logo.png"
                alt="Hush Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold tracking-wider text-white flex items-center gap-1.5">
              HUSH
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 font-normal">v1.0</span>
            </span>
            <span className="text-[9px] font-mono text-neutral-400 -mt-1 tracking-tight">EDGE-NATIVE VOICE</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#interactive-demo" className="hover:text-white transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Live Demo
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Architecture
          </a>
          <a href="#comparison" className="hover:text-white transition-colors">
            Comparison
          </a>
          <a href="#download" className="hover:text-white transition-colors">
            Download
          </a>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/yashavsarmal30/hush"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="#download"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs transition-all hover:bg-neutral-200 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get Hush Free</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg border border-white/10 bg-white/5"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 border-b border-white/10 px-6 py-5 space-y-4 backdrop-blur-xl">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#interactive-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-purple-400 hover:text-purple-300"
          >
            Interactive Demo
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Architecture
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Comparison
          </a>
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Download
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://github.com/yashavsarmal30/hush"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-neutral-300"
            >
              <Github className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-semibold text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
