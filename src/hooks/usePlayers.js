import { useContext, useCallback } from 'react';
import { PlayerSessionContext } from '../context/PlayerSessionContext';

export function usePlayers() {
  const context = useContext(PlayerSessionContext);
  if (!context) throw new Error('usePlayers must be used within PlayerSessionProvider');
  
  const { players, setPlayers } = context;

  const addPlayer = useCallback((player) => {
    if (players.length >= 4) return false;
    setPlayers([...players, { ...player, id: Date.now().toString() }]);
    return true;
  }, [players, setPlayers]);

  const removePlayer = useCallback((id) => {
    setPlayers(players.filter(p => p.id !== id));
  }, [players, setPlayers]);

  const updatePlayer = useCallback((id, updates) => {
    setPlayers(players.map(p => p.id === id ? { ...p, ...updates } : p));
  }, [players, setPlayers]);

  return { players, addPlayer, removePlayer, updatePlayer, setPlayers };
}
