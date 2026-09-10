import React from 'react';
import type { CellState, PlayerSymbol } from '../types';
import { getAriaLabelForCell } from '../utils/gameLogic';

export interface GameCellProps {
  index: number;
  value: CellState;
  isWinningCell: boolean;
  disabled: boolean;
  activeTurn: PlayerSymbol;
  onClick: (index: number) => void;
}

export const GameCell: React.FC<GameCellProps> = ({
  index,
  value,
  isWinningCell,
  disabled,
  activeTurn,
  onClick,
}) => {
  const ariaLabel = getAriaLabelForCell(index, value);
  const isInteractive = !value && !disabled;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && isInteractive) {
      e.preventDefault();
      onClick(index);
    }
  };

  return (
    <button
      type="button"
      onClick={() => isInteractive && onClick(index)}
      onKeyDown={handleKeyDown}
      disabled={!isInteractive}
      aria-label={ariaLabel}
      tabIndex={isInteractive ? 0 : -1}
      className={`
        group relative aspect-square w-full rounded-2xl sm:rounded-3xl flex items-center justify-center
        transition-all duration-200 select-none overflow-hidden
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:z-10
        ${
          isWinningCell
            ? 'bg-emerald-500/20 border-2 border-emerald-400 shadow-neon-green animate-win-pulse scale-[1.03] z-10'
            : value
            ? 'bg-slate-900/70 border border-white/10'
            : isInteractive
            ? 'glass-panel hover:bg-slate-800/60 hover:border-cyan-500/40 active:scale-[0.96] cursor-pointer'
            : 'glass-panel opacity-60 cursor-not-allowed'
        }
      `}
    >
      {/* Background subtle radial gradient on hover */}
      {isInteractive && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"
        />
      )}

      {/* Render Symbol */}
      {value === 'X' && (
        <svg
          viewBox="0 0 100 100"
          className="w-3/5 h-3/5 filter drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]"
          aria-hidden="true"
        >
          <line
            x1="22"
            y1="22"
            x2="78"
            y2="78"
            stroke="#00f0ff"
            strokeWidth="12"
            strokeLinecap="round"
            className="animate-draw-x-1"
          />
          <line
            x1="78"
            y1="22"
            x2="22"
            y2="78"
            stroke="#00f0ff"
            strokeWidth="12"
            strokeLinecap="round"
            className="animate-draw-x-2"
          />
        </svg>
      )}

      {value === 'O' && (
        <svg
          viewBox="0 0 100 100"
          className="w-3/5 h-3/5 filter drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#d946ef"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            className="animate-draw-o"
          />
        </svg>
      )}

      {/* Ghost preview on hover when empty and active */}
      {!value && isInteractive && (
        <div
          aria-hidden="true"
          className="opacity-0 group-hover:opacity-30 transition-opacity duration-150 pointer-events-none flex items-center justify-center w-full h-full"
        >
          {activeTurn === 'X' ? (
            <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
              <line x1="25" y1="25" x2="75" y2="75" stroke="#00f0ff" strokeWidth="10" strokeLinecap="round" />
              <line x1="75" y1="25" x2="25" y2="75" stroke="#00f0ff" strokeWidth="10" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
              <circle cx="50" cy="50" r="26" stroke="#d946ef" strokeWidth="10" fill="none" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
};
