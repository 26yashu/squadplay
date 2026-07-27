import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationStorage } from '../../storage/notificationStorage';
import { Trophy, CheckCircle, AlertTriangle, Zap, Info, Bell, X, Check, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (isOpen) {
      setNotifications(notificationStorage.get().history || []);
      notificationStorage.markAllRead();
    }
  }, [isOpen]);

  const handleClear = () => {
    notificationStorage.clear();
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'achievement': return Trophy;
      case 'success': return CheckCircle;
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'xp': return Zap;
      default: return Info;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'achievement': return 'text-yellow-400';
      case 'success': return 'text-emerald-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-orange-400';
      case 'xp': return 'text-hyper-pink';
      default: return 'text-theme-accent';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-theme-bg border-l border-theme-border/50 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-theme-border/50 flex items-center justify-between glass-panel">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-theme-accent/20 text-theme-accent rounded-full">
                  <Bell size={20} />
                </div>
                <h2 className="font-black text-xl text-theme-text uppercase tracking-widest">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 text-theme-text-muted hover:text-theme-text transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {notifications.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-10">
                  <Bell size={48} className="mb-4 text-theme-text-muted" />
                  <h3 className="font-bold text-theme-text">No Notifications</h3>
                  <p className="text-sm text-theme-text-muted">You're all caught up!</p>
                </div>
              ) : (
                notifications.map(notif => {
                  const Icon = getIcon(notif.type);
                  const color = getColor(notif.type);
                  return (
                    <div key={notif.id} className="p-4 glass-panel rounded-2xl flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-black/40 shadow-inner ${color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-theme-text text-sm">{notif.title}</h4>
                          <span className="text-[10px] text-theme-text-muted">{new Date(notif.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-theme-text-muted leading-relaxed">{notif.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-theme-border/50 glass-panel">
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2" onClick={handleClear}>
                  <Trash2 size={16} /> Clear All
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
