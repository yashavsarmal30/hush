'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, Command, Search, Shield, Zap, Cpu, Sparkles, Terminal } from "lucide-react";

interface ModernLandingHeroProps {
  className?: string;
}

export const ModernLandingHero: React.FC<ModernLandingHeroProps> = ({ className }) => {
  return (
    <section className={cn("relative flex min-h-[92vh] w-full flex-col items-center bg-black font-sans text-white selection:bg-white selection:text-black overflow-hidden", className)}>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Ultra-minimal navigation border */}
      <div className="absolute top-0 w-full border-b border-white/[0.08] h-16 bg-black/60 backdrop-blur-md z-20" />

      <main className="flex w-full max-w-[1100px] flex-col items-center px-4 sm:px-6 pt-28 sm:pt-36 text-center z-10">
        
        {/* Pill Badge - Linear / Wispr inspired */}
        <a 
          href="https://github.com/yashavsarmal30/hush"
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-8 flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] py-1.5 pl-1.5 pr-3 text-xs font-medium text-neutral-300 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20"
        >
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
            v1.0.0
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Unbound Edge-Native Voice Engine
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
        </a>

        {/* Headline - High impact typography */}
        <h1 className="mb-6 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Speak freely. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600">
            Type anywhere with 100% offline AI.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-[720px] text-balance text-base leading-relaxed text-neutral-400 sm:text-lg">
          The private, zero-latency alternative to Wispr Flow and Dragon. OpenVINO int8 Whisper running directly on your CPU. Injects keystrokes into VS Code, Slack, Word, Google Docs, and Terminals without stealing focus.
        </p>

        {/* Call to Actions */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row mb-14">
          <a
            href="#download"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-[0.98] sm:w-auto"
          >
            Download Windows Installer
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#interactive-demo"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.02] px-7 text-sm font-medium text-white transition-all hover:bg-white/[0.06] hover:border-white/30 active:scale-[0.98] sm:w-auto"
          >
            Try Live Capsule Simulator
          </a>
        </div>

        {/* Key Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-12">
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-neutral-300">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>0KB Sent to Cloud</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-neutral-300">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span>OpenVINO CPU Quant</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-neutral-300">
            <Zap className="h-3.5 w-3.5 text-yellow-400" />
            <span>&lt;180ms Latency</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-neutral-300">
            <Command className="h-3.5 w-3.5 text-purple-400" />
            <span>Native SendInput Hook</span>
          </div>
        </div>

        {/* 
          Mock UI Component / Bento Terminal Element
          Provides real-world context and visual weight
        */}
        <div className="w-full max-w-4xl rounded-xl border border-white/[0.12] bg-[#08080a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-left">
          {/* Mock Window Header */}
          <div className="flex items-center gap-4 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/30 border border-red-500/40" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/30 border border-yellow-500/40" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/30 border border-emerald-500/40" />
            </div>
            
            {/* Mock Command Palette */}
            <div className="mx-auto flex h-7 w-full max-w-md items-center gap-2 rounded-md border border-white/[0.08] bg-black/50 px-3 text-xs text-neutral-400">
              <Search className="h-3.5 w-3.5 text-neutral-500" />
              <span className="truncate">Hush Sidecar Engine [127.0.0.1:4874]</span>
              <div className="ml-auto flex items-center gap-1 font-mono text-[10px] text-neutral-500 border border-neutral-700 px-1.5 py-0.5 rounded">
                <span>ONLINE</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <Terminal className="h-3.5 w-3.5 text-neutral-500" />
              <span>bash</span>
            </div>
          </div>
          
          {/* Mock Terminal/Console Window */}
          <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-neutral-400 space-y-2 bg-[#060608]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">hush-user@desktop</span>
              <span className="text-neutral-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ hush --engine=openvino-whisper --quant=int8</span>
            </div>
            <div className="pt-2 text-neutral-400 space-y-1">
              <p className="text-emerald-400/90">✔ [AUDIO] sounddevice 16kHz mono stream initialized with low-latency ring buffer</p>
              <p className="text-blue-400/90">✔ [MODEL] Loaded Whisper OpenVINO int8 on CPU (0.0 MB cloud telemetry)</p>
              <p className="text-purple-400/90">✔ [HOOKS] Registered global keyboard chords: [Ctrl+Win] Regular, [Ctrl+Alt+D] Hands-Free</p>
              <p className="text-neutral-400">✔ [INJECT] Win32 SendInput dispatch primed for elevated & standard windows</p>
              <p className="text-amber-400/90">✔ [LANG] Auto-detection active: English, Hindi, Hinglish (Devanagari normalized)</p>
            </div>
            <div className="pt-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">Hush ready. Press [Ctrl+Win] anywhere to dictate.</span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ModernLandingHero;
