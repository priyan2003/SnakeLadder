export const SNAKES: Record<number, number> = {
  99: 54,
  95: 75,
  92: 88,
  89: 68,
  74: 53,
  64: 60,
  62: 19,
  49: 11,
  46: 25,
  16: 6,
};

export const LADDERS: Record<number, number> = {
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
};

export const BOARD_SIZE = 100;
export const GRID_SIZE = 10;

// Player configuration
export interface Player {
  id: number;
  name: string;
  color: string;
  emoji: string;
  position: number;
}

export const PLAYER_CONFIGS = [
  { id: 1, name: 'Player 1', color: 'from-violet-500 to-purple-600', emoji: '🟣', bgClass: 'bg-violet-500' },
  { id: 2, name: 'Player 2', color: 'from-emerald-500 to-green-600', emoji: '🟢', bgClass: 'bg-emerald-500' },
  { id: 3, name: 'Player 3', color: 'from-amber-500 to-orange-600', emoji: '🟠', bgClass: 'bg-amber-500' },
  { id: 4, name: 'Player 4', color: 'from-sky-500 to-blue-600', emoji: '🔵', bgClass: 'bg-sky-500' },
];

// Convert position (1-100) to grid coordinates
export const getCoordinates = (position: number): { row: number; col: number } => {
  if (position < 1 || position > 100) return { row: -1, col: -1 };
  
  const adjustedPos = position - 1;
  const row = Math.floor(adjustedPos / GRID_SIZE);
  const col = adjustedPos % GRID_SIZE;
  
  const actualCol = row % 2 === 0 ? col : GRID_SIZE - 1 - col;
  const actualRow = GRID_SIZE - 1 - row;
  
  return { row: actualRow, col: actualCol };
};

export const getCellNumber = (row: number, col: number): number => {
  const invertedRow = GRID_SIZE - 1 - row;
  const actualCol = invertedRow % 2 === 0 ? col : GRID_SIZE - 1 - col;
  return invertedRow * GRID_SIZE + actualCol + 1;
};

export const isSnakeHead = (position: number): boolean => {
  return position in SNAKES;
};

export const isLadderBottom = (position: number): boolean => {
  return position in LADDERS;
};

export const getNextPosition = (position: number): { nextPos: number; type: 'snake' | 'ladder' | null } => {
  if (SNAKES[position]) {
    return { nextPos: SNAKES[position], type: 'snake' };
  }
  if (LADDERS[position]) {
    return { nextPos: LADDERS[position], type: 'ladder' };
  }
  return { nextPos: position, type: null };
};
