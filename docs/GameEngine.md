# Game Engine Architecture

SquadPlay employs a standard `GameManager` pattern to abstract the logic of various game types into a consistent, easily consumable API for the React UI.

## The Manager Lifecycle

Every mini-game implements a manager (e.g. `QuizGameManager`, `CharadesManager`, `TruthOrDareManager`) that exposes a core state machine.

```text
loading -> player_ready -> playing -> turn_result -> finished
```

### 1. Initialization
When a user mounts a game page, the corresponding React hook (e.g. `useQuizGame`) instantiates the manager and invokes `initialize()`. 
During this phase, the manager interacts with the `DataLoader` to asynchronously fetch necessary datasets (Trivia Questions, Charades Words), shuffle the deck, and prepare the player queue.

### 2. Turn Management
The manager handles the logic of "who goes next". 
Methods like `next()` advance the internal cursor and emit a state change callback `onStateChange(this)`. The React Hook listens to this callback and triggers a re-render with the latest properties (`currentPlayer`, `currentQuestion`, `score`).

### 3. Resolution
Upon answering a question, successfully guessing a word, or identifying a Tic Tac Toe win, the manager calls `finish()`.
The `finish()` method is critical as it triggers cross-cutting concerns:
- Distributes XP by calling `xpEngine.addXp()`.
- Unlocks achievements.
- Appends the match result to `HistoryStorage`.
- Updates the `Leaderboard`.

## Why this Architecture?

1. **Testability**: Game engines can be unit-tested without mounting a single React Component. We can verify Win Conditions, Turn Rotations, and Score Deductions instantly in Node.js (via Vitest).
2. **Reusability**: Hooks like `useRapidFireGame` heavily reuse the underlying `GameManager` class.
3. **Simplicity**: The React layer acts purely as a View. It does not dictate who plays next or whether the timer has expired. It simply receives the state string (`player_ready`) and renders the corresponding visual layer.
