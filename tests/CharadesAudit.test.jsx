import { render, waitFor, screen } from '@testing-library/react';
import { CharadesPage } from '../src/games/charades/views/CharadesPage';
import { PlayerSessionContext } from '../src/context/PlayerSessionContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

describe('CharadesPage Audit', () => {
  it('should reach round_start without hanging', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: '1', word: 'A', difficulty: 'easy' },
          { id: '2', word: 'B', difficulty: 'easy' }
        ])
      })
    );
    
    const mockPlayers = [{ id: 'p1', name: 'Alice', colorClass: 'text-red-500' }];
    const mockSession = { teams: 'ffa', rounds: 3, timer: 60 };
    
    render(
      <PlayerSessionContext.Provider value={{ players: mockPlayers, session: mockSession }}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<CharadesPage />} />
          </Routes>
        </MemoryRouter>
      </PlayerSessionContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Ready!/i)).toBeTruthy();
    }, { timeout: 3000 });
    
    expect(screen.getByText(/Alice/i)).toBeTruthy();
  });
});
