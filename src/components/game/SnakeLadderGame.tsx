import React, { useState, useCallback, useRef } from 'react';
import Board from './Board';
import GameControls from './GameControls';
import WinModal from './WinModal';
import PlayerSelect from './PlayerSelect';
import { getNextPosition, BOARD_SIZE, Player, PLAYER_CONFIGS } from '@/lib/gameConfig';
import { toast } from 'sonner';

const SnakeLadderGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [rollHistory, setRollHistory] = useState<{ playerId: number; value: number }[]>([]);
  const [totalRolls, setTotalRolls] = useState(0);
  
  const moveTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    moveTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
    moveTimeoutRef.current = [];
  };

  const startGame = (playerCount: number) => {
    const initialPlayers: Player[] = PLAYER_CONFIGS.slice(0, playerCount).map(config => ({
      ...config,
      position: 0,
    }));
    setPlayers(initialPlayers);
    setGameStarted(true);
    toast.success(`Game started with ${playerCount} players! 🎲`);
  };

  const animateMovement = useCallback((
    playerIndex: number,
    startPos: number, 
    endPos: number, 
    onComplete: () => void
  ) => {
    const steps = endPos - startPos;
    const direction = steps > 0 ? 1 : -1;
    const totalSteps = Math.abs(steps);
    
    for (let i = 1; i <= totalSteps; i++) {
      const timeout = setTimeout(() => {
        setPlayers(prev => prev.map((p, idx) => 
          idx === playerIndex 
            ? { ...p, position: startPos + (i * direction) }
            : p
        ));
        
        if (i === totalSteps) {
          onComplete();
        }
      }, i * 150);
      
      moveTimeoutRef.current.push(timeout);
    }
  }, []);

  const handleSnakeOrLadder = useCallback((playerIndex: number, position: number) => {
    const { nextPos, type } = getNextPosition(position);
    const player = players[playerIndex];
    
    if (type) {
      const timeout = setTimeout(() => {
        if (type === 'snake') {
          toast.error(`🐍 ${player.name} hit a snake! Sliding to ${nextPos}`, {
            duration: 2000,
          });
        } else {
          toast.success(`🪜 ${player.name} found a ladder! Climbing to ${nextPos}`, {
            duration: 2000,
          });
        }
        
        animateMovement(playerIndex, position, nextPos, () => {
          setIsMoving(false);
          
          if (nextPos === BOARD_SIZE) {
            setWinner({ ...player, position: nextPos });
          } else {
            // Next player's turn
            setCurrentPlayerIndex(prev => (prev + 1) % players.length);
          }
        });
      }, 300);
      
      moveTimeoutRef.current.push(timeout);
    } else {
      setIsMoving(false);
      
      if (position === BOARD_SIZE) {
        setWinner({ ...player, position });
      } else {
        // Next player's turn
        setCurrentPlayerIndex(prev => (prev + 1) % players.length);
      }
    }
  }, [players, animateMovement]);

  const rollDice = useCallback(() => {
    if (isRolling || isMoving || winner) return;

    const currentPlayer = players[currentPlayerIndex];
    setIsRolling(true);
    
    const rollTimeout = setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      setRollHistory(prev => [...prev, { playerId: currentPlayer.id, value: roll }]);
      setTotalRolls(prev => prev + 1);
      setIsRolling(false);
      
      const currentPos = currentPlayer.position;
      const newPos = currentPos + roll;
      
      if (newPos > BOARD_SIZE) {
        toast.info(`${currentPlayer.name} needs exactly ${BOARD_SIZE - currentPos} to win!`, {
          duration: 2000,
        });
        // Next player's turn
        setCurrentPlayerIndex(prev => (prev + 1) % players.length);
        return;
      }
      
      setIsMoving(true);
      
      if (currentPos === 0) {
        // First move
        let step = 1;
        for (let i = 1; i <= roll; i++) {
          const timeout = setTimeout(() => {
            setPlayers(prev => prev.map((p, idx) => 
              idx === currentPlayerIndex 
                ? { ...p, position: i }
                : p
            ));
            if (i === roll) {
              handleSnakeOrLadder(currentPlayerIndex, roll);
            }
          }, i * 150);
          moveTimeoutRef.current.push(timeout);
        }
      } else {
        animateMovement(currentPlayerIndex, currentPos, newPos, () => {
          handleSnakeOrLadder(currentPlayerIndex, newPos);
        });
      }
    }, 600);
    
    moveTimeoutRef.current.push(rollTimeout);
  }, [isRolling, isMoving, winner, players, currentPlayerIndex, animateMovement, handleSnakeOrLadder]);

  const restartGame = useCallback(() => {
    clearAllTimeouts();
    setGameStarted(false);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setDiceValue(0);
    setIsRolling(false);
    setIsMoving(false);
    setWinner(null);
    setRollHistory([]);
    setTotalRolls(0);
  }, []);

  if (!gameStarted) {
    return <PlayerSelect onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            🐍 Snake & Ladder 🪜
          </h1>
          <p className="text-muted-foreground font-medium">
            {players.length} Players • Roll the dice and reach 100 to win!
          </p>
        </header>

        {/* Game Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          {/* Board */}
          <div className="w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0">
            <Board players={players} />
          </div>

          {/* Controls */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-8">
            <GameControls
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              diceValue={diceValue}
              isRolling={isRolling}
              isMoving={isMoving}
              rollHistory={rollHistory}
              onRollDice={rollDice}
              onRestart={restartGame}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded cell-snake flex items-center justify-center text-xs">🐍</div>
            <span className="text-muted-foreground">Snake (Go Down)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded cell-ladder flex items-center justify-center text-xs">🪜</div>
            <span className="text-muted-foreground">Ladder (Go Up)</span>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      <WinModal
        isOpen={!!winner}
        winner={winner}
        totalRolls={totalRolls}
        onRestart={restartGame}
      />
    </div>
  );
};

export default SnakeLadderGame;