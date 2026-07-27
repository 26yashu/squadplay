import { eventBus } from '../events/eventBus';
import { missionRepository } from '../repositories/MissionRepository';
import { MISSIONS } from './missionRegistry';
import { xpEngine } from '../engine/core/xpEngine';

class MissionEngine {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    this.initialized = true;

    // Refresh missions daily/weekly if needed
    await this.refreshMissionsIfNeeded();

    eventBus.subscribe('ANY', async (eventPayload) => {
      if (eventPayload.type !== 'MISSION_PROGRESS' && eventPayload.type !== 'MISSION_COMPLETED') {
        await this.evaluateMissions(eventPayload.type, eventPayload.data);
      }
    });
  }

  async refreshMissionsIfNeeded() {
    const data = await missionRepository.get();
    const now = new Date();
    const lastReset = new Date(data.lastReset || 0);

    const isNewDay = now.toDateString() !== lastReset.toDateString();
    
    // Very simple logic: Reset daily missions every day
    if (isNewDay) {
      data.active = MISSIONS.map(m => ({ id: m.id, progress: 0, completed: false }));
      data.lastReset = now.toISOString();
      await missionRepository.save(data);
    }
  }

  async evaluateMissions(eventType, data) {
    const repoData = await missionRepository.get();
    let updated = false;

    for (let missionData of repoData.active) {
      if (missionData.completed) continue;

      const missionDef = MISSIONS.find(m => m.id === missionData.id);
      if (!missionDef) continue;

      if (missionDef.condition(eventType, data)) {
        missionData.progress += 1;
        updated = true;

        if (missionData.progress >= missionDef.target) {
          missionData.progress = missionDef.target;
          missionData.completed = true;
          this.completeMission(missionDef);
        }
      }
    }

    if (updated) {
      await missionRepository.save(repoData);
      eventBus.publish('MISSION_PROGRESS', { activeMissions: repoData.active });
    }
  }

  completeMission(mission) {
    xpEngine.addXp(mission.xpReward);
    eventBus.publish('MISSION_COMPLETED', {
      id: mission.id,
      title: mission.title,
      xpReward: mission.xpReward
    });
  }
}

export const missionEngine = new MissionEngine();
