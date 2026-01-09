import React from 'react';
import { cn } from '@/lib/utils';

interface DiceProps {
  value: number;
  isRolling: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, isRolling }) => {
  const dotPositions: Record<number, string[]> = {
    1: ['center'],
    2: ['top-right', 'bottom-left'],
    3: ['top-right', 'center', 'bottom-left'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
  };

  const getDotClass = (position: string): string => {
    const baseClass = 'dice-dot absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full';
    const positions: Record<string, string> = {
      'top-left': 'top-2 left-2 sm:top-3 sm:left-3',
      'top-right': 'top-2 right-2 sm:top-3 sm:right-3',
      'middle-left': 'top-1/2 left-2 -translate-y-1/2 sm:left-3',
      'middle-right': 'top-1/2 right-2 -translate-y-1/2 sm:right-3',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'bottom-left': 'bottom-2 left-2 sm:bottom-3 sm:left-3',
      'bottom-right': 'bottom-2 right-2 sm:bottom-3 sm:right-3',
    };
    return cn(baseClass, positions[position]);
  };

  const currentValue = isRolling ? Math.floor(Math.random() * 6) + 1 : value;
  const dots = dotPositions[currentValue] || [];

  return (
    <div 
      className={cn(
        'dice relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl',
        isRolling && 'animate-dice-roll'
      )}
    >
      {dots.map((position, index) => (
        <div key={`${position}-${index}`} className={getDotClass(position)} />
      ))}
    </div>
  );
};

export default Dice;