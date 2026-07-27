import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SetupErrorBoundary } from '../setup/components/SetupErrorBoundary';

const GamesPage = lazy(() => import('../pages/GamesPage').then(module => ({ default: module.GamesPage })));
const GamePlaceholder = lazy(() => import('../pages/GamePlaceholder').then(module => ({ default: module.GamePlaceholder })));
const SetupContainer = lazy(() => import('../setup/components/SetupContainer').then(module => ({ default: module.SetupContainer })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage').then(module => ({ default: module.LeaderboardPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const HistoryPage = lazy(() => import('../pages/HistoryPage').then(module => ({ default: module.HistoryPage })));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage').then(module => ({ default: module.AchievementsPage })));

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
    <div className="w-12 h-12 border-4 border-hyper-pink border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const withSetupErrorBoundary = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <SetupErrorBoundary>
      <Component />
    </SetupErrorBoundary>
  </Suspense>
);

import { MainLayout } from '../layouts/MainLayout';
import { PlaceholderPage } from '../pages/PlaceholderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'games',
        element: withSuspense(() => <GamesPage />),
      },
      {
        path: 'leaderboard',
        element: withSuspense(LeaderboardPage),
      },
      {
        path: 'profile',
        element: withSuspense(ProfilePage),
      },
      {
        path: 'settings',
        element: withSuspense(SettingsPage),
      }
    ]
  },
  {
    path: '/history',
    element: withSuspense(HistoryPage),
  },
  {
    path: '/achievements',
    element: withSuspense(AchievementsPage),
  },
  {
    path: '/setup/:gameId',
    element: withSetupErrorBoundary(SetupContainer),
  },
  {
    path: '/game/:gameId',
    element: withSuspense(GamePlaceholder),
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <h1 className="text-6xl font-black text-hyper-pink mb-4">404</h1>
        <p className="text-gray-400 mb-8">Oops! We couldn't find that page.</p>
        <a href="/" className="px-6 py-3 bg-neon-indigo text-white font-bold rounded-xl shadow-[0_0_15px_rgba(111,0,255,0.5)]">
          Go Home
        </a>
      </div>
    ),
  }
]);
