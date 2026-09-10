import React from 'react';
import type { ScoreStats, GameMode } from '../types';
import { Trophy, Flame, Scale } from 'lucide-react';

export interface ScoreBoardProps {
  stats: ScoreStats;
  playerXName: string;
  playerOName: string;
  aiName: string;
  gameMode: GameMode;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  stats,
  playerXName,
  playerOName,
  aiName,
  gameMode,
}) => {
  const nameX = playerXName || 'Player X';
  const nameO = gameMode === 'pvp' ? (playerOName || 'Player O') : (aiName || 'AI');

  return (
    <div className="w-full max-w-md mx-auto my-2">
      {/* 3 Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* X Wins */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center text-center border-t-2 border-cyan-400/80 shadow-md">
          <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1 truncate max-w-full">
            <Trophy className="w-3 h-3 shrink-0" />
            <span className="truncate">{nameX}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white text-glow-cyan font-heading">
            {stats.xWins}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Wins (X)</span>
        </div>

        {/* Draws */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center text-center border-t-2 border-amber-400/80 shadow-md">
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Scale className="w-3 h-3 shrink-0" />
            <span>Draws</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white text-glow-amber font-heading">
            {stats.draws}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Tied Games</span>
        </div>

        {/* O Wins */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center text-center border-t-2 border-purple-400/80 shadow-md">
          <div className="flex items-center gap-1 text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-1 truncate max-w-full">
            <Trophy className="w-3 h-3 shrink-0" />
            <span className="truncate">{nameO}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white text-glow-purple font-heading">
            {stats.oWins}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Wins (O)</span>
        </div>
      </div>

      {/* Total Games & Streak Bar */}
      <div className="mt-2 px-3 py-1.5 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium">
          Total Matches: <strong className="text-white">{stats.totalGames}</strong>
        </span>
        {stats.currentStreak.count > 1 && stats.currentStreak.winner && (
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>
              {stats.currentStreak.count} Streak ({stats.currentStreak.winner})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
