import { BaseStorage } from './baseStorage';

class NotificationStorage extends BaseStorage {
  constructor() {
    super('squadplay_notifications');
    if (!this.data.history) {
      this.data = { history: [], unread: 0 };
    }
  }

  add(notification) {
    this.data.history.unshift({
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false
    });
    
    if (this.data.history.length > 50) {
      this.data.history.pop();
    }
    
    this.data.unread += 1;
    this.save();
  }

  markAllRead() {
    this.data.history.forEach(n => n.read = true);
    this.data.unread = 0;
    this.save();
  }

  clear() {
    this.data = { history: [], unread: 0 };
    this.save();
  }
}

export const notificationStorage = new NotificationStorage();
