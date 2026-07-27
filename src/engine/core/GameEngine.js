/**
 * Base Lifecycle interface for all SquadPlay Games
 */
export class GameEngine {
  constructor() {
    if (new.target === GameEngine) {
      throw new TypeError("Cannot construct GameEngine instances directly");
    }
  }

  // Lifecycle
  async initialize() { throw new Error('initialize() must be implemented'); }
  start() { throw new Error('start() must be implemented'); }
  pause() { throw new Error('pause() must be implemented'); }
  resume() { throw new Error('resume() must be implemented'); }
  restart() { throw new Error('restart() must be implemented'); }
  finish() { throw new Error('finish() must be implemented'); }
  save() { throw new Error('save() must be implemented'); }
  load() { throw new Error('load() must be implemented'); }
  destroy() { throw new Error('destroy() must be implemented'); }
}
