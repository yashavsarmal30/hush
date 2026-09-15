'use client';

import React, { useState, useEffect, useRef } from "react";
import { Mic, Square, X, Check, Loader2, Sparkles, Volume2, Copy, RotateCcw, Keyboard, Terminal, ShieldCheck, Zap } from "lucide-react";
import confetti from "canvas-confetti";

const BAR_COUNT = 18;

const SAMPLE_PROMPTS = [
  {
    lang: "English (Engineering)",
    text: "Refactor the authentication middleware to use JWT with RS256 signing and verify session revocation via Redis.",
  },
  {
    lang: "English (Executive)",
    text: "Please send the Q3 roadmap deck to all investors by Thursday morning with our revised edge-AI privacy benchmarks.",
  },
  {
    lang: "Hindi / Hinglish (Bilingual)",
    text: "आज की मीटिंग के सारे पॉइंट्स डॉक्स में सेव कर दो और टीम को स्लैक पर अपडेट भेज दो।",
  },
  {
    lang: "English (Documentation)",
    text: "Hush executes 100% offline using Intel OpenVINO int8 quantization. No audio leaves your machine.",
  }
];

export default function InteractivePillDemo() {
  const [state, setState] = useState<"idle" | "listening" | "processing" | "inserted">("idle");
  const [mode, setMode] = useState<"regular" | "handsfree">("regular");
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isHolding, setIsHolding] = useState(false);
  const [timerSecs, setTimerSecs] = useState(0);
  const [copied, setCopied] = useState(false);
  const [waveformNoise, setWaveformNoise] = useState(0.4);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer counter while listening
  useEffect(() => {
    if (state === "listening") {
      setTimerSecs(0);
      timerRef.current = setInterval(() => {
        setTimerSecs((s) => s + 1);
      }, 1000);

      // Simulate dynamic microphone RMS volume
      audioIntervalRef.current = setInterval(() => {
        setWaveformNoise(0.3 + Math.random() * 0.7);
      }, 80);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setTimerSecs(0);
      setWaveformNoise(0.1);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [state]);

  // Handle simulated dictation flow
  const startListening = () => {
    if (state === "listening") return;
    setTypedText("");
    setState("listening");
  };

  const stopAndTranscribe = () => {
    if (state !== "listening") return;
    setState("processing");

    // Simulate OpenVINO Whisper int8 transcription speed (approx 400ms)
    setTimeout(() => {
      setState("inserted");
      const targetText = SAMPLE_PROMPTS[selectedPromptIndex].text;
      
      // Stream text letter by letter
      let currentIdx = 0;
      setTypedText("");
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      
      typingIntervalRef.current = setInterval(() => {
        if (currentIdx < targetText.length) {
          setTypedText(targetText.slice(0, currentIdx + 1));
          currentIdx++;
        } else {
          if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
          try {
            confetti({
              particleCount: 30,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) {}
        }
      }, 18);
    }, 450);
  };

  const cancelDictation = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setState("idle");
    setTypedText("");
  };

  // Render 18-bar waveform
  const renderWaveform = () => {
    return Array.from({ length: BAR_COUNT }).map((_, i) => {
      const center = BAR_COUNT / 2;
      const dist = Math.abs(i - center) / center;
      const curveWeight = Math.max(0.2, 1 - dist * 0.75);
      
      const wave = Math.sin((i * 1.5) + Date.now() / 150) * 0.2;
      const heightMult = Math.min(1.0, Math.max(0.15, (waveformNoise + wave) * curveWeight));
      const heightPx = Math.max(4, Math.round(heightMult * 26));

      return (
        <div
          key={i}
          className="w-[3px] rounded-full bg-white transition-all duration-75 ease-out shadow-[0_0_6px_rgba(255,255,255,0.4)]"
          style={{ height: `${state === "listening" ? heightPx : 4}px` }}
        />
      );
    });
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = () => {
    if (!typedText) return;
    navigator.clipboard.writeText(typedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className="relative py-24 sm:py-32 bg-black border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-mono mb-4">
            Test the Floating Capsule in Action
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Experience how Hush behaves on your desktop. Click and hold the talk button, watch the 18-bar reactive audio waveform dance, and see offline OpenVINO transcribe directly into the active editor.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-neutral-950/80 shadow-[0_0_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden">
          
          {/* Top Control Settings Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Mode:</span>
              <div className="flex rounded-lg bg-neutral-900 p-0.5 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setMode("regular")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    mode === "regular" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Hold-to-Talk (Ctrl+Win)
                </button>
                <button
                  onClick={() => setMode("handsfree")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    mode === "handsfree" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Hands-Free (Ctrl+Alt+D)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Sample Phrase:</span>
              <select
                value={selectedPromptIndex}
                onChange={(e) => setSelectedPromptIndex(Number(e.target.value))}
                className="bg-neutral-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-neutral-300 focus:outline-none focus:border-white/40"
              >
                {SAMPLE_PROMPTS.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Screen Preview Area */}
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-[#09090c] to-[#040406] relative">
            
            {/* The Actual Hush Floating Capsule (Exact replica of Electron OverlayPill) */}
            <div className="mb-10 w-full flex justify-center">
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-xl shadow-2xl ${
                  state === "listening"
                    ? "bg-neutral-900/95 border-white/30 ring-2 ring-white/10 scale-105"
                    : state === "processing"
                    ? "bg-neutral-900/90 border-blue-500/40"
                    : state === "inserted"
                    ? "bg-neutral-900/90 border-emerald-500/40"
                    : "bg-neutral-900/80 border-white/10 hover:border-white/20"
                }`}
              >
                {/* State: IDLE */}
                {state === "idle" && (
                  <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-300">
                    <Mic className="w-4 h-4 text-purple-400" />
                    <span>Hush Ready</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-400">
                      {mode === "regular" ? "HOLD CTRL+WIN" : "CTRL+ALT+D"}
                    </span>
                  </div>
                )}

                {/* State: LISTENING */}
                {state === "listening" && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-mono text-white min-w-[28px]">
                        {formatTimer(timerSecs)}
                      </span>
                    </div>

                    {/* 18-bar reactive audio waveform */}
                    <div className="flex items-center gap-[3px] h-7 px-1">
                      {renderWaveform()}
                    </div>

                    {/* Controls in Hands-Free mode */}
                    {mode === "handsfree" && (
                      <div className="flex items-center gap-1.5 ml-1 border-l border-white/20 pl-2">
                        <button
                          onClick={stopAndTranscribe}
                          title="Stop and transcribe"
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          <Square className="w-3 h-3 fill-current" />
                        </button>
                        <button
                          onClick={cancelDictation}
                          title="Cancel"
                          className="p-1 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* State: PROCESSING */}
                {state === "processing" && (
                  <div className="flex items-center gap-2.5 text-xs font-mono text-blue-300">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    <span>OpenVINO Transcribing...</span>
                  </div>
                )}

                {/* State: INSERTED */}
                {state === "inserted" && (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Injected via SendInput</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mock Editor Window receiving keystrokes directly at cursor */}
            <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#070709] overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                  <span>active_document.md — Active Cursor Focus</span>
                </div>
                {typedText && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-neutral-400 hover:text-white rounded bg-white/5 border border-white/10"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={cancelDictation}
                      className="p-1 text-neutral-400 hover:text-white rounded bg-white/5"
                      title="Clear"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed min-h-[110px] text-neutral-200">
                {typedText ? (
                  <span>
                    {typedText}
                    <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse align-middle" />
                  </span>
                ) : state === "listening" ? (
                  <span className="text-neutral-500 italic flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-400 animate-bounce" />
                    Listening to speech audio... releasing hotkey will transcribe instantly...
                  </span>
                ) : (
                  <span className="text-neutral-600">
                    Click and hold the button below or press hotkey to watch Hush inject text directly into this active window.
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {mode === "regular" ? (
                <button
                  onMouseDown={() => {
                    setIsHolding(true);
                    startListening();
                  }}
                  onMouseUp={() => {
                    setIsHolding(false);
                    stopAndTranscribe();
                  }}
                  onTouchStart={() => {
                    setIsHolding(true);
                    startListening();
                  }}
                  onTouchEnd={() => {
                    setIsHolding(false);
                    stopAndTranscribe();
                  }}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-sm font-semibold transition-all select-none shadow-lg ${
                    isHolding
                      ? "bg-red-500 text-white scale-95 shadow-red-500/30"
                      : "bg-white text-black hover:bg-neutral-200 active:scale-95"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isHolding ? "Release to Transcribe" : "Hold to Talk (Simulate Ctrl+Win)"}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (state === "listening") {
                      stopAndTranscribe();
                    } else {
                      startListening();
                    }
                  }}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-sm font-semibold transition-all shadow-lg ${
                    state === "listening"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{state === "listening" ? "Click to Stop & Transcribe" : "Toggle Hands-Free (Ctrl+Alt+D)"}</span>
                </button>
              )}
            </div>

          </div>

          {/* Bottom Live Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10 bg-neutral-900/60 p-4 text-center">
            <div className="p-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-mono mb-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>INFERENCE LATENCY</span>
              </div>
              <p className="text-xl font-bold font-mono text-white">&lt;140ms</p>
              <p className="text-[10px] text-neutral-500 font-mono">OpenVINO int8 on CPU</p>
            </div>
            <div className="p-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-mono mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>CLOUD TELEMETRY</span>
              </div>
              <p className="text-xl font-bold font-mono text-emerald-400">0.00 KB</p>
              <p className="text-[10px] text-neutral-500 font-mono">Never leaves device RAM</p>
            </div>
            <div className="p-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-mono mb-1">
                <Keyboard className="w-3.5 h-3.5 text-purple-400" />
                <span>FOCUS STEALING</span>
              </div>
              <p className="text-xl font-bold font-mono text-white">0 ms</p>
              <p className="text-[10px] text-neutral-500 font-mono">Native Win32 SendInput</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
