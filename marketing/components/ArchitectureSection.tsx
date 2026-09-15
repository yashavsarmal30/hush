'use client';

import React, { useState } from "react";
import { Terminal, Cpu, Monitor, Radio, ArrowDown, ArrowUp, ArrowRight, Check, Zap, Layers, RefreshCw } from "lucide-react";

export default function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState<"all" | "electron" | "sidecar" | "ipc">("all");

  return (
    <section id="architecture" className="py-24 sm:py-32 bg-[#040406] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>MODULAR DUAL-PROCESS ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-mono mb-4">
            Engineered for Zero Latency & Zero Cloud
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Hush decouples UI rendering from heavy neural computation. An ultra-lightweight Electron frontend communicates with a headless Python sidecar over high-speed local WebSockets.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl bg-neutral-900/90 p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "all" ? "bg-white text-black font-semibold shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              Full Architecture
            </button>
            <button
              onClick={() => setActiveTab("electron")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "electron" ? "bg-white text-black font-semibold shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              Electron Frontend
            </button>
            <button
              onClick={() => setActiveTab("ipc")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "ipc" ? "bg-white text-black font-semibold shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              WebSocket IPC
            </button>
            <button
              onClick={() => setActiveTab("sidecar")}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === "sidecar" ? "bg-white text-black font-semibold shadow" : "text-neutral-400 hover:text-white"
              }`}
            >
              Python Edge Sidecar
            </button>
          </div>
        </div>

        {/* Visual Architecture Schematic Box */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/15 bg-black/60 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Top Layer: Electron Desktop App */}
          <div className={`transition-all duration-300 rounded-xl border p-6 mb-6 ${
            activeTab === "all" || activeTab === "electron"
              ? "border-purple-500/40 bg-purple-950/10"
              : "border-white/5 bg-neutral-950/40 opacity-40"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-400" />
                <span className="font-mono text-sm sm:text-base font-semibold text-white">
                  ELECTRON DESKTOP APPLICATION (UI PROCESS)
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                React 18 + Tailwind CSS + shadcn/ui
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                <div className="font-mono text-xs font-semibold text-purple-300 mb-1">Floating Transparent Pill Overlay</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Always-on-top, click-through, zero focus stealing window. Renders 18-bar reactive audio amplitude RMS curve at 60 FPS.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                <div className="font-mono text-xs font-semibold text-purple-300 mb-1">Main Settings &amp; History Hub</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Tray icon management, offline model downloader, custom vocabulary dictionary, audio input device selector, and past transcription history.
                </p>
              </div>
            </div>
          </div>

          {/* Middle IPC Connection Layer */}
          <div className={`transition-all duration-300 flex flex-col sm:flex-row items-center justify-between rounded-xl border p-4 my-6 gap-4 ${
            activeTab === "all" || activeTab === "ipc"
              ? "border-emerald-500/40 bg-emerald-950/10 text-emerald-300"
              : "border-white/5 bg-neutral-950/40 opacity-40 text-neutral-500"
          }`}>
            <div className="flex items-center gap-3">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div>
                <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                  HIGH-THROUGHPUT LOCAL WEBSOCKET IPC
                </span>
                <p className="text-[11px] text-neutral-400 font-mono">
                  Endpoint: ws://127.0.0.1:4874 • Zero network hops • Sub-millisecond roundtrip
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-black/50 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                Real-time Waveform Stream
              </span>
              <span className="px-2.5 py-1 rounded bg-black/50 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3 h-3" />
                State Sync (idle/listening/inserted)
              </span>
            </div>
          </div>

          {/* Bottom Layer: Headless Python Engine */}
          <div className={`transition-all duration-300 rounded-xl border p-6 mt-6 ${
            activeTab === "all" || activeTab === "sidecar"
              ? "border-blue-500/40 bg-blue-950/10"
              : "border-white/5 bg-neutral-950/40 opacity-40"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-sm sm:text-base font-semibold text-white">
                  HEADLESS PYTHON ENGINE (SIDECAR PROCESS)
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400 px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                OpenVINO int8 + sounddevice + Win32
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                <div className="font-mono text-xs font-semibold text-blue-300 mb-1">OpenVINO Whisper int8</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Quantized neural speech model executing on raw CPU instructions (AVX-512 / VNNI). Zero GPU required.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                <div className="font-mono text-xs font-semibold text-blue-300 mb-1">Low-Latency Audio Capture</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  16kHz mono ring buffer with continuous RMS calculation and adaptive VAD to reject background silence.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                <div className="font-mono text-xs font-semibold text-blue-300 mb-1">Win32 SendInput Injection</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Direct keyboard events injected at the OS kernel level into whatever window holds focus.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
