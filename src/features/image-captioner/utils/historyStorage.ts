import type { CaptionHistoryItem } from '../types';

const HISTORY_STORAGE_KEY = 'image-captioner:caption-history';
const MAX_HISTORY_ITEMS = 20;

export function loadCaptionHistory(): CaptionHistoryItem[] {
  try {
    const storedHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!storedHistory) return [];

    const parsedHistory = JSON.parse(storedHistory) as unknown;
    if (!Array.isArray(parsedHistory)) return [];

    return parsedHistory.filter(isCaptionHistoryItem).slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return [];
  }
}

export function saveCaptionHistory(history: CaptionHistoryItem[]): void {
  try {
    window.localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)),
    );
  } catch {
    // localStorage can fail when quota is full, especially with image data URLs.
  }
}

export function trimCaptionHistory(history: CaptionHistoryItem[]): CaptionHistoryItem[] {
  return history.slice(0, MAX_HISTORY_ITEMS);
}

function isCaptionHistoryItem(value: unknown): value is CaptionHistoryItem {
  if (!value || typeof value !== 'object') return false;

  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.image === 'string'
    && typeof item.caption === 'string'
    && typeof item.date === 'string';
}
