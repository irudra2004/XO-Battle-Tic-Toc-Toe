import React from 'react';
import type { PlayerSymbol, GameMode } from '../types';
import { Bot, User, Sparkles } from 'lucide-react';

export interface TurnIndicatorProps {
  currentTurn: PlayerSymbol;
  playerXName: string;
  playerOName: string;
  aiName: string;
  gameMode: GameMode;
  isAiThinking: boolean;
  isGameOver: boolean;
}

export const TurnIndicator: React.FC<TurnIndicatorProps> = ({
  currentTurn,
  playerXName,
  playerOName,
  aiName,
  gameMode,
  isAiThinking,
  isGameOver,
}) => {
  const isXTurn = currentTurn === 'X';

  const nameX = playerXName || 'Player X';
  const nameO = gameMode === 'pvp' ? (playerOName || 'Player O') : (aiName || 'Nexus AI');

  return (
    <div
      className="w-full max-w-md mx-auto my-3 px-3 py-2 rounded-2xl glass-panel flex items-center justify-between gap-3 shadow-lg transition-all duration-300"
      aria-live="polite"
    >
      {/* Player X Pill */}
      <div
        className={`
          flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300
          ${isXTurn && !isGameOver
            ? 'bg-cyan-500/15 border border-cyan-400/60 shadow-neon-cyan-sm text-cyan-300'
            : 'text-slate-400 opacity-65 border border-transparent'
          }
        `}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg ${
          isXTurn && !isGameOver ? 'bg-cyan-500 text-slate-950 shadow-neon-cyan-sm' : 'bg-slate-800 text-cyan-400'
        }`}>
          X
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            {gameMode === 'eve' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
            {gameMode === 'eve' ? 'AI 1' : 'P1'}
          </span>
          <span className="text-sm font-bold truncate text-white">
            {gameMode === 'eve' ? 'Bot Alpha' : nameX}
          </span>
        </div>
      </div>

      {/* Center Status / VS */}
      <div className="flex flex-col items-center justify-center px-1">
        {isAiThinking ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 animate-pulse text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>Thinking</span>
          </div>
        ) : (
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
            VS
          </span>
        )}
      </div>

      {/* Player O Pill */}
      <div
        className={`
          flex-1 flex items-center justify-end gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 text-right
          {!isXTurn && !isGameOver
            ? 'bg-purple-500/15 border border-purple-400/60 shadow-neon-purple-sm text-purple-300'
            : 'text-slate-400 opacity-65 border border-transparent'
          }
        `}
      >
        <div className="flex flex-col min-w-0 items-end">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            {nameO}
            {gameMode === 'pvp' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-purple-400" />}
          </span>
          <span className="text-sm font-bold truncate text-white">
            {gameMode === 'pvp' ? (playerOName || 'Player O') : (aiName || 'Nexus AI')}
          </span>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg ${
          !isXTurn && !isGameOver ? 'bg-purple-500 text-white shadow-neon-purple-sm' : 'bg-slate-800 text-purple-400'
        }`}>
          O
        </div>
      </div>
    </div>
  );
};
