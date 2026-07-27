import { IRepository } from './IRepository';
import { historyStorage } from '../storage/historyStorage';

export class HistoryRepository extends IRepository {
  constructor() {
    super();
    this.storage = historyStorage;
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

export const historyRepository = new HistoryRepository();
