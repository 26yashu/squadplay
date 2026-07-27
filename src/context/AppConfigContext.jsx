import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getSettings } from '../storage/settingsStorage';
import { soundManager } from '../audio/SoundManager';
import { hapticsManager } from '../haptics/HapticsManager';

export const AppConfigContext = createContext();

export function AppConfigProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('squadplay_settings', getSettings());

  useEffect(() => {
    soundManager.setEnabled(settings.sound !== false);
    hapticsManager.setEnabled(settings.haptics !== false);
  }, [settings.sound, settings.haptics]);

  const setTheme = (theme) => setSettings({ ...settings, theme });
  const setSound = (sound) => setSettings({ ...settings, sound });
  const setHaptics = (haptics) => setSettings({ ...settings, haptics });

  return (
    <AppConfigContext.Provider value={{ ...settings, setTheme, setSound, setHaptics }}>
      {children}
    </AppConfigContext.Provider>
  );
}
