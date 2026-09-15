'use client';

import React from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Keyboard, 
  Globe, 
  Activity, 
  BookA, 
  Layers, 
  Sliders,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function FeaturesBento() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>UNCOMPROMISED ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-mono mb-4">
            Engineered for Flow. Built for Privacy.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Hush pairs local quantized neural inference with native OS input injection, delivering the speed of cloud dictation without handing your voice to third-party servers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">

          {/* Feature 1: 100% Local OpenVINO AI (Large card, 8 cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-neutral-950/60 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="mb-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-mono mb-2">
                100% Offline Intel OpenVINO int8 Inference
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                OpenAI Whisper runs natively on your CPU using Intel OpenVINO int8 quantization. No high-end NVIDIA GPU required, no network connection necessary, and zero recurring cloud API bills.
              </p>
            </div>

            {/* Visual preview pill & metrics */}
            <div className="rounded-xl border border-white/10 bg-neutral-900/80 p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-400 text-[11px] pb-2 border-b border-white/10">
                <span>BENCHMARK (INTEL CORE i5 / i7 / AMD RYZEN)</span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-black/40 p-2 rounded">
                  <div className="text-neutral-500 text-[10px]">INFERENCE SPEED</div>
                  <div className="text-white font-bold text-sm">~1.2s / 10s speech</div>
                </div>
                <div className="bg-black/40 p-2 rounded">
                  <div className="text-neutral-500 text-[10px]">RAM USAGE</div>
                  <div className="text-white font-bold text-sm">~450 MB</div>
                </div>
                <div className="bg-black/40 p-2 rounded">
                  <div className="text-neutral-500 text-[10px]">EXTERNAL NETWORK</div>
                  <div className="text-emerald-400 font-bold text-sm">0 BYTES</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Zero Focus Stealing SendInput (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400">
                <Keyboard className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-mono mb-2">
                Types at Cursor Without Focus Stealing
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Hush floats transparently over your desktop. When you release your hotkey, keystrokes are directly dispatched to your active application via native Win32 <code className="text-white bg-white/10 px-1 py-0.5 rounded text-xs">SendInput</code>.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">VS Code</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Slack</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Excel</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Terminal</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Docs</span>
            </div>
          </div>

          {/* Feature 3: Dual Dictation Modes (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-mono mb-2">
                Dual Dictation Workflows
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Choose between instant hold-to-talk (<span className="text-white font-mono">Ctrl+Win</span>) for quick messages and hands-free continuous dictation (<span className="text-white font-mono">Ctrl+Alt+D</span>) with pause and stop controls.
              </p>
            </div>
            <div className="mt-6 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Regular Mode: Release to type</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hands-Free: Extended talking sessions</span>
              </div>
            </div>
          </div>

          {/* Feature 4: Hindi + Hinglish Bilingual Support (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-mono mb-2">
                Seamless Hindi, English & Hinglish
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Automatic language detection per spoken phrase. Whisper mistaken Urdu output is automatically normalized back to proper left-to-right Devanagari script.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-neutral-900 border border-white/10 font-mono text-xs">
              <p className="text-neutral-500 text-[10px]">AUTO SCRIPT NORMALIZATION</p>
              <p className="text-amber-300 mt-1">नमस्ते दुनिया, यह पूरी तरह से ऑफलाइन है।</p>
            </div>
          </div>

          {/* Feature 5: Absolute Zero Telemetry (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-8 flex flex-col justify-between group hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 text-red-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-mono mb-2">
                Absolute Air-Gapped Privacy
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                No user account. No credit cards. No analytics tracking. No telemetry. Your voice stays inside volatile memory and is purged as soon as transcription completes.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Air-gap and offline compliant</span>
            </div>
          </div>

          {/* Feature 6: Custom Dictionary & Vocabulary (12 cols bottom banner) */}
          <div className="lg:col-span-12 rounded-2xl border border-white/10 bg-neutral-950/60 p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group hover:border-white/20 transition-all">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2">
                <BookA className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-semibold text-white font-mono">
                  Personalized Dictionary & Snippet Expander
                </h3>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Teach Hush your company&apos;s product names, acronyms, and technical jargon. Replace phonetic pronunciations with exact capitalizations or expand spoken shortcuts into multi-line code snippets.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                &quot;gh action&quot; ➔ GitHub Actions
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                &quot;kube ctl&quot; ➔ kubectl
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                &quot;pr review&quot; ➔ Pull Request
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
