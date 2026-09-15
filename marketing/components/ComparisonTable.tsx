'use client';

import React from "react";
import { Check, X, Minus, Sparkles, Shield, Lock, Zap } from "lucide-react";

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 sm:py-32 bg-black border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>HONEST COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-mono mb-4">
            How Hush Compares
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Why pay monthly fees to stream your sensitive voice to cloud servers when your modern CPU can transcribe locally at wire speed?
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-4 px-4 text-neutral-400 font-medium">Capability</th>
                <th className="py-4 px-4 text-white font-bold bg-white/[0.05] rounded-t-xl border-t border-x border-white/20">
                  <div className="flex items-center gap-1.5 text-purple-300">
                    <Sparkles className="w-4 h-4" />
                    HUSH
                  </div>
                </th>
                <th className="py-4 px-4 text-neutral-400 font-medium">Wispr Flow</th>
                <th className="py-4 px-4 text-neutral-400 font-medium">Dragon Professional</th>
                <th className="py-4 px-4 text-neutral-400 font-medium">Cloud Speech APIs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {/* Row 1: Cost */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">Monthly Cost</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-white/20 text-emerald-400 font-bold">
                  $0 / Free &amp; Open Source
                </td>
                <td className="py-4 px-4 text-neutral-400">$12 - $20 / month</td>
                <td className="py-4 px-4 text-neutral-400">$500+ upfront</td>
                <td className="py-4 px-4 text-neutral-400">Pay-per-minute</td>
              </tr>

              {/* Row 2: Voice Audio Streaming */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">Audio Sent to Cloud</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-white/20 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  0 KB (100% Local)
                </td>
                <td className="py-4 px-4 text-red-400">Streams audio to cloud</td>
                <td className="py-4 px-4 text-neutral-300">Local engine</td>
                <td className="py-4 px-4 text-red-400">Streams audio to cloud</td>
              </tr>

              {/* Row 3: Offline Capability */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">Works Completely Offline</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-white/20 text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Yes (Air-gapped ready)
                  </span>
                </td>
                <td className="py-4 px-4 text-neutral-400">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <X className="w-4 h-4" /> No (Requires Internet)
                  </span>
                </td>
                <td className="py-4 px-4 text-neutral-300">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-4 h-4" /> Yes
                  </span>
                </td>
                <td className="py-4 px-4 text-neutral-400">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <X className="w-4 h-4" /> No
                  </span>
                </td>
              </tr>

              {/* Row 4: Hardware Requirements */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">Hardware Requirements</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-white/20 text-white font-medium">
                  Standard CPU (OpenVINO int8)
                </td>
                <td className="py-4 px-4 text-neutral-400">Cloud servers</td>
                <td className="py-4 px-4 text-neutral-400">Heavy legacy footprint</td>
                <td className="py-4 px-4 text-neutral-400">Cloud servers</td>
              </tr>

              {/* Row 5: Keystroke Injection */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">Types Everywhere at Cursor</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-white/20 text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Native SendInput (Any App)
                  </span>
                </td>
                <td className="py-4 px-4 text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Yes
                  </span>
                </td>
                <td className="py-4 px-4 text-neutral-400">Limited apps / hooks</td>
                <td className="py-4 px-4 text-neutral-400">No (API only)</td>
              </tr>

              {/* Row 6: Hindi + Hinglish auto-detection */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">Hindi + Hinglish Normalization</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-white/20 text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Built-in Devanagari norm
                  </span>
                </td>
                <td className="py-4 px-4 text-neutral-400">Limited support</td>
                <td className="py-4 px-4 text-neutral-400">Expensive add-on</td>
                <td className="py-4 px-4 text-neutral-400">Separate models</td>
              </tr>

              {/* Row 7: Open Source */}
              <tr>
                <td className="py-4 px-4 font-sans text-neutral-300 font-medium">License / Code Transparency</td>
                <td className="py-4 px-4 bg-white/[0.05] border-x border-b border-white/20 rounded-b-xl text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    100% MIT Open Source
                  </span>
                </td>
                <td className="py-4 px-4 text-neutral-400">Closed Proprietary</td>
                <td className="py-4 px-4 text-neutral-400">Closed Proprietary</td>
                <td className="py-4 px-4 text-neutral-400">Closed Proprietary</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
