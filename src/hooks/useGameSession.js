import { useContext } from 'react';
import { PlayerSessionContext } from '../context/PlayerSessionContext';

export function useGameSession() {
  const context = useContext(PlayerSessionContext);
  if (!context) throw new Error('useGameSession must be used within PlayerSessionProvider');
  
  const { session, updateSession, clearSession } = context;

  return { session, updateSession, clearSession };
}
