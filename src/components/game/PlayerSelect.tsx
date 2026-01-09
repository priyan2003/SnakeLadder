import React from 'react';
import { Button } from '@/components/ui/button';
import { PLAYER_CONFIGS } from '@/lib/gameConfig';
import { cn } from '@/lib/utils';
import { Users, Play } from 'lucide-react';

interface PlayerSelectProps {
  onStart: (playerCount: number) => void;
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({ onStart }) => {
  const [selectedCount, setSelectedCount] = React.useState(2);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass rounded-3xl p-6 sm:p-10 max-w-md w-full space-y-8 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            🐍 Snake & Ladder 🪜
          </h1>
          <p className="text-muted-foreground font-medium">
            Select number of players to start
          </p>
        </div>

        {/* Player Count Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="font-medium">Number of Players</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setSelectedCount(count)}
                className={cn(
                  'p-4 rounded-2xl border-2 transition-all font-display text-2xl font-bold',
                  selectedCount === count
                    ? 'border-primary bg-primary text-primary-foreground scale-105'
                    : 'border-border bg-secondary hover:border-primary/50'
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Player Preview */}
        <div className="space-y-3">
          <span className="text-sm text-muted-foreground font-medium">Players</span>
          <div className="flex justify-center gap-3 flex-wrap">
            {PLAYER_CONFIGS.slice(0, selectedCount).map((config) => (
              <div
                key={config.id}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r text-white font-medium',
                  config.color
                )}
              >
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-sm font-bold">
                  {config.id}
                </div>
                <span className="text-sm">{config.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={() => onStart(selectedCount)}
          size="lg"
          className="w-full font-display text-xl gap-3 h-16 bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 hover:opacity-90"
        >
          <Play className="w-6 h-6" />
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default PlayerSelect;
