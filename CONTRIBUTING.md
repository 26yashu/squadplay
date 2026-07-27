# Contributing to SquadPlay

First off, thank you for considering contributing to SquadPlay! It's people like you that make open-source gaming such a fantastic community.

## 🧠 Developer Notes & Mindset

SquadPlay is explicitly built to be a **local, offline-first** web application. 
When adding new features or architectural changes, please respect these core principles:
1. **Never Assume Network Connectivity**: Features must gracefully degrade or function entirely offline. If you fetch an external resource, it must be precached via the Service Worker or have a robust fallback.
2. **Keep the Logic Pure**: Any new Game logic should be placed in an independent `GameManager` (or similar engine file). React components should remain extremely lightweight, effectively serving as pure "dumb" views mapping state to UI.
3. **Respect the UX Guidelines**: The app aims for a premium, tactile feel. Micro-animations (via Framer Motion) and robust feedback (Toasts, Sound Effects) are not afterthoughts; they are requirements for merged PRs.

## 🎮 Adding a New Game

If you want to add a completely new game to SquadPlay, follow these steps:

1. **Create the Directory**: Scaffold your game inside `src/games/[your-game-name]/`. Include sub-folders for `engine/`, `views/`, and `components/`.
2. **Build the Engine**: Write an independent ES6 class for your Game Manager. Ensure it emits state changes using a simple callback structure (e.g. `this.onStateChange(this)`).
3. **Register the Game**: Open `src/registry/gameRegistry.js` and add a configuration block for your new game. You must supply a Title, Subtitle, Tags, UI Colors, and the necessary Setup Steps (e.g. `['players', 'rounds']`).
4. **Wire the Routes**: In `src/pages/GamePlaceholder.jsx`, import your primary view via `React.lazy` and add it to the routing switch.
5. **Test**: All core game engines *must* have 100% logic coverage using Vitest. Submit your unit tests alongside your PR.

## 🐛 Submitting Bugs

- Please ensure the bug was not already reported by searching the GitHub issues.
- Include the browser type, OS, and detailed steps to reproduce.
- If it's a visual issue, screenshots or screen recordings are immensely helpful.

## 🛠️ Local Development

1. Fork the repo and clone it locally.
2. Run `npm install` and `npm run dev`.
3. Adhere to standard linting (`npm run lint`). We use `oxlint` for blazing fast static analysis.
4. Verify your tests with `npm run test -- --coverage`.

Happy Hacking! 🚀
