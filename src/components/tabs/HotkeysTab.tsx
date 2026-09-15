import React, { useState, useEffect } from "react";
import { Keyboard, Zap, ShieldAlert, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HotkeysTabProps {
  holdChord: string;
  toggleCombo: string;
  holdChordsList: string[];
  toggleCombosList: string[];
  onUpdateBindings: (hold: string, toggle: string) => void;
}

export function HotkeysTab({
  holdChord,
  toggleCombo,
  holdChordsList,
  toggleCombosList,
  onUpdateBindings,
}: HotkeysTabProps) {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const keys: string[] = [];
      if (e.ctrlKey) keys.push("Ctrl");
      if (e.altKey) keys.push("Alt");
      if (e.shiftKey) keys.push("Shift");
      if (e.metaKey) keys.push("Win");
      if (
        !["Control", "Alt", "Shift", "Meta"].includes(e.key) &&
        !keys.includes(e.key.toUpperCase())
      ) {
        keys.push(e.key.toUpperCase());
      }
      setPressedKeys(keys);
    };

    const onKeyUp = () => {
      setPressedKeys([]);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const chords = holdChordsList.length
    ? holdChordsList
    : ["Ctrl+Win", "Alt+Win", "Ctrl+Alt", "F9 (hold)"];
  const combos = toggleCombosList.length
    ? toggleCombosList
    : ["Ctrl+Alt+D", "Ctrl+Shift+Space", "Ctrl+Alt+Space", "F10", "Disabled"];

  return (
    <div className="space-y-4">
      {/* Configuration Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Hold Chord Card */}
        <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Keyboard className="w-4 h-4 text-neutral-300" />
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Hold-to-Talk Chord
            </h4>
          </div>
          <p className="text-xs text-neutral-400 mb-3">
            Hold both keys down, speak naturally, and release to insert.
          </p>

          <div className="space-y-1.5">
            {chords.map((chord) => (
              <button
                key={chord}
                onClick={() => {
                  onUpdateBindings(chord, toggleCombo);
                  toast.success(`Hold chord set to ${chord}`);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left",
                  holdChord === chord
                    ? "bg-white text-black font-bold shadow-sm"
                    : "bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                )}
              >
                <span>{chord}</span>
                {holdChord === chord && (
                  <span className="text-[10px] font-sans font-semibold text-neutral-600">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Toggle Combo Card */}
        <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-neutral-300" />
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Toggle Dictation Hotkey
            </h4>
          </div>
          <p className="text-xs text-neutral-400 mb-3">
            Press once to start dictating continuously, press again to stop.
          </p>

          <div className="space-y-1.5">
            {combos.map((combo) => (
              <button
                key={combo}
                onClick={() => {
                  onUpdateBindings(holdChord, combo);
                  toast.success(`Toggle combo set to ${combo}`);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left",
                  toggleCombo === combo
                    ? "bg-white text-black font-bold shadow-sm"
                    : "bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                )}
              >
                <span>{combo}</span>
                {toggleCombo === combo && (
                  <span className="text-[10px] font-sans font-semibold text-neutral-600">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Interactive Key Detection Tester */}
      <Card className="p-4 bg-neutral-900/60 border-white/5 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Live Keyboard Input Tester
          </span>
          <span className="text-[11px] text-neutral-500">
            Press keys anywhere inside this window
          </span>
        </div>

        <div className="h-20 bg-neutral-950/80 rounded-xl border border-white/5 flex items-center justify-center p-4">
          {pressedKeys.length === 0 ? (
            <span className="text-xs text-neutral-500 italic">
              Press any modifier keys (Ctrl, Win, Alt, Shift...) to test key detection
            </span>
          ) : (
            <div className="flex items-center gap-2">
              {pressedKeys.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-mono font-bold text-sm shadow-md animate-in zoom-in-95"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Administrator Privilege Guidance */}
      <Card className="p-4 bg-neutral-900/30 border-white/5 rounded-2xl flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-neutral-400 space-y-1 leading-relaxed">
          <p className="font-medium text-neutral-200">
            Typing into Administrator / Elevated Windows
          </p>
          <p>
            Windows security blocks standard background apps from sending keystrokes into elevated
            windows (like Task Manager, Registry Editor, or Admin terminals).
          </p>
          <p>
            If dictation doesn't insert text in an admin app, launch Hush via{" "}
            <code className="text-white bg-white/10 px-1 rounded font-mono">
              Hush (administrator)
            </code>{" "}
            from your Start Menu, or run as Administrator.
          </p>
        </div>
      </Card>
    </div>
  );
}
