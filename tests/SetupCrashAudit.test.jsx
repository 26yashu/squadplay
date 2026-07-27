import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SetupContainer } from '../src/setup/components/SetupContainer';
import { SetupErrorBoundary } from '../src/setup/components/SetupErrorBoundary';
import { gameRegistry } from '../src/registry/gameRegistry';
import { PlayerSessionProvider } from '../src/context/PlayerSessionContext';

describe('Setup Flow Audit', () => {
  for (const game of gameRegistry) {
    if (!game.available) continue;
    
    it(`should render SetupContainer for ${game.id} without crashing`, () => {
      let caughtError = null;
      try {
        render(
          <PlayerSessionProvider>
            <MemoryRouter initialEntries={[`/setup/${game.id}`]}>
              <SetupErrorBoundary>
                <Routes>
                  <Route path="/setup/:gameId" element={<SetupContainer />} />
                </Routes>
              </SetupErrorBoundary>
            </MemoryRouter>
          </PlayerSessionProvider>
        );
      } catch (e) {
        caughtError = e;
        console.error(`Crash in ${game.id}:`, e);
      }
      expect(caughtError).toBeNull();
    });
  }
});
