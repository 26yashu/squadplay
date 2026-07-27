import { IRepository } from './IRepository';
import { profileStorage } from '../storage/profileStorage';

/**
 * PlayerRepository handles player profile data.
 * Implements IRepository to allow future cloud migration.
 */
export class PlayerRepository extends IRepository {
  constructor() {
    super();
    this.storage = profileStorage;
  }

  async get() {
    return Promise.resolve(this.storage.get());
  }

  async save(data) {
    this.storage.save(data);
    return Promise.resolve(data);
  }

  // Not strictly applicable to single-profile setup, but implemented for interface compliance
  async getById(_id) {
    return this.get();
  }

  async delete(_id) {
    return Promise.resolve(false); // Can't delete the main profile currently
  }

  async clear() {
    this.storage.save(JSON.parse(JSON.stringify(this.storage.initialData)));
    return Promise.resolve(true);
  }
}

export const playerRepository = new PlayerRepository();
