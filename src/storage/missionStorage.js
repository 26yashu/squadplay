import { BaseStorage } from './baseStorage';

class MissionStorage extends BaseStorage {
  constructor() {
    super('squadplay_missions', { active: [], completed: [], lastReset: new Date().toISOString() }, 1);
  }
}

export const missionStorage = new MissionStorage();
