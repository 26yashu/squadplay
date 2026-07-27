import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import { SpinWheelPage } from '../src/games/spin-wheel/views/SpinWheelPage';
import { PlayerSessionContext } from '../src/context/PlayerSessionContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

HTMLCanvasElement.prototype.getContext = () => ({ clearRect: () => {}, arc: () => {}, fill: () => {}, closePath: () => {}, beginPath: () => {}, fillText: () => {}, save: () => {}, restore: () => {}, translate: () => {}, rotate: () => {}, measureText: () => ({width: 10}), moveTo: () => {} });

describe('SpinWheel Audit', () => {
  it('should not crash or disappear after first spin', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: '1', text: 'Action 1' },
          { id: '2', text: 'Action 2' },
          { id: '3', text: 'Action 3' }
        ])
      })
    );
    
    const mockPlayers = [
      { id: 'p1', name: 'Alice', colorClass: 'text-red-500' },
      { id: 'p2', name: 'Bob', colorClass: 'text-blue-500' }
    ];
    const mockSession = { wheelType: 'player', rounds: 3 };
    
    vi.useFakeTimers();

    const { container } = render(
      <PlayerSessionContext.Provider value={{ players: mockPlayers, session: mockSession }}>
        <MemoryRouter>
          <Routes>
            <Route path="*" element={<SpinWheelPage />} />
          </Routes>
        </MemoryRouter>
      </PlayerSessionContext.Provider>
    );

    // Verify canvas renders
    await waitFor(() => {
      expect(container.querySelector('canvas')).toBeTruthy();
    });
    
    // Spin the wheel
    const spinBtn = screen.getByRole('button', { name: /spin/i });
    fireEvent.click(spinBtn);
    
    // Fast-forward animation
    act(() => {
      vi.advanceTimersByTime(5000); // duration is 5000ms
    });
    
    // Winner card should appear
    await waitFor(() => {
      expect(screen.getByText(/Winner!/i)).toBeTruthy();
    });
    
    // Click Next
    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    
    // Verify canvas is still there
    expect(container.querySelector('canvas')).toBeTruthy();
    
    vi.useRealTimers();
  });
});
