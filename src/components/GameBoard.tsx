import React, { useRef } from 'react';
import type { BoardState, PlayerSymbol, WinningInfo } from '../types';
import { GameCell } from './GameCell';

export interface GameBoardProps {
  board: BoardState;
  winningInfo: WinningInfo | null;
  activeTurn: PlayerSymbol;
  isAiThinking: boolean;
  isGameOver: boolean;
  onCellClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  winningInfo,
  activeTurn,
  isAiThinking,
  isGameOver,
  onCellClick,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation within the 3x3 grid
  const handleGridKeyDown = (e: React.KeyboardEvent) => {
    const activeEl = document.activeElement;
    if (!gridRef.current || !gridRef.current.contains(activeEl)) return;

    const buttons = Array.from(gridRef.current.querySelectorAll('button'));
    const currentIndex = buttons.indexOf(activeEl as HTMLButtonElement);
    if (currentIndex === -1) return;

    let targetIndex: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
        if (currentIndex % 3 < 2) targetIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        if (currentIndex % 3 > 0) targetIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        if (currentIndex + 3 < 9) targetIndex = currentIndex + 3;
        break;
      case 'ArrowUp':
        if (currentIndex - 3 >= 0) targetIndex = currentIndex - 3;
        break;
      default:
        return;
    }

    if (targetIndex !== null && buttons[targetIndex]) {
      e.preventDefault();
      buttons[targetIndex].focus();
    }
  };

  const winningIndices = new Set(winningInfo ? winningInfo.line : []);

  return (
    <div className="relative w-full max-w-[390px] sm:max-w-[420px] mx-auto my-3 sm:my-5">
      {/* Outer ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[32px] blur-xl opacity-75 -z-10 pointer-events-none"
      />

      {/* Glass Board Box */}
      <div
        ref={gridRef}
        onKeyDown={handleGridKeyDown}
        role="grid"
        aria-label="Tic Tac Toe Board"
        aria-rowcount={3}
        aria-colcount={3}
        className="glass-panel-glow p-3 sm:p-4 rounded-3xl border border-white/10 shadow-glass"
      >
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {board.map((cellValue, index) => {
            const isWinningCell = winningIndices.has(index);
            const isDisabled = isGameOver || isAiThinking || cellValue !== null;

            return (
              <GameCell
                key={index}
                index={index}
                value={cellValue}
                isWinningCell={isWinningCell}
                disabled={isDisabled}
                activeTurn={activeTurn}
                onClick={onCellClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
