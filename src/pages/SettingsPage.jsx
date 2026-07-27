import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Upload, Trash2, Moon, Volume2, RefreshCw, Vibrate, Trophy, Medal, Palette } from 'lucide-react';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { AppConfigContext } from '../context/AppConfigContext';
import { BackupManager } from '../engine/BackupManager';
import { useNotification } from '../notifications/useNotification';
import { useTheme } from '../theme/ThemeContext';

export function SettingsPage() {
  const navigate = useNavigate();
  const { sound, setSound, haptics, setHaptics } = useContext(AppConfigContext);
  const { notify } = useNotification();
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const fileInputRef = useRef(null);
  
  const [resetModal, setResetModal] = useState({ isOpen: false, type: null });
  const [themeModal, setThemeModal] = useState(false);

  const handleExport = () => {
    const result = BackupManager.exportData();
    if (result.success) {
      notify({ type: 'success', title: 'Export Successful', message: 'Your data has been downloaded.' });
    } else {
      notify({ type: 'error', title: 'Export Failed', message: result.error });
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const result = await BackupManager.importData(file);
      if (result.success) {
        notify({ type: 'success', title: 'Import Successful', message: 'Data restored successfully! Reloading...' });
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      notify({ type: 'error', title: 'Import Failed', message: err.message });
    }
  };

  const handleResetConfirm = () => {
    if (resetModal.type === 'full') {
      localStorage.clear();
    } else if (resetModal.type === 'history') {
      localStorage.removeItem('squadplay_history');
    } else if (resetModal.type === 'achievements') {
      localStorage.removeItem('squadplay_achievements');
      localStorage.removeItem('squadplay_xp');
    } else if (resetModal.type === 'leaderboard') {
      localStorage.removeItem('squadplay_leaderboard');
    }
    
    notify({ type: 'success', title: 'Reset Complete', message: 'Data has been cleared. Reloading...' });
    setResetModal({ isOpen: false, type: null });
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <ScreenWrapper>
      <div className="flex items-center justify-between mb-8 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition focus-visible:ring-2 focus-visible:ring-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-widest uppercase drop-shadow-md">Settings</h1>
        <div className="p-2 rounded-full opacity-0 pointer-events-none"><ArrowLeft size={24} /></div>
      </div>

      <div className="flex flex-col gap-6 z-10 relative">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md shadow-lg">
          <SettingToggle icon={<Volume2 />} label="Sound Effects" value={sound} onChange={(v) => setSound(v)} />
          <div className="h-px w-full bg-white/10" />
          <SettingToggle icon={<Vibrate />} label="Haptic Feedback" value={haptics} onChange={(v) => setHaptics(v)} />
          <div className="h-px w-full bg-white/10" />
          <SettingAction icon={<Palette />} label={`Theme: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}`} onClick={() => setThemeModal(true)} />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md shadow-lg">
          <SettingAction icon={<Download />} label="Export Backup" onClick={handleExport} />
          <div className="h-px w-full bg-white/10" />
          <SettingAction icon={<Upload />} label="Import Backup" onClick={() => fileInputRef.current?.click()} />
          <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-2 mt-4 backdrop-blur-md shadow-lg">
          <SettingAction icon={<RefreshCw />} label="Clear History" color="text-orange-400" onClick={() => setResetModal({ isOpen: true, type: 'history' })} />
          <div className="h-px w-full bg-red-500/10" />
          <SettingAction icon={<Trophy />} label="Clear Achievements & XP" color="text-orange-400" onClick={() => setResetModal({ isOpen: true, type: 'achievements' })} />
          <div className="h-px w-full bg-red-500/10" />
          <SettingAction icon={<Medal />} label="Clear Leaderboards" color="text-orange-400" onClick={() => setResetModal({ isOpen: true, type: 'leaderboard' })} />
          <div className="h-px w-full bg-red-500/10" />
          <SettingAction icon={<Trash2 />} label="Full Factory Reset" color="text-red-400" onClick={() => setResetModal({ isOpen: true, type: 'full' })} />
        </div>

        <div className="text-center text-xs text-white/40 mt-8 mb-12 flex flex-col items-center gap-1">
          <span className="font-bold tracking-widest text-white/60">SQUADPLAY</span>
          <span>Version 1.2.0 (Production)</span>
          <span>Cloud-Ready Architecture</span>
        </div>
      </div>

      <Modal 
        isOpen={resetModal.isOpen} 
        onClose={() => setResetModal({ isOpen: false, type: null })}
        title="Confirm Reset"
      >
        <p className="text-gray-300 mb-6">
          {resetModal.type === 'full' 
            ? "Are you absolutely sure you want to wipe all data? This cannot be undone unless you have a backup."
            : "Are you sure you want to clear this data? It cannot be recovered."}
        </p>
        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={() => setResetModal({ isOpen: false, type: null })}>Cancel</Button>
          <Button variant="danger" className="flex-1" onClick={handleResetConfirm}>Delete</Button>
        </div>
      </Modal>

      <Modal
        isOpen={themeModal}
        onClose={() => setThemeModal(false)}
        title="Select Theme"
      >
        <div className="grid grid-cols-2 gap-3 mb-4">
          {availableThemes.map(theme => (
            <button
              key={theme}
              onClick={() => { setTheme(theme); setThemeModal(false); }}
              className={`p-3 rounded-xl border flex items-center justify-center font-bold capitalize transition-colors ${currentTheme === theme ? 'bg-theme-accent border-theme-accent text-white' : 'bg-white/5 border-white/10 text-theme-text-muted hover:bg-white/10 hover:text-theme-text'}`}
            >
              {theme}
            </button>
          ))}
        </div>
        <Button variant="secondary" className="w-full" onClick={() => setThemeModal(false)}>Close</Button>
      </Modal>
    </ScreenWrapper>
  );
}

function SettingToggle({ icon, label, value, onChange, disabled = false }) {
  return (
    <div className={`flex items-center justify-between p-4 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5'} rounded-2xl transition`} onClick={() => !disabled && onChange(!value)}>
      <div className="flex items-center gap-4 text-white">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-theme-accent' : 'bg-gray-600'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}

function SettingAction({ icon, label, color = "text-white", onClick, disabled = false }) {
  return (
    <div onClick={disabled ? null : onClick} className={`flex items-center justify-between p-4 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5'} rounded-2xl transition`}>
      <div className={`flex items-center gap-4 ${color}`}>
        {icon}
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}
