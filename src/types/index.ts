export type PlayerSymbol = 'X' | 'O';
export type CellState = PlayerSymbol | null;
export type BoardState = CellState[];

export type GameMode = 'pvp' | 'pve' | 'eve';
export type AIDifficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'idle' | 'in_progress' | 'won' | 'draw';

export interface WinningInfo {
  winner: PlayerSymbol;
  line: [number, number, number];
  pattern: 'row' | 'column' | 'diagonal';
  index: number;
}

export interface ScoreStats {
  xWins: number;
  oWins: number;
  draws: number;
  totalGames: number;
  currentStreak: {
    winner: PlayerSymbol | null;
    count: number;
  };
}

export interface UserSettings {
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  difficulty: AIDifficulty;
  playerXName: string;
  playerOName: string;
  aiName: string;
  aiSpeedMs: number;
}

export type ActiveScreen = 'landing' | 'game';
