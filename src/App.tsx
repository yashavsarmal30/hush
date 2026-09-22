import React, { useState, useEffect } from "react";
import { useHush } from "@/hooks/useHush";
import { OverlayPill } from "@/components/OverlayPill";
import { MainHub } from "@/components/MainHub";

function isOverlay(): boolean {
  if (typeof window !== "undefined") {
    const hash = window.location.hash;
    const search = window.location.search;
    return (
      hash === "#overlay" ||
      search.includes("window=overlay") ||
      (window.innerWidth > 0 && window.innerWidth <= 450 && window.innerHeight <= 120)
    );
  }
  return false;
}

export function App() {
  const hush = useHush();
  const [overlay, setOverlay] = useState<boolean>(isOverlay);

  useEffect(() => {
    const onRoute = () => setOverlay(isOverlay());
    window.addEventListener("hashchange", onRoute);
    window.addEventListener("popstate", onRoute);
    return () => {
      window.removeEventListener("hashchange", onRoute);
      window.removeEventListener("popstate", onRoute);
    };
  }, []);

  useEffect(() => {
    if (overlay) {
      document.title = "";
    } else {
      document.title = "Hush";
    }
  }, [overlay]);

  const handleOpenMainFromOverlay = () => {
    (window as any).electronAPI?.showMainWindow?.();
  };

  if (overlay) {
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
