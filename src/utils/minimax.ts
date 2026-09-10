import type { BoardState, AIDifficulty, PlayerSymbol } from '../types';
import { checkWinner, checkDraw, getAvailableMoves } from './gameLogic';

/**
 * Minimax recursive algorithm
 */
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: PlayerSymbol,
  humanPlayer: PlayerSymbol,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const winnerInfo = checkWinner(board);

  if (winnerInfo) {
    if (winnerInfo.winner === aiPlayer) {
      return 10 - depth;
    } else {
      return depth - 10;
    }
  }

  if (checkDraw(board, winnerInfo)) {
    return 0;
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of availableMoves) {
      board[move] = aiPlayer;
      const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer, alpha, beta);
      board[move] = null;
      maxEval = Math.max(maxEval, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of availableMoves) {
      board[move] = humanPlayer;
      const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer, alpha, beta);
      board[move] = null;
      minEval = Math.min(minEval, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Finds the optimal move using Minimax.
 * If multiple moves share the highest score, picks randomly among them for natural variety.
 */
export function getBestMoveMinimax(
  board: BoardState,
  aiPlayer: PlayerSymbol,
  humanPlayer: PlayerSymbol
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;
  if (availableMoves.length === 9) {
    // If entire board is empty, pick center or random corner
    const preferredOpenings = [4, 0, 2, 6, 8];
    return preferredOpenings[Math.floor(Math.random() * preferredOpenings.length)];
  }

  let bestScore = -Infinity;
  let bestMoves: number[] = [];

  for (const move of availableMoves) {
    board[move] = aiPlayer;
    const score = minimax(board, 0, false, aiPlayer, humanPlayer);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move];
    } else if (score === bestScore) {
      bestMoves.push(move);
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

/**
 * Easy AI: Random move with low chance of deliberate move
 */
export function getEasyMove(board: BoardState): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

/**
 * Medium AI:
 * 1. Checks if AI can win right now
 * 2. Checks if opponent can win right now, and blocks
 * 3. Takes center if available (60% chance)
 * 4. Otherwise random move
 */
export function getMediumMove(
  board: BoardState,
  aiPlayer: PlayerSymbol,
  humanPlayer: PlayerSymbol
): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  // 1. Can AI win in one move?
  for (const move of availableMoves) {
    board[move] = aiPlayer;
    const win = checkWinner(board);
    board[move] = null;
    if (win && win.winner === aiPlayer) {
      return move;
    }
  }

  // 2. Can Human win in one move? Block it!
  for (const move of availableMoves) {
    board[move] = humanPlayer;
    const win = checkWinner(board);
    board[move] = null;
    if (win && win.winner === humanPlayer) {
      return move;
    }
  }

  // 3. Take center if open (60% chance)
  if (board[4] === null && Math.random() < 0.6) {
    return 4;
  }

  // 4. Take corners with 50% chance
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length > 0 && Math.random() < 0.5) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5. Fallback random
  return getEasyMove(board);
}

/**
 * Main AI move dispatcher
 */
export function getAIMove(
  board: BoardState,
  difficulty: AIDifficulty,
  aiPlayer: PlayerSymbol = 'O',
  humanPlayer: PlayerSymbol = 'X'
): number {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board);
    case 'medium':
      return getMediumMove(board, aiPlayer, humanPlayer);
    case 'hard':
      return getBestMoveMinimax(board, aiPlayer, humanPlayer);
    default:
      return getBestMoveMinimax(board, aiPlayer, humanPlayer);
  }
}
