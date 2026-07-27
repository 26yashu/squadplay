import { getStorage, setStorage } from './localStorage';

const SESSION_KEY = 'squadplay_session';

export const getSession = () => getStorage(SESSION_KEY, null);
export const saveSession = (session) => setStorage(SESSION_KEY, session);
export const clearSession = () => setStorage(SESSION_KEY, null);
