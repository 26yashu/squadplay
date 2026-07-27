import { render, waitFor, screen } from '@testing-library/react';
import { TruthOrDarePage } from '../src/games/truth-or-dare/views/TruthOrDarePage';
import { PlayerSessionContext } from '../src/context/PlayerSessionContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

describe('TruthOrDarePage Audit', () => {
  it('should load prompts without error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: '1', type: 'truth', prompt: 'A', difficulty: 'medium' },
          { id: '2', type: 'dare', prompt: 'B', difficulty: 'medium' }
        ])
      })
    );
    
    const mockPlayers = [{ id: 'p1', name: 'Alice', colorClass: 'text-red-500' }];
    const mockSession = { mode: 'party', difficulty: 'medium' };
    
    render(
      <PlayerSessionContext.Provider value={{ players: mockPlayers, session: mockSession }}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<TruthOrDarePage />} />
          </Routes>
        </MemoryRouter>
      </PlayerSessionContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Content Unavailable/i)).not.toBeTruthy();
    }, { timeout: 3000 });
    
    expect(screen.getByText(/Alice/i)).toBeTruthy();
  });
});
