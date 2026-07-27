/**
 * IRepository interface defines the standard contract for data access.
 * This allows swapping the underlying implementation (e.g. LocalStorage -> Firebase)
 * without changing the consuming UI components.
 */
export class IRepository {
  /**
   * Retrieves all items or the core data payload
   * @returns {Promise<any>}
   */
  async get() {
    throw new Error('Method not implemented.');
  }

  /**
   * Retrieves an item by id
   * @param {string} id 
   * @returns {Promise<any>}
   */
  async getById(_id) {
    throw new Error('Method not implemented.');
  }

  /**
   * Saves data (create or update)
   * @param {any} data 
   * @returns {Promise<any>}
   */
  async save(data) {
    throw new Error('Method not implemented.');
  }

  /**
   * Deletes an item by id
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async delete(_id) {
    throw new Error('Method not implemented.');
  }

  /**
   * Clears all items in the repository
   * @returns {Promise<boolean>}
   */
  async clear() {
    throw new Error('Method not implemented.');
  }
}
