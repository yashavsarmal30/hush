'use client';

import React, { useState } from 'react';
import HeroAsciiOne from "@/components/ui/hero-ascii-one";
import { ModernLandingHero } from "@/components/ui/modern-landing-hero";

export default function DemoOne() {
  const [selectedHero, setSelectedHero] = useState<'modern' | 'ascii'>('modern');

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Quick switcher bar */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md shadow-2xl">
        <a
          href="#main"
          className="px-3 py-1 text-xs font-mono rounded-full bg-neutral-800 text-neutral-300 hover:text-white transition-all"
        >
          ← App
        </a>
        <button
          onClick={() => setSelectedHero('modern')}
          className={`px-3 py-1 text-xs font-mono rounded-full transition-all ${
            selectedHero === 'modern' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Modern Hero
        </button>
        <button
          onClick={() => setSelectedHero('ascii')}
          className={`px-3 py-1 text-xs font-mono rounded-full transition-all ${
            selectedHero === 'ascii' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          ASCII Hero
        </button>
      </div>

      {selectedHero === 'modern' ? <ModernLandingHero /> : <HeroAsciiOne />}
    </div>
  );
}
