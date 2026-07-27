export class BaseStorage {
  constructor(key, initialData = {}, version = 1, migrations = {}) {
    this.key = key;
    this.initialData = initialData;
    this.version = version;
    this.migrations = migrations;
    this.data = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.key);
      if (!stored) {
        return this._initialize();
      }

      const parsed = JSON.parse(stored);
      if (parsed.version !== this.version) {
        return this.migrate(parsed);
      }
      return parsed.data;
    } catch (e) {
      console.error(`Storage corruption detected for ${this.key}:`, e);
      return this._initialize();
    }
  }

  _initialize() {
    this.data = { ...this.initialData };
    this.save(this.data);
    return this.data;
  }

  migrate(parsedData) {
    let currentData = parsedData.data || {};
    let currentVersion = parsedData.version || 1;

    try {
      while (currentVersion < this.version) {
        const migrationFunction = this.migrations[currentVersion + 1];
        if (migrationFunction) {
          currentData = migrationFunction(currentData);
        }
        currentVersion++;
      }
    } catch (e) {
      console.error(`Migration failed for ${this.key}`, e);
      currentData = { ...this.initialData, ...currentData };
    }

    this.save(currentData);
    return currentData;
  }

  save(data) {
    try {
      const payload = {
        version: this.version,
        data: data,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.key, JSON.stringify(payload));
      this.data = data;
    } catch (e) {
      console.error(`Failed to save ${this.key}:`, e);
    }
  }

  get() {
    return this.data;
  }
}
