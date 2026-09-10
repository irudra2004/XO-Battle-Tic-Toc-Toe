import React, { useState } from 'react';
import type {
  GameMode,
  AIDifficulty,
  UserSettings,
  ScoreStats,
  PlayerSymbol,
} from '../types';
import { useGame } from '../hooks/useGame';
import { TurnIndicator } from './TurnIndicator';
import { ScoreBoard } from './ScoreBoard';
import { GameBoard } from './GameBoard';
import { ResultModal } from './Modals/ResultModal';
import { Button } from './UI/Button';
import {
  RotateCcw,
  Home,
  Pause,
  Play,
  Zap,
  Bot,
  Users,
  Eye,
} from 'lucide-react';

export interface GameScreenProps {
  initialMode: GameMode;
  initialDifficulty: AIDifficulty;
  settings: UserSettings;
  stats: ScoreStats;
  onRecordResult: (winner: PlayerSymbol | null) => void;
  onReturnToHome: () => void;
  onUpdateDifficulty: (difficulty: AIDifficulty) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  initialMode,
  initialDifficulty,
  settings,
  stats,
  onRecordResult,
  onReturnToHome,
  onUpdateDifficulty,
}) => {
  const {
    board,
    currentTurn,
    gameStatus,
    winningInfo,
    isAiThinking,
    isAiPaused,
    setIsAiPaused,
    mode,
    difficulty,
    setDifficulty,
    handleCellClick,
    resetBoard,
  } = useGame({
    initialMode,
    initialDifficulty,
    settings,
    onRecordResult,
  });

  const [showResultModal, setShowResultModal] = useState(true);

  // When game completes, make sure result modal is open
  const isGameOver = gameStatus === 'won' || gameStatus === 'draw';

  const handlePlayAgain = () => {
    resetBoard();
    setShowResultModal(true);
  };

  const handleChangeDifficulty = (newDiff: AIDifficulty) => {
    setDifficulty(newDiff);
    onUpdateDifficulty(newDiff);
    resetBoard();
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'pvp':
        return <Users className="w-3.5 h-3.5 text-cyan-400" />;
      case 'pve':
        return <Bot className="w-3.5 h-3.5 text-purple-400" />;
      case 'eve':
        return <Eye className="w-3.5 h-3.5 text-pink-400" />;
    }
  };

  return (
    <main className="w-full max-w-lg mx-auto px-4 py-2 sm:py-4 flex flex-col items-center select-none animate-fade-in">
      {/* Top Match Info Pill */}
      <div className="flex items-center justify-between w-full max-w-md px-3 py-1.5 rounded-xl glass-panel text-xs text-slate-300 mb-1">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-white/5">{getModeIcon()}</span>
          <span className="font-bold text-white capitalize">
            {mode === 'pvp' ? 'Player vs Player' : mode === 'pve' ? 'Player vs AI' : 'AI vs AI Duel'}
          </span>
        </div>

        {mode !== 'pvp' && (
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            <select
              value={difficulty}
              onChange={(e) => handleChangeDifficulty(e.target.value as AIDifficulty)}
              className="bg-transparent text-cyan-400 font-bold capitalize text-xs cursor-pointer focus:outline-none"
              aria-label="Change AI difficulty"
            >
              <option value="easy" className="bg-dark-900 text-white">Easy</option>
              <option value="medium" className="bg-dark-900 text-white">Medium</option>
              <option value="hard" className="bg-dark-900 text-white">Hard (Minimax)</option>
            </select>
          </div>
        )}
      </div>

      {/* Turn Indicator */}
      <TurnIndicator
        currentTurn={currentTurn}
        playerXName={settings.playerXName}
        playerOName={settings.playerOName}
        aiName={settings.aiName}
        gameMode={mode}
        isAiThinking={isAiThinking}
        isGameOver={isGameOver}
      />

      {/* 3x3 Game Board */}
      <GameBoard
        board={board}
        winningInfo={winningInfo}
        activeTurn={currentTurn}
        isAiThinking={isAiThinking}
        isGameOver={isGameOver}
        onCellClick={handleCellClick}
      />

      {/* Scoreboard */}
      <ScoreBoard
        stats={stats}
        playerXName={settings.playerXName}
        playerOName={settings.playerOName}
        aiName={settings.aiName}
        gameMode={mode}
      />

      {/* Primary Action Controls Bar */}
      <div className="w-full max-w-md mt-3 flex items-center justify-between gap-2">
        <Button
          variant="glass"
          size="md"
          onClick={() => resetBoard()}
          leftIcon={<RotateCcw className="w-4 h-4" />}
          className="flex-1"
        >
          Restart
        </Button>

        {/* AI vs AI Spectator Controls */}
        {mode === 'eve' && (
          <Button
            variant="glass"
            size="md"
            onClick={() => setIsAiPaused(!isAiPaused)}
            leftIcon={isAiPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
            className="flex-1"
          >
            {isAiPaused ? 'Resume' : 'Pause'}
          </Button>
        )}

        <Button
          variant="outline"
          size="md"
          onClick={onReturnToHome}
          leftIcon={<Home className="w-4 h-4" />}
          className="flex-1"
        >
          Change Mode
        </Button>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={isGameOver && showResultModal}
        winningInfo={winningInfo}
        isDraw={gameStatus === 'draw'}
        stats={stats}
        playerXName={settings.playerXName}
        playerOName={settings.playerOName}
        aiName={settings.aiName}
        gameMode={mode}
        onPlayAgain={handlePlayAgain}
        onNewGame={() => {
          setShowResultModal(false);
          onReturnToHome();
        }}
      />
    </main>
  );
};
