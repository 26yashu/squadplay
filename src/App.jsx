import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { AppConfigProvider } from './context/AppConfigContext';
import { PlayerSessionProvider } from './context/PlayerSessionContext';
import { NotificationProvider } from './notifications/NotificationProvider';
import { achievementEngine } from './achievements/achievementEngine';
import { StatsManager } from './engine/core/statsManager';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { ThemeProvider } from './theme/ThemeContext';

// Initialize storage subscribers
import './storage/xpStorage';
import './storage/statsStorage';
import './storage/historyStorage';
import { profileStorage } from './storage/profileStorage';

import { missionEngine } from './missions/missionEngine';

function App() {
  useEffect(() => {
    const globalStats = new StatsManager('squadplay_global_stats');
    achievementEngine.initialize(globalStats);
    missionEngine.initialize();
    
    // Trigger daily login reward check
    profileStorage.processDailyLogin();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-white/20">
      <ErrorBoundary>
        <ThemeProvider>
          <AppConfigProvider>
            <PlayerSessionProvider>
              <NotificationProvider>
                <RouterProvider router={router} />
              </NotificationProvider>
            </PlayerSessionProvider>
          </AppConfigProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
