import React from 'react';
import Dice from './Dice';
import { Button } from '@/components/ui/button';
import { RotateCcw, Dices } from 'lucide-react';
import { Player, PLAYER_CONFIGS } from '@/lib/gameConfig';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number;
  isRolling: boolean;
  isMoving: boolean;
  rollHistory: { playerId: number; value: number }[];
  onRollDice: () => void;
  onRestart: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  players,
  currentPlayerIndex,
  diceValue,
  isRolling,
  isMoving,
  rollHistory,
  onRollDice,
  onRestart,
}) => {
  const isDisabled = isRolling || isMoving;
  const currentPlayer = players[currentPlayerIndex];
  const currentConfig = PLAYER_CONFIGS.find(c => c.id === currentPlayer?.id);

  return (
    <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5">
      {/* Current Turn Indicator */}
      <div className={cn(
        'p-3 rounded-xl text-center bg-gradient-to-r text-white font-display font-bold text-lg',
        currentConfig?.color
      )}>
        {currentConfig?.emoji} {currentPlayer?.name}'s Turn
      </div>

      {/* Dice Display */}
      <div className="flex flex-col items-center gap-4">
        <Dice value={diceValue} isRolling={isRolling} />
        
        <Button
          onClick={onRollDice}
          disabled={isDisabled}
          size="lg"
          className={cn(
            'w-full font-display text-lg gap-2 h-12 sm:h-14 bg-gradient-to-r text-white border-0',
            currentConfig?.color
          )}
        >
          <Dices className="w-5 h-5" />
          {isRolling ? 'Rolling...' : isMoving ? 'Moving...' : 'Roll Dice'}
        </Button>
      </div>

      {/* Player Positions */}
      <div className="space-y-2">
        <span className="text-sm text-muted-foreground font-medium">Players</span>
        <div className="grid grid-cols-2 gap-2">
          {players.map((player, index) => {
            const config = PLAYER_CONFIGS.find(c => c.id === player.id);
            return (
              <div
                key={player.id}
                className={cn(
                  'p-2 rounded-xl flex items-center gap-2 transition-all',
                  index === currentPlayerIndex 
                    ? 'bg-gradient-to-r text-white ' + config?.color
                    : 'bg-secondary'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  index === currentPlayerIndex 
                    ? 'bg-white/30 text-white'
                    : 'bg-gradient-to-br text-white ' + config?.color
                )}>
                  {player.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{player.name}</div>
                  <div className="text-[10px] opacity-80">
                    Pos: {player.position === 0 ? 'Start' : player.position}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roll History */}
      {rollHistory.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground font-medium">Recent Rolls</span>
          <div className="flex gap-1.5 flex-wrap">
            {rollHistory.slice(-6).map((roll, index) => {
              const config = PLAYER_CONFIGS.find(c => c.id === roll.playerId);
              return (
                <div
                  key={index}
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs text-white bg-gradient-to-br',
                    config?.color
                  )}
                >
                  {roll.value}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Restart Button */}
      <Button
        onClick={onRestart}
        variant="outline"
        className="w-full gap-2 font-display"
      >
        <RotateCcw className="w-4 h-4" />
        Restart Game
      </Button>
    </div>
  );
};

export default GameControls;
