export type DictationState = "idle" | "listening" | "transcribing" | "inserted" | "error";
export type EngineState = "unloaded" | "loading" | "ready" | "error";

export interface SessionStats {
  words: number;
  utterances: number;
  audio_seconds: number;
}

export interface HushConfig {
  config_version: number;
  model: string;
  compute_device: string;
  language: string;
  hold_chord: string;
  toggle_combo: string;
  input_device: string | null;
  strip_fillers: boolean;
  sounds: boolean;
  history_enabled: boolean;
  live_typing: boolean;
  paste_threshold: number;
  injection: "type" | "paste";
  start_with_windows: boolean;
  hands_free_mode: boolean;
  dictionary: string[];
  stats: SessionStats;
}

export interface HistoryEntry {
  ts: number;
  text: string;
  seconds: number;
}

export interface ModelDetail {
  repo: string;
  size: string;
  note: string;
  downloaded: boolean;
}

export interface DownloadProgress {
  model: string;
  downloaded_bytes: number;
  total_bytes: number | null;
  percent: number;
  is_alive: boolean;
  error?: string | null;
  done?: boolean;
}

export interface InitialStateData {
  app_name: string;
  app_version: string;
  state: DictationState;
  state_message: string;
  recording: boolean;
  busy: boolean;
  enabled: boolean;
  engine_state: EngineState;
  config: HushConfig;
  models: Record<string, ModelDetail>;
  hold_chords: string[];
  toggle_combos: string[];
  devices: string[];
  history: HistoryEntry[];
  stats: SessionStats;
  app_dir: string;
}
