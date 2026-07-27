# Storage & Persistence

Because SquadPlay is an offline-first PWA application, robust local persistence is arguably its most critical infrastructure layer. We cannot afford to lose a user's XP, profile, or match history due to transient storage failures or corrupt JSON.

## BaseStorage Class

All local data flows through `src/storage/baseStorage.js`. This module wraps the browser's native `localStorage` API and injects essential protections:

### 1. Corruption Recovery
If `JSON.parse` fails (due to storage truncation or manual tampering), `BaseStorage` intercepts the exception. It logs the error and gracefully re-initializes the storage domain with its default data structure instead of allowing the application to permanently crash.

### 2. Versioned Migrations
As SquadPlay evolves, the shape of stored profiles or leaderboards may change. `BaseStorage` supports schema versioning.
If a legacy version is detected, it pipes the old data through a defined sequence of `migrations` (e.g., upgrading a player's `score` field to an object containing `{ xp, level }`) before returning it to the runtime.

## Sub-Storage Modules

The application segregates its data domains for optimized performance and cleaner schemas:
- **`profileStorage.js`**: Stores the active user's avatar, name, and preference configurations.
- **`historyStorage.js`**: Appends Match summaries. (We limit history to the most recent 50 games to prevent bloated I/O reads).
- **`leaderboardStorage.js`**: Maps unique Player IDs to cumulative wins across all games.
- **`xpStorage.js`**: Tracks granular XP events and determines when a user "Levels Up".
- **`achievementStorage.js`**: Employs an in-memory cache layer to permit extremely fast O(1) checks for `hasAchievement(id)` without thrashing `localStorage`.
