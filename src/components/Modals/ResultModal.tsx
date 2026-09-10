import React, { useEffect } from 'react';
import type { WinningInfo, ScoreStats, GameMode } from '../../types';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import { Trophy, Scale, RotateCcw, Home, Sparkles } from 'lucide-react';
import { fireWinCelebration } from '../../utils/confetti';
import { soundFx } from '../../utils/sound';

export interface ResultModalProps {
  isOpen: boolean;
  winningInfo: WinningInfo | null;
  isDraw: boolean;
  stats: ScoreStats;
  playerXName: string;
  playerOName: string;
  aiName: string;
  gameMode: GameMode;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  winningInfo,
  isDraw,
  stats,
  playerXName,
  playerOName,
  aiName,
  gameMode,
  onPlayAgain,
  onNewGame,
}) => {
  const winner = winningInfo?.winner;
  const isWinnerX = winner === 'X';

  const winnerName = isWinnerX
    ? (playerXName || 'Player X')
    : gameMode === 'pvp'
    ? (playerOName || 'Player O')
    : (aiName || 'Nexus AI');

  useEffect(() => {
    if (isOpen) {
      if (winner) {
        soundFx.playWin();
        fireWinCelebration();
      } else if (isDraw) {
        soundFx.playDraw();
      }
    }
  }, [isOpen, winner, isDraw]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onPlayAgain}
      showCloseButton={false}
      maxWidth="sm"
    >
      <div className="flex flex-col items-center text-center py-2">
        {/* Animated Icon Badge */}
        <div className="relative mb-4">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-60 animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-dark-900 border border-white/15 flex items-center justify-center shadow-xl">
            {winner ? (
              <Trophy className={`w-10 h-10 ${isWinnerX ? 'text-cyan-400' : 'text-purple-400'} animate-bounce`} />
            ) : (
              <Scale className="w-10 h-10 text-amber-400" />
            )}
          </div>
        </div>

        {/* Title & Headline */}
        {winner ? (
          <>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Victory Achieved</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white text-glow-cyan mb-1">
              🎉 {winnerName} Wins!
            </h3>
            <p className="text-sm text-slate-400 font-medium mb-5">
              Player {winner} dominated the grid with a brilliant {winningInfo?.pattern} line!
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Stalemate</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white text-glow-amber mb-1">
              🤝 It's a Draw!
            </h3>
            <p className="text-sm text-slate-400 font-medium mb-5">
              A fierce tactical standoff! Neither combatant gave an inch.
            </p>
          </>
        )}

        {/* Current Score Summary */}
        <div className="w-full grid grid-cols-3 gap-2 p-3 rounded-2xl bg-dark-900/60 border border-white/10 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-cyan-400 font-bold uppercase truncate max-w-[80px]">
              {playerXName || 'X'}
            </span>
            <span className="text-xl font-extrabold text-white">{stats.xWins}</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/10">
            <span className="text-[11px] text-amber-400 font-bold uppercase">Draws</span>
            <span className="text-xl font-extrabold text-white">{stats.draws}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-purple-400 font-bold uppercase truncate max-w-[80px]">
              {gameMode === 'pvp' ? (playerOName || 'O') : (aiName || 'AI')}
            </span>
            <span className="text-xl font-extrabold text-white">{stats.oWins}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onPlayAgain}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Play Again
          </Button>

          <Button
            variant="glass"
            size="md"
            fullWidth
            onClick={onNewGame}
            leftIcon={<Home className="w-4 h-4" />}
          >
            New Game
          </Button>
        </div>
      </div>
    </Modal>
  );
};
