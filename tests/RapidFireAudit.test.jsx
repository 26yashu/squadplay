import { render, waitFor, screen } from '@testing-library/react';
import { RapidFirePage } from '../src/games/rapid-fire/views/RapidFirePage';
import { PlayerSessionContext } from '../src/context/PlayerSessionContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

describe('RapidFirePage Audit', () => {
  it('should transition from loading to playing', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', question: 'A', correctAnswer: 'A', options: ['A', 'B', 'C', 'D'], difficulty: 'easy' }])
      })
    );
    
    const mockPlayers = [{ id: 'p1', name: 'Alice', colorClass: 'text-red-500' }];
    const mockSession = { mode: 'individual', timer: 10 };
    
    render(
      <PlayerSessionContext.Provider value={{ players: mockPlayers, session: mockSession }}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<RapidFirePage />} />
          </Routes>
        </MemoryRouter>
      </PlayerSessionContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Content Unavailable/i)).not.toBeTruthy();
    }, { timeout: 3000 });
    
    // Check if it reached "Rapid Fire" header
    expect(screen.getByText('Rapid Fire')).toBeTruthy();
  });
});
