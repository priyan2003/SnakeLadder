import React from 'react';
import { isSnakeHead, isLadderBottom, SNAKES, LADDERS, PLAYER_CONFIGS, Player } from '@/lib/gameConfig';
import { cn } from '@/lib/utils';

interface CellProps {
  number: number;
  players: Player[];
  isLight: boolean;
}

const Cell: React.FC<CellProps> = ({ number, players, isLight }) => {
  const hasSnake = isSnakeHead(number);
  const hasLadder = isLadderBottom(number);
  const playersHere = players.filter(p => p.position === number);
  
  const getCellClass = () => {
    if (hasSnake) return 'cell-snake';
    if (hasLadder) return 'cell-ladder';
    return isLight ? 'bg-game-cellLight' : 'bg-game-cellDark';
  };

  const getIndicator = () => {
    if (hasSnake) {
      return (
        <div className="absolute bottom-0.5 right-0.5 text-[6px] sm:text-[10px] opacity-80">
          🐍→{SNAKES[number]}
        </div>
      );
    }
    if (hasLadder) {
      return (
        <div className="absolute bottom-0.5 right-0.5 text-[6px] sm:text-[10px] opacity-80">
          🪜→{LADDERS[number]}
        </div>
      );
    }
    return null;
  };

  const getPlayerTokenPosition = (index: number, total: number) => {
    if (total === 1) return 'inset-0';
    if (total === 2) {
      return index === 0 ? 'top-0 left-0 w-1/2 h-1/2' : 'bottom-0 right-0 w-1/2 h-1/2';
    }
    if (total === 3) {
      if (index === 0) return 'top-0 left-0 w-1/2 h-1/2';
      if (index === 1) return 'top-0 right-0 w-1/2 h-1/2';
      return 'bottom-0 left-1/4 w-1/2 h-1/2';
    }
    // 4 players
    const positions = [
      'top-0 left-0 w-1/2 h-1/2',
      'top-0 right-0 w-1/2 h-1/2',
      'bottom-0 left-0 w-1/2 h-1/2',
      'bottom-0 right-0 w-1/2 h-1/2',
    ];
    return positions[index];
  };

  return (
    <div
      className={cn(
        'cell relative aspect-square flex items-center justify-center rounded-md sm:rounded-lg',
        'text-[10px] sm:text-sm font-display font-semibold',
        'border border-border/30',
        getCellClass(),
        playersHere.length > 0 && 'ring-2 ring-primary/50'
      )}
    >
      <span className={cn(
        'z-10',
        playersHere.length > 0 && 'opacity-30 text-[8px] sm:text-xs'
      )}>
        {number}
      </span>
      
      {playersHere.map((player, index) => {
        const config = PLAYER_CONFIGS.find(c => c.id === player.id);
        return (
          <div 
            key={player.id}
            className={cn(
              'absolute flex items-center justify-center',
              getPlayerTokenPosition(index, playersHere.length)
            )}
          >
            <div 
              className={cn(
                'w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center',
                'bg-gradient-to-br shadow-lg animate-bounce-in',
                config?.color
              )}
            >
              <span className="text-[8px] sm:text-xs text-white font-bold">{player.id}</span>
            </div>
          </div>
        );
      })}
      
      {getIndicator()}
    </div>
  );
};

export default Cell;