import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getPlayers } from '../storage/playerStorage';
import { getSession } from '../storage/sessionStorage';

export const PlayerSessionContext = createContext();

export function PlayerSessionProvider({ children }) {
  const [players, setPlayers] = useLocalStorage('squadplay_players', getPlayers());
  const [session, setSession] = useLocalStorage('squadplay_session', getSession() || {});

  const updateSession = (updates) => setSession((prev) => ({ ...prev, ...updates }));
  const clearSession = () => setSession({});

  return (
    <PlayerSessionContext.Provider value={{ players, setPlayers, session, updateSession, clearSession }}>
      {children}
    </PlayerSessionContext.Provider>
  );
}
