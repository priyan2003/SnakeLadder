import React from 'react';
import Cell from './Cell';
import { getCellNumber, GRID_SIZE, Player } from '@/lib/gameConfig';

interface BoardProps {
  players: Player[];
}

const Board: React.FC<BoardProps> = ({ players }) => {
  const renderBoard = () => {
    const cells = [];
    
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const cellNumber = getCellNumber(row, col);
        const isLight = (row + col) % 2 === 0;
        
        cells.push(
          <Cell
            key={cellNumber}
            number={cellNumber}
            players={players}
            isLight={isLight}
          />
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="board-container p-2 sm:p-4 rounded-2xl sm:rounded-3xl">
      <div 
        className="grid gap-0.5 sm:gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {renderBoard()}
      </div>
    </div>
  );
};

export default Board;