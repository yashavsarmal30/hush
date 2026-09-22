import React, { useState, useEffect } from "react";
import { Mic, Radio, Minus, Square, X, Volume2, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DictationState, EngineState } from "@/types/hush";

interface HeaderProps {
  state: DictationState;
  stateMessage: string;
  engineState: EngineState;
  recording: boolean;
  activeModel: string;
  connected: boolean;
  handsFreeMode: boolean;
  onToggleDictation: () => void;
  onToggleHandsFree: () => void;
}

export function Header({
  state,
  stateMessage,
  engineState,
  recording,
  activeModel,
  connected,
  handsFreeMode,
  onToggleDictation,
  onToggleHandsFree,
}: HeaderProps) {
  const [updateVersion, setUpdateVersion] = useState<string | null>(null);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const api = (window as any).electronAPI;
    if (api?.onUpdateAvailable) {
      api.onUpdateAvailable((version: string) => {
        setUpdateVersion(version);
      });
    }
    if (api?.onUpdateDownloaded) {
      api.onUpdateDownloaded((version: string) => {
        setUpdateVersion(version);
        setUpdateReady(true);
      });
    }
  }, []);

  const handleInstallUpdate = () => {
    (window as any).electronAPI?.installUpdate?.();
  };

  const handleMinimize = () => {
    (window as any).electronAPI?.minimize();
  };

  const handleClose = () => {
    (window as any).electronAPI?.close();
  };

  return (
    <header className="draggable-region flex items-center justify-between px-6 py-3.5 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md select-none">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shadow-sm flex items-center justify-center bg-neutral-900">
          <img src="/icon.png" alt="Hush" className="w-7 h-7 object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white">Hush</h1>
          </div>
          <p className="text-[11px] text-neutral-400 font-medium">
            100% Offline Edge
          </p>
        </div>
      </div>

      {/* Center status & Quick Dictate CTA */}
      <div className="flex items-center gap-3 non-draggable-region">
        {/* Engine readiness badge */}
        <button
          onClick={() => {
            if (!connected) {
              (window as any).electronAPI?.restartEngine?.();
            }
          }}
          className={cn(
            "flex items-center gap-2 bg-neutral-900/80 px-3 py-1 rounded-full border border-white/5 transition-colors",
            !connected && "hover:bg-neutral-800 cursor-pointer"
          )}
          title={!connected ? "Connecting… (Click to retry engine connection)" : undefined}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              !connected
                ? "bg-amber-400 animate-pulse"
                : engineState === "ready"
                ? "bg-emerald-400"
                : engineState === "loading"
                ? "bg-blue-400 animate-pulse"
                : engineState === "empty" || engineState === "unloaded"
                ? "bg-amber-400/80"
                : "bg-red-400"
            )}
          />
          <span className="text-xs font-medium text-neutral-300">
            {!connected
              ? "Connecting…"
              : engineState === "ready"
              ? "Engine ready"
              : engineState === "loading"
              ? "Loading model…"
              : engineState === "empty" || engineState === "unloaded"
              ? "No model loaded"
              : "Engine error"}
          </span>
          {activeModel && (
            <span className="text-[11px] text-neutral-500 font-mono">
              ({activeModel})
            </span>
          )}
        </button>

        {/* Hands-Free mode toggle badge button */}
        <button
          onClick={onToggleHandsFree}
          className={cn(
            "relative z-10 cursor-pointer px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border",
            handsFreeMode
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              : "bg-neutral-900/80 text-neutral-400 border-white/5 hover:text-white hover:bg-neutral-800"
          )}
          title={handsFreeMode ? "Hands-free mode active (Click to switch to hold mode)" : "Click to enable Hands-free mode"}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", handsFreeMode ? "bg-emerald-400" : "bg-neutral-600")} />
          <span>{handsFreeMode ? "Hands-free ON" : "Hands-free OFF"}</span>
        </button>

        {/* Primary Dictate Button */}
        <Button
          onClick={onToggleDictation}
          size="sm"
          variant={recording ? "destructive" : "default"}
          className={cn(
            "relative z-10 cursor-pointer gap-2 font-semibold shadow-pill-float transition-transform",
            recording && "animate-pulse"
          )}
        >
          <Mic className={cn("w-3.5 h-3.5", recording && "animate-bounce")} />
          <span>{recording ? "Stop Dictation" : "Dictate Now"}</span>
        </Button>
      </div>

      {/* Right controls: Privacy badge + Update Button + Window controls */}
      <div className="flex items-center gap-2 non-draggable-region">
        {updateReady ? (
          <Button
            onClick={handleInstallUpdate}
            size="sm"
            className="relative z-10 cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full gap-1.5 animate-pulse shadow-md"
            title="Update downloaded! Click to restart and install"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install Update</span>
          </Button>
        ) : updateVersion ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-medium animate-pulse">
            <Download className="w-3 h-3 animate-bounce" />
            <span>Downloading v{updateVersion}…</span>
          </div>
        ) : null}

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20 mr-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Private</span>
        </div>

        {/* Window action buttons if in Electron */}
        <button
          onClick={handleMinimize}
          className="relative z-10 cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleClose}
          className="relative z-10 cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500/20 hover:text-red-400 text-neutral-400 transition-colors"
          title="Close to tray"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
