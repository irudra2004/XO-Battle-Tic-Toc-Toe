import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  BoardState,
  PlayerSymbol,
  GameMode,
  AIDifficulty,
  GameStatus,
  WinningInfo,
  UserSettings,
} from '../types';
import {
  createInitialBoard,
  checkWinner,
  checkDraw,
} from '../utils/gameLogic';
import { getAIMove } from '../utils/minimax';
import { soundFx } from '../utils/sound';

export interface UseGameProps {
  initialMode: GameMode;
  initialDifficulty: AIDifficulty;
  settings: UserSettings;
  onRecordResult: (winner: PlayerSymbol | null) => void;
}

export function useGame({
  initialMode,
  initialDifficulty,
  settings,
  onRecordResult,
}: UseGameProps) {
  const [mode] = useState<GameMode>(initialMode);
  const [difficulty, setDifficulty] = useState<AIDifficulty>(initialDifficulty);
  const [board, setBoard] = useState<BoardState>(createInitialBoard());
  const [currentTurn, setCurrentTurn] = useState<PlayerSymbol>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('in_progress');
  const [winningInfo, setWinningInfo] = useState<WinningInfo | null>(null);
  const [isAiPaused, setIsAiPaused] = useState<boolean>(false);

  const isAiThinking =
    gameStatus === 'in_progress' &&
    ((mode === 'pve' && currentTurn === 'O') || (mode === 'eve' && !isAiPaused));

  const aiTimeoutRef = useRef<number | null>(null);
  const resultReportedRef = useRef<boolean>(false);

  // Clear any pending AI timer
  const clearAiTimer = useCallback(() => {
    if (aiTimeoutRef.current !== null) {
      window.clearTimeout(aiTimeoutRef.current);
      aiTimeoutRef.current = null;
    }
  }, []);

  // Reset the game board for a new round
  const resetBoard = useCallback((starter: PlayerSymbol = 'X') => {
    clearAiTimer();
    setBoard(createInitialBoard());
    setCurrentTurn(starter);
    setGameStatus('in_progress');
    setWinningInfo(null);
    resultReportedRef.current = false;
  }, [clearAiTimer]);

  // Execute a move on the board
  const applyMove = useCallback(
    (index: number, player: PlayerSymbol) => {
      setBoard((prev) => {
        if (prev[index] !== null) return prev;
        const nextBoard = [...prev];
        nextBoard[index] = player;

        // Play move sound
        soundFx.playMove(player);

        // Check for winner
        const win = checkWinner(nextBoard);
        if (win) {
          setWinningInfo(win);
          setGameStatus('won');
          if (!resultReportedRef.current) {
            resultReportedRef.current = true;
            onRecordResult(player);
          }
          return nextBoard;
        }

        // Check for draw
        if (checkDraw(nextBoard, win)) {
          setGameStatus('draw');
          if (!resultReportedRef.current) {
            resultReportedRef.current = true;
            onRecordResult(null);
          }
          return nextBoard;
        }

        // Switch turns
        setCurrentTurn(player === 'X' ? 'O' : 'X');
        return nextBoard;
      });
    },
    [onRecordResult]
  );

  // Human player clicks a cell
  const handleCellClick = useCallback(
    (index: number) => {
      if (gameStatus !== 'in_progress') return;
      if (board[index] !== null) return;
      if (isAiThinking) return;
      if (mode === 'eve') return; // In spectator mode, humans cannot place marks

      // In PvE mode, user plays only as X
      if (mode === 'pve' && currentTurn !== 'X') return;

      applyMove(index, currentTurn);
    },
    [board, currentTurn, gameStatus, isAiThinking, mode, applyMove]
  );

  // AI turn automation
  useEffect(() => {
    if (!isAiThinking) {
      clearAiTimer();
      return;
    }

    clearAiTimer();

    // Natural thinking delay between 350ms and 650ms (or settings.aiSpeedMs)
    const delay = mode === 'eve' ? settings.aiSpeedMs : 450 + Math.random() * 150;

    aiTimeoutRef.current = window.setTimeout(() => {
      setBoard((currentBoard) => {
        const winner = checkWinner(currentBoard);
        if (winner || checkDraw(currentBoard, winner)) {
          return currentBoard;
        }

        const aiPlayer = currentTurn;
        const humanPlayer = currentTurn === 'O' ? 'X' : 'O';
        const bestMove = getAIMove(currentBoard, difficulty, aiPlayer, humanPlayer);

        if (bestMove !== -1 && currentBoard[bestMove] === null) {
          applyMove(bestMove, currentTurn);
        }

        return currentBoard;
      });
    }, delay);

    return () => {
      clearAiTimer();
    };
  }, [isAiThinking, board, currentTurn, mode, difficulty, settings.aiSpeedMs, applyMove, clearAiTimer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearAiTimer();
  }, [clearAiTimer]);

  return {
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
  };
}
