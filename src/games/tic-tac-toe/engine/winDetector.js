export class WinDetector {
  static checkWin(grid, size, winningLength) {
    const n = size;
    const len = winningLength || size;

    // Convert 1D to 2D for easier traversal
    const board = [];
    for (let i = 0; i < n; i++) {
      board.push(grid.slice(i * n, i * n + n));
    }

    const checkLine = (r, c, dr, dc) => {
      const first = board[r][c];
      if (!first) return null;
      const line = [r * n + c];
      for (let i = 1; i < len; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (nr < 0 || nr >= n || nc < 0 || nc >= n) return null;
        if (board[nr][nc] !== first) return null;
        line.push(nr * n + nc);
      }
      return { symbol: first, line };
    };

    // Check all possible starting positions
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!board[r][c]) continue;
        
        // Right
        if (c <= n - len) {
          const win = checkLine(r, c, 0, 1);
          if (win) return win;
        }
        // Down
        if (r <= n - len) {
          const win = checkLine(r, c, 1, 0);
          if (win) return win;
        }
        // Diagonal Down-Right
        if (r <= n - len && c <= n - len) {
          const win = checkLine(r, c, 1, 1);
          if (win) return win;
        }
        // Diagonal Up-Right
        if (r >= len - 1 && c <= n - len) {
          const win = checkLine(r, c, -1, 1);
          if (win) return win;
        }
      }
    }
    
    return null;
  }
}
