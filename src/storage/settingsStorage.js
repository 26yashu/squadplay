import { getStorage, setStorage } from './localStorage';

const SETTINGS_KEY = 'squadplay_settings';

const defaultSettings = {
  theme: 'dark',
  sound: true,
  haptics: true,
};

export const getSettings = () => getStorage(SETTINGS_KEY, defaultSettings);
export const saveSettings = (settings) => setStorage(SETTINGS_KEY, { ...getSettings(), ...settings });
