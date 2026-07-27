import { IRepository } from './IRepository';
import { missionStorage } from '../storage/missionStorage';

export class MissionRepository extends IRepository {
  constructor() {
    super();
    this.storage = missionStorage;
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

export const missionRepository = new MissionRepository();
