import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSeconds(secs: number): string {
  if (isNaN(secs) || secs <= 0) return "0.0s";
  return `${secs.toFixed(1)}s`;
}

export function formatTimeSaved(audioSecs: number, words: number): string {
  const typingMin = words / 40.0;
  const spokenMin = audioSecs / 60.0;
  const saved = Math.max(0, typingMin - spokenMin);
  return `${Math.round(saved)} min`;
}
