# Architecture Overview

SquadPlay is built using a modern, loosely-coupled React architecture. It leverages the latest features of React 19 alongside Vite for blistering fast builds and optimized PWA delivery.

## Core Philosophies

1. **Decoupled Game Engines**: Each mini-game operates via an independent `GameManager` class, completely separated from the React UI layer. This allows the core logic of Truth or Dare or Tic Tac Toe to run in isolated unit tests without mocking DOM components.
2. **Event-Driven Communication**: A central `EventBus` (`src/events/eventBus.js`) coordinates cross-system interactions. When a game awards XP or a player unlocks an achievement, it fires an event. The UI simply listens to these events to trigger toasts, modal popups, and visual updates, completely decoupling the UI from business logic.
3. **Offline-First (PWA)**: Assets are aggressively precached via the Vite PWA plugin. The `DataLoader` securely loads and caches JSON question databases on initialization. If the app goes offline, it degrades gracefully and falls back to local data.
4. **Self-Healing Persistence**: All saved state (Profiles, XP, Match History, Leaderboard) flows through a central `BaseStorage` engine that wraps `LocalStorage`. It explicitly catches JSON syntax errors (corruption) and gracefully resets or mitigates data loss without crashing the application.

## Directory Overview

- `src/games/`: Contains the specific implementations for each of the 6 game modules. Inside each module:
  - `engine/`: The core logic class (e.g. `TicTacToeManager.js`).
  - `views/`: The React components representing the active game screens.
  - `components/`: Specific sub-components (e.g. `TicTacToeBoard.jsx`).
- `src/registry/`: The `gameRegistry.js` acts as the single source of truth for the router and the Setup Flow, exporting a uniform schema (Title, Tags, MinPlayers, Supported Modes) for every game.
- `src/engine/`: Core logic systems that run the meta-application.
  - `DataLoader.js`: Fetches and caches questions, words, and challenges.
  - `XPEngine.js`: Calculates level-ups based on match results.
  - `StatsManager.js`: Collects global gameplay metrics.

## Setup & Onboarding Flow

To handle the complexity of configuring 6 entirely different games, SquadPlay uses a dynamic Setup Engine (`src/setup/`).

Instead of building 6 different setup screens, games simply declare what they need in the registry:
```javascript
export const ticTacToeConfig = {
  // ...
  setupSteps: ['players', 'boardSize', 'symbols', 'ready']
};
```
The `SetupContainer` dynamically instantiates the required wizards, aggregates the output into a unified `session` object, and injects it into the respective `GameManager` upon initialization.

## UI / Styling Engine

SquadPlay uses **TailwindCSS v4**, leveraging Vanilla CSS Variables in `index.css` to construct a dynamic, themeable design system. The overarching aesthetic relies on "Neon Glassmorphism", blending dark-mode aesthetics with highly vibrant, blurred accent colors.

Animations are exclusively driven by **Framer Motion** (`motion.div`), utilizing spring physics to create a tactile, interactive feel for buttons, game cards, and turn transitions.
