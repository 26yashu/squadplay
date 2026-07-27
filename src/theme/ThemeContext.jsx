import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsRepository } from '../repositories/SettingsRepository';
import { themes } from './themes';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Load theme from settings
    const loadTheme = async () => {
      const settings = await settingsRepository.get();
      if (settings?.theme && themes[settings.theme]) {
        setCurrentTheme(settings.theme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      const root = document.documentElement;
      root.setAttribute('data-theme', currentTheme);
      // Optional: keep JS variables if needed elsewhere, but CSS handles standard ones
      Object.entries(theme.variables || {}).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [currentTheme]);

  const setTheme = async (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      const settings = await settingsRepository.get();
      await settingsRepository.save({ ...settings, theme: themeName });
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: ['dark', 'cyberpunk', 'ocean', 'sunset', 'forest', 'amoled', 'aurora', 'galaxy', 'glass', 'minimal'] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
