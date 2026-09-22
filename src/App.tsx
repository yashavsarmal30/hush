import React, { useState, useEffect } from "react";
import { useHush } from "@/hooks/useHush";
import { OverlayPill } from "@/components/OverlayPill";
import { MainHub } from "@/components/MainHub";
import DemoOne from "@/components/demo";

function getRoute(): "overlay" | "demo" | "main" {
  if (typeof window !== "undefined") {
    const hash = window.location.hash;
    const search = window.location.search;
    if (
      hash === "#overlay" ||
      search.includes("window=overlay") ||
      (window.innerWidth > 0 && window.innerWidth <= 450 && window.innerHeight <= 120)
    ) {
      return "overlay";
    }
    if (hash === "#demo" || window.location.pathname.endsWith("/demo")) return "demo";
  }
  return "main";
}

export function App() {
  const hush = useHush();
  const [route, setRoute] = useState<"overlay" | "demo" | "main">(getRoute);

  useEffect(() => {
    const onRoute = () => setRoute(getRoute());
    window.addEventListener("hashchange", onRoute);
    window.addEventListener("popstate", onRoute);
    return () => {
      window.removeEventListener("hashchange", onRoute);
      window.removeEventListener("popstate", onRoute);
    };
  }, []);

  const handleOpenMainFromOverlay = () => {
    (window as any).electronAPI?.showMainWindow?.();
  };

  if (route === "overlay") {
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

  if (route === "demo") {
    return <DemoOne />;
  }

  return (
    <div className="w-full h-full bg-neutral-950 text-foreground">
      <MainHub hush={hush} />
    </div>
  );
}

export default App;
