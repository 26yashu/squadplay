import { IRepository } from './IRepository';
import { getSettings, saveSettings } from '../storage/settingsStorage';

export class SettingsRepository extends IRepository {
  constructor() {
    super();
    this.storage = {
      get: getSettings,
      save: saveSettings,
      initialData: { theme: 'dark', sound: true, haptics: true }
    };
    this.storageKey = 'squadplay_settings';
  }

  async get() {
    return Promise.resolve(this.storage.get());
  }

  async save(data) {
    this.storage.save(data);
    return Promise.resolve(data);
  }

  async getById(_id) {
    return this.get();
  }

  async delete(_id) {
    return Promise.resolve(false);
  }

  async clear() {
    this.storage.save(JSON.parse(JSON.stringify(this.storage.initialData)));
    return Promise.resolve(true);
  }
}

export const settingsRepository = new SettingsRepository();
