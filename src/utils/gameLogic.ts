import type { BoardState, CellState, WinningInfo, PlayerSymbol } from '../types';

export const WINNING_COMBINATIONS: Array<{
  line: [number, number, number];
  pattern: 'row' | 'column' | 'diagonal';
  index: number;
}> = [
  // Rows
  { line: [0, 1, 2], pattern: 'row', index: 0 },
  { line: [3, 4, 5], pattern: 'row', index: 1 },
  { line: [6, 7, 8], pattern: 'row', index: 2 },
  // Columns
  { line: [0, 3, 6], pattern: 'column', index: 0 },
  { line: [1, 4, 7], pattern: 'column', index: 1 },
  { line: [2, 5, 8], pattern: 'column', index: 2 },
  // Diagonals
  { line: [0, 4, 8], pattern: 'diagonal', index: 0 },
  { line: [2, 4, 6], pattern: 'diagonal', index: 1 },
];

export function createInitialBoard(): BoardState {
  return Array(9).fill(null);
}

export function checkWinner(board: BoardState): WinningInfo | null {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo.line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as PlayerSymbol,
        line: combo.line,
        pattern: combo.pattern,
        index: combo.index,
      };
    }
  }
  return null;
}

export function checkDraw(board: BoardState, winner: WinningInfo | null): boolean {
  if (winner !== null) return false;
  return board.every((cell) => cell !== null);
}

export function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

export function isBoardEmpty(board: BoardState): boolean {
  return board.every((cell) => cell === null);
}

export function getCellCoordinates(index: number): { row: number; col: number } {
  return {
    row: Math.floor(index / 3) + 1,
    col: (index % 3) + 1,
  };
}

export function getAriaLabelForCell(index: number, cell: CellState): string {
  const { row, col } = getCellCoordinates(index);
  if (!cell) {
    return `Row ${row}, Column ${col}, empty cell`;
  }
  return `Row ${row}, Column ${col}, occupied by ${cell}`;
}
