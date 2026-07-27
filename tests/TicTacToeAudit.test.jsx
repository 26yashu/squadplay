import { render, screen, fireEvent } from '@testing-library/react';
import { TicTacToePage } from '../src/games/tic-tac-toe/views/TicTacToePage';
import { PlayerSessionContext } from '../src/context/PlayerSessionContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

describe('TicTacToe Audit', () => {
  it('should detect a winner', async () => {
    const mockPlayers = [
      { id: 'p1', name: 'Alice', colorClass: 'text-red-500' },
      { id: 'p2', name: 'Bob', colorClass: 'text-blue-500' }
    ];
    const mockSession = { boardSize: 3, winningLength: 3 };
    
    render(
      <PlayerSessionContext.Provider value={{ players: mockPlayers, session: mockSession }}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<TicTacToePage />} />
          </Routes>
        </MemoryRouter>
      </PlayerSessionContext.Provider>
    );

    const cells = await screen.findAllByRole('button');
    const getEmptyCell = () => cells.find(b => b.textContent === '' && !b.disabled);
    
    // Alice (X) plays 0
    fireEvent.click(cells[0]); // 0
    // Bob (O) plays 3
    fireEvent.click(cells[3]); // 3
    // Alice (X) plays 1
    fireEvent.click(cells[1]); // 1
    // Bob (O) plays 4
    fireEvent.click(cells[4]); // 4
    // Alice (X) plays 2 -> WIN!
    fireEvent.click(cells[2]); // 2
    
    // WinnerModal should appear
    expect(await screen.findByText(/Winner!/i)).toBeTruthy();
  });
});
