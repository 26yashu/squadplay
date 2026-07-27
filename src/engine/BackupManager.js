// Manages exporting, importing, and validating squadplay data backups
export class BackupManager {
  static VERSION = '1.0.0';

  static exportData() {
    try {
      const data = {
        version: this.VERSION,
        timestamp: new Date().toISOString(),
        profile: localStorage.getItem('squadplay_profile'),
        history: localStorage.getItem('squadplay_history'),
        stats: localStorage.getItem('squadplay_global_stats'),
        achievements: localStorage.getItem('squadplay_achievements'),
        missions: localStorage.getItem('squadplay_missions'),
        settings: localStorage.getItem('squadplay_settings'),
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `squadplay-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error("Export failed", error);
      return { success: false, error: error.message };
    }
  }

  static async importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          const validation = this.validateBackup(data);
          if (!validation.success) {
            reject(new Error(validation.error));
            return;
          }

          const migratedData = this.migrateData(data);

          // Write back to local storage
          if (migratedData.profile) localStorage.setItem('squadplay_profile', migratedData.profile);
          if (migratedData.history) localStorage.setItem('squadplay_history', migratedData.history);
          if (migratedData.stats) localStorage.setItem('squadplay_global_stats', migratedData.stats);
          if (migratedData.achievements) localStorage.setItem('squadplay_achievements', migratedData.achievements);
          if (migratedData.missions) localStorage.setItem('squadplay_missions', migratedData.missions);
          if (migratedData.settings) localStorage.setItem('squadplay_settings', migratedData.settings);

          resolve({ success: true, message: 'Backup restored successfully' });
        } catch (error) {
          reject(new Error("Corrupted backup file: " + error.message));
        }
      };
      
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  static validateBackup(data) {
    if (!data || typeof data !== 'object') {
      return { success: false, error: 'Invalid backup format' };
    }
    // As long as it has at least profile or settings, we consider it valid enough to try
    if (!data.profile && !data.settings) {
       return { success: false, error: 'Backup does not contain identifiable SquadPlay data' };
    }
    return { success: true };
  }

  static migrateData(data) {
    // Handle future version migrations here
    // For now, version 1.0.0 is the baseline
    return data;
  }
}
