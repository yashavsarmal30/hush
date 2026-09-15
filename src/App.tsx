import React, { useState, useEffect } from "react";
import { useHush } from "@/hooks/useHush";
import { OverlayPill } from "@/components/OverlayPill";
import { MainHub } from "@/components/MainHub";

export function App() {
  const hush = useHush();
  const [isOverlayWindow] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.location.hash === "#overlay" ||
        window.location.search.includes("window=overlay")
      );
    }
    return false;
  });

  const handleOpenMainFromOverlay = () => {
    (window as any).electronAPI?.showMainWindow?.();
  };


  if (isOverlayWindow) {
    return (
      <div className="w-screen h-screen flex items-center justify-center p-0 m-0 overflow-hidden bg-transparent select-none">
        <OverlayPill
          state={hush.state}
          stateMessage={hush.stateMessage}
          micLevel={hush.micLevel}
          holdChord={hush.config.hold_chord}
          handsFreeMode={hush.handsFreeMode || hush.isHandsFreeSession}
          onStart={() => hush.startDictation(hush.handsFreeMode ? "toggle" : "hold")}
          onStop={hush.stopDictation}
          onCancel={hush.cancelDictation}
          onToggleHandsFree={hush.toggleHandsFreeMode}
          onOpenMain={handleOpenMainFromOverlay}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-neutral-950 text-foreground">
      <MainHub hush={hush} />
    </div>
  );
}

export default App;
