'use client';

import React from 'react';
import HeroAsciiOne from "@/components/ui/hero-ascii-one";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AsciiDemoPage() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white backdrop-blur-md hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>
      </div>
      <HeroAsciiOne />
    </div>
  );
}
