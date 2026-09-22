import React, { useState, useEffect } from "react";
import { Mic, Check, AlertCircle, Loader2, Square, X, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DictationState } from "@/types/hush";

interface OverlayPillProps {
  state: DictationState;
  stateMessage: string;
  micLevel: number;
  holdChord: string;
  handsFreeMode: boolean;
  onStart: () => void;
  onStop: () => void;
  onCancel: () => void;
  onToggleHandsFree?: () => void;
  onOpenMain?: () => void;
}

const BAR_COUNT = 18;

export function OverlayPill({
  state,
  stateMessage,
  micLevel,
  holdChord,
  handsFreeMode,
  onStart,
  onStop,
  onCancel,
  onToggleHandsFree,
  onOpenMain,
}: OverlayPillProps) {
  const [timerSecs, setTimerSecs] = useState(0);

  // Timer while listening
  useEffect(() => {
    let interval: any = null;
    if (state === "listening") {
      setTimerSecs(0);
      interval = setInterval(() => {
        setTimerSecs((s) => s + 1);
      }, 1000);
    } else {
      setTimerSecs(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate bar heights dynamically from micLevel
  const renderWaveform = () => {
    return Array.from({ length: BAR_COUNT }).map((_, i) => {
      const center = BAR_COUNT / 2;
      const dist = Math.abs(i - center) / center;
      const curveWeight = Math.max(0.2, 1 - dist * 0.75);
      
      const noise = Math.sin((i * 1.7) + Date.now() / 200) * 0.15;
      const heightMultiplier = Math.min(1.0, Math.max(0.12, (micLevel * 1.5 + noise) * curveWeight));
      const heightPx = Math.max(4, Math.round(heightMultiplier * 22));

      return (
        <div
          key={i}
          className="w-[3px] rounded-full bg-white transition-all duration-75 ease-out"
          style={{ height: `${heightPx}px` }}
        />
      );
    });
  };

  return (
    <div className="flex items-center justify-center p-0 m-0 select-none bg-transparent">
      <div
        className={cn(
          "glass-pill draggable-region flex items-center gap-3 px-3.5 py-1.5 rounded-full transition-all duration-200 ease-out shadow-2xl",
          state === "listening" && "border-red-500/30 bg-[#131316]",
          state === "error" && "border-red-500/40",
          state === "inserted" && "border-emerald-500/40"
        )}
      >
        {/* State: LISTENING */}
        {state === "listening" && (
          <div className="flex items-center gap-3 non-draggable-region">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-mono text-neutral-300 min-w-[26px]">
                {formatTimer(timerSecs)}
              </span>
            </div>

            {/* Audio Waveform Bars */}
            <div className="flex items-center gap-[3px] h-6 px-1">
              {renderWaveform()}
            </div>

            {/* Hands-Free Mode only: Display Stop and Cancel buttons */}
            {handsFreeMode && (
              <div className="flex items-center gap-1.5 pl-1 animate-in fade-in">
                <button
                  onClick={onStop}
                  title="Finish dictation"
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-black hover:bg-neutral-200 transition-transform active:scale-95 shadow-sm"
                >
                  <Square className="w-2 h-2 fill-black" />
                </button>
                <button
                  onClick={onCancel}
                  title="Cancel dictation"
                  className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* State: TRANSCRIBING */}
        {state === "transcribing" && (
          <div className="flex items-center gap-2 px-1 py-0.5 non-draggable-region">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-300" />
            <span className="text-xs font-medium text-neutral-200">
              Transcribing…
            </span>
          </div>
        )}

        {/* State: INSERTED */}
        {state === "inserted" && (
          <div className="flex items-center gap-2 px-1 py-0.5 non-draggable-region">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </div>
            <span className="text-xs font-medium text-white">
              Inserted
            </span>
          </div>
        )}

        {/* State: ERROR */}
        {state === "error" && (
          <div className="flex items-center gap-2 px-1 py-0.5 non-draggable-region">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-neutral-200 font-medium max-w-[200px] truncate">
              {stateMessage || "Dictation error"}
            </span>
          </div>
        )}

        {/* State: IDLE / STANDBY */}
        {state === "idle" && (
          <div className="flex items-center gap-2 non-draggable-region">
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-1 hover:opacity-90 transition-opacity cursor-pointer"
              title="Click to dictate (or use hotkey)"
            >
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Mic className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">
                Hush
              </span>
            </button>

            {/* Subtle hands-free toggle dot */}
            {onToggleHandsFree && (
              <button
                onClick={onToggleHandsFree}
                className={cn(
                  "p-1 rounded-full text-[10px] transition-all flex items-center cursor-pointer",
                  handsFreeMode
                    ? "text-emerald-400 bg-emerald-500/20"
                    : "text-neutral-400 hover:text-white"
                )}
                title={handsFreeMode ? "Hands-free active" : "Enable hands-free"}
              >
                <Sparkles className="w-3 h-3" />
              </button>
            )}

            {/* Expand / open main app hub */}
            {onOpenMain && (
              <button
                onClick={onOpenMain}
                className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
                title="Open Dashboard"
              >
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
