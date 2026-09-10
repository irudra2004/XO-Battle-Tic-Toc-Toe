import type { ScoreStats, UserSettings } from '../types';

const STATS_KEY = 'xo_battle_stats_v1';
const SETTINGS_KEY = 'xo_battle_settings_v1';

export const DEFAULT_STATS: ScoreStats = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  totalGames: 0,
  currentStreak: {
    winner: null,
    count: 0,
  },
};

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  theme: 'dark',
  difficulty: 'hard',
  playerXName: 'Player X',
  playerOName: 'Player O',
  aiName: 'Nexus AI',
  aiSpeedMs: 500,
};

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadStats(): ScoreStats {
  if (!isLocalStorageAvailable()) return { ...DEFAULT_STATS };
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(raw);
    return {
      xWins: Number(parsed.xWins) || 0,
      oWins: Number(parsed.oWins) || 0,
      draws: Number(parsed.draws) || 0,
      totalGames: Number(parsed.totalGames) || 0,
      currentStreak: {
        winner: parsed.currentStreak?.winner || null,
        count: Number(parsed.currentStreak?.count) || 0,
      },
    };
  } catch (err) {
    console.warn('Failed to read stats from localStorage, using defaults:', err);
    return { ...DEFAULT_STATS };
  }
}

export function saveStats(stats: ScoreStats): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.warn('Failed to save stats to localStorage:', err);
  }
}

export function resetStats(): ScoreStats {
  const fresh = { ...DEFAULT_STATS };
  saveStats(fresh);
  return fresh;
}

export function loadSettings(): UserSettings {
  if (!isLocalStorageAvailable()) return { ...DEFAULT_SETTINGS };
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      soundEnabled: parsed.soundEnabled !== undefined ? Boolean(parsed.soundEnabled) : DEFAULT_SETTINGS.soundEnabled,
      theme: parsed.theme === 'light' ? 'light' : 'dark',
      difficulty: ['easy', 'medium', 'hard'].includes(parsed.difficulty) ? parsed.difficulty : DEFAULT_SETTINGS.difficulty,
      playerXName: typeof parsed.playerXName === 'string' && parsed.playerXName.trim() ? parsed.playerXName.trim() : DEFAULT_SETTINGS.playerXName,
      playerOName: typeof parsed.playerOName === 'string' && parsed.playerOName.trim() ? parsed.playerOName.trim() : DEFAULT_SETTINGS.playerOName,
      aiName: typeof parsed.aiName === 'string' && parsed.aiName.trim() ? parsed.aiName.trim() : DEFAULT_SETTINGS.aiName,
      aiSpeedMs: Number(parsed.aiSpeedMs) >= 200 && Number(parsed.aiSpeedMs) <= 1500 ? Number(parsed.aiSpeedMs) : DEFAULT_SETTINGS.aiSpeedMs,
    };
  } catch (err) {
    console.warn('Failed to load settings from localStorage, using defaults:', err);
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: UserSettings): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save settings to localStorage:', err);
  }
}

export function resetSettings(): UserSettings {
  const fresh = { ...DEFAULT_SETTINGS };
  saveSettings(fresh);
  return fresh;
}
