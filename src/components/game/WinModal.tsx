import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, PartyPopper } from 'lucide-react';
import { Player, PLAYER_CONFIGS } from '@/lib/gameConfig';
import { cn } from '@/lib/utils';

interface WinModalProps {
  isOpen: boolean;
  winner: Player | null;
  totalRolls: number;
  onRestart: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, winner, totalRolls, onRestart }) => {
  const config = winner ? PLAYER_CONFIGS.find(c => c.id === winner.id) : null;

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className={cn(
                'w-24 h-24 rounded-full flex items-center justify-center animate-bounce-in bg-gradient-to-br',
                config?.color
              )}>
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <PartyPopper className="absolute -top-2 -right-2 w-8 h-8 text-primary animate-wiggle" />
              <PartyPopper className="absolute -top-2 -left-2 w-8 h-8 text-accent animate-wiggle" style={{ animationDelay: '0.1s' }} />
            </div>
          </div>
          <DialogTitle className="text-3xl font-display font-bold text-center">
            🎉 {winner?.name} Wins! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-lg text-muted-foreground">
            {config?.emoji} Congratulations! You reached position 100!
          </p>
          
          <div className="p-4 rounded-2xl bg-secondary">
            <p className="text-sm text-muted-foreground mb-1">Total Game Rolls</p>
            <p className="text-4xl font-display font-bold text-primary">{totalRolls}</p>
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className={cn(
              'w-full font-display text-lg gap-2 h-14 bg-gradient-to-r text-white border-0',
              config?.color
            )}
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;