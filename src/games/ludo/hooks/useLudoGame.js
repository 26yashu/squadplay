import { useState, useEffect, useRef, useCallback } from 'react';
import { LudoManager } from '../engine/LudoManager';

export function useLudoGame(session, players) {
  const [gameState, setGameState] = useState({ state: 'idle' });
  const managerRef = useRef(null);
  
  // Track dice rolling animation state in UI
  const [isRollingDice, setIsRollingDice] = useState(false);
  const rollTimeoutRef = useRef(null);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      if (!session || !players || players.length === 0) {
        throw new Error("Missing session or players configuration");
      }
      
      const manager = new LudoManager(session, players);
      manager.onStateChange = (m) => {
      setGameState({
        state: m.state,
        tokens: [...m.tokenEngine.getTokens()],
        legalMoves: m.legalMoves,
        currentRoll: m.currentRoll,
        currentPlayer: m.turnManager.getCurrentPlayer(),
        stats: { ...m.stats },
        rankings: m.winDetector.getRankings(),
        results: m.results
      });
    };
    
    managerRef.current = manager;
    manager.start();
    
      return () => {
        if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);
        if (managerRef.current && typeof managerRef.current.destroy === 'function') {
          managerRef.current.destroy();
        }
        managerRef.current = null;
      };
    } catch (err) {
      console.error("Ludo Engine Initialization Failed:", err);
      setHasError(true);
      setErrorMessage(err.message);
    }
  }, [session, players]);

  const handleRollDice = useCallback(() => {
    if (managerRef.current?.state !== 'rolling' || isRollingDice) return;
    
    // Trigger animation
    setIsRollingDice(true);
    
    // Wait for animation to finish before applying actual roll
    rollTimeoutRef.current = setTimeout(() => {
      setIsRollingDice(false);
      managerRef.current?.rollDice();
    }, 600);
  }, [isRollingDice]);

  const handleMoveToken = useCallback((tokenId) => {
    managerRef.current?.moveToken(tokenId);
  }, []);

  return {
    ...gameState,
    isRollingDice,
    handleRollDice,
    handleMoveToken,
    hasError,
    errorMessage
  };
}
