import { describe, it, expect } from 'vitest';
import {
  SNAKES,
  LADDERS,
  BOARD_SIZE,
  GRID_SIZE,
  getCoordinates,
  getCellNumber,
  isSnakeHead,
  isLadderBottom,
  getNextPosition,
  PLAYER_CONFIGS,
} from '../lib/gameConfig';

describe('Game Configuration', () => {
  describe('Constants', () => {
    it('should have correct board size', () => {
      expect(BOARD_SIZE).toBe(100);
    });

    it('should have correct grid size', () => {
      expect(GRID_SIZE).toBe(10);
    });

    it('should have 4 player configurations', () => {
      expect(PLAYER_CONFIGS).toHaveLength(4);
    });

    it('should have unique player colors', () => {
      const colors = PLAYER_CONFIGS.map((p) => p.color);
      expect(new Set(colors).size).toBe(colors.length);
    });
  });

  describe('Snakes', () => {
    it('should have snake heads greater than tails', () => {
      Object.entries(SNAKES).forEach(([head, tail]) => {
        expect(Number(head)).toBeGreaterThan(tail);
      });
    });

    it('should have valid snake positions (1-100)', () => {
      Object.entries(SNAKES).forEach(([head, tail]) => {
        expect(Number(head)).toBeGreaterThanOrEqual(1);
        expect(Number(head)).toBeLessThanOrEqual(100);
        expect(tail).toBeGreaterThanOrEqual(1);
        expect(tail).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('Ladders', () => {
    it('should have ladder bottoms less than tops', () => {
      Object.entries(LADDERS).forEach(([bottom, top]) => {
        expect(Number(bottom)).toBeLessThan(top);
      });
    });

    it('should have valid ladder positions (1-100)', () => {
      Object.entries(LADDERS).forEach(([bottom, top]) => {
        expect(Number(bottom)).toBeGreaterThanOrEqual(1);
        expect(Number(bottom)).toBeLessThanOrEqual(100);
        expect(top).toBeGreaterThanOrEqual(1);
        expect(top).toBeLessThanOrEqual(100);
      });
    });
  });
});

describe('getCoordinates', () => {
  it('should return correct coordinates for cell 1', () => {
    const coords = getCoordinates(1);
    expect(coords).toEqual({ row: 9, col: 0 });
  });

  it('should return correct coordinates for cell 100', () => {
    const coords = getCoordinates(100);
    expect(coords).toEqual({ row: 0, col: 0 });
  });

  it('should handle zig-zag pattern correctly', () => {
    // Row 10 (bottom): 1-10 left to right
    expect(getCoordinates(1).col).toBe(0);
    expect(getCoordinates(10).col).toBe(9);

    // Row 9: 11-20 right to left
    expect(getCoordinates(11).col).toBe(9);
    expect(getCoordinates(20).col).toBe(0);
  });
});

describe('getCellNumber', () => {
  it('should return correct cell number for bottom-left corner', () => {
    expect(getCellNumber(9, 0)).toBe(1);
  });

  it('should return correct cell number for top-left corner', () => {
    expect(getCellNumber(0, 0)).toBe(100);
  });

  it('should handle zig-zag pattern correctly', () => {
    // Bottom row (row 9): left to right
    expect(getCellNumber(9, 0)).toBe(1);
    expect(getCellNumber(9, 9)).toBe(10);

    // Second from bottom (row 8): right to left
    expect(getCellNumber(8, 9)).toBe(11);
    expect(getCellNumber(8, 0)).toBe(20);
  });
});

describe('isSnakeHead', () => {
  it('should return true for snake head positions', () => {
    Object.keys(SNAKES).forEach((head) => {
      expect(isSnakeHead(Number(head))).toBe(true);
    });
  });

  it('should return false for non-snake positions', () => {
    expect(isSnakeHead(1)).toBe(false);
    expect(isSnakeHead(50)).toBe(false);
  });
});

describe('isLadderBottom', () => {
  it('should return true for ladder bottom positions', () => {
    Object.keys(LADDERS).forEach((bottom) => {
      expect(isLadderBottom(Number(bottom))).toBe(true);
    });
  });

  it('should return false for non-ladder positions', () => {
    expect(isLadderBottom(1)).toBe(false);
    expect(isLadderBottom(50)).toBe(false);
  });
});

describe('getNextPosition', () => {
  it('should return snake tail when landing on snake head', () => {
    Object.entries(SNAKES).forEach(([head, tail]) => {
      expect(getNextPosition(Number(head))).toBe(tail);
    });
  });

  it('should return ladder top when landing on ladder bottom', () => {
    Object.entries(LADDERS).forEach(([bottom, top]) => {
      expect(getNextPosition(Number(bottom))).toBe(top);
    });
  });

  it('should return same position for normal cells', () => {
    expect(getNextPosition(1)).toBe(1);
    expect(getNextPosition(50)).toBe(50);
  });
});