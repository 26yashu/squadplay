<div align="center">
  <img src="public/icons/icon-512x512.png" alt="SquadPlay Logo" width="120" />
  <h1>SquadPlay</h1>
  <p><strong>The Ultimate Offline-First Local Multiplayer Party Game Hub</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/react-v19.2.7-blue.svg?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/vite-v8.1.1-646CFF.svg?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/tailwindcss-v4.3.3-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/framer--motion-v12.42-purple.svg?style=flat-square&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/PWA-Ready-success.svg?style=flat-square&logo=pwa" alt="PWA" />
  </p>
</div>

---

**SquadPlay** is a beautifully crafted, portfolio-ready web application that transforms any screen into a vibrant hub for local multiplayer party games. Designed with a mobile-first philosophy, premium glassmorphism aesthetics, and comprehensive offline support via PWA technology, it allows groups of friends to gather around a single device for endless entertainment—no internet connection required.

## 🚀 Features

- **6 Unique Game Engines**: 
  - 🧠 **Quiz Battle**: Competitive trivia with dynamic score multipliers.
  - ⚡ **Rapid Fire**: High-stakes, time-pressured streak building.
  - 🎭 **Charades**: Classic acting game with specialized word packs.
  - 🎡 **Spin Wheel**: Physics-based random player selection.
  - 😈 **Truth or Dare**: Icebreakers with automated turn rotations.
  - ⭕ **Tic Tac Toe**: Strategic board game with automatic win-detection.
- **Progressive Web App (PWA)**: Installable on iOS/Android/Desktop with full offline capabilities and caching.
- **Robust Persistence**: Self-healing `LocalStorage` engine guarantees data integrity even when corrupted.
- **Gamification**: Built-in XP leveling system, stat tracking, and unlockable achievements.
- **Premium UI/UX**: Fluid animations powered by Framer Motion, dynamic color mapping, and a neon-infused dark mode design.

## 📸 Screenshots

*(Replace with actual paths when deployed)*
| Home & Leaderboard | Game Setup Flow | Gameplay Screen |
| :---: | :---: | :---: |
| ![Home](/docs/assets/home.jpg) | ![Setup](/docs/assets/setup.jpg) | ![Gameplay](/docs/assets/gameplay.jpg) |

## 🏗️ Architecture

SquadPlay is built using a highly modular, strictly decoupled architecture pattern.

- **[Architecture Overview](docs/Architecture.md)**: Explore the decoupled event-driven system and core components.
- **[Game Engine Architecture](docs/GameEngine.md)**: Discover how the scalable `GameManager` base class handles state machines, lifecycle hooks, and abstract game logic.
- **[Storage & Persistence](docs/Storage.md)**: Learn about our robust `BaseStorage` class featuring JSON corruption recovery and versioned migrations.

## 📂 Folder Structure

```text
squadplay/
├── public/                 # Static assets, PWA icons, offline manifests
├── src/
│   ├── achievements/       # Unlock logic and gamification
│   ├── components/         # Reusable React components (UI, Layout, Navigation)
│   ├── engine/             # Core engines (Data Loaders, XP, Stats, EventBus)
│   ├── games/              # Individual game logic & UI implementations
│   ├── hooks/              # Custom React hooks (Game Session, Players)
│   ├── layouts/            # Page layouts and error boundaries
│   ├── pages/              # Primary route entrypoints (Home, Profile, etc.)
│   ├── registry/           # Centralized configuration mapping for games
│   ├── router/             # React Router with React.lazy + Suspense integration
│   ├── setup/              # Multi-step onboarding and game configuration logic
│   ├── storage/            # Self-healing LocalStorage wrappers
│   ├── theme/              # Centralized styling and dynamic color generation
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Root React application
│   └── index.css           # Tailwind v4 configuration and global CSS tokens
├── tests/                  # Vitest + React Testing Library suites
├── docs/                   # Extended project documentation
└── vite.config.js          # Vite & PWA plugin configurations
```

## 🛠️ Installation & Development

To run this project locally, ensure you have **Node.js 18+** installed.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/squadplay.git
cd squadplay

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

For executing the test suite (Vitest + React Testing Library):

```bash
npm run test
```

## 🌐 Deployment

SquadPlay is compiled using Vite and can be deployed to any static host (Vercel, Netlify, GitHub Pages).

See the **[Deployment Guide](docs/Deployment.md)** for detailed instructions on configuring the PWA Service Worker for production.

## 🔧 Technologies

- **Core**: React 19, React Router v7, Vite v8
- **Styling**: TailwindCSS v4, Vanilla CSS variables
- **Animations**: Framer Motion
- **Testing**: Vitest, React Testing Library, jsdom
- **Quality**: oxlint (linting), V8 Coverage
- **Icons**: Lucide React

## 🛣️ Roadmap

- [x] Initial 6 core mini-games
- [x] Profile, History, and XP persistence
- [x] PWA offline caching and Install Prompts
- [x] Comprehensive test suites (Vitest)
- [x] Lazy loading & code-splitting
- [ ] Multiplayer Sync via WebSockets or WebRTC (Future)
- [ ] Cloud sync for Player Profiles
- [ ] Downloadable expansion packs for Trivia and Charades

## 🤝 Contributing

We welcome contributions! Please review our **[Contributing Guidelines](CONTRIBUTING.md)** before submitting pull requests. 

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<div align="center">
  <p>Built with ❤️ for game nights everywhere.</p>
</div>
