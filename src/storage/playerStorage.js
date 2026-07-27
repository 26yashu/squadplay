import { getStorage, setStorage } from './localStorage';

const PLAYERS_KEY = 'squadplay_players';

export const getPlayers = () => getStorage(PLAYERS_KEY, []);
export const savePlayers = (players) => setStorage(PLAYERS_KEY, players);
