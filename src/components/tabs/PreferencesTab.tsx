import React, { useState, useEffect } from "react";
import { Mic, Volume2, Play, Sliders, FolderOpen, RotateCcw, Power, Check, Download, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { HushConfig } from "@/types/hush";

interface PreferencesTabProps {
  config: HushConfig;
  devices: string[];
  meterLevel: number;
  onUpdateConfig: (key: keyof HushConfig, value: any) => void;
  onStartMeter: () => void;
  onStopMeter: () => void;
  onPlaySound: (which: "start" | "stop") => void;
}

export function PreferencesTab({
  config,
  devices,
  meterLevel,
  onUpdateConfig,
  onStartMeter,
  onStopMeter,
  onPlaySound,
}: PreferencesTabProps) {
  const [updateVersion, setUpdateVersion] = useState<string | null>(null);
  const [updateReady, setUpdateReady] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  // Start mic meter while preferences tab is mounted
  useEffect(() => {
    onStartMeter();
    return () => {
      onStopMeter();
    };
  }, [onStartMeter, onStopMeter]);

  useEffect(() => {
    const api = (window as any).electronAPI;
    if (api?.onUpdateAvailable) {
      api.onUpdateAvailable((version: string) => {
        setUpdateVersion(version);
        setCheckingUpdate(false);
      });
    }
    if (api?.onUpdateDownloaded) {
      api.onUpdateDownloaded((version: string) => {
        setUpdateVersion(version);
        setUpdateReady(true);
        setCheckingUpdate(false);
      });
    }
    if (api?.onUpdateNotAvailable) {
      api.onUpdateNotAvailable(() => {
        setCheckingUpdate(false);
      });
    }
    if (api?.onUpdateError) {
      api.onUpdateError(() => {
        setCheckingUpdate(false);
      });
    }
  }, []);

  const handleCheckUpdate = () => {
    setCheckingUpdate(true);
    toast.info("Checking for updates…");
    const api = (window as any).electronAPI;
    if (api?.checkUpdate) {
      api.checkUpdate();
    } else {
      setTimeout(() => {
        setCheckingUpdate(false);
        toast.info("Hush is up to date (v1.0.2)");
      }, 800);
    }
  };

  const handleInstallUpdate = () => {
    (window as any).electronAPI?.installUpdate?.();
  };

  const handleOpenDataDir = () => {
    (window as any).electronAPI?.openDataFolder();
    toast.info("Opened Hush data folder");
  };

  return (
    <div className="space-y-4">
      {/* Microphone Selection & Calibration */}
      <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Mic className="w-4 h-4 text-neutral-300" />
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Audio Input Device
          </h4>
        </div>

        <select
          value={config.input_device || "System default"}
          onChange={(e) => {
            const val = e.target.value === "System default" ? null : e.target.value;
            onUpdateConfig("input_device", val);
            toast.success("Input device updated");
          }}
          className="w-full h-9 bg-neutral-800/80 border border-white/10 text-white rounded-xl px-3 text-xs focus:outline-none focus:ring-1 focus:ring-white/30"
        >
          <option value="System default" className="bg-neutral-900 text-white">
            System default
          </option>
          {devices.map((d, i) => (
            <option key={i} value={d} className="bg-neutral-900 text-white">
              {d}
            </option>
          ))}
        </select>

        {/* Live calibration meter */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[11px] text-neutral-400 font-medium">
            <span>Microphone Sensitivity Level</span>
            <span>{Math.round(meterLevel * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 transition-all duration-75 rounded-full"
              style={{ width: `${Math.min(100, Math.round(meterLevel * 100))}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Typing & Insertion Options */}
      <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="w-4 h-4 text-neutral-300" />
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Typing & Dictation Behavior
          </h4>
        </div>

        {/* Injection Mode */}
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div>
            <p className="text-xs font-medium text-white">Text Insertion Method</p>
            <p className="text-[11px] text-neutral-400">
              Simulated typing works where paste is disabled; paste is instant for long paragraphs.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-800/80 p-1 rounded-full border border-white/5">
            <button
              onClick={() => onUpdateConfig("injection", "type")}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                config.injection === "type"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              Typing
            </button>
            <button
              onClick={() => onUpdateConfig("injection", "paste")}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                config.injection === "paste"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              Paste
            </button>
          </div>
        </div>

        {/* Hands-Free Mode switch */}
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <div>
            <p className="text-xs font-medium text-white">Hands-Free Dictation Mode</p>
            <p className="text-[11px] text-neutral-400">
              Start dictating hands-free without holding keys down. Displays Stop and Cancel controls on the floating capsule.
            </p>
          </div>
          <Switch
            checked={Boolean(config.hands_free_mode)}
            onCheckedChange={(v) => onUpdateConfig("hands_free_mode", v)}
          />
        </div>

        {/* Remove filler words switch */}
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <div>
            <p className="text-xs font-medium text-white">Remove Filler Words</p>
            <p className="text-[11px] text-neutral-400">
              Automatically strips "um", "uh", "ah", and repetitions from final text.
            </p>
          </div>
          <Switch
            checked={config.strip_fillers}
            onCheckedChange={(v) => onUpdateConfig("strip_fillers", v)}
          />
        </div>

        {/* Live typing in toggle mode switch */}
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <div>
            <p className="text-xs font-medium text-white">Type as I Speak (Live Dictation)</p>
            <p className="text-[11px] text-neutral-400">
              Streams words at your cursor in real time while using the toggle hotkey.
            </p>
          </div>
          <Switch
            checked={config.live_typing}
            onCheckedChange={(v) => onUpdateConfig("live_typing", v)}
          />
        </div>

        {/* Sound effects switch & previews */}
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <div>
            <p className="text-xs font-medium text-white">Start & Stop Audio Feedback</p>
            <p className="text-[11px] text-neutral-400">
              Play subtle chimes when dictation starts and stops.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPlaySound("start")}
                className="h-7 px-2.5 rounded-full text-[10px] border-white/10 hover:bg-neutral-800 gap-1"
                title="Preview start chime"
              >
                <Play className="w-2.5 h-2.5" />
                <span>Start chime</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPlaySound("stop")}
                className="h-7 px-2.5 rounded-full text-[10px] border-white/10 hover:bg-neutral-800 gap-1"
                title="Preview stop chime"
              >
                <Play className="w-2.5 h-2.5" />
                <span>Stop chime</span>
              </Button>
            </div>
            <Switch
              checked={config.sounds}
              onCheckedChange={(v) => onUpdateConfig("sounds", v)}
            />
          </div>
        </div>

        {/* Dictation history switch */}
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
          <div>
            <p className="text-xs font-medium text-white">Record Local Dictation History</p>
            <p className="text-[11px] text-neutral-400">
              Saves a local JSON log on this PC so you can re-copy previous dictations.
            </p>
          </div>
          <Switch
            checked={config.history_enabled}
            onCheckedChange={(v) => onUpdateConfig("history_enabled", v)}
          />
        </div>

        {/* Start on boot switch */}
        <div className="flex items-center justify-between py-1.5">
          <div>
            <p className="text-xs font-medium text-white">Start Hush on Windows Login</p>
            <p className="text-[11px] text-neutral-400">
              Silently launch Hush in the background ready for speech when you boot.
            </p>
          </div>
          <Switch
            checked={config.start_with_windows}
            onCheckedChange={(v) => {
              onUpdateConfig("start_with_windows", v);
              (window as any).electronAPI?.setAutostart?.(v);
            }}
          />
        </div>
      </Card>

      {/* Software Updates Card */}
      <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-white">Software Updates</p>
          <p className="text-[11px] text-neutral-400">
            Hush automatically checks for updates on launch. Current version: v1.0.2.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {updateReady ? (
            <Button
              size="sm"
              onClick={handleInstallUpdate}
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 text-xs rounded-full font-semibold shadow-md animate-pulse cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install Update Now</span>
            </Button>
          ) : updateVersion ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
              <Download className="w-3.5 h-3.5 animate-bounce" />
              <span>Downloading v{updateVersion}…</span>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCheckUpdate}
              disabled={checkingUpdate}
              className="gap-2 text-xs rounded-full border-white/10 hover:bg-neutral-800 cursor-pointer"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", checkingUpdate && "animate-spin")} />
              <span>{checkingUpdate ? "Checking…" : "Check for Updates"}</span>
            </Button>
          )}
        </div>
      </Card>

      {/* System Actions Card */}
      <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-white">Storage & Diagnostics</p>
          <p className="text-[11px] text-neutral-400">
            Hush stores config, local models, and logs in %LOCALAPPDATA%\Hush.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenDataDir}
          className="gap-2 text-xs rounded-full border-white/10 hover:bg-neutral-800"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Open AppData Folder</span>
        </Button>
      </Card>
    </div>
  );
}
