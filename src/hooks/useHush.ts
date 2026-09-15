import { useState, useEffect, useRef, useCallback } from "react";
import type {
  DictationState,
  EngineState,
  HushConfig,
  HistoryEntry,
  ModelDetail,
  DownloadProgress,
  SessionStats,
  InitialStateData,
} from "@/types/hush";

const WS_URL = "ws://127.0.0.1:4874";

const DEFAULT_CONFIG: HushConfig = {
  config_version: 3,
  model: "small (multilingual)",
  compute_device: "Auto",
  language: "auto",
  hold_chord: "Ctrl+Win",
  toggle_combo: "Ctrl+Alt+D",
  input_device: null,
  strip_fillers: true,
  sounds: true,
  history_enabled: true,
  live_typing: true,
  paste_threshold: 400,
  injection: "type",
  start_with_windows: false,
  hands_free_mode: false,
  dictionary: ["Suryansh"],
  stats: { words: 0, utterances: 0, audio_seconds: 0.0 },
};

export function useHush() {
  const [connected, setConnected] = useState(false);
  const [state, setState] = useState<DictationState>("idle");
  const [stateMessage, setStateMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [isHandsFreeSession, setIsHandsFreeSession] = useState(false);
  const [engineState, setEngineState] = useState<EngineState>("loading");
  const [micLevel, setMicLevel] = useState(0.0);
  const [meterLevel, setMeterLevel] = useState(0.0);
  const [config, setConfig] = useState<HushConfig>(DEFAULT_CONFIG);
  const [models, setModels] = useState<Record<string, ModelDetail>>({});
  const [holdChords, setHoldChords] = useState<string[]>([]);
  const [toggleCombos, setToggleCombos] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [stats, setStats] = useState<SessionStats>(DEFAULT_CONFIG.stats);
  const [streamingText, setStreamingText] = useState("");
  const [lastTranscription, setLastTranscription] = useState<{
    text: string;
    duration: number;
    success: boolean;
  } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  // Play chimes via Web Audio / HTML5 Audio
  const playLocalSound = useCallback((which: "start" | "stop") => {
    try {
      const audio = new Audio(`./sounds/${which}.wav`);
      audio.volume = 0.25;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  const send = useCallback((payload: Record<string, any>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      send({ action: "get_initial_state" });
    };

    ws.onclose = () => {
      setConnected(false);
      setRecording(false);
      setBusy(false);
      setState("idle");
      // Reconnect after 1.5 seconds
      reconnectTimeoutRef.current = window.setTimeout(connect, 1500);
    };

    ws.onerror = () => {
      ws.close();
    };

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);

        // Handle initial data response
        if (msg.action === "get_initial_state" && msg.data) {
          const d: InitialStateData = msg.data;
          setState(d.state || "idle");
          setStateMessage(d.state_message || "");
          setRecording(d.recording || false);
          setBusy(d.busy || false);
          setEnabled(d.enabled ?? true);
          setEngineState(d.engine_state || "ready");
          if (d.config) setConfig(d.config);
          if (d.models) setModels(d.models);
          if (d.hold_chords) setHoldChords(d.hold_chords);
          if (d.toggle_combos) setToggleCombos(d.toggle_combos);
          if (d.devices) setDevices(d.devices);
          if (d.history) setHistory(d.history);
          if (d.stats) setStats(d.stats);
          return;
        }

        // Handle broadcast events
        switch (msg.type) {
          case "state_change":
            setState(msg.state);
            setStateMessage(msg.message || "");
            setRecording(msg.recording ?? false);
            setBusy(msg.busy ?? false);
            if (msg.hands_free !== undefined) {
              setIsHandsFreeSession(Boolean(msg.hands_free));
            }
            if (msg.state === "listening") {
              setStreamingText("");
            }
            break;

          case "engine_state":
            setEngineState(msg.state);
            break;

          case "mic_level":
            setMicLevel(msg.level);
            break;

          case "meter_level":
            setMeterLevel(msg.level);
            break;

          case "stream_chunk":
            setStreamingText(msg.full_text || "");
            break;

          case "transcription_finished":
            setLastTranscription({
              text: msg.text,
              duration: msg.duration,
              success: msg.success,
            });
            if (msg.stats) setStats(msg.stats);
            if (msg.text) {
              setHistory((prev) => [
                { ts: Date.now() / 1000, text: msg.text, seconds: msg.duration },
                ...prev,
              ]);
            }
            break;

          case "download_progress":
            setDownloadProgress({
              model: msg.model,
              downloaded_bytes: msg.downloaded_bytes,
              total_bytes: msg.total_bytes,
              percent: msg.percent,
              is_alive: msg.is_alive,
              error: msg.error,
              done: msg.done,
            });
            if (msg.done) {
              setModels((prev) => ({
                ...prev,
                [msg.model]: {
                  ...(prev[msg.model] || {}),
                  downloaded: !msg.error,
                },
              }));
            }
            break;

          case "config_updated":
            setConfig((prev) => ({ ...prev, [msg.key]: msg.value }));
            break;

          case "config_all_updated":
            if (msg.config) setConfig(msg.config);
            break;

          case "history_cleared":
            setHistory([]);
            break;

          case "enabled_state":
            setEnabled(msg.enabled);
            break;
        }
      } catch (e) {
        console.error("Error parsing WebSocket message", e);
      }
    };
  }, [send]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  // Actions
  const startDictation = useCallback((mode: "hold" | "toggle" = "hold") => {
    if (config.sounds) playLocalSound("start");
    send({ action: "start_dictation", mode });
  }, [config.sounds, playLocalSound, send]);

  const stopDictation = useCallback(() => {
    if (config.sounds) playLocalSound("stop");
    send({ action: "stop_dictation" });
  }, [config.sounds, playLocalSound, send]);

  const cancelDictation = useCallback(() => {
    send({ action: "cancel_dictation" });
  }, [send]);

  const toggleDictation = useCallback(() => {
    if (recording) {
      if (config.sounds) playLocalSound("stop");
    } else {
      if (config.sounds) playLocalSound("start");
    }
    send({ action: "toggle_dictation" });
  }, [config.sounds, playLocalSound, recording, send]);

  const updateConfig = useCallback((key: keyof HushConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    send({ action: "set_config", key, value });
  }, [send]);

  const updateConfigs = useCallback((updates: Partial<HushConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    send({ action: "set_configs", updates });
  }, [send]);

  const loadModel = useCallback((model: string, compute_device?: string) => {
    send({ action: "load_model", model, compute_device: compute_device || config.compute_device });
  }, [config.compute_device, send]);

  const downloadModel = useCallback((model: string) => {
    send({ action: "download_model", model });
  }, [send]);

  const startMeter = useCallback(() => {
    send({ action: "start_meter" });
  }, [send]);

  const stopMeter = useCallback(() => {
    send({ action: "stop_meter" });
  }, [send]);

  const clearHistory = useCallback(() => {
    send({ action: "clear_history" });
  }, [send]);

  const pauseHotkeys = useCallback((paused: boolean) => {
    send({ action: "pause_hotkeys", paused });
  }, [send]);

  const playSound = useCallback((which: "start" | "stop") => {
    playLocalSound(which);
    send({ action: "play_sound", which });
  }, [playLocalSound, send]);

  const toggleHandsFreeMode = useCallback(() => {
    const nextVal = !config.hands_free_mode;
    updateConfig("hands_free_mode", nextVal);
  }, [config.hands_free_mode, updateConfig]);

  return {
    connected,
    state,
    stateMessage,
    recording,
    busy,
    enabled,
    isHandsFreeSession,
    handsFreeMode: Boolean(config.hands_free_mode),
    engineState,
    micLevel,
    meterLevel,
    config,
    models,
    holdChords,
    toggleCombos,
    devices,
    history,
    stats,
    streamingText,
    lastTranscription,
    downloadProgress,
    startDictation,
    stopDictation,
    cancelDictation,
    toggleDictation,
    toggleHandsFreeMode,
    updateConfig,
    updateConfigs,
    loadModel,
    downloadModel,
    startMeter,
    stopMeter,
    clearHistory,
    pauseHotkeys,
    playSound,
  };
}
